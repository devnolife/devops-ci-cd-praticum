# 📦 Pertemuan 06: Continuous Delivery Pipeline

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Membangun CD pipeline lengkap
- Deploy otomatis ke staging environment
- Mengkonfigurasi approval gates
- Memahami artifact management

## 📚 Materi

### CD Pipeline Stages

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Build  │ → │  Test   │ → │ Staging │ → │  Prod   │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                                  ↓
                            ┌─────────┐
                            │Approval │
                            └─────────┘
```

### Deployment Environments

1. **Development** - Developer testing
2. **Staging** - Pre-production testing
3. **Production** - Live environment

## 🔧 Tugas Praktikum

### Task 1: Complete Pipeline

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t myapp:${BUILD_NUMBER} .'
            }
        }
        
        stage('Test') {
            steps {
                sh 'docker run myapp:${BUILD_NUMBER} npm test'
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                sh 'docker-compose -f docker-compose.staging.yml up -d'
            }
        }
        
        stage('Approval') {
            steps {
                input message: 'Deploy to production?'
            }
        }
        
        stage('Deploy to Production') {
            steps {
                sh 'docker-compose -f docker-compose.prod.yml up -d'
            }
        }
    }
}
```

### Task 2: Automated Deployment

1. Configure staging environment
2. Implement health checks
3. Add rollback capability

## 📤 Submission

```
📁 NIM_Nama_Pertemuan06/
├── 📄 Jenkinsfile
├── 📄 docker-compose.staging.yml
├── 📄 docker-compose.prod.yml
├── 📁 screenshots/
│   ├── pipeline-stages.png
│   └── staging-deployment.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
