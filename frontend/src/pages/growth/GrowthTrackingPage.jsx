// frontend/src/pages/growth/GrowthTrackingPage.jsx

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GrowthTrackingPage() {
  const navigate = useNavigate();
  const { newbornId } = useParams();
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    headCircumference: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchGrowth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `http://localhost:3000/api/growth/newborn/${newbornId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setGrowthData(
          (data.data || []).sort(
            (a, b) => new Date(b.measuredAt) - new Date(a.measuredAt),
          ),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (newbornId) fetchGrowth();
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
      const res = await fetch("http://localhost:3000/api/growth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newbornId, ...formData }),
      });

      if (!res.ok) throw new Error("Failed to save");

      const data = await res.json();
      setGrowthData((prev) => [data.data, ...prev]);
      setFormData({ weight: "", height: "", headCircumference: "", notes: "" });
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
          <h1 className="text-headline-l">Suivi de croissance</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error rounded text-error">
            {error}
          </div>
        )}

        <div className="mb-8 card-lg p-6">
          <h2 className="text-title-l mb-4">Ajouter une mesure</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-label mb-2">Poids (kg)</label>
                <input
                  type="number"
                  name="weight"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="3.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-label mb-2">Taille (cm)</label>
                <input
                  type="number"
                  name="height"
                  step="0.1"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-label mb-2">
                  Périmètre crânien (cm)
                </label>
                <input
                  type="number"
                  name="headCircumference"
                  step="0.1"
                  value={formData.headCircumference}
                  onChange={handleChange}
                  placeholder="35"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-label mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? "Enregistrement..." : "Enregistrer la mesure"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-title-l mb-4">Historique</h2>
          {growthData.length === 0 ? (
            <div className="card-lg p-6 text-center">
              <p className="text-body text-text-secondary">
                Aucune mesure enregistrée
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {growthData.map((record) => (
                <div
                  key={record.id}
                  className="card p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-body-s text-text-secondary">
                        {new Date(record.measuredAt).toLocaleDateString(
                          "fr-FR",
                        )}
                      </p>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                          <p className="text-body-s text-text-secondary">
                            Poids
                          </p>
                          <p className="text-title-m">{record.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-body-s text-text-secondary">
                            Taille
                          </p>
                          <p className="text-title-m">{record.height} cm</p>
                        </div>
                        <div>
                          <p className="text-body-s text-text-secondary">PC</p>
                          <p className="text-title-m">
                            {record.headCircumference} cm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {record.notes && (
                    <p className="text-body-s text-text-secondary mt-3">
                      {record.notes}
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
