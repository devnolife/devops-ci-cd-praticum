# 🏗️ Pertemuan 09: Infrastructure as Code - Terraform

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami konsep Infrastructure as Code
- Menggunakan Terraform untuk provisioning
- Menulis Terraform configurations
- Mengelola Terraform state

## 📚 Materi

### IaC Benefits

- **Reproducibility** - Konsisten di semua environment
- **Version Control** - Track changes
- **Automation** - Reduce manual work
- **Documentation** - Code sebagai dokumentasi

### Terraform Workflow

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Write  │ → │  Plan   │ → │  Apply  │ → │ Destroy │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
   .tf file     Preview       Execute       Cleanup
```

## 🔧 Tugas Praktikum

### Task: Terraform Configuration

```hcl
# main.tf
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "nginx" {
  name = "nginx:latest"
}

resource "docker_container" "web" {
  name  = "web-server"
  image = docker_image.nginx.image_id
  
  ports {
    internal = 80
    external = 8080
  }
}

output "container_id" {
  value = docker_container.web.id
}
```

### Commands

```bash
# Initialize
terraform init

# Preview changes
terraform plan

# Apply changes
terraform apply

# Destroy resources
terraform destroy
```

## 📤 Submission

```
📁 NIM_Nama_Pertemuan09/
├── 📄 main.tf
├── 📄 variables.tf
├── 📄 outputs.tf
├── 📁 screenshots/
│   ├── terraform-plan.png
│   └── terraform-apply.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
