"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { UserRole } from "@/types";
import { 
  EyeOff, 
  Lock, 
  CheckCircle2, 
  FileText, 
  Award, 
  UserCheck, 
  Users,
  ShieldCheck,
  MessageSquare
} from "lucide-react";

export default function BlindEvaluatePage() {
  const [currentRole, setCurrentRole] = useState<UserRole>("TECHNICAL_INTERVIEWER");
  const [isLocked, setIsLocked] = useState(false);
  const [scores, setScores] = useState({
    c1: 4,
    c2: 5,
    c3: 4,
  });
  const [recommendation, setRecommendation] = useState("STRONG_HIRE");
  const [notes, setNotes] = useState(
    "Ứng viên nắm rất chắc các nguyên lý Transaction Isolation của PostgreSQL và có kinh nghiệm thực tế xử lý Virtual Threads trên Spring Boot 3.2."
  );

  const handleLockScorecard = () => {
    setIsLocked(true);
    alert(
      "Phiếu điểm của bạn đã được NỘP VÀ KHÓA (BR-14). Điểm số không thể chỉnh sửa thêm. Hệ thống hiện đã mở khóa bảng điểm của các thành viên khác trong hội đồng để cùng thảo luận!"
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        securityFlagsCount={0}
      />

      <main className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Header Notification */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">
              <EyeOff className="h-4 w-4" />
              <span>Chế Độ Chống Thiên Kiến & Phỏng Vấn Mù (BR-14, BR-15, BR-16)</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
              HỒ SƠ ĐÁNH GIÁ: CANDIDATE_042
              <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30">
                Row-Level Security OK
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {isLocked ? (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-4 w-4" />
                Phiếu Điểm Đã Khóa (Locked)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                <Lock className="h-4 w-4" />
                Đang Soạn Thảo (Chưa Khóa)
              </span>
            )}
          </div>
        </div>

        {/* Split View: Left = Blind Resume, Right = Blind Scorecard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Blind Resume */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col gap-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                <FileText className="h-4 w-4 text-cyan-400" />
                <span>Hồ Sơ Ẩn Danh (Blind Resume)</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Đã che: Tên, SĐT, Email, Giới tính, Tên trường ĐH
              </span>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800/80 font-mono text-xs leading-relaxed text-slate-300 flex flex-col gap-4">
              <div className="pb-3 border-b border-slate-800">
                <div className="text-cyan-400 font-bold text-sm">[MÃ ĐỊNH DANH: CANDIDATE_042]</div>
                <div className="text-slate-400 text-xs mt-1">
                  Học vấn: <span className="text-slate-200 font-semibold">[UNIVERSITY_TIER_1]</span> - Kỹ sư CNTT
                </div>
                <div className="text-slate-400 text-xs mt-0.5">
                  Tổng thời gian làm việc thực tế: <strong className="text-indigo-400">48 tháng (Đã gộp trùng)</strong>
                </div>
              </div>

              <div>
                <strong className="text-white font-sans uppercase tracking-wider text-[11px] text-indigo-400">
                  1. KỸ NĂNG CHUYÊN MÔN
                </strong>
                <p className="mt-1 text-slate-400 font-sans text-xs">
                  Java 21, Spring Boot 3, Virtual Threads, PostgreSQL, pgvector (HNSW), RabbitMQ, Microservices Modular Monolith.
                </p>
              </div>

              <div>
                <strong className="text-white font-sans uppercase tracking-wider text-[11px] text-indigo-400">
                  2. CÁC DỰ ÁN KỸ THUẬT NỔI BẬT
                </strong>
                <div className="mt-2 flex flex-col gap-2 font-sans text-xs">
                  <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                    <span className="font-bold text-white">Dự án: Core Banking Microservices (24 tháng)</span>
                    <p className="text-slate-400 mt-1">
                      - Thiết kế kiến trúc chịu tải cao với Spring Boot 3.2, nâng cấp lên Virtual Threads giúp giảm 45% thời gian phản hồi giao dịch.
                      <br />- Cấu hình RabbitMQ cluster đảm bảo Idempotent Consumer và quản trị Dead-Letter Queue.
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                    <span className="font-bold text-white">Dự án: Hệ thống Tìm kiếm Ngữ nghĩa (18 tháng)</span>
                    <p className="text-slate-400 mt-1">
                      - Tích hợp PostgreSQL 16 với extension pgvector sử dụng chỉ mục HNSW để tra cứu tài liệu nhanh dưới 30ms trên tập 5 triệu vector.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Blind Scorecard */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col gap-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Phiếu Chấm Điểm Độc Lập (Blind Scorecard)</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Người phỏng vấn: <strong className="text-white">Tech Lead (Bạn)</strong>
              </span>
            </div>

            {/* Criteria Grades */}
            <div className="flex flex-col gap-4">
              {/* Criterion 1 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                  <span>1. Tư duy Cấu trúc Dữ liệu & Thuật toán</span>
                  <span className="text-amber-300 font-bold">{scores.c1} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  disabled={isLocked}
                  value={scores.c1}
                  onChange={(e) => setScores({ ...scores, c1: Number(e.target.value) })}
                  className="accent-indigo-500 cursor-pointer disabled:opacity-50"
                />
              </div>

              {/* Criterion 2 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                  <span>2. Kiến trúc Hệ thống & Tối ưu Database</span>
                  <span className="text-amber-300 font-bold">{scores.c2} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  disabled={isLocked}
                  value={scores.c2}
                  onChange={(e) => setScores({ ...scores, c2: Number(e.target.value) })}
                  className="accent-indigo-500 cursor-pointer disabled:opacity-50"
                />
              </div>

              {/* Criterion 3 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                  <span>3. Kỹ năng Trình bày & Xử lý Edge Cases</span>
                  <span className="text-amber-300 font-bold">{scores.c3} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  disabled={isLocked}
                  value={scores.c3}
                  onChange={(e) => setScores({ ...scores, c3: Number(e.target.value) })}
                  className="accent-indigo-500 cursor-pointer disabled:opacity-50"
                />
              </div>

              {/* Overall Recommendation */}
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-xs font-semibold text-slate-300">
                  Khuyến nghị Tuyển dụng Chung:
                </label>
                <select
                  disabled={isLocked}
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                >
                  <option value="STRONG_HIRE">Strong Hire (Rất khuyến nghị)</option>
                  <option value="HIRE">Hire (Đạt yêu cầu)</option>
                  <option value="NO_HIRE">No Hire (Không đạt)</option>
                  <option value="STRONG_NO_HIRE">Strong No Hire (Rất không khuyến nghị)</option>
                </select>
              </div>

              {/* Commentary */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Nhận xét Chi tiết Buổi Phỏng vấn:
                </label>
                <textarea
                  rows={3}
                  disabled={isLocked}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                />
              </div>

              {/* Submit & Lock Button (BR-14) */}
              {!isLocked ? (
                <button
                  onClick={handleLockScorecard}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition"
                >
                  <Lock className="h-4 w-4" />
                  <span>NỘP & KHÓA PHIẾU ĐIỂM (SUBMIT & LOCK)</span>
                </button>
              ) : (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3 text-center text-xs text-emerald-300">
                  Phiếu điểm đã khóa lúc 15:30. Không thể chỉnh sửa điểm gốc.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Committee Consensus View (Only unlocked when isLocked = true!) */}
        {isLocked && (
          <div className="rounded-2xl border border-indigo-500/40 bg-slate-900/90 p-6 flex flex-col gap-4 shadow-2xl animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800 pb-3">
              <Users className="h-5 w-5 text-indigo-400" />
              <span>KẾT QUẢ ĐỐI CHIẾU HỘI ĐỒNG PHỎNG VẤN (COMMITTEE CONSENSUS)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                  <span>Phiếu điểm của Bạn (Tech Lead)</span>
                  <span className="text-emerald-400">4.7 / 5.0 (Strong Hire)</span>
                </div>
                <p className="text-xs text-slate-400 italic">"{notes}"</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                  <span>Interviewer 2: Senior Architect (Nguyễn Văn Minh)</span>
                  <span className="text-emerald-400">4.5 / 5.0 (Strong Hire)</span>
                </div>
                <p className="text-xs text-slate-400 italic">
                  "Ứng viên có kiến thức nền tảng rất vững về Distributed Systems và khả năng gỡ lỗi Transaction Deadlock xuất sắc."
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-3 text-xs text-emerald-300">
              <span className="font-semibold">
                Đủ điều kiện chuyển bước: Đã có 2/2 phiếu điểm được nộp và khóa!
              </span>
              <button
                onClick={() => alert("Đã mở khóa kéo sang cột OFFER trên Kanban!")}
                className="rounded-lg bg-emerald-600 px-3 py-1.5 font-bold text-white hover:bg-emerald-500 transition"
              >
                Mở Khóa Vòng Offer (BR-05)
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
