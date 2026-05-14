// frontend/src/pages/vaccinations/VaccinationListPage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VaccinationListPage() {
  const navigate = useNavigate();
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVaccinations = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/auth/login");
          return;
        }

        const res = await fetch("http://localhost:3000/api/vaccinations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setVaccinations(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccinations();
  }, [navigate]);

  const getStatusBadge = (status) => {
    const badges = {
      administered: "badge-success",
      scheduled: "badge-info",
      pending: "badge-warning",
      delayed: "badge-error",
    };
    return badges[status] || "badge-gray";
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
          <h1 className="text-headline-l">Vaccinations</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error rounded text-error">
            {error}
          </div>
        )}

        {vaccinations.length === 0 ? (
          <div className="card-lg p-6 text-center">
            <p className="text-body text-text-secondary">
              Aucune vaccination enregistrée
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {vaccinations.map((vac) => (
              <div
                key={vac.id}
                className="card p-6 border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-title-m">{vac.vaccineName}</h3>
                    <p className="text-body-s text-text-secondary mt-1">
                      Code: {vac.vaccineCode}
                    </p>
                    <p className="text-body-s text-text-secondary">
                      Lot: {vac.batchNumber || "N/A"}
                    </p>
                  </div>
                  <div className={`badge ${getStatusBadge(vac.status)}`}>
                    {vac.status}
                  </div>
                </div>
                {vac.administeredDate && (
                  <p className="text-body-s text-success mt-3">
                    ✓ Administrée le{" "}
                    {new Date(vac.administeredDate).toLocaleDateString("fr-FR")}
                  </p>
                )}
                {vac.nextDueDate && (
                  <p className="text-body-s text-text-secondary mt-2">
                    Prochaine:{" "}
                    {new Date(vac.nextDueDate).toLocaleDateString("fr-FR")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
