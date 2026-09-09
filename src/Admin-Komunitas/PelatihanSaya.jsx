import React, { useState } from 'react';
import { 
  Users, BookOpen, Award, TrendingUp, TrendingDown,
  LayoutDashboard, LogOut, Bell, Settings, Search, Menu, X,
  FileText, RotateCcw, ChevronDown, CheckCircle2,
  PlayCircle, Edit, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Clock,
  BarChart2, Book, HelpCircle, GraduationCap, HeadphonesIcon, Plus, MoreVertical
} from 'lucide-react';

// Reuse the exact same sidebar component
const AdminSidebar = ({ activeMenu = 'pelatihan-saya', onNavigate, isOpen, setIsOpen }) => {
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

const PelatihanSaya = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Aktif');

  const tabs = ['Aktif', 'Draft', 'Selesai'];

  const courseData = [
    {
      id: 1,
      category: 'Pengembangan Kompetensi',
      title: 'Etika Birokrasi Modern',
      jpl: 12,
      modules: 4,
      participants: 342,
      progress: 85,
    },
    {
      id: 2,
      category: 'Manajemen ASN',
      title: 'Kepemimpinan Transformasional',
      jpl: 24,
      modules: 8,
      participants: 156,
      progress: 45,
    },
    {
      id: 3,
      category: 'Teknologi Informasi',
      title: 'Literasi Digital Dasar untuk ASN',
      jpl: 8,
      modules: 3,
      participants: 89,
      progress: 12,
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <AdminSidebar 
        activeMenu="pelatihan-saya" 
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Pelatihan</h1>
                <p className="text-sm text-gray-500">Kelola konten pelatihan dan pantau progres peserta di komunitas Anda.</p>
              </div>
              <button className="flex items-center gap-2 bg-[#0F766E] hover:bg-teal-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors w-full sm:w-auto justify-center">
                <Plus className="w-4 h-4" />
                Buat Pelatihan Baru
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6 overflow-x-auto">
              <nav className="flex space-x-8 min-w-max" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab
                        ? 'border-[#0F766E] text-[#0F766E]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courseData.map((course) => (
                <div key={course.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                      {course.category}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Course Info */}
                  <div className="mb-6 flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{course.jpl} JPL</span>
                      </div>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.modules} Modul</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between py-4 border-t border-b border-gray-100 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                        <Users className="w-4 h-4 text-teal-700" />
                      </div>
                      <span className="font-semibold text-gray-900">{course.participants} Peserta</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-0.5">Rata-rata Progres</p>
                      <p className="font-bold text-teal-600">{course.progress}%</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => onNavigate && onNavigate('detail-kursus')}
                      className="flex-1 px-4 py-2.5 border border-[#0F766E] text-[#0F766E] hover:bg-teal-50 rounded-lg text-sm font-semibold transition-colors w-full text-center"
                    >
                      Edit Konten
                    </button>
                    <button 
                      onClick={() => onNavigate && onNavigate('detail-kursus')}
                      className="flex-1 px-4 py-2.5 bg-[#0F766E] hover:bg-teal-800 text-white rounded-lg text-sm font-semibold transition-colors w-full text-center"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default PelatihanSaya;
