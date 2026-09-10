import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Users, BookOpen, Award, TrendingUp, TrendingDown,
  LayoutDashboard, LogOut, Bell, Settings, Search, Menu, X,
  FileText, RotateCcw, ChevronDown, CheckCircle2,
  PlayCircle, Edit, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Clock,
  BarChart2, Book, HelpCircle, GraduationCap, HeadphonesIcon, Check, Plus
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

const CourseCard = ({ course, onNavigate }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
    {/* Image Placeholder */}
    <div className="h-40 bg-gray-100 relative w-full overflow-hidden shrink-0">
      <img src={`https://picsum.photos/seed/${course.id}/400/200`} alt={course.title} className="w-full h-full object-cover" />
    </div>
    
    <div className="p-5 flex flex-col flex-1">
      {/* Category */}
      <div className="mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
          {course.category || course.kategori || '-'}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 leading-tight flex-1">
        {course.title || course.judul_pembelajaran || '-'}
      </h3>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 mt-auto">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{course.jpl} JPL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>{course.modules} Modul</span>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => {
          localStorage.setItem('adminKomunitasCourseId', course.id || course.pembelajaran_id);
          onNavigate('detail-kursus');
        }}
        className="w-full py-2.5 bg-[#0F766E] hover:bg-teal-800 text-white rounded-lg text-sm font-semibold transition-colors"
      >
        Lihat Detail
      </button>
    </div>
  </div>
);

const KatalogKursus = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  const categories = [
    'Semua Kategori',
    'Manajemen ASN',
    'Teknologi Informasi',
    'Pengembangan Kompetensi',
    'Pelayanan Publik'
  ];

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin-komunitas/pembelajaran');
        setCourses(response.data?.data || response.data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <AdminSidebar 
        activeMenu="katalog-kursus" 
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Katalog Kursus</h1>
                <p className="text-sm text-gray-500">Pilih dan ikuti berbagai pelatihan untuk meningkatkan kompetensi Anda.</p>
              </div>
              <button 
                onClick={() => {
                  localStorage.removeItem('adminKomunitasCourseId');
                  onNavigate('detail-kursus');
                }}
                className="bg-[#0F766E] hover:bg-teal-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" /> Tambah Kursus
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left Sidebar Filters */}
              <div className="w-full lg:w-64 shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                {/* Categories */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Kategori</h3>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          selectedCategory === cat 
                            ? 'bg-[#0F766E] border-[#0F766E]' 
                            : 'border-gray-300 group-hover:border-[#0F766E]'
                        }`}>
                          {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className={`text-sm ${selectedCategory === cat ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Urutkan</h3>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 pr-10 text-gray-600">
                      <option>Terbaru</option>
                      <option>Terpopuler</option>
                      <option>A-Z</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Course Grid */}
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {loading ? (
                    <div className="col-span-full text-center py-12 text-gray-500">Memuat data...</div>
                  ) : courses.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">Belum ada kursus.</div>
                  ) : (
                    courses.map((course) => (
                      <CourseCard key={course.id || course.pembelajaran_id} course={course} onNavigate={onNavigate} />
                    ))
                  )}
                </div>

                {/* Pagination */}
                <div className="mt-auto bg-white p-4 sm:p-6 rounded-xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-500">
                    Menampilkan 1-5 dari 24 pembelajaran
                  </p>
                  <div className="flex items-center gap-1">
                    <button className="p-2 border border-gray-200 text-gray-400 hover:text-gray-600 rounded-md transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#0F766E] text-white text-sm font-medium">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">3</button>
                    <span className="px-1 text-gray-400">...</span>
                    <button className="p-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KatalogKursus;
