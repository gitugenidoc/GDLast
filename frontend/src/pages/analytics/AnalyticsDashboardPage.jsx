// frontend/src/pages/analytics/AnalyticsDashboardPage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AnalyticsDashboardPage() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          "http://localhost:3000/api/analytics/facility/facility1",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setMetrics(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-primary-600 hover:text-primary mb-4"
          >
            ← Retour
          </button>
          <h1 className="text-headline-l">Tableau de bord analytique</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error rounded text-error">
            {error}
          </div>
        )}

        {metrics && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card p-6 border border-gray-200 bg-blue-50">
                <p className="text-body-s text-text-secondary">Total bébés</p>
                <p className="text-display text-primary mt-2">
                  {metrics.totalNewborns || 0}
                </p>
              </div>

              <div className="card p-6 border border-gray-200 bg-green-50">
                <p className="text-body-s text-text-secondary">Consultations</p>
                <p className="text-display text-success mt-2">
                  {metrics.totalConsultations || 0}
                </p>
              </div>

              <div className="card p-6 border border-gray-200 bg-yellow-50">
                <p className="text-body-s text-text-secondary">Vaccinations</p>
                <p className="text-display text-warning mt-2">
                  {metrics.totalVaccinations || 0}
                </p>
              </div>

              <div className="card p-6 border border-gray-200 bg-purple-50">
                <p className="text-body-s text-text-secondary">Revenus</p>
                <p className="text-display text-primary mt-2">
                  ${metrics.totalRevenue || 0}
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Distribution Chart */}
              <div className="card p-6 border border-gray-200">
                <h3 className="text-title-l mb-4">
                  Distribution des consultations
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-body-s text-text-secondary mb-2">
                      Consultations par pédiatre
                    </p>
                    <div className="bg-gray-200 rounded h-8">
                      <div
                        className="bg-primary h-8 rounded"
                        style={{
                          width: `${(metrics.consultationsByPediatrician || 0) * 10}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vaccination Coverage */}
              <div className="card p-6 border border-gray-200">
                <h3 className="text-title-l mb-4">Couverture vaccinale</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-body-s text-text-secondary mb-2">
                      Taux de couverture
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 rounded h-8 flex-1">
                        <div
                          className="bg-success h-8 rounded"
                          style={{
                            width: `${metrics.vaccinationCoverage || 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-title-m">
                        {metrics.vaccinationCoverage || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trends */}
            <div className="card p-6 border border-gray-200">
              <h3 className="text-title-l mb-4">Tendances mensuelles</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-body">Janvier</span>
                  <div className="bg-gray-200 rounded h-6 w-32">
                    <div
                      className="bg-primary h-6 rounded"
                      style={{ width: "45%" }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body">Février</span>
                  <div className="bg-gray-200 rounded h-6 w-32">
                    <div
                      className="bg-primary h-6 rounded"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body">Mars</span>
                  <div className="bg-gray-200 rounded h-6 w-32">
                    <div
                      className="bg-primary h-6 rounded"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-6 bg-green-50 border border-green-200 rounded">
              <h4 className="text-title-l text-success mb-2">
                ✅ Résumé des performances
              </h4>
              <ul className="list-disc list-inside space-y-2 text-body">
                <li>
                  Vous avez suivi {metrics.totalNewborns || 0} bébés en santé
                </li>
                <li>
                  Vous avez effectué {metrics.totalConsultations || 0}{" "}
                  consultations
                </li>
                <li>
                  Taux de couverture vaccinale:{" "}
                  {metrics.vaccinationCoverage || 0}%
                </li>
                <li>Revenus générés: ${metrics.totalRevenue || 0}</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
