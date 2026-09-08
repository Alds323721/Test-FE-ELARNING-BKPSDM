import React, { useState } from 'react';
import { 
  Users, LayoutDashboard, ShieldCheck, BarChart3, LogOut, Bell, Settings,
  Search, ChevronRight, Menu, X, Plus, CheckCircle, ClipboardList, 
  Filter, ChevronLeft
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'community-management', onNavigate, isOpen, setIsOpen }) => {
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
            placeholder="Cari komunitas..."
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
  <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`p-3 sm:p-4 rounded-full ${colorClass} flex items-center justify-center shrink-0`}>
      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColorClass}`} />
    </div>
    <div>
      <h3 className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">{title}</h3>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{value}</h2>
    </div>
  </div>
);

const CommunityManagement = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const communities = [
    {
      id: 1,
      name: "Kepemimpinan",
      description: "Fokus pada pengembangan kapabilitas man...",
      admin: { name: "Dr. Hendra Saputra", nip: "NIP. 197805122005011003" },
      modules: "24 Modul",
      status: "Aktif"
    },
    {
      id: 2,
      name: "Manajemen ASN",
      description: "Regulasi dan praktik kepegawaian terkini.",
      admin: { name: "Siti Aminah, M.Si", nip: "NIP. 198211052008032001" },
      modules: "18 Modul",
      status: "Aktif"
    },
    {
      id: 3,
      name: "Literasi Digital",
      description: "Peningkatan kemampuan IT dasar dan keam...",
      admin: { name: "Belum Ditugaskan", nip: "-" },
      modules: "8 Modul",
      status: "Menunggu Validasi"
    },
    {
      id: 4,
      name: "Pelayanan Publik",
      description: "Standar pelayanan prima untuk instansi pem...",
      admin: { name: "Budi Santoso, S.E.", nip: "NIP. 197502282000031004" },
      modules: "12 Modul",
      status: "Nonaktif"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aktif':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Aktif</span>;
      case 'Menunggu Validasi':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">Menunggu Validasi</span>;
      case 'Nonaktif':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Nonaktif</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar activeMenu="community-management" onNavigate={onNavigate} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full overflow-hidden">
        <AdminHeader setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full">
          
          {/* Header section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D315F] mb-1">Community Management</h1>
              <p className="text-sm text-gray-500">Kelola daftar komunitas belajar dan penetapan admin komunitas.</p>
            </div>
            <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center shrink-0">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Tambah Komunitas Baru
            </button>
          </div>
          
          {/* Stats section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard 
              title="TOTAL KOMUNITAS" 
              value="56" 
              icon={Users}
              colorClass="bg-blue-50"
              iconColorClass="text-blue-500"
            />
            <StatCard 
              title="KOMUNITAS AKTIF" 
              value="48" 
              icon={CheckCircle}
              colorClass="bg-green-50"
              iconColorClass="text-green-500"
            />
            <StatCard 
              title="MENUNGGU VALIDASI" 
              value="8" 
              icon={ClipboardList}
              colorClass="bg-orange-50"
              iconColorClass="text-orange-500"
            />
          </div>

          {/* Table section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            {/* Table Filters */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                  placeholder="Cari komunitas..."
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select className="border border-gray-200 rounded-lg px-3 sm:px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white w-full md:w-auto">
                  <option>Semua Status</option>
                  <option>Aktif</option>
                  <option>Menunggu Validasi</option>
                  <option>Nonaktif</option>
                </select>
                <button className="border border-gray-200 p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shrink-0">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">NAMA KOMUNITAS</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">DESKRIPSI SINGKAT</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">ADMIN KOMUNITAS</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">TOTAL PEMBELAJARAN</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {communities.map((community) => (
                    <tr key={community.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800">{community.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{community.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{community.admin.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{community.admin.nip}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-700">{community.modules}</p>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(community.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-gray-600 font-semibold text-center sm:text-left">
                Menampilkan 1-4 dari 56 komunitas
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

export default CommunityManagement;
