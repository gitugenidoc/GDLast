import {
  Grid,
  Users,
  Stethoscope,
  GitBranch,
  Shield,
  HeartPulse,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="w-64 bg-slate-50/50 flex flex-col border-r border-slate-200/60 sticky top-0 h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          GeniDoc Hayat
        </h1>
      </div>

      <div className="px-6 mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center shrink-0">
          <img
            src={user?.avatar || "https://i.pravatar.cc/150?img=47"}
            alt={user?.firstName || "User"}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-xs text-slate-500">{user?.role}</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <NavLink href="/dashboard" icon={Grid} label="Tableau de bord" active />
        <NavLink href="/patients" icon={Users} label="Patients" />
        <NavLink
          href="/consultations"
          icon={Stethoscope}
          label="Consultations"
        />
        <NavLink href="/pathways" icon={GitBranch} label="Pathways" />
        <NavLink href="/permissions" icon={Shield} label="Permissions" />
      </nav>

      <div className="p-4 space-y-4">
        <button className="flex items-center gap-2 justify-center w-full px-4 py-3 bg-[#C81E1E] text-white rounded-xl font-medium shadow-md shadow-red-500/20 text-sm hover:bg-red-700 transition">
          <HeartPulse size={18} />
          Emergency
        </button>

        <div className="flex items-center justify-between px-2">
          <a
            href="/settings"
            className="flex items-center gap-3 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            <Settings size={18} className="text-slate-400" />
            Paramètres
          </a>
          <button
            onClick={onLogout}
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Déconnexion"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavLink({ href, icon: Icon, label, active = false }) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
        active
          ? "bg-teal-50 text-teal-800"
          : "text-slate-600 hover:bg-slate-100/50"
      }`}
    >
      <Icon size={18} className={active ? "text-teal-600" : "text-slate-400"} />
      {label}
    </a>
  );
}
