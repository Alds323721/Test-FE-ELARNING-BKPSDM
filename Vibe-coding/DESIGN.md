---
name: BKPSDM E-Learning Platform - Design System
description: Sistem desain resmi untuk Landing Page dan Portal Pembelajaran Digital BKPSDM (Badan Kepegawaian dan Pengembangan Sumber Daya Manusia).
colors:
  primary: "#3FCDC1"
  secondary: "#1D315F"
  background: "#FFFFFF"
  surface: "#F4F8FB"
  text-primary: "#1D315F"
  text-secondary: "#6B7280"
  border: "#E5E7EB"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"
typography:
  h1:
    fontFamily: "Inter, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  h2:
    fontFamily: "Inter, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    fontWeight: 600
  button-secondary-outline:
    backgroundColor: "transparent"
    borderColor: "{colors.secondary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  course-card:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  badge-free:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

## Overview
Platform E-Learning BKPSDM dirancang dengan pendekatan visual **Clean Government Digital Platform**. Menggabungkan kerapian antarmuka lembaga pemerintahan modern dengan *user experience* platform ed-tech terkemuka. Penggunaan warna **Deep Navy (#1D315F)** memberikan rasa wibawa, kepastian, dan keandalan instansi publik, sementara aksen **Vibrant Teal (#3FCDC1)** memberikan kesan modern, dinamis, dan memberikan motivasi belajar bagi para Aparatur Sipil Negara (ASN).

## Colors & Semantic Roles
- **Primary Accent (#3FCDC1):** Digunakan secara khusus untuk aksi utama (CTA button), badge indikator pelatihan "GRATIS", persentase progres aktif, serta elemen highlight penting.
- **Secondary / Navy (#1D315F):** Digunakan untuk seluruh judul utama (Headings), navbar background sekunder/features banner, dan teks utama untuk menjamin pembacaan yang sangat kontras (rasio >12:1, lolos **WCAG AAA**).
- **Surface (#F4F8FB):** Digunakan sebagai background selang-seling section dan card kategori untuk menciptakan hirarki visual tanpa membebani mata.

## Typography
Menggunakan *font family* **Inter** (Geometric Sans-serif) secara penuh untuk memastikan keterbacaan tinggi di berbagai ukuran layar:
- **Display / H1:** Ukuran 48px dengan *tight letter-spacing* (-0.015em) untuk memberikan impresi hero section yang kuat dan lugas.
- **Body & Metadata:** Ukuran 14px-16px dengan *line-height* 1.6 untuk kenyamanan membaca deskripsi modul dan informasi Jam Pelajaran (JPL).

## Spacing & Layout
- Berpatokan pada **4px/8px Grid System**.
- Layout menggunakan grid 12-kolom dengan batas lebar maksimal (max-width) **1440px**.
- Generous Whitespace: Jarak antar section dijaga di kisaran **64px hingga 96px** untuk menciptakan kesan profesional, tidak padat, dan mudah di-scan oleh pengguna.

## Components & Behavior Guidelines
- **Course Card:**
  - Menampilkan thumbnail materi, badge kategori, badge "GRATIS" di pojok kanan atas, durasi JPL, jumlah modul, dan narasumber.
  - Hover State: Card terangkat sedikit dengan *subtle shadow* (`0 4px 12px rgba(0,0,0,0.08)`) dan border berubah warna menjadi Teal `#3FCDC1`.
- **Badges & Tags:**
  - Status pelatihan "GRATIS" selalu menggunakan shape *Full Pill* dengan warna Teal background dan teks putih.

## Rules to Never Break
1. **Tidak Menampilkan Elemen Pembayaran:** Mengingat seluruh layanan pelatihan BKPSDM ini gratis untuk aparatur, dilarang menampilkan harga dalam nominal mata uang ($ atau Rp) di card manapun. Gunakan indikator badge **"GRATIS"**.
2. **Keterbacaan Aksesibilitas Tinggi (A11y):** Teks utama wajib menggunakan Navy (`#1D315F`) di atas background terang untuk memenuhi standar WCAG AAA.
3. **Kejelasan Informasi Pelatihan:** Setiap kartu pelatihan wajib mencantumkan jumlah **JPL (Jam Pelajaran)** dan **Jumlah Modul** sebagai indikator beban pembelajaran mandiri ASN.