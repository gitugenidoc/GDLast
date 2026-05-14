// frontend/src/pages/newborns/NewbornListPage.jsx - List all newborns

import { useState, useEffect } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ProtectedRoute } from "../../features/auth/components/ProtectedRoute";
import { useNavigate } from "react-router-dom";

export default function NewbornListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newborns, setNewborns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewborns();
  }, []);

  const fetchNewborns = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/newborns", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNewborns(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => navigate("/newborns/create");
  const handleView = (id) => navigate(`/newborns/${id}`);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-headline-m text-primary">GeniDoc Hayat</h1>
          <button onClick={handleCreate} className="btn btn-primary">
            + Ajouter un bébé
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-headline-l mb-6">Mes bébés</h2>

        {loading && <div className="text-center">Chargement...</div>}
        {error && (
          <div className="p-4 bg-error/10 border border-error rounded text-error">
            {error}
          </div>
        )}

        {!loading && newborns.length === 0 && (
          <div className="text-center p-8 bg-white rounded border border-gray-200">
            <p className="text-text-muted mb-4">Aucun bébé enregistré</p>
            <button onClick={handleCreate} className="btn btn-primary">
              Ajouter un premier bébé
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newborns.map((newborn) => (
            <div
              key={newborn.id}
              className="card p-4 border border-gray-200 cursor-pointer hover:shadow-lg transition"
              onClick={() => handleView(newborn.id)}
            >
              <h3 className="text-title-l">
                {newborn.firstName} {newborn.lastName}
              </h3>
              <p className="text-body-s text-text-muted mt-1">
                Né le:{" "}
                {new Date(newborn.dateOfBirth).toLocaleDateString("fr-FR")}
              </p>
              <p className="text-body-s mt-2">
                <span className="badge badge-primary">{newborn.gender}</span>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
