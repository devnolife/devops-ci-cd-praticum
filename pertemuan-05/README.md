# 🧪 Pertemuan 05: Building CI Pipeline — Automated Testing Next.js

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Mengintegrasikan automated testing dalam CI pipeline
- Menulis unit tests dan integration tests untuk Next.js
- Mengkonfigurasi test reports di Jenkins
- Memahami test coverage dan test-driven quality gates

## 📚 Materi

### Testing Pyramid

```
        ╱╲
       ╱  ╲     E2E Tests (Few) — Browser/Playwright
      ╱────╲
     ╱      ╲   Integration Tests (Some) — API endpoint
    ╱────────╲
   ╱          ╲ Unit Tests (Many) — Functions & modules
  ╱────────────╲
```

### Types of Tests

| Tipe | Apa yang Ditest | Contoh di Next.js App |
|------|----------------|----------------------|
| **Unit Test** | Fungsi individual | `getHealthPayload()` di `lib/health.mjs` |
| **Integration Test** | Interaksi antar modul | API route `/api/health` memanggil `getHealthPayload()` |
| **Smoke Test** | Aplikasi bisa start | `curl /api/health` setelah container running |
| **E2E Test** | Alur lengkap user | Browser buka homepage, klik link, cek content |

### Node.js Built-in Test Runner

Next.js app kita menggunakan **Node.js built-in test runner** (bukan Jest/Mocha) — tidak perlu dependency tambahan:

```bash
# Menjalankan semua test
npm test

# Sama dengan:
node --test tests/
```

---

## 🔎 Test yang Sudah Ada

File `tests/health.test.mjs` di project Next.js:

```js
import assert from "node:assert/strict";
import test from "node:test";

import { getHealthPayload } from "../lib/health.mjs";

test("health payload exposes runtime information", () => {
  const payload = getHealthPayload({
    now: new Date("2026-01-01T00:00:00.000Z"),
    uptime: 12.4,
    env: {
      APP_ENV: "test",
      APP_VERSION: "9.9.9",
      NEXT_PUBLIC_APP_MESSAGE: "Hello from tests"
    }
  });

  assert.deepEqual(payload, {
    status: "ok",
    service: "nextjs-docker-app",
    version: "9.9.9",
    environment: "test",
    message: "Hello from tests",
    uptimeSeconds: 12,
    timestamp: "2026-01-01T00:00:00.000Z"
  });
});
```

Test ini memvalidasi bahwa fungsi `getHealthPayload()`:
- Mengembalikan `status: "ok"`
- Membaca environment variables dengan benar
- Membulatkan uptime ke bilangan bulat
- Menghasilkan timestamp ISO 8601

---

## 🔧 Tugas Praktikum

Gunakan aplikasi Next.js:
```
..\..\cloud-native-practicum\examples\nextjs-docker-app
```

### Task 1: Tulis Test Tambahan

Buat file baru `tests/teachingData.test.mjs`:

```js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  featureCards,
  teachingMetrics,
  runtimeChecks,
  deploymentSteps
} from '../lib/teachingData.js';

describe('teachingMetrics', () => {
  it('has at least one metric', () => {
    assert.ok(teachingMetrics.length > 0);
  });

  it('each metric has value and label', () => {
    for (const m of teachingMetrics) {
      assert.ok(m.value, `metric missing value: ${JSON.stringify(m)}`);
      assert.ok(m.label, `metric missing label: ${JSON.stringify(m)}`);
    }
  });
});

describe('featureCards', () => {
  it('has at least one card', () => {
    assert.ok(featureCards.length > 0);
  });

  it('each card has icon, title, and description', () => {
    for (const card of featureCards) {
      assert.ok(card.icon);
      assert.ok(card.title);
      assert.ok(card.description);
    }
  });
});

describe('runtimeChecks', () => {
  it('is a non-empty array of strings', () => {
    assert.ok(Array.isArray(runtimeChecks));
    assert.ok(runtimeChecks.length > 0);
    for (const check of runtimeChecks) {
      assert.equal(typeof check, 'string');
    }
  });
});

describe('deploymentSteps', () => {
  it('each step has number, title, description, and command', () => {
    for (const step of deploymentSteps) {
      assert.ok(step.number);
      assert.ok(step.title);
      assert.ok(step.description);
      assert.ok(step.command);
    }
  });

  it('steps are in correct order', () => {
    const numbers = deploymentSteps.map(s => s.number);
    assert.deepEqual(numbers, ['1', '2', '3', '4']);
  });
});
```

Jalankan untuk memastikan semua pass:

```bash
npm test
# ✅ tests/health.test.mjs
# ✅ tests/teachingData.test.mjs
```

### Task 2: Jenkinsfile dengan Test Stage dan Archived Results

Buat `Jenkinsfile` yang menjalankan test dan menyimpan hasilnya:

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
            echo '✅ All tests passed and build succeeded!'
        }
        failure {
            echo '❌ Pipeline failed! Check test-results.txt for details.'
        }
    }
}
```

### Apa yang Terjadi di Pipeline

```
┌──────────┐    ┌──────────────────────────┐    ┌──────────┐
│  Install │ →  │  Test                    │ →  │  Build   │
│  npm ci  │    │  npm test                │    │ npm build│
│          │    │  ↳ output → test-results │    │          │
│          │    │  ↳ archived as artifact  │    │          │
└──────────┘    └──────────────────────────┘    └──────────┘
```

**Mengapa archive test results?**
- Bisa dilihat di Jenkins UI kapan saja
- Berguna untuk debugging jika build gagal
- History test results untuk tracking kualitas

### Task 3: (Bonus) Tambahkan Lint Stage

Tambahkan stage linting sebelum test untuk menangkap masalah code style lebih awal:

```groovy
stage('Lint') {
    steps {
        dir('cloud-native-practicum/examples/nextjs-docker-app') {
            sh 'npx next lint || echo "Linting completed with warnings"'
        }
    }
}
```

> **Testing di Dockerfile:** Perhatikan bahwa `Dockerfile` project kita juga menjalankan `npm run test && npm run build` pada stage builder. Ini berarti test berjalan **dua kali** — pertama di CI pipeline (fast feedback), kedua di Docker build (memastikan image hanya dibuat dari code yang tested). Ini adalah best practice: **fail fast, fail early**.

---

## 📤 Submission

```
📁 NIM_Nama_Pertemuan05/
├── 📄 Jenkinsfile
├── 📁 tests/
│   ├── health.test.mjs (existing)
│   └── teachingData.test.mjs (baru)
├── 📁 screenshots/
│   ├── npm-test-all-pass.png
│   ├── jenkins-test-stage.png
│   ├── test-results-artifact.png
│   └── pipeline-success.png
└── 📄 README.md (Laporan)
```

**Deadline:** Sebelum pertemuan berikutnya
