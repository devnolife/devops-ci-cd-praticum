# 🔄 Pertemuan 12: Blue-Green & Canary Deployment

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami advanced deployment strategies
- Mengimplementasikan Blue-Green deployment
- Mengimplementasikan Canary deployment
- Melakukan rollback dengan aman

## 📚 Materi

### Blue-Green Deployment

```
                    Load Balancer
                         │
            ┌────────────┴────────────┐
            ↓                         ↓
    ┌───────────────┐         ┌───────────────┐
    │  Blue (v1)    │         │  Green (v2)   │
    │   ACTIVE      │         │   STANDBY     │
    └───────────────┘         └───────────────┘
    
    Switch traffic instantly between environments
```

### Canary Deployment

```
                    Load Balancer
                         │
        ┌────────────────┴────────────────┐
        │ 90%                         10% │
        ↓                                 ↓
┌───────────────┐                 ┌───────────────┐
│   Stable v1   │                 │  Canary v2    │
│   (majority)  │                 │   (testing)   │
└───────────────┘                 └───────────────┘

Gradually shift traffic to new version
```

## 🔧 Tugas Praktikum

### Task 1: Blue-Green dengan Docker Compose

```yaml
# docker-compose.blue-green.yml
version: '3.8'

services:
  blue:
    image: myapp:v1
    ports:
      - "8081:80"
  
  green:
    image: myapp:v2
    ports:
      - "8082:80"
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

### Task 2: Traffic Switching Script

```bash
#!/bin/bash
# switch-traffic.sh

ACTIVE=$1  # blue or green

if [ "$ACTIVE" == "blue" ]; then
    sed -i 's/green:80/blue:80/g' nginx.conf
else
    sed -i 's/blue:80/green:80/g' nginx.conf
fi

docker-compose exec nginx nginx -s reload
echo "Traffic switched to $ACTIVE"
```

### Task 3: Canary Deployment

Implement gradual traffic shift: 10% → 25% → 50% → 100%

## 📤 Submission

```
📁 NIM_Nama_Pertemuan12/
├── 📄 docker-compose.blue-green.yml
├── 📄 docker-compose.canary.yml
├── 📄 nginx.conf
├── 📄 switch-traffic.sh
├── 📁 screenshots/
│   ├── blue-green-switch.png
│   └── canary-rollout.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
