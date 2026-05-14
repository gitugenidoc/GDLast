// frontend/src/pages/newborns/NewbornDetailPage.jsx - Newborn detail with medical records

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../../features/auth/components/ProtectedRoute";

export default function NewbornDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newborn, setNewborn] = useState(null);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewborn();
  }, [id]);

  const fetchNewborn = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:3000/api/newborns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNewborn(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;
  if (!newborn)
    return (
      <div className="p-8 text-center">
        Bébé non trouvé
        <button
          onClick={() => navigate("/newborns")}
          className="btn btn-primary mt-4"
        >
          Retour
        </button>
      </div>
    );

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
          <h1 className="text-headline-l">
            {newborn.firstName} {newborn.lastName}
          </h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-body-s text-text-muted">Date de naissance</p>
              <p className="text-title-m">
                {new Date(newborn.dateOfBirth).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div>
              <p className="text-body-s text-text-muted">Genre</p>
              <p className="text-title-m">
                {newborn.gender === "M" ? "Garçon" : "Fille"}
              </p>
            </div>
            <div>
              <p className="text-body-s text-text-muted">Groupe sanguin</p>
              <p className="text-title-m">{newborn.bloodType || "N/A"}</p>
            </div>
            <div>
              <p className="text-body-s text-text-muted">Ville</p>
              <p className="text-title-m">{newborn.city || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => navigate(`/consultations/record/${id}`)}
            className="card p-4 border border-gray-200 hover:shadow-md transition text-center"
          >
            <p className="text-2xl mb-2">🔬</p>
            <p className="text-body-s">Nouvelle consultation</p>
          </button>
          <button
            onClick={() => navigate(`/growth/${id}`)}
            className="card p-4 border border-gray-200 hover:shadow-md transition text-center"
          >
            <p className="text-2xl mb-2">📏</p>
            <p className="text-body-s">Suivi croissance</p>
          </button>
          <button
            onClick={() => navigate(`/prescriptions/${id}`)}
            className="card p-4 border border-gray-200 hover:shadow-md transition text-center"
          >
            <p className="text-2xl mb-2">💊</p>
            <p className="text-body-s">Prescriptions</p>
          </button>
          <button
            onClick={() => navigate("/vaccinations")}
            className="card p-4 border border-gray-200 hover:shadow-md transition text-center"
          >
            <p className="text-2xl mb-2">💉</p>
            <p className="text-body-s">Vaccinations</p>
          </button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {["overview", "consultations", "vaccinations", "growth"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 font-medium border-b-2 transition ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text"
              }`}
            >
              {t === "overview" && "Vue d'ensemble"}
              {t === "consultations" && "Consultations"}
              {t === "vaccinations" && "Vaccinations"}
              {t === "growth" && "Croissance"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {tab === "overview" && (
            <div className="card p-4">
              <h3 className="text-title-m mb-4">Informations générales</h3>
              <p className="text-body">
                ID GeniDoc:{" "}
                <span className="font-mono">{newborn.genidocId}</span>
              </p>
              {newborn.smartCards && newborn.smartCards.length > 0 && (
                <p className="text-body mt-2">
                  Cartes actives:{" "}
                  <span className="badge badge-success">
                    {newborn.smartCards.length}
                  </span>
                </p>
              )}
            </div>
          )}

          {tab === "consultations" && (
            <div className="card p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-title-m">
                  Consultations ({newborn.consultations?.length || 0})
                </h3>
                <button
                  onClick={() => navigate(`/consultations/record/${id}`)}
                  className="btn btn-sm btn-primary"
                >
                  + Ajouter
                </button>
              </div>
              {newborn.consultations?.length === 0 ? (
                <p className="text-text-muted">Aucune consultation</p>
              ) : (
                newborn.consultations?.map((c) => (
                  <div key={c.id} className="border-t pt-3 mt-3">
                    <p className="text-body font-medium">{c.reason}</p>
                    <p className="text-body-s text-text-muted">
                      {new Date(c.consultedAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === "vaccinations" && (
            <div className="card p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-title-m">
                  Vaccinations ({newborn.vaccinations?.length || 0})
                </h3>
                <button
                  onClick={() => navigate("/vaccinations")}
                  className="btn btn-sm btn-primary"
                >
                  + Voir tout
                </button>
              </div>
              {newborn.vaccinations?.length === 0 ? (
                <p className="text-text-muted">Aucune vaccination</p>
              ) : (
                newborn.vaccinations?.map((v) => (
                  <div key={v.id} className="border-t pt-3 mt-3">
                    <p className="text-body font-medium">{v.vaccineName}</p>
                    <p className="text-body-s">
                      <span className="badge badge-success">{v.status}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === "growth" && (
            <div className="card p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-title-m">
                  Enregistrements de croissance (
                  {newborn.growthRecords?.length || 0})
                </h3>
                <button
                  onClick={() => navigate(`/growth/${id}`)}
                  className="btn btn-sm btn-primary"
                >
                  + Ajouter
                </button>
              </div>
              {newborn.growthRecords?.length === 0 ? (
                <p className="text-text-muted">Aucun enregistrement</p>
              ) : (
                newborn.growthRecords?.map((g) => (
                  <div key={g.id} className="border-t pt-3 mt-3">
                    <p className="text-body">
                      {g.weight}kg | {g.height}cm
                    </p>
                    <p className="text-body-s text-text-muted">
                      {new Date(g.measuredAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
