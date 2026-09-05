# Panduan Migrasi & Integrasi Components — Platform E-Learning "Buleleng ASN 4U"

---

## 1. Ringkasan Pemahaman Dokumen

### 1.1 PRD E-Learning BKPSDM v0.3 (Revisi 3)

Platform **"Buleleng ASN 4U"** (Buleleng ASN CORPU) adalah sistem e-learning berbasis web untuk **ASN aktif** di lingkungan Pemkab Buleleng (~15.000 pengguna). Stack teknis yang disepakati:

| Layer | Teknologi |
| --- | --- |
| Backend | **Laravel 13 + MySQL** |
| Frontend | **React (Vite)** |
| Styling | **Tailwind CSS v4** |
| Icons | **lucide-react** |

**Peran pengguna (3 role):**
- **Admin BKPSDM** — Super admin, kelola master data, validasi konten, monitoring, ekspor Excel
- **Admin Komunitas** — Kelola kurikulum, modul, kuis, post test, input JP
- **Peserta (ASN)** — Login NIP (semi-SSO), belajar, kuis, post test, unduh sertifikat

**Fitur utama MVP:**
- Landing page dengan akses masuk berbasis NIP
- Katalog pembelajaran terfilter otomatis berdasarkan **rumpun jabatan** (JPT/JA/JF/Pelaksana)
- Struktur modul wajib 3 unsur: Gambaran Umum, Substansi Materi, Evaluasi
- Video wajib embed link (YouTube dll.), tidak upload file video
- Kuis per modul & post test — **maks 3 percobaan**, randomize soal, tampilkan kunci setelah gagal
- Konversi JP otomatis: `total durasi menit ÷ 135`, maks 3 JP per modul
- Approval konten **1 tahap, ringan** (ringkasan materi + surat pernyataan keabsahan)
- Sertifikat elektronik otomatis + sinkronisasi ke SIMPEG
- Dashboard Personal Peserta + Pusat Bantuan (FAQ & tiket)
- Passing grade & bobot penilaian **kustom per pembelajaran**
- Tampilan responsif mobile

### 1.2 Struktur Database E-Learning v3

Database terdiri dari **22 tabel** dengan relasi sebagai berikut:

```
PENGGUNA ──1:N──> KOMUNITAS (pembuat)
PENGGUNA <──N:M──> KOMUNITAS (via ADMIN_KOMUNITAS)
KOMUNITAS ──1:N──> PEMBELAJARAN
PEMBELAJARAN ──1:1──> PEMBELAJARAN_JP
PEMBELAJARAN ──1:N──> MODUL
PEMBELAJARAN ──1:1──> POST_TEST
PEMBELAJARAN ──1:N──> PENDAFTARAN_PEMBELAJARAN
PEMBELAJARAN ──1:N──> VALIDASI_PEMBELAJARAN
MODUL ──1:N──> MATERI
MODUL ──1:1──> KUIS
KUIS ──1:N──> SOAL_KUIS
KUIS ──1:N──> RIWAYAT_KUIS
POST_TEST ──1:N──> SOAL_POST_TEST
POST_TEST ──1:N──> RIWAYAT_POST_TEST
PENDAFTARAN_PEMBELAJARAN ──1:1──> SERTIFIKAT
PENDAFTARAN_PEMBELAJARAN ──1:1──> ULASAN_PEMBELAJARAN
PENDAFTARAN_PEMBELAJARAN ──1:N──> PROGRES_MODUL
PENDAFTARAN_PEMBELAJARAN ──1:N──> PROGRES_MATERI
PENGGUNA ──1:N──> HELP_TIKET
PENGGUNA ──1:N──> FAQ
```

**Tabel kunci:**

| # | Tabel | Keterangan |
| --- | --- | --- |
| 1 | PENGGUNA | User dengan field `rumpun_jabatan`, `sub_bidang_jf` |
| 2 | KOMUNITAS | Dipetakan ke 1 rumpun jabatan |
| 3 | ADMIN_KOMUNITAS | Relasi N:M PENGGUNA-KOMUNITAS |
| 4 | PEMBELAJARAN | Program pelatihan dengan CP, ringkasan materi |
| 5 | PEMBELAJARAN_JP | Hitung JP otomatis (durasi ÷ 135, maks 3/modul) |
| 6 | VALIDASI_PEMBELAJARAN | Histori approval 1 tahap |
| 7 | MODUL | 3 unsur wajib (gambaran_umum, substansi via MATERI, evaluasi_deskripsi) |
| 8 | MATERI | Tipe: pdf / video_embed |
| 9 | KUIS | 1 modul = 1 kuis, maks 3 percobaan |
| 10 | SOAL_KUIS | Bank soal dengan `bobot_nilai` kustom |
| 11 | RIWAYAT_KUIS | Percobaan peserta, `CHECK(percobaan_ke ≤ 3)` |
| 12 | POST_TEST | 1 pembelajaran = 1 post test |
| 13 | SOAL_POST_TEST | Bank soal post test |
| 14 | RIWAYAT_POST_TEST | Percobaan peserta |
| 15 | PENDAFTARAN_PEMBELAJARAN | Enrollment, validasi rumpun jabatan |
| 16 | PROGRES_MODUL | Status per modul per peserta |
| 17 | PROGRES_MATERI | Status per materi per peserta |
| 18 | SERTIFIKAT | Snapshot identitas + sync status SIMPEG/SIASN |
| 19 | ULASAN_PEMBELAJARAN | Rating 1-5 + teks ulasan |
| 20 | ULASAN_SISTEM | Rating kepuasan umum |
| 21 | HELP_TIKET | Tiket keluhan/bantuan |
| 22 | FAQ | Pertanyaan umum |

---

## 2. Struktur Source Code Saat Ini

```
Test-BKPSDM/
├── backend/                          # (akan dipindahkan / sudah ada)
├── dist/
├── public/
├── src/
│   ├── assets/
│   │   ├── logo-removebg-preview 1.png
│   │   ├── Hiasan.png
│   │   └── Sertifikat.png
│   ├── components/
│   │   ├── LandingPage.jsx           # Halaman awal + NIP login
│   │   ├── UserDashboard.jsx         # Dashboard personal peserta
│   │   ├── CourseCatalog.jsx         # Katalog pelatihan (filter kategori)
│   │   ├── CourseDetail.jsx          # Detail modul + materi + video embed
│   │   ├── MyCourses.jsx             # Pelatihanku (in-progress + completed)
│   │   ├── Community.jsx             # Komunitas belajar
│   │   ├── PostTest.jsx              # Halaman pengerjaan post test
│   │   ├── TestResult.jsx            # Hasil post test + sertifikat + ulasan
│   │   ├── Certificates.jsx          # Daftar & unduh sertifikat
│   │   ├── HelpCenter.jsx            # FAQ + formulir keluhan
│   │   ├── ProfileDropdown.jsx       # Dropdown profil (ganti foto, password)
│   │   └── LoadingSkeleton.jsx       # Loading spinner transisi
│   ├── App.jsx                       # Router SPA manual (state-based)
│   ├── main.jsx                      # Entry point React
│   └── index.css                     # Tailwind CSS import
├── index.html
├── package.json                      # React 19, Vite 8, Tailwind 4
├── vite.config.js
├── eslint.config.js
├── .gitignore
└── README.md
```

---

## 3. Komponen yang Dipindahkan — Detail & Mapping ke Database

### 3.1 LandingPage.jsx
- **Fungsi:** Halaman awal publik, hero section, kategori pelatihan populer, "Cara Kerja", footer
- **Database:** Tidak ada koneksi langsung — static content
- **Navigasi:** `onNavigate('community')`, `onNavigate('catalog')`, `onNavigate('help-center')`, `onLogin()` → dashboard

### 3.2 UserDashboard.jsx
- **Fungsi:** Dashboard personal peserta — statistik (Pelatihan Aktif, Selesai, Total JPL, Sertifikat), kursus saat ini dengan progress bar, aktivitas terakhir, rekomendasi pelatihan
- **Database:** `PENDAFTARAN_PEMBELAJARAN` (progres), `SERTIFIKAT` (jumlah sertifikat), `PEMBELAJARAN` (kursus aktif)
- **Props:** `onLogout()`, `onNavigate()`

### 3.3 CourseCatalog.jsx
- **Fungsi:** Katalog pelatihan dengan sidebar filter (kategori + tingkat kesulitan), kartu kursus, pagination
- **Database:** `PEMBELAJARAN`, `KOMUNITAS` (kategori), `PENDAFTARAN_PEMBELAJARAN` (status enroll)
- **Props:** `onNavigate()`

### 3.4 CourseDetail.jsx
- **Fungsi:** Detail modul — sidebar silabus dengan status (completed/active/locked), video embed player, deskripsi materi, unduh materi pendukung (PDF/XLS)
- **Database:** `MODUL`, `MATERI`, `PEMBELAJARAN`
- **Props:** `onNavigate()`, `onBack()`

### 3.5 MyCourses.jsx
- **Fungsi:** Daftar pelatihan peserta — tab "Sedang Berjalan" & "Selesai", kartu dengan progress bar
- **Database:** `PENDAFTARAN_PEMBELAJARAN`, `PEMBELAJARAN`, `MODUL` (modul count)
- **Props:** `onNavigate()`

### 3.6 Community.jsx
- **Fungsi:** Daftar komunitas belajar — sidebar filter kategori, kartu anggota & jumlah pelatihan, tombol gabung
- **Database:** `KOMUNITAS` (dengan `rumpun_jabatan`), `ADMIN_KOMUNITAS`
- **Props:** `onNavigate()`

### 3.7 PostTest.jsx
- **Fungsi:** Halaman pengerjaan post test — timer countdown, navigasi soal, soal pilihan ganda, flag ragu-ragu, submit
- **Database:** `POST_TEST`, `SOAL_POST_TEST`, `RIWAYAT_POST_TEST`
- **Props:** `onNavigate()`, `onBack()`
- **Catatan:** Saat ini hardcoded 20 soal — perlu dihubungkan ke API

### 3.8 TestResult.jsx
- **Fungsi:** Hasil post test — pratinjau sertifikat, ringkasan nilai, formulir rating & ulasan
- **Database:** `RIWAYAT_POST_TEST`, `SERTIFIKAT`, `ULASAN_PEMBELAJARAN`
- **Props:** `onNavigate()`

### 3.9 Certificates.jsx
- **Fungsi:** Daftar & unduh sertifikat — kartu sertifikat dengan info tanggal, institution, unduh PDF
- **Database:** `SERTIFIKAT` (dengan snapshot identitas, `simpeg_sync_status`)
- **Props:** `onNavigate()`

### 3.10 HelpCenter.jsx
- **Fungsi:** Pusat bantuan — kategori bantuan, FAQ accordion, formulir keluhan dengan rating
- **Database:** `FAQ`, `HELP_TIKET`, `ULASAN_SISTEM`
- **Props:** `onNavigate()`

### 3.11 ProfileDropdown.jsx
- **Fungsi:** Dropdown menu profil — ganti foto, ubah password, logout
- **Database:** `PENGGUNA` (foto profil, password hash)
- **Props:** `onLogout()`

### 3.12 LoadingSkeleton.jsx
- **Fungsi:** Loading spinner animasi transisi antar halaman
- **Database:** Tidak ada koneksi langsung

---

## 4. Panduan Migrasi ke Project Baru (dengan Backend Laravel)

### 4.1 Persiapan Project Baru

Pastikan project tujuan sudah memiliki struktur berikut:

```
project-tujuan/
├── backend/                          # Laravel 13
│   ├── app/
│   │   ├── Http/Controllers/         # API controllers
│   │   ├── Models/                   # Eloquent models (22 tabel)
│   │   └── Services/                 # Business logic (JP calc, cert gen, sync)
│   ├── database/
│   │   ├── migrations/               # Schema sesuai Struktur Database v3
│   │   └── seeders/                  # Data master (komunitas, admin, FAQ)
│   └── routes/
│       └── api.php                   # API routes
├── frontend/                         # React (Vite)
│   └── src/
│       ├── components/               # ← PINDAHKAN KE SINI
│       ├── assets/                   # ← PINDAHKAN KE SINI
│       ├── App.jsx                   # ← PINDAHKAN KE SINI
│       ├── main.jsx                  # ← PINDAHKAN KE SINI
│       └── index.css                 # ← PINDAHKAN KE SINI
└── docs/                             # Dokumen referensi
    ├── PRD_E-Learning_BKPSDM_v0.1_revised.md
    └── Struktur_Database_ELearning_BKPSDM_v3.md
```

### 4.2 Checklist Migrasi File

| # | File/Folder | Sumber | Tujuan | Catatan |
| --- | --- | --- | --- | --- |
| 1 | `src/components/` (12 file) | `Test-BKPSDM/src/components/` | `project-tujuan/frontend/src/components/` | Copy seluruh 12 file .jsx |
| 2 | `src/assets/` | `Test-BKPSDM/src/assets/` | `project-tujuan/frontend/src/assets/` | Logo, Hiasan, Sertifikat |
| 3 | `src/App.jsx` | `Test-BKPSDM/src/App.jsx` | `project-tujuan/frontend/src/App.jsx` | Router manual berbasis state |
| 4 | `src/main.jsx` | `Test-BKPSDM/src/main.jsx` | `project-tujuan/frontend/src/main.jsx` | Entry point |
| 5 | `src/index.css` | `Test-BKPSDM/src/index.css` | `project-tujuan/frontend/src/index.css` | Tailwind import |
| 6 | `index.html` | `Test-BKPSDM/index.html` | `project-tujuan/frontend/index.html` | HTML template |
| 7 | `vite.config.js` | `Test-BKPSDM/vite.config.js` | `project-tujuan/frontend/vite.config.js` | React + Tailwind plugin |
| 8 | `eslint.config.js` | `Test-BKPSDM/eslint.config.js` | `project-tujuan/frontend/eslint.config.js` | Linting config |
| 9 | `package.json` | `Test-BKPSDM/package.json` | `project-tujuan/frontend/package.json` | Adaptasi dependencies |

### 4.3 Langkah Migrasi

#### Langkah 1: Salin Source Code Frontend

```powershell
# Dari terminal di root project tujuan
# Pastikan frontend/ sudah ada dan kosong (atau baru dibuat)

# 1. Copy seluruh isi src/ dari project sumber
xcopy /E /I /Y "C:\Users\Lenovo\Downloads\Test-BKPSDM\src" "project-tujuan\frontend\src"

# 2. Copy file konfigurasi
copy /Y "C:\Users\Lenovo\Downloads\Test-BKPSDM\index.html" "project-tujuan\frontend\index.html"
copy /Y "C:\Users\Lenovo\Downloads\Test-BKPSDM\vite.config.js" "project-tujuan\frontend\vite.config.js"
copy /Y "C:\Users\Lenovo\Downloads\Test-BKPSDM\eslint.config.js" "project-tujuan\frontend\eslint.config.js"
copy /Y "C:\Users\Lenovo\Downloads\Test-BKPSDM\package.json" "project-tujuan\frontend\package.json"
copy /Y "C:\Users\Lenovo\Downloads\Test-BKPSDM\package-lock.json" "project-tujuan\frontend\package-lock.json"
```

#### Langkah 2: Install Dependencies Frontend

```powershell
cd project-tujuan\frontend
npm install
```

**Dependencies yang dibutuhkan:**
- `react` ^19.2.8
- `react-dom` ^19.2.8
- `lucide-react` ^1.39.0
- `tailwindcss` ^4.3.3
- `@tailwindcss/vite` ^4.3.3

#### Langkah 3: Copy Dokumen Referensi

```powershell
mkdir "project-tujuan\docs"
copy /Y "C:\Users\Lenovo\Downloads\Test-BKPSDM\PRD_E-Learning_BKPSDM_v0.1_revised.md" "project-tujuan\docs\"
copy /Y "C:\Users\Lenovo\Downloads\Test-BKPSDM\Struktur_Database_ELearning_BKPSDM_v3.md" "project-tujuan\docs\"
```

#### Langkah 4: Jalankan Frontend

```powershell
cd project-tujuan\frontend
npm run dev
```

---

## 5. Mapping Komponen ke Database — Panduan Integrasi API

### 5.1 Routing & Navigasi

Saat ini `App.jsx` menggunakan **state-based routing** (bukan React Router). Route yang tersedia:

| Route | Komponen | Keterangan |
| --- | --- | --- |
| `landing` | `LandingPage` | Halaman publik |
| `dashboard` | `UserDashboard` | Dashboard peserta |
| `catalog` | `CourseCatalog` | Katalog pelatihan |
| `my-courses` | `MyCourses` | Pelatihanku |
| `course-detail` | `CourseDetail` | Detail modul |
| `post-test` | `PostTest` | Pengerjaan post test |
| `test-result` | `TestResult` | Hasil & sertifikat |
| `certificates` | `Certificates` | Daftar sertifikat |
| `community` | `Community` | Komunitas belajar |
| `help-center` | `HelpCenter` | Pusat bantuan |

**Rekomendasi:** Pertahankan state-based routing untuk MVP, migrasi ke React Router jika diperlukan.

### 5.2 Kebutuhan API Endpoints

Berdasarkan mapping komponen ke database, berikut kebutuhan API yang perlu dibuat di Laravel:

#### Auth & User
| Endpoint | Method | Komponen | Database |
| --- | --- | --- | --- |
| `POST /api/auth/login` | POST | LandingPage | PENGGUNA (login NIP) |
| `GET /api/user/profile` | GET | ProfileDashboard | PENGGUNA |
| `PUT /api/user/profile` | PUT | ProfileDashboard | PENGGUNA |
| `POST /api/user/change-password` | POST | ProfileDashboard | PENGGUNA |

#### Katalog & Komunitas
| Endpoint | Method | Komponen | Database |
| --- | --- | --- | --- |
| `GET /api/communities` | GET | Community, CourseCatalog | KOMUNITAS + filter rumpun_jabatan |
| `POST /api/communities/:id/join` | POST | Community | PENDAFTARAN_PEMBELAJARAN |
| `GET /api/courses` | GET | CourseCatalog | PEMBELAJARAN + KOMUNITAS |
| `GET /api/courses/:id` | GET | CourseDetail | PEMBELAJARAN + MODUL + MATERI |
| `POST /api/courses/:id/enroll` | POST | CourseCatalog | PENDAFTARAN_PEMBELAJARAN |

#### Pembelajaran & Modul
| Endpoint | Method | Komponen | Database |
| --- | --- | --- | --- |
| `GET /api/enrolled-courses` | GET | MyCourses | PENDAFTARAN_PEMBELAJARAN + PEMBELAJARAN |
| `GET /api/enrollments/:id/modules` | GET | CourseDetail | MODUL + MATERI |
| `PUT /api/materials/:id/complete` | PUT | CourseDetail | PROGRES_MATERI |
| `GET /api/enrollments/:id/progress` | GET | UserDashboard | PROGRES_MODUL + PROGRES_MATERI |

#### Kuis & Post Test
| Endpoint | Method | Komponen | Database |
| --- | --- | --- | --- |
| `GET /api/quizzes/:id` | GET | PostTest | KUIS + SOAL_KUIS (randomized) |
| `POST /api/quizzes/:id/submit` | POST | PostTest | RIWAYAT_KUIS |
| `GET /api/post-tests/:id` | GET | PostTest | POST_TEST + SOAL_POST_TEST |
| `POST /api/post-tests/:id/submit` | POST | PostTest | RIWAYAT_POST_TEST |
| `GET /api/test-result/:enrollmentId` | GET | TestResult | RIWAYAT_POST_TEST + SERTIFIKAT |

#### Sertifikat
| Endpoint | Method | Komponen | Database |
| --- | --- | --- | --- |
| `GET /api/certificates` | GET | Certificates | SERTIFIKAT |
| `GET /api/certificates/:id/download` | GET | Certificates | SERTIFIKAT + generate PDF |

#### Dashboard & Statistik
| Endpoint | Method | Komponen | Database |
| --- | --- | --- | --- |
| `GET /api/dashboard/stats` | GET | UserDashboard | Agregat dari PENDAFTARAN, SERTIFIKAT |
| `GET /api/dashboard/activities` | GET | UserDashboard | Aktivitas terakhir |

#### Ulasan & Bantuan
| Endpoint | Method | Komponen | Database |
| --- | --- | --- | --- |
| `POST /api/reviews` | POST | TestResult | ULASAN_PEMBELAJARAN |
| `GET /api/faqs` | GET | HelpCenter | FAQ |
| `POST /api/help-tickets` | POST | HelpCenter | HELP_TIKET |
| `POST /api/system-reviews` | POST | HelpCenter | ULASAN_SISTEM |

---

## 6. Checklist Integrasi: Komponen → Database → API

| # | Komponen | Field Hardcoded Saat Ini | Perlu Diganti dengan Data dari API | Status |
| --- | --- | --- | --- | --- |
| 1 | UserDashboard | Stats: `2, 5, 4, 5` | Hitung dari PENDAFTARAN_PEMBELAJARAN + SERTIFIKAT | Belum |
| 2 | UserDashboard | Nama: `Budi Santoso` | Dari PENGGUNA.nama_lengkap | Belum |
| 3 | UserDashboard | Rekomendasi: hardcoded 3 kursus | Dari PEMBELAJARAN (filtered by rumpun_jabatan) | Belum |
| 4 | CourseCatalog | Kursus: hardcoded 3 data | Dari API /courses | Belum |
| 5 | CourseCatalog | Filter kategori: static | Dari KOMUNITAS.nama_komunitas | Belum |
| 6 | CourseDetail | Silabus: hardcoded 6 item | Dari MODUL + MATERI | Belum |
| 7 | CourseDetail | Video player: placeholder | Embed URL dari MATERI.tautan_atau_berkas | Belum |
| 8 | PostTest | Soal: hardcoded 1 soal | Dari SOAL_POST_TEST (randomized) | Belum |
| 9 | PostTest | Timer: hardcoded 2535 detik | Dari POST_TEST.durasi_menit | Belum |
| 10 | TestResult | Nilai: hardcoded `92/100` | Dari RIWAYAT_POST_TEST | Belum |
| 11 | TestResult | Sertifikat preview: hardcoded | Dari SERTIFIKAT (snapshot identitas) | Belum |
| 12 | Certificates | Daftar: hardcoded 3 sertifikat | Dari SERTIFIKAT | Belum |
| 13 | Community | Komunitas: hardcoded 3 data | Dari KOMUNITAS | Belum |
| 14 | HelpCenter | FAQ: hardcoded 3 data | Dari FAQ | Belum |
| 15 | ProfileDropdown | Nama: `Budi Santoso` | Dari PENGGUNA.nama_lengkap | Belum |
| 16 | MyCourses | Jumlah: hardcoded `3 in-progress, 12 completed` | Dari PENDAFTARAN_PEMBELAJARAN | Belum |

---

## 7. Model Eloquent yang Perlu Dibuat (Backend Laravel)

Berdasarkan Struktur Database v3, buat 22 model Eloquent:

| Model | Tabel | Relasi Utama |
| --- | --- | --- |
| `Pengguna` | pengguna | hasMany: komunitas, pembelajaran, pendaftaran, helpTiket, faq |
| `Komunitas` | komunitas | belongsTo: pengguna (pembuat), hasMany: pembelajaran, adminKomunitas |
| `AdminKomunitas` | admin_komunitas | belongsTo: pengguna, komunitas |
| `Pembelajaran` | pembelajaran | belongsTo: komunitas, pengguna; hasOne: pembelajaranJp, postTest; hasMany: modul, validasi, pendaftaran |
| `PembelajaranJp` | pembelajaran_jp | belongsTo: pembelajaran |
| `ValidasiPembelajaran` | validasi_pembelajaran | belongsTo: pembelajaran, pengguna |
| `Modul` | modul | belongsTo: pembelajaran; hasOne: kuis; hasMany: materi, progresModul |
| `Materi` | materi | belongsTo: modul; hasMany: progresMateri |
| `Kuis` | kuis | belongsTo: modul; hasMany: soalKuis, riwayatKuis |
| `SoalKuis` | soal_kuis | belongsTo: kuis |
| `RiwayatKuis` | riwayat_kuis | belongsTo: kuis, pendaftaran |
| `PostTest` | post_test | belongsTo: pembelajaran; hasMany: soalPostTest, riwayatPostTest |
| `SoalPostTest` | soal_post_test | belongsTo: postTest |
| `RiwayatPostTest` | riwayat_post_test | belongsTo: postTest, pendaftaran |
| `PendaftaranPembelajaran` | pendaftaran_pembelajaran | belongsTo: pengguna, pembelajaran; hasOne: sertifikat, ulasan; hasMany: progresModul, progresMateri, riwayatKuis, riwayatPostTest |
| `ProgresModul` | progres_modul | belongsTo: pendaftaran, modul |
| `ProgresMateri` | progres_materi | belongsTo: pendaftaran, materi |
| `Sertifikat` | sertifikat | belongsTo: pendaftaran |
| `UlasanPembelajaran` | ulasan_pembelajaran | belongsTo: pendaftaran |
| `UlasanSistem` | ulasan_sistem | belongsTo: pengguna |
| `HelpTiket` | help_tiket | belongsTo: pengguna (pengajuan), pengguna (ditangani) |
| `Faq` | faq | belongsTo: pengguna (pembuat) |

---

## 8. Business Rules yang Perlu Diterapkan di Backend

| # | Aturan | Referensi PRD | Implementasi |
| --- | --- | --- | --- |
| 1 | Login semi-SSO via NIP + API SIMPEG | PST-1 | Auth controller + SIMPEG API integration |
| 2 | Peserta hanya bisa enroll komunitas sesuai rumpun jabatan | PST-2 | Validasi service layer: `PENGGUNA.rumpun_jabatan == KOMUNITAS.rumpun_jabatan` |
| 3 | Modul terkunci sebelum selesai modul sebelumnya | KOM-2 | Check PROGRES_MODUL sebelum unlock |
| 4 | Kuis/post test maks 3 percobaan | PST-6, PST-9 | `CHECK(percobaan_ke ≤ 3)` + service layer |
| 5 | Post test aktif setelah progres 100% | PST-8 | Check `persentase_progres == 100` di PENDAFTARAN |
| 6 | JP otomatis = durasi ÷ 135, maks 3/modul | ADM-10 | Trigger/service: `MODUL.jp_modul = durasi_total_menit / 135` |
| 7 | Sertifikat snapshot identitas | PST-11 | Insert nama_lengkap, nip, unit_kerja saat terbit |
| 8 | Randomize urutan soal | KOM-5 | Shuffle SOAL_KUIS/SOAL_POST_TEST sebelum tampil |
| 9 | Approval 1 tahap, ringan | ADM-5 | Status: draft → menunggu_approval → dipublikasikan |
| 10 | Passing grade kustom per pembelajaran | PST-6 | `PEMBELAJARAN.nilai_kelulusan` + `KUIS.nilai_kelulusan` + `POST_TEST.nilai_kelulusan` |
| 11 | Sinkronisasi ke SIMPEG setelah lulus | PST-11 | Background job: set `simpeg_sync_status` + push data |
| 12 | Lock akses materi berikutnya | PST-5 | Service layer validasi PROGRES sebelum unlock |

---

## 9. Catatan Penting

### 9.1 Data yang Masih Hardcoded di Components
- **Semua data statis** di dalam komponen masih hardcoded (bukan dari API)
- **ProfileDropdown** menampilkan nama "Budi Santoso" — harus diganti dari API user profile
- **Semua angka statistik** harus dihitung dari database
- **Soal kuis/post test** masih 1 contoh hardcoded — harus diambil dari SOAL_KUIS/SOAL_POST_TEST

### 9.2 Things That Need Attention During Migration
- **Import path assets:** `../assets/logo-removebg-preview 1.png` — pastikan path benar di project baru
- **Tailwind CSS v4:** Pastikan `@tailwindcss/vite` plugin terdaftar di `vite.config.js`
- **React 19:** Komponen menggunakan hooks React 19 compatible (`useState`, `useEffect`, `useRef`)
- **lucide-react:** Semua icon berasal dari `lucide-react` — pastikan package terinstall
- **Import ProfileDropdown:** Komponen ini diimport di hampir semua halaman — pastikan path import benar

### 9.3 Feature yang Belum Ada di Components (Perlu Dibuat)
Berikut fitur yang disebutkan di PRD tapi belum ada komponen UI-nya:

| # | Fitur | PRD Ref | Keterangan |
| --- | --- | --- | --- |
| 1 | Admin BKPSDM Dashboard | ADM-1 | Dashboard admin global dengan grafik tren |
| 2 | Admin BKPSDM User Management | ADM-2, ADM-3 | CRUD user, penugasan admin komunitas |
| 3 | Admin BKPSDM Monitoring & Export Excel | ADM-8 | Ekspor laporan ke format Excel |
| 4 | Admin Komunitas - Buat Pembelajaran | KOM-1 s.d. KOM-8 | Form pembelajaran, modul, kuis, post test |
| 5 | Login Page (NIP) | PST-1 | Form login semi-SSO |
| 6 | Kuis Per Modul | PST-6 | Halaman pengerjaan kuis (berbeda dari PostTest) |

---

## 10. Struktur Folder yang Direkomendasikan di Project Baru

```
project-tujuan/
├── backend/                              # Laravel 13
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Api/
│   │   │   │   │   ├── AuthController.php
│   │   │   │   │   ├── UserController.php
│   │   │   │   │   ├── CommunityController.php
│   │   │   │   │   ├── CourseController.php
│   │   │   │   │   ├── ModuleController.php
│   │   │   │   │   ├── QuizController.php
│   │   │   │   │   ├── PostTestController.php
│   │   │   │   │   ├── CertificateController.php
│   │   │   │   │   ├── DashboardController.php
│   │   │   │   │   ├── HelpCenterController.php
│   │   │   │   │   └── ReviewController.php
│   │   │   │   └── Middleware/
│   │   │   │       └── VerifyRole.php
│   │   │   └── Requests/
│   │   ├── Models/                      # 22 Eloquent models
│   │   ├── Services/
│   │   │   ├── SimpegService.php        # Integrasi API SIMPEG
│   │   │   ├── JpCalculatorService.php  # Kalkulasi JP otomatis
│   │   │   ├── CertificateService.php   # Generate PDF sertifikat
│   │   │   └── SyncService.php          # Sinkronisasi ke SIMPEG
│   │   └── Jobs/
│   │       └── SyncCertificateToSimpeg.php
│   ├── database/
│   │   ├── migrations/                  # 22+ migration files
│   │   └── seeders/
│   │       ├── PenggunaSeeder.php
│   │       ├── KomunitasSeeder.php
│   │       └── FaqSeeder.php
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   └── config/
│       └── simpeg.php
│
├── frontend/                             # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── CourseCatalog.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── MyCourses.jsx
│   │   │   ├── Community.jsx
│   │   │   ├── PostTest.jsx
│   │   │   ├── TestResult.jsx
│   │   │   ├── Certificates.jsx
│   │   │   ├── HelpCenter.jsx
│   │   │   ├── ProfileDropdown.jsx
│   │   │   └── LoadingSkeleton.jsx
│   │   ├── services/
│   │   │   └── api.js                   # Axios/fetch API client
│   │   ├── hooks/
│   │   │   └── useAuth.js              # Auth state management
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # Global auth state
│   │   ├── assets/
│   │   │   ├── logo-removebg-preview 1.png
│   │   │   ├── Hiasan.png
│   │   │   └── Sertifikat.png
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── docs/
    ├── PRD_E-Learning_BKPSDM_v0.1_revised.md
    ├── Struktur_Database_ELearning_BKPSDM_v3.md
    └── MIGRASI_INTEGRASI_COMPONENTS.md
```

---

*Dokumen ini dibuat sebagai panduan migrasi dan integrasi komponen frontend ke project baru dengan backend Laravel. Berdasarkan PRD v0.3 dan Struktur Database v3.*
