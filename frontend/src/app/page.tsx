"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { UserRole } from "@/types";
import { 
  ShieldCheck, 
  Layers, 
  Filter, 
  EyeOff, 
  UploadCloud, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Lock, 
  Sparkles,
  Award,
  Zap,
  Terminal,
  FileCheck
} from "lucide-react";

export default function HomePage() {
  const [currentRole, setCurrentRole] = useState<UserRole>("RECRUITER");

  const modules = [
    {
      title: "Bảng Kanban Tác Nghiệp & Kiểm Soát Đồng Thời",
      desc: "Kéo thả ứng viên với chỉ mục LexoRank (@dnd-kit/core), kiểm soát khóa lạc quan (@Version) chống đụng độ và tự động kiểm tra Guard Condition vòng Offer.",
      href: "/jobs/job-it-01/kanban",
      icon: Layers,
      badge: "FLOW-05 & BR-01..05",
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Phễu Sàng Lọc Lai 3 Tầng (Hybrid Screening)",
      desc: "Lọc cứng SQL (Tầng 1) -> Truy xuất lai BM25 + Vector RRF pgvector (Tầng 2) -> LLM Rubric Reranker có kiểm chứng câu trích dẫn CV chống ảo giác (Tầng 3).",
      href: "/jobs/job-it-01/screening",
      icon: Filter,
      badge: "FLOW-04 & BR-06..09",
      color: "from-purple-600 to-violet-600",
    },
    {
      title: "Tiếp Nhận CV & Phòng Thủ Prompt Injection",
      desc: "Bóc tách đa cột (PDFBox Bounding Box), phát hiện chữ tàng hình <=2pt hoặc chữ trùng màu nền trang in, cách ly mã độc và mã hóa AES-256 PII Vault.",
      href: "/jobs/job-it-01/ingestion",
      icon: ShieldCheck,
      badge: "FLOW-02 & BR-10..12",
      color: "from-rose-600 to-pink-600",
    },
    {
      title: "Phỏng Vấn Mù & Phiếu Điểm Độc Lập",
      desc: "Interviewer chỉ thấy Blind Resume (ẩn sạch PII và tên trường ĐH). Phiếu điểm Blind Scorecard cô lập hoàn toàn cho tới khi bấm 'Nộp & Khóa'.",
      href: "/interviews/int-042-1/evaluate",
      icon: EyeOff,
      badge: "FLOW-06 & BR-14..16",
      color: "from-cyan-600 to-teal-600",
    },
    {
      title: "Nộp Đơn Công Khai & Stateless Magic Link",
      desc: "Trang nộp hồ sơ công khai cho ứng viên (không cần tài khoản), tự động nhận email đính kèm tệp lịch .ics (RFC 5545) và xác nhận qua Magic Link ký HMAC-SHA256.",
      href: "/jobs/job-it-01/apply",
      icon: FileCheck,
      badge: "CANDIDATE FACING & BR-13",
      color: "from-amber-600 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        securityFlagsCount={1}
      />

      <main className="flex-1 px-6 py-10 max-w-7xl mx-auto w-full flex flex-col gap-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center gap-4 py-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Đề Tài: Lean ATS with Multi-Stage Hybrid Screening & Defense</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
            Hệ Thống Quản Trị Tuyển Dụng Tinh Gọn & Sàng Lọc Hồ Sơ Lai Đa Tầng
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
            Kiến trúc phân bổ chuẩn xác <strong>70%–75% Kỹ thuật Phần mềm Cốt lõi</strong> (Workflow động, PDF đa cột, LexoRank, Zero-PII Vault) và <strong>25%–30% AI Copilot có kiểm soát</strong> (pgvector, Rubric Reranker có kiểm chứng bằng chứng).
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>Zero-PII Egress: <strong>100% On-Premise</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Chỉ số nDCG@10: <strong>≥ 0.82</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Khóa Lạc Quan: <strong>@Version Concurrency</strong></span>
            </div>
          </div>
        </div>

        {/* Core Workspaces Navigation Grid */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Terminal className="h-5 w-5 text-indigo-400" />
            <span>DANH MỤC KHÔNG GIAN LÀM VIỆC THEO 6 LUỒNG NGHIỆP VỤ</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${mod.color} text-white shadow-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-300 border border-slate-700">
                        {mod.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                    <span>Mở Không Gian Làm Việc</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Links to Demos */}
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold text-white">Thử nghiệm Luồng Ứng viên Không Tài khoản</h4>
            <p className="text-xs text-slate-400">
              Xem trước trang Nộp Đơn hoặc trang Xác nhận Lịch Phỏng vấn qua Stateless Magic Link (.ics)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/jobs/job-it-01/apply"
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 transition"
            >
              Public Apply Form
            </Link>
            <Link
              href="/interviews/confirm"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition shadow"
            >
              Magic Link Confirm (.ics)
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
