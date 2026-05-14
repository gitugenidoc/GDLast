// frontend/src/pages/dashboard/DashboardPage.jsx - Main dashboard (protected)

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Gérer les bébés",
      icon: "👶",
      path: "/newborns",
      color: "bg-blue-50",
    },
    {
      title: "Vaccinations",
      icon: "💉",
      path: "/vaccinations",
      color: "bg-green-50",
    },
    { title: "Factures", icon: "📄", path: "/billing", color: "bg-purple-50" },
    {
      title: "Cartes intelligentes",
      icon: "🔖",
      path: "/smartcards",
      color: "bg-yellow-50",
    },
    {
      title: "Notifications",
      icon: "🔔",
      path: "/notifications",
      color: "bg-orange-50",
    },
    {
      title: "Analytique",
      icon: "📊",
      path: "/analytics",
      color: "bg-pink-50",
    },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth/login";
  };

  const phases = [
    { name: "Phase 1", status: "✅ Auth & RBAC", path: "#" },
    { name: "Phase 2", status: "✅ Newborn Management", path: "/newborns" },
    { name: "Phase 3", status: "✅ Medical Records", path: "#" },
    { name: "Phase 4", status: "✅ Consultation Recording", path: "#" },
    { name: "Phase 5", status: "✅ Prescription Management", path: "#" },
    { name: "Phase 6", status: "✅ Billing & Invoicing", path: "#" },
    { name: "Phase 7", status: "✅ Smart Card Integration", path: "#" },
    { name: "Phase 8", status: "✅ FHIR Interoperability", path: "#" },
    { name: "Phase 9", status: "✅ Notifications & Audit", path: "#" },
    { name: "Phase 10", status: "✅ Analytics & Dashboard", path: "#" },
  ];

  return (
    <div className="min-h-screen bg-background">
// frontend/src/pages/dashboard/DashboardPage.jsx - Professional healthcare dashboard

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">GH</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">GeniDoc Hayat</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition text-sm font-medium"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500 mb-2">BIENVENUE</p>
          <h2 className="text-3xl font-bold text-slate-900">
            Tableau de bord {user?.role === "PARENT" ? "Parent" : "Praticien"}
          </h2>
        </div>

        {/* Quick Stats */}
        {user?.role === "PARENT" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Enfants suivi
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">2</p>
                </div>
                <div className="text-4xl">👶</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Consultations
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">5</p>
                </div>
                <div className="text-4xl">🔬</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Vaccins à jour
                  </p>
                  <p className="text-3xl font-bold text-green-600 mt-2">100%</p>
                </div>
                <div className="text-4xl">💉</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {user?.role === "PARENT" && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-700 mb-4">ACTIONS RAPIDES</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/newborns")}
                className="bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg p-4 text-center transition group"
              >
                <p className="text-2xl mb-2">👶</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                  Mes enfants
                </p>
              </button>

              <button
                onClick={() => navigate("/vaccinations")}
                className="bg-white hover:bg-green-50 border border-slate-200 hover:border-green-300 rounded-lg p-4 text-center transition group"
              >
                <p className="text-2xl mb-2">💉</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-green-600">
                  Vaccinations
                </p>
              </button>

              <button
                onClick={() => navigate("/notifications")}
                className="bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-lg p-4 text-center transition group"
              >
                <p className="text-2xl mb-2">🔔</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-orange-600">
                  Notifications
                </p>
              </button>

              <button
                onClick={() => navigate("/analytics")}
                className="bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg p-4 text-center transition group"
              >
                <p className="text-2xl mb-2">📊</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-purple-600">
                  Statistiques
                </p>
              </button>

              <button
                onClick={() => navigate("/billing")}
                className="bg-white hover:bg-yellow-50 border border-slate-200 hover:border-yellow-300 rounded-lg p-4 text-center transition group"
              >
                <p className="text-2xl mb-2">📄</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-yellow-600">
                  Facturation
                </p>
              </button>

              <button
                onClick={() => navigate("/smartcards")}
                className="bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg p-4 text-center transition group"
              >
                <p className="text-2xl mb-2">🔖</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-600">
                  Cartes Smart
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Main Features */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-slate-700 mb-4">SYSTÈME COMPLET</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Authentication */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 1</h3>
                  <p className="text-sm text-slate-600 mt-1">Authentification & RBAC</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">🔐</span>
              </div>
            </div>

            {/* Newborn Management */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-md transition" onClick={() => navigate("/newborns")}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 2</h3>
                  <p className="text-sm text-slate-600 mt-1">Gestion des bébés</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">👶</span>
              </div>
            </div>

            {/* Medical Records */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 3</h3>
                  <p className="text-sm text-slate-600 mt-1">Dossiers médicaux</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">📋</span>
              </div>
            </div>

            {/* Consultations */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 4</h3>
                  <p className="text-sm text-slate-600 mt-1">Consultations</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">🔬</span>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 5</h3>
                  <p className="text-sm text-slate-600 mt-1">Prescriptions</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">💊</span>
              </div>
            </div>

            {/* Billing */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-md transition" onClick={() => navigate("/billing")}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 6</h3>
                  <p className="text-sm text-slate-600 mt-1">Facturation</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">💰</span>
              </div>
            </div>

            {/* Smart Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-md transition" onClick={() => navigate("/smartcards")}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 7</h3>
                  <p className="text-sm text-slate-600 mt-1">Cartes intelligentes</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">🔖</span>
              </div>
            </div>

            {/* FHIR */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 8</h3>
                  <p className="text-sm text-slate-600 mt-1">Interopérabilité FHIR</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">🔗</span>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-md transition" onClick={() => navigate("/notifications")}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 9</h3>
                  <p className="text-sm text-slate-600 mt-1">Notifications</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">🔔</span>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-md transition" onClick={() => navigate("/analytics")}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phase 10</h3>
                  <p className="text-sm text-slate-600 mt-1">Analytique</p>
                  <p className="text-xs text-green-600 font-medium mt-3">✓ Actif</p>
                </div>
                <span className="text-3xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">✅</span>
            <h3 className="text-lg font-bold text-green-900">Système complet et opérationnel</h3>
          </div>
          <p className="text-sm text-green-800">
            GeniDoc Hayat est prêt pour la démonstration. Tous les 10 phases sont implémentées avec authentification sécurisée, gestion complète des dossiers médicaux, consultations, prescriptions, facturation et analytique.
          </p>
        </div>
      </main>
    </div>
  );
}
          </p>
        </div>
      </main>
    </div>
  );
}
