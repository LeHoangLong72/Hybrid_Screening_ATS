"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { Stage, CandidateApplication, UserRole } from "@/types";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { 
  AlertTriangle, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert,
  ArrowRightLeft
} from "lucide-react";

interface KanbanBoardProps {
  initialStages: Stage[];
  initialCandidates: CandidateApplication[];
  role: UserRole;
  onInspectSecurity?: (candidate: CandidateApplication) => void;
  onInspectCitation?: (candidate: CandidateApplication) => void;
}

export function KanbanBoard({
  initialStages,
  initialCandidates,
  role,
  onInspectSecurity,
  onInspectCitation,
}: KanbanBoardProps) {
  const [stages] = useState<Stage[]>(initialStages);
  const [candidates, setCandidates] = useState<CandidateApplication[]>(initialCandidates);
  const [activeCandidate, setActiveCandidate] = useState<CandidateApplication | null>(null);
  const [notification, setNotification] = useState<{
    type: "SUCCESS" | "CONFLICT_409" | "GUARD_VIOLATION";
    message: string;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const candidate = candidates.find((c) => c.id === event.active.id);
    if (candidate) {
      setActiveCandidate(candidate);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCandidate(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const candidate = candidates.find((c) => c.id === activeId);
    if (!candidate) return;

    // Determine target stage
    let targetStageId = overId;
    const overCandidate = candidates.find((c) => c.id === overId);
    if (overCandidate) {
      targetStageId = overCandidate.stageId;
    }

    const targetStage = stages.find((s) => s.id === targetStageId);
    if (!targetStage || targetStage.id === candidate.stageId) return;

    // 1. Kiểm tra Quy tắc BR-05 (Điều kiện Chốt chặn Vòng Offer)
    if (targetStage.type === "OFFER" && candidate.lockedScorecardsCount < 1) {
      setNotification({
        type: "GUARD_VIOLATION",
        message: `Chặn chuyển bước (BR-05): Ứng viên ${candidate.candidateCode} (${candidate.fullName}) chưa có phiếu điểm phỏng vấn nào ở trạng thái SUBMITTED_AND_LOCKED. Yêu cầu hoàn tất phỏng vấn trước khi vào Offer!`,
      });
      return;
    }

    // 2. Chuyển bước thành công (Optimistic Update)
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidate.id
          ? {
              ...c,
              stageId: targetStage.id,
              version: c.version + 1,
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );

    setNotification({
      type: "SUCCESS",
      message: `Đã chuyển ${candidate.candidateCode} sang bước "${targetStage.name}" thành công (Phiên bản v${candidate.version + 1}).`,
    });
  };

  // Mô phỏng đụng độ khóa lạc quan HTTP 409 Conflict (OptimisticLockException)
  const simulateConcurrencyConflict = () => {
    setNotification({
      type: "CONFLICT_409",
      message: `Đụng độ đồng thời (HTTP 409 Conflict): Recruiter B vừa cập nhật ứng viên CAND-042 sang bước 'Từ Chối' cách đây vài mili-giây. Dữ liệu trên bảng của bạn đã tự động hoàn tác để đảm bảo tính toàn vẹn!`,
    });
  };

  // Tái cân bằng LexoRank
  const handleRebalanceLexoRank = () => {
    setNotification({
      type: "SUCCESS",
      message: `Đã thực thi tái cân bằng LexoRank (BR-03): Đánh lại chỉ số vị trí cách đều cho tất cả các thẻ trong cột để tối ưu hóa không gian chèn.`,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Action Controls & Simulation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Công cụ Kiểm thử Quy tắc:</span>
          <button
            onClick={simulateConcurrencyConflict}
            className="flex items-center gap-1.5 rounded-lg border border-amber-600/50 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20 transition"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            <span>Mô phỏng Đụng độ Kéo thả (409 Conflict)</span>
          </button>

          <button
            onClick={handleRebalanceLexoRank}
            className="flex items-center gap-1.5 rounded-lg border border-indigo-600/50 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Tái Cân Bằng LexoRank (BR-03)</span>
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Tổng số ứng viên trong đợt: <strong className="text-white">{candidates.length}</strong>
        </div>
      </div>

      {/* Notification Banner / Toast */}
      {notification && (
        <div
          className={`flex items-start justify-between rounded-xl p-3.5 border text-xs transition-all ${
            notification.type === "SUCCESS"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
              : notification.type === "GUARD_VIOLATION"
              ? "bg-rose-950/70 border-rose-500/50 text-rose-200 animate-bounce"
              : "bg-amber-950/70 border-amber-500/50 text-amber-200"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notification.type === "SUCCESS" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
            )}
            <span className="leading-relaxed">{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-white ml-4 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Kanban Board Columns Container */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex h-[calc(100vh-230px)] gap-4 overflow-x-auto pb-4 pt-1">
          {stages.map((stage) => {
            const stageCandidates = candidates.filter((c) => c.stageId === stage.id);
            return (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                candidates={stageCandidates}
                role={role}
                onInspectSecurity={onInspectSecurity}
                onInspectCitation={onInspectCitation}
              />
            );
          })}
        </div>

        {/* Drag Overlay for Smooth Visual Effect */}
        <DragOverlay>
          {activeCandidate ? (
            <div className="w-80 opacity-95 rotate-2 scale-105">
              <KanbanCard candidate={activeCandidate} role={role} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
