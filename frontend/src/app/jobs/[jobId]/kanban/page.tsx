"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { SecurityDrawer } from "@/components/defense/SecurityDrawer";
import { CitationModal } from "@/components/screening/CitationModal";
import { MOCK_JOB, MOCK_STAGES, MOCK_CANDIDATES } from "@/lib/mock-data";
import { CandidateApplication, UserRole } from "@/types";
import { Briefcase, MapPin, Users, Award, ShieldCheck, ChevronRight } from "lucide-react";

export default function KanbanPage() {
  const [currentRole, setCurrentRole] = useState<UserRole>("RECRUITER");
  const [selectedSecurityCandidate, setSelectedSecurityCandidate] = useState<CandidateApplication | null>(null);
  const [selectedCitationCandidate, setSelectedCitationCandidate] = useState<CandidateApplication | null>(null);

  const handleAcceptQuarantine = (candidateId: string) => {
    alert(`Đã chấp nhận gỡ bỏ mã độc và cho phép hồ sơ ${candidateId} tiếp tục luồng sàng lọc.`);
    setSelectedSecurityCandidate(null);
  };

  const handleRejectFraud = (candidateId: string) => {
    alert(`Đã đánh trượt hồ sơ ${candidateId} vì hành vi gian lận Prompt Injection.`);
    setSelectedSecurityCandidate(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        securityFlagsCount={1}
      />

      <main className="flex-1 flex flex-col px-6 py-4 max-w-[1920px] mx-auto w-full">
        {/* Job Header Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Đợt tuyển dụng</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-indigo-400 font-medium">{MOCK_JOB.department}</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
              {MOCK_JOB.title}
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                {MOCK_JOB.status}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span>{MOCK_JOB.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-slate-500" />
              <span>Yêu cầu KN: <strong className="text-slate-200">24 tháng</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Rubric: <strong className="text-slate-200">4 Tiêu chí (100%)</strong></span>
            </div>
          </div>
        </div>

        {/* Kanban Board Container */}
        <KanbanBoard
          initialStages={MOCK_STAGES}
          initialCandidates={MOCK_CANDIDATES}
          role={currentRole}
          onInspectSecurity={(c) => setSelectedSecurityCandidate(c)}
          onInspectCitation={(c) => setSelectedCitationCandidate(c)}
        />
      </main>

      {/* Security Threat Inspection Drawer */}
      <SecurityDrawer
        candidate={selectedSecurityCandidate}
        onClose={() => setSelectedSecurityCandidate(null)}
        onAcceptQuarantine={handleAcceptQuarantine}
        onRejectFraud={handleRejectFraud}
      />

      {/* Rubric Evidence Citation Inspection Modal */}
      <CitationModal
        candidate={selectedCitationCandidate}
        onClose={() => setSelectedCitationCandidate(null)}
      />
    </div>
  );
}
