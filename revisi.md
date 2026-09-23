# Rincian Kebutuhan & Pembaruan Sistem LMS BKPSDM

> Dikonversi dari `Rincian_Pembaruan_Sistem_LMS.pdf` dan **diperkaya dengan hasil analisis langsung terhadap codebase** (`test-corpu` = backend Laravel, `Test-BKPSDM` = frontend React/Vite). Setiap poin sudah dipetakan ke kondisi aktual di kode agar prompt untuk AI coding agent bisa dieksekusi tanpa tebak-tebakan.

---

## 0. Ringkasan Hasil Analisis Codebase

| # | Fitur (dari dokumen) | Status di Codebase Saat Ini | Kompleksitas Revisi |
|---|---|---|---|
| A1 | Input JP oleh Admin Komunitas | **Sudah ada**, tapi JP dihitung otomatis dari `SUM(modul.jp_modul)`, bukan input manual per sesi/materi/kegiatan | Sedang (ubah alur input) |
| A2 | Tampilan JP Read-Only untuk Admin BKPSDM | **Sudah ada** endpoint read (`GET /verifikasi-jp`) + ada tambahan fitur verifikasi (`PUT`) yang **tidak diminta di dokumen** tapi sudah berjalan | Kecil (cek UI saja) |
| A3 | Modul Pre-test sebelum materi | **Belum ada.** `Kuis` yang ada sekarang adalah **evaluasi SETELAH modul** (post-module quiz), bukan pre-test sebelum materi | Besar (fitur baru + gating logic) |
| A4 | Durasi pengerjaan test (pre-test/post-test) | **Bug ditemukan**: `post_test` sudah punya kolom `durasi_menit`, tapi tabel `kuis` **tidak punya kolom ini sama sekali** walau kode di beberapa tempat sudah membaca `$kuis->durasi_menit` (akan selalu null) | Kecil–Sedang (tambah kolom + form) |
| A5 | Manajemen Kategori Katalog Kursus (CRUD) | **Belum ada.** `kategori` hanya kolom string bebas di tabel `pembelajaran`, daftar kategori di frontend **hardcode** di `KatalogKursus.jsx` | Sedang (tabel baru + CRUD + migrasi data) |
| B1 | Background landing page | Gambar statis diimpor di `src/pages/LandingPage.jsx` (`import heroImg from '../assets/BG_BKPSDM.jpg'`) | Kecil (ganti aset + kontras) |

**Referensi file kunci yang ditemukan:**
- Backend: `app/Models/{Kuis,SoalKuis,Modul,Materi,PembelajaranJp,PostTest,Komunitas,Pembelajaran}.php`, `app/Http/Controllers/Api/AdminKomunitas/{KuisController,PembelajaranJpController,ModulController,MateriController,PostTestController,PembelajaranController}.php`, `app/Http/Controllers/Api/AdminBkpsdm/VerifikasiJpController.php`, `app/Http/Controllers/Api/User/{CourseDetailController,KuisController,KatalogController}.php`, `routes/api.php`
- Frontend: `src/pages/LandingPage.jsx`, `src/assets/BG_BKPSDM.jpg`, `src/Admin-Komunitas/{DetailKursus,BankSoal,KatalogKursus,PelatihanSaya,AdminKomunitasDashboard}.jsx`, `src/Admin-BKPSDM/{CommunityManagement,MonitoringReports}.jsx`, `src/pages/{CourseDetail,Kuis}.jsx`, `src/api/axios.js`

---

## 1. Penambahan Fitur Baru

### 1.1 Input JP (Jam Pelajaran) — Admin Komunitas
**Deskripsi asli:** Form input alokasi JP per sesi/materi/kegiatan kursus, hak akses Admin Komunitas.

**Kondisi existing:** `PembelajaranJpController@store` (`POST /admin-komunitas/pembelajaran/{id}/jp`) sudah mengizinkan Admin Komunitas mengirim `jenis_pelatihan`, tapi field `jp_dihitung_sistem` **selalu dihitung otomatis** dari `SUM(modul.jp_modul)` — bukan input manual. Kolom `jp_modul` sendiri sudah ada di tabel `modul` dan bisa diisi lewat `ModulController`.

**Revisi yang perlu dilakukan:**
- Pastikan form input JP per modul (`jp_modul`) di `ModulController` (AdminKomunitas) benar-benar terekspos di UI `DetailKursus.jsx` (cek apakah field ini sudah ada di form modul; jika belum, tambahkan).
- Opsional (sesuai kebutuhan bisnis): jika Admin Komunitas juga perlu override manual JP total di level pembelajaran (bukan hanya hasil SUM), tambahkan field `jp_manual_override` nullable di tabel `pembelajaran_jp` dan gunakan nilai itu jika diisi, fallback ke hasil kalkulasi otomatis jika kosong.

### 1.2 Tampilan JP (Read-Only) — Admin BKPSDM
**Kondisi existing:** `VerifikasiJpController@index` (`GET /admin-bkpsdm/verifikasi-jp`) sudah read-only secara teknis (GET, tidak mengubah data), dan `@update` (`PUT`) adalah fitur verifikasi tambahan di luar dokumen. **Tidak perlu diubah di backend.**

**Revisi yang perlu dilakukan:**
- Cek halaman frontend Admin BKPSDM (kemungkinan di `MonitoringReports.jsx` atau perlu halaman baru) — pastikan **tidak ada tombol edit/ubah nilai JP** di luar alur verifikasi resmi, hanya tampilan rekap.

### 1.3 Modul Pre-test Sebelum Materi — Admin Komunitas
**Ini fitur BARU, bukan modifikasi.** `Kuis` yang ada sekarang berfungsi sebagai evaluasi akhir modul (dibuka setelah semua materi dalam modul dibaca, mengunci modul berikutnya) — lihat `CourseDetailController@show`. Pre-test harus tampil **sebelum** materi dibuka, terkait ke materi spesifik.

**Desain teknis yang direkomendasikan (agar reuse maksimal dari struktur `Kuis`/`SoalKuis` yang sudah matang dengan dukungan TTS, grid, dll):**
- Tambah kolom `tipe_kuis` (enum: `pre_test`, `evaluasi_modul`, default `evaluasi_modul`) dan `materi_id` (nullable FK ke `materi`) di tabel `kuis`.
- Ubah relasi: `kuis` tetap `belongsTo Modul`, tapi jika `tipe_kuis = pre_test`, kaitkan ke `materi_id` tertentu → materi tersebut **terkunci** sampai pre-test dikerjakan & lulus (atau minimal dikerjakan, sesuai keputusan bisnis).
- Gating logic ditambahkan di `CourseDetailController@show`: sebelum menghitung `is_locked` materi, cek apakah ada pre-test terkait `materi_id` yang belum selesai.
- Admin Komunitas: form baru (bisa reuse UI `BankSoal.jsx`) untuk membuat pre-test dan memilih materi target — endpoint baru `POST /admin-komunitas/materi/{id}/pre-test` atau extend `KuisController` dengan parameter `tipe_kuis` & `materi_id`.
- User: endpoint baru `GET/POST /user/courses/{pembelajaran_id}/materi/{materi_id}/pre-test/{kuis_id}` (pola serupa `User/KuisController`).

### 1.4 Pengaturan Waktu Pengerjaan Test — Admin Komunitas
**Bug ditemukan:** Tabel `kuis` **tidak punya kolom `durasi_menit`**, padahal:
- `CourseDetailController.php` baris ~101 membaca `$m->kuis->durasi_menit`
- `User/KuisController.php` baris ~101 membaca `$kuis->durasi_menit`
- `KuisController` (AdminKomunitas) — validasi `store`/`update` **tidak menerima** `durasi_menit` sama sekali

Sementara `post_test` **sudah benar** (kolom ada, validasi ada, form frontend ada di `DetailKursus.jsx` baris ~1003 `durasi_menit: postTest?.durasi_menit || 45`).

**Revisi yang perlu dilakukan:**
- Migrasi baru: tambah `durasi_menit` (unsignedInteger, nullable) ke tabel `kuis`.
- `KuisController@store` dan `@update` (AdminKomunitas): tambahkan validasi & penyimpanan `durasi_menit`.
- `BankSoal.jsx`: tambahkan input durasi (pola sama seperti di `DetailKursus.jsx` untuk post-test).

### 1.5 Manajemen Kategori Katalog Kursus — Admin BKPSDM
**Kondisi existing:** `kategori` adalah string bebas (`$table->string('kategori', 100)->nullable()`), default `'Pengembangan Kompetensi'`. Daftar kategori di dropdown frontend **hardcode**: `['Semua Kategori', 'Manajemen ASN', 'Teknologi Informasi', 'Pengembangan Kompetensi', 'Pelayanan Publik']` (`KatalogKursus.jsx`).

**Revisi yang perlu dilakukan:**
- Tabel baru `kategori_kursus` (`kategori_id`, `nama_kategori`, `deskripsi` nullable, `dibuat_pada`, soft delete opsional).
- Model `KategoriKursus` + Controller CRUD baru `AdminBkpsdm/KategoriKursusController` (pola sama seperti `KomunitasController`).
- Route baru: `Route::apiResource('/kategori-kursus', KategoriKursusController::class)` di grup `admin-bkpsdm`.
- Ubah kolom `pembelajaran.kategori` (string) → `pembelajaran.kategori_id` (FK ke `kategori_kursus`), dengan migrasi data: buat kategori dari nilai string unik yang sudah ada, lalu isi `kategori_id` sesuai mapping.
- Update semua tempat yang menulis/membaca `kategori` string (`PembelajaranController`, `PelatihanSaya.jsx`, `DetailKursus.jsx`, `KatalogKursus.jsx`, `AdminKomunitasDashboard.jsx`) agar pakai `kategori_id` + relasi, dan dropdown kategori mengambil dari API, bukan hardcode.

---

## 2. Perbaikan & Penyesuaian Antarmuka

### 2.1 Perubahan Background Landing Page
**Kondisi existing:** `src/pages/LandingPage.jsx` mengimpor `heroImg` dari `src/assets/BG_BKPSDM.jpg` dan menampilkannya via `<img src={heroImg} alt="Hero Background" />`.

**Revisi yang perlu dilakukan:**
- Ganti file aset `src/assets/BG_BKPSDM.jpg` dengan gambar baru yang lebih profesional, resolusi optimal, dan kontras cukup terhadap teks di atasnya (cek warna teks di sekitar komponen `Hero` — line ~49–210).
- Pastikan gambar tetap responsif (cek class Tailwind terkait `object-cover`/`w-full`/`h-*` pada elemen `<img>` tsb).
- Jika ukuran file besar, kompres agar tidak memperlambat LCP (Largest Contentful Paint).

---

## 3. Prompt Bertahap untuk AI Coding Agent

> Jalankan **satu prompt per tahap**, secara berurutan. Setiap prompt sudah scoped kecil dan mandiri, mereferensikan path file asli di repo, plus kriteria selesai (acceptance criteria) agar agent bisa self-check. Jangan lompat tahap — beberapa tahap backend jadi prasyarat tahap frontend berikutnya.

### Tahap 0 — Persiapan
```
Baca struktur project backend Laravel di folder test-corpu dan frontend React/Vite
di folder Test-BKPSDM. Jangan ubah apa pun dulu. Ringkas ke saya:
1. Bagaimana pola penamaan migration & konvensi kolom (bahasa Indonesia snake_case)
   yang dipakai di database/migrations.
2. Bagaimana pola Controller di app/Http/Controllers/Api/AdminKomunitas dan
   AdminBkpsdm (khususnya soal middleware role, validasi request, response JSON).
3. Bagaimana pola halaman admin di src/Admin-Komunitas dan src/Admin-BKPSDM
   (state management, pemanggilan API lewat src/api/axios.js).
Tujuannya agar semua perubahan berikutnya konsisten dengan pola yang sudah ada.
```

### Tahap 1 — Perbaiki bug `durasi_menit` pada Kuis (fondasi untuk pre-test & post-test)
```
Di backend Laravel (test-corpu):
1. Buat migration baru untuk menambahkan kolom `durasi_menit` (unsignedInteger,
   nullable) ke tabel `kuis`, ditempatkan setelah kolom `tampilkan_kunci_setelah`
   atau `grid_config_json` (cek migration terakhir yang menyentuh tabel kuis:
   database/migrations/2026_09_22_000000_add_tts_support_to_kuis_tables.php).
2. Update app/Http/Controllers/Api/AdminKomunitas/KuisController.php:
   - Tambahkan validasi 'durasi_menit' => 'nullable|integer|min:1' di method
     store() dan update().
   - Pastikan nilainya ikut disimpan saat create/update Kuis.
3. Jalankan migration dan pastikan tidak merusak data/relasi yang sudah ada.

Kriteria selesai: field durasi_menit bisa diisi lewat endpoint
POST/PUT /admin-komunitas/modul/{modul_id}/kuis, dan nilainya muncul di response
GET yang sama, tanpa error pada fitur Kuis yang sudah berjalan (evaluasi modul).
```

### Tahap 2 — Frontend: form durasi pada Bank Soal (Kuis)
```
Di frontend React (Test-BKPSDM), file src/Admin-Komunitas/BankSoal.jsx:
1. Tambahkan input "Durasi Pengerjaan (menit)" pada form pembuatan/pengeditan
   Kuis, mengikuti pola input durasi yang sudah ada untuk Post Test di
   src/Admin-Komunitas/DetailKursus.jsx (cari durasi_menit di file itu sebagai
   referensi tampilan/validasi).
2. Pastikan value durasi ikut terkirim di payload create/update Kuis ke backend.
3. Tampilkan durasi tersebut di halaman pengerjaan kuis milik peserta
   (src/pages/Kuis.jsx) sebagai timer/countdown, mengikuti pola timer yang
   sudah dipakai di halaman Post Test jika ada (src/pages/PostTest.jsx).

Kriteria selesai: admin komunitas bisa mengatur durasi kuis dari UI, dan peserta
melihat batas waktu saat mengerjakan kuis tersebut.
```

### Tahap 3 — Backend: skema Pre-test sebelum materi
```
Di backend Laravel (test-corpu):
1. Buat migration untuk menambahkan dua kolom ke tabel `kuis`:
   - `tipe_kuis` (string/enum, default 'evaluasi_modul', nilai lain: 'pre_test')
   - `materi_id` (unsignedBigInteger, nullable, foreign key ke materi.materi_id,
     onDelete cascade)
   Jangan hapus/ubah kolom modul_id yang sudah ada — kuis tetap terkait modul
   seperti sebelumnya, materi_id hanya dipakai ketika tipe_kuis = 'pre_test'.
2. Update app/Models/Kuis.php: tambahkan relasi materi() -> belongsTo(Materi::class,
   'materi_id', 'materi_id'), dan tambahkan 'tipe_kuis' ke $guarded pengecualian
   (guarded sudah [] jadi otomatis mass-assignable, cukup pastikan tidak ada
   $fillable yang membatasi).
3. Update app/Http/Controllers/Api/AdminKomunitas/KuisController.php:
   - store() dan update(): terima 'tipe_kuis' (nullable|in:pre_test,evaluasi_modul)
     dan 'materi_id' (nullable|exists:materi,materi_id, wajib diisi jika
     tipe_kuis = pre_test).
   - Jika tipe_kuis = pre_test, HAPUS validasi unique modul_id (karena sekarang
     satu modul boleh punya satu evaluasi_modul DAN beberapa pre_test untuk
     materi berbeda) — cek ulang constraint unique modul_id di migration awal
     kuis (database/migrations/2026_09_04_012938_create_kuis_table.php) dan buat
     migration baru untuk drop/ubah unique constraint tersebut menjadi unique
     gabungan (modul_id, tipe_kuis, materi_id) atau hapus unique sepenuhnya dan
     validasi keunikan di level aplikasi.

Kriteria selesai: admin komunitas bisa membuat kuis dengan tipe_kuis='pre_test'
terkait ke materi_id tertentu, tanpa merusak kuis tipe evaluasi_modul yang sudah
ada di data lama (yang otomatis tipe_kuis='evaluasi_modul').
```

### Tahap 4 — Backend: gating akses materi berdasarkan pre-test
```
Di backend Laravel (test-corpu), file
app/Http/Controllers/Api/User/CourseDetailController.php:
1. Saat memetakan setiap materi di dalam modul (bagian $materiList = $m->materi->map(...)),
   tambahkan pengecekan: apakah materi ini punya pre-test terkait
   (Kuis::where('materi_id', $mat->materi_id)->where('tipe_kuis','pre_test')->first()).
2. Jika ada dan peserta (via pendaftaran + RiwayatKuis) belum lulus pre-test
   tersebut, maka materi ini is_locked = true dan tautan/konten TIDAK dikirim
   ke frontend (sama seperti pola locking modul yang sudah ada), sampai
   pre-test dikerjakan & lulus.
3. Sertakan info pre-test di response tiap materi, contoh:
   'pre_test' => $preTest ? ['kuis_id' => ..., 'judul' => ..., 'is_completed' => ...] : null
4. Buat endpoint baru untuk peserta mengambil & submit pre-test, meniru pola
   app/Http/Controllers/Api/User/KuisController.php (show & submit), tapi
   query berdasarkan materi_id bukan modul_id. Tambahkan route baru di
   routes/api.php di dalam grup user, misalnya:
   Route::get('/courses/{pembelajaran_id}/materi/{materi_id}/pre-test',
       [PreTestUserController::class, 'show']);
   Route::post('/courses/{pembelajaran_id}/materi/{materi_id}/pre-test/submit',
       [PreTestUserController::class, 'submit']);

Kriteria selesai: materi dengan pre-test tidak bisa diakses (tautan null,
is_locked true) sebelum peserta lulus pre-test, dan endpoint pengerjaan
pre-test bekerja mirip endpoint kuis modul yang sudah ada.
```

### Tahap 5 — Frontend: admin membuat Pre-test & user mengerjakan Pre-test
```
Di frontend React (Test-BKPSDM):
1. Di src/Admin-Komunitas/BankSoal.jsx (atau DetailKursus.jsx sesuai tempat
   pembuatan kuis saat ini), tambahkan opsi tipe evaluasi: "Evaluasi Modul"
   (default, seperti sekarang) vs "Pre-test Materi". Jika memilih Pre-test,
   tampilkan dropdown pilih materi (ambil dari materi dalam modul yang sedang
   diedit) dan kirim tipe_kuis + materi_id ke backend.
2. Di src/pages/CourseDetail.jsx, untuk materi yang punya pre_test dan belum
   is_completed, tampilkan state terkunci dengan CTA "Kerjakan Pre-test dulu"
   alih-alih tautan materi langsung.
3. Buat halaman/komponen pengerjaan pre-test baru (bisa reuse struktur
   src/pages/Kuis.jsx), arahkan ke endpoint baru dari Tahap 4.

Kriteria selesai: dari sisi UI, admin komunitas bisa mengaitkan pre-test ke
materi spesifik, dan peserta yang belum lulus pre-test tidak bisa membuka
materi terkait, dengan alur pengerjaan pre-test yang jelas.
```

### Tahap 6 — Backend: tabel & CRUD Kategori Kursus
```
Di backend Laravel (test-corpu):
1. Buat migration tabel baru `kategori_kursus`:
   kategori_id (PK, bigIncrements), nama_kategori (string 100, unique),
   deskripsi (text, nullable), dibuat_pada (timestamp useCurrent).
2. Buat model app/Models/KategoriKursus.php dengan primaryKey 'kategori_id',
   const CREATED_AT = 'dibuat_pada', UPDATED_AT = null, $guarded = [].
3. Buat controller app/Http/Controllers/Api/AdminBkpsdm/KategoriKursusController.php
   dengan method index/store/show/update/destroy, ikuti pola
   app/Http/Controllers/Api/AdminBkpsdm/KomunitasController.php untuk gaya
   response & validasi. Tolak destroy jika kategori masih dipakai pembelajaran
   (cek Pembelajaran::where('kategori_id', $id)->exists()).
4. Tambahkan route di routes/api.php dalam grup admin-bkpsdm:
   Route::apiResource('/kategori-kursus', KategoriKursusController::class);
5. Seed data awal 4 kategori yang sudah dipakai sekarang: 'Manajemen ASN',
   'Teknologi Informasi', 'Pengembangan Kompetensi', 'Pelayanan Publik'
   (via seeder atau migration data seeding), agar konsisten dengan yang
   selama ini hardcode di frontend (src/Admin-Komunitas/KatalogKursus.jsx).

Kriteria selesai: Admin BKPSDM bisa CRUD kategori lewat endpoint
/admin-bkpsdm/kategori-kursus, dan 4 kategori lama sudah otomatis tersedia
sebagai data awal setelah migrate+seed.
```

### Tahap 7 — Backend: migrasi kolom `kategori` pembelajaran ke relasi `kategori_id`
```
Di backend Laravel (test-corpu):
1. Buat migration untuk menambahkan kolom kategori_id (unsignedBigInteger,
   nullable, foreign key ke kategori_kursus.kategori_id) ke tabel pembelajaran.
   JANGAN hapus kolom kategori (string) lama dulu — biarkan berdampingan
   sementara untuk backward-compatibility selama migrasi data.
2. Buat migration data (atau perintah artisan sekali jalan) yang:
   - Mengambil semua nilai unik kolom pembelajaran.kategori,
   - Memastikan tiap nilai unik itu ada baris yang sesuai di kategori_kursus
     (insert jika belum ada),
   - Mengisi pembelajaran.kategori_id sesuai mapping nama kategori tersebut.
3. Update app/Models/Pembelajaran.php: tambahkan relasi
   kategoriKursus() -> belongsTo(KategoriKursus::class, 'kategori_id', 'kategori_id'),
   dan HAPUS accessor getKategoriAttribute() yang hardcode default string
   (baris ~40-43) — ganti alur default kategori memakai kategori_id yang
   merujuk ke kategori "Pengembangan Kompetensi" hasil seed Tahap 6.
4. Update app/Http/Controllers/Api/AdminKomunitas/PembelajaranController.php
   (store & update, sekitar baris 64, 99, 157, 172, 176-177, 319-320): ganti
   validasi & penyimpanan dari 'kategori' string menjadi 'kategori_id'
   (nullable|exists:kategori_kursus,kategori_id), dengan fallback ke id
   kategori default jika kosong.
5. Update semua controller yang mengembalikan data pembelajaran ke frontend
   (User/KatalogController, User/CourseDetailController, dsb) agar ikut
   me-load relasi kategoriKursus dan menyertakan nama kategori di response
   (agar frontend tidak perlu perubahan besar-besaran di luar form admin).

Kriteria selesai: data kategori lama tidak hilang, seluruh pembelajaran
existing otomatis punya kategori_id yang benar, dan response API tetap
menyertakan nama kategori yang bisa dibaca frontend.
```

### Tahap 8 — Frontend: dropdown kategori dinamis (bukan hardcode)
```
Di frontend React (Test-BKPSDM):
1. src/Admin-Komunitas/KatalogKursus.jsx: hapus array hardcode `categories`
   (baris ~219-225), ganti dengan fetch dari
   GET /admin-bkpsdm/kategori-kursus atau endpoint publik/user yang sesuai
   role (tambahkan endpoint read kategori untuk role peserta/admin-komunitas
   jika belum ada; jika kategori-kursus hanya ada di grup admin-bkpsdm, buat
   endpoint tambahan ringan di grup admin-komunitas dan user, atau pindahkan
   endpoint index ke luar middleware role khusus agar bisa diakses semua role
   terautentikasi).
2. src/Admin-Komunitas/PelatihanSaya.jsx dan DetailKursus.jsx: ganti input
   'kategori' (text/select statis) menjadi dropdown yang datanya diambil dari
   endpoint kategori, dan kirim 'kategori_id' (bukan 'kategori' string) ke
   backend saat create/update pembelajaran.
3. src/Admin-BKPSDM/CommunityManagement.jsx (atau buat file baru
   src/Admin-BKPSDM/CategoryManagement.jsx mengikuti pola yang sama):
   buat halaman CRUD kategori kursus untuk Admin BKPSDM (list, tambah, edit,
   hapus), dan daftarkan di routing/menu sidebar Admin BKPSDM yang sudah ada.
4. src/Admin-Komunitas/AdminKomunitasDashboard.jsx (baris ~421) dan
   KatalogKursus.jsx (baris ~142, 249): sesuaikan pembacaan field agar tetap
   menampilkan nama kategori dari relasi (course.kategori_kursus?.nama_kategori
   atau field yang sudah disertakan backend di Tahap 7 poin 5).

Kriteria selesai: tidak ada lagi daftar kategori hardcode di frontend;
Admin BKPSDM bisa kelola kategori dari UI, dan Admin Komunitas memilih
kategori dari data yang sama saat membuat/mengedit pembelajaran.
```

### Tahap 9 — Perbaikan tampilan background landing page
```
Di frontend React (Test-BKPSDM):
1. Saya akan menyediakan file gambar baru untuk background landing page.
   Ganti file src/assets/BG_BKPSDM.jpg dengan gambar tersebut (pertahankan
   nama file atau update import di src/pages/LandingPage.jsx baris ~5 jika
   nama file berubah).
2. Cek komponen Hero (src/pages/LandingPage.jsx, baris ~49-210): pastikan
   elemen <img> yang menampilkan heroImg tetap punya class responsif
   (object-cover, w-full, h-full atau sejenisnya) dan tidak overflow di
   ukuran mobile.
3. Jika kontras teks di atas gambar baru kurang terbaca, tambahkan overlay
   gradasi gelap tipis (misal bg-black/30 atau bg-gradient-to-t) di antara
   gambar dan teks, jangan mengubah warna teks itu sendiri kecuali diminta.

Kriteria selesai: landing page tampil dengan background baru, teks tetap
terbaca jelas di semua ukuran layar, tidak ada regresi layout.
```

### Tahap 10 — Uji integrasi akhir
```
Jalankan pengecekan menyeluruh sebelum dianggap selesai:
1. php artisan migrate:fresh --seed di environment testing/local (JANGAN di
   database production) untuk memastikan seluruh migration baru dari
   Tahap 1, 3, 6, 7 berjalan berurutan tanpa error.
2. Uji manual/otomatis alur end-to-end:
   - Admin Komunitas: buat kuis evaluasi modul (harus tetap jalan seperti
     semula) DAN buat pre-test untuk materi tertentu.
   - Peserta: pastikan materi dengan pre-test terkunci sampai pre-test
     dikerjakan & lulus, lalu materi terbuka.
   - Admin Komunitas: atur durasi kuis & post-test, peserta melihat timer.
   - Admin BKPSDM: CRUD kategori kursus, lalu Admin Komunitas memilih
     kategori tsb saat membuat pembelajaran baru, dan kategori tampil benar
     di katalog peserta.
   - Landing page tampil dengan background baru di desktop & mobile.
3. Laporkan ke saya ringkasan file apa saja yang berubah, migration baru apa
   saja yang ditambahkan, dan apakah ada breaking change pada endpoint yang
   sudah dipakai frontend existing (terutama kontrak response Kuis dan
   Pembelajaran yang berubah bentuk datanya).
```

---

## Catatan Penting untuk Agent
- Jangan menghapus kolom `pembelajaran.kategori` (string lama) sampai Tahap 7-8 benar-benar selesai diverifikasi berjalan, untuk menghindari kehilangan data jika ada rollback.
- Fitur evaluasi modul (`Kuis` tipe `evaluasi_modul`) yang sudah berjalan **tidak boleh regresi** — semua perubahan skema harus backward-compatible dengan data lama (default `tipe_kuis = 'evaluasi_modul'`).
- Ikuti konvensi penamaan Bahasa Indonesia snake_case yang sudah konsisten dipakai di seluruh database & kode (`pembelajaran_id`, `dibuat_pada`, dll).