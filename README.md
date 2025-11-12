# Arsip Dokumen Kepegawaian TVRI Kepri

Aplikasi web untuk mengarsipkan dan mengelola dokumen kepegawaian di TVRI Stasiun Kepulauan Riau. Sistem ini dirancang untuk memudahkan penyimpanan, pengorganisasian, dan pengelolaan dokumen pegawai seperti ijazah dan akta kelahiran.

## Fitur Utama

- **Upload Dokumen Multiple**: Pengguna dapat mengupload hingga 5 file untuk setiap kategori dokumen
- **Drag and Drop**: Interface yang intuitif dengan dukungan drag and drop untuk upload file
- **Validasi File**: Sistem validasi untuk memastikan ukuran file tidak melebihi 10MB dan format file yang didukung
- **Organisasi Otomatis**: Dokumen disimpan dalam folder terpisah berdasarkan nama pegawai
- **Penamaan File Otomatis**: File diberi label dan timestamp untuk memudahkan identifikasi
- **Responsive Design**: Interface yang responsif dan kompatibel dengan berbagai ukuran layar
- **Progress Indicator**: Menampilkan progress bar saat upload sedang berlangsung
- **Pesan Feedback**: Notifikasi sukses atau error yang jelas untuk user

## Teknologi yang Digunakan

### Backend
- **Node.js**: Runtime environment untuk JavaScript di server
- **Express.js ^5.1.0**: Web framework untuk membuat REST API
- **Multer ^2.0.2**: Middleware untuk handling file upload

### Frontend
- **HTML5**: Struktur dan markup halaman
- **CSS3**: Styling dan layout responsif
- **JavaScript (Vanilla)**: Interaksi dan logika client-side
- **Drag and Drop API**: Native browser API untuk fitur drag and drop

### Database/Storage
- **File System**: Penyimpanan file di shared folder atau folder lokal

## Prasyarat Instalasi

Sebelum menginstal, pastikan Anda memiliki:

- **Node.js** (versi 18 atau lebih tinggi)
- **npm** (Node Package Manager)
- **Git** (opsional, untuk cloning repository)

Untuk Windows, pastikan juga memiliki akses ke shared folder jaringan jika akan menggunakan network drive.

## Instalasi

1. Clone repository atau download project

```bash
git clone https://github.com/username/arsip-dokumen-kepegawaian-tvri-kepri.git
cd arsip-dokumen-kepegawaian-tvri-kepri
```

2. Install dependencies

```bash
npm install
```

3. Konfigurasi path penyimpanan (opsional)

Buka file `server.js` dan sesuaikan path `SHARED_FOLDER`:

```javascript
// Untuk Windows network share
const SHARED_FOLDER = 'Z:\Testing'; 

// Atau untuk local development
const SHARED_FOLDER = path.join(__dirname, 'uploads');
```

4. Buat folder uploads jika menggunakan local development

```bash
mkdir uploads
```

5. Jalankan aplikasi

Untuk development dengan auto-reload:
```bash
npm run dev
```

Untuk production:
```bash
npm start
```

6. Buka browser dan akses aplikasi

```
http://localhost:3000
```

## Susunan Project

```
arsip-dokumen-kepegawaian-tvri-kepri/
├── public/
│   └── index.html              # Halaman frontend utama
├── uploads/                    # Folder penyimpanan file (auto-created)
│   └── [Nama Pegawai]/        # Folder per pegawai
│       ├── IJAZAH_SMA_SMK_*
│       ├── IJAZAH_D3_S1_S2_S3_*
│       └── AKTA_KELAHIRAN_*
├── server.js                   # Konfigurasi server Express
├── package.json                # Informasi project dan dependencies
├── package-lock.json           # Lock file untuk dependencies
└── README.md                   # Dokumentasi project (file ini)
```

## Penjelasan File Utama

### server.js
File utama backend yang mengatur:
- Konfigurasi Express server
- Setup Multer untuk handling file upload
- Route POST `/upload` untuk menerima file
- Validasi file dan error handling
- Penyimpanan file ke folder berdasarkan nama pegawai

### public/index.html
Halaman frontend yang berisi:
- Form untuk input nama pegawai
- Tiga area upload untuk kategori dokumen berbeda
- JavaScript untuk handling file selection, validation, dan upload
- Styling menggunakan CSS yang terinspirasi dari Google Forms

## Penggunaan

### Untuk User

1. Buka aplikasi di browser
2. Isi kolom "Nama Pegawai (dengan gelar)"
3. Upload dokumen untuk setiap kategori:
   - Ijazah SMA/SMK/SLTA
   - Ijazah D3/S1/S2/S3
   - Akta Kelahiran Pegawai
4. Klik tombol **Submit** untuk mengirimkan dokumen
5. Tunggu hingga muncul pesan berhasil

### Fitur Upload

- **Klik File**: Klik pada area upload atau ikon folder untuk memilih file
- **Drag and Drop**: Tarik file dari file manager ke area upload
- **Multiple Selection**: Pilih hingga 5 file untuk setiap kategori
- **Remove File**: Klik tombol × untuk menghapus file dari daftar
- **Clear Form**: Gunakan tombol "Clear form" untuk reset semua data

### Validasi

Sistem akan melakukan validasi:
- Nama pegawai tidak boleh kosong
- Setidaknya ada satu file yang dipilih
- Ukuran file maksimal 10MB per file
- Format file yang didukung: PDF, JPG, JPEG, PNG
- Maksimal 5 file per kategori
- Tidak ada duplikasi file

## Contoh Response API

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "files": {
    "ijazahSma": [
      {
        "fieldname": "ijazahSma",
        "originalname": "ijazah_sma.pdf",
        "encoding": "7bit",
        "mimetype": "application/pdf",
        "destination": "uploads/Budi Hartono, S.Kom",
        "filename": "IJAZAH_SMA_SMK_1699564800000.pdf",
        "path": "uploads/Budi Hartono, S.Kom/IJAZAH_SMA_SMK_1699564800000.pdf",
        "size": 2048576
      }
    ]
  }
}
```

### Error Response (400/500)

```json
{
  "success": false,
  "message": "File too large"
}
```

## Konfigurasi Lanjutan

### Mengubah Limit Ukuran File

Edit di `server.js`:

```javascript
const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 20 * 1024 * 1024 }, // Ubah ke 20MB
});
```

### Mengubah Jumlah File Maksimal

Edit di `public/index.html` (JavaScript):

```javascript
const maxFiles = 10; // Ubah dari 5 menjadi 10
```

### Menambah Kategori Dokumen Baru

1. Tambahkan field upload di HTML:

```html
<div class="form-section">
  <h2 class="question-title">Surat Pengalaman Kerja <span class="required-asterisk">*</span></h2>
  <p class="question-description">Upload file surat pengalaman kerja...</p>
  <div class="file-upload-area" id="suratPengalamanArea">
    <!-- ... -->
    <input type="file" id="suratPengalamanInput" class="file-input" multiple>
  </div>
  <div class="selected-files" id="suratPengalamanList"></div>
  <div class="file-count" id="suratPengalamanCount">0 file dipilih</div>
</div>
```

2. Setup di JavaScript

3. Tambahkan ke form submit di `server.js`

## Troubleshooting

### Error: EACCES - Permission denied

Pastikan folder uploads dapat diakses dan dimodifikasi. Untuk Windows shared folder, pastikan permission sudah diatur dengan benar.

### Error: File type not allowed

Format file tidak didukung. Gunakan format: PDF, JPG, PNG yang sesuai kriteria.

### Error: LIMIT_FILE_SIZE

Ukuran file melebihi 10MB. Kompresi file terlebih dahulu sebelum upload.

### Server tidak bisa connect ke shared folder

Periksa path shared folder di `server.js` dan pastikan sudah terhubung ke network. Untuk testing lokal, gunakan path folder lokal.

## Kontribusi

Kami menerima kontribusi dari komunitas. Untuk berkontribusi:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

Pastikan untuk:
- Menjelaskan perubahan yang dilakukan
- Menjalankan test jika ada
- Mengikuti code style yang sudah ada
- Update dokumentasi jika diperlukan

## Lisensi

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail lengkapnya.

```
MIT License

Copyright (c) 2024 TVRI Kepulauan Riau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Kontak & Support

Jika memiliki pertanyaan atau menemukan bug, silakan buka issue di repository ini atau hubungi tim pengembang.

---

**Dibuat untuk**: TVRI Stasiun Kepulauan Riau  
**Versi**: 1.0.0  
**Status**: Active Development