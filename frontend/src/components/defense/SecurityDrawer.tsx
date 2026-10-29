"use client";

import { CandidateApplication } from "@/types";
import { ShieldAlert, AlertOctagon, CheckCircle2, XCircle, FileWarning, Eye } from "lucide-react";

interface SecurityDrawerProps {
  candidate: CandidateApplication | null;
  onClose: () => void;
  onAcceptQuarantine: (candidateId: string) => void;
  onRejectFraud: (candidateId: string) => void;
}

export function SecurityDrawer({
  candidate,
  onClose,
  onAcceptQuarantine,
  onRejectFraud,
}: SecurityDrawerProps) {
  if (!candidate || !candidate.hasSecurityFlag) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex h-full w-full max-w-2xl flex-col border-l border-rose-500/30 bg-slate-900 shadow-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-rose-500/20 bg-rose-950/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                THANH TRA GIAN LẬN PROMPT INJECTION
                <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                  BR-11 Active
                </span>
              </h3>
              <p className="text-xs text-rose-300">
                Hồ sơ: <strong className="text-white">{candidate.candidateCode}</strong> — {candidate.fullName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-1 flex-col gap-5 p-6">
          {/* Explanation Alert */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-200 leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-rose-400 mb-1">
              <AlertOctagon className="h-4 w-4" />
              <span>Phát hiện Dấu hiệu Điều khiển Hệ thống AI trong tệp CV:</span>
            </div>
            Hệ thống đã tự động bóc tách và cách ly các đoạn văn bản độc hại (kích thước chữ cực nhỏ ≤ 2pt hoặc chữ trắng trên nền trắng) khỏi luồng gửi sang LLM để bảo vệ tính toàn vẹn của kết quả chấm điểm.
          </div>

          {/* List of Detected Threats */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Chi tiết các đoạn mã bị chặn ({candidate.securityThreats?.length || 0} vi phạm)
            </h4>

            {candidate.securityThreats?.map((threat, index) => (
              <div
                key={threat.id || index}
                className="rounded-xl border border-slate-700 bg-slate-800/80 p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <FileWarning className="h-4 w-4" />
                    {threat.type === "TINY_FONT"
                      ? `Chữ tàng hình siêu nhỏ (${threat.fontSize}pt)`
                      : threat.type === "COLOR_MATCH_BACKGROUND"
                      ? "Chữ trùng màu nền trang (#FFFFFF)"
                      : "Lệnh can thiệp System Prompt"}
                  </span>
                  <span className="text-[11px] text-slate-400">{threat.description}</span>
                </div>

                {/* Quarantined Text Box */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Nội dung độc hại đã cách ly (Quarantined String):
                  </span>
                  <div className="rounded-lg bg-slate-950 p-3 font-mono text-xs text-rose-300 border border-rose-900/60 break-all select-all">
                    "{threat.quarantinedText}"
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recruiter Decisions (BR-11) */}
          <div className="mt-auto flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <span className="text-xs font-semibold text-slate-300">
              Quyết định của Chuyên viên Tuyển dụng (Recruiter Action):
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onAcceptQuarantine(candidate.id)}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-indigo-500 transition"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Cho Phép Tiếp Tục (Xóa Bỏ Mã Độc)</span>
              </button>

              <button
                onClick={() => onRejectFraud(candidate.id)}
                className="flex items-center justify-center gap-2 rounded-xl border border-rose-600 bg-rose-600/20 px-4 py-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-600 hover:text-white transition"
              >
                <XCircle className="h-4 w-4" />
                <span>Đánh Trượt Ngay Vì Gian Lận</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Theo quy tắc BR-11: Hệ thống không tự động đánh rớt để tránh false positive, quyền quyết định cuối cùng thuộc về con người.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
