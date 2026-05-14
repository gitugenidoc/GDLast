// frontend/src/pages/consultations/ConsultationRecordPage.jsx

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ConsultationRecordPage() {
  const navigate = useNavigate();
  const { newbornId } = useParams();
  const [formData, setFormData] = useState({
    reason: "",
    symptoms: "",
    diagnosis: "",
    diagnosisCodes: "",
    notes: "",
    recommendations: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newbornId,
          ...formData,
          diagnosisCodes: formData.diagnosisCodes
            .split(",")
            .map((c) => c.trim()),
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      navigate(`/newborns/${newbornId}?tab=consultations`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(`/newborns/${newbornId}`)}
            className="text-primary-600 hover:text-primary mb-4"
          >
            ← Retour
          </button>
          <h1 className="text-headline-l">Enregistrer une consultation</h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="card-lg p-6">
          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error rounded text-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-label mb-2">
                Raison de la consultation
              </label>
              <input
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                placeholder="Raison principale"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-label mb-2">Symptômes</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Symptômes observés"
                className="w-full px-3 py-2 border border-gray-300 rounded h-24"
              />
            </div>

            <div>
              <label className="block text-label mb-2">Diagnostic</label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                placeholder="Diagnostic établi"
                className="w-full px-3 py-2 border border-gray-300 rounded h-24"
              />
            </div>

            <div>
              <label className="block text-label mb-2">
                Codes diagnostiques (séparés par des virgules)
              </label>
              <input
                type="text"
                name="diagnosisCodes"
                value={formData.diagnosisCodes}
                onChange={handleChange}
                placeholder="A00.0, A00.1"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-label mb-2">Recommandations</label>
              <textarea
                name="recommendations"
                value={formData.recommendations}
                onChange={handleChange}
                placeholder="Recommandations médicales"
                className="w-full px-3 py-2 border border-gray-300 rounded h-24"
              />
            </div>

            <div>
              <label className="block text-label mb-2">
                Notes additionnelles
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes supplémentaires"
                className="w-full px-3 py-2 border border-gray-300 rounded h-20"
              />
            </div>

            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {loading ? "Enregistrement..." : "Enregistrer la consultation"}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/newborns/${newbornId}`)}
                className="btn btn-ghost flex-1"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
