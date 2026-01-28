# 🔧 Pertemuan 04: Introduction to CI/CD - Jenkins Setup

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami konsep CI/CD
- Menginstall dan mengkonfigurasi Jenkins
- Membuat Jenkins job pertama
- Menghubungkan Jenkins dengan repository

## 📚 Materi

### Continuous Integration (CI)

- Merge code changes frequently
- Automated build process
- Automated testing
- Fast feedback loop

### Continuous Delivery/Deployment (CD)

- Automated deployment to environments
- Release automation
- Rollback capabilities

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

## 🔧 Tugas Praktikum

### Task 1: Install Jenkins

```bash
docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

### Task 2: Configure Jenkins

1. Complete initial setup wizard
2. Install recommended plugins
3. Create admin user
4. Configure system settings

### Task 3: Create First Job

1. Create Freestyle project
2. Configure SCM (Git)
3. Add build step
4. Run build dan verify

## 📤 Submission

```
📁 NIM_Nama_Pertemuan04/
├── 📄 README.md
├── 📁 screenshots/
│   ├── jenkins-dashboard.png
│   ├── first-job-config.png
│   └── build-success.png
└── 📄 jenkins-notes.md
```

**Deadline:** Sebelum pertemuan berikutnya
