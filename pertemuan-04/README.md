# 🔧 Pertemuan 04: Introduction to CI/CD — Jenkins Setup & Build Next.js

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami konsep CI/CD
- Menginstall dan mengkonfigurasi Jenkins
- Mengkonfigurasi Jenkins dengan Node.js
- Membuat Jenkins Pipeline pertama untuk build Next.js

## 📚 Materi

### Continuous Integration (CI)

| Aspek | Penjelasan |
|-------|-----------|
| **Merge Frequently** | Developer merge code ke shared branch beberapa kali sehari |
| **Automated Build** | Setiap push memicu build otomatis |
| **Automated Testing** | Test suite berjalan otomatis setelah build |
| **Fast Feedback** | Developer tahu dalam menit apakah code mereka break something |

### Continuous Delivery / Deployment (CD)

| Aspek | Penjelasan |
|-------|-----------|
| **Continuous Delivery** | Code selalu siap di-deploy, deployment manual (approval) |
| **Continuous Deployment** | Setiap commit yang pass test langsung deploy ke production |
| **Rollback** | Kemampuan kembali ke versi sebelumnya jika ada masalah |

### Jenkins Architecture

```
┌─────────────────────────────────────┐
│           Jenkins Master            │
│  ┌─────────────────────────────┐   │
│  │     Job Scheduler           │   │
│  │     Plugin Management       │   │
│  │     Build Queue             │   │
│  └─────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
    ┌──────────┼──────────┐
    ↓          ↓          ↓
┌───────┐  ┌───────┐  ┌───────┐
│Agent 1│  │Agent 2│  │Agent 3│
└───────┘  └───────┘  └───────┘
```

### Bagaimana CI/CD Bekerja dengan Next.js

```
┌─────────────────────────────────────────────────────────────┐
│  Developer push code                                        │
│       ↓                                                     │
│  Jenkins detect perubahan (webhook / polling)               │
│       ↓                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ npm ci   │→ │ npm test │→ │npm build │  CI Pipeline     │
│  │ Install  │  │  Test    │  │  Build   │                  │
│  └──────────┘  └──────────┘  └──────────┘                 │
│       ↓ (jika semua pass)                                   │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ docker build │→ │ docker run  │  CD Pipeline            │
│  │ Build Image  │  │   Deploy    │                         │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Tugas Praktikum

### Task 1: Install Jenkins

Jalankan Jenkins menggunakan Docker:

```bash
docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

> **Note:** Mount Docker socket agar Jenkins bisa menjalankan Docker commands (diperlukan di Pertemuan 06).

Setup awal:
1. Buka `http://localhost:8080`
2. Ambil initial admin password:
   ```bash
   docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```
3. Install recommended plugins
4. Buat admin user

### Task 2: Configure Jenkins dengan Node.js

Jenkins perlu tahu cara menjalankan Node.js. Ada dua cara:

#### Cara A: NodeJS Plugin (Recommended)

1. **Manage Jenkins** → **Plugins** → **Available plugins**
2. Cari dan install **NodeJS Plugin**
3. **Manage Jenkins** → **Tools** → **NodeJS installations**
4. Tambahkan:
   - **Name:** `Node20`
   - **Version:** `20.x` (pilih versi terbaru 20.x)
   - ✅ Install automatically
5. Save

#### Cara B: Sudah Terinstall di Agent

Jika Node.js sudah tersedia di Jenkins agent, tidak perlu plugin. Verifikasi:
```bash
node --version  # harus v20.x.x
npm --version
```

### Task 3: Buat Pipeline Jenkins Pertama untuk Next.js

#### Langkah 1 — Buat Pipeline Project

1. **Dashboard** → **New Item**
2. Nama: `nextjs-ci-pipeline`
3. Pilih **Pipeline**
4. Klik OK

#### Langkah 2 — Konfigurasi Pipeline

Di bagian **Pipeline**, pilih **Pipeline script** dan masukkan:

```groovy
pipeline {
    agent any
    tools {
        nodejs 'Node20'
    }
    stages {
        stage('Install') {
            steps {
                dir('cloud-native-practicum/examples/nextjs-docker-app') {
                    sh 'npm ci'
                }
            }
        }
        stage('Test') {
            steps {
                dir('cloud-native-practicum/examples/nextjs-docker-app') {
                    sh 'npm test'
                }
            }
        }
        stage('Build') {
            steps {
                dir('cloud-native-practicum/examples/nextjs-docker-app') {
                    sh 'npm run build'
                }
            }
        }
    }
    post {
        success {
            echo '✅ CI Pipeline berhasil! Semua stage pass.'
        }
        failure {
            echo '❌ CI Pipeline gagal! Cek log untuk detail error.'
        }
    }
}
```

#### Langkah 3 — Jalankan Build

1. Klik **Build Now**
2. Lihat progress di **Build History** → klik build number → **Console Output**
3. Verifikasi semua 3 stage **pass**:
   - ✅ Install — dependencies ter-install
   - ✅ Test — semua test pass
   - ✅ Build — Next.js production build sukses

#### Langkah 4 — (Opsional) Hubungkan ke Git Repository

Jika project sudah ada di GitHub:

1. Di Pipeline configuration, pilih **Pipeline script from SCM**
2. SCM: **Git**
3. Repository URL: `https://github.com/<username>/<repo>.git`
4. Branch: `*/main` atau `*/develop`
5. Script Path: `Jenkinsfile`

> 💡 Contoh Jenkinsfile lengkap (termasuk Docker build dan smoke test) ada di:
> ```
> examples\nextjs-docker-pipeline\Jenkinsfile
> ```

---

## 📤 Submission

```
📁 NIM_Nama_Pertemuan04/
├── 📄 README.md (Laporan setup dan hasil build)
├── 📄 Jenkinsfile
├── 📁 screenshots/
│   ├── jenkins-dashboard.png
│   ├── nodejs-plugin-config.png
│   ├── pipeline-config.png
│   ├── build-console-output.png
│   └── build-success.png
└── 📄 jenkins-notes.md
```

**Deadline:** Sebelum pertemuan berikutnya
