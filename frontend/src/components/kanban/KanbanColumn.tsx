"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Stage, CandidateApplication, UserRole } from "@/types";
import { KanbanCard } from "./KanbanCard";
import { Lock, ShieldCheck } from "lucide-react";

interface KanbanColumnProps {
  stage: Stage;
  candidates: CandidateApplication[];
  role: UserRole;
  onInspectSecurity?: (candidate: CandidateApplication) => void;
  onInspectCitation?: (candidate: CandidateApplication) => void;
}

export function KanbanColumn({
  stage,
  candidates,
  role,
  onInspectSecurity,
  onInspectCitation,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: { stage },
  });

  // Stage color styles
  const stageHeaderColors: Record<string, string> = {
    blue: "border-blue-500/40 text-blue-400 bg-blue-500/10",
    purple: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    indigo: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10",
    amber: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    emerald: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    rose: "border-rose-500/40 text-rose-400 bg-rose-500/10",
  };

  const headerBadgeStyle = stageHeaderColors[stage.color || "blue"] || stageHeaderColors.blue;

  return (
    <div
      ref={setNodeRef}
      className={`flex h-full w-80 shrink-0 flex-col rounded-2xl border transition-all duration-200 ${
        isOver
          ? "border-indigo-500/80 bg-slate-800/80 shadow-lg ring-1 ring-indigo-500/30"
          : "border-slate-800 bg-slate-900/60"
      }`}
    >
      {/* Column Header */}
      <div className="flex flex-col gap-1.5 p-3.5 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {stage.name}
            </h3>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold border ${headerBadgeStyle}`}>
              {candidates.length}
            </span>
          </div>

          {stage.guardRule && (
            <div 
              className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-700/50"
              title="Chốt chặn BR-05: Bắt buộc có ít nhất 1 Scorecard đã khóa để vào bước này"
            >
              <Lock className="h-3 w-3" />
              <span>Guard: ≥ 1 Lock</span>
            </div>
          )}
        </div>

        {stage.type === "OFFER" && (
          <p className="text-[10px] text-slate-400">
            Chỉ ứng viên có phiếu điểm phỏng vấn đã khóa mới hợp lệ kéo vào.
          </p>
        )}
      </div>

      {/* Column Body: Cards List */}
      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3">
        <SortableContext
          items={candidates.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {candidates.map((candidate) => (
            <KanbanCard
              key={candidate.id}
              candidate={candidate}
              role={role}
              onInspectSecurity={onInspectSecurity}
              onInspectCitation={onInspectCitation}
            />
          ))}
        </SortableContext>

        {candidates.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-800 p-6 text-center">
            <p className="text-xs text-slate-500">Kéo ứng viên vào đây</p>
          </div>
        )}
      </div>
    </div>
  );
}
