import React, { useState } from 'react';
import { 
  Users, LayoutDashboard, ShieldCheck, BarChart3, LogOut, Bell, Settings,
  Search, ChevronRight, Menu, X, Download, TrendingUp, Award, CheckCircle,
  Calendar, ChevronLeft
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'monitoring-reports', onNavigate, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'admin', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'user-management', label: 'Manajemen Pengguna', icon: Users },
    { id: 'community-management', label: 'Manajemen Komunitas', icon: Users },
    { id: 'course-validation', label: 'Validasi Kursus', icon: ShieldCheck },
    { id: 'monitoring-reports', label: 'Monitoring & Laporan', icon: BarChart3 },
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
        <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shrink-0">
              <img src="https://ui-avatars.com/api/?name=BKPSDM&background=0D8ABC&color=fff" alt="BKPSDM" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-sm">BKPSDM</h2>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
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
                    ? 'bg-teal-700 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="text-left truncate leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-50 transition-colors">
            Bantuan Teknis
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('landing')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400 shrink-0" />
            <span>Logout</span>
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
            placeholder="Cari laporan..."
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
          <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, colorClass, iconColorClass }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-full ${colorClass} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${iconColorClass}`} />
      </div>
    </div>
    <div>
      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
      <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
    </div>
  </div>
);

const MonitoringReports = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const reports = [
    {
      id: 1,
      name: "Budi Prakoso",
      nip: "198504122010011015",
      course: "Etika Birokrasi Modern",
      community: "Dinas Pendidikan",
      progress: 100,
      status: "Lulus",
      hasCertificate: true
    },
    {
      id: 2,
      name: "Siti Aminah",
      nip: "199011232015032008",
      course: "Manajemen ASN",
      community: "Dinas Kesehatan",
      progress: 65,
      status: "Sedang Berjalan",
      hasCertificate: false
    },
    {
      id: 3,
      name: "Reza Wijaya",
      nip: "199508172020121002",
      course: "Literasi Digital",
      community: "Dinas Perdagangan",
      progress: 24,
      status: "Belum Mulai",
      hasCertificate: false
    },
    {
      id: 4,
      name: "Dewi Sartika",
      nip: "198205202005012003",
      course: "Dasar Pengadaan Barang & Jasa",
      community: "BKPSDM",
      progress: 100,
      status: "Lulus",
      hasCertificate: true
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Lulus':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 border border-green-200 text-green-700">Lulus</span>;
      case 'Sedang Berjalan':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 border border-orange-200 text-orange-700">Sedang Berjalan</span>;
      case 'Belum Mulai':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 border border-red-200 text-red-700">Belum Mulai</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-700">{status}</span>;
    }
  };

  const getProgressBarColor = (progress) => {
    if (progress === 100) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar activeMenu="monitoring-reports" onNavigate={onNavigate} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full overflow-hidden">
        <AdminHeader setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          
          {/* Header section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1D315F] mb-2">Monitoring & Laporan</h1>
            <p className="text-sm text-gray-500">Pantau aktivitas belajar, progres peserta, dan statistik kelulusan secara real-time.</p>
          </div>
          
          {/* Stats section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard 
              title="TOTAL PESERTA AKTIF" 
              value="11,892" 
              icon={Users}
              colorClass="bg-blue-50"
              iconColorClass="text-blue-500"
            />
            <StatCard 
              title="PROGRES RATA-RATA" 
              value="68%" 
              icon={TrendingUp}
              colorClass="bg-orange-50"
              iconColorClass="text-orange-500"
            />
            <StatCard 
              title="SERTIFIKAT TERBIT" 
              value="8,920" 
              icon={Award}
              colorClass="bg-green-50"
              iconColorClass="text-green-500"
            />
            <StatCard 
              title="TINGKAT KELULUSAN (%)" 
              value="94%" 
              icon={CheckCircle}
              colorClass="bg-teal-50"
              iconColorClass="text-teal-600"
            />
          </div>

          {/* Table section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            {/* Table Filters */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <select className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white w-full sm:w-auto">
                  <option>Semua Komunitas</option>
                  <option>Dinas Pendidikan</option>
                  <option>Dinas Kesehatan</option>
                </select>
                <select className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white w-full sm:w-auto">
                  <option>Semua Pembelajaran</option>
                  <option>Etika Birokrasi Modern</option>
                  <option>Manajemen ASN</option>
                </select>
                <div className="relative w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
                    placeholder="Pilih Rentang Tanggal"
                  />
                </div>
              </div>
              <button className="bg-white border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 w-full lg:w-auto justify-center">
                <Download className="w-4 h-4" />
                Export Laporan
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">NAMA PESERTA / NIP</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">PEMBELAJARAN</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">KOMUNITAS</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">PROGRES (%)</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">STATUS POST TEST</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">SERTIFIKAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800 mb-0.5">{report.name}</p>
                        <p className="text-sm text-gray-500">{report.nip}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800 text-sm">{report.course}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-700 text-sm">{report.community}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className={`${getProgressBarColor(report.progress)} h-2 rounded-full`} style={{ width: `${report.progress}%` }}></div>
                          </div>
                          <span className="font-bold text-gray-800 text-sm">{report.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(report.status)}
                      </td>
                      <td className="px-6 py-4">
                        {report.hasCertificate ? (
                          <button className="text-teal-700 hover:text-teal-800 font-bold text-sm flex items-center gap-1.5 transition-colors">
                            <Award className="w-4 h-4" />
                            Lihat Sertifikat
                          </button>
                        ) : (
                          <span className="text-gray-400 font-bold">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-gray-600 font-semibold text-center sm:text-left">
                Menampilkan 1 - 10 dari 11,892 laporan
              </span>
              
              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-teal-700 text-white font-semibold text-sm shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-colors">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-colors">
                  3
                </button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
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

export default MonitoringReports;
