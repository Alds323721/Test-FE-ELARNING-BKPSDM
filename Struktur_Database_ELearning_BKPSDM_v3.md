# Struktur Database — Platform "Buleleng ASN 4U" (Revisi v3)

**Berdasarkan:** PRD v0.3 (Revisi 3) — hasil diskusi 26/08, 27/08, 02/09 (sesi 1 & 2) + arahan Tim Ahli LAN RI.
**Menggantikan:** `Struktur_Database_ELearning_BKPSDM_v2.md`. Struktur dasar (kunci, index, snapshot histori, dsb) dari v2 tetap dipakai — dokumen ini fokus pada **apa yang berubah** akibat PRD Revisi 3.

## Ringkasan Perubahan Utama vs v2

| # | Perubahan | Pemicu di PRD |
| --- | --- | --- |
| 1 | Peserta **dibatasi khusus ASN** (jalur masyarakat umum dihapus) | Diskusi 27/08 |
| 2 | `PENGGUNA` & `KOMUNITAS` mendapat atribut **rumpun jabatan** (JPT/JA/JF/Pelaksana) + sub-bidang khusus JF | Diskusi 02/09 sesi 1 |
| 3 | Tabel baru `PEMBELAJARAN_JP` untuk **konversi & verifikasi JP** (formula durasi÷135, maks 3/modul) | Diskusi 02/09 sesi 1 & 2 |
| 4 | Approval **disederhanakan jadi 1 tahap** (ringkasan + surat pernyataan), bukan berlapis — arahan Tim Ahli LAN RI melunakkan draft approval formal sebelumnya | Diskusi 02/09 sesi 2 |
| 5 | `MODUL` wajib memuat **3 unsur** (Overview, Substansi, Evaluasi) sesuai standar LAN | Diskusi 02/09 sesi 2 |
| 6 | Percobaan kuis/post test dibatasi **maks 3 kali**, dengan **randomize soal** + **tampilkan kunci jawaban** setelah gagal | Diskusi 02/09 sesi 1 |
| 7 | Video **wajib embed link**, tidak ada upload file video | Diskusi 26/08 |
| 8 | `SERTIFIKAT` perlu **snapshot identitas** (nama, NIP, unit kerja) + status sinkronisasi ke SIMPEG (dan SIASN — masa depan) | Diskusi 02/09 sesi 1, Bab 8 PRD |
| 9 | Tabel baru `HELP_TIKET` dan `FAQ` untuk fitur **Pusat Bantuan** | Demo prototipe 02/09 sesi 2 |
| 10 | Login **semi-SSO berbasis NIP** (bukan email/password bebas) | Diskusi 27/08 |
| 11 | Passing grade & bobot penilaian **kustom per pembelajaran** (bukan angka tetap sistem) | Diskusi 27/08 |

---

## 1. PENGGUNA

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| pengguna_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| nip | Varchar(20) | **UNIQUE, NOT NULL** | 🔧 sebelumnya nullable — sekarang wajib karena login **semi-SSO berbasis NIP**, seluruh peserta harus ASN terverifikasi SIMPEG |
| nama_lengkap | Varchar(100) | NOT NULL | Auto-fill dari API SIMPEG saat login pertama |
| email | Varchar(100) | UNIQUE, NULL | 🔧 diubah jadi opsional — bukan lagi jalur registrasi utama |
| kata_sandi_hash | Varchar(255) | NOT NULL | Password default sebelum diganti peserta (semi-SSO) |
| peran | Enum('admin_bkpsdm','admin_komunitas','peserta') | NOT NULL, DEFAULT 'peserta' | 🔧 role baru default **peserta** (ADM-2) |
| jabatan | Varchar(150) | NULL | 🆕 auto-fill dari SIMPEG |
| **rumpun_jabatan** | Enum('JPT','JA','JF','Pelaksana') | NULL | 🆕 ditarik dari SIMPEG — dasar filter katalog otomatis (PST-2) |
| **sub_bidang_jf** | Varchar(100) | NULL | 🆕 hanya terisi bila `rumpun_jabatan = 'JF'` (mis. kesehatan, pertanian) |
| unit_kerja | Varchar(150) | NULL | 🆕 auto-fill dari SIMPEG, tampil di sertifikat |
| status | Enum('aktif','nonaktif') | NOT NULL, DEFAULT 'aktif' | |
| external_auth_id | Varchar(100) | UNIQUE, NULL | Disiapkan untuk SSO SIASN penuh (Fase Lanjutan) |
| dibuat_pada | Timestamp | NOT NULL | |
| diperbarui_pada | Timestamp | NOT NULL | |

**Index tambahan:** `INDEX(rumpun_jabatan)` — dipakai di hampir setiap query katalog/filter peserta.

> ⚠️ **Catatan desain:** `sub_bidang_jf` di sini adalah data profil pengguna (dari SIMPEG). Untuk pencatatan sub-bidang *yang dipilih peserta saat mendaftar komunitas* (PST-3, bisa beda dari default profil), field terpisah disiapkan di `PENDAFTARAN_PEMBELAJARAN` (lihat tabel 15).

---

## 2. KOMUNITAS

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| komunitas_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| dibuat_oleh_pengguna_id | Bigint unsigned | FK → PENGGUNA.pengguna_id, NOT NULL | |
| nama_komunitas | Varchar(100) | NOT NULL, UNIQUE | ~83–100 komunitas (ADM-4) |
| deskripsi | Text | NULL | |
| **rumpun_jabatan** | Enum('JPT','JA','JF','Pelaksana') | NOT NULL | 🆕 setiap komunitas dipetakan ke 1 rumpun jabatan |
| **sub_bidang_tersedia_json** | Json | NULL | 🆕 daftar opsi dropdown sub-bidang, hanya relevan bila `rumpun_jabatan = 'JF'` |
| status | Enum('aktif','nonaktif') | NOT NULL, DEFAULT 'aktif' | |
| dibuat_pada | Timestamp | NOT NULL | |
| diperbarui_pada | Timestamp | NOT NULL | |

**Index tambahan:** `INDEX(rumpun_jabatan)`.

---

## 3. ADMIN_KOMUNITAS *(tidak berubah dari v2)*

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| admin_komunitas_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| komunitas_id | Bigint unsigned | FK → KOMUNITAS.komunitas_id, NOT NULL | |
| pengguna_id | Bigint unsigned | FK → PENGGUNA.pengguna_id, NOT NULL | |
| ditetapkan_pada | Timestamp | NOT NULL | |

**Constraint:** `UNIQUE(komunitas_id, pengguna_id)`.

---

## 4. PEMBELAJARAN

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| pembelajaran_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| komunitas_id | Bigint unsigned | FK → KOMUNITAS.komunitas_id, NOT NULL | |
| dirancang_oleh_pengguna_id | Bigint unsigned | FK → PENGGUNA.pengguna_id, NOT NULL | Jejak audit permanen (lihat pembahasan sebelumnya) |
| judul_pembelajaran | Varchar(255) | NOT NULL | |
| deskripsi | Text | NULL | |
| kategori | Varchar(100) | NULL | |
| **capaian_pembelajaran** | Text | NOT NULL | 🆕 CP — wajib diisi (KOM-1) |
| nama_narasumber | Varchar(100) | NULL | |
| nilai_kelulusan | Decimal(5,2) | NOT NULL, **CHECK (0-100)** | 🔧 passing grade level pembelajaran, kustom per Admin Komunitas — dipakai sebagai default/acuan untuk `POST_TEST.nilai_kelulusan` di bawah agar tidak dobel-input |
| **ringkasan_materi** | Text | NOT NULL | 🆕 pengganti tinjauan bab-per-bab (arahan Tim Ahli LAN RI) |
| **surat_pernyataan_url** | Varchar(500) | NULLABLE | 🆕 dokumen keabsahan konten, ditandatangani kepala dinas | bersifat opsional
| status | Enum('draft','menunggu_approval','dipublikasikan') | NOT NULL, DEFAULT 'draft' | 🔧 **disederhanakan dari 6 state jadi 3** — approval 1 tahap, tidak berlapis (arahan Tim Ahli LAN RI) |
| tanggal_mulai | Date | NULL | |
| tanggal_selesai | Date | NULL | |
| dipublikasikan_pada | Timestamp | NULL | |
| dibuat_pada | Timestamp | NOT NULL | |
| diperbarui_pada | Timestamp | NOT NULL | |

**Index tambahan:** `INDEX(komunitas_id, status)`, `INDEX(tanggal_mulai, tanggal_selesai)`.

> 🔧 **Kolom yang dihapus dari draft v2:** `durasi_jpl` (Int) — digantikan sepenuhnya oleh tabel `PEMBELAJARAN_JP` di bawah, karena JP kini dihitung otomatis per jenis pelatihan, bukan angka tunggal manual.

---

## 5. PEMBELAJARAN_JP 🆕

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| pembelajaran_jp_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pembelajaran_id | Bigint unsigned | FK → PEMBELAJARAN.pembelajaran_id, NOT NULL | |
| jenis_pelatihan | Enum('formal','bimtek','coaching','mentoring') | NOT NULL | Menentukan juknis batas JP yang berlaku (ADM-6) |
| durasi_menit | Int unsigned | NOT NULL | Total durasi materi (dijumlah dari `MODUL.durasi_total_menit`) |
| jp_dihitung_sistem | Decimal(4,2) | NOT NULL | = `durasi_menit ÷ 135`, dihitung otomatis (ADM-10) |
| jp_final | Decimal(4,2) | NULL | Nilai JP setelah diverifikasi BKPSDM (bisa disesuaikan sesuai juknis) |
| diverifikasi_oleh_bkpsdm | Boolean | NOT NULL, DEFAULT false | |
| diverifikasi_pada | Timestamp | NULL | |

**Constraint:** `UNIQUE(pembelajaran_id)` — asumsi 1 pembelajaran = 1 jenis pelatihan. *(Perlu dikonfirmasi ke BKPSDM: apakah 1 pembelajaran bisa punya lebih dari 1 jenis pelatihan sekaligus — jika ya, ganti jadi `UNIQUE(pembelajaran_id, jenis_pelatihan)`.)*

> ⚠️ Formula "maks 3 JP per modul" secara teknis dihitung di level `MODUL` (field `jp_modul` — lihat tabel 7), lalu dijumlahkan ke `durasi_menit`/`jp_dihitung_sistem` di sini pada level pembelajaran. Nomor regulasi resmi acuan ("Perlang No. 12/8") masih **TBD** (Bab 12 PRD) — field ini tidak memblokir implementasi, hanya perlu dicatat sebagai referensi hukum nanti.

---

## 6. VALIDASI_PEMBELAJARAN 🔧 *(disederhanakan — bukan dihapus)*

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| validasi_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pembelajaran_id | Bigint unsigned | FK → PEMBELAJARAN.pembelajaran_id, NOT NULL | |
| divalidasi_oleh_pengguna_id | Bigint unsigned | FK → PENGGUNA.pengguna_id, NOT NULL | |
| status_validasi | Enum('diajukan','disetujui','ditolak') | NOT NULL | |
| catatan | Text | NULL | |
| divalidasi_pada | Timestamp | NOT NULL | |

**Perubahan sikap desain:** tabel ini **tetap dipertahankan** (bukan dihapus) karena histori kapan/oleh siapa suatu pembelajaran disetujui tetap perlu dicatat untuk audit — **tapi** prosesnya kini murni **1 baris per pengajuan** (bukan siklus review berlapis-lapis). Ini selaras arahan Tim Ahli LAN RI: *"mekanisme tetap ada tapi ringan"*, bukan dihapus sama sekali.

---

## 7. MODUL

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| modul_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pembelajaran_id | Bigint unsigned | FK → PEMBELAJARAN.pembelajaran_id, NOT NULL | |
| judul_modul | Varchar(255) | NOT NULL | |
| **gambaran_umum** | Text | NOT NULL | 🆕 unsur wajib #1 (standar LAN) |
| **evaluasi_deskripsi** | Text | NULL | 🆕 unsur wajib #3 — deskripsi evaluasi modul (detail soal ada di `KUIS`/`SOAL_KUIS`) |
| urutan | Int unsigned | NOT NULL | |
| **durasi_total_menit** | Int unsigned | NOT NULL, DEFAULT 0 | 🆕 dijumlah otomatis dari `MATERI.durasi_menit` dalam modul ini |
| **jp_modul** | Decimal(3,2) | NOT NULL, **CHECK (jp_modul ≤ 3)** | 🆕 = `durasi_total_menit ÷ 135`, dibatasi maks 3 JP/modul (aturan LAN) |
| **info_tatap_muka** | Text | NULL | 🆕 jadwal/keterangan sesi *blended* luring (opsional, KOM-10) |
| dibuat_pada | Timestamp | NOT NULL | |

**Constraint:** `UNIQUE(pembelajaran_id, urutan)`.

> 🔧 **Unsur "Substansi Materi"** (unsur wajib #2) tidak butuh kolom tersendiri — otomatis terpenuhi selama modul punya ≥1 baris di `MATERI`. Validasi "3 unsur lengkap" (`gambaran_umum` terisi + ≥1 materi + `evaluasi_deskripsi`/kuis ada) dilakukan di level aplikasi sebelum tombol "Ajukan Approval" bisa ditekan (KOM-8), bukan lewat kolom boolean `has_*` terpisah — lebih sederhana dan tidak berisiko out-of-sync dengan data aslinya.

---

## 8. MATERI

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| materi_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| modul_id | Bigint unsigned | FK → MODUL.modul_id, NOT NULL | |
| judul_materi | Varchar(255) | NOT NULL | |
| tipe_materi | Enum('pdf','video_embed') | NOT NULL | 🔧 `video` diganti `video_embed` — tegaskan tidak ada upload file video |
| tautan_atau_berkas | Varchar(500) | NOT NULL | URL cloud storage (PDF) atau URL embed (YouTube dll.) |
| **durasi_menit** | Int unsigned | NOT NULL | 🆕 wajib diisi — dasar perhitungan JP modul & estimasi waktu baca/tonton |
| apakah_wajib | Boolean | NOT NULL, DEFAULT true | |
| urutan | Int unsigned | NOT NULL | |
| dibuat_pada | Timestamp | NOT NULL | |

**Constraint:** `UNIQUE(modul_id, urutan)`.
**Trigger/aplikasi:** setiap insert/update/delete `MATERI.durasi_menit` harus memicu rekalkulasi `MODUL.durasi_total_menit` dan `MODUL.jp_modul`.

---

## 9. KUIS *(kuis per modul)*

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| kuis_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| modul_id | Bigint unsigned | FK → MODUL.modul_id, NOT NULL, **UNIQUE** | 🔧 ditambah `UNIQUE` — 1 modul = 1 kuis (dikonfirmasi via alur bisnis "kuis per modul") |
| judul_kuis | Varchar(200) | NOT NULL | |
| nilai_kelulusan | Decimal(5,2) | NOT NULL, **CHECK (0-100)** | Kustom per modul sesuai bobot Admin Komunitas |
| **maks_percobaan** | Int unsigned | NOT NULL, DEFAULT 3 | 🆕 (KOM-4, PST-6) |
| **acak_soal** | Boolean | NOT NULL, DEFAULT true | 🆕 randomize urutan soal tiap percobaan |
| **tampilkan_kunci_setelah** | Boolean | NOT NULL, DEFAULT true | 🆕 tampilkan pembahasan/kunci setelah tes selesai |
| dibuat_pada | Timestamp | NOT NULL | |

---

## 10. SOAL_KUIS

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| soal_kuis_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| kuis_id | Bigint unsigned | FK → KUIS.kuis_id, NOT NULL | |
| teks_soal | Text | NOT NULL | |
| pilihan_jawaban_json | Json | NOT NULL | |
| kunci_jawaban | Varchar(10) | NOT NULL | |
| **bobot_nilai** | Decimal(5,2) | NOT NULL, DEFAULT 1 | 🆕 mendukung "bobot penilaian dapat dikustomisasi" (KOM-4) — bukan semua soal bernilai sama rata |
| terkunci | Boolean | NOT NULL, DEFAULT false | Dari v2 — cegah edit soal yang sudah dipakai peserta |
| dibuat_pada | Timestamp | NOT NULL | |

---

## 11. RIWAYAT_KUIS

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| riwayat_kuis_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| kuis_id | Bigint unsigned | FK → KUIS.kuis_id, NOT NULL | |
| pendaftaran_id | Bigint unsigned | FK → PENDAFTARAN_PEMBELAJARAN.pendaftaran_id, NOT NULL | |
| percobaan_ke | Int unsigned | NOT NULL, **CHECK (percobaan_ke ≤ 3)** | 🔧 ditambah CHECK selaras batas maks 3 percobaan |
| nilai | Decimal(5,2) | NOT NULL, CHECK (0-100) | |
| apakah_lulus | Boolean | NOT NULL | |
| jawaban_peserta_json | Json | NOT NULL | |
| snapshot_soal_json | Json | NOT NULL | Termasuk urutan soal teracak versi peserta ini — penting untuk audit karena `acak_soal = true` |
| dikerjakan_pada | Timestamp | NOT NULL | |

**Constraint:** `UNIQUE(kuis_id, pendaftaran_id, percobaan_ke)`.
**Aplikasi wajib menolak** percobaan baru jika `percobaan_ke > KUIS.maks_percobaan`.

---

## 12. POST_TEST

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| post_test_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pembelajaran_id | Bigint unsigned | FK → PEMBELAJARAN.pembelajaran_id, NOT NULL, **UNIQUE** | 1 pembelajaran = 1 post test |
| nilai_kelulusan | Decimal(5,2) | NOT NULL, CHECK (0-100) | Kustom, bisa mengikuti/override `PEMBELAJARAN.nilai_kelulusan` |
| maks_percobaan | Int unsigned | NOT NULL, DEFAULT 3 | (KOM-5) |
| **acak_soal** | Boolean | NOT NULL, DEFAULT true | 🆕 |
| **tampilkan_kunci_setelah** | Boolean | NOT NULL, DEFAULT true | 🆕 |
| durasi_menit | Int unsigned | NULL | Dari v2 |
| dibuat_pada | Timestamp | NOT NULL | |

---

## 13. SOAL_POST_TEST

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| soal_post_test_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| post_test_id | Bigint unsigned | FK → POST_TEST.post_test_id, NOT NULL | |
| teks_soal | Text | NOT NULL | |
| pilihan_jawaban_json | Json | NOT NULL | |
| kunci_jawaban | Varchar(10) | NOT NULL | |
| **bobot_nilai** | Decimal(5,2) | NOT NULL, DEFAULT 1 | 🆕 sama alasan dengan `SOAL_KUIS.bobot_nilai` |
| terkunci | Boolean | NOT NULL, DEFAULT false | |
| dibuat_pada | Timestamp | NOT NULL | |

---

## 14. RIWAYAT_POST_TEST

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| riwayat_post_test_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| post_test_id | Bigint unsigned | FK → POST_TEST.post_test_id, NOT NULL | |
| pendaftaran_id | Bigint unsigned | FK → PENDAFTARAN_PEMBELAJARAN.pendaftaran_id, NOT NULL | |
| percobaan_ke | Int unsigned | NOT NULL, **CHECK (percobaan_ke ≤ 3)** | 🔧 |
| nilai | Decimal(5,2) | NOT NULL, CHECK (0-100) | |
| apakah_lulus | Boolean | NOT NULL | |
| jawaban_peserta_json | Json | NOT NULL | |
| snapshot_soal_json | Json | NOT NULL | |
| dikirim_pada | Timestamp | NOT NULL | |

**Constraint:** `UNIQUE(post_test_id, pendaftaran_id, percobaan_ke)`.

---

## 15. PENDAFTARAN_PEMBELAJARAN

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| pendaftaran_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pengguna_id | Bigint unsigned | FK → PENGGUNA.pengguna_id, NOT NULL | |
| pembelajaran_id | Bigint unsigned | FK → PEMBELAJARAN.pembelajaran_id, NOT NULL | |
| **sub_bidang_dipilih** | Varchar(100) | NULL | 🆕 (PST-3) dropdown sub-bidang JF **saat mendaftar** — disimpan terpisah dari `PENGGUNA.sub_bidang_jf` karena peserta bisa memilih sub-bidang berbeda per pendaftaran komunitas |
| persentase_progres | Decimal(5,2) | NOT NULL, DEFAULT 0, CHECK (0-100) | Derived dari `PROGRES_MATERI` |
| status_pendaftaran | Enum('terdaftar','sedang_berjalan','menunggu_post_test','lulus','tidak_lulus','selesai') | NOT NULL, DEFAULT 'terdaftar' | 🔧 nilai `'sedang_berjalan'` mengikuti istilah PRD Bab 7.2 ("Sedang Berjalan") |
| terdaftar_pada | Timestamp | NOT NULL | |
| diselesaikan_pada | Timestamp | NULL | |

**Constraint:** `UNIQUE(pengguna_id, pembelajaran_id)`.
**Aturan aplikasi (PST-2):** insert ke tabel ini **wajib divalidasi** bahwa `PENGGUNA.rumpun_jabatan` = `KOMUNITAS.rumpun_jabatan` milik `PEMBELAJARAN` terkait — bukan hanya dicek di UI, tapi juga di service layer agar tidak bisa dilewati lewat API langsung.

---

## 16. PROGRES_MODUL *(tidak berubah dari v2)*

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| progres_modul_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pendaftaran_id | Bigint unsigned | FK → PENDAFTARAN_PEMBELAJARAN.pendaftaran_id, NOT NULL | |
| modul_id | Bigint unsigned | FK → MODUL.modul_id, NOT NULL | |
| status | Enum('belum_mulai','sedang_berjalan','selesai') | NOT NULL, DEFAULT 'belum_mulai' | |
| diperbarui_pada | Timestamp | NOT NULL | |

**Constraint:** `UNIQUE(pendaftaran_id, modul_id)`.

---

## 17. PROGRES_MATERI *(tidak berubah dari v2)*

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| progres_materi_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pendaftaran_id | Bigint unsigned | FK → PENDAFTARAN_PEMBELAJARAN.pendaftaran_id, NOT NULL | |
| materi_id | Bigint unsigned | FK → MATERI.materi_id, NOT NULL | |
| apakah_selesai | Boolean | NOT NULL, DEFAULT false | |
| diselesaikan_pada | Timestamp | NULL | |

**Constraint:** `UNIQUE(pendaftaran_id, materi_id)`.

---

## 18. SERTIFIKAT

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| sertifikat_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pendaftaran_id | Bigint unsigned | FK → PENDAFTARAN_PEMBELAJARAN.pendaftaran_id, NOT NULL, UNIQUE | |
| nomor_sertifikat | Varchar(100) | NOT NULL, UNIQUE | Format final **TBD** (Bab 12 PRD) |
| **nama_lengkap_snapshot** | Varchar(100) | NOT NULL | 🆕 salinan permanen saat terbit — data di `PENGGUNA` bisa berubah, sertifikat tidak boleh ikut berubah |
| **nip_snapshot** | Varchar(20) | NOT NULL | 🆕 idem |
| **unit_kerja_snapshot** | Varchar(150) | NULL | 🆕 idem |
| tanggal_terbit | Date | NOT NULL | |
| tautan_berkas | Varchar(500) | NOT NULL | |
| **simpeg_sync_status** | Enum('menunggu','tersinkron','gagal') | NOT NULL, DEFAULT 'menunggu' | 🆕 wajib (PST-11) — sinkron otomatis begitu terbit |
| **siasn_sync_status** | Enum('menunggu','tersinkron','gagal','tidak_berlaku') | NULL | 🆕 Fase Lanjutan (masih "dalam koordinasi") |
| qr_signature_hash | Varchar(255) | NULL | Fase Lanjutan (BSrE) |
| dibuat_pada | Timestamp | NOT NULL | |

> 🆕 **Kenapa snapshot identitas perlu ditambahkan:** PRD Bab 8/PST-12 menegaskan sertifikat memuat nama, NIP, unit kerja peserta. Karena data ini aslinya ada di `PENGGUNA` (bisa berubah — pindah unit kerja, ganti nama), sertifikat yang **sudah terbit** harus tetap menampilkan data **pada saat kelulusan**, bukan data unit kerja peserta yang mungkin sudah berbeda di kemudian hari.

---

## 19. ULASAN_PEMBELAJARAN *(tidak berubah dari v2)*

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| ulasan_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pendaftaran_id | Bigint unsigned | FK → PENDAFTARAN_PEMBELAJARAN.pendaftaran_id, NOT NULL, **UNIQUE** | |
| skor_rating | Tinyint unsigned | NOT NULL, CHECK (1-5) | |
| teks_ulasan | Text | NULL | |
| dikirim_pada | Timestamp | NOT NULL | |

---

## 20. ULASAN_SISTEM *(dipertahankan — beda fungsi dari HELP_TIKET)*

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| ulasan_sistem_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pengguna_id | Bigint unsigned | FK → PENGGUNA.pengguna_id, NOT NULL | |
| skor_rating | Tinyint unsigned | NOT NULL, CHECK (1-5) | |
| kategori | Varchar(100) | NULL | |
| catatan_keluhan | Text | NULL | |
| dikirim_pada | Timestamp | NOT NULL | |

> **Beda dengan `HELP_TIKET` di bawah:** tabel ini untuk **rating kepuasan umum** (data statistik, tidak butuh tindak lanjut/status resolusi). `HELP_TIKET` untuk **keluhan spesifik yang butuh ditangani** satu per satu oleh Admin BKPSDM (ADM-11).

---

## 21. HELP_TIKET 🆕 *(Pusat Bantuan)*

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| help_tiket_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pengguna_id | Bigint unsigned | FK → PENGGUNA.pengguna_id, NOT NULL | |
| subjek | Varchar(200) | NOT NULL | |
| deskripsi | Text | NOT NULL | |
| status | Enum('terbuka','diproses','selesai') | NOT NULL, DEFAULT 'terbuka' | (PST-14, ADM-11) |
| ditangani_oleh_pengguna_id | Bigint unsigned | FK → PENGGUNA.pengguna_id, NULL | Admin BKPSDM yang menindaklanjuti |
| dibuat_pada | Timestamp | NOT NULL | |
| diselesaikan_pada | Timestamp | NULL | |

**Index:** `INDEX(status)` — untuk daftar tiket yang masih perlu ditangani.

---

## 22. FAQ 🆕 *(Pusat Bantuan)*

| Field | Tipe | Constraint | Keterangan |
| --- | --- | --- | --- |
| faq_id | Bigint unsigned | PK, AUTO_INCREMENT | |
| pertanyaan | Varchar(255) | NOT NULL | |
| jawaban | Text | NOT NULL | |
| kategori | Varchar(100) | NULL | |
| urutan | Int unsigned | NOT NULL, DEFAULT 0 | Urutan tampil di halaman FAQ |
| dibuat_oleh_pengguna_id | Bigint unsigned | FK → PENGGUNA.pengguna_id, NOT NULL | Admin BKPSDM (ADM-11) |
| dibuat_pada | Timestamp | NOT NULL | |

---

## Peta Relasi Antar Tabel (Lengkap — v3)

Notasi: `1:N` = satu ke banyak, `1:1` = satu ke satu, `N:M` = banyak ke banyak (via tabel relasi). Baris bertanda 🆕/🔧 adalah relasi baru atau yang berubah dari v2 — sisanya identik dengan peta v2.

| Tabel Induk | Tabel Anak | Jenis Relasi | FK Penghubung | Keterangan |
| --- | --- | --- | --- | --- |
| PENGGUNA | KOMUNITAS | 1:N | `KOMUNITAS.dibuat_oleh_pengguna_id` | 1 Admin BKPSDM bisa membuat banyak komunitas |
| PENGGUNA ↔ KOMUNITAS | — | N:M (via `ADMIN_KOMUNITAS`) | `ADMIN_KOMUNITAS.pengguna_id` + `.komunitas_id` | Penugasan admin komunitas — bisa berubah tanpa mempengaruhi histori |
| PENGGUNA | PEMBELAJARAN | 1:N | `PEMBELAJARAN.dirancang_oleh_pengguna_id` | Jejak audit pembuat konten, permanen |
| PENGGUNA | VALIDASI_PEMBELAJARAN | 1:N | `VALIDASI_PEMBELAJARAN.divalidasi_oleh_pengguna_id` | 1 Admin BKPSDM bisa melakukan banyak validasi (kini 1 tahap per pengajuan) |
| PENGGUNA | PENDAFTARAN_PEMBELAJARAN | 1:N | `PENDAFTARAN_PEMBELAJARAN.pengguna_id` | 1 peserta mendaftar banyak pembelajaran |
| PENGGUNA | ULASAN_SISTEM | 1:N | `ULASAN_SISTEM.pengguna_id` | |
| 🆕 PENGGUNA | HELP_TIKET (pengajuan) | 1:N | `HELP_TIKET.pengguna_id` | 1 peserta bisa mengajukan banyak tiket (PST-14) |
| 🆕 PENGGUNA | HELP_TIKET (penanganan) | 1:N | `HELP_TIKET.ditangani_oleh_pengguna_id` | 1 Admin BKPSDM menangani banyak tiket (ADM-11) |
| 🆕 PENGGUNA | FAQ | 1:N | `FAQ.dibuat_oleh_pengguna_id` | 1 Admin BKPSDM membuat banyak entri FAQ |
| KOMUNITAS | PEMBELAJARAN | 1:N | `PEMBELAJARAN.komunitas_id` | Aturan bisnis: peserta hanya bisa daftar bila `PENGGUNA.rumpun_jabatan` = `KOMUNITAS.rumpun_jabatan` |
| PEMBELAJARAN | VALIDASI_PEMBELAJARAN | 1:N | `VALIDASI_PEMBELAJARAN.pembelajaran_id` | Tetap bisa lebih dari 1 baris jika pengajuan sempat ditolak lalu diajukan ulang — walau prosesnya kini 1 tahap (tidak berlapis), bukan berarti tidak bisa diajukan lagi |
| 🆕 PEMBELAJARAN | PEMBELAJARAN_JP | **1:1** | `PEMBELAJARAN_JP.pembelajaran_id` (UNIQUE) | 1 pembelajaran = 1 klasifikasi jenis pelatihan & nilai JP (lihat catatan klarifikasi di atas) |
| PEMBELAJARAN | MODUL | 1:N | `MODUL.pembelajaran_id` | |
| PEMBELAJARAN | POST_TEST | **1:1** | `POST_TEST.pembelajaran_id` (UNIQUE) | Ditegaskan jadi constraint resmi di v3 |
| PEMBELAJARAN | PENDAFTARAN_PEMBELAJARAN | 1:N | `PENDAFTARAN_PEMBELAJARAN.pembelajaran_id` | |
| MODUL | MATERI | 1:N | `MATERI.modul_id` | Setiap `MATERI.durasi_menit` yang berubah memicu rekalkulasi `MODUL.durasi_total_menit` & `jp_modul` |
| 🔧 MODUL | KUIS | **1:1** (dikoreksi dari 1:N) | `KUIS.modul_id` (UNIQUE) | PRD menegaskan 1 modul = 1 kuis |
| MODUL | PROGRES_MODUL | 1:N | `PROGRES_MODUL.modul_id` | 1 baris per peserta yang mendaftar |
| KUIS | SOAL_KUIS | 1:N | `SOAL_KUIS.kuis_id` | |
| KUIS | RIWAYAT_KUIS | 1:N | `RIWAYAT_KUIS.kuis_id` | Dibatasi maks 3 baris per pendaftaran via `CHECK(percobaan_ke ≤ 3)` + `UNIQUE` |
| POST_TEST | SOAL_POST_TEST | 1:N | `SOAL_POST_TEST.post_test_id` | |
| POST_TEST | RIWAYAT_POST_TEST | 1:N | `RIWAYAT_POST_TEST.post_test_id` | Sama, dibatasi maks 3 percobaan |
| MATERI | PROGRES_MATERI | 1:N | `PROGRES_MATERI.materi_id` | |
| PENDAFTARAN_PEMBELAJARAN | PROGRES_MODUL | 1:N | `PROGRES_MODUL.pendaftaran_id` | |
| PENDAFTARAN_PEMBELAJARAN | PROGRES_MATERI | 1:N | `PROGRES_MATERI.pendaftaran_id` | |
| PENDAFTARAN_PEMBELAJARAN | RIWAYAT_KUIS | 1:N | `RIWAYAT_KUIS.pendaftaran_id` | |
| PENDAFTARAN_PEMBELAJARAN | RIWAYAT_POST_TEST | 1:N | `RIWAYAT_POST_TEST.pendaftaran_id` | |
| PENDAFTARAN_PEMBELAJARAN | SERTIFIKAT | **1:1** | `SERTIFIKAT.pendaftaran_id` (UNIQUE) | + snapshot identitas di `SERTIFIKAT`, independen dari `PENGGUNA` setelah terbit |
| PENDAFTARAN_PEMBELAJARAN | ULASAN_PEMBELAJARAN | **1:1** | `ULASAN_PEMBELAJARAN.pendaftaran_id` (UNIQUE) | |

### Diagram relasi ringkas (notasi teks, versi lengkap v3)

```
PENGGUNA ──1:N──> KOMUNITAS
PENGGUNA <──N:M──> KOMUNITAS         (via ADMIN_KOMUNITAS)
PENGGUNA ──1:N──> PEMBELAJARAN        (dirancang_oleh)
PENGGUNA ──1:N──> VALIDASI_PEMBELAJARAN (divalidasi_oleh)
PENGGUNA ──1:N──> PENDAFTARAN_PEMBELAJARAN
PENGGUNA ──1:N──> ULASAN_SISTEM
PENGGUNA ──1:N──> HELP_TIKET          (pengajuan)
PENGGUNA ──1:N──> HELP_TIKET          (penanganan, ditangani_oleh)
PENGGUNA ──1:N──> FAQ

KOMUNITAS ──1:N──> PEMBELAJARAN

PEMBELAJARAN ──1:N──> VALIDASI_PEMBELAJARAN
PEMBELAJARAN ──1:1──> PEMBELAJARAN_JP
PEMBELAJARAN ──1:N──> MODUL
PEMBELAJARAN ──1:1──> POST_TEST
PEMBELAJARAN ──1:N──> PENDAFTARAN_PEMBELAJARAN

MODUL ──1:N──> MATERI
MODUL ──1:1──> KUIS
MODUL ──1:N──> PROGRES_MODUL

KUIS ──1:N──> SOAL_KUIS
KUIS ──1:N──> RIWAYAT_KUIS

POST_TEST ──1:N──> SOAL_POST_TEST
POST_TEST ──1:N──> RIWAYAT_POST_TEST

MATERI ──1:N──> PROGRES_MATERI

PENDAFTARAN_PEMBELAJARAN ──1:N──> PROGRES_MODUL
PENDAFTARAN_PEMBELAJARAN ──1:N──> PROGRES_MATERI
PENDAFTARAN_PEMBELAJARAN ──1:N──> RIWAYAT_KUIS
PENDAFTARAN_PEMBELAJARAN ──1:N──> RIWAYAT_POST_TEST
PENDAFTARAN_PEMBELAJARAN ──1:1──> SERTIFIKAT
PENDAFTARAN_PEMBELAJARAN ──1:1──> ULASAN_PEMBELAJARAN
```

---

## Poin yang Masih Perlu Klarifikasi ke BKPSDM (mengikuti Bab 12 PRD)

Beberapa keputusan desain di atas diambil dengan asumsi terbaik dari PRD, tapi sebaiknya dikonfirmasi sebelum implementasi:

1. **`PEMBELAJARAN_JP`** — apakah 1 pembelajaran memang selalu 1 jenis pelatihan (formal/bimtek/coaching/mentoring), atau bisa campuran? Ini menentukan apakah constraint-nya `UNIQUE(pembelajaran_id)` atau `UNIQUE(pembelajaran_id, jenis_pelatihan)`.
2. **Batas 3 percobaan** — PRD Bab 12 masih mempertanyakan apakah aturan sama untuk kuis modul *maupun* post test, atau beda ketentuan. Skema ini mengasumsikan **sama** (maks 3 untuk keduanya) — mudah diubah jadi beda nilai default per tabel bila BKPSDM memutuskan lain.
3. **Mekanisme lanjutan pasca-gagal 3x** (Bab 12) — apakah perlu approval manual untuk buka kesempatan ke-4? Jika ya, skema perlu tabel tambahan `PERMOHONAN_KESEMPATAN_TAMBAHAN` untuk mencatat pengajuan & keputusan tersebut — belum dibuat karena masih berstatus TBD.
4. **Format nomor sertifikat** (Bab 12) — kolom `nomor_sertifikat` sudah disiapkan `UNIQUE`, tapi format penomoran (kode unit, bulan romawi, tahun) menunggu kesepakatan final.
5. **Akun untuk Pengarah/Koordinator Pokja** (Bab 12) — bila nanti diputuskan perlu dashboard sendiri, `PENGGUNA.peran` perlu ditambah 1-2 nilai enum baru (mis. `'pengarah'`, `'koordinator_pokja'`).
