# 🦊 Pertemuan 07: GitHub Actions & GitLab CI — Next.js Pipeline

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Menggunakan GitHub Actions untuk CI/CD Next.js
- Menulis `.github/workflows/*.yml` dan `.gitlab-ci.yml`
- Memahami perbedaan antara Jenkins, GitHub Actions, dan GitLab CI
- Mengkonfigurasi multi-platform pipeline runners

## 📚 Materi

### Perbandingan CI/CD Platforms

| Aspek | Jenkins | GitHub Actions | GitLab CI |
|-------|---------|---------------|-----------|
| **Hosting** | Self-hosted | Cloud (GitHub) | Cloud / Self-hosted |
| **Config** | `Jenkinsfile` (Groovy) | `.yml` workflow | `.gitlab-ci.yml` |
| **Runner** | Jenkins Agent | GitHub-hosted / self-hosted | GitLab Runner |
| **Gratis** | Open source | 2000 min/bulan (free tier) | 400 min/bulan (free tier) |
| **Marketplace** | Plugin ecosystem | Actions marketplace | Template catalog |

### Pipeline Visualization

```
┌───────────────────────────────────────────────────────────┐
│                       Pipeline                            │
├───────────────────────────────────────────────────────────┤
│  Job 1: test         │  Job 2: docker (needs: test)      │
│  ┌─────────────────┐ │  ┌─────────────────────────────┐  │
│  │ checkout         │ │  │ checkout                    │  │
│  │ setup-node       │ │  │ docker build                │  │
│  │ npm ci           │ │  │ docker login                │  │
│  │ npm test         │ │  │ docker push                 │  │
│  │ npm run build    │ │  │                             │  │
│  └─────────────────┘ │  └─────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

### GitHub Actions Concepts

| Konsep | Penjelasan |
|--------|-----------|
| **Workflow** | File `.yml` di `.github/workflows/` yang mendefinisikan pipeline |
| **Event** | Trigger: `push`, `pull_request`, `schedule`, `workflow_dispatch` |
| **Job** | Kumpulan steps yang berjalan di satu runner |
| **Step** | Satu perintah atau action |
| **Action** | Reusable unit (e.g., `actions/checkout@v4`, `actions/setup-node@v4`) |
| **Secret** | Variabel sensitif (e.g., Docker Hub password) |

---

## 🔧 Tugas Praktikum

Gunakan aplikasi Next.js:
```
..\..\cloud-native-practicum\examples\nextjs-docker-app
```

### Task 1: GitHub Actions — CI/CD untuk Next.js

Buat file `.github/workflows/nextjs-ci.yml`:

```yaml
name: Next.js CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test & Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build Next.js
        run: npm run build

  docker:
    name: Build & Push Docker Image
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t nextjs-docker-app:${{ github.sha }} .

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Tag and Push image
        run: |
          docker tag nextjs-docker-app:${{ github.sha }} \
            ${{ secrets.DOCKER_USERNAME }}/nextjs-docker-app:latest
          docker tag nextjs-docker-app:${{ github.sha }} \
            ${{ secrets.DOCKER_USERNAME }}/nextjs-docker-app:${{ github.sha }}
          docker push ${{ secrets.DOCKER_USERNAME }}/nextjs-docker-app:latest
          docker push ${{ secrets.DOCKER_USERNAME }}/nextjs-docker-app:${{ github.sha }}

      - name: Smoke test container
        run: |
          docker run -d --name smoke-test -p 3000:3000 \
            -e APP_ENV=ci \
            -e APP_VERSION=${{ github.sha }} \
            nextjs-docker-app:${{ github.sha }}

          for i in {1..20}; do
            if curl -fsS http://localhost:3000/api/health; then
              echo ""
              echo "✅ Smoke test passed!"
              docker rm -f smoke-test
              exit 0
            fi
            sleep 2
          done

          docker logs smoke-test
          docker rm -f smoke-test
          exit 1
```

### Penjelasan Workflow

```
push ke main ──→ [test job] ──→ [docker job]
                  │                │
                  ├─ npm ci        ├─ docker build
                  ├─ npm test      ├─ docker login
                  └─ npm build     ├─ docker push
                                   └─ smoke test

push ke develop ──→ [test job only]
                     │
                     ├─ npm ci
                     ├─ npm test
                     └─ npm build

pull_request ──→ [test job only]
```

### Setup GitHub Secrets

Untuk Docker Hub push, tambahkan secrets di repository:

1. Buka **Settings** → **Secrets and variables** → **Actions**
2. Tambahkan:
   - `DOCKER_USERNAME` — username Docker Hub
   - `DOCKER_PASSWORD` — access token Docker Hub (bukan password!)

---

### Task 2: GitLab CI — Next.js Pipeline

Buat file `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - build
  - deploy

variables:
  IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
  NODE_IMAGE: node:20-alpine

test:
  stage: test
  image: $NODE_IMAGE
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
  script:
    - npm ci
    - npm test
    - npm run build
  artifacts:
    when: always
    paths:
      - .next/

build-image:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  script:
    - docker build -t $IMAGE_TAG .
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker push $IMAGE_TAG
  only:
    - main
    - develop

deploy-staging:
  stage: deploy
  script:
    - echo "Deploying Next.js to staging..."
    - echo "Image: $IMAGE_TAG"
    # Dalam real scenario: SSH ke server staging dan docker pull + run
  environment:
    name: staging
    url: http://staging.example.com
  only:
    - develop

deploy-production:
  stage: deploy
  script:
    - echo "Deploying Next.js to production..."
    - echo "Image: $IMAGE_TAG"
    # Dalam real scenario: SSH ke server production dan docker pull + run
  environment:
    name: production
    url: http://production.example.com
  when: manual
  only:
    - main
```

### Perbandingan Syntax

| Fitur | GitHub Actions | GitLab CI |
|-------|---------------|-----------|
| Config file | `.github/workflows/*.yml` | `.gitlab-ci.yml` |
| Job dependency | `needs: [test]` | Stages berjalan berurutan |
| Manual trigger | `workflow_dispatch` | `when: manual` |
| Conditions | `if: github.ref == '...'` | `only: [main]` / `rules:` |
| Caching | `actions/cache` atau `setup-node cache` | `cache:` block |
| Artifacts | `actions/upload-artifact` | `artifacts:` block |
| Docker build | Langsung (runner punya Docker) | `services: [docker:dind]` |
| Secrets | Repository Settings → Secrets | Settings → CI/CD → Variables |

> 💡 Contoh workflow GitHub Actions lengkap ada di:
> ```
> examples\nextjs-docker-pipeline\github-actions-nextjs-docker.yml
> ```

---

### Task 3: Jalankan dan Dokumentasikan

1. **GitHub Actions:**
   - Push workflow file ke repository
   - Lihat run di tab **Actions** di GitHub
   - Screenshot pipeline yang berjalan

2. **GitLab CI (jika punya akun GitLab):**
   - Push `.gitlab-ci.yml` ke GitLab repository
   - Lihat pipeline di **CI/CD → Pipelines**
   - Screenshot pipeline visualization

3. **Perbandingan dengan Jenkins:**
   - Tulis perbandingan pengalaman: Jenkins (P04-P06) vs GitHub Actions vs GitLab CI
   - Mana yang lebih mudah di-setup?
   - Mana yang lebih cocok untuk project kecil vs besar?

---

## 📤 Submission

```
📁 NIM_Nama_Pertemuan07/
├── 📄 .github/workflows/nextjs-ci.yml
├── 📄 .gitlab-ci.yml
├── 📁 screenshots/
│   ├── github-actions-pipeline.png
│   ├── github-actions-test-job.png
│   ├── github-actions-docker-job.png
│   ├── gitlab-pipeline.png (jika ada)
│   └── platform-comparison.png
└── 📄 README.md (Laporan + perbandingan platform)
```

**Deadline:** Sebelum pertemuan berikutnya
