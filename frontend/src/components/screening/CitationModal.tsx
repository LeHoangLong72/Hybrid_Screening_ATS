"use client";

import { CandidateApplication } from "@/types";
import { Award, CheckCircle2, AlertTriangle, FileText, ExternalLink } from "lucide-react";

interface CitationModalProps {
  candidate: CandidateApplication | null;
  onClose: () => void;
}

export function CitationModal({ candidate, onClose }: CitationModalProps) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm animate-in fade-in">
      <div className="flex h-full max-h-[85vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-800/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                KIỂM CHỨNG TRÍCH DẪN RUBRIC (BR-08)
                <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[11px] font-semibold text-indigo-300 border border-indigo-500/30">
                  Chống Ảo Giác AI
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Ứng viên: <strong className="text-white">{candidate.candidateCode}</strong> ({candidate.fullName}) — Tổng điểm:{" "}
                <span className="text-amber-300 font-bold">{candidate.rubricScore || 0}/100</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Split View */}
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-y-auto divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Left Col: Rubric Criteria & Evidence Quotes */}
          <div className="flex flex-col gap-4 p-6 overflow-y-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Chi tiết Đánh giá Tiêu chí ({candidate.rubricEvidences?.length || 0} Tiêu chí)
            </h4>

            {candidate.rubricEvidences?.map((evidence, idx) => (
              <div
                key={evidence.criterionId || idx}
                className={`rounded-xl border p-4 flex flex-col gap-2.5 ${
                  evidence.isVerified
                    ? "border-emerald-500/30 bg-emerald-950/10"
                    : "border-rose-500/40 bg-rose-950/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-white leading-snug">
                    {evidence.criterionName}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                      evidence.isVerified
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    }`}
                  >
                    {evidence.isVerified
                      ? `[v] Khớp ${(evidence.matchSimilarity * 100).toFixed(0)}%`
                      : `[!] Nghi ngờ Ảo giác`}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span>Trọng số: <strong>{evidence.weight}%</strong></span>
                  <span>Điểm: <strong className="text-amber-300">{evidence.score}/5</strong></span>
                </div>

                <p className="text-xs text-slate-400 italic">
                  "{evidence.justification}"
                </p>

                {/* Evidence Quote Box */}
                <div className="rounded-lg bg-slate-950/80 p-3 border border-slate-800 flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    Câu trích dẫn nguyên văn từ CV:
                  </span>
                  <p className="font-mono text-xs text-amber-200">
                    "{evidence.evidenceQuote}"
                  </p>
                  {evidence.cvSnippetLocation && (
                    <span className="text-[10px] text-slate-500">
                      Vị trí: {evidence.cvSnippetLocation}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Col: Redacted CV Preview with Glowing Highlight */}
          <div className="flex flex-col gap-3 p-6 bg-slate-950/40 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-indigo-400" />
                Văn bản CV gốc đã che PII (Redacted Preview)
              </span>
              <span className="text-[10px] text-slate-500">Zero-PII Active</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-300 flex flex-col gap-3">
              <div className="border-b border-slate-800 pb-2 text-slate-400">
                [HỌ TÊN: [CANDIDATE_ID]] | [SĐT: [REDACTED_PHONE]] | [EMAIL: [REDACTED_EMAIL]]
                <br />
                Học vấn: [UNIVERSITY_TIER_1] - Kỹ sư CNTT
              </div>

              <div>
                <strong className="text-indigo-400">KINH NGHIỆM LÀM VIỆC (WORK EXPERIENCE):</strong>
                <p className="mt-1 text-slate-400">
                  Tech Lead / Senior Java Engineer (01/2022 - Hiện tại)
                </p>
                <div className="mt-2 rounded-md bg-amber-500/20 border border-amber-500/50 p-2 text-amber-100 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  "Đã tái cấu trúc hệ thống Core Banking sang Spring Boot 3.2 và áp dụng Virtual Threads giúp giảm 45% độ trễ tại Ngân hàng số..."
                </div>
                <p className="mt-2 text-slate-400">
                  - Tối ưu hóa các tiến trình xử lý luồng giao dịch tài chính lớn, ứng dụng cấu trúc Modular Monolith.
                </p>
              </div>

              <div>
                <strong className="text-indigo-400">HỆ THỐNG DỮ LIỆU & TÌM KIẾM:</strong>
                <div className="mt-2 rounded-md bg-amber-500/20 border border-amber-500/50 p-2 text-amber-100 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  "Thiết kế cơ sở dữ liệu PostgreSQL 15 phân vùng với pgvector HNSW index hỗ trợ tra cứu tương đồng..."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
