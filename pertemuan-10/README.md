# ⚙️ Pertemuan 10: Configuration Management - Ansible

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- Memahami configuration management
- Menggunakan Ansible untuk automation
- Menulis Ansible playbooks
- Mengelola inventories

## 📚 Materi

### Ansible Concepts

- **Inventory** - Daftar target hosts
- **Playbook** - YAML file dengan tasks
- **Tasks** - Individual actions
- **Roles** - Reusable configurations
- **Modules** - Pre-built functionality

### Ansible Architecture

```
┌─────────────────┐
│  Control Node   │
│   (Ansible)     │
└────────┬────────┘
         │ SSH
    ┌────┴────┐
    ↓    ↓    ↓
┌─────┐┌─────┐┌─────┐
│Host1││Host2││Host3│
└─────┘└─────┘└─────┘
  Managed Nodes
```

## 🔧 Tugas Praktikum

### Task 1: Inventory File

```ini
# inventory.ini
[webservers]
web1 ansible_host=192.168.1.10
web2 ansible_host=192.168.1.11

[databases]
db1 ansible_host=192.168.1.20

[all:vars]
ansible_user=admin
ansible_python_interpreter=/usr/bin/python3
```

### Task 2: Playbook

```yaml
# playbook.yml
---
- name: Configure Web Servers
  hosts: webservers
  become: yes
  
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Start nginx
      service:
        name: nginx
        state: started
        enabled: yes

    - name: Copy website files
      copy:
        src: ./website/
        dest: /var/www/html/
```

### Task 3: Run Playbook

```bash
# Check syntax
ansible-playbook playbook.yml --syntax-check

# Dry run
ansible-playbook playbook.yml --check

# Execute
ansible-playbook -i inventory.ini playbook.yml
```

## 📤 Submission

```
📁 NIM_Nama_Pertemuan10/
├── 📄 inventory.ini
├── 📄 playbook.yml
├── 📁 roles/
├── 📁 screenshots/
│   ├── ansible-run.png
│   └── configured-server.png
└── 📄 README.md
```

**Deadline:** Sebelum pertemuan berikutnya
