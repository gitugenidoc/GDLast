import { Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 flex justify-between items-center px-8 gap-4 border-b border-slate-100 shrink-0 bg-white">
      <div></div>
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-600 transition p-2 hover:bg-slate-100 rounded-lg">
          <Bell size={20} />
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition p-2 hover:bg-slate-100 rounded-lg">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}
