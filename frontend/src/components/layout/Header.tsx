"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types";
import { 
  ShieldCheck, 
  Layers, 
  Filter, 
  EyeOff, 
  FileText, 
  Radio, 
  Users,
  AlertTriangle
} from "lucide-react";

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  securityFlagsCount?: number;
}

function HeaderContent({ currentRole, onRoleChange, securityFlagsCount = 1 }: HeaderProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Bảng Kanban",
      href: "/jobs/job-it-01/kanban",
      icon: Layers,
      allowedRoles: ["HR_MANAGER", "RECRUITER"],
    },
    {
      name: "Sàng Lọc 3 Tầng",
      href: "/jobs/job-it-01/screening",
      icon: Filter,
      allowedRoles: ["HR_MANAGER", "RECRUITER"],
    },
    {
      name: "Phòng Thủ Prompt AI",
      href: "/jobs/job-it-01/ingestion",
      icon: ShieldCheck,
      allowedRoles: ["HR_MANAGER", "RECRUITER", "SYSTEM_ADMIN"],
      badge: securityFlagsCount > 0 ? securityFlagsCount : undefined,
    },
    {
      name: "Phỏng Vấn Mù (Interviewer)",
      href: "/interviews/int-042-1/evaluate",
      icon: EyeOff,
      allowedRoles: ["TECHNICAL_INTERVIEWER", "HR_MANAGER"],
    },
    {
      name: "Trang Nộp Đơn (Public)",
      href: "/jobs/job-it-01/apply",
      icon: FileText,
      allowedRoles: ["HR_MANAGER", "RECRUITER", "TECHNICAL_INTERVIEWER", "SYSTEM_ADMIN"],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Brand Logo & Security Status */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base">HYBRID ATS</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  Zero-PII Egress
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Lean ATS with 3-Stage Hybrid Screening</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            const isRoleAllowed = item.allowedRoles.includes(currentRole);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                    : isRoleAllowed
                    ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                    : "text-slate-500 opacity-60 hover:text-slate-400"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : ""}`} />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Role Switcher & Real-time Indicator */}
        <div className="flex items-center gap-4">
          {/* WebSocket Status */}
          <div className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-300">
            <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-slate-300">STOMP: Connected</span>
          </div>

          {/* Role Preview Switcher */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/90 p-1">
            <Users className="h-3.5 w-3.5 text-slate-400 ml-1.5 mr-0.5" />
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-transparent text-xs font-semibold text-indigo-300 focus:outline-none cursor-pointer pr-1"
            >
              <option value="RECRUITER" className="bg-slate-900 text-slate-200">
                Vai trò: Recruiter (Được xem PII)
              </option>
              <option value="TECHNICAL_INTERVIEWER" className="bg-slate-900 text-slate-200">
                Vai trò: Interviewer (Hồ sơ mù RLS)
              </option>
              <option value="HR_MANAGER" className="bg-slate-900 text-slate-200">
                Vai trò: HR Manager (Toàn quyền Workflow)
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Header(props: HeaderProps) {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 h-16" />
      }
    >
      <HeaderContent {...props} />
    </Suspense>
  );
}
