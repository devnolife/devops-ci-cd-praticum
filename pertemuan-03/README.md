# 🔍 Pertemuan 03: Code Review & Pull Request — Review Next.js Changes

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami pentingnya code review dalam DevOps
- Membuat Pull Request yang baik untuk project Next.js
- Melakukan code review yang efektif
- Menggunakan GitHub untuk kolaborasi tim

## 📚 Materi

### Code Review dalam DevOps

Code review adalah **quality gate** pertama sebelum code masuk ke CI/CD pipeline. Dalam DevOps culture:

```
Developer → Pull Request → Code Review → Merge → CI Pipeline → CD Pipeline
                              ↑
                        Quality Gate #1
```

### Code Review Benefits

| Manfaat | Penjelasan |
|---------|-----------|
| **Kualitas Kode** | Mendeteksi bugs, anti-patterns, dan security issues lebih awal |
| **Knowledge Sharing** | Reviewer belajar bagian codebase yang belum familiar |
| **Konsistensi** | Memastikan semua code mengikuti style yang sama |
| **Onboarding** | Developer baru belajar dari review senior |

### Pull Request Best Practices

1. **Descriptive Title** — Jelas dan informatif (e.g., `feat: add metric card for student count`)
2. **Detailed Description** — Apa yang berubah, mengapa, dan bagaimana cara test
3. **Small Changes** — Satu PR = satu fitur/fix, mudah di-review
4. **Include Tests** — Bukti bahwa code bekerja, `npm test` harus pass
5. **Link to Issues** — Traceability ke issue tracker
6. **Screenshots** — Jika ada perubahan UI, sertakan before/after

### PR Template untuk Next.js Project

```markdown
## Deskripsi
<!-- Apa yang berubah dan mengapa? -->

## Tipe Perubahan
- [ ] Feature baru
- [ ] Bug fix
- [ ] Refactoring
- [ ] Dokumentasi

## Checklist
- [ ] `npm test` pass ✅
- [ ] `npm run build` sukses ✅
- [ ] Tidak ada console.log yang tertinggal
- [ ] CSS mengikuti pattern yang ada di globals.css
- [ ] Komponen mengikuti pattern yang ada (DeploymentStep, MetricCard)

## Screenshot
<!-- Sertakan screenshot jika ada perubahan UI -->

## Testing
<!-- Bagaimana cara test perubahan ini? -->
```

---

## 🔧 Tugas Praktikum

Gunakan aplikasi Next.js yang sudah di-setup:
```
..\..\cloud-native-practicum\examples\nextjs-docker-app
```

### Task: Collaborative Coding pada Next.js

#### Langkah 1 — Fork Repository Partner

```bash
# Di GitHub, fork repository partner yang berisi Next.js app
# Clone fork ke lokal
git clone https://github.com/<username-anda>/<repo-partner>.git
cd <repo-partner>
npm install
```

#### Langkah 2 — Buat Feature Branch

```bash
git checkout -b feature/new-metric-card
```

#### Langkah 3 — Tambahkan Fitur Baru

**3a. Tambah data baru di `lib/teachingData.js`:**

Tambahkan entry baru di array `teachingMetrics`:

```js
export const teachingMetrics = [
  {
    value: "UI",
    label: "Halaman utama untuk demo di browser"
  },
  {
    value: "API",
    label: "Endpoint health dan deployment"
  },
  {
    value: "Docker",
    label: "Multi-stage build production"
  },
  // ← Tambahkan metric baru di sini
  {
    value: "CI/CD",
    label: "Pipeline otomatis build, test, deploy"
  }
];
```

**3b. Verifikasi perubahan tampil di UI:**

```bash
npm run dev
# Buka http://localhost:3000 → MetricCard baru harus muncul
```

**3c. Pastikan test tetap pass:**

```bash
npm test
```

#### Langkah 4 — Commit dan Push

```bash
git add lib/teachingData.js
git commit -m "feat: add CI/CD metric card to teaching data"
git push origin feature/new-metric-card
```

#### Langkah 5 — Buat Pull Request

Di GitHub, buat Pull Request dari `feature/new-metric-card` → `develop` (atau `main`), isi dengan:

- **Title:** `feat: add CI/CD metric card to teaching data`
- **Description:** Gunakan PR template di atas
- Screenshot UI yang menunjukkan MetricCard baru
- Hasil `npm test` yang pass

#### Langkah 6 — Review PR dari Partner

Review PR partner dengan checklist berikut:

| Aspek Review | Yang Dicek |
|---|---|
| **Correctness** | Apakah data baru sesuai format yang ada? (value + label) |
| **Style** | Apakah CSS mengikuti pattern existing di `globals.css`? |
| **Tests** | Apakah `npm test` pass? Ada test baru yang diperlukan? |
| **UI** | Apakah tampilan konsisten dengan MetricCard yang lain? |
| **Code** | Tidak ada typo, import yang tidak terpakai, atau console.log |

Berikan minimal **2 review comments**:
- 1 komentar positif (apa yang bagus)
- 1 komentar konstruktif (apa yang bisa diperbaiki)

#### Langkah 7 — Respond to Feedback

```bash
# Jika ada feedback yang perlu diaddress
git checkout feature/new-metric-card
# Lakukan perubahan sesuai feedback
git add .
git commit -m "fix: address review feedback"
git push origin feature/new-metric-card
```

#### Langkah 8 — Merge

Setelah reviewer approve, merge PR ke target branch.

---

## 📤 Submission

```
📁 NIM_Nama_Pertemuan03/
├── 📄 README.md (Laporan proses code review)
├── 📁 screenshots/
│   ├── pull-request-created.png
│   ├── pr-description.png
│   ├── code-review-comments.png
│   ├── npm-test-pass.png
│   └── pr-merged.png
└── 📄 pr-link.txt (URL ke PR yang dibuat dan PR yang di-review)
```

**Deadline:** Sebelum pertemuan berikutnya
