import React, { useState } from 'react';
import { 
  Users, BookOpen, MessageSquare, Award, CheckCircle, 
  TrendingUp, TrendingDown, ArrowRight, LayoutDashboard,
  ShieldCheck, BarChart3, HelpCircle, LogOut, Bell, Settings,
  Search, ChevronRight, Clock, Book, Menu, X
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'admin', onNavigate, isOpen, setIsOpen }) => {
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
            placeholder="Cari..."
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

const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, colorClass }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-500 text-xs sm:text-sm font-medium">{title}</h3>
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    </div>
    <div className="mt-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{value}</h2>
      {trend ? (
        <div className="flex items-center gap-1 mt-1">
          {trend === 'up' ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />}
          <span className={`text-[10px] sm:text-xs font-medium ${trend === 'up' ? 'text-teal-600' : 'text-red-600'}`}>
            {trendValue}
          </span>
        </div>
      ) : (
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  </div>
);

const ChartPlaceholder = () => (
  <div className="relative w-full h-48 sm:h-64 mt-6">
    <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6">
      {[3500, 3000, 2500, 2000, 1500, 1000, 500, 0].map((val, i) => (
        <div key={i} className="flex items-center w-full">
          <span className="text-[10px] sm:text-xs text-gray-400 w-8 sm:w-10 text-right pr-2">{val === 0 ? '0' : val.toLocaleString()}</span>
          <div className="flex-1 border-t border-gray-100 border-dashed"></div>
        </div>
      ))}
    </div>
    
    <div className="absolute inset-0 left-8 sm:left-10 bottom-6 right-0">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <path d="M 0,80 Q 20,40 40,60 T 80,20 L 100,10" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
        <path d="M 0,80 Q 20,40 40,60 T 80,20 L 100,10 L 100,100 L 0,100 Z" fill="rgba(20, 184, 166, 0.1)" />
        
        <circle cx="0" cy="80" r="1.5" fill="#1e293b" />
        <circle cx="22" cy="45" r="1.5" fill="#1e293b" />
        <circle cx="45" cy="58" r="1.5" fill="#1e293b" />
        <circle cx="68" cy="35" r="1.5" fill="#1e293b" />
        <circle cx="85" cy="22" r="1.5" fill="#1e293b" />
        <circle cx="100" cy="10" r="1.5" fill="#1e293b" />
      </svg>
    </div>
    
    <div className="absolute bottom-0 left-8 sm:left-10 right-0 flex justify-between px-2">
      <span className="text-[10px] sm:text-xs text-gray-400">May</span>
      <span className="text-[10px] sm:text-xs text-gray-400">Jun</span>
      <span className="text-[10px] sm:text-xs text-gray-400">Jul</span>
      <span className="text-[10px] sm:text-xs text-gray-400 hidden sm:inline">Aug</span>
      <span className="text-[10px] sm:text-xs text-gray-400 hidden sm:inline">Sep</span>
      <span className="text-[10px] sm:text-xs text-gray-400">Oct</span>
    </div>
  </div>
);

const AdminDashboard = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar activeMenu="admin" onNavigate={onNavigate} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full overflow-hidden">
        <AdminHeader setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Dashboard Admin BKPSDM</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <StatCard 
              title="Total Participants" 
              value="12,450" 
              trend="up"
              trendValue="↑ +15% this month"
              icon={Users}
              colorClass="bg-teal-50 text-teal-600"
            />
            <StatCard 
              title="Active Courses" 
              value="342" 
              subtitle="Across 12 categories"
              icon={BookOpen}
              colorClass="bg-teal-50 text-teal-600"
            />
            <StatCard 
              title="Total Communities" 
              value="56" 
              trend="up"
              trendValue="↑ +3 new this week"
              icon={MessageSquare}
              colorClass="bg-teal-50 text-teal-600"
            />
            <StatCard 
              title="Issued Certificates" 
              value="8,920" 
              subtitle="Verified completions"
              icon={Award}
              colorClass="bg-teal-50 text-teal-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Course Completion Trends</h2>
                <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-500 w-full sm:w-auto">
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              <ChartPlaceholder />
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Community Activity</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">Kepemimpinan</h4>
                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">High Engagement</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600 text-sm sm:text-base ml-2">98%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">Manajemen ASN</h4>
                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">Moderate Engagement</p>
                    </div>
                  </div>
                  <span className="font-bold text-amber-500 text-sm sm:text-base ml-2">65%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">Literasi Digital</h4>
                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">Low Engagement</p>
                    </div>
                  </div>
                  <span className="font-bold text-rose-600 text-sm sm:text-base ml-2">24%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-800">Recent Course Submissions</h2>
              <div className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                3 Pending Review
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Title</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Community</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Submitted</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">JPL / Modules</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="font-semibold text-gray-800 text-xs sm:text-sm">Etika Birokrasi Modern</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="text-xs sm:text-sm text-gray-600">Pengembangan Kompetensi</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="text-xs sm:text-sm text-gray-600">24 Oct 2023</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium">
                          <Clock className="w-3 h-3" /> 12 JPL
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium">
                          <Book className="w-3 h-3" /> 4 Modul
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <button className="bg-teal-700 hover:bg-teal-800 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-medium transition-colors">
                        Validate
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="font-semibold text-gray-800 text-xs sm:text-sm">Dasar Pengadaan Barang & Jasa</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="text-xs sm:text-sm text-gray-600">Fungsional Umum</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="text-xs sm:text-sm text-gray-600">23 Oct 2023</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium">
                          <Clock className="w-3 h-3" /> 24 JPL
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium">
                          <Book className="w-3 h-3" /> 8 Modul
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <button className="bg-teal-700 hover:bg-teal-800 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-medium transition-colors">
                        Validate
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="font-semibold text-gray-800 text-xs sm:text-sm">Penyusunan SKP Terintegrasi</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="text-xs sm:text-sm text-gray-600">Manajemen Kinerja</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="text-xs sm:text-sm text-gray-600">21 Oct 2023</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium">
                          <Clock className="w-3 h-3" /> 8 JPL
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium">
                          <Book className="w-3 h-3" /> 3 Modul
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <button className="bg-teal-700 hover:bg-teal-800 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-medium transition-colors">
                        Validate
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
