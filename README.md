<div align="center">

<img src="https://raw.githubusercontent.com/devnolife/devnolife/main/assets/unismuh-logo.png" alt="Unismuh Logo" width="120"/>

# 🔄 Praktikum DevOps & CI/CD Pipelines

<p align="center">
  <strong>Membangun Alur Kerja Otomatis untuk Software Delivery yang Andal</strong>
</p>

![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![GitLab CI](https://img.shields.io/badge/GitLab%20CI-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

### 🏛️ Laboratorium Informatika
**Fakultas Teknik • Universitas Muhammadiyah Makassar**

<br/>

[![GitHub](https://img.shields.io/badge/Maintained%20by-devnolife-181717?style=for-the-badge&logo=github)](https://github.com/devnolife)
[![License](https://img.shields.io/badge/License-Educational-success?style=for-the-badge)](#)

</div>

---

## 📋 Informasi Mata Kuliah

<table>
<tr>
<td width="200"><strong>🏷️ Kode</strong></td>
<td><code>CW6552021554</code></td>
</tr>
<tr>
<td><strong>📅 Semester</strong></td>
<td>V (Lima)</td>
</tr>
<tr>
<td><strong>📊 SKS</strong></td>
<td>3 SKS</td>
</tr>
<tr>
<td><strong>🎓 Program Studi</strong></td>
<td>Informatika</td>
</tr>
<tr>
<td><strong>🏛️ Fakultas</strong></td>
<td>Teknik</td>
</tr>
<tr>
<td><strong>🏫 Universitas</strong></td>
<td>Universitas Muhammadiyah Makassar</td>
</tr>
</table>

---

## 📖 Deskripsi

<div align="center">
<table>
<tr>
<td>
<br/>

> *"Lebih dari sekadar alat, DevOps adalah budaya kolaborasi yang didukung oleh otomatisasi."*

Mata kuliah ini mengajarkan mahasiswa untuk membangun **alur kerja otomatis** untuk **Continuous Integration** dan **Continuous Delivery (CI/CD)** menggunakan teknologi industri seperti **Jenkins**, **GitLab CI**, dan **GitHub Actions**.

<br/>
</td>
</tr>
</table>
</div>

---

## 🎯 Capaian Pembelajaran

<table>
<tr>
<td>

| No | Capaian Pembelajaran |
|:--:|----------------------|
| 1️⃣ | Memahami **filosofi dan budaya DevOps** |
| 2️⃣ | Menguasai **version control** dengan Git & Git workflows |
| 3️⃣ | Mampu membangun **CI/CD pipeline** otomatis |
| 4️⃣ | Mengimplementasikan **automated testing** dalam pipeline |
| 5️⃣ | Menerapkan **deployment strategies** yang andal |

</td>
</tr>
</table>

---

## 📚 Roadmap Pembelajaran

> **8 Pertemuan** dengan pendekatan *hands-on DevOps practices*

<div align="center">

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVOPS LEARNING PATH                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   🎭 DevOps     🔀 Git         🔍 Code        🔧 Jenkins        │
│   Culture  ──▶  Workflows ──▶  Review   ──▶  Setup            │
│                                                                 │
│       │                                                         │
│       ▼                                                         │
│                                                                 │
│   🧪 CI         📦 CD          🦊 GitLab     🏆 UTS             │
│   Pipeline ──▶  Pipeline ──▶  CI/CD    ──▶  Project           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

</div>

### 📅 Jadwal Pertemuan

| Pertemuan | Topik | Deliverables | Status |
|:---------:|-------|--------------|:------:|
| **00** | [Fullstack Next.js — Fondasi Sebelum CI/CD](./pertemuan-00/) | Pahami Next.js: component, CSS, API, test | 🟢 |
| **01** | [DevOps Culture & Principles](./pertemuan-01/) | Setup development environment | 🟢 |
| **02** | [Git Advanced: Branching Strategies](./pertemuan-02/) | Implement GitFlow workflow | 🟢 |
| **03** | [Code Review & Pull Request Best Practices](./pertemuan-03/) | Collaborative coding exercise | 🟢 |
| **04** | [Introduction to CI/CD: Jenkins Setup](./pertemuan-04/) | Install dan configure Jenkins | 🟢 |
| **05** | [Building CI Pipeline: Automated Testing](./pertemuan-05/) | Unit & integration tests automation | 🟢 |
| **06** | [Continuous Delivery Pipeline](./pertemuan-06/) | Automated deployment to staging | 🟢 |
| **07** | [GitLab CI/CD](./pertemuan-07/) | Build pipeline dengan GitLab CI | 🟢 |
| **08** | [**UTS: Complete CI/CD Pipeline**](./pertemuan-08/) | End-to-end pipeline project | 🎯 |

## 🧪 Contoh Pipeline: Next.js + Docker

Gunakan contoh pipeline berikut untuk menghubungkan materi CI/CD dengan aplikasi nyata:

```text
examples\nextjs-docker-pipeline
```

Pipeline tersebut memakai aplikasi dari project Cloud Native:

```text
..\cloud-native-practicum\examples\nextjs-docker-app
```

Alur yang diautomasi:

```text
Checkout -> npm ci -> npm test -> npm run build -> docker build -> smoke test /api/health
```

Dengan ini mahasiswa bisa melihat hubungan langsung antara kode aplikasi, Docker image, dan pipeline delivery.

---

## 🚀 Quick Start

### Prerequisites

<details>
<summary>📋 <strong>System Requirements</strong></summary>

<br/>

**Minimum Requirements:**
| Component | Requirement |
|-----------|-------------|
| 💻 CPU | 4 cores (8 recommended) |
| 💾 RAM | 8GB minimum (16GB recommended) |
| 💽 Storage | 50GB free space |
| 🖥️ OS | Windows 10/11 (WSL2), macOS, atau Linux |

**Required Software:**
- ✅ Git & Git Bash
- ✅ Docker Desktop / Docker Engine
- ✅ Visual Studio Code
- ✅ Java JDK 11+ (untuk Jenkins)

</details>

### ⚡ Installation Guide

<details>
<summary>🪟 <strong>Windows (dengan WSL2)</strong></summary>

```powershell
# Install WSL2
wsl --install

# Install Chocolatey (Package Manager)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install tools
choco install git docker-desktop vscode -y

# Restart terminal, then verify
git --version
docker --version
```

</details>

<details>
<summary>🍎 <strong>macOS</strong></summary>

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install tools
brew install git
brew install --cask docker visual-studio-code

# Verify installations
git --version
docker --version
```

</details>

<details>
<summary>🐧 <strong>Linux (Ubuntu/Debian)</strong></summary>

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install git -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Verify
git --version && docker --version
```

</details>

### 🔧 Jenkins Quick Start

```bash
# Run Jenkins dengan Docker
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

---

## 💻 Tech Stack

<div align="center">

| Category | Technologies |
|:--------:|-------------|
| **Version Control** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) ![GitLab](https://img.shields.io/badge/GitLab-FC6D26?style=flat-square&logo=gitlab&logoColor=white) |
| **CI/CD** | ![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white) ![GitLab CI](https://img.shields.io/badge/GitLab%20CI-FC6D26?style=flat-square&logo=gitlab&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) |
| **Containerization** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=flat-square&logo=docker&logoColor=white) |

</div>

---

## 📊 Sistem Penilaian

<div align="center">

| Komponen | Bobot |
|----------|:-----:|
| 📋 Kehadiran & Partisipasi | 10% |
| 📝 Tugas Mingguan | 30% |
| 📊 UTS (Mid-term Project) | 25% |
| 🎯 UAS (Final Project) | 35% |

</div>

### ✅ Kriteria Kelulusan

- [x] Nilai akhir minimal: **60 (D)**
- [x] Kehadiran minimal: **75%**
- [x] Mengumpulkan minimal **75%** tugas
- [x] Mengikuti **UTS dan UAS**

---

## 📁 Struktur Repository

```
📁 devops-cicd-practicum/
├── 📄 README.md
├── 📄 .gitignore
├── 📁 examples/
│   └── 📁 nextjs-docker-pipeline/    # Jenkinsfile & GitHub Actions untuk app Next.js
├── 📁 pertemuan-01/    # DevOps Culture & Principles
├── 📁 pertemuan-02/    # Git Advanced: Branching
├── 📁 pertemuan-03/    # Code Review & PR
├── 📁 pertemuan-04/    # Jenkins Setup
├── 📁 pertemuan-05/    # CI Pipeline: Testing
├── 📁 pertemuan-06/    # CD Pipeline
├── 📁 pertemuan-07/    # GitLab CI/CD
└── 📁 pertemuan-08/    # UTS Project
```

---

## 📚 Resources

<div align="center">

| Resource | Link |
|----------|------|
| 📖 Jenkins Documentation | [jenkins.io/doc](https://www.jenkins.io/doc/) |
| 🦊 GitLab CI/CD Docs | [docs.gitlab.com](https://docs.gitlab.com/ee/ci/) |
| 🐙 GitHub Actions Docs | [docs.github.com](https://docs.github.com/en/actions) |
| 🐳 Docker Documentation | [docs.docker.com](https://docs.docker.com/) |

</div>

---

## 📞 Kontak

<div align="center">

| Platform | Link |
|----------|------|
| 🏛️ Laboratorium Informatika | Fakultas Teknik - Unismuh Makassar |
| 🐙 GitHub | [@devnolife](https://github.com/devnolife) |

---

<br/>

**Made with ❤️ by Laboratorium Informatika - Fakultas Teknik**

**Universitas Muhammadiyah Makassar**

<br/>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/devnolife)

</div>
