import React, { useState } from 'react';
import { 
  Users, BookOpen, Award, TrendingUp, TrendingDown,
  LayoutDashboard, LogOut, Bell, Settings, Search, Menu, X,
  FileText, RotateCcw, ChevronDown, CheckCircle2,
  PlayCircle, Edit, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Clock,
  BarChart2, Book, HelpCircle, GraduationCap, HeadphonesIcon,
  ArrowLeft, Upload, Plus, AlertCircle, File, Eye, Trash2, Edit2, Download
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'katalog-kursus', onNavigate, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'admin-komunitas', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pelatihan-saya', label: 'Pelatihan Saya', icon: GraduationCap },
    { id: 'laporan-progress', label: 'Laporan Progress', icon: BarChart2 },
    { id: 'katalog-kursus', label: 'Katalog Kursus', icon: Book },
    { id: 'pusat-bantuan', label: 'Pusat Bantuan', icon: HelpCircle },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={`w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo Section */}
        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center">
              <img src="/vite.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-tight text-[#1D315F]">Buleleng ASN Corpu</h1>
              <p className="text-[10px] text-gray-500 font-medium">E-Learning System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden shrink-0">
              <img src="https://ui-avatars.com/api/?name=Admin+Komunitas&background=0D8ABC&color=fff" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm truncate w-36">Admin Komunitas</h2>
              <p className="text-xs text-gray-500">Dinas Kesehatan</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 py-2 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (onNavigate) onNavigate(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#0F766E] text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="text-left truncate leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 space-y-2 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-teal-600 text-teal-700 rounded-lg text-sm font-semibold hover:bg-teal-50 transition-colors">
            <HeadphonesIcon className="w-4 h-4" /> Bantuan Teknis
          </button>
          <button 
            onClick={() => {
              if (onNavigate) onNavigate('landing');
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400 shrink-0" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </>
  );
};

const Header = ({ setIsOpen }) => (
  <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
    <div className="flex items-center gap-4 flex-1">
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="relative w-full max-w-md hidden sm:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Cari modul atau peserta..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
        />
      </div>
    </div>
    <div className="flex items-center gap-2 sm:gap-4">
      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative hidden sm:block">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
      </button>
      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
        <Settings className="w-5 h-5" />
      </button>
      <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
      <button className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-full transition-colors">
        <img src="https://ui-avatars.com/api/?name=Admin+Komunitas&background=0D8ABC&color=fff" alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
      </button>
    </div>
  </header>
);

const DetailKursus = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModule1Open, setIsModule1Open] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-36 sm:pb-24">
      <AdminSidebar 
        activeMenu="katalog-kursus" 
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div>
                <button 
                  onClick={() => onNavigate('katalog-kursus')}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0F766E] mb-3 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
                </button>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">Etika Birokrasi Modern</h1>
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Published</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <button className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Simpan Draft
                </button>
                <button className="w-full sm:w-auto px-4 py-2 bg-[#0F766E] hover:bg-teal-800 text-white rounded-lg text-sm font-semibold transition-colors">
                  Publikasikan Perubahan
                </button>
              </div>
            </div>

            {/* Section 1: Informasi Dasar Kursus */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-bold text-gray-900">Informasi Dasar Kursus</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Kursus</label>
                  <input type="text" defaultValue="Etika Birokrasi Modern" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10">
                        <option>Pengembangan Kompetensi</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Jam Pelajaran (JPL)</label>
                    <input type="number" defaultValue="12" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Kursus</label>
                  <textarea rows="4" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none" defaultValue="Kursus ini dirancang untuk membekali Aparatur Sipil Negara (ASN) dengan pemahaman mendalam tentang prinsip-prinsip etika dalam birokrasi modern, berfokus pada integritas, akuntabilitas, dan pelayanan prima."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Kursus</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center mb-4 text-teal-600">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Klik untuk unggah atau seret gambar ke sini</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB (Rekomendasi 16:9)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Modul & Materi */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Modul & Materi</h2>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-[#0F766E] text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus className="w-4 h-4" /> Tambah Modul
                </button>
              </div>
              <div className="p-6 space-y-4">
                {/* Modul 1 (Expanded) */}
                <div className="border border-[#0F766E]/20 rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between px-4 py-3 bg-teal-50 cursor-pointer"
                    onClick={() => setIsModule1Open(!isModule1Open)}
                  >
                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-900">
                      <Menu className="w-4 h-4 text-gray-400" />
                      Modul 1: Konsep Dasar Etika
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isModule1Open ? 'rotate-180' : ''}`} />
                  </div>
                  {isModule1Open && (
                    <div className="p-4 bg-white border-t border-[#0F766E]/10">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Tipe Materi Utama</label>
                      <div className="flex items-center gap-6 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <div className="w-4 h-4 rounded-full border-2 border-[#0F766E] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#0F766E]"></div>
                          </div>
                          <span className="text-sm text-gray-700 font-medium">Upload PDF</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center"></div>
                          <span className="text-sm text-gray-600">Embed YouTube Video</span>
                        </label>
                      </div>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
                        <FileText className="w-8 h-8 text-teal-600 mb-3" />
                        <p className="text-sm font-medium text-gray-900 mb-1">Unggah Dokumen PDF Modul</p>
                        <p className="text-xs text-gray-500">Maksimal ukuran file 10MB</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modul 2 (Collapsed) */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                      <Menu className="w-4 h-4 text-gray-400" />
                      Modul 2: Integritas Birokrasi Modern
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Evaluasi & Post Test */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-bold text-gray-900">Evaluasi & Post Test</h2>
              </div>
              <div className="p-6 space-y-8">
                
                {/* Kuis per Modul */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Kuis per Modul</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-gray-100 rounded-lg bg-gray-50">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Kuis Modul 1</p>
                        <p className="text-xs text-gray-500 mt-0.5">10 Pertanyaan • Bobot 15%</p>
                      </div>
                      <button className="flex items-center justify-center gap-1.5 text-sm font-semibold text-[#0F766E] hover:text-teal-800 transition-colors py-2 px-3 sm:p-0 rounded-lg sm:rounded-none bg-white sm:bg-transparent border sm:border-0 border-gray-200 w-full sm:w-auto">
                        <Edit2 className="w-4 h-4" /> Edit Kuis
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-gray-200 border-dashed rounded-lg bg-white">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Kuis Modul 2</p>
                        <p className="text-xs text-gray-400 mt-0.5">Belum ada pertanyaan</p>
                      </div>
                      <button className="flex items-center justify-center gap-1.5 text-sm font-semibold text-[#0F766E] hover:text-teal-800 transition-colors py-2 px-3 sm:p-0 rounded-lg sm:rounded-none bg-gray-50 sm:bg-transparent border sm:border-0 border-gray-200 w-full sm:w-auto">
                        <Plus className="w-4 h-4" /> Buat Kuis
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* Konfigurasi Post Test */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Konfigurasi Post Test Akhir</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nilai Kelulusan (Passing Grade)</label>
                      <div className="relative">
                        <input type="number" defaultValue="70" className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Batas Maksimal Percobaan</label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10">
                          <option>3 Kali</option>
                          <option>1 Kali</option>
                          <option>2 Kali</option>
                          <option>Tidak Terbatas</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* Bank Soal */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50/70 rounded-lg border border-gray-100">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Bank Soal Post Test</h3>
                    <p className="text-xs text-gray-500">Total 40 Pertanyaan tersedia di bank soal</p>
                  </div>
                  <button 
                    onClick={() => onNavigate && onNavigate('bank-soal')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#0F766E] hover:bg-teal-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm text-center"
                  >
                    Kelola Bank Soal
                  </button>
                </div>
              </div>
            </section>

            {/* Section 4: Surat Pernyataan */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  Surat Pernyataan Keabsahan Konten 
                  <span className="px-2 py-0.5 bg-gray-800 text-white text-[10px] uppercase font-bold rounded">Opsional</span>
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-900 mb-1">Perhatian Regulasi Penerbitan Kursus ASN</h4>
                    <p className="text-xs text-blue-800 leading-relaxed">Sesuai arahan Tim Ahli LAN RI dan regulasi BKPSDM Kabupaten Buleleng, Admin Komunitas melampirkan Surat Pernyataan (Opsional) Keabsahan Konten yang telah ditandatangani oleh Kepala Dinas/OPD terkait sebelum materi dapat dipublikasikan ke katalog umum.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3 mb-3 sm:mb-0">
                    <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-gray-400 border border-gray-200">
                      <File className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Format Baku Surat Pernyataan Keabsahan</p>
                      <p className="text-xs text-gray-500">Gunakan template resmi sesuai standar BKPSDM & LAN RI</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
                    <Download className="w-4 h-4" /> Unduh Template Surat (.docx / .pdf)
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Berkas Surat Pernyataan Bertanda Tangan (PDF) <span className="text-red-500">*</span></label>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-white flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="w-6 h-6 text-teal-600 mb-2" />
                      <p className="text-sm font-medium text-gray-900 mb-1"><span className="text-[#0F766E]">Klik untuk unggah</span> atau seret berkas ke sini</p>
                      <p className="text-xs text-gray-500">Format dokumen: PDF (Maksimal 5MB). Pastikan telah ditandatangani dan dibubuhi stempel dinas terkait.</p>
                    </div>
                  </div>
                  
                  {/* Uploaded File state */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 border border-red-100 bg-red-50/30 rounded-lg gap-3">
                    <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center font-bold text-sm shrink-0">
                        PDF
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-md">Surat_Pernyataan_Keabsahan_Etika_Birokrasi_Dinkes.pdf</p>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full shrink-0">Siap Dikirim</span>
                        </div>
                        <p className="text-xs text-gray-500">1.4 MB • Diunggah 24 Okt 2026, 10:30 WITA</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-red-100/60 shrink-0">
                      <button className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors px-2.5 py-1.5 rounded-md hover:bg-teal-50">
                        <Eye className="w-3.5 h-3.5" /> Lihat
                      </button>
                      <button className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors px-2.5 py-1.5 rounded-md hover:bg-gray-100">
                        Ganti File
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Informasi Pejabat Penandatangan (Sesuai Berkas Fisik)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Kepala Dinas / Pejabat Berwenang</label>
                      <input type="text" defaultValue="dr. I Nyoman Suardana, M.Kes" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">NIP Pejabat Penandatangan</label>
                      <input type="text" defaultValue="19720415 199803 1 004" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Jabatan & Unit Kerja (OPD)</label>
                      <input type="text" defaultValue="Kepala Dinas Kesehatan Kabupaten Buleleng" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor Surat / Dokumen</label>
                      <input type="text" defaultValue="800/1420/DINKES/2026" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20" />
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-gray-200 p-4 px-6 z-20 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
          Simpan Perubahan
        </button>
        <button className="w-full sm:w-auto px-6 py-2 bg-[#0F766E] hover:bg-teal-800 text-white rounded-lg text-sm font-semibold transition-colors">
          Ajukan Approval Publikasi ke BKPSDM
        </button>
      </div>
    </div>
  );
};

export default DetailKursus;
