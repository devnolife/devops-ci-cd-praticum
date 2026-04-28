# Pertemuan 0: Fullstack Next.js — Fondasi Sebelum CI/CD

## 🎯 Tujuan Pembelajaran

Setelah menyelesaikan pertemuan ini, mahasiswa mampu:

1. Memahami apa itu React dan Next.js serta hubungannya
2. Membuat project Next.js baru dan menjalankannya
3. Memahami struktur folder App Router
4. Membuat halaman, layout, dan navigasi
5. Menulis CSS (variables, flexbox, grid, responsive)
6. Membuat dan menggunakan component React (props)
7. Memisahkan data dari UI (folder `lib/`)
8. Membuat API route (backend di dalam Next.js)
9. Menggunakan environment variable
10. Menjalankan test sederhana

> 💡 **Pertemuan ini adalah fondasi.** Semua pertemuan selanjutnya (Git workflow, Jenkins, GitHub Actions, Docker pipeline) menggunakan aplikasi yang sama. Kalau paham Next.js di sini, sisanya tinggal mengotomasi build, test, dan deploy-nya.

---

## 📚 Teori: React vs Next.js

### Apa itu React?

React adalah **library JavaScript** untuk membangun User Interface (UI). React memperkenalkan konsep:

- **Component** — potongan UI yang bisa dipakai ulang
- **JSX** — syntax mirip HTML di dalam JavaScript
- **Props** — data yang dikirim dari parent ke child component
- **State** — data yang bisa berubah dan membuat UI ter-update otomatis

```
React = Library untuk membangun UI dari component
```

### Apa itu Next.js?

Next.js adalah **framework fullstack** yang dibangun di atas React. Next.js menambahkan:

| Fitur | React (saja) | Next.js |
|-------|-------------|---------|
| Routing | Harus install `react-router` | Otomatis dari struktur folder |
| Server-Side Rendering | Harus setup sendiri | Built-in |
| API Backend | Tidak ada | Ada (API routes) |
| Optimasi Gambar | Tidak ada | `<Image>` component |
| Build Production | Harus setup Webpack | `next build` → siap deploy |
| CSS Support | Harus setup sendiri | Global CSS, CSS Modules, Tailwind |

```
Next.js = React + Routing + API + SSR + Optimasi + Build Tools
```

### Kenapa Next.js untuk Praktikum Ini?

```
┌──────────────────────────────────────────────────┐
│  Pertemuan 0: Fullstack Next.js (SAAT INI)       │
│  ↓                                               │
│  Pertemuan 1-2: DevOps culture + Git workflow     │
│  ↓                                               │
│  Pertemuan 3: Code review Pull Request            │
│  ↓                                               │
│  Pertemuan 4-5: Jenkins pipeline (test + build)   │
│  ↓                                               │
│  Pertemuan 6-7: Docker pipeline + GitHub Actions  │
│  ↓                                               │
│  Pertemuan 8: UTS — pipeline lengkap              │
└──────────────────────────────────────────────────┘
```

CI/CD pipeline butuh aplikasi **nyata** yang punya kode, test, dan build — supaya pipeline bukan hanya `echo "Hello World"`.

---

## 🚀 Praktikum Bagian 1: Setup & Jalankan

### 1.1 Clone & Buka Project

Aplikasi Next.js sudah tersedia di repository praktikum Cloud Native:

```powershell
cd cloud-native-practicum\examples\nextjs-docker-app
```

> 📝 Aplikasi yang sama dipakai di **kedua praktikum**. Cloud Native fokus pada containerization, DevOps fokus pada otomasi pipeline.

### 1.2 Install Dependencies

```powershell
npm install
```

> 📝 `npm install` membaca `package.json` dan mengunduh semua library yang dibutuhkan ke folder `node_modules/`. File `package-lock.json` menyimpan versi exact agar semua developer mendapat dependency yang sama.

### 1.3 Jalankan Development Server

```powershell
npm run dev
```

Buka browser: **http://localhost:3000**

> 💡 Development server punya fitur **Hot Reload** — setiap kali file disimpan, browser otomatis ter-update.

### 1.4 Struktur Folder

```
nextjs-docker-app/
├── app/                    ← 📁 HALAMAN & API
│   ├── layout.js           ← Layout global (bungkus semua halaman)
│   ├── page.js             ← Halaman utama → http://localhost:3000/
│   ├── globals.css         ← CSS untuk seluruh aplikasi
│   └── api/                ← 📁 API ROUTES (backend)
│       ├── health/
│       │   └── route.js    ← GET /api/health
│       └── deployments/
│           └── route.js    ← GET /api/deployments
├── components/             ← 📁 COMPONENT (UI yang dipakai ulang)
│   ├── MetricCard.js
│   └── DeploymentStep.js
├── lib/                    ← 📁 DATA & HELPER
│   ├── teachingData.js
│   └── health.mjs
├── tests/                  ← 📁 TEST
│   └── health.test.mjs
├── public/                 ← 📁 FILE STATIS (gambar, favicon)
├── next.config.mjs         ← Konfigurasi Next.js
├── package.json            ← Daftar dependency & scripts
├── Dockerfile              ← (untuk praktikum Cloud Native)
└── compose.yaml            ← (untuk praktikum Cloud Native)
```

> 🔑 **Aturan routing App Router**: nama folder = URL path, `page.js` = halaman, `route.js` = API endpoint.

---

## 📚 Praktikum Bagian 2: Layout & Halaman

### 2.1 Layout Global (`app/layout.js`)

Buka file `app/layout.js` di VS Code — baca komentar di dalamnya.

**Konsep utama:**

```
┌─────────────────────────────────────┐
│  RootLayout (layout.js)             │
│  ┌───────────────────────────────┐  │
│  │  <html>                       │  │
│  │    <body>                     │  │
│  │      {children} ← isi page   │  │
│  │    </body>                    │  │
│  │  </html>                      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

- `layout.js` = bungkus untuk **semua** halaman
- `{children}` = halaman yang sedang dibuka
- CSS di-import di sini → berlaku untuk seluruh aplikasi
- `metadata` → mengatur `<title>` dan `<meta>` halaman

### 2.2 Halaman Utama (`app/page.js`)

Buka file `app/page.js` — baca komentar di dalamnya.

| Konsep | Contoh | Penjelasan |
|--------|--------|------------|
| Import component | `import MetricCard from "..."` | Mengambil component dari file lain |
| Import data | `import { teachingMetrics } from "..."` | Mengambil data dari file terpisah |
| Environment variable | `process.env.NEXT_PUBLIC_*` | Membaca konfigurasi dari environment |
| JSX | `<h1>Judul</h1>` | Syntax mirip HTML di dalam JavaScript |
| className | `<div className="hero">` | Pengganti `class` di JSX |
| Kurung kurawal | `{message}` | Menampilkan nilai variabel di JSX |
| Loop .map() | `{array.map(item => <X />)}` | Mengulang array menjadi element |

### 2.3 Latihan: Tambah Halaman Baru

Buat file `app/about/page.js`:

```jsx
export default function About() {
  return (
    <main>
      <h1>Tentang Aplikasi</h1>
      <p>Aplikasi ini dibuat untuk praktikum DevOps & CI/CD.</p>
      <p>Nama: [ISI NAMA MAHASISWA]</p>
      <p>NIM: [ISI NIM]</p>
      <a href="/">← Kembali ke beranda</a>
    </main>
  );
}
```

Buka: **http://localhost:3000/about**

> 🔑 Tidak perlu konfigurasi routing! Cukup buat folder + `page.js` → Next.js otomatis membuat route.

---

## 📚 Praktikum Bagian 3: CSS

### 3.1 CSS Variables

Buka file `app/globals.css` — baca komentar di dalamnya.

```css
:root {
  --brand: #38bdf8;
  --bg: #08111f;
  --text: #e5eefb;
}

.hero { color: var(--brand); }
```

> 💡 **Keuntungan CSS Variables**: ubah warna di satu tempat, otomatis berubah di semua selector.

### 3.2 Flexbox vs CSS Grid

| Konsep | Dimensi | Contoh di aplikasi | Property |
|--------|---------|-------------------|----------|
| Flexbox | 1D (baris ATAU kolom) | `.heroActions` | `display: flex` |
| Grid | 2D (baris DAN kolom) | `.metrics`, `.contentGrid` | `display: grid` |

### 3.3 Responsive Design

```css
/* Desktop: 3 kolom */
.metrics { grid-template-columns: repeat(3, 1fr); }

/* Mobile: 1 kolom */
@media (max-width: 900px) {
  .metrics { grid-template-columns: 1fr; }
}
```

### 3.4 Latihan: Tambah Style Baru

Tambahkan class `.mahasiswaCard` di `globals.css` dan pakai di halaman about.

---

## 📚 Praktikum Bagian 4: Component & Props

### 4.1 Apa itu Component?

Component = **fungsi JavaScript yang mengembalikan JSX (UI)**.

Buka file `components/MetricCard.js` — baca komentar di dalamnya.

```jsx
export default function MetricCard({ value, label }) {
  return (
    <article className="metricCard">
      <span className="metricValue">{value}</span>
      <span className="metricLabel">{label}</span>
    </article>
  );
}
```

**Cara pakai:**
```jsx
<MetricCard value="UI" label="Halaman utama" />
```

### 4.2 Loop dengan `.map()`

```jsx
{teachingMetrics.map((metric) => (
  <MetricCard key={metric.label} {...metric} />
))}
```

### 4.3 Latihan: Buat Component Sendiri

Buat `components/MahasiswaCard.js` yang menerima props `{ nama, nim, kelas }`.

---

## 📚 Praktikum Bagian 5: Data Terpisah (folder `lib/`)

Buka file `lib/teachingData.js` — baca komentar di dalamnya.

**Kenapa pisahkan data dari halaman?**
1. File lebih pendek dan mudah dibaca
2. Data bisa dipakai di banyak halaman
3. Nanti bisa diganti dengan data dari API/database
4. Bisa di-test terpisah

### Latihan

Buat file `lib/mahasiswaData.js` berisi array data mahasiswa, lalu import dan tampilkan di halaman.

---

## 📚 Praktikum Bagian 6: API Routes (Backend)

### 6.1 Fullstack Next.js

```
Frontend (Browser)           Backend (Server)
┌──────────────┐            ┌──────────────┐
│ app/page.js  │ ──────────▶│ app/api/     │
│ (HTML/JSX)   │            │ route.js     │
└──────────────┘            └──────────────┘
```

Buka file `app/api/health/route.js` — baca komentar di dalamnya.

### 6.2 Aturan API Route

- File harus bernama `route.js` (bukan `page.js`)
- Nama fungsi = HTTP method: `GET()`, `POST()`, `PUT()`, `DELETE()`
- `NextResponse.json()` = mengembalikan response JSON
- Path folder = URL: `app/api/health/route.js` → `/api/health`

### 6.3 Kenapa API Route Penting untuk CI/CD?

```
CI/CD Pipeline:
  ┌──────────┐    ┌──────────┐    ┌──────────────────┐
  │ npm test │───▶│ npm build│───▶│ Health check      │
  │          │    │          │    │ curl /api/health   │
  └──────────┘    └──────────┘    └──────────────────┘
```

Endpoint `/api/health` dipakai untuk **smoke test** di pipeline: setelah deploy, cek apakah app benar-benar berjalan.

### 6.4 Latihan

Buat API route baru `app/api/mahasiswa/route.js` yang mengembalikan JSON daftar mahasiswa.

---

## 📚 Praktikum Bagian 7: Environment Variable

### 7.1 Konsep

Environment variable = konfigurasi yang bisa diubah **tanpa mengubah kode**.

| Jenis | Prefix | Dibaca di | Contoh |
|-------|--------|-----------|--------|
| Public | `NEXT_PUBLIC_` | Browser + Server | `NEXT_PUBLIC_APP_MESSAGE` |
| Private | Tanpa prefix | Server saja | `APP_ENV`, `APP_VERSION` |

### 7.2 File `.env.local`

Buat file `.env.local`:

```
NEXT_PUBLIC_APP_MESSAGE=Halo dari env.local!
APP_ENV=development
```

Restart `npm run dev` → pesan di halaman berubah.

### 7.3 Kenapa Penting untuk CI/CD?

Di pipeline, env var dipakai untuk:
- `APP_ENV=staging` vs `APP_ENV=production` → membedakan environment
- `APP_VERSION=$BUILD_NUMBER` → versi otomatis dari CI
- Secret credentials → disimpan di Jenkins/GitHub Secrets, bukan di kode

---

## 📚 Praktikum Bagian 8: Testing & Build

### 8.1 Jalankan Test

```powershell
npm test
```

### 8.2 Build Production

```powershell
npm run build
```

### 8.3 Kenapa Test & Build Penting untuk CI/CD?

```
Pipeline:
  npm ci → npm test → npm run build → deploy
           ↑            ↑
           GAGAL?        GAGAL?
           STOP! ❌      STOP! ❌
```

Setiap push ke repository → pipeline otomatis menjalankan test dan build. Kalau **gagal**, deploy tidak dilanjutkan. Ini mencegah kode rusak masuk ke production.

---

## 📝 Ringkasan Konsep

| No | Konsep | File | Penjelasan |
|----|--------|------|------------|
| 1 | Layout | `app/layout.js` | Bungkus global untuk semua halaman |
| 2 | Halaman | `app/page.js` | Routing otomatis dari folder |
| 3 | CSS Variables | `app/globals.css` | Tema warna di `:root` |
| 4 | Flexbox & Grid | `app/globals.css` | Layout 1D dan 2D |
| 5 | Responsive | `app/globals.css` | `@media` untuk layar kecil |
| 6 | Component | `components/*.js` | UI yang bisa dipakai ulang |
| 7 | Props | `components/*.js` | Data dari parent ke child |
| 8 | Data Layer | `lib/*.js` | Pemisahan data dari UI |
| 9 | API Route | `app/api/*/route.js` | Backend endpoint JSON |
| 10 | Env Variable | `process.env.*` | Konfigurasi tanpa ubah kode |
| 11 | Test | `tests/*.test.mjs` | Validasi otomatis |
| 12 | Build | `next.config.mjs` | `standalone` output |

---

## 🏠 Tugas Mandiri

1. **Halaman baru**: Buat halaman `/mahasiswa` dengan component dan data dari `lib/`
2. **API route**: Buat endpoint `/api/mahasiswa` yang mengembalikan JSON
3. **CSS**: Tambahkan minimal 3 class baru menggunakan CSS variables
4. **Responsive**: Pastikan halaman mahasiswa rapi di mobile
5. **Environment variable**: Tambahkan dan gunakan `NEXT_PUBLIC_KELAS`
6. **Test & build**: Pastikan `npm test` dan `npm run build` berhasil

**Kumpulkan**: Push ke repository GitHub Classroom masing-masing.

---

## ⏭️ Pertemuan Selanjutnya

Di **Pertemuan 1**, kita mulai membahas **DevOps Culture & Principles** dan melakukan setup Git workflow. Aplikasi Next.js yang sudah kamu pahami di sini akan menjadi project yang di-otomasi pipeline-nya sepanjang semester.
