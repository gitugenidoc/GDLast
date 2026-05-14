// frontend/src/pages/dashboard/DashboardPage.jsx - Main dashboard (protected)

import {
  Baby,
  BarChart3,
  Bell,
  ClipboardList,
  CreditCard,
  Link2,
  LogOut,
  Microscope,
  Pill,
  QrCode,
  Receipt,
  ShieldCheck,
  Syringe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const parentStats = [
  { label: "Enfants suivis", value: "2", icon: Baby, color: "text-blue-600" },
  { label: "Consultations", value: "5", icon: Microscope, color: "text-cyan-600" },
  { label: "Vaccins a jour", value: "100%", icon: Syringe, color: "text-green-600" },
];

const quickActions = [
  {
    label: "Mes enfants",
    path: "/newborns",
    icon: Baby,
    className: "hover:bg-blue-50 hover:border-blue-300 group-hover:text-blue-600",
  },
  {
    label: "Vaccinations",
    path: "/vaccinations",
    icon: Syringe,
    className: "hover:bg-green-50 hover:border-green-300 group-hover:text-green-600",
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
    className: "hover:bg-orange-50 hover:border-orange-300 group-hover:text-orange-600",
  },
  {
    label: "Statistiques",
    path: "/analytics",
    icon: BarChart3,
    className: "hover:bg-purple-50 hover:border-purple-300 group-hover:text-purple-600",
  },
  {
    label: "Facturation",
    path: "/billing",
    icon: Receipt,
    className: "hover:bg-yellow-50 hover:border-yellow-300 group-hover:text-yellow-600",
  },
  {
    label: "Cartes Smart",
    path: "/smartcards",
    icon: QrCode,
    className: "hover:bg-indigo-50 hover:border-indigo-300 group-hover:text-indigo-600",
  },
];

const featureCards = [
  { phase: "Phase 1", title: "Authentification & RBAC", icon: ShieldCheck },
  { phase: "Phase 2", title: "Gestion des bebes", icon: Baby, path: "/newborns" },
  { phase: "Phase 3", title: "Dossiers medicaux", icon: ClipboardList },
  { phase: "Phase 4", title: "Consultations", icon: Microscope },
  { phase: "Phase 5", title: "Prescriptions", icon: Pill },
  { phase: "Phase 6", title: "Facturation", icon: CreditCard, path: "/billing" },
  { phase: "Phase 7", title: "Cartes intelligentes", icon: QrCode, path: "/smartcards" },
  { phase: "Phase 8", title: "Interoperabilite FHIR", icon: Link2 },
  { phase: "Phase 9", title: "Notifications", icon: Bell, path: "/notifications" },
  { phase: "Phase 10", title: "Analytique", icon: BarChart3, path: "/analytics" },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition text-sm font-medium"
            >
              <LogOut size={16} />
              Deconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500 mb-2">BIENVENUE</p>
          <h2 className="text-3xl font-bold text-slate-900">
            Tableau de bord {user?.role === "PARENT" ? "Parent" : "Praticien"}
          </h2>
        </div>

        {user?.role === "PARENT" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {parentStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={stat.color} size={36} />
                </div>
              </div>
            ))}
          </div>
        )}

        {user?.role === "PARENT" && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-700 mb-4">ACTIONS RAPIDES</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  className={`bg-white border border-slate-200 rounded-lg p-4 text-center transition group ${action.className}`}
                >
                  <action.icon className="mx-auto mb-2 text-slate-700" size={28} />
                  <p className="text-sm font-medium text-slate-700">{action.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <p className="text-sm font-semibold text-slate-700 mb-4">SYSTEME COMPLET</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCards.map((feature) => {
              const CardIcon = feature.icon;
              const clickable = Boolean(feature.path);

              return (
                <div
                  key={feature.phase}
                  onClick={clickable ? () => navigate(feature.path) : undefined}
                  className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${
                    clickable ? "cursor-pointer hover:shadow-md transition" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{feature.phase}</h3>
                      <p className="text-sm text-slate-600 mt-1">{feature.title}</p>
                      <p className="text-xs text-green-600 font-medium mt-3">Actif</p>
                    </div>
                    <CardIcon className="text-blue-600" size={32} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="text-green-700" size={28} />
            <h3 className="text-lg font-bold text-green-900">
              Systeme complet et operationnel
            </h3>
          </div>
          <p className="text-sm text-green-800">
            GeniDoc Hayat est pret pour la demonstration. Les 10 phases sont
            implementees avec authentification securisee, dossiers medicaux,
            consultations, prescriptions, facturation et analytique.
          </p>
        </div>
      </main>
    </div>
  );
}
