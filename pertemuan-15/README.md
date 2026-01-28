# ☁️ Pertemuan 15: Cloud-Native CI/CD - GitHub Actions

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Menggunakan GitHub Actions untuk CI/CD
- Menulis workflow files
- Menggunakan GitHub marketplace actions
- Deploy ke cloud platforms

## 📚 Materi

### GitHub Actions Concepts

- **Workflow** - Automated process (YAML file)
- **Event** - Trigger for workflow
- **Job** - Set of steps running on same runner
- **Step** - Individual task
- **Action** - Reusable unit of code

### Workflow Structure

```yaml
name: CI/CD Pipeline

on: [push, pull_request]  # Events

jobs:
  build:                   # Job name
    runs-on: ubuntu-latest # Runner
    steps:                 # Steps
      - uses: actions/checkout@v4  # Action
      - run: npm install           # Command
```

## 🔧 Tugas Praktikum

### Task: Complete GitHub Actions Workflow

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
      - name: Deploy to staging
        run: |
          echo "Deploying to staging..."
          # Add deployment commands

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # Add deployment commands
```

## 📤 Submission

```
📁 NIM_Nama_Pertemuan15/
├── 📁 .github/
│   └── 📁 workflows/
│       ├── ci.yml
│       └── cd.yml
├── 📄 Dockerfile
├── 📁 src/
├── 📁 screenshots/
│   ├── github-actions-run.png
│   └── deployment-success.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
