"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  Download, 
  AlertCircle, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export default function CandidateMagicLinkConfirmPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [rescheduleRequested, setRescheduleRequested] = useState(false);

  const handleDownloadIcs = () => {
    // Tạo file RFC 5545 .ics ảo và trigger tải về
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Hybrid ATS//Interview Scheduler RFC 5545//EN
BEGIN:VEVENT
UID:interview-042-20261030
DTSTAMP:20261029T080000Z
DTSTART:20261030T070000Z
DTEND:20261030T080000Z
SUMMARY:Phỏng Vấn Kỹ Thuật: Senior Java & Cloud Architect
DESCRIPTION:Buổi phỏng vấn trực tuyến với Tech Lead và Hội đồng chuyên môn ATS.
LOCATION:Google Meet: https://meet.google.com/xyz-ats-demo
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "interview_schedule_ats.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="font-bold tracking-tight text-white text-base">HYBRID ATS</span>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
            HMAC-SHA256 Token Valid (BR-13)
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 flex flex-col items-center justify-center">
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                XÁC NHẬN LỊCH PHỎNG VẤN KỸ THUẬT
              </h1>
              <p className="text-xs text-slate-400">
                Vị trí: <strong className="text-indigo-400">Senior Java & Cloud Architect</strong>
              </p>
            </div>
          </div>

          {/* Schedule Info Box */}
          <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-300">
              <Clock className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>
                Thời gian: <strong className="text-white">14:00 – 15:00, Ngày 30/10/2026 (Thứ Sáu)</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Video className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>
                Hình thức: <strong className="text-white">Trực tuyến qua Google Meet</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                Chế độ phỏng vấn: <strong className="text-emerald-300">Hồ sơ mù (Blind Evaluation) chống định kiến</strong>
              </span>
            </div>
          </div>

          {/* Download RFC 5545 .ics calendar */}
          <button
            onClick={handleDownloadIcs}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition"
          >
            <Download className="h-4 w-4 text-indigo-400" />
            <span>Tải tệp lịch chuẩn (.ics) đồng bộ Google / Outlook Calendar</span>
          </button>

          {/* Decision Buttons */}
          {confirmed ? (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-center text-xs text-emerald-300 flex flex-col items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              <span className="font-bold text-sm">Bạn đã xác nhận tham gia thành công!</span>
              <p className="text-slate-300 text-[11px]">
                Hệ thống đã thông báo cho Hội đồng phỏng vấn. Token Magic Link đã được đánh dấu sử dụng theo quy tắc bảo mật 1 lần (BR-13).
              </p>
            </div>
          ) : rescheduleRequested ? (
            <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-4 text-center text-xs text-amber-300 flex flex-col items-center gap-2 animate-in fade-in">
              <AlertCircle className="h-6 w-6 text-amber-400" />
              <span className="font-bold text-sm">Yêu cầu đổi lịch đã được gửi đến Recruiter!</span>
              <p className="text-slate-300 text-[11px]">
                Bộ phận nhân sự sẽ liên hệ lại qua email để sắp xếp khung giờ mới phù hợp hơn cho bạn.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setConfirmed(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 transition"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>XÁC NHẬN THAM GIA</span>
              </button>

              <button
                onClick={() => setRescheduleRequested(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <span>Yêu Cầu Đổi Giờ Khác</span>
              </button>
            </div>
          )}

          <p className="text-[11px] text-slate-500 text-center">
            Liên kết xác nhận này hết hạn trước giờ phỏng vấn 2 tiếng và chỉ có hiệu lực bấm 1 lần duy nhất (Quy tắc BR-13).
          </p>
        </div>
      </main>
    </div>
  );
}
