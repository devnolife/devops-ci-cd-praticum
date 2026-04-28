<div align="center">

<img src="https://raw.githubusercontent.com/devnolife/devnolife/main/assets/unismuh-logo.png" alt="Unismuh Makassar" width="100"/>

# Praktikum DevOps & CI/CD Pipelines

**Membangun Alur Kerja Otomatis untuk Software Delivery yang Andal**

![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

`CW6552021554` · Semester V · 3 SKS · Program Studi Informatika
Fakultas Teknik — **Universitas Muhammadiyah Makassar**

[🚀 Mulai dari sini](./pertemuan-00/index.html)

</div>

---

## 📑 Daftar Isi

- [Tentang Mata Kuliah](#-tentang-mata-kuliah)
- [Capaian Pembelajaran](#-capaian-pembelajaran)
- [Peta Pembelajaran](#-peta-pembelajaran)
- [Getting Started](#-getting-started)
- [Struktur Project](#-struktur-project)
- [Sistem Penilaian](#-sistem-penilaian)
- [Panduan Pengumpulan](#-panduan-pengumpulan)
- [Resources](#-resources)

---

## 📖 Tentang Mata Kuliah

Mata kuliah ini membekali mahasiswa dengan kemampuan membangun **alur kerja otomatis** untuk proses **Continuous Integration** dan **Continuous Delivery (CI/CD)** menggunakan teknologi standar industri seperti **Jenkins**, **GitHub Actions**, dan **Docker**.

Pendekatan yang digunakan adalah *hands-on practicum* — mahasiswa langsung mempraktikkan konsep DevOps mulai dari pengelolaan kode sumber dengan Git, membangun pipeline otomatis, hingga deployment berbasis container. Materi dimulai dari fondasi aplikasi fullstack (Next.js) agar mahasiswa memahami konteks aplikasi yang akan di-*deliver* melalui pipeline.

> *"Lebih dari sekadar alat, DevOps adalah budaya kolaborasi yang didukung oleh otomatisasi."*

---

## 🎯 Capaian Pembelajaran

| # | Capaian Pembelajaran |
|:-:|----------------------|
| 1 | Memahami **filosofi dan budaya DevOps** dalam pengembangan perangkat lunak |
| 2 | Menguasai **version control** dengan Git & strategi branching (GitFlow) |
| 3 | Mampu membangun **CI/CD pipeline** otomatis menggunakan Jenkins & GitHub Actions |
| 4 | Mengimplementasikan **automated testing** dalam pipeline CI |
| 5 | Menerapkan **containerized deployment** menggunakan Docker |

---

## 🗺️ Peta Pembelajaran

> **9 pertemuan** (termasuk P00 sebagai fondasi) dengan pendekatan *learning-by-doing*

| Pertemuan | Topik | Materi Utama | Status |
|:---------:|-------|--------------|:------:|
| **00** | [Fullstack Next.js Fundamentals](./pertemuan-00/) | Components, CSS, API Routes, Docker build | ✅ |
| **01** | [DevOps Culture & Principles](./pertemuan-01/) | Filosofi DevOps, DORA metrics, toolchain setup | ✅ |
| **02** | [Git Advanced & GitFlow](./pertemuan-02/) | Branching strategies, merge vs rebase, GitFlow | ✅ |
| **03** | [Code Review & Pull Request](./pertemuan-03/) | PR best practices, review checklist, collaboration | ✅ |
| **04** | [Jenkins CI Pipeline](./pertemuan-04/) | Jenkins setup, Jenkinsfile, pipeline stages | ✅ |
| **05** | [Automated Testing](./pertemuan-05/) | Unit & integration tests, test automation dalam CI | ✅ |
| **06** | [Docker CI/CD Pipeline](./pertemuan-06/) | Docker build dalam pipeline, container registry | ✅ |
| **07** | [GitHub Actions](./pertemuan-07/) | Workflows, actions marketplace, matrix builds | ✅ |
| **08** | [**UTS — Mid-term Exam**](./pertemuan-08/) | End-to-end CI/CD pipeline project | 🎯 |

---

## 🚀 Getting Started

### Prasyarat

<details>
<summary><strong>💻 Kebutuhan Sistem</strong></summary>

| Komponen | Minimum | Rekomendasi |
|----------|---------|-------------|
| CPU | 4 cores | 8 cores |
| RAM | 8 GB | 16 GB |
| Storage | 50 GB free | — |
| OS | Windows 10+ (WSL2), macOS, atau Linux | — |

**Software yang diperlukan:**
- Git & Git Bash
- Docker Desktop / Docker Engine
- Visual Studio Code
- Java JDK 11+ (untuk Jenkins)

</details>

### Instalasi

<details>
<summary><strong>🪟 Windows (WSL2)</strong></summary>

```powershell
wsl --install

# Gunakan Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
choco install git docker-desktop vscode -y

git --version && docker --version
```

</details>

<details>
<summary><strong>🍎 macOS</strong></summary>

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git && brew install --cask docker visual-studio-code
git --version && docker --version
```

</details>

<details>
<summary><strong>🐧 Linux (Ubuntu/Debian)</strong></summary>

```bash
sudo apt update && sudo apt install git -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
git --version && docker --version
```

</details>

### Jenkins Quick Start

```bash
docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts

# Ambil password awal
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

---

## 📁 Struktur Project

```
devops-cicd-practicum/
├── README.md
├── .gitignore
├── pertemuan-00/          # Fondasi Next.js (HTML interaktif)
│   ├── index.html         # Landing page — mulai dari sini
│   ├── 00-setup-install.html
│   ├── 01-react-vs-nextjs.html
│   ├── ...
│   └── quiz-system.js
├── pertemuan-01/          # DevOps Culture & Principles
├── pertemuan-02/          # Git Advanced & GitFlow
├── pertemuan-03/          # Code Review & Pull Request
├── pertemuan-04/          # Jenkins CI Pipeline
├── pertemuan-05/          # Automated Testing
├── pertemuan-06/          # Docker CI/CD Pipeline
├── pertemuan-07/          # GitHub Actions
└── pertemuan-08/          # UTS — Mid-term Exam
```

---

## 📊 Sistem Penilaian

| Komponen | Bobot | Keterangan |
|----------|:-----:|------------|
| 📋 Kehadiran & Partisipasi | 10% | Minimal kehadiran 75% |
| 📝 Tugas Mingguan | 30% | Dikumpulkan setiap pertemuan |
| 📊 UTS (Mid-term Project) | 25% | Pertemuan ke-8 |
| 🎯 UAS (Final Project) | 35% | End-to-end CI/CD pipeline |

### Kriteria Kelulusan

- Nilai akhir minimal **60 (D)**
- Kehadiran minimal **75%**
- Mengumpulkan minimal **75%** tugas
- Mengikuti **UTS dan UAS**

---

## 📤 Panduan Pengumpulan

1. **Fork** repository ini ke akun GitHub pribadi
2. Kerjakan tugas di branch terpisah (`feature/pertemuan-XX`)
3. **Commit** dengan pesan yang jelas dan deskriptif
4. Buat **Pull Request** ke branch `main` di fork Anda
5. Pastikan pipeline CI berjalan ✅ sebelum deadline
6. Kumpulkan link PR melalui platform yang ditentukan dosen

---

## 📚 Resources

| Kategori | Resource | Link |
|----------|----------|------|
| 🔧 CI/CD | Jenkins Documentation | [jenkins.io/doc](https://www.jenkins.io/doc/) |
| 🐙 CI/CD | GitHub Actions Docs | [docs.github.com/actions](https://docs.github.com/en/actions) |
| 🐳 Container | Docker Documentation | [docs.docker.com](https://docs.docker.com/) |
| 🔀 Version Control | Pro Git Book | [git-scm.com/book](https://git-scm.com/book/en/v2) |
| 📖 DevOps | The Phoenix Project | Buku referensi budaya DevOps |

---

<div align="center">

**Laboratorium Informatika — Fakultas Teknik**
**Universitas Muhammadiyah Makassar**

[![GitHub](https://img.shields.io/badge/Maintained%20by-devnolife-181717?style=flat-square&logo=github)](https://github.com/devnolife)

</div>
