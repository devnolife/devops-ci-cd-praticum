# 📦 Pertemuan 06: Continuous Delivery Pipeline — Deploy Next.js Docker

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Membangun CD pipeline lengkap untuk Next.js
- Deploy otomatis ke staging environment menggunakan Docker
- Mengkonfigurasi approval gates untuk production deployment
- Mengimplementasikan health check dan rollback

## 📚 Materi

### CD Pipeline Stages

```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ Install │→ │  Test   │→ │Build App│→ │Build Img│→ │ Staging │→ │Approval │→ │  Prod   │
│ npm ci  │  │npm test │  │npm build│  │ docker  │  │ :3001   │  │ manual  │  │ :3000   │
└─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘
                                                         ↓
                                                   ┌──────────┐
                                                   │Smoke Test│
                                                   │/api/health│
                                                   └──────────┘
```

### Deployment Environments

| Environment | Port | Tujuan | Deploy |
|-------------|------|--------|--------|
| **Development** | 3000 (dev server) | Developer testing lokal | Manual (`npm run dev`) |
| **Staging** | 3001 | Pre-production testing, QA | Otomatis setelah CI pass |
| **Production** | 3000 | Live environment untuk user | Manual approval |

### Mengapa Health Check Penting?

Tanpa health check (`/api/health`), pipeline hanya tahu bahwa:
- ✅ Container **berhasil start** (proses Docker berjalan)

Dengan health check, pipeline tahu bahwa:
- ✅ Container berhasil start
- ✅ Next.js server **responsive** dan menerima request
- ✅ Aplikasi **healthy** (status: "ok")

```bash
# Health check sederhana
curl -f http://localhost:3001/api/health
# Response: {"status":"ok","service":"nextjs-docker-app",...}
```

Jika health check gagal → pipeline berhenti → deployment **tidak dilanjutkan** ke production.

---

## 🔧 Tugas Praktikum

Gunakan aplikasi Next.js:
```
..\..\cloud-native-practicum\examples\nextjs-docker-app
```

### Task 1: Complete CD Pipeline

Buat `Jenkinsfile` dengan full CI/CD pipeline:

```groovy
pipeline {
    agent any
    tools {
        nodejs 'Node20'
    }
    environment {
        IMAGE_NAME = 'nextjs-docker-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
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
                    sh 'npm test 2>&1 | tee test-results.txt'
                }
            }
            post {
                always {
                    dir('cloud-native-practicum/examples/nextjs-docker-app') {
                        archiveArtifacts artifacts: 'test-results.txt', allowEmptyArchive: true
                    }
                }
            }
        }
        stage('Build App') {
            steps {
                dir('cloud-native-practicum/examples/nextjs-docker-app') {
                    sh 'npm run build'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                dir('cloud-native-practicum/examples/nextjs-docker-app') {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }
        stage('Deploy to Staging') {
            steps {
                sh """
                docker stop nextjs-staging || true
                docker rm nextjs-staging || true
                docker run -d --name nextjs-staging \
                  -p 3001:3000 \
                  -e APP_ENV=staging \
                  -e APP_VERSION=${IMAGE_TAG} \
                  ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }
        stage('Smoke Test') {
            steps {
                sh '''
                echo "Waiting for staging to be ready..."
                for i in $(seq 1 15); do
                  if curl -fsS http://localhost:3001/api/health; then
                    echo ""
                    echo "✅ Staging health check passed!"
                    exit 0
                  fi
                  sleep 2
                done
                echo "❌ Staging health check failed!"
                exit 1
                '''
            }
        }
        stage('Approval') {
            steps {
                input message: 'Deploy to production?', ok: 'Deploy!'
            }
        }
        stage('Deploy to Production') {
            steps {
                sh """
                docker stop nextjs-prod || true
                docker rm nextjs-prod || true
                docker run -d --name nextjs-prod \
                  -p 3000:3000 \
                  -e APP_ENV=production \
                  -e APP_VERSION=${IMAGE_TAG} \
                  ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }
    }
    post {
        success {
            echo '✅ Full CI/CD Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Rolling back...'
            sh 'docker stop nextjs-staging || true'
            sh 'docker rm nextjs-staging || true'
        }
    }
}
```

### Penjelasan Alur Pipeline

| Stage | Apa yang Terjadi | Jika Gagal |
|-------|------------------|-----------|
| **Install** | `npm ci` install dependencies | Pipeline berhenti |
| **Test** | `npm test` jalankan semua test | Pipeline berhenti, test-results.txt disimpan |
| **Build App** | `npm run build` membuat production build | Pipeline berhenti |
| **Build Docker Image** | Multi-stage Dockerfile membuat image | Pipeline berhenti |
| **Deploy to Staging** | Container berjalan di port 3001 | Pipeline berhenti |
| **Smoke Test** | `curl /api/health` verifikasi staging sehat | Pipeline berhenti, staging di-cleanup |
| **Approval** | Menunggu manual approval di Jenkins UI | Timeout/reject = pipeline berhenti |
| **Deploy to Production** | Container berjalan di port 3000 | Pipeline berhenti |

### Task 2: Verifikasi Deployment

Setelah pipeline selesai, verifikasi kedua environment:

```bash
# Staging
curl http://localhost:3001/api/health
# Expect: {"status":"ok","environment":"staging",...}

# Production
curl http://localhost:3000/api/health
# Expect: {"status":"ok","environment":"production",...}

# Buka di browser
# Staging: http://localhost:3001
# Production: http://localhost:3000
```

### Task 3: Implementasi Rollback

Jika deployment production bermasalah, rollback ke versi sebelumnya:

```bash
# Lihat image yang tersedia
docker images nextjs-docker-app

# Rollback ke versi sebelumnya (contoh: tag 5)
docker stop nextjs-prod
docker rm nextjs-prod
docker run -d --name nextjs-prod \
  -p 3000:3000 \
  -e APP_ENV=production \
  nextjs-docker-app:5

# Verifikasi
curl http://localhost:3000/api/health
```

> 💡 Contoh pipeline lengkap (termasuk smoke test yang lebih robust) ada di:
> ```
> examples\nextjs-docker-pipeline\Jenkinsfile
> ```

---

## 📤 Submission

```
📁 NIM_Nama_Pertemuan06/
├── 📄 Jenkinsfile (full CI/CD pipeline)
├── 📁 screenshots/
│   ├── pipeline-stages.png
│   ├── staging-health-check.png
│   ├── approval-gate.png
│   ├── production-deployment.png
│   └── rollback-demo.png
└── 📄 README.md (Laporan)
```

**Deadline:** Sebelum pertemuan berikutnya
