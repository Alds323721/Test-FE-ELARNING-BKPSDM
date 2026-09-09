import React, { useState } from 'react';
import { 
  Users, BookOpen, Award, TrendingUp, TrendingDown,
  LayoutDashboard, LogOut, Bell, Settings, Search, Menu, X,
  FileText, RotateCcw, ChevronDown, CheckCircle2,
  PlayCircle, Edit, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Clock,
  BarChart2, Book, HelpCircle, GraduationCap, HeadphonesIcon
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'admin-komunitas', onNavigate, isOpen, setIsOpen }) => {
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

const AdminHeader = ({ setIsOpen }) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative w-40 sm:w-64 md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
            placeholder="Cari modul atau peserta..."
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors hidden sm:block">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300 ml-1 sm:ml-2 shrink-0">
          <img src="https://ui-avatars.com/api/?name=Budi&background=random" alt="Admin" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, colorClass }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-500 text-xs sm:text-sm font-semibold tracking-wide uppercase">{title}</h3>
      <div className={`p-2 rounded-full ${colorClass}`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    </div>
    <div className="mt-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</h2>
      {trend ? (
        <div className="flex items-center gap-1 mt-2">
          {trend === 'up' ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />}
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
            {trendValue}
          </span>
        </div>
      ) : (
        <p className="text-xs text-gray-500 mt-2 font-medium">{subtitle}</p>
      )}
    </div>
  </div>
);

const LineChartMockup = () => (
  <div className="relative w-full h-64 mt-6">
    <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6">
      {[1000, 750, 500, 250, 0].map((val, i) => (
        <div key={i} className="flex items-center w-full">
          <span className="text-[10px] sm:text-xs text-gray-400 w-8 sm:w-10 text-right pr-2">
            {val === 0 ? '0' : val.toLocaleString()}
          </span>
          <div className="flex-1 border-t border-gray-100 border-dashed"></div>
        </div>
      ))}
    </div>
    <div className="absolute inset-0 left-8 sm:left-10 bottom-6 right-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0,80 Q 20,60 40,65 T 70,40 T 95,20" fill="none" stroke="#3FCDC1" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="80" r="2" fill="#1D315F" />
        <circle cx="40" cy="65" r="2" fill="#1D315F" />
        <circle cx="70" cy="40" r="2" fill="#1D315F" />
        <circle cx="95" cy="20" r="2" fill="#1D315F" />
      </svg>
    </div>
    <div className="absolute bottom-0 left-8 sm:left-10 right-0 flex justify-between px-2 sm:px-4">
      {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, idx) => (
        <span key={idx} className="text-[10px] sm:text-xs text-gray-500 font-medium">
          {month}
        </span>
      ))}
    </div>
  </div>
);

const AdminKomunitasDashboard = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <AdminSidebar onNavigate={onNavigate} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full overflow-hidden">
        <AdminHeader setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Admin Komunitas</h1>
            <p className="text-sm text-gray-500 mt-1">Pantau perkembangan pembelajaran dan peserta di komunitas Anda.</p>
          </div>
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <StatCard 
              title="TOTAL PESERTA" 
              value="1,240" 
              trend="up"
              trendValue="+5% bulan ini"
              icon={Users}
              colorClass="bg-teal-50 text-teal-600"
            />
            <StatCard 
              title="PEMBELAJARAN AKTIF" 
              value="12" 
              subtitle="Tersebar di 3 kategori"
              icon={FileText}
              colorClass="bg-indigo-50 text-indigo-600"
            />
            <StatCard 
              title="RATA-RATA PROGRES" 
              value="75%" 
              trend="up"
              trendValue="+2% minggu ini"
              icon={RotateCcw}
              colorClass="bg-amber-50 text-amber-600"
            />
            <StatCard 
              title="SERTIFIKAT TERBIT" 
              value="850" 
              subtitle="Telah diverifikasi"
              icon={Award}
              colorClass="bg-emerald-50 text-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* Chart Section */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Tren Penyelesaian Modul</h2>
                <button className="flex items-center gap-2 text-sm text-gray-600 font-medium border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                  Last 6 Months <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <LineChartMockup />
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-6">Aktivitas Belajar Terkini</h2>
              <div className="flex-1 space-y-6">
                {[
                  { name: 'Budi Santoso', action: 'menyelesaikan Modul 1: Etika Birokrasi', time: '2 jam yang lalu', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { name: 'Siti Aminah', action: 'lulus Post Test Kepemimpinan ASN', time: '5 jam yang lalu', icon: FileText, color: 'text-teal-600', bg: 'bg-teal-50' },
                  { name: 'Ahmad Ridwan', action: 'memulai Literasi Digital Dasar', time: 'Hari ini, 09:00', icon: PlayCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { name: 'Dewi Lestari', action: 'mendapatkan sertifikat Manajemen Kinerja', time: 'Kemarin', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 leading-snug">
                        <span className="font-bold">{item.name}</span> {item.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-teal-600 font-semibold text-sm hover:text-teal-700 w-full text-center">
                Lihat Semua Aktivitas
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Daftar Pembelajaran di Komunitas</h2>
              <button className="flex items-center justify-center gap-2 text-sm text-gray-700 font-medium border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 w-full sm:w-auto transition-colors">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Judul Pembelajaran</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Total Peserta</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Progres Rata-Rata</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { title: 'Etika Birokrasi Modern', jpl: '12 JPL', modules: '4 Modul', category: 'Pengembangan Kompetensi', participants: 342, progress: 85, status: 'Published', statusColor: 'bg-emerald-100 text-emerald-700' },
                    { title: 'Kepemimpinan Transformasional', jpl: '24 JPL', modules: '8 Modul', category: 'Manajemen ASN', participants: 156, progress: 45, status: 'Published', statusColor: 'bg-emerald-100 text-emerald-700' },
                    { title: 'Literasi Digital Lanjutan', jpl: '8 JPL', modules: '3 Modul', category: 'Teknologi Informasi', participants: 0, progress: 0, status: 'Draft', statusColor: 'bg-gray-100 text-gray-600' }
                  ].map((course, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-900">{course.title}</p>
                        <div className="flex gap-3 mt-1 text-xs text-gray-500 font-medium">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.jpl}</span>
                          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.modules}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-gray-700 w-32">{course.category}</p>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <p className="font-bold text-gray-900">{course.participants}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-full bg-gray-200 rounded-full h-1.5 w-24">
                            <div className={`h-1.5 rounded-full ${course.progress > 50 ? 'bg-teal-600' : (course.progress > 0 ? 'bg-amber-400' : 'bg-gray-300')}`} style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <span className="text-sm font-bold text-gray-700">{course.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${course.statusColor}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button 
                          onClick={() => onNavigate && onNavigate('detail-kursus')}
                          title="Kelola Kursus"
                          className="text-teal-600 hover:text-teal-800 transition-colors p-2 rounded-md hover:bg-teal-50"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-gray-600 font-medium">
                Menampilkan 1-3 dari 12 pembelajaran
              </span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-teal-700 text-white font-medium text-sm">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-sm">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-sm">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-500">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminKomunitasDashboard;
