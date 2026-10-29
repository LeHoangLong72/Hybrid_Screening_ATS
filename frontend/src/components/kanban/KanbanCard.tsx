"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CandidateApplication, UserRole } from "@/types";
import { formatExperience } from "@/lib/utils";
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  GripVertical,
  Award
} from "lucide-react";

interface KanbanCardProps {
  candidate: CandidateApplication;
  role: UserRole;
  onInspectSecurity?: (candidate: CandidateApplication) => void;
  onInspectCitation?: (candidate: CandidateApplication) => void;
}

export function KanbanCard({ 
  candidate, 
  role, 
  onInspectSecurity,
  onInspectCitation 
}: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: candidate.id,
    data: { candidate },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isInterviewer = role === "TECHNICAL_INTERVIEWER";
  const displayName = isInterviewer ? candidate.blindCode : candidate.fullName;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-xl border bg-slate-800/90 p-3.5 shadow-sm transition-all duration-200 select-none ${
        isDragging
          ? "z-50 border-indigo-500 bg-slate-800 opacity-90 shadow-2xl ring-2 ring-indigo-500/50 rotate-1 scale-[1.02]"
          : "border-slate-700/60 hover:border-slate-600 hover:shadow-md hover:bg-slate-800"
      }`}
    >
      {/* Top Header: Candidate Code & Drag Handle */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/50">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono font-bold tracking-wider text-indigo-400">
            {candidate.candidateCode}
          </span>
          <span className="text-[10px] text-slate-500">v{candidate.version}</span>
        </div>

        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-slate-500 hover:text-slate-300 active:cursor-grabbing p-0.5 rounded"
          title="Kéo thả vị trí"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Candidate Name & Experience */}
      <div className="mb-2.5">
        <h4 className="text-sm font-semibold text-white tracking-tight flex items-center gap-1.5">
          {displayName}
          {isInterviewer && (
            <span className="text-[10px] font-normal text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800/50">
              Blind
            </span>
          )}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-400">
            Kinh nghiệm: <strong className="text-slate-200">{formatExperience(candidate.totalWorkExpMonths)}</strong>
          </span>
          <span className="text-[11px] text-slate-500">• {candidate.universityTier}</span>
        </div>
      </div>

      {/* Screening Scores (RRF & Rubric) */}
      {(candidate.rrfScore || candidate.rubricScore) && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-slate-900/60 p-2 border border-slate-700/40">
          {candidate.rubricScore && (
            <button
              onClick={() => onInspectCitation?.(candidate)}
              className="flex items-center gap-1.5 text-xs hover:opacity-80 transition"
              title="Bấm để xem chi tiết trích dẫn minh chứng CV"
            >
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-[11px] text-slate-300">Rubric:</span>
              <span className="font-bold text-amber-300">{candidate.rubricScore}/100</span>
            </button>
          )}

          {candidate.rrfScore && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 border-l border-slate-700/60 pl-2">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span>RRF Top {candidate.vectorRank || 1}</span>
            </div>
          )}
        </div>
      )}

      {/* Critical Badges: Prompt Injection, Cooldown 180d, Scorecards */}
      <div className="flex flex-col gap-1.5">
        {/* Security Threat Flag (BR-11) */}
        {candidate.hasSecurityFlag && (
          <button
            onClick={() => onInspectSecurity?.(candidate)}
            className="flex items-center justify-between gap-1.5 rounded-md bg-rose-500/10 px-2 py-1 text-[11px] font-medium text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition animate-pulse"
          >
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-400 shrink-0" />
              <span>Phát hiện Prompt Injection tàng hình</span>
            </div>
            <span className="underline text-[10px]">Thanh tra</span>
          </button>
        )}

        {/* 180-Day Cooldown Flag (BR-17) */}
        {candidate.cooldownFlag && (
          <div className="flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2 py-1 text-[11px] font-medium text-amber-400 border border-amber-500/30">
            <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="truncate">Cảnh báo: Trượt PV trong 180 ngày</span>
          </div>
        )}

        {/* Interview Scorecards Counter (BR-05) */}
        {candidate.stageId === "stage-interview" && (
          <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/40 rounded px-2 py-1 border border-slate-700/40">
            <span>Phiếu điểm phỏng vấn:</span>
            <span className={`font-semibold ${candidate.lockedScorecardsCount > 0 ? "text-emerald-400" : "text-amber-400"}`}>
              {candidate.lockedScorecardsCount}/{candidate.scorecardsCount} Đã khóa
            </span>
          </div>
        )}

        {/* Hard filter rejection reason if any */}
        {candidate.failedHardFilterReason && (
          <div className="flex items-center gap-1.5 rounded-md bg-rose-950/40 px-2 py-1 text-[10px] text-rose-300 border border-rose-800/40">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span className="line-clamp-1">{candidate.failedHardFilterReason}</span>
          </div>
        )}
      </div>
    </div>
  );
}
