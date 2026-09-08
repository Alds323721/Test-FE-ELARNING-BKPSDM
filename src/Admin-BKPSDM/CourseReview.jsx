import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Users, LayoutDashboard, ShieldCheck, BarChart3, LogOut, Bell, Settings,
  Search, ChevronRight, Menu, X, ArrowLeft, BookOpen, FileText, HelpCircle, 
  Eye, File
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'course-validation', onNavigate, isOpen, setIsOpen }) => {
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
            onClick={() => {
              localStorage.removeItem('access_token');
              localStorage.removeItem('user');
              if (onNavigate) onNavigate('landing');
            }}
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
            placeholder="Cari course..."
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

const CourseReview = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('reviewCourseData');
    if (data) {
      setCourse(JSON.parse(data));
    } else {
      if (onNavigate) onNavigate('course-validation');
    }
  }, [onNavigate]);

  const handleAction = async (status) => {
    try {
      await api.post(`/admin-bkpsdm/approval/${course.pembelajaran_id}`, {
        status_validasi: status,
        catatan: note
      });
      alert(`Validasi berhasil disimpan: ${status}`);
      if (onNavigate) onNavigate('course-validation');
    } catch (error) {
      console.error('Validation failed', error);
      alert('Gagal menyimpan validasi');
    }
  };

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar activeMenu="course-validation" onNavigate={onNavigate} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full overflow-hidden">
        <AdminHeader setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto relative">
          
          <button 
            onClick={() => onNavigate && onNavigate('course-validation')}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-700 font-medium text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Course Validation
          </button>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D315F] mb-2">Review & Validasi Kursus</h1>
              <p className="text-sm text-gray-500">Review detail konten pembelajaran sebelum dipublikasikan.</p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-orange-50 border border-orange-200 text-orange-700">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              {course.status.replace('_', ' ')}
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1 space-y-6">
              
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-6">Informasi Utama Kursus</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">JUDUL KURSUS</p>
                    <p className="font-bold text-gray-800">{course.judul_pembelajaran}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">KOMUNITAS PENYELENGGARA</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800">ID: {course.komunitas_id}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Kategori</p>
                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-medium">
                      {course.kategori || 'Tanpa Kategori'}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nilai Kelulusan</p>
                    <div className="flex items-center gap-3">
                      <div className="border border-gray-200 rounded px-3 py-1 flex items-baseline gap-1">
                        <span className="font-bold text-gray-800">{course.nilai_kelulusan}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admin Pembuat</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800 text-sm">ID: {course.dirancang_oleh_pengguna_id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-6">Deskripsi & Capaian</h3>
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-1">Deskripsi:</p>
                  <p className="text-sm text-gray-600">{course.deskripsi || '-'}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-1">Capaian Pembelajaran:</p>
                  <p className="text-sm text-gray-600">{course.capaian_pembelajaran || '-'}</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-full flex flex-col">
                <h3 className="font-bold text-gray-800 text-lg mb-3">Surat Pernyataan</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Dokumen pertanggungjawaban keaslian dan validitas materi dari penyelenggara.
                </p>
                
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center flex-1 bg-gray-50/50 mb-6">
                  <File className="w-10 h-10 text-gray-400 mb-4" />
                  <p className="font-bold text-gray-800 text-sm mb-1 break-all">SP_Keaslian_Materi.pdf</p>
                </div>
                
                <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Full Document
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 border-t border-gray-200 pt-6">
            <button 
              onClick={() => setShowRejectModal(true)}
              className="w-full sm:w-auto bg-white border border-gray-300 hover:bg-gray-50 text-red-600 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Request Revision (Tolak)
            </button>
            <button 
              onClick={() => handleAction('disetujui')}
              className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              Approve & Publish
            </button>
          </div>

          {/* Reject Modal */}
          {showRejectModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Catatan Revisi</h2>
                  <button onClick={() => setShowRejectModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pesan Revisi / Alasan Penolakan</label>
                    <textarea 
                      required 
                      rows={4}
                      value={note} 
                      onChange={e => setNote(e.target.value)} 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none" 
                      placeholder="Masukkan catatan perbaikan..." 
                    />
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => setShowRejectModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
                    <button onClick={() => handleAction('ditolak')} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Kirim & Tolak</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CourseReview;
