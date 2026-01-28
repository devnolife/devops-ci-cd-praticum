# 🔐 Pertemuan 14: Security in CI/CD - DevSecOps

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami konsep DevSecOps
- Mengintegrasikan security scanning dalam pipeline
- Melakukan vulnerability scanning
- Menerapkan best practices keamanan

## 📚 Materi

### DevSecOps - Shift Left Security

```
Traditional:    Dev → Test → Security → Deploy
                                 ↑
                            (Late, Expensive)

DevSecOps:      Dev+Sec → Test+Sec → Deploy+Sec
                    ↑         ↑          ↑
               (Early, Continuous, Automated)
```

### Security Tools Integration

| Stage | Tools |
|-------|-------|
| Code | SonarQube, Snyk, Semgrep |
| Dependencies | OWASP Dependency Check, npm audit |
| Container | Trivy, Clair, Anchore |
| Infrastructure | Checkov, tfsec |
| Runtime | Falco, OWASP ZAP |

## 🔧 Tugas Praktikum

### Task 1: Add Security Scanning to Pipeline

```groovy
pipeline {
    agent any
    
    stages {
        stage('SAST - Code Analysis') {
            steps {
                sh 'sonar-scanner'
            }
        }
        
        stage('Dependency Check') {
            steps {
                sh 'npm audit --json > audit-report.json'
            }
        }
        
        stage('Container Scan') {
            steps {
                sh 'trivy image myapp:latest --format json > trivy-report.json'
            }
        }
        
        stage('Build') {
            when {
                expression { 
                    // Only build if no critical vulnerabilities
                    return !fileExists('CRITICAL_VULN')
                }
            }
            steps {
                sh 'docker build -t myapp .'
            }
        }
    }
}
```

### Task 2: Container Scanning dengan Trivy

```bash
# Scan image
trivy image --severity HIGH,CRITICAL myapp:latest

# Scan filesystem
trivy fs --security-checks vuln,config ./

# Scan IaC
trivy config ./terraform/
```

### Task 3: Secret Detection

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
```

## 📤 Submission

```
📁 NIM_Nama_Pertemuan14/
├── 📄 Jenkinsfile
├── 📄 sonar-project.properties
├── 📄 .pre-commit-config.yaml
├── 📁 security-reports/
│   ├── sast-report.json
│   ├── dependency-report.json
│   └── container-scan.json
├── 📁 screenshots/
│   ├── security-pipeline.png
│   └── trivy-results.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
