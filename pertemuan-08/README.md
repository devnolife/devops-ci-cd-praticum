# 📊 Pertemuan 08: UTS — Complete CI/CD Pipeline untuk Next.js

## 🎯 Deskripsi Ujian

Bangun **end-to-end CI/CD pipeline** yang lengkap untuk aplikasi Next.js yang sudah dikerjakan sepanjang Pertemuan 01–07. Ujian ini menggabungkan semua konsep DevOps yang telah dipelajari menjadi satu pipeline production-ready.

## 🧵 Red Thread: Dari P01 ke UTS

```
P01: Setup Next.js → P02: Git branching → P03: Code review & PR
  ↓
P04: Jenkins setup → P05: Automated testing → P06: CD pipeline → P07: GitHub Actions/GitLab CI
  ↓
P08 (UTS): COMPLETE CI/CD PIPELINE — Semua tergabung!
```

---

## 📋 Requirements

### 🚀 Aplikasi: Next.js Docker App

Gunakan aplikasi Next.js yang sudah dikembangkan dari Pertemuan 01:
```
..\..\cloud-native-practicum\examples\nextjs-docker-app
```

Aplikasi harus sudah memiliki:
- [x] Halaman utama yang berfungsi (`app/page.js`)
- [x] Halaman tambahan (e.g., About page dari P02)
- [x] API routes: `/api/health`, `/api/deployments`
- [x] API route tambahan (e.g., `/api/students` dari P02)
- [x] Test suite: `tests/health.test.mjs` + test tambahan dari P05
- [x] `Dockerfile` multi-stage build
- [x] `compose.yaml` dengan health check

> 💡 **Bonus:** Tambahkan fitur atau modifikasi baru untuk menunjukkan pemahaman Anda (misalnya: halaman baru, API endpoint baru, komponen baru).

### ✅ CI Pipeline

Pipeline harus otomatis berjalan pada setiap push:

- [ ] **Install** — `npm ci` install dependencies
- [ ] **Lint** — Code quality check (e.g., `npx next lint`)
- [ ] **Test** — `npm test` menjalankan semua test suite
- [ ] **Build** — `npm run build` membuat production build
- [ ] **Docker Build** — `docker build` membuat container image
- [ ] **Test Results** — Hasil test di-archive/tersedia untuk review

### 🚢 CD Pipeline

Pipeline harus mendeploy aplikasi:

- [ ] **Deploy ke Staging** — Otomatis setelah CI pass, port 3001
- [ ] **Health Check** — `curl /api/health` verifikasi staging sehat
- [ ] **Manual Approval** — Approval gate sebelum production
- [ ] **Deploy ke Production** — Setelah approval, port 3000
- [ ] **Rollback** — Dokumentasi atau script cara rollback ke versi sebelumnya

### 🛠️ Platform CI/CD

Gunakan **salah satu** (atau lebih untuk bonus):

| Platform | File Konfigurasi | Referensi |
|----------|-----------------|-----------|
| Jenkins | `Jenkinsfile` | Pertemuan 04, 05, 06 |
| GitHub Actions | `.github/workflows/nextjs-ci.yml` | Pertemuan 07 |
| GitLab CI | `.gitlab-ci.yml` | Pertemuan 07 |

> 🌟 **Bonus:** Implementasi di **dua platform** (e.g., Jenkins + GitHub Actions) untuk menunjukkan pemahaman cross-platform.

### 📖 Documentation

- [ ] **Architecture diagram** — Arsitektur aplikasi Next.js dan infrastructure
- [ ] **Pipeline flow diagram** — Visualisasi alur CI/CD dari push sampai production
- [ ] **README** — Setup instructions yang jelas dan lengkap

---

## 📊 Kriteria Penilaian

| Komponen | Bobot | Detail |
|----------|-------|--------|
| **Kelengkapan CI Pipeline** | 25% | Install, lint, test, build, docker build — semua otomatis |
| **Kelengkapan CD Pipeline** | 25% | Staging deploy, health check, approval, production deploy, rollback |
| **Code Quality & Tests** | 20% | Test coverage, code style, clean code, fitur tambahan |
| **Documentation** | 15% | Architecture diagram, pipeline flow, README, setup guide |
| **Presentasi** | 15% | Demo live pipeline, penjelasan arsitektur, menjawab pertanyaan |

### Detail Rubrik

#### CI Pipeline (25%)

| Kriteria | Excellent (A) | Good (B) | Fair (C) |
|----------|--------------|----------|----------|
| Test automation | Semua test pass, test baru ditambahkan | Test existing pass | Sebagian test pass |
| Build | Docker image terbuild otomatis | npm build saja | Manual build |
| Lint | Lint stage ada dan berjalan | Lint ada tapi warning | Tidak ada lint |

#### CD Pipeline (25%)

| Kriteria | Excellent (A) | Good (B) | Fair (C) |
|----------|--------------|----------|----------|
| Staging | Auto-deploy + health check | Auto-deploy tanpa health check | Manual deploy |
| Production | Approval gate + deploy | Deploy tanpa approval | Tidak ada |
| Rollback | Script/docs rollback lengkap | Rollback manual terdokumentasi | Tidak ada rollback |

---

## 📤 Submission Structure

```
📁 NIM_Nama_UTS/
├── 📄 README.md (Setup guide + penjelasan arsitektur)
├── 📄 Jenkinsfile (jika pakai Jenkins)
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 nextjs-ci.yml (jika pakai GitHub Actions)
├── 📄 .gitlab-ci.yml (jika pakai GitLab CI)
├── 📄 Dockerfile
├── 📄 compose.yaml
├── 📁 app/
│   ├── 📄 page.js
│   ├── 📄 layout.js
│   ├── 📁 about/
│   │   └── 📄 page.js
│   └── 📁 api/
│       ├── 📁 health/
│       │   └── 📄 route.js
│       ├── 📁 deployments/
│       │   └── 📄 route.js
│       └── 📁 students/
│           └── 📄 route.js
├── 📁 components/
├── 📁 lib/
├── 📁 tests/
│   ├── 📄 health.test.mjs
│   └── 📄 teachingData.test.mjs
├── 📁 docs/
│   ├── 📄 architecture.png (diagram arsitektur)
│   └── 📄 pipeline-flow.png (diagram alur pipeline)
└── 📁 screenshots/
    ├── 📄 pipeline-success.png
    ├── 📄 staging-health-check.png
    ├── 📄 approval-gate.png
    ├── 📄 production-deployment.png
    └── 📄 rollback-demo.png
```

---

## ❓ FAQ

### Q: Boleh menambahkan fitur baru ke Next.js app?
**A:** Sangat dianjurkan! Fitur tambahan (halaman baru, API endpoint baru, komponen baru) menunjukkan pemahaman dan akan mendapat nilai bonus.

### Q: Harus pakai Jenkins atau boleh GitHub Actions saja?
**A:** Boleh pilih salah satu. Menggunakan **dua platform** mendapat bonus. Yang penting pipeline berjalan end-to-end.

### Q: Bagaimana jika tidak punya Docker Hub account?
**A:** Untuk UTS, Docker push ke registry tidak wajib. Yang penting Docker image **terbuild** di pipeline. Push ke registry adalah bonus.

### Q: Apakah harus bisa di-demo live?
**A:** Ya. Siapkan demo live di mana Anda:
1. Push perubahan ke repository
2. Pipeline berjalan otomatis
3. Staging ter-deploy
4. Health check pass
5. Manual approval → production deploy

---

## 💡 Tips & Common Mistakes

### ✅ Do
- Test pipeline berkali-kali sebelum presentasi
- Pastikan `npm test` dan `npm run build` pass di lokal sebelum push
- Siapkan backup (screenshot pipeline sukses) untuk jaga-jaga demo gagal
- Jelaskan **mengapa** setiap stage penting, bukan hanya **apa** yang dilakukan

### ❌ Don't
- Jangan hard-code secrets (password, token) di pipeline file
- Jangan skip health check — pipeline tanpa health check kehilangan 5% nilai
- Jangan copy-paste pipeline tanpa memahami — Anda akan ditanya saat presentasi
- Jangan lupa cleanup container sebelum deploy ulang (`docker stop/rm`)

### 🔧 Troubleshooting Umum

| Masalah | Solusi |
|---------|--------|
| `npm ci` gagal di Jenkins | Pastikan NodeJS plugin terinstall dan Node20 dikonfigurasi |
| Docker build gagal | Cek Dockerfile, pastikan `package-lock.json` ada |
| Health check timeout | Tambahkan `sleep` yang cukup, container butuh waktu start |
| Port conflict | Gunakan port berbeda untuk staging (3001) dan production (3000) |
| Permission denied Docker | Mount Docker socket ke Jenkins container |

---

## ⏰ Deadline

Submit sebelum jadwal presentasi UTS.

Pastikan repository sudah public atau dosen/asisten punya akses.

---

**Good luck! 🚀 Tunjukkan bahwa Anda bisa membuat pipeline CI/CD end-to-end untuk aplikasi web nyata.**
