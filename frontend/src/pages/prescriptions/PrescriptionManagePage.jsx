// frontend/src/pages/prescriptions/PrescriptionManagePage.jsx

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PrescriptionManagePage() {
  const navigate = useNavigate();
  const { newbornId } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    duration: "",
    quantity: "",
    instructions: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `http://localhost:3000/api/prescriptions/newborn/${newbornId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPrescriptions(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (newbornId) fetchPrescriptions();
  }, [newbornId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newbornId, ...formData }),
      });

      if (!res.ok) throw new Error("Failed to save");

      const data = await res.json();
      setPrescriptions((prev) => [data.data, ...prev]);
      setFormData({
        medicationName: "",
        dosage: "",
        frequency: "",
        duration: "",
        quantity: "",
        instructions: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/newborns")}
            className="text-primary-600 hover:text-primary mb-4"
          >
            ← Retour
          </button>
          <h1 className="text-headline-l">Gestion des prescriptions</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error rounded text-error">
            {error}
          </div>
        )}

        <div className="mb-8 card-lg p-6">
          <h2 className="text-title-l mb-4">Ajouter une prescription</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-label mb-2">Médicament</label>
              <input
                type="text"
                name="medicationName"
                value={formData.medicationName}
                onChange={handleChange}
                required
                placeholder="Nom du médicament"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-label mb-2">Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  required
                  placeholder="5mg/ml"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-label mb-2">Fréquence</label>
                <input
                  type="text"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                  placeholder="2x par jour"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-label mb-2">Durée (jours)</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  placeholder="7"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-label mb-2">Quantité</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  placeholder="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-label mb-2">Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Instructions spéciales"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? "Enregistrement..." : "Ajouter la prescription"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-title-l mb-4">Prescriptions actives</h2>
          {prescriptions.length === 0 ? (
            <div className="card-lg p-6 text-center">
              <p className="text-body text-text-secondary">
                Aucune prescription
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="card p-6 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-title-m">{rx.medicationName}</h3>
                      <p className="text-body-s text-text-secondary mt-2">
                        Dosage: {rx.dosage}
                      </p>
                      <p className="text-body-s text-text-secondary">
                        Fréquence: {rx.frequency}
                      </p>
                      <p className="text-body-s text-text-secondary">
                        Durée: {rx.duration} jours
                      </p>
                      <p className="text-body-s text-text-secondary">
                        Quantité: {rx.quantity}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`badge ${
                          rx.status === "active"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {rx.status}
                      </span>
                    </div>
                  </div>
                  {rx.instructions && (
                    <p className="text-body-s text-text-secondary mt-3 italic">
                      💡 {rx.instructions}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
