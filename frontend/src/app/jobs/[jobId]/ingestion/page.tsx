"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SecurityDrawer } from "@/components/defense/SecurityDrawer";
import { MOCK_CANDIDATES } from "@/lib/mock-data";
import { CandidateApplication, UserRole } from "@/types";
import { 
  UploadCloud, 
  ShieldCheck, 
  ShieldAlert, 
  FileCheck2, 
  Layers, 
  AlertTriangle,
  RefreshCw,
  FileCode2
} from "lucide-react";

export default function IngestionPage() {
  const [currentRole, setCurrentRole] = useState<UserRole>("RECRUITER");
  const [selectedSecurityCandidate, setSelectedSecurityCandidate] = useState<CandidateApplication | null>(null);

  const securityCandidate = MOCK_CANDIDATES.find((c) => c.hasSecurityFlag) || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        securityFlagsCount={1}
      />

      <main className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            TIẾP NHẬN HỒ SƠ & PHÒNG THỦ PROMPT INJECTION
            <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-400 border border-rose-500/20">
              FLOW-02 & BR-11
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Bóc tách bố cục PDF đa cột (Layout-Aware), quét chữ tàng hình chống Jailbreak AI và mã hóa AES-256 PII Vault tại chỗ.
          </p>
        </div>

        {/* Upload Dropzone */}
        <div className="rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900/60 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-4">
            <UploadCloud className="h-7 w-7" />
          </div>
          <h3 className="text-sm font-bold text-white">
            Kéo thả hoặc Bấm để tải lên lô CV (1 – 50 tệp PDF/DOCX)
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            Hệ thống tự động kiểm tra chữ ký Magic Bytes, kiểm soát Zip Bomb/XXE và tính toán SHA-256 chống tải trùng lặp.
          </p>
          <div className="flex items-center gap-3 mt-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <FileCheck2 className="h-3.5 w-3.5 text-emerald-400" />
              PDFBox Layout Extractor
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Chống Chữ Tàng Hình ≤ 2pt
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FileCode2 className="h-3.5 w-3.5 text-emerald-400" />
              Zero-PII Interceptor
            </span>
          </div>
        </div>

        {/* Ingestion Table & Threat Status */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              LÔ HỒ SƠ ĐANG XỬ LÝ TRONG HÀNG ĐỢI RABBITMQ
            </h3>
            <span className="text-xs text-slate-400">
              Quét theo thời gian thực (Real-time Scanner)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3">Mã Hồ Sơ</th>
                  <th className="px-6 py-3">Tên Tệp Gốc</th>
                  <th className="px-6 py-3">Bố Cục Văn Bản</th>
                  <th className="px-6 py-3">Magic Bytes Check</th>
                  <th className="px-6 py-3">Trạng Thái An Toàn AI</th>
                  <th className="px-6 py-3">Mã Hóa PII Vault</th>
                  <th className="px-6 py-3 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {/* Threat Candidate */}
                <tr className="bg-rose-950/20 hover:bg-rose-950/30 transition">
                  <td className="px-6 py-4 font-bold text-rose-400">CAND-102</td>
                  <td className="px-6 py-4 font-sans text-white">cv_senior_tran_van_a.pdf</td>
                  <td className="px-6 py-4 font-sans text-slate-300">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px]">2 Cột (Gutter: 35px)</span>
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">%PDF-1.7 (Valid)</td>
                  <td className="px-6 py-4 font-sans">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-bold text-rose-300 border border-rose-500/40 animate-pulse">
                      <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                      CRITICAL: Chữ tàng hình 1.5pt
                    </span>
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-sans">AES-256 (Đã che PII)</td>
                  <td className="px-6 py-4 text-right font-sans">
                    <button
                      onClick={() => setSelectedSecurityCandidate(securityCandidate)}
                      className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-500 transition shadow"
                    >
                      Thanh Tra Ngay
                    </button>
                  </td>
                </tr>

                {/* Clean Candidate 1 */}
                <tr className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-bold text-indigo-400">CAND-088</td>
                  <td className="px-6 py-4 font-sans text-slate-200">nguyen_hoang_long_cv.pdf</td>
                  <td className="px-6 py-4 font-sans text-slate-300">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px]">1 Cột Chuẩn</span>
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">%PDF-1.7 (Valid)</td>
                  <td className="px-6 py-4 font-sans">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      An Toàn (Clean)
                    </span>
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-sans">AES-256 (Đã che PII)</td>
                  <td className="px-6 py-4 text-right font-sans text-slate-500">Hoàn Tất</td>
                </tr>

                {/* Clean Candidate 2 (Docx) */}
                <tr className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-bold text-indigo-400">CAND-042</td>
                  <td className="px-6 py-4 font-sans text-slate-200">le_hoang_bao_backend.docx</td>
                  <td className="px-6 py-4 font-sans text-slate-300">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px]">Apache POI (XML Safe)</span>
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">PK.. (Docx Valid)</td>
                  <td className="px-6 py-4 font-sans">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      An Toàn (Clean)
                    </span>
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-sans">AES-256 (Đã che PII)</td>
                  <td className="px-6 py-4 text-right font-sans text-slate-500">Hoàn Tất</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Security Threat Inspection Drawer */}
      <SecurityDrawer
        candidate={selectedSecurityCandidate}
        onClose={() => setSelectedSecurityCandidate(null)}
        onAcceptQuarantine={(id) => {
          alert(`Đã cách ly mã độc của hồ sơ ${id}`);
          setSelectedSecurityCandidate(null);
        }}
        onRejectFraud={(id) => {
          alert(`Đã đánh trượt hồ sơ ${id}`);
          setSelectedSecurityCandidate(null);
        }}
      />
    </div>
  );
}
