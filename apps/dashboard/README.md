# PROJECT DOCUMENTATION
## HR MANAGEMENT SYSTEM

**Nama Project:** HR Management System – ReikPlus  
**Domain:** hr.reikplus.id  
**Tujuan Sistem:**  
Aplikasi ini dibuat untuk membantu perusahaan dalam mengelola sumber daya manusia secara digital, terstruktur, dan terintegrasi.

---

### 🎯 1. Objectives

- Digitalisasi proses HR
- Monitoring karyawan secara real-time
- Otomatisasi payroll dan absensi
- Manajemen dokumen dan approval workflow

---

### 🏗️ 2. System Architecture

**Architecture Overview**  
Sistem menggunakan arsitektur:
- **Frontend:** React (Vite)
- **Backend:** (Laravel / Node.js / Django — sesuaikan)
- **Database:** (MySQL / PostgreSQL / MongoDB)
- **Authentication:** JWT / Session-based
- **Hosting:** VPS / Cloud Server

**High Level Flow**  
User → Login → Dashboard → (Attendance / Employee Management / Payroll / Leave Request / Reporting)

---

### 📌 3. Core Features

#### 3.1 Employee Management
- Tambah / edit / hapus karyawan
- Detail profile (NIK, posisi, divisi, status kerja)
- Upload dokumen (KTP, kontrak, dll)

#### 3.2 Attendance Management
- Check-in / Check-out
- Monitoring kehadiran
- Rekap absensi bulanan
- Integrasi lokasi (jika ada GPS)

#### 3.3 Leave & Permission Management
- Pengajuan cuti
- Approval HR / Manager
- Tracking sisa cuti
- History cuti

#### 3.4 Payroll System
- Perhitungan gaji otomatis
- Tunjangan & Potongan
- Generate slip gaji
- Export PDF

#### 3.5 Document Management
- Upload dokumen karyawan
- Kontrak kerja & Surat peringatan
- Penyimpanan cloud

#### 3.6 Role & Permission
- **Roles:** Super Admin, HR, Manager, Employee
- **Fitur:** Hak akses berdasarkan role, Pembatasan fitur sesuai jabatan

---

### 🗄️ 4. Database Design (Example Structure)

- **Tabel Utama:** `users`, `employees`, `attendance`, `leaves`, `payroll`, `roles`, `permissions`
- **Relasi:** 
  - `employees` → `users`
  - `attendance` → `employees`
  - `leaves` → `employees`
  - `payroll` → `employees`

---

### 🔄 5. Workflow System

**Proses Pengajuan Cuti**
1. Employee submit leave request
2. Manager review
3. HR approval
4. Status berubah (Approved / Rejected)
5. Notifikasi dikirim

---

### 🔒 6. Security System
- Enkripsi password (bcrypt)
- Role-based access control (RBAC)
- Token authentication
- Validasi input
- Proteksi CSRF

---

### 📊 7. Reporting & Analytics
- Rekap absensi bulanan
- Laporan payroll
- Statistik kehadiran
- Grafik performa karyawan

---

### 🚀 8. Future Development Plan
- Mobile App
- Face Recognition Attendance
- Integrasi BPJS
- Integrasi Pajak PPH21
- Integrasi Accounting

---

### 📗 USER MANUAL (Singkat)

**Login**
1. Buka `hr.reikplus.id`
2. Masukkan email & password
3. Klik login

**Input Karyawan**
1. Masuk menu **Employee**
2. Klik **Add Employee**
3. Isi data -> Save

**Proses Payroll**
1. Masuk menu **Payroll**
2. Pilih bulan
3. Generate -> Export slip

---

### 📦 Installation & Setup (Developer)

**Prerequisites:** Node.js (v18+), npm (v9+)

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
3. **Run Storybook** (Component Documentation):
   ```bash
   npm run storybook
   ```
