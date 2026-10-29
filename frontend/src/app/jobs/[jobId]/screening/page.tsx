"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { CitationModal } from "@/components/screening/CitationModal";
import { MOCK_JOB, MOCK_CANDIDATES } from "@/lib/mock-data";
import { CandidateApplication, UserRole } from "@/types";
import { formatExperience } from "@/lib/utils";
import { 
  Filter, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  ArrowRight,
  TrendingUp,
  Cpu
} from "lucide-react";

export default function ScreeningPage() {
  const [currentRole, setCurrentRole] = useState<UserRole>("RECRUITER");
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateApplication | null>(null);

  const topCandidates = MOCK_CANDIDATES.filter((c) => c.rubricScore !== undefined).sort(
    (a, b) => (b.rubricScore || 0) - (a.rubricScore || 0)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        securityFlagsCount={1}
      />

      <main className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Title & Overview */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              PHỄU SÀNG LỌC LAI 3 TẦNG (3-STAGE HYBRID FUNNEL)
              <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                FLOW-04
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Khung sàng lọc kết hợp Lọc Cứng SQL, Truy xuất Lai BM25 + Vector RRF và Chấm Rubric LLM có kiểm chứng trích dẫn.
            </p>
          </div>

          <button
            onClick={() => alert("Đang kích hoạt quy trình sàng lọc 3 tầng trên RabbitMQ Worker...")}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition"
          >
            <Cpu className="h-4 w-4" />
            <span>Chạy Lại Sàng Lọc Toàn Bộ</span>
          </button>
        </div>

        {/* 3-Stage Visual Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stage 1 */}
          <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  TẦNG 1: LỌC CỨNG SQL
                </span>
                <Filter className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">45 → 38 Ứng viên</h3>
              <p className="text-xs text-slate-400 mt-1">
                Lọc nhanh bằng truy vấn SQL: Loại bỏ 7 ứng viên có kinh nghiệm thực tế &lt; 24 tháng (sau khi gộp khoảng thời gian trùng).
              </p>
            </div>
            <div className="mt-4 text-[11px] text-blue-300 bg-blue-900/40 rounded-lg p-2 border border-blue-800/40">
              Chi phí AI: <strong>0 $ (Không gọi LLM)</strong>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  TẦNG 2: BM25 + VECTOR RRF
                </span>
                <Sparkles className="h-4 w-4 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">38 → Top 20 Tiềm năng</h3>
              <p className="text-xs text-slate-400 mt-1">
                Kết hợp Full-Text Search (ts_rank_cd) và Vector Cosine pgvector (HNSW) với công thức Reciprocal Rank Fusion (k=60).
              </p>
            </div>
            <div className="mt-4 text-[11px] text-purple-300 bg-purple-900/40 rounded-lg p-2 border border-purple-800/40">
              Thuật toán: <strong>RRF Score (k=60)</strong>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  TẦNG 3: LLM RUBRIC & CITATION
                </span>
                <Award className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Top 20 Hồ sơ Xếp hạng Chi tiết</h3>
              <p className="text-xs text-slate-400 mt-1">
                LLM chấm điểm theo Rubric 4 tiêu chí. Bắt buộc kèm câu trích dẫn nguyên văn từ CV và kiểm chứng chống Hallucination (BR-08).
              </p>
            </div>
            <div className="mt-4 text-[11px] text-amber-300 bg-amber-900/40 rounded-lg p-2 border border-amber-800/40">
              Bảo mật: <strong>Zero-PII Egress qua AES-256</strong>
            </div>
          </div>
        </div>

        {/* Top 20 Ranked Candidates Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              BẢNG XẾP HẠNG ỨNG VIÊN SAU PHỄU SÀNG LỌC 3 TẦNG
            </h3>
            <span className="text-xs text-slate-400">
              Nhấp vào ứng viên để soi chi tiết câu trích dẫn CV
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3">Hạng</th>
                  <th className="px-6 py-3">Mã Hồ Sơ</th>
                  <th className="px-6 py-3">Họ Tên (Recruiter View)</th>
                  <th className="px-6 py-3">Kinh Nghiệm Thực (Gộp)</th>
                  <th className="px-6 py-3">BM25 Rank</th>
                  <th className="px-6 py-3">Vector Rank</th>
                  <th className="px-6 py-3">RRF Score</th>
                  <th className="px-6 py-3">Điểm Rubric</th>
                  <th className="px-6 py-3">Kiểm Chứng Trích Dẫn</th>
                  <th className="px-6 py-3 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {topCandidates.map((c, index) => {
                  const hasUnverified = c.rubricEvidences?.some((e) => !e.isVerified);
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCandidate(c)}
                      className="hover:bg-slate-800/60 cursor-pointer transition"
                    >
                      <td className="px-6 py-4 font-bold text-white">#{index + 1}</td>
                      <td className="px-6 py-4 font-bold text-indigo-400">{c.candidateCode}</td>
                      <td className="px-6 py-4 font-sans font-medium text-slate-200">
                        {currentRole === "TECHNICAL_INTERVIEWER" ? c.blindCode : c.fullName}
                      </td>
                      <td className="px-6 py-4 text-slate-300 font-sans">
                        {formatExperience(c.totalWorkExpMonths)}
                      </td>
                      <td className="px-6 py-4 text-blue-400 font-semibold">#{c.bm25Rank}</td>
                      <td className="px-6 py-4 text-purple-400 font-semibold">#{c.vectorRank}</td>
                      <td className="px-6 py-4 text-slate-300 font-bold">{c.rrfScore?.toFixed(4)}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          {c.rubricScore}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 font-sans">
                        {hasUnverified ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-400 border border-rose-500/30">
                            <AlertTriangle className="h-3 w-3" />
                            Có trích dẫn ảo giác
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 className="h-3 w-3" />
                            Đã xác thực 100%
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-sans">
                        <button className="text-indigo-400 hover:text-indigo-300 font-semibold underline text-xs">
                          Soi Bằng Chứng
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <CitationModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </div>
  );
}
