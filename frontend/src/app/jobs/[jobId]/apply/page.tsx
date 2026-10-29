"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_JOB } from "@/lib/mock-data";
import { 
  ShieldCheck, 
  UploadCloud, 
  CheckCircle2, 
  Briefcase, 
  MapPin, 
  ArrowLeft,
  FileCheck2,
  Lock
} from "lucide-react";

export default function PublicApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại Trang Chủ</span>
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-semibold">
            <Lock className="h-3.5 w-3.5" />
            <span>Mã Hóa AES-256 (Nghị định 13/2023/NĐ-CP)</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 flex flex-col gap-8">
        {/* Job Header */}
        <div className="flex flex-col gap-2 border-b border-slate-800 pb-6">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            {MOCK_JOB.department}
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {MOCK_JOB.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-500" />
              {MOCK_JOB.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-slate-500" />
              Yêu cầu tối thiểu 24 tháng kinh nghiệm thực tế
            </span>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-8 text-center flex flex-col items-center gap-4 animate-in fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Nộp Hồ Sơ Ứng Tuyển Thành Công!</h3>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Mã hồ sơ tra cứu của bạn là <strong className="text-emerald-400">CAND-2026-X9</strong>. Mọi thông tin liên hệ và lý lịch của bạn đã được bảo vệ trong kho mã hóa an toàn. Khi được mời phỏng vấn, bạn sẽ nhận được email kèm tệp lịch <code className="text-indigo-300">.ics</code> và Magic Link để xác nhận mà không cần tạo tài khoản.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
            >
              Nộp thêm hồ sơ khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Candidate Basic Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Họ và Tên <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Địa Chỉ Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Số Điện Thoại <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0912345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Đường dẫn GitHub / Portfolio (Tùy chọn)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Resume Upload Dropzone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Tệp Hồ Sơ CV (Định dạng PDF hoặc DOCX) <span className="text-rose-400">*</span>
              </label>
              <div className="rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900/50 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition">
                <UploadCloud className="h-8 w-8 text-indigo-400 mb-2" />
                <span className="text-xs font-bold text-white">Chọn tệp CV để tải lên</span>
                <span className="text-[11px] text-slate-500 mt-1">Dung lượng tối đa 10MB</span>
              </div>
            </div>

            {/* Security Guarantee Notice */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-start gap-3 text-xs text-slate-400">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-white">Cam kết Bảo vệ Quyền Riêng tư Tuyệt đối:</strong>{" "}
                Chúng tôi không chia sẻ thông tin định danh cá nhân của bạn ra ngoài. Toàn bộ CV được xử lý bằng thuật toán che dữ liệu nhạy cảm (Zero-PII Egress) trước khi đánh giá kỹ thuật.
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition"
            >
              <span>GỬI HỒ SƠ ỨNG TUYỂN</span>
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
