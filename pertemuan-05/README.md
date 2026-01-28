# 🧪 Pertemuan 05: Building CI Pipeline - Automated Testing

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Mengintegrasikan automated testing dalam CI pipeline
- Menulis unit tests dan integration tests
- Mengkonfigurasi test reports di Jenkins
- Memahami test coverage

## 📚 Materi

### Testing Pyramid

```
        ╱╲
       ╱  ╲     E2E Tests (Few)
      ╱────╲
     ╱      ╲   Integration Tests (Some)
    ╱────────╲
   ╱          ╲ Unit Tests (Many)
  ╱────────────╲
```

### Types of Tests

1. **Unit Tests** - Test individual components
2. **Integration Tests** - Test component interactions
3. **End-to-End Tests** - Test entire workflow
4. **Smoke Tests** - Basic functionality check

## 🔧 Tugas Praktikum

### Task 1: Create Test Suite

```python
# test_calculator.py
import pytest

def test_addition():
    assert 2 + 2 == 4

def test_subtraction():
    assert 5 - 3 == 2
```

### Task 2: Jenkinsfile dengan Testing

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'pytest --junitxml=results.xml'
            }
            post {
                always {
                    junit 'results.xml'
                }
            }
        }
    }
}
```

### Task 3: Code Coverage

1. Add coverage plugin
2. Generate coverage report
3. Set coverage thresholds

## 📤 Submission

```
📁 NIM_Nama_Pertemuan05/
├── 📄 Jenkinsfile
├── 📁 tests/
│   ├── test_unit.py
│   └── test_integration.py
├── 📁 screenshots/
│   ├── test-results.png
│   └── coverage-report.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
