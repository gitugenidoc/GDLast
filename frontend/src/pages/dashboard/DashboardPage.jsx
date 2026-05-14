import { Calendar, BarChart2, Lock, ChevronRight, Stethoscope, QrCode, Activity, Smile } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <Sidebar user={user} onLogout={logout} />

      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        <Header />

        <div className="p-8 flex-1 overflow-auto max-w-[1200px] w-full mx-auto space-y-8">
          {/* PROFILE HERO CARD */}
          <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-inner"></div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-[10px] font-bold text-teal-700 flex items-center gap-1 shadow-sm border border-slate-100 whitespace-nowrap">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  Carte Active
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1">Patient</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold">
                    ID: {user?.id || "HDY-24-000123"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0F2D69] text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-900 transition">
                <QrCode size={16} /> QR Rapide
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 text-sm font-semibold rounded-full border border-red-100 hover:bg-red-100 transition">
                <Activity size={16} /> Urgence
              </button>
            </div>
          </div>

          {/* APERÇU SANTÉ */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Aperçu Santé</h3>
              <button className="text-sm font-semibold text-[#0F2D69] hover:underline">
                Voir tout
              </button>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <HealthCard
                title="Prochain Vaccin"
                subtitle="BCG & Hépatite B"
                status="À venir"
                statusColor="slate"
                date="Dans 7 Jours"
              />
              <HealthCard
                title="Prochain Rendez-vous"
                subtitle="Suivi Pédiatrique"
                status="Confirmé"
                statusColor="blue"
                date="27 Mai, 10:00"
              />
              <HealthCard
                title="État de Croissance"
                subtitle="Croissance régulière"
                status="Stable"
                statusColor="teal"
                metrics={{ Poids: "3.8 kg", Taille: "52 cm" }}
              />
            </div>
          </section>

          {/* LE JARDIN DES ÉTAPES */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Le Jardin des Étapes</h3>
            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-100 flex items-center justify-center">
              <div className="flex items-center w-full max-w-2xl mx-auto justify-between relative">
                <MilestoneStep
                  title="Naissance"
                  status="Accompli"
                  active
                />
                <div className="flex-1 h-0.5 bg-teal-200 mx-4 -mt-8"></div>
                <MilestoneStep
                  title="1er Bilan"
                  status="En attente"
                />
                <div className="flex-1 h-0.5 bg-slate-200 mx-4 -mt-8 border-t-2 border-dashed border-slate-200"></div>
                <MilestoneStep
                  title="Bilan 3 mois"
                  status=""
                  disabled
                />
              </div>
            </div>
          </section>

          {/* L'ORBITE DE SANTÉ */}
          <section className="pb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">L'Orbite de Santé</h3>
              <button className="text-sm font-semibold text-[#0F2D69] flex items-center gap-1 hover:underline">
                Ouvrir <ChevronRight size={14} />
              </button>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-blue-100"></div>

              <TimelineEvent
                date="Il y a 23 jours"
                location="Maternité Centrale"
                title="Événement de Naissance"
                description="Accouchement par voie basse sans complication. Évaluation pédiatrique initiale excellente. Score d'Apgar: 9/10."
                metrics={["Poids : 3.2 kg", "Taille : 50 cm", "PC : 35 cm"]}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function HealthCard({ title, subtitle, status, statusColor, date, metrics }) {
  const statusColors = {
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-slate-200 text-slate-700",
    teal: "bg-teal-50 text-teal-700",
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          statusColor === "blue" ? "bg-blue-50 text-blue-600" : statusColor === "teal" ? "bg-teal-50 text-teal-600" : "bg-slate-100 text-slate-600"
        }`}>
          {statusColor === "blue" ? <Stethoscope size={20} /> : <BarChart2 size={20} />}
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[statusColor]}`}>
          {status}
        </span>
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-1">{title}</p>
        <h4 className="text-base font-bold text-slate-900 mb-3">{subtitle}</h4>
        {date && (
          <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border ${
            statusColor === "blue"
              ? "text-blue-700 bg-blue-50 border-blue-100"
              : statusColor === "teal"
              ? "text-teal-700 bg-teal-50 border-teal-100"
              : "text-slate-600 bg-slate-50 border-slate-100"
          }`}>
            <Calendar size={14} /> {date}
          </div>
        )}
        {metrics && (
          <div className="flex gap-6">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key}>
                <p className="text-xs text-slate-500">{key}</p>
                <p className="text-sm font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MilestoneStep({ title, status, active, disabled }) {
  return (
    <div className={`flex flex-col items-center gap-3 relative z-10 ${disabled ? "opacity-60" : ""}`}>
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center ${
          active
            ? "bg-teal-50 border-2 border-teal-500 text-teal-600 shadow-[0_0_0_4px_white,0_0_0_6px_rgba(20,184,166,0.2)]"
            : disabled
            ? "bg-slate-100 text-slate-400"
            : "bg-white border-2 border-dashed border-slate-300 text-slate-600"
        }`}
      >
        {active && <span className="text-2xl">✓</span>}
        {!active && !disabled && <span className="text-xl">○</span>}
        {disabled && <Lock size={20} />}
      </div>
      <div className="text-center">
        <p className={`text-sm font-bold ${disabled ? "text-slate-500" : "text-slate-900"}`}>
          {title}
        </p>
        {status && (
          <p className="text-[11px] text-slate-500 font-medium">{status}</p>
        )}
      </div>
    </div>
  );
}

function TimelineEvent({ date, location, title, description, metrics }) {
  return (
    <div className="relative mb-8">
      <div className="absolute -left-6 top-1.5 w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center z-10 border-[3px] border-white">
        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
      </div>

      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-600 ml-4">
        <span className="text-[#0F2D69]">{date}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
        <span>{location}</span>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm ml-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-base font-bold text-slate-900">{title}</h4>
          <Smile className="text-slate-400" size={18} />
        </div>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed max-w-3xl">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {metrics.map((metric, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
              {metric}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
