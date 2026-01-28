# 🐳 Pertemuan 11: Container Orchestration in CI/CD

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Mengintegrasikan Docker builds dalam pipeline
- Build dan push images ke registry
- Deploy containers dalam CI/CD
- Best practices untuk container dalam pipeline

## 📚 Materi

### Container in CI/CD

```
┌────────────────────────────────────────────────────────┐
│                     CI/CD Pipeline                      │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Code → Build → Test → Docker Build → Push → Deploy    │
│                           │           │        │        │
│                           ↓           ↓        ↓        │
│                      ┌────────┐  ┌────────┐ ┌────────┐ │
│                      │Dockerfile│ │Registry│ │K8s/ECS │ │
│                      └────────┘  └────────┘ └────────┘ │
│                                                         │
└────────────────────────────────────────────────────────┘
```

## 🔧 Tugas Praktikum

### Task 1: Multi-stage Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Task 2: Pipeline dengan Docker

```groovy
pipeline {
    agent any
    
    environment {
        REGISTRY = 'docker.io'
        IMAGE_NAME = 'myapp'
    }
    
    stages {
        stage('Build Image') {
            steps {
                script {
                    docker.build("${REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}")
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-creds') {
                        docker.image("${REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}").push()
                        docker.image("${REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh "docker-compose up -d"
            }
        }
    }
}
```

## 📤 Submission

```
📁 NIM_Nama_Pertemuan11/
├── 📄 Dockerfile
├── 📄 Jenkinsfile
├── 📄 docker-compose.yml
├── 📁 src/
├── 📁 screenshots/
│   ├── docker-build.png
│   └── registry-push.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
