import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: LucideIcon;
  color?: string;
  bgColor?: string;
}

export default function StatCard({ title, value, icon: Icon, color = "text-indigo-600", bgColor = "bg-indigo-50" }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`p-3 rounded-xl ${bgColor} ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
}
