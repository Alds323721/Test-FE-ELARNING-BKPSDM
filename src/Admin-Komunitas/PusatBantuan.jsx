import React, { useState } from 'react';
import { 
  Users, BookOpen, Award, TrendingUp, TrendingDown,
  LayoutDashboard, LogOut, Bell, Settings, Search, Menu, X,
  FileText, RotateCcw, ChevronDown, CheckCircle2,
  PlayCircle, Edit, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Clock,
  BarChart2, Book, HelpCircle, GraduationCap, HeadphonesIcon, Download, Eye,
  ArrowRight, Video, Mail, MessageSquare, Monitor, FileQuestion, PenTool, Bug, Send
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'pusat-bantuan', onNavigate, isOpen, setIsOpen }) => {
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

const PusatBantuan = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <AdminSidebar activeMenu="pusat-bantuan" onNavigate={onNavigate} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-64">
        <Header setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
           {/* Header title */}
           <div className="mb-8">
             <h1 className="text-2xl font-bold text-gray-900 mb-1">Pusat Bantuan</h1>
             <p className="text-sm text-gray-500">Cari solusi, baca panduan, atau sampaikan keluhan terkait penggunaan platform E-Learning BKPSDM.</p>
           </div>

           {/* Search Banner */}
           <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 mb-8 flex flex-col items-center justify-center text-center">
             <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Bagaimana kami bisa membantu Anda?</h2>
             <div className="relative w-full max-w-2xl">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Ketik kata kunci masalah..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
             </div>
           </div>

           {/* Content Grid */}
           <div className="flex flex-col lg:flex-row gap-8 mb-8">
              {/* Left Column (Main Content) */}
              <div className="flex-1 flex flex-col gap-8">
                {/* Panduan Cepat */}
                <div>
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-gray-900">Panduan Cepat</h3>
                     <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">Lihat Semua <ArrowRight className="w-4 h-4" /></button>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                      {/* Cards */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:border-teal-500 transition-colors cursor-pointer group">
                         <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition-colors">
                           <BookOpen className="w-5 h-5" />
                         </div>
                         <div>
                           <h4 className="font-bold text-gray-900 text-sm mb-1">Memulai Pembelajaran</h4>
                           <p className="text-xs text-gray-500 line-clamp-2">Langkah pertama mengakses modul.</p>
                         </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:border-teal-500 transition-colors cursor-pointer group">
                         <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition-colors">
                           <FileQuestion className="w-5 h-5" />
                         </div>
                         <div>
                           <h4 className="font-bold text-gray-900 text-sm mb-1">Cara Mengerjakan Post Test</h4>
                           <p className="text-xs text-gray-500 line-clamp-2">Panduan kuis dan batas nilai kelulusan.</p>
                         </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:border-teal-500 transition-colors cursor-pointer group">
                         <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition-colors">
                           <Award className="w-5 h-5" />
                         </div>
                         <div>
                           <h4 className="font-bold text-gray-900 text-sm mb-1">Unduh Sertifikat</h4>
                           <p className="text-xs text-gray-500 line-clamp-2">Syarat dan cara mencetak sertifikat...</p>
                         </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:border-teal-500 transition-colors cursor-pointer group">
                         <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition-colors">
                           <PlayCircle className="w-5 h-5" />
                         </div>
                         <div>
                           <h4 className="font-bold text-gray-900 text-sm mb-1">Video Tutorial</h4>
                           <p className="text-xs text-gray-500 line-clamp-2">Kumpulan panduan visual interaktif.</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* FAQ */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageSquare className="w-6 h-6 text-teal-600" />
                    <h3 className="font-bold text-lg text-gray-900">Pertanyaan Sering Diajukan (FAQ)</h3>
                  </div>
                  <div className="space-y-3">
                    {/* FAQ Items */}
                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
                      <span className="font-semibold text-sm text-gray-900">Cara unduh sertifikat?</span>
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
                      <span className="font-semibold text-sm text-gray-900">Berapa Passing Grade untuk kuis?</span>
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
                      <span className="font-semibold text-sm text-gray-900">Bagaimana jika video materi tidak bisa diputar?</span>
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
                      <span className="font-semibold text-sm text-gray-900">Lupa kata sandi (Password)</span>
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Sampaikan Keluhan */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageSquare className="w-6 h-6 text-teal-600" />
                    <h3 className="font-bold text-lg text-gray-900">Sampaikan Keluhan</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Kategori Masalah</label>
                        <div className="relative">
                          <select className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-semibold text-gray-900">
                            <option value="">Pilih Kategori</option>
                            <option value="akun">Manajemen Akun</option>
                            <option value="modul">Pengelolaan Modul</option>
                            <option value="sertifikat">Kuis & Sertifikat</option>
                            <option value="teknis">Masalah Teknis</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Subjek</label>
                        <input type="text" placeholder="Singkat dan jelas" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Deskripsi Detail</label>
                      <textarea placeholder="Jelaskan kendala yang Anda alami secara detail..." rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"></textarea>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0F766E] text-white rounded-lg text-sm font-semibold hover:bg-teal-800 transition-colors w-full sm:w-auto">
                        <Send className="w-4 h-4" />
                        Kirim Keluhan
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (Sidebar) */}
              <div className="w-full lg:w-80 flex flex-col gap-8 shrink-0">
                 {/* Kontak Dukungan */}
                 <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <HeadphonesIcon className="w-6 h-6 text-teal-600" />
                      <h3 className="font-bold text-lg text-gray-900">Kontak Dukungan</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">Jika Anda membutuhkan bantuan langsung, silakan hubungi tim teknis kami.</p>
                    
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-0.5">Email Dukungan</p>
                          <p className="text-sm font-bold text-gray-900">helpdesk@bkpsdm.go.id</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-0.5">WhatsApp (Pesan Saja)</p>
                          <p className="text-sm font-bold text-gray-900">+62 812-3456-7890</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-0.5">Jam Operasional</p>
                          <p className="text-sm font-bold text-gray-900">Senin - Jumat, 08:00 - 16:00 WIB</p>
                        </div>
                      </div>
                    </div>
                 </div>

                 {/* Kategori Topik */}
                 <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-6">Kategori Topik</h3>
                    
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-0.5">Manajemen Akun</p>
                          <p className="text-xs text-gray-500">Profil, password, login</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                          <Monitor className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-0.5">Pengelolaan Modul</p>
                          <p className="text-xs text-gray-500">Materi, error video</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-0.5">Kuis & Sertifikat</p>
                          <p className="text-xs text-gray-500">Post-test, nilai, unduh</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                          <Bug className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-0.5">Masalah Teknis</p>
                          <p className="text-xs text-gray-500">Bug, sistem lambat</p>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="pb-36 sm:pb-24"></div>
        </main>
      </div>
    </div>
  );
};

export default PusatBantuan;
