# Dokumen Teknis Modul 1 - Lingkungan Pengembangan, Git, dan Lalu Lintas HTTP

Nama/NIM: Andhika Abdu Raafi Wicaksono - 105224023
Repositori: https://github.com/dhikaabdu/Modul1-praktikumPemweb

## 1. Lingkungan Pengembangan
- Sistem operasi: Windows 11 Pro 25H2 (OS Build 26200.9445).
- Node.js: v26.7.0.
- npm: 11.9.0.
- Git: 2.55.0.windows.3.
- Visual Studio Code: 1.139.1 (user setup).
## 2. Alur Kerja Git

### 2.1 Riwayat Commit

Riwayat commit diperiksa menggunakan perintah:

```bash
git log --oneline --graph --allh 
* 5494d9a (HEAD -> main) Dokumen Teknis Modul 1

### 2.2 Pull Request

Tautan Pull Request yang telah digabungkan:

https://github.com/dhikaabdu/Modul1-praktikumPemweb/pull/1

Pull Request dibuat dari branch `docs/modul-01` dan berhasil digabungkan ke branch `main`.

### 2.3 Konflik yang Terjadi, Penyelesaian, dan Alasan Pemilihan Isi Akhir

Pada saat menjalankan `git add .`, folder `public` terdeteksi sebagai repository Git tersarang (embedded Git repository). Git memberikan peringatan bahwa repository di dalam folder `public` akan diperlakukan sebagai repository terpisah.

Masalah tersebut bukan merupakan merge conflict. Untuk menyelesaikannya, metadata Git di dalam folder `public` dihapus. Setelah itu, `public` dikeluarkan dari staging area menggunakan `git rm --cached -f public` dan ditambahkan kembali menggunakan `git add public`.

Setelah dilakukan pengecekan dengan `git status`, file-file di dalam folder `public` sudah tercatat satu per satu sebagai bagian dari repository utama, seperti `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, dan `public/window.svg`.

Isi akhir tersebut dipilih karena folder `public` merupakan bagian dari project utama sehingga file-file di dalamnya perlu dikelola oleh repository utama, bukan sebagai repository Git terpisah.

## 3. Pengamatan Lalu Lintas HTTP

### 3.1 Pengamatan dengan DevTools Network

Pengamatan dilakukan menggunakan Chrome DevTools pada halaman:

```text
http://localhost:3000
```

Pada kondisi pertama, opsi **Disable cache** tidak diaktifkan. Setelah halaman dimuat ulang, DevTools Network menunjukkan:

| Parameter | Hasil |
|---|---:|
| Jumlah request | 20 requests |
| Data transferred | 24.9 kB |
| Resources | 3.9 MB |
| Finish | 487 ms |

Beberapa resource pada kondisi ini memiliki status **304**, yang menunjukkan bahwa browser melakukan validasi terhadap resource yang sudah tersedia pada cache.

**Bukti:** Screenshot DevTools Network dengan cache normal.

Pada kondisi kedua, opsi **Disable cache** diaktifkan kemudian halaman dimuat ulang. Hasil pengamatan:

| Parameter | Hasil |
|---|---:|
| Jumlah request | 21 requests |
| Data transferred | 882 kB |
| Resources | 4.0 MB |
| Finish | 488 ms |

Pada kondisi ini, resource yang dimuat kembali menunjukkan status **200**, sehingga browser mengambil resource kembali dari server.

**Bukti:** Screenshot DevTools Network dengan opsi Disable cache aktif.

### 3.2 Perbandingan Cache

Hasil pengamatan menunjukkan perbedaan yang cukup besar pada jumlah data yang ditransfer.

| Kondisi | Requests | Transferred | Resources | Finish |
|---|---:|---:|---:|---:|
| Cache normal | 20 | 24.9 kB | 3.9 MB | 487 ms |
| Disable cache | 21 | 882 kB | 4.0 MB | 488 ms |

Pada kondisi cache normal, data yang ditransfer hanya sekitar **24.9 kB** karena browser dapat memanfaatkan resource yang sudah tersedia pada cache dan melakukan validasi terhadap resource tertentu.

Ketika **Disable cache** diaktifkan, browser tidak menggunakan cache untuk resource tersebut sehingga data yang harus ditransfer dari server meningkat menjadi sekitar **882 kB**. Perbedaan ini menunjukkan bahwa cache dapat mengurangi jumlah data yang perlu ditransfer ketika halaman dimuat kembali.

Waktu penyelesaian pada kedua pengujian relatif sama, yaitu **487 ms** pada kondisi cache normal dan **488 ms** ketika cache dinonaktifkan. Oleh karena itu, pada pengujian ini perbedaan paling terlihat terdapat pada jumlah data yang ditransfer.

### 3.3 Pengujian `curl -I`

Perintah yang digunakan:

```powershell
curl.exe -I http://localhost:3000
```

Hasil:

```text
HTTP/1.1 200 OK
Cache-Control: no-cache, must-revalidate
X-Powered-By: Next.js
Content-Type: text/html; charset=utf-8
Connection: keep-alive
```

Status **200 OK** menunjukkan bahwa request berhasil diproses oleh server.

Perintah `curl -I` digunakan untuk melakukan request dengan metode **HEAD**. Metode HEAD digunakan untuk memperoleh informasi header HTTP tanpa mengambil body dari response. Oleh karena itu, hasil pengujian menampilkan informasi seperti status, content type, cache control, dan header lainnya tanpa menampilkan isi halaman HTML.

### 3.4 Pengujian `curl -v` pada Localhost

Perintah yang digunakan:

```powershell
curl.exe -v http://localhost:3000
```

Hasil pengamatan menunjukkan:

```text
* Host localhost:3000 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.21.0
< HTTP/1.1 200 OK
< Cache-Control: no-cache, must-revalidate
< X-Powered-By: Next.js
< Content-Type: text/html; charset=utf-8
< Transfer-Encoding: chunked
```

Request menggunakan metode **GET** terhadap path `/`. Server memberikan response **HTTP/1.1 200 OK**, yang menunjukkan bahwa halaman berhasil diberikan kepada client.

Header `X-Powered-By: Next.js` menunjukkan bahwa response berasal dari aplikasi yang berjalan menggunakan Next.js. Response juga menggunakan `Transfer-Encoding: chunked`.

### 3.5 Pengujian Redirect HTTP ke HTTPS

Perintah yang digunakan:

```powershell
curl.exe -v http://github.com
```

Hasil pengamatan:

```text
> GET / HTTP/1.1
> Host: github.com
< HTTP/1.1 301 Moved Permanently
< Content-Length: 0
< Location: https://github.com/
```

Response yang diterima adalah **301 Moved Permanently**. Header `Location` menunjukkan bahwa alamat:

```text
http://github.com
```

diarahkan ke:

```text
https://github.com/
```

Redirect tersebut terjadi karena server memberikan alamat tujuan baru melalui header `Location`. Dengan demikian, client yang mengakses alamat HTTP tersebut diarahkan untuk menggunakan HTTPS.

### 3.6 Kesimpulan Pengamatan HTTP

Berdasarkan pengujian yang dilakukan, aplikasi pada `localhost:3000` berhasil memberikan response **HTTP 200 OK** baik melalui browser maupun `curl`. Pengujian DevTools menunjukkan bahwa penggunaan cache dapat mengurangi jumlah data yang perlu ditransfer ketika halaman dimuat kembali. Pengujian `curl -I` menunjukkan penggunaan metode HEAD untuk memperoleh header tanpa body, sedangkan `curl -v` memberikan informasi detail mengenai proses request dan response. Pengujian terhadap `http://github.com` menunjukkan response **301 Moved Permanently** dengan tujuan `https://github.com/`, sehingga terlihat proses pengalihan dari HTTP ke HTTPS.

## 4. Kendala dan Penyelesaian

Selama pelaksanaan Modul 1, terdapat beberapa kendala yang ditemukan.

### 4.1 Repository Git Tersarang pada Folder `public`

Pada saat menjalankan `git add .`, folder `public` terdeteksi sebagai embedded Git repository. Hal tersebut menyebabkan folder `public` tidak langsung tercatat sebagai folder biasa pada repository utama.

Penyelesaian dilakukan dengan menghapus metadata Git yang terdapat di dalam folder `public`, kemudian mengeluarkan folder tersebut dari staging area dan menambahkannya kembali sebagai bagian dari repository utama.

Perintah yang digunakan:

```powershell
Remove-Item -Recurse -Force public\.git
git rm --cached -f public
git add public
```

Setelah dilakukan pengecekan menggunakan `git status`, file-file di dalam folder `public` sudah tercatat sebagai file pada repository utama.

### 4.2 Pengujian Lalu Lintas HTTP

Pengamatan lalu lintas HTTP dilakukan menggunakan Chrome DevTools dan `curl`. Pada awal pengujian, terminal yang menjalankan `npm run dev` harus tetap aktif agar aplikasi dapat diakses melalui `http://localhost:3000`.

Pengujian kemudian dilakukan menggunakan terminal terpisah untuk menjalankan perintah `curl.exe -I` dan `curl.exe -v`.

### 4.3 Pengamatan Cache

Untuk membandingkan penggunaan cache, pengujian dilakukan dalam dua kondisi, yaitu cache normal dan cache dinonaktifkan melalui opsi **Disable cache** pada Chrome DevTools.

Hasil pengamatan menunjukkan bahwa jumlah data yang ditransfer berbeda antara kedua kondisi tersebut. Data yang ditransfer lebih besar ketika cache dinonaktifkan karena browser harus mengambil kembali resource dari server.

## 5. Catatan Pemanfaatan AI

AI yang digunakan: ChatGPT.

Pemanfaatan AI dilakukan sebagai bantuan dalam memahami langkah pengerjaan Modul 1, menyusun dokumentasi teknis, serta membantu menjelaskan hasil pengujian.

### Bantuan yang Digunakan

1. Membantu memahami alur penggunaan Git, branch, commit, push, dan Pull Request.
2. Membantu menjelaskan perintah pengujian HTTP menggunakan `curl`.
3. Membantu memahami perbedaan penggunaan `curl -I` dan `curl -v`.
4. Membantu menganalisis hasil pengamatan HTTP pada Chrome DevTools, khususnya perbandingan penggunaan cache.
5. Membantu menyusun dan merapikan dokumentasi teknis dalam format Markdown.

### Perintah yang Digunakan

Perintah yang digunakan dalam pengujian antara lain:

```powershell
npm run dev
curl.exe -I http://localhost:3000
curl.exe -v http://localhost:3000
curl.exe -v http://github.com
```

### Verifikasi

Seluruh hasil teknis yang dicantumkan dalam dokumen diverifikasi menggunakan lingkungan pengembangan lokal. Aplikasi dijalankan melalui `http://localhost:3000`, hasil request diperiksa melalui Chrome DevTools Network, dan response HTTP diverifikasi menggunakan `curl.exe`.

Hasil pengujian menunjukkan bahwa aplikasi lokal memberikan response `HTTP/1.1 200 OK`, sedangkan pengujian `http://github.com` menghasilkan `301 Moved Permanently` dengan tujuan `https://github.com/`.