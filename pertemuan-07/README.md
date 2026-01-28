# 🦊 Pertemuan 07: GitLab CI/CD

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Menggunakan GitLab CI/CD
- Menulis `.gitlab-ci.yml`
- Mengkonfigurasi GitLab Runners
- Memahami GitLab pipelines dan jobs

## 📚 Materi

### GitLab CI/CD Concepts

- **Pipeline** - Collection of jobs
- **Stages** - Groups of jobs that run in order
- **Jobs** - Individual tasks
- **Runners** - Execute jobs

### Pipeline Visualization

```
┌───────────────────────────────────────────────────────┐
│                       Pipeline                         │
├───────────────────────────────────────────────────────┤
│  Stage 1: Build    │  Stage 2: Test   │ Stage 3: Deploy│
│  ┌─────────────┐  │  ┌─────────────┐ │ ┌─────────────┐│
│  │ build-job   │  │  │ unit-test   │ │ │ deploy-stg  ││
│  └─────────────┘  │  ├─────────────┤ │ ├─────────────┤│
│                    │  │ lint-test   │ │ │ deploy-prod ││
│                    │  └─────────────┘ │ └─────────────┘│
└───────────────────────────────────────────────────────┘
```

## 🔧 Tugas Praktikum

### Task: Create GitLab CI/CD Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

build:
  stage: build
  script:
    - docker build -t $IMAGE_TAG .
    - docker push $IMAGE_TAG

test:
  stage: test
  script:
    - docker run $IMAGE_TAG npm test

deploy-staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
  environment:
    name: staging
  only:
    - develop

deploy-production:
  stage: deploy
  script:
    - echo "Deploying to production..."
  environment:
    name: production
  when: manual
  only:
    - main
```

## 📤 Submission

```
📁 NIM_Nama_Pertemuan07/
├── 📄 .gitlab-ci.yml
├── 📄 Dockerfile
├── 📁 src/
├── 📁 screenshots/
│   ├── gitlab-pipeline.png
│   └── pipeline-jobs.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
