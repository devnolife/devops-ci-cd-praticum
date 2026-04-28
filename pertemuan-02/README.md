# 🔀 Pertemuan 02: Git Advanced - Branching & Feature Development di Next.js

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami berbagai branching strategies
- Mengimplementasikan GitFlow workflow pada project Next.js
- Melakukan merge, rebase, dan resolve conflicts
- Mengelola branch secara efektif untuk fitur baru

## 📚 Materi

### Branching Strategies

| Strategy | Deskripsi | Cocok Untuk |
|----------|-----------|-------------|
| **GitFlow** | Feature, develop, release, hotfix branches | Tim besar, release terjadwal |
| **GitHub Flow** | Simple feature branch + main | CI/CD aktif, deploy sering |
| **Trunk-Based** | Short-lived feature branches, merge cepat | Tim kecil, continuous deployment |
| **GitLab Flow** | Environment branches (staging, production) | Multi-environment deployment |

### GitFlow Branches

```
main (production)     ●───────────────●───────────────●
                       ↑               ↑               ↑
release               ●───────────────●               │
                       ↑                               │
develop     ●─●─●─●─●─●───●─●─●─●─●─●─●───●─●─●─●─●─●
             ↑   ↑       ↑           ↑
feature     ●───●       ●───────────●
```

### Mengapa Branching Penting untuk DevOps?

Dalam CI/CD pipeline yang akan kita bangun di pertemuan selanjutnya:
- Push ke `develop` → trigger CI (test + build)
- Push ke `main` → trigger CI + CD (test + build + deploy)
- Pull Request → trigger code review + automated checks

Branching strategy yang baik adalah **fondasi** dari pipeline yang efektif.

---

## 🔧 Tugas Praktikum

Gunakan aplikasi Next.js dari Pertemuan 01:
```
..\..\cloud-native-practicum\examples\nextjs-docker-app
```

### Task 1: Implement GitFlow pada Next.js Repo

#### Langkah 1 — Inisialisasi Repository

```bash
# Masuk ke folder project
cd cloud-native-practicum/examples/nextjs-docker-app

# Inisialisasi git (jika belum)
git init
git add .
git commit -m "Initial commit: Next.js docker app"
```

#### Langkah 2 — Buat Branch Develop

```bash
# Buat dan pindah ke develop
git checkout -b develop
```

#### Langkah 3 — Feature: About Page

```bash
# Buat feature branch dari develop
git checkout -b feature/about-page develop
```

Buat file baru `app/about/page.js`:

```jsx
export default function AboutPage() {
  return (
    <main>
      <section className="hero">
        <h1>About This Project</h1>
        <p className="lead">
          Aplikasi Next.js ini digunakan sebagai project praktikum DevOps CI/CD
          Semester 5. Setiap pertemuan menambahkan layer otomasi baru.
        </p>
        <div className="features">
          <article>
            <span>🔄</span>
            <h3>CI/CD Pipeline</h3>
            <p>Automated build, test, dan deploy menggunakan Jenkins & GitHub Actions.</p>
          </article>
          <article>
            <span>🐳</span>
            <h3>Containerized</h3>
            <p>Multi-stage Dockerfile untuk production deployment.</p>
          </article>
          <article>
            <span>🧪</span>
            <h3>Automated Testing</h3>
            <p>Node.js test runner memvalidasi health endpoint dan data.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
```

```bash
# Commit dan push
git add app/about/page.js
git commit -m "feat: add about page with project description"
```

#### Langkah 4 — Merge Feature ke Develop

```bash
git checkout develop
git merge feature/about-page
git branch -d feature/about-page
```

#### Langkah 5 — Feature: Students API Route

```bash
# Buat feature branch baru
git checkout -b feature/api-students develop
```

Buat file baru `app/api/students/route.js`:

```js
import { NextResponse } from 'next/server';

const students = [
  { nim: '2024001', nama: 'Alice', status: 'active' },
  { nim: '2024002', nama: 'Bob', status: 'active' },
  { nim: '2024003', nama: 'Charlie', status: 'active' },
];

export async function GET() {
  return NextResponse.json({
    count: students.length,
    data: students,
    timestamp: new Date().toISOString(),
  });
}
```

```bash
git add app/api/students/route.js
git commit -m "feat: add students API endpoint"

# Merge ke develop
git checkout develop
git merge feature/api-students
git branch -d feature/api-students
```

#### Langkah 6 — Release

```bash
# Buat release branch
git checkout -b release/1.0.0 develop

# (Opsional) bump version di package.json, final fixes, dll.
git commit -am "chore: prepare release 1.0.0"

# Merge ke main
git checkout main
git merge release/1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"

# Merge balik ke develop
git checkout develop
git merge release/1.0.0
git branch -d release/1.0.0
```

#### Verifikasi

```bash
# Pastikan semua fitur baru bekerja
npm run dev
# Buka http://localhost:3000/about → About page tampil
# Buka http://localhost:3000/api/students → JSON response

# Pastikan test masih pass
npm test
```

---

### Task 2: Resolve Merge Conflicts

#### Langkah 1 — Buat Dua Branch yang Mengubah File Sama

```bash
git checkout develop

# Branch A: ubah hero text
git checkout -b feature/hero-text-a
```

Edit `app/page.js` — ubah teks `<h1>`:
```jsx
<h1>Next.js CI/CD Pipeline Demo</h1>
```

```bash
git add app/page.js
git commit -m "feat: update hero title (branch A)"
git checkout develop
```

```bash
# Branch B: ubah hero text juga (beda isi)
git checkout -b feature/hero-text-b
```

Edit `app/page.js` — ubah teks `<h1>` yang sama:
```jsx
<h1>DevOps Automation with Next.js</h1>
```

```bash
git add app/page.js
git commit -m "feat: update hero title (branch B)"
```

#### Langkah 2 — Merge dan Temui Conflict

```bash
# Merge branch A dulu (sukses)
git checkout develop
git merge feature/hero-text-a

# Merge branch B (CONFLICT!)
git merge feature/hero-text-b
# Auto-merging app/page.js
# CONFLICT (content): Merge conflict in app/page.js
```

#### Langkah 3 — Resolve Conflict

Buka `app/page.js`, cari conflict markers:
```
<<<<<<< HEAD
<h1>Next.js CI/CD Pipeline Demo</h1>
=======
<h1>DevOps Automation with Next.js</h1>
>>>>>>> feature/hero-text-b
```

Pilih satu atau gabungkan, hapus markers, lalu:

```bash
git add app/page.js
git commit -m "fix: resolve merge conflict in hero title"
```

#### Langkah 4 — Dokumentasi

Screenshot proses conflict dan resolution untuk laporan.

---

## 📤 Submission

```
📁 NIM_Nama_Pertemuan02/
├── 📄 README.md (Laporan lengkap dengan penjelasan tiap langkah)
├── 📁 screenshots/
│   ├── gitflow-branches.png
│   ├── about-page.png
│   ├── api-students-response.png
│   ├── merge-conflict.png
│   └── conflict-resolved.png
└── 📄 repository-link.txt
```

**Deadline:** Sebelum pertemuan berikutnya
