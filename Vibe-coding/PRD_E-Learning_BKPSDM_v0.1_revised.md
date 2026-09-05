# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Platform E-Learning BKPSDM ("Buleleng ASN 4U" / Buleleng ASN Belajar)

**STATUS: DRAFT — REVISI 3**

| | |
| --- | --- |
| **Nama Produk** | Platform E-Learning BKPSDM — nama aplikasi/branding: **Buleleng ASN 4U** (disebut juga *Buleleng ASN Belajar*) |
| **Versi Dokumen** | v0.3 |
| **Disusun oleh** | Tim Pengembang Sistem (Pengembang) |
| **Untuk** | BKPSDM (Klien) |
| **Tanggal** | 2 September 2026 (revisi kedua pada hari yang sama) |
| **Dokumen Terkait** | Dokumen Proses Bisnis E-Learning BKPSDM; Notula Diskusi 26/08/2026, 27/08/2026, 02/09/2026 (sesi 1), 02/09/2026 (sesi 2) |

---

## 0. Riwayat Revisi

| Versi | Tanggal | Sumber | Ringkasan Perubahan |
| --- | --- | --- | --- |
| v0.1 | 30 Agu 2026 | Draft awal | Draft awal PRD. |
| v0.2 | 02 Sep 2026 | Diskusi 26/08, 27/08, 02/09/2026 (sesi 1) | Lihat rincian per tanggal di bawah. |
| v0.3 | 02 Sep 2026 | Diskusi 02/09/2026 (sesi 2) — arahan Tim Ahli LAN RI & demo prototipe | Lihat rincian di bawah. |

**Dari diskusi 26/08/2026:**
- Referensi tata letak/alur: *newlearning.kpk.go.id* dan *BKNPedia*.
- Ditegaskan dua jalur akses awal: ASN (auto-fill via API SIMPEG berdasarkan NIP) dan masyarakat umum (form manual) — **catatan:** jalur masyarakat umum ini kemudian **tidak dilanjutkan**; diskusi 27/08 dan 02/09 menegaskan peserta dibatasi khusus ASN terdaftar SIMPEG. Perubahan ini dicatat di sini agar tidak hilang jejaknya.
- Video pembelajaran wajib memakai **embed link** (mis. YouTube), tidak diunggah langsung ke server.
- KKM/passing grade disebut sebagai contoh ("misal nilai 70"), bukan angka final.
- Perlu mekanisme remedial: pengulangan tes dengan **urutan soal diacak (randomize)** dan pembahasan/kunci jawaban ditampilkan setelah tes.
- BKPSDM menyiapkan satu modul percontohan (Komunitas Belajar ASDMA) untuk uji coba sistem.
- Perlu finalisasi *business process*, *flowchart*, *use case diagram*, dan *activity diagram* sebelum UI/UX & coding — juga menjadi syarat pengajuan subdomain ke Kominfosandi (dokumen SDLC).

**Dari diskusi 27/08/2026:**
- Peserta **dibatasi khusus ASN** yang terdaftar di SIMPEG (bukan masyarakat umum).
- Yang divalidasi BKPSDM adalah **konten belajar (manajemen pengetahuan)**, bukan sertifikasi peserta — sertifikat **tidak perlu divalidasi** per peserta (auto-issue).
- Penilaian bersifat **kustom/berbobot** (bobot penilaian ditentukan admin komunitas), bukan angka tetap tunggal.
- Ditambahkan kebutuhan **Form CP (Capaian Pembelajaran)** pada penyusunan pembelajaran.
- Ditegaskan mekanisme **lock**: peserta tidak bisa lanjut sebelum modul sebelumnya selesai; gagal kuis modul → tidak bisa lanjut ke materi berikutnya maupun post test.
- Manajemen user bersifat **semi-SSO** (login berbasis NIP terhubung API SIMPEG), bukan SSO penuh di tahap ini.
- Skala sistem: **±15.000 ASN**, wajib tampilan responsif mobile.

**Dari diskusi 02/09/2026:**
- Nama aplikasi disepakati: **Buleleng ASN 4U / Buleleng ASN Belajar**, subdomain `bulelengasn4u.bulelengkab.go.id`.
- **Batas percobaan pengerjaan (attempt) dibatasi maksimal 3 kali.**
- Nilai & sertifikat yang selesai diujikan **langsung terintegrasi ke SIMPEG**; integrasi ke **SIASN BKN** diupayakan menyusul (dikoordinasikan Pak Ari ke BKN & Kominfosandi) — statusnya **dalam koordinasi**, bukan otomatis tersedia di rilis awal.
- Ditambahkan **upload surat pernyataan keabsahan konten** (ditandatangani kepala dinas terkait, template disiapkan BKPSDM) sebagai pengganti review modul chapter-by-chapter — BKPSDM cukup meninjau **ringkasan materi + surat pernyataan** saat approval.
- Ekspor laporan monitoring **wajib ke format Excel**, dengan field: nama, NIP, jenis pelatihan, progres, tingkat kelulusan.
- **Struktur komunitas diubah menjadi 4 rumpun jabatan**: JPT (Jabatan Pimpinan Tinggi), JA (Jabatan Administrasi), JF (Jabatan Fungsional), Jabatan Pelaksana. Peserta **difilter otomatis** berdasarkan data jabatan di SIMPEG dan **tidak bisa** mengenroll komunitas di luar rumpun jabatannya. Khusus JF disediakan **dropdown sub-bidang** (kesehatan, pertanian, dll.).
- Admin komunitas dapat menambahkan **JP (Jam Pelajaran/Pelatihan)**, namun **ketentuan/juknis batas maksimal JP per jenis pelatihan** (formal, bimtek, coaching, mentoring) ditentukan BKPSDM; admin komunitas menginput sesuai juknis dan **BKPSDM memverifikasi saat approval**.
- Dashboard Admin BKPSDM diperluas: total peserta, **user aktif**, daftar komunitas, sertifikat **terverifikasi**, **persentase keaktifan komunitas**, **grafik tren modul 6 bulan terakhir**.
- Landing page perlu **header/cover visual** sebelum tampilan menu utama.
- Stack teknis disepakati: **Backend Laravel 13 + MySQL**, **Frontend React**.
- Mulai penyusunan dokumen SDLC; eksekusi teknis revisi dijadwalkan mulai Senin pekan berikutnya.

**Dari diskusi ke-2 tgl 02/09/2026 (Kesiapan Regulasi & Arahan Tim Ahli LAN RI):**
- Struktur kelembagaan pembelajaran ditambahkan sebagai konteks: Pengarah (Bupati/Sekda), Penanggung Jawab (Kepala BKPSDM), Koordinator Pokja (Asisten Sekda), hingga Komunitas Belajar (KomBel) — lihat Bab 1.1 (baru).
- Sedang disusun **Perbup Pengembangan Kompetensi** dan **Keputusan Bupati tentang HCDP** 5 tahunan (selaras RPJMD); materi harus disahkan lewat **Forum Pembelajaran Level Strategis** sebelum harmonisasi ke Kemenkumham/Biro Hukum Provinsi dan konsultasi ke LAN. Nota Kesepakatan dengan LAN RI masih dalam proses review.
- Demo prototipe (mahasiswa magang Undiksha) mengonfirmasi fitur inti PRD (landing page NIP, materi PDF + embed video, kuis dengan remedial maks. 3x, dashboard admin komunitas & BKPSDM) — dan **menambahkan** fitur **Dashboard Personal Peserta** (riwayat pelatihan, capaian JP, sertifikat) serta **Pusat Bantuan (FAQ + tiket keluhan)**.
- **Arahan mitigasi krisis konten (bottom-up) dari Tim Ahli LAN RI:** proses verifikasi/approval **jangan dibuat terlalu kaku/rumit** (termasuk kewajiban tanda tangan formal) pada tahap awal, agar tidak mematikan minat ASN berbagi pengetahuan; komunitas belajar didorong tumbuh organik dari bawah (bottom-up), mis. komunitas guru/K3S, tenaga medis, pengelola keuangan. Ini **melunakkan** ketentuan approval berbasis surat pernyataan pada revisi sebelumnya — surat pernyataan tetap ada namun dibuat sesederhana mungkin dan proses approval tidak berlapis-lapis.
- **Standar struktur modul (sesuai regulasi LAN):** setiap modul wajib memuat minimal 3 unsur — **Gambaran Umum (Overview)**, **Substansi Materi (Modul/Video)**, dan **Evaluasi**.
- **Formula konversi JP (microlearning) ditemukan:** JP = total durasi materi (menit) ÷ 135 menit, dengan batas maksimal **3 JP per modul**. Ini menjawab pertanyaan terbuka juknis JP pada revisi sebelumnya (nomor regulasi acuan — disebut "Perlang No. 12/8" dalam notula — masih perlu dikonfirmasi resminya, lihat Bab 12).
- Disarankan Komunitas Belajar tidak hanya berjalan daring — BKPSDM/OPD difasilitasi mengadakan pertemuan tatap muka berkala (*blended community*).
- **Keamanan sistem:** karena backend Laravel & frontend React, disarankan segera bersurat ke **BSSN** untuk *IT Security Assessment*/*Penetration Testing* (gratis untuk instansi pemerintah) setelah sistem terpasang di subdomain resmi.

---

# 1. Ringkasan Produk (Overview)

Pengelolaan pembelajaran dan peningkatan kompetensi aparatur di lingkungan BKPSDM membutuhkan sistem yang terstruktur, akuntabel, dan dapat dipantau secara terpusat. Selama ini, proses pengelolaan materi pembelajaran, pembagian komunitas belajar, pencatatan progres peserta, pelaksanaan evaluasi (kuis/post test), hingga penerbitan dan distribusi sertifikat memerlukan otomasi sistemik guna meningkatkan efisiensi operasional serta meminimalkan proses manual.

**Buleleng ASN 4U** (Platform E-Learning BKPSDM) dikembangkan sebagai solusi pembelajaran digital terpadu berbasis penyelesaian pembelajaran (*progress-based learning*), **khusus diperuntukkan bagi ASN aktif** di lingkungan Pemkab Buleleng (±15.000 pengguna, tervalidasi via SIMPEG) yang tergabung dalam ±83–100 komunitas belajar yang terbagi ke dalam **empat rumpun jabatan**: JPT, JA, JF, dan Jabatan Pelaksana. Platform ini menyediakan modul manajemen sistem dan master data untuk Admin BKPSDM, modul perancangan kurikulum dan materi (PDF/Video) untuk Admin Komunitas, serta portal pembelajaran mandiri bagi Peserta yang dilengkapi mekanisme kuis per modul, post test kelulusan otomatis (maks. 3 kali percobaan), penerbitan sertifikat elektronik yang tersinkron otomatis ke SIMPEG, dashboard personal & pusat bantuan, dan instrumen evaluasi kepuasan layanan.

Mengacu arahan Tim Ahli LAN RI, pengembangan platform ini menganut pendekatan **bottom-up**: proses verifikasi konten dibuat sesederhana mungkin pada tahap awal agar tidak menghambat inisiatif ASN berbagi pengetahuan, sambil tetap mengikuti standar struktur modul dan konversi JP sesuai regulasi LAN.

## 1.1 Konteks Kelembagaan & Regulasi

Platform ini berjalan di atas struktur kelembagaan dan payung regulasi berikut (di luar cakupan teknis sistem, namun menjadi prasyarat/konteks operasional):

- **Struktur Organisasi Pembelajaran:** Pengarah (Bupati/Sekda) → Penanggung Jawab (Kepala BKPSDM) → Koordinator Pokja (Asisten Sekda) → Komunitas Belajar (KomBel). Peran-peran ini bersifat **kelembagaan/governance**, berbeda dari peran pengguna sistem pada Bab 3 (kecuali jika kemudian diputuskan perlu akun/dashboard tersendiri bagi Pengarah/Koordinator Pokja — masih terbuka, lihat Bab 12).
- **Payung Hukum:** Peraturan Bupati (Perbup) tentang Pengembangan Kompetensi dan Keputusan Bupati tentang *Human Capital Development Plan* (HCDP) 5 tahunan yang diselaraskan dengan RPJMD — saat ini masih dalam penyusunan.
- **Forum Pembelajaran Level Strategis:** Forum pengesahan materi/kebijakan sebelum diproses harmonisasi ke Kemenkumham/Biro Hukum Provinsi dan konsultasi teknis ke LAN RI.
- **Nota Kesepakatan dengan LAN RI:** Draf saat ini masih dalam proses peninjauan di Bagian Kerja Sama dan Biro Hukum LAN RI.

# 2. Tujuan & Sasaran (Goals)

- **Memusatkan Pengelolaan Pembelajaran:** Mengintegrasikan pengelolaan komunitas (per rumpun jabatan), kurikulum, modul materi (PDF/Video), dan evaluasi dalam satu platform terpadu.
- **Menjamin Relevansi Materi dengan Jenjang Karier:** Membatasi akses komunitas belajar sesuai rumpun jabatan (JPT/JA/JF/Pelaksana) peserta berdasarkan data kepegawaian di SIMPEG.
- **Meningkatkan Efektivitas Belajar Mandiri:** Memastikan penguasaan materi secara bertahap melalui penyelesaian modul wajib (mekanisme *lock*) dan kuis per modul sebelum peserta diizinkan mengikuti evaluasi akhir.
- **Mengotomatisasi Evaluasi dan Sertifikasi:** Menerapkan penilaian otomatis (bobot dapat dikustomisasi per pembelajaran) untuk kuis dan post test (maks. 3 kali percobaan), serta menerbitkan sertifikat elektronik secara instan saat peserta lulus, tersinkron otomatis ke SIMPEG.
- **Menyederhanakan Validasi Konten (Pendekatan Bottom-Up):** Memungkinkan BKPSDM memvalidasi kelayakan pembelajaran melalui ringkasan materi dan surat pernyataan keabsahan konten yang **ringan dan tidak berbelit** (bukan tinjauan bab per bab maupun proses berlapis), termasuk verifikasi alokasi JP sesuai juknis — demi mendorong komunitas belajar tumbuh organik dari bawah.
- **Menjaga Standar Kualitas Modul:** Memastikan setiap modul memuat struktur minimal sesuai regulasi LAN (Gambaran Umum, Substansi Materi, Evaluasi) dan konversi JP dihitung otomatis dan konsisten.
- **Menyediakan Transparansi Monitoring & Laporan:** Menyajikan data analitik (termasuk tren keaktifan 6 bulan) dan ekspor laporan berbasis Excel bagi Admin BKPSDM dan Admin Komunitas.
- **Menjamin Kualitas Layanan Berkelanjutan:** Menyediakan Dashboard Personal Peserta (riwayat pelatihan, capaian JP, sertifikat) serta Pusat Bantuan (FAQ dan tiket keluhan), selain fitur rating kepuasan layanan.
- **Mendukung Pembelajaran Campuran (Blended):** Memberi ruang bagi komunitas belajar untuk mencantumkan informasi kegiatan tatap muka/luring sebagai pelengkap pembelajaran daring.

# 3. Pengguna & Peran (Users & Roles)

- **Admin BKPSDM (Super Admin):** Pengelola tingkat pusat yang berwenang mengelola manajemen user, master data komunitas & rumpun jabatan, penugasan Admin Komunitas, validasi konten belajar (ringkasan + surat pernyataan) dan verifikasi JP, monitoring performa platform secara global, serta penarikan laporan menyeluruh (termasuk ekspor Excel).
- **Admin Komunitas:** Pengelola unit komunitas (mewakili rumpun profesi/fungsional tertentu, mis. Dokter, PBJ, Pengawas, dll.) yang berwenang merancang program pembelajaran (termasuk Capaian Pembelajaran/CP), menyusun modul, mengunggah materi (PDF dan tautan video), menyusun kuis per modul dan post test akhir, menentukan bobot penilaian serta kuota kesempatan pengerjaan (maks. 3x), menginput JP sesuai juknis BKPSDM, mengunggah surat pernyataan keabsahan konten, dan memantau peserta di bawah komunitasnya.
- **Peserta (khusus ASN):** Pengguna akhir yang **terbatas pada ASN aktif terdaftar di SIMPEG**. Katalog pembelajaran yang tampil bagi peserta **otomatis difilter sesuai rumpun jabatannya** (JPT/JA/JF/Pelaksana); khusus rumpun JF, peserta memilih sub-bidang (kesehatan, pertanian, dll.) melalui dropdown saat mendaftar komunitas. Peserta berwenang mempelajari modul dan materi, mengerjakan kuis per modul, mengikuti post test setelah progres 100%, melihat serta mengunduh sertifikat elektronik kelulusan, dan memberikan rating serta keluhan kepuasan layanan.

> **Catatan revisi:** Draft awal (mengacu diskusi 26/08) sempat mempertimbangkan jalur pendaftaran mandiri untuk masyarakat umum. Berdasarkan diskusi 27/08 dan 02/09, jalur ini **tidak dilanjutkan** — seluruh peserta wajib ASN terverifikasi SIMPEG.

# 4. Ruang Lingkup (Scope)

## 4.1 Termasuk (MVP)

- **Manajemen User & Role:** Pengelolaan akun Admin BKPSDM, Admin Komunitas, dan Peserta (tambah, ubah, aktif/nonaktif, reset password). Login peserta bersifat **semi-SSO**: NIP + password default, dengan data profil (nama, jabatan, unit kerja) ditarik otomatis via API SIMPEG. Pengguna baru secara default di-assign sebagai role **Peserta**.
- **Manajemen Komunitas Berbasis Rumpun Jabatan:** Pembuatan master data komunitas (±83–100 komunitas) yang dikelompokkan ke dalam 4 rumpun jabatan (JPT, JA, JF, Jabatan Pelaksana), penetapan penanggung jawab Admin Komunitas, dan konfigurasi sub-bidang untuk rumpun JF. Akses enroll peserta dibatasi otomatis sesuai rumpun jabatannya berdasarkan data SIMPEG.
- **Perancangan Pembelajaran & Modul:** Penyusunan informasi pembelajaran (judul, deskripsi, kategori, narasumber, **Capaian Pembelajaran/CP**, durasi JP, jadwal), penyusunan modul dengan **struktur wajib 3 unsur** (Gambaran Umum/Overview, Substansi Materi berupa PDF/video, dan Evaluasi) serta mekanisme *lock* (materi berikutnya baru terbuka setelah materi/kuis sebelumnya tuntas), unggah materi PDF dan **video via embed link eksternal** (mis. YouTube) — bukan unggah file video langsung ke server, dan opsi mencantumkan informasi kegiatan tatap muka/luring (*blended community*).
- **Validasi Konten & Approval Publikasi (Ringan, Bottom-Up):** Admin Komunitas mengunggah **ringkasan materi** dan **surat pernyataan keabsahan konten** (template ringkas dari BKPSDM) beserta input JP sesuai juknis. Sesuai arahan Tim Ahli LAN RI, BKPSDM meninjau ringkasan + surat pernyataan + kesesuaian JP secara **cepat dan tidak berlapis** (bukan tinjauan bab per bab, dan bukan birokrasi verifikasi yang kaku) sebelum status pembelajaran berubah menjadi Published.
- **Perhitungan JP Otomatis:** Sistem menghitung konversi JP secara otomatis dengan formula **JP = total durasi materi (menit) ÷ 135 menit**, dengan batas maksimal 3 JP per modul, sesuai regulasi LAN.
- **Evaluasi Pembelajaran (Kuis & Post Test):** Penyusunan dan pengerjaan kuis per modul serta post test akhir dengan bobot/passing grade yang dapat dikustomisasi per pembelajaran oleh Admin Komunitas, **urutan soal diacak (randomize)**, pembahasan/kunci jawaban ditampilkan setelah tes selesai, dan **batas maksimal 3 kali percobaan**.
- **Pelacakan Progres Otomatis:** Perhitungan persentase penyelesaian materi wajib dari 0% hingga 100% untuk pembukaan akses post test, dengan mekanisme *lock* yang mencegah peserta melompati materi/kuis yang belum tuntas.
- **Penerbitan Sertifikat Elektronik Otomatis & Sinkronisasi SIMPEG:** Pembuatan dan pengunduhan file sertifikat digital (memuat nama lengkap, NIP, unit kerja) bagi peserta yang dinyatakan lulus post test, **tersinkron otomatis ke basis data SIMPEG** begitu diterbitkan. Tidak memerlukan validasi manual per sertifikat oleh admin.
- **Dashboard Personal Peserta:** Halaman personal berisi riwayat pelatihan aktif, capaian JP kumulatif, dan daftar sertifikat milik peserta.
- **Pusat Bantuan:** Fitur FAQ (pertanyaan umum) dan sistem tiket keluhan bagi peserta.
- **Dashboard & Laporan:** Dashboard Admin BKPSDM menampilkan total peserta, user aktif, daftar komunitas, sertifikat terverifikasi, persentase keaktifan komunitas, dan grafik tren modul 6 bulan terakhir. Fitur ekspor laporan monitoring **ke format Excel** berdasarkan nama, NIP, jenis pelatihan, progres, dan tingkat kelulusan, dengan filter tambahan (komunitas, periode, status sertifikat).
- **Landing Page:** Halaman awal dengan header/cover visual representatif dan akses masuk berbasis NIP sebelum pengguna masuk ke menu utama.
- **Rating & Ulasan Kepuasan:** Formulir pengisian rating kepuasan dan pencatatan keluhan peserta terhadap layanan pembelajaran (terintegrasi dengan Pusat Bantuan).

## 4.2 Di Luar Lingkup Awal / Fase Lanjutan

- Integrasi tanda tangan digital tersertifikasi pihak ketiga (BSrE) pada sertifikat.
- **SSO penuh** dengan SIASN BKN untuk otentikasi login (login MVP tetap semi-SSO berbasis NIP + API SIMPEG untuk data profil). Integrasi skor/sertifikat ke **SIASN BKN** saat ini berstatus **dalam koordinasi** (Pak Ari ↔ BKN & Kominfosandi) dan ditargetkan menyusul setelah integrasi SIMPEG berjalan.
- Forum diskusi interaktif real-time.
- Evaluasi awal komprehensif (Pre-Test).

(lihat Bab 11 untuk rincian)

# 5. Asumsi & Batasan (Assumptions & Constraints)

- **Asumsi Pengembang:** Sistem dibangun berbasis web responsif (Backend **Laravel 13 + MySQL**, Frontend **React**) yang dapat diakses secara optimal melalui browser modern pada desktop, tablet, maupun perangkat mobile — tanpa aplikasi mobile native terpisah.
- **Asumsi Pengembang:** Berkas materi PDF, surat pernyataan, dan file sertifikat elektronik disimpan pada layanan cloud object storage yang aman dan terukur, dengan estimasi kebutuhan ruang simpan awal ±1 TB.
- **Asumsi Skala:** Target pengguna ±15.000 ASN aktif Pemkab Buleleng, tergabung dalam ±83–100 komunitas belajar pada 4 rumpun jabatan (JPT, JA, JF, Pelaksana).
- **Batasan Bisnis:** Peserta wajib menuntaskan seluruh materi wajib hingga progres mencapai 100% (mekanisme *lock* per modul) sebelum tombol akses Post Test diaktifkan oleh sistem.
- **Batasan Bisnis:** Bobot/nilai ambang kelulusan (passing grade) untuk kuis dan post test **dapat dikustomisasi per pembelajaran** oleh Admin Komunitas sesuai juknis BKPSDM (bukan angka tetap tunggal di seluruh sistem).
- **Batasan Bisnis:** Kesempatan pengerjaan kuis/post test **dibatasi maksimal 3 kali percobaan**; setelah gagal, sistem menampilkan urutan soal acak dan pembahasan/kunci jawaban.
- **Batasan Bisnis:** Peserta hanya dapat mengenroll komunitas yang berada pada rumpun jabatannya sendiri; sistem memfilter otomatis berdasarkan data jabatan SIMPEG.
- **Batasan Bisnis:** Video pembelajaran **hanya dalam bentuk tautan embed eksternal** (mis. YouTube), tidak ada unggah file video langsung ke server aplikasi.
- **Batasan Bisnis:** Publikasi pembelajaran oleh Admin Komunitas memerlukan approval BKPSDM berbasis ringkasan materi + surat pernyataan keabsahan konten + verifikasi JP — bukan tinjauan detail per bab, dan dijalankan **seringan/sesederhana mungkin** (satu tahap, tidak berlapis) sesuai arahan Tim Ahli LAN RI agar tidak menghambat minat ASN berbagi pengetahuan.
- **Batasan Bisnis:** Setiap modul wajib memuat minimal 3 unsur — Gambaran Umum (Overview), Substansi Materi (PDF/Video), dan Evaluasi — sesuai standar konten LAN.
- **Batasan Bisnis:** Konversi JP dihitung otomatis dengan formula **total durasi materi (menit) ÷ 135 menit**, dibatasi maksimal 3 JP per modul; nomor regulasi acuan resmi (disebut "Perlang No. 12/8" pada notula) masih perlu dikonfirmasi (lihat Bab 12).
- **Asumsi Pengembang:** Format sertifikat elektronik berupa file PDF yang di-generate dari template resmi yang telah divalidasi oleh BKPSDM, dan secara otomatis disinkronkan ke SIMPEG setelah terbit.
- **Asumsi Proses:** Setelah sistem terpasang di subdomain resmi, BKPSDM/Kominfosandi akan bersurat ke BSSN untuk *IT Security Assessment*/*Penetration Testing* (layanan gratis untuk instansi pemerintah) sebelum go-live penuh.

# 6. Kebutuhan Fungsional (Functional Requirements)

## 6.1 Admin BKPSDM — Manajemen Master Data & Monitoring

| **ID** | **Kebutuhan Fungsional** | **Prioritas** |
| --- | --- | --- |
| **ADM-1** | Admin BKPSDM dapat melihat dashboard statistik platform: total peserta, **user aktif**, daftar komunitas, sertifikat **terverifikasi**, **persentase keaktifan komunitas**, dan **grafik tren modul 6 bulan terakhir**. | **Wajib** |
| **ADM-2** | Admin BKPSDM dapat menambah, mengubah, mengaktifkan/menonaktifkan user, dan melakukan reset password. Role default untuk user baru adalah **Peserta**. | **Wajib** |
| **ADM-3** | Admin BKPSDM dapat menentukan role pengguna dan menetapkan Admin Komunitas pada komunitas tertentu. | **Wajib** |
| **ADM-4** | Admin BKPSDM dapat membuat, memperbarui, dan mengelola daftar komunitas belajar beserta **pemetaannya ke salah satu dari 4 rumpun jabatan** (JPT/JA/JF/Pelaksana), termasuk konfigurasi sub-bidang untuk komunitas rumpun JF. | **Wajib** |
| **ADM-5** | Admin BKPSDM dapat melakukan validasi kelayakan pembelajaran secara **ringan dan satu tahap** berdasarkan **ringkasan materi** dan **surat pernyataan keabsahan konten** yang diunggah Admin Komunitas (bukan tinjauan bab per bab, bukan proses berlapis), sebagai syarat perubahan status menjadi Published. | **Wajib** |
| **ADM-6** | Admin BKPSDM dapat menyusun dan mengelola **juknis batas maksimal JP** per jenis pelatihan (formal, bimtek, coaching, mentoring), serta memverifikasi input JP dari Admin Komunitas saat proses approval berdasarkan hasil hitung otomatis sistem (lihat ADM-10). | **Wajib** |
| **ADM-7** | Admin BKPSDM dapat memantau seluruh aktivitas pembelajaran, peserta, progres belajar, hasil post test, dan sertifikat dari seluruh komunitas. | **Wajib** |
| **ADM-8** | Admin BKPSDM dapat menghasilkan dan mengekspor laporan **ke format Excel**, berdasarkan nama, NIP, jenis pelatihan, progres, dan tingkat kelulusan, dengan filter tambahan komunitas, periode, dan status sertifikat. | **Wajib** |
| **ADM-9** | Admin BKPSDM dapat mengelola template surat pernyataan keabsahan konten (dibuat ringkas/sederhana) yang digunakan Admin Komunitas. | **Penting** |
| **ADM-10** | Sistem menghitung konversi JP secara otomatis (total durasi materi ÷ 135 menit, maks. 3 JP/modul) untuk membantu verifikasi JP oleh Admin BKPSDM. | **Wajib** |
| **ADM-11** | Admin BKPSDM dapat mengelola konten FAQ Pusat Bantuan dan menindaklanjuti tiket keluhan yang masuk dari peserta. | **Penting** |

## 6.2 Admin Komunitas — Manajemen Pembelajaran & Evaluasi

| **ID** | **Kebutuhan Fungsional** | **Prioritas** |
| --- | --- | --- |
| **KOM-1** | Admin Komunitas dapat membuat pembelajaran baru dan melengkapi informasi dasar (judul, deskripsi, kategori, komunitas, narasumber, **Capaian Pembelajaran/CP**, durasi JP, tanggal mulai, tanggal selesai, dan info pendukung). | **Wajib** |
| **KOM-2** | Admin Komunitas dapat menyusun struktur modul pembelajaran dengan **minimal 3 unsur wajib** (Gambaran Umum/Overview, Substansi Materi, Evaluasi), mengatur urutan materi, dan menerapkan mekanisme **lock** (materi/kuis berikutnya terbuka setelah bagian sebelumnya tuntas). | **Wajib** |
| **KOM-3** | Admin Komunitas dapat menambahkan materi pembelajaran berupa dokumen PDF dan **tautan embed video eksternal** (mis. YouTube) — video bersifat opsional dan tidak diunggah langsung ke server. | **Wajib** |
| **KOM-4** | Admin Komunitas dapat menyusun kuis evaluasi per modul beserta kunci jawaban dan bobot penilaian; kegagalan kuis modul memblokir akses ke materi/modul berikutnya hingga peserta lulus mengulang. | **Wajib** |
| **KOM-5** | Admin Komunitas dapat menyusun post test (butir soal, jumlah soal, **bobot/passing grade kustom** sesuai juknis, **urutan soal acak/randomize**, tampilan pembahasan/kunci jawaban setelah tes, dan **batas maksimal 3 kali percobaan pengerjaan**). | **Wajib** |
| **KOM-6** | Admin Komunitas dapat menginput **JP (Jam Pelajaran/Pelatihan)** sesuai jenis pelatihan mengikuti juknis dari BKPSDM; sistem menyarankan nilai JP otomatis (durasi ÷ 135 menit, maks. 3 JP/modul) sebagai bantuan pengisian. | **Wajib** |
| **KOM-7** | Admin Komunitas dapat mengunggah **ringkasan materi** dan **surat pernyataan keabsahan konten** (format ringkas, ditandatangani kepala dinas terkait) sebagai syarat pengajuan approval publikasi ke BKPSDM. | **Wajib** |
| **KOM-8** | Admin Komunitas dapat mengajukan pembelajaran untuk **approval BKPSDM (satu tahap, cepat)**; status berubah menjadi `"Aktif/Published"` dan tampil pada katalog peserta setelah disetujui. | **Wajib** |
| **KOM-9** | Admin Komunitas dapat memantau jumlah peserta, progres materi, status pengerjaan post test, kelulusan, dan sertifikat peserta di komunitasnya. | **Wajib** |
| **KOM-10** | Admin Komunitas dapat mencantumkan informasi/jadwal kegiatan tatap muka (luring) sebagai pelengkap pembelajaran daring (*blended community*), bersifat opsional. | **Diinginkan** |

## 6.3 Peserta — Katalog, Pembelajaran & Sertifikasi

| **ID** | **Kebutuhan Fungsional** | **Prioritas** |
| --- | --- | --- |
| **PST-1** | Peserta login menggunakan NIP (semi-SSO terhubung API SIMPEG); data profil (nama, jabatan, unit kerja) terisi otomatis. | **Wajib** |
| **PST-2** | Sistem menampilkan katalog pembelajaran yang **otomatis difilter sesuai rumpun jabatan peserta** (JPT/JA/JF/Pelaksana) berdasarkan data SIMPEG; peserta tidak dapat mengakses komunitas di luar rumpun jabatannya. | **Wajib** |
| **PST-3** | Khusus peserta rumpun **Jabatan Fungsional (JF)**, peserta dapat memilih sub-bidang (kesehatan, pertanian, dll.) melalui dropdown saat mendaftar/enroll komunitas. | **Wajib** |
| **PST-4** | Peserta dapat memilih pembelajaran dan melihat informasi detail (termasuk Capaian Pembelajaran/CP) sebelum memulai proses pembelajaran. | **Wajib** |
| **PST-5** | Peserta dapat mengakses dan mempelajari seluruh modul serta materi pembelajaran (PDF dan video embed) sesuai mekanisme *lock* (materi berikutnya terbuka setelah materi/kuis sebelumnya tuntas). | **Wajib** |
| **PST-6** | Peserta dapat mengikuti kuis per modul dan mengulang pengerjaan (maks. 3 kali percobaan) jika belum dinyatakan lulus, dengan urutan soal diacak dan pembahasan ditampilkan setelah tes. | **Wajib** |
| **PST-7** | Sistem secara otomatis mencatat dan memperbarui persentase progres pembelajaran berdasarkan materi yang telah diselesaikan peserta. | **Wajib** |
| **PST-8** | Sistem secara otomatis mengaktifkan tombol Post Test setelah progres pembelajaran peserta mencapai 100%. | **Wajib** |
| **PST-9** | Peserta dapat mengerjakan dan mengirimkan (submit) lembar jawaban post test, dengan batas maksimal 3 kali percobaan, urutan soal acak, dan pembahasan/kunci jawaban ditampilkan setelah tes selesai. | **Wajib** |
| **PST-10** | Sistem menghitung perolehan nilai post test peserta secara otomatis berdasarkan kunci jawaban dan bobot yang ditetapkan Admin Komunitas. | **Wajib** |
| **PST-11** | Sistem menyatakan peserta lulus jika nilai post test mencapai/melebihi passing grade yang berlaku, langsung menerbitkan sertifikat elektronik secara otomatis, dan **menyinkronkan nilai serta sertifikat ke SIMPEG**. | **Wajib** |
| **PST-12** | Peserta dapat melihat sertifikat elektronik dan mengunduhnya dalam format PDF (memuat nama lengkap, NIP, unit kerja) sebagai bukti kelulusan. | **Wajib** |
| **PST-13** | Peserta memiliki **Dashboard Personal** yang menampilkan riwayat pelatihan aktif, capaian JP kumulatif, dan daftar sertifikat miliknya. | **Wajib** |
| **PST-14** | Peserta dapat mengakses **Pusat Bantuan**: halaman FAQ (pertanyaan umum) dan mengajukan tiket keluhan terkait kendala penggunaan layanan. | **Penting** |
| **PST-15** | Peserta dapat mengisi penilaian rating bintang serta menyampaikan keluhan kepuasan penggunaan pelayanan. | **Penting** |

# 7. Alur Pengguna Utama (Key User Flows)

## 7.1 Alur Perancangan dan Publikasi Pembelajaran (Admin Komunitas)

1. Admin Komunitas masuk ke sistem dan memilih menu "Buat Pembelajaran".
2. Admin Komunitas mengisi informasi dasar: judul, deskripsi, kategori, narasumber, **Capaian Pembelajaran (CP)**, durasi JP (disarankan otomatis oleh sistem: durasi ÷ 135 menit, maks. 3 JP/modul, sesuai juknis BKPSDM), dan periode tanggal pelaksanaan.
3. Admin Komunitas membuat modul pembelajaran dengan **3 unsur wajib** (Gambaran Umum, Substansi Materi, Evaluasi), mengatur urutan (dengan mekanisme *lock*), mengunggah materi PDF serta tautan embed video (opsional), dan secara opsional mencantumkan jadwal pertemuan tatap muka (*blended*).
4. Admin Komunitas membuat soal kuis untuk setiap modul serta menyusun butir soal post test beserta konfigurasi bobot/passing grade, randomisasi soal, dan batas maksimal 3 kali percobaan.
5. Admin Komunitas mengunggah **ringkasan materi** dan **surat pernyataan keabsahan konten** (format ringkas dari BKPSDM, ditandatangani kepala dinas terkait), lalu menekan tombol "Ajukan Approval".
6. Sistem mengirim notifikasi ke Admin BKPSDM; BKPSDM meninjau ringkasan, surat pernyataan, dan kesesuaian JP dengan juknis dalam **satu tahap review yang ringkas** (tanpa berlapis-lapis) sesuai arahan Tim Ahli LAN RI.
7. Setelah disetujui, sistem mengubah status pembelajaran menjadi `"Aktif/Published"`, sehingga muncul pada katalog peserta yang berada pada rumpun jabatan/sub-bidang yang sesuai.

## 7.2 Alur Mengikuti Pembelajaran hingga Terbit Sertifikat (Peserta - Happy Path)

1. Peserta login menggunakan NIP (semi-SSO via API SIMPEG); data profil terisi otomatis.
2. Peserta membuka Katalog Pembelajaran yang telah difilter sesuai rumpun jabatannya; untuk rumpun JF, peserta memilih sub-bidang melalui dropdown.
3. Peserta melihat detail pembelajaran (termasuk CP) dan menekan tombol "Mulai Pembelajaran" (status pendaftaran: `"Sedang Berjalan"`).
4. Peserta membuka dan menyelesaikan materi PDF/video pada Modul 1; sistem memperbarui progres belajar dan membuka (*unlock*) modul berikutnya.
5. Peserta mengerjakan Kuis Modul 1 dan dinyatakan lulus.
6. Peserta menyelesaikan seluruh modul dan materi wajib berikutnya hingga persentase progres mencapai `"100%"`.
7. Sistem mendeteksi progres 100% dan mengaktifkan tombol "Mulai Post Test".
8. Peserta mengerjakan soal post test (urutan soal acak) dan menekan tombol kirim jawaban (maksimal 3 kali percobaan).
9. Sistem menghitung skor secara otomatis; peserta memperoleh nilai ≥ passing grade yang berlaku (status: `"Lulus"`).
10. Sistem men-generate file sertifikat elektronik otomatis, memperbarui status pembelajaran peserta menjadi `"Selesai"`, dan **mengirim sinkronisasi nilai serta sertifikat ke SIMPEG**.
11. Peserta membuka halaman sertifikat (dapat diakses juga lewat Dashboard Personal) untuk melihat pratinjau dan mengunduh file sertifikat PDF.
12. Peserta mengisi formulir rating bintang dan ulasan kepuasan pelayanan, atau mengajukan tiket ke Pusat Bantuan bila mengalami kendala.

## 7.3 Alur Evaluasi Tidak Lulus & Remedial (Peserta - Exception Path)

1. Peserta menyelesaikan pengerjaan Kuis Modul atau Post Test akhir.
2. Sistem memeriksa hasil jawaban dan mendapati nilai di bawah standar kelulusan (status: `"Tidak Lulus"`).
3. Sistem menampilkan pembahasan/kunci jawaban dan sisa kesempatan pengerjaan (dari maksimal 3 kali).
4. Pada Kuis Modul: Sistem meminta peserta mengulangi pengerjaan kuis (urutan soal diacak) hingga memenuhi syarat lulus agar modul berstatus selesai dan materi berikutnya ter-*unlock*.
5. Pada Post Test: Sistem menampilkan tombol "Ulangi Post Test" (urutan soal diacak) hingga mencapai passing grade yang berlaku, atau hingga kesempatan ke-3 habis.
6. *(Perlu keputusan BKPSDM — lihat Bab 12):* mekanisme lanjutan jika peserta tidak lulus setelah 3 kali percobaan (mis. perlu approval ulang oleh Admin Komunitas/BKPSDM untuk membuka kesempatan tambahan).

## 7.4 Alur Monitoring dan Penarikan Laporan (Admin BKPSDM)

1. Admin BKPSDM membuka panel Dashboard untuk memantau ringkasan statistik (total peserta, user aktif, komunitas, persentase keaktifan komunitas, tren modul 6 bulan, dan sertifikat terverifikasi).
2. Admin BKPSDM mengakses menu "Monitoring & Laporan".
3. Admin BKPSDM memilih filter laporan (komunitas, pembelajaran, periode tanggal, nama peserta, atau status sertifikat).
4. Sistem menampilkan matriks data peserta, persentase progres, nilai post test, dan status sertifikat.
5. Admin BKPSDM menekan tombol "Export Laporan" untuk mengunduh rekapitulasi data **dalam format Excel** (nama, NIP, jenis pelatihan, progres, tingkat kelulusan).

# 8. Model Data (High-Level)

| **Entitas** | **Field Utama** | **Keterangan** |
| --- | --- | --- |
| **users** | `id`, `name`, `nip`, `email`, `password_hash`, `role`, `jabatan`, `jabatan_tier` (JPT/JA/JF/Pelaksana), `unit_kerja`, `status`, `created_at`, `updated_at` | Data akun Admin BKPSDM, Admin Komunitas, dan Peserta; `jabatan_tier` ditarik dari SIMPEG untuk filtering katalog. |
| **communities** | `id`, `name`, `description`, `jabatan_tier`, `subkategori_bidang` (khusus JF), `created_by`, `created_at`, `updated_at` | Master data komunitas belajar, dipetakan ke salah satu dari 4 rumpun jabatan. |
| **community_admins** | `id`, `community_id`, `user_id`, `assigned_at` | Data relasi penugasan Admin Komunitas pada komunitas tertentu. |
| **courses** | `id`, `community_id`, `title`, `description`, `category`, `instructor_name`, `learning_outcome` (CP), `duration_jp`, `start_date`, `end_date`, `passing_grade`, `content_summary`, `statement_letter_url`, `status` (draft/pending_approval/published), `created_at` | Data program pembelajaran/pelatihan; `passing_grade` kustom per pembelajaran; `status` mencerminkan alur approval BKPSDM. |
| **course_jp** | `id`, `course_id`, `jp_type` (formal/bimtek/coaching/mentoring), `duration_minutes`, `jp_value_calculated` (=`duration_minutes`÷135, maks. 3), `jp_value_final`, `verified_by_bkpsdm` (bool), `verified_at` | Data JP; `jp_value_calculated` dihitung otomatis sistem, `jp_value_final` diverifikasi BKPSDM sesuai juknis. |
| **modules** | `id`, `course_id`, `title`, `description`, `order_sequence`, `is_locked_until_previous_complete`, `has_overview`, `has_substance`, `has_evaluation`, `blended_session_info` (opsional), `created_at` | Data modul di dalam satu pembelajaran; kolom `has_*` memastikan 3 unsur wajib (Overview/Substansi/Evaluasi) terpenuhi. |
| **materials** | `id`, `module_id`, `title`, `type` (pdf/video_embed), `file_url` / `embed_url`, `is_mandatory`, `order_sequence` | Data materi belajar PDF atau tautan embed video eksternal (bukan file video). |
| **quizzes** | `id`, `module_id`, `title`, `passing_grade`, `max_attempts` (default 3), `randomize_questions` (bool), `show_answer_key_after` (bool), `created_at` | Data kuis evaluasi per modul. |
| **quiz_questions** | `id`, `quiz_id`, `question_text`, `options_json`, `correct_answer` | Bank butir soal kuis modul. |
| **post_tests** | `id`, `course_id`, `passing_grade`, `max_attempts` (default 3), `randomize_questions` (bool), `show_answer_key_after` (bool), `duration_minutes`, `created_at` | Konfigurasi post test akhir pembelajaran. |
| **post_test_questions** | `id`, `post_test_id`, `question_text`, `options_json`, `correct_answer` | Bank butir soal post test. |
| **enrollments** | `id`, `user_id`, `course_id`, `progress_percentage`, `status` (enrolled, in_progress, completed), `enrolled_at`, `completed_at` | Data keikutsertaan dan rekap progres peserta. |
| **material_progress** | `id`, `enrollment_id`, `material_id`, `is_completed`, `completed_at` | Log pencatatan penyelesaian materi oleh peserta (dasar mekanisme *lock*). |
| **evaluation_attempts** | `id`, `enrollment_id`, `evaluation_type` (quiz/post_test), `reference_id`, `score`, `is_passed`, `attempt_number` (maks. 3), `submitted_at` | Riwayat pengerjaan kuis/post test beserta skor. |
| **certificates** | `id`, `enrollment_id`, `certificate_number`, `issue_date`, `file_url`, `simpeg_sync_status`, [`siasn_sync_status`], [`qr_signature_hash`] | Arsip data sertifikat elektronik; disinkron otomatis ke SIMPEG. |
| **feedback_ratings** | `id`, `enrollment_id`, `rating_score`, `complaint_notes`, `submitted_at` | Rekapitulasi penilaian rating dan keluhan kepuasan layanan. |
| **help_tickets** | `id`, `user_id`, `subject`, `description`, `status` (open/in_progress/closed), `created_at`, `resolved_at` | Data tiket keluhan/bantuan yang diajukan peserta ke Pusat Bantuan. |
| **faqs** | `id`, `question`, `answer`, `category`, `order_sequence`, `created_by` | Konten FAQ yang dikelola Admin BKPSDM pada Pusat Bantuan. |

**Catatan:** field dalam [tanda kurung siku] merupakan bagian dari fitur usulan/Fase Lanjutan (Bab 11), menunggu kejelasan status integrasi SIASN BKN.

# 9. Kebutuhan Non-Fungsional (Non-Functional Requirements)

- **Keamanan & Kontrol Akses:** Menerapkan Role-Based Access Control (RBAC) yang ketat, termasuk pembatasan akses komunitas berdasarkan rumpun jabatan; enkripsi kata sandi dan proteksi berkas materi, surat pernyataan, serta dokumen sertifikat dari akses tidak sah.
- **Integritas Sistem Evaluasi:** Sistem mengunci tombol akses post test secara ketat hingga progres materi wajib valid 100%, menegakkan batas maksimal 3 kali percobaan kuis/post test, dan mencegah manipulasi pengiriman skor.
- **Skalabilitas:** Sistem dirancang untuk menangani ±15.000 pengguna aktif dan ±83–100 komunitas belajar secara bersamaan tanpa degradasi performa signifikan.
- **Performa & Kecepatan:** Waktu pemuatan halaman katalog dan materi ≤ 2 detik pada koneksi standar; proses otomatisasi generate sertifikat PDF ≤ 3 detik setelah post test berstatus lulus.
- **Ketersediaan & Keandalan:** Sistem dirancang stabil menangani pengerjaan post test dan pengunggahan berkas (PDF, surat pernyataan) secara simultan tanpa kegagalan server; kapasitas penyimpanan awal disiapkan ±1 TB.
- **Responsivitas Antarmuka:** Tampilan antarmuka mendukung kenyamanan penggunaan di desktop, tablet, dan smartphone (mobile-friendly) untuk membaca PDF maupun menonton video embed, termasuk halaman landing page dengan header/cover visual.
- **Pengujian Keamanan (Security Assessment):** Setelah sistem terpasang di subdomain resmi, BKPSDM/Kominfosandi mengajukan permohonan *IT Security Assessment*/*Penetration Testing* ke **BSSN** (layanan gratis untuk instansi pemerintah) sebelum go-live penuh, mengingat stack backend (Laravel) dan frontend (React) yang digunakan.

# 10. Integrasi Pihak Ketiga

| **Layanan** | **Fungsi** | **Status/Catatan** |
| --- | --- | --- |
| **API SIMPEG** | Semi-SSO login (NIP), auto-fill data pegawai (nama, jabatan, unit kerja) untuk filtering rumpun jabatan, serta **sinkronisasi otomatis nilai dan sertifikat** peserta yang lulus. | **MVP** — wajib tersedia sejak rilis awal. |
| **Cloud Object Storage (S3 / GCP / MinIO)** | Penyimpanan berkas materi PDF, surat pernyataan keabsahan konten, dan file sertifikat elektronik (±1 TB awal). | **MVP** — menggunakan penyimpanan cloud terenkripsi. |
| **PDF Rendering Engine** | Engine pembuat sertifikat PDF otomatis berbasis template dinamis. | **MVP** — dijalankan pada background worker platform. |
| **Video Embed (YouTube, dll.)** | Penyematan (embed) video pembelajaran eksternal agar tidak membebani hosting. | **MVP.** |
| **SIASN BKN** | Sinkronisasi lanjutan skor/sertifikat ke tingkat nasional. | **Dalam koordinasi** (Pak Ari ↔ BKN & Kominfosandi); target menyusul setelah integrasi SIMPEG stabil. |
| **Balai Sertifikasi Elektronik (BSrE)** | Pembubuhan tanda tangan digital resmi tersertifikasi pada dokumen sertifikat. | **Fase Lanjutan.** |
| **SSO Kepegawaian Penuh (SIASN)** | Otentikasi login tunggal penuh menggunakan identitas kepegawaian resmi (di luar mekanisme semi-SSO NIP saat ini). | **Fase Lanjutan.** |
| **Kominfosandi (Domain & Hosting)** | Penyediaan subdomain resmi `bulelengasn4u.bulelengkab.go.id` dan hosting/server; mensyaratkan kelengkapan dokumen SDLC. | Dalam proses pengajuan. |
| **BSSN (Badan Siber dan Sandi Negara)** | *IT Security Assessment* / *Penetration Testing* atas sistem (layanan gratis untuk instansi pemerintah). | Diajukan **setelah** sistem terpasang di subdomain resmi; belum dimulai. |

# 11. Fitur Usulan / Fase Lanjutan

- **Integrasi SSO Kepegawaian Penuh (SIASN/Simpeg).** Memfasilitasi otentikasi login langsung bagi ASN menggunakan kredensial kepegawaian resmi tanpa perlu mekanisme semi-SSO berbasis NIP.
- **Integrasi Penuh SIASN BKN.** Sinkronisasi nilai dan sertifikat ke tingkat nasional (BKN), saat ini masih dalam koordinasi antara Pak Ari, BKN, dan Kominfosandi.
- **Tanda Tangan Elektronik Tersertifikasi (BSrE).** Integrasi dengan otoritas sertifikasi digital nasional untuk membubuhkan segel digital dan QR code verifikasi keabsahan sertifikat pada file PDF.
- **Forum Diskusi Interaktif Komunitas.** Ruang konsultasi dan interaksi daring dua arah antara peserta dan Admin Komunitas/narasumber per modul pembelajaran.
- **Pre-Test Diagnostik Komprehensif.** Fitur ujian diagnostik awal sebelum materi dibuka untuk mengukur tingkat pemahaman awal peserta dan membandingkan gain score terhadap Post Test.

# 12. Pertanyaan Terbuka / TBD

- Mekanisme lanjutan bila peserta **gagal setelah 3 kali percobaan** post test/kuis: apakah perlu approval manual (Admin Komunitas/BKPSDM) untuk membuka kesempatan tambahan, atau peserta wajib mengulang dari awal periode pembelajaran berikutnya?
- Apakah batas 3 kali percobaan berlaku sama untuk **kuis per modul** maupun **post test akhir**, atau berbeda ketentuan di antara keduanya?
- Format standar penomoran sertifikat elektronik resmi (susunan kode penomoran, kode unit, bulan romawi, dan tahun) yang disepakati oleh BKPSDM.
- Batasan ukuran maksimal file unggahan (PDF materi dan surat pernyataan).
- ~~Juknis batas maksimal JP per jenis pelatihan belum disusun~~ — **sebagian terjawab** pada diskusi sesi 2 (02/09): formula konversi JP = durasi (menit) ÷ 135, maks. 3 JP/modul. Yang masih perlu dikonfirmasi: nomor resmi regulasi acuan (disebut "Perlang No. 12/8" dalam notula) serta batas total JP per jenis pelatihan (formal/bimtek/coaching/mentoring) di luar per-modul.
- Template resmi **surat pernyataan keabsahan konten** dari BKPSDM belum final/terlampir — perlu dibuat **ringkas** sesuai arahan Tim Ahli LAN RI (hindari birokrasi berlapis).
- Kepastian jadwal dan mekanisme teknis integrasi ke **SIASN BKN** (menunggu koordinasi Pak Ari dengan BKN & Kominfosandi).
- Daftar final ±83–100 komunitas beserta pemetaannya ke 4 rumpun jabatan dan (untuk JF) daftar sub-bidang yang tersedia di dropdown.
- Status final pengesahan **Perbup Pengembangan Kompetensi** dan **Keputusan Bupati HCDP** (masih dalam penyusunan/harmonisasi), serta hasil **Nota Kesepakatan dengan LAN RI** (masih direview Biro Hukum LAN).
- Apakah **Pengarah** (Bupati/Sekda) dan **Koordinator Pokja** (Asisten Sekda) memerlukan akun/dashboard tersendiri di sistem, atau perannya murni di luar sistem (governance saja)?
- Jadwal pasti pengajuan surat ke **BSSN** untuk IT Security Assessment/Penetration Testing, dan apakah go-live ditahan sampai hasil assessment keluar.
- Mekanisme teknis penjadwalan/pengumuman pertemuan tatap muka (*blended community*) — apakah cukup sebagai catatan teks, atau perlu fitur kalender/reminder tersendiri.

# 13. Glosarium

- **BKPSDM:** Badan Kepegawaian dan Pengembangan Sumber Daya Manusia.
- **Admin Komunitas:** Peran pengguna yang bertugas mengelola kurikulum, modul materi, kuis, dan post test pada komunitas pembelajaran tertentu.
- **CP (Capaian Pembelajaran):** Rumusan tujuan/hasil belajar yang ingin dicapai peserta pada suatu pembelajaran.
- **JP (Jam Pelajaran/Pelatihan):** Satuan ukur durasi waktu penyelenggaraan pembelajaran atau pelatihan; menggantikan istilah "JPL" pada draft sebelumnya. Untuk konten *microlearning*, dikonversi dengan formula durasi (menit) ÷ 135, maksimal 3 JP per modul, sesuai standar LAN; mengacu pada juknis yang disusun BKPSDM per jenis pelatihan (formal, bimtek, coaching, mentoring).
- **KomBel (Komunitas Belajar):** Unit terkecil dalam struktur kelembagaan pembelajaran, tempat ASN belajar dan berbagi pengetahuan sesuai rumpun jabatan/profesinya.
- **HCDP (Human Capital Development Plan):** Rencana pengembangan sumber daya manusia 5 tahunan yang diselaraskan dengan RPJMD, ditetapkan melalui Keputusan Bupati.
- **Perbup:** Peraturan Bupati; dalam konteks ini, payung hukum pengembangan kompetensi ASN yang sedang disusun.
- **Forum Pembelajaran Level Strategis:** Forum pengesahan materi/kebijakan pembelajaran sebelum diharmonisasi ke Kemenkumham/Biro Hukum Provinsi dan dikonsultasikan ke LAN RI.
- **LAN RI:** Lembaga Administrasi Negara, instansi pusat yang menetapkan regulasi dan standar pengembangan kompetensi ASN termasuk standar konten dan konversi JP e-learning.
- **BSSN:** Badan Siber dan Sandi Negara; instansi yang menyediakan layanan *IT Security Assessment*/*Penetration Testing* gratis bagi instansi pemerintah.
- **Blended Community:** Pendekatan pembelajaran yang menggabungkan komunitas belajar daring dengan pertemuan tatap muka (luring) berkala.
- **Pusat Bantuan:** Fitur FAQ dan sistem tiket keluhan bagi peserta untuk mendapatkan bantuan penggunaan platform.
- **Rumpun Jabatan:** Pengelompokan jenjang karier ASN menjadi 4 kategori — JPT (Jabatan Pimpinan Tinggi), JA (Jabatan Administrasi), JF (Jabatan Fungsional), dan Jabatan Pelaksana — yang menentukan akses komunitas belajar peserta.
- **Semi-SSO:** Mekanisme login menggunakan NIP yang terhubung ke API SIMPEG untuk auto-fill data profil, tanpa otentikasi terpusat penuh (berbeda dengan SSO Kepegawaian/SIASN penuh yang direncanakan di Fase Lanjutan).
- **Surat Pernyataan Keabsahan Konten:** Dokumen yang ditandatangani kepala dinas terkait untuk menyatakan validitas materi pembelajaran, diunggah Admin Komunitas sebagai bagian dari alur approval BKPSDM.
- **Passing Grade:** Ambang batas nilai minimum yang wajib dipenuhi peserta agar dinyatakan lulus; bersifat kustom per pembelajaran, ditentukan Admin Komunitas sesuai juknis.
- **Post Test:** Evaluasi ujian akhir komprehensif yang diakses setelah peserta menyelesaikan 100% materi pembelajaran, dengan maksimal 3 kali percobaan.
- **Progress-Based Learning:** Metode pembelajaran berbasis progres di mana akses evaluasi dibuka setelah seluruh materi pembelajaran wajib diselesaikan (mekanisme *lock*).
- **Sertifikat Elektronik:** Dokumen digital tanda tamat/kelulusan pembelajaran yang diterbitkan otomatis oleh sistem dalam format PDF dan disinkronkan ke SIMPEG.

---

*Dokumen ini merupakan draft revisi 3 dan dapat berubah seiring pembahasan lebih lanjut dengan klien, khususnya terkait poin-poin pada Bab 12 (Pertanyaan Terbuka/TBD).*
