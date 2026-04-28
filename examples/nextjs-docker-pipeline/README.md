# Pipeline CI/CD untuk Next.js Docker App

Folder ini berisi contoh pipeline untuk aplikasi:

```text
semester 5\cloud-native-practicum\examples\nextjs-docker-app
```

Tujuannya agar materi DevOps tidak berhenti pada konsep pipeline, tetapi memakai aplikasi nyata yang bisa di-test, di-build, dijadikan Docker image, lalu dicek lewat smoke test.

## Alur pipeline

```text
Checkout -> npm ci -> npm test -> npm run build -> docker build -> smoke test /api/health
```

| Stage | Yang dibuktikan |
|-------|------------------|
| Install | Dependency bisa dipulihkan dari `package-lock.json` |
| Test | Logic health payload valid |
| Build | Next.js production build berhasil |
| Docker build | Aplikasi bisa dikemas menjadi image |
| Smoke test | Container responsif lewat `/api/health` |

## Jenkins

Gunakan `Jenkinsfile` di folder ini sebagai contoh scripted hands-on. Jika Jenkinsfile diletakkan di root repository, path `APP_DIR` sudah mengarah ke app Next.js.

Command inti yang dijalankan dari root repository:

```groovy
dir(env.APP_DIR) {
    sh 'npm ci'
    sh 'npm test'
    sh 'npm run build'
    sh "docker build -t ${env.IMAGE_NAME}:${env.BUILD_NUMBER} ."
}
```

Jika repository Anda langsung dimulai dari folder `semester 5`, ubah `APP_DIR` menjadi `cloud-native-practicum/examples/nextjs-docker-app`.

## GitHub Actions

File `github-actions-nextjs-docker.yml` adalah contoh workflow. Untuk dipakai langsung di GitHub, salin file itu ke:

```text
.github\workflows\nextjs-docker.yml
```

Workflow tersebut akan menjalankan test, build Next.js, build Docker image, dan smoke test container pada setiap push atau pull request.

## Demo yang disarankan

1. Buka app Next.js secara lokal agar mahasiswa melihat fitur yang akan masuk Docker.
2. Jalankan `npm test` untuk menghubungkan automated testing dengan pipeline.
3. Tunjukkan `Dockerfile` lalu build image.
4. Jalankan pipeline dan tunjukkan stage mana yang gagal jika test atau health check rusak.
5. Tekankan bahwa CI/CD mengotomatisasi proses yang sudah bisa dilakukan manual.
