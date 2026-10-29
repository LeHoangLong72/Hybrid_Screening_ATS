# PROJECT CONTEXT & SYSTEM SPECIFICATION: HYBRID SCREENING ATS

> **Tài liệu ngữ cảnh dành cho AI Coding Agent.**  
> Mọi mã nguồn, thiết kế cơ sở dữ liệu, API và giao diện được sinh ra trong dự án này **BẮT BUỘC (MUST)** tuân thủ nghiêm ngặt kiến trúc, luồng dữ liệu và 17 quy tắc nghiệp vụ (Business Rules) dưới đây.

---

## 1. SYSTEM IDENTITY & ARCHITECTURAL CONSTRAINTS

### 1.1. Mục tiêu cốt lõi
Hệ thống Quản trị Tuyển dụng Tinh gọn tích hợp Khung Sàng lọc Hồ sơ Lai Đa tầng, Chống Thiên kiến và Phòng thủ Prompt Injection cho Tuyển dụng CNTT tại Việt Nam (**Lean ATS with Multi-Stage Hybrid Screening, Bias Mitigation & Prompt Injection Defense**).

### 1.2. Các giới hạn phạm vi CẤM VI PHẠM (Anti-Scope Creep Directives)
* **NEVER** tạo tài khoản đăng nhập hay cổng thông tin cho ứng viên (`Candidate Portal`). Ứng viên là thực thể bên ngoài (`External Entity`), chỉ tương tác qua biểu mẫu nộp đơn công khai (Public Form), Email đính kèm tệp `.ics` (RFC 5545) và **Stateless Magic Link** ký bằng `HMAC-SHA256`.
* **NEVER** tích hợp đồng bộ hai chiều qua OAuth với Google Calendar hoặc Microsoft Outlook.
* **NEVER** sử dụng thư viện `Spring State Machine` tĩnh. Toàn bộ quy trình tuyển dụng phải vận hành qua **Data-Driven Workflow Engine** lưu trữ trong PostgreSQL.
* **NEVER** tách hệ thống thành các Microservices rời rạc hoặc dựng thêm Python service/Redis khi chưa có yêu cầu. Hệ thống là một khối **Modular Monolith** viết bằng Java 21 + Spring Boot 3.3.
* **NEVER** gửi dữ liệu định danh cá nhân (PII) của ứng viên ra các dịch vụ LLM bên ngoài (OpenAI / Gemini).

---

## 2. TECH STACK & MODULE STRUCTURE

### 2.1. Tech Stack bắt buộc
* **Backend Core:** Java 21 (bật Virtual Threads `spring.threads.virtual.enabled=true`), Spring Boot 3.3.x, Spring Security 6 (JWT + RBAC + Row-Level Security), Spring Data JPA (Hibernate 6).
* **Database & Search:** PostgreSQL 16 tích hợp sẵn 3 thành phần trong cùng 1 DBMS:
  1. Dữ liệu quan hệ ACID + cột `JSONB`.
  2. Full-Text Search (`tsvector`, `ts_rank_cd` / BM25 lexical search).
  3. Vector Search (`pgvector` với chỉ mục HNSW) và Fuzzy Matching (`pg_trgm`, `fuzzystrmatch`).
* **Messaging & Async:** RabbitMQ (`Spring AMQP`) với cấu hình Idempotent Consumer, Exponential Backoff Retry và Dead-Letter Queue (DLQ).
* **Document & Security Processing:**
  * `Apache PDFBox` (custom `PDFTextStripper` lấy tọa độ Bounding Box $(x, y, w, h)$ và kiểm tra màu sắc/font-size).
  * `Apache POI` (đọc `.docx` có kiểm soát chống XXE / Zip Bomb).
  * `Tesseract OCR` (`tess4j` làm fallback khi file PDF là ảnh scan không có lớp text).
  * `Apache Tika` (chỉ dùng để kiểm tra Magic Bytes định dạng file thật).
  * `Bucket4j` (giới hạn Rate Limit gọi LLM API).
* **AI Integration:** `Spring AI` kết nối Gemini 2.5 Flash / OpenAI API sử dụng chế độ **Structured Outputs** (ép kiểu JSON Schema nghiêm ngặt) và Embedding model đa ngôn ngữ.
* **Object Storage:** MinIO (tương thích chuẩn AWS S3 API), truy cập file qua Presigned URL có thời hạn.
* **Frontend:** React 18 (Next.js App Router), TypeScript, Tailwind CSS, `@dnd-kit/core` (Kanban kéo thả), `StompJS` (WebSocket).

### 2.2. Cấu trúc Package Backend (Modular Monolith)
```text
com.ats.hybrid
├── common              # Exception (RFC 7807 ProblemDetail), Utils, LexoRank, Crypto (AES-256, HMAC)
├── config              # Security, RabbitMQ, MinIO, SpringAI, VirtualThreads, WebSocket Config
├── modules
│   ├── auth            # JWT, RBAC, Row-Level Security Evaluators
│   ├── workflow        # JobOpening, PipelineTemplate, Stage, Transition, WorkflowEngine
│   ├── ingestion       # FileUpload, MagicBytesValidator, PDFBoxLayoutExtractor, OcrFallback
│   ├── defense         # PromptInjectionScanner, PiiRedactionService, PiiVaultEntity
│   ├── candidate       # MasterCandidate, Application, DeduplicationService (pg_trgm)
│   ├── screening       # ExperienceCalculator, HardFilter, HybridSearch (BM25+pgvector+RRF), RubricReranker
│   ├── evaluation      # InterviewSchedule (.ics + MagicLink), BlindScorecard, BlindResumeMapper
│   └── benchmark       # GroundTruthEvaluator, MetricsCalculator (Precision, Recall, F1, nDCG@10)