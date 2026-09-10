import { useState, useEffect } from 'react';
import api from '../Admin-Komunitas/api/axios';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  ChevronLeft,
  CheckCircle2,
  Circle,
  Download,
  FileText,
  Lock,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const CourseDetailNavbar = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-2 sm:gap-3">
        <img src={logoImg} alt="Logo BKPSDM" className="w-6 sm:w-8 object-contain" />
        <span className="font-semibold text-base sm:text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-[#1D315F] font-semibold text-sm">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63] transition-colors pb-1">Dashboard</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors pb-1">Komunitas</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors pb-1">Katalog</a>
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">Pelatihanku</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors pb-1">Bantuan</a>

        <div className="flex items-center gap-4 ml-4 border-l border-gray-200 pl-6">
          <button className="flex items-center gap-1 text-[#1D315F] hover:text-[#006A63] text-xs font-semibold">
            EN <ChevronDown className="w-3 h-3" />
          </button>
          <button className="relative text-[#1D315F] hover:text-[#006A63]">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">10+</span>
          </button>
          <button className="text-[#1D315F] hover:text-[#006A63]">
            <Search className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 ml-2 overflow-hidden flex-shrink-0">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" alt="User" />
          </div>
        </div>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#1D315F] hover:text-[#006A63] focus:outline-none">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md md:hidden flex flex-col py-4 px-6 gap-4 text-[#1D315F] font-semibold text-sm z-50">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63] transition-colors">Dashboard</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors">Komunitas</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors">Katalog</a>
          <a href="#" className="text-[#006A63]">Pelatihanku</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors">Bantuan</a>
        </div>
      )}
    </nav>
  );
};

const CourseHeader = ({ onBack, courseData }) => {
  const currentModule = courseData?.modul?.[0]?.judul || 'Modul';
  
  return (
    <div className="bg-[#1D315F] py-6 md:py-8 px-6 md:px-12 relative overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-4">{courseData?.judul || 'Detail Pelatihan'}</h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white text-xs sm:text-sm">
            <button 
              onClick={onBack}
              className="flex items-center gap-1 hover:text-[#3FCDC1] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali ke Pelatihanku</span>
            </button>
            <span className="hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm">{courseData?.kategori || ''}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-white">{courseData?.progress}% Selesai</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <div className="w-32 sm:w-48 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-[#3FCDC1]" style={{ width: `${courseData?.progress || 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SyllabusItem = ({ index, title, subtitle, duration, status, onClick, isActive }) => {
  const getStatusIcon = () => {
    if (status === 'completed') return <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#10B981]" />;
    return <Circle className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />;
  };

  return (
    <div 
      className={`flex items-start gap-2 md:gap-3 py-2 md:py-3 cursor-pointer hover:bg-gray-50 transition-colors px-2 rounded ${isActive ? 'bg-[#F4F8FB] border-l-4 border-[#3FCDC1]' : 'border-l-4 border-transparent'}`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mt-0.5">
        {getStatusIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#1D315F] text-xs md:text-sm mb-0.5">{index}. {title}</h4>
        <p className="text-xs text-gray-500 mb-1 font-semibold line-clamp-1">{subtitle}</p>
        {duration && <p className="text-xs text-gray-400 font-semibold">{duration} Menit</p>}
      </div>
    </div>
  );
};

const Sidebar = ({ courseData, activeMateri, onSelectMateri, onNavigate }) => {
  return (
    <aside className="bg-white border border-[#BBC9C7] rounded-lg p-4 md:p-6 overflow-y-auto max-h-[600px] custom-scrollbar">
      <h2 className="font-semibold text-[#1D315F] text-base md:text-lg mb-4">Silabus Pelatihan</h2>
      
      {courseData?.modul?.map((modul, idx) => (
        <div key={modul.modul_id} className="mb-6">
          <p className="text-xs md:text-sm text-[#006A63] font-bold mb-2">Modul {modul.urutan}: {modul.judul}</p>
          <div className="space-y-1 divide-y divide-gray-100 pl-2">
            {modul.materi?.map((mat, i) => (
              <SyllabusItem
                key={mat.materi_id}
                index={i + 1}
                title={mat.judul}
                subtitle={`Tipe: ${mat.tipe === 'video' ? 'Video' : 'Materi Bacaan'}`}
                duration={mat.durasi}
                status={mat.is_read ? 'completed' : 'pending'}
                isActive={activeMateri?.materi_id === mat.materi_id}
                onClick={() => onSelectMateri(mat)}
              />
            ))}
            {modul.kuis && (
              <SyllabusItem
                key={`kuis-${modul.kuis.kuis_id}`}
                index="Kuis"
                title={modul.kuis.judul}
                subtitle="Kuis Evaluasi Modul"
                duration={modul.kuis.durasi}
                status="pending"
                isActive={false}
                onClick={() => { /* Navigate to quiz if needed */ }}
              />
            )}
          </div>
        </div>
      ))}
      
      {courseData?.post_test && (
        <div className="mt-6 border-t pt-4">
          <p className="text-xs md:text-sm text-red-600 font-bold mb-2">Post Test</p>
          <SyllabusItem
            index="Akhir"
            title={courseData.post_test.judul}
            subtitle="Syarat Kelulusan"
            duration={courseData.post_test.durasi}
            status={courseData.progress === 100 ? 'active' : 'locked'}
            onClick={() => {
               if (courseData.progress === 100) onNavigate('post-test');
               else alert('Selesaikan semua materi terlebih dahulu.');
            }}
          />
        </div>
      )}
    </aside>
  );
};

const MainContent = ({ activeMateri, onMarkAsRead }) => {
  if (!activeMateri) {
    return (
      <div className="bg-white border border-[#BBC9C7] rounded-lg p-10 text-center text-gray-500">
        Silakan pilih materi di silabus untuk mulai belajar.
      </div>
    );
  }

  const isVideo = activeMateri.tipe === 'video';

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden">
        <h2 className="text-lg md:text-xl font-semibold text-[#1D315F] p-4 md:p-6 pb-3 md:pb-4">
          {activeMateri.judul}
        </h2>
        
        {isVideo ? (
          <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-red-700 transition-colors">
                  <div className="w-0 h-0 border-t-[10px] md:border-t-[12px] border-t-transparent border-l-[16px] md:border-l-[20px] border-l-white border-b-[10px] md:border-b-[12px] border-b-transparent ml-1"></div>
                </div>
                <div className="bg-black/70 px-4 py-4 md:px-6 md:py-8 rounded-lg max-w-md mx-auto">
                   {/* In a real app, this would be an iframe or video tag taking the full size */}
                  <p className="text-white text-xs md:text-sm font-semibold text-center mb-2">{activeMateri.tautan || 'Tautan video tidak tersedia'}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-gray-50 flex items-center justify-center">
             <div className="text-center">
               <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
               <p className="text-gray-600 mb-4">Silakan baca dokumen materi berikut</p>
               {activeMateri.tautan && (
                  <a href={activeMateri.tautan} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#006A63] text-white rounded font-bold hover:bg-[#00534D]">
                    Buka Dokumen <Download className="w-4 h-4" />
                  </a>
               )}
             </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-[#BBC9C7] rounded-lg p-4 md:p-6 flex justify-between items-center flex-wrap gap-4">
         <div>
            <h3 className="text-base md:text-lg font-semibold text-[#1D315F] mb-1">Status Penyelesaian</h3>
            <p className="text-xs text-gray-500">Tandai telah selesai jika Anda sudah memahami materi ini.</p>
         </div>
         <button 
           onClick={onMarkAsRead}
           disabled={activeMateri.is_read}
           className={`px-6 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors ${
             activeMateri.is_read 
               ? 'bg-green-100 text-green-700 cursor-not-allowed border border-green-200' 
               : 'bg-[#1D315F] text-white hover:bg-[#162847]'
           }`}
         >
           {activeMateri.is_read ? (
             <><CheckCircle2 className="w-5 h-5" /> Selesai Dibaca</>
           ) : (
             'Tandai Telah Dibaca'
           )}
         </button>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-[#BBC9C7]">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
      <div className="md:col-span-5 pr-8">
        <div className="flex items-center gap-3 mb-6">
          <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
          <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed mb-6 font-semibold">
          Platform Digital ASN untuk pengembangan kompetensi<br/>dan peningkatan kapasitas secara berkelanjutan.
        </p>
        <p className="text-[11px] text-gray-500 font-semibold">
          © 2026 BKPSDM. Hak Cipta Dilindungi Undang-Undang. Platform Digital ASN.
        </p>
      </div>
      <div className="md:col-span-3">
        <h4 className="font-semibold text-[#1D315F] text-[15px] mb-6">Tautan Cepat</h4>
        <ul className="text-[13px] text-[#1D315F] space-y-3 font-semibold underline decoration-transparent hover:decoration-current transition-colors">
          <li><a href="#">Tentang</a></li>
          <li><a href="#">Komunitas</a></li>
          <li><a href="#">Bantuan</a></li>
        </ul>
      </div>
      <div className="md:col-span-4">
        <h4 className="font-semibold text-[#1D315F] text-[15px] mb-6">Kontak Kami</h4>
        <ul className="text-[13px] text-gray-600 space-y-4">
          <li className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-[#006A63] mt-0.5 flex-shrink-0" />
            <span className="font-semibold">support@bkpsdm-pintar.go.id</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-[#006A63] mt-0.5 flex-shrink-0" />
            <span className="font-semibold">(021) 123-4567 (Jam Kerja)</span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#006A63] mt-0.5 flex-shrink-0" />
            <span className="font-semibold leading-relaxed">Gedung Kepegawaian Lt. 3, Jl. Protokol<br/>No. 1, Jakarta</span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default function CourseDetail({ onNavigate, onBack }) {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMateri, setActiveMateri] = useState(null);
  
  const courseId = localStorage.getItem('userCourseId');

  const fetchCourse = async () => {
    if (!courseId) {
      alert('Tidak ada course ID');
      onBack();
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(`/user/courses/${courseId}`);
      if (res.data?.data) {
        setCourseData(res.data.data);
        if (!activeMateri && res.data.data.modul?.[0]?.materi?.[0]) {
          setActiveMateri(res.data.data.modul[0].materi[0]);
        }
      }
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil data pelatihan');
      onBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleMarkAsRead = async () => {
    try {
      await api.post(`/user/courses/${courseId}/materi/${activeMateri.materi_id}/read`);
      // Update local state to reflect UI change instantly without full reload
      setActiveMateri(prev => ({ ...prev, is_read: true }));
      fetchCourse(); // refresh stats
    } catch (error) {
      alert(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan progres.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FBFC]">
        <div className="text-[#1D315F] font-bold">Memuat Detail Pelatihan...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FBFC]">
      <CourseDetailNavbar onNavigate={onNavigate} />
      <CourseHeader onBack={onBack} courseData={courseData} />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <MainContent 
                activeMateri={activeMateri} 
                onMarkAsRead={handleMarkAsRead} 
              />
            </div>
            
            <div className="lg:col-span-4 order-1 lg:order-2">
              <Sidebar 
                courseData={courseData} 
                activeMateri={activeMateri}
                onSelectMateri={setActiveMateri}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
