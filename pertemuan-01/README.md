# 🎭 Pertemuan 01: DevOps Culture & Principles + Setup Next.js

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami filosofi dan budaya DevOps
- Mengenal DevOps lifecycle dan praktik utama
- Mengidentifikasi perbedaan antara Development dan Operations tradisional
- Setup development environment untuk praktikum
- Menjalankan aplikasi Next.js yang akan dipakai sepanjang semester

## 📚 Materi

### Apa itu DevOps?

DevOps adalah kombinasi dari **Development** dan **Operations** yang menekankan kolaborasi, otomatisasi, dan continuous improvement dalam software delivery.

### CALMS — Core Principles

| Prinsip | Penjelasan |
|---------|-----------|
| **Culture** | Kolaborasi antara Dev dan Ops, menghilangkan silo |
| **Automation** | Otomatisasi proses repetitif (build, test, deploy) |
| **Lean** | Eliminasi waste dalam workflow, small batches |
| **Measurement** | Mengukur performa dan kualitas secara objektif |
| **Sharing** | Berbagi pengetahuan dan tanggung jawab bersama |

### DevOps Lifecycle

```
    ┌─────────────────────────────────────────────────┐
    │                                                 │
    │   Plan → Code → Build → Test → Release → Deploy│
    │     ↑                                      │    │
    │     │                                      ↓    │
    │     └──── Operate ← Monitor ←──────────────┘    │
    │                                                 │
    └─────────────────────────────────────────────────┘
```

Setiap fase di atas akan kita praktikkan menggunakan **satu aplikasi nyata** sepanjang semester: sebuah **Next.js web app** yang sudah dilengkapi UI, API routes, test suite, dan Dockerfile production.

---

## 🚀 Setup Next.js sebagai Project Semester

Aplikasi Next.js ini akan menjadi project utama yang mahasiswa **otomasi dengan CI/CD** dari Pertemuan 01 sampai UTS (Pertemuan 08). Setiap pertemuan menambahkan layer DevOps baru di atas project yang sama.

### Lokasi Example App

```
..\..\cloud-native-practicum\examples\nextjs-docker-app
```

### Langkah Setup

```bash
# 1. Masuk ke folder example app
cd cloud-native-practicum/examples/nextjs-docker-app

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka browser → http://localhost:3000
# 5. Verifikasi health endpoint → http://localhost:3000/api/health
```

Pastikan response dari `/api/health` mengembalikan JSON seperti:

```json
{
  "status": "ok",
  "service": "nextjs-docker-app",
  "version": "0.1.0",
  "environment": "development",
  "uptimeSeconds": 42,
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

## 📁 Struktur Project Next.js

> Detail lengkap bisa dilihat di materi Cloud Native Pertemuan 01. Di sini kita fokus pada bagian yang relevan untuk DevOps.

```
nextjs-docker-app/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Halaman utama (UI)
│   ├── globals.css        # Styling dark theme
│   └── api/
│       ├── health/route.js      # ← Health check endpoint (monitoring)
│       └── deployments/route.js # ← Deployment data endpoint
├── components/
│   ├── DeploymentStep.js
│   └── MetricCard.js
├── lib/
│   ├── health.mjs         # ← Logic yang di-test
│   └── teachingData.js    # ← Data teaching metrics
├── tests/
│   └── health.test.mjs    # ← Automated test (CI)
├── Dockerfile             # ← Multi-stage build (Release)
├── compose.yaml           # ← Container orchestration (Deploy)
├── next.config.mjs        # ← Standalone output mode
└── package.json           # ← npm scripts (build, test, dev)
```

Bagian-bagian yang paling relevan untuk DevOps:
- **`tests/`** → dijalankan di CI pipeline
- **`Dockerfile`** → membangun container image
- **`compose.yaml`** → menjalankan container dengan konfigurasi
- **`/api/health`** → endpoint untuk monitoring & smoke test

---

## 🔗 DevOps Commands untuk Next.js

Tabel ini memetakan setiap fase DevOps lifecycle ke command yang nyata pada project kita:

| DevOps Phase | Command | Purpose |
|---|---|---|
| **Code** | `npm run dev` | Development server dengan hot reload |
| **Build** | `npm run build` | Production build (standalone output) |
| **Test** | `npm test` | Automated tests dengan Node.js test runner |
| **Release** | `docker build -t nextjs-docker-app .` | Membuat container image |
| **Deploy** | `docker compose up --build` | Menjalankan container |
| **Monitor** | `curl http://localhost:3000/api/health` | Health check endpoint |

Sepanjang semester, kita akan mengotomasi semua command di atas menggunakan Jenkins, GitHub Actions, dan GitLab CI.

---

## 🔧 Tugas Praktikum

### Task 1: Setup Development Environment

1. Install **Git** dan konfigurasi user:
   ```bash
   git config --global user.name "Nama Anda"
   git config --global user.email "email@example.com"
   git --version
   ```

2. Install **Node.js 20 LTS** (dari [nodejs.org](https://nodejs.org)):
   ```bash
   node --version   # harus v20.x.x atau lebih tinggi
   npm --version
   ```

3. Install **Docker Desktop**:
   ```bash
   docker --version
   docker compose version
   ```

4. Install **Visual Studio Code** dengan extensions:
   - Docker
   - GitLens
   - YAML
   - ESLint

5. Buat akun **GitHub** (jika belum ada)

### Task 2: Setup & Jalankan Next.js Project

1. Clone atau copy folder example app:
   ```bash
   # Dari root repository
   cd cloud-native-practicum/examples/nextjs-docker-app
   ```

2. Install dependencies dan jalankan:
   ```bash
   npm install
   npm run dev
   ```

3. Buka browser dan verifikasi:
   - `http://localhost:3000` → halaman utama tampil
   - `http://localhost:3000/api/health` → JSON response dengan `status: "ok"`

4. Jalankan test:
   ```bash
   npm test
   ```
   Pastikan semua test **pass** ✅

5. Ambil screenshot dari setiap langkah di atas.

### Task 3: Dokumentasi

Buat laporan singkat yang berisi:
- Penjelasan tentang DevOps (filosofi CALMS) dan mengapa penting
- Screenshot environment yang sudah di-setup (Git, Node.js, Docker, VS Code)
- Screenshot Next.js app berjalan di browser dan response `/api/health`
- Reflection: Bagaimana DevOps akan diterapkan pada project Next.js ini sepanjang semester?

## 📤 Submission

```
📁 NIM_Nama_Pertemuan01/
├── 📄 README.md (Laporan)
├── 📁 screenshots/
│   ├── git-version.png
│   ├── node-version.png
│   ├── docker-version.png
│   ├── vscode-setup.png
│   ├── nextjs-homepage.png
│   └── api-health-response.png
└── 📄 reflection.md
```

**Deadline:** Sebelum pertemuan berikutnya
