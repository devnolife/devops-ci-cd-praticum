# 📊 Pertemuan 13: Monitoring & Alerting in DevOps

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami observability dalam DevOps
- Setup monitoring stack (Prometheus + Grafana)
- Mengkonfigurasi alerting
- Membuat dashboards

## 📚 Materi

### Observability Pillars

```
        ┌─────────────────────────────────────┐
        │           OBSERVABILITY             │
        ├─────────────────────────────────────┤
        │                                     │
        │   📊 Metrics    📝 Logs    🔍 Traces │
        │   (Prometheus)  (ELK)    (Jaeger)   │
        │                                     │
        └─────────────────────────────────────┘
```

### Monitoring Stack

- **Prometheus** - Metrics collection
- **Grafana** - Visualization
- **AlertManager** - Alerting
- **Node Exporter** - System metrics

## 🔧 Tugas Praktikum

### Task 1: Setup Monitoring Stack

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
  
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
  
  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"
```

### Task 2: Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']
  
  - job_name: 'application'
    static_configs:
      - targets: ['app:8080']
```

### Task 3: Create Grafana Dashboard

1. Add Prometheus data source
2. Create dashboard
3. Add panels (CPU, Memory, HTTP requests)
4. Configure alerts

## 📤 Submission

```
📁 NIM_Nama_Pertemuan13/
├── 📄 docker-compose.monitoring.yml
├── 📄 prometheus.yml
├── 📄 alertmanager.yml
├── 📁 grafana-dashboards/
│   └── dashboard.json
├── 📁 screenshots/
│   ├── grafana-dashboard.png
│   └── prometheus-targets.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
