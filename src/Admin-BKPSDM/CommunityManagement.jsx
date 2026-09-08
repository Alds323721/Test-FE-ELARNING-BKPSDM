import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
import AdminLoadingSkeleton from '../components/AdminLoadingSkeleton';
import { 
  Users, LayoutDashboard, ShieldCheck, BarChart3, LogOut, Bell, Settings,
  Search, ChevronRight, Menu, X, Plus, CheckCircle, ClipboardList, 
  Filter, ChevronLeft, Edit, Trash2
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'community-management', onNavigate, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'admin', label: 'Dasbor', icon: LayoutDashboard },
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
            onClick={() => {
              localStorage.removeItem('access_token');
              localStorage.removeItem('user');
              if (onNavigate) onNavigate('landing');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
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
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const [formData, setFormData] = useState({
    nama_komunitas: '', deskripsi: '', rumpun_jabatan: 'Pelaksana', status: 'aktif'
  });

  const fetchCommunities = async () => {
    try {
      const response = await api.get('/admin-bkpsdm/komunitas');
      setCommunities(response.data.data);
    } catch (error) {
      console.error('Failed to fetch communities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin-bkpsdm/komunitas', formData);
      setShowAddModal(false);
      setFormData({ nama_komunitas: '', deskripsi: '', rumpun_jabatan: 'Pelaksana', status: 'aktif' });
      fetchCommunities();
      Toast.fire({
        icon: 'success',
        title: 'Komunitas berhasil ditambahkan'
      });
    } catch (error) {
      console.error('Failed to add community:', error);
      Toast.fire({
        icon: 'error',
        title: 'Gagal menambahkan komunitas.'
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin-bkpsdm/komunitas/${selectedCommunity.komunitas_id}`, {
        nama_komunitas: selectedCommunity.nama_komunitas,
        deskripsi: selectedCommunity.deskripsi,
        rumpun_jabatan: selectedCommunity.rumpun_jabatan,
        status: selectedCommunity.status
      });
      setShowEditModal(false);
      setSelectedCommunity(null);
      fetchCommunities();
      Toast.fire({
        icon: 'success',
        title: 'Komunitas berhasil diperbarui'
      });
    } catch (error) {
      console.error('Failed to update community:', error);
      Toast.fire({
        icon: 'error',
        title: 'Gagal memperbarui komunitas.'
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Ingin menghapus komunitas ini?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/admin-bkpsdm/komunitas/${id}`);
        fetchCommunities();
        Toast.fire({
          icon: 'success',
          title: 'Komunitas berhasil dihapus'
        });
      } catch (error) {
        console.error('Failed to delete community:', error);
        Toast.fire({
          icon: 'error',
          title: 'Gagal menghapus komunitas'
        });
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'aktif':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 capitalize">{status}</span>;
      case 'nonaktif':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 capitalize">{status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 capitalize">{status || 'menunggu'}</span>;
    }
  };

  if (loading) return <AdminLoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar activeMenu="community-management" onNavigate={onNavigate} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full overflow-hidden">
        <AdminHeader setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full relative">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D315F] mb-1">Manajemen Komunitas</h1>
              <p className="text-sm text-gray-500">Kelola daftar komunitas belajar dan penetapan admin komunitas.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center shrink-0"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Tambah Komunitas Baru
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard 
              title="TOTAL KOMUNITAS" 
              value={communities.length} 
              icon={Users}
              colorClass="bg-blue-50"
              iconColorClass="text-blue-500"
            />
            <StatCard 
              title="KOMUNITAS AKTIF" 
              value={communities.filter(c => c.status === 'aktif').length} 
              icon={CheckCircle}
              colorClass="bg-green-50"
              iconColorClass="text-green-500"
            />
            <StatCard 
              title="KOMUNITAS NONAKTIF" 
              value={communities.filter(c => c.status === 'nonaktif').length} 
              icon={ClipboardList}
              colorClass="bg-orange-50"
              iconColorClass="text-orange-500"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
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
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">NAMA KOMUNITAS</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">DESKRIPSI SINGKAT</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">RUMPUN JABATAN</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">STATUS</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {communities.map((community) => (
                    <tr key={community.komunitas_id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800">{community.nama_komunitas}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{community.deskripsi}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full">{community.rumpun_jabatan}</span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(community.status)}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button 
                          onClick={() => { setSelectedCommunity({...community}); setShowEditModal(true); }}
                          className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(community.komunitas_id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {communities.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        Belum ada komunitas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Community Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Tambah Komunitas Baru</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Komunitas</label>
                    <input required type="text" value={formData.nama_komunitas} onChange={e => setFormData({...formData, nama_komunitas: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none" placeholder="Masukkan nama komunitas" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
                    <textarea value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none" placeholder="Deskripsi singkat komunitas"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Rumpun Jabatan</label>
                    <select value={formData.rumpun_jabatan} onChange={e => setFormData({...formData, rumpun_jabatan: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option value="JPT">JPT</option>
                      <option value="JA">JA</option>
                      <option value="JF">JF</option>
                      <option value="Pelaksana">Pelaksana</option>
                    </select>
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
                    <button type="submit" className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Community Modal */}
          {showEditModal && selectedCommunity && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Edit Komunitas</h2>
                  <button onClick={() => {setShowEditModal(false); setSelectedCommunity(null);}} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Komunitas</label>
                    <input required type="text" value={selectedCommunity.nama_komunitas} onChange={e => setSelectedCommunity({...selectedCommunity, nama_komunitas: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
                    <textarea value={selectedCommunity.deskripsi || ''} onChange={e => setSelectedCommunity({...selectedCommunity, deskripsi: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Rumpun Jabatan</label>
                    <select value={selectedCommunity.rumpun_jabatan} onChange={e => setSelectedCommunity({...selectedCommunity, rumpun_jabatan: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option value="JPT">JPT</option>
                      <option value="JA">JA</option>
                      <option value="JF">JF</option>
                      <option value="Pelaksana">Pelaksana</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select value={selectedCommunity.status} onChange={e => setSelectedCommunity({...selectedCommunity, status: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option value="aktif">Aktif</option>
                      <option value="nonaktif">Nonaktif</option>
                    </select>
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => {setShowEditModal(false); setSelectedCommunity(null);}} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
                    <button type="submit" className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800">Update</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CommunityManagement;
