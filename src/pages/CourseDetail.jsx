import { useState, useEffect } from 'react';
import api from '../api/axios';
import Swal from 'sweetalert2';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import ProfileDropdown from '../components/ProfileDropdown';
import LanguageDropdown from '../components/LanguageDropdown';
import { useLanguage } from '../context/LanguageContext';
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
  MapPin,
  ExternalLink,
  Video
} from 'lucide-react';

const extractYouTubeId = (url) => {
  if (!url) return null;
  let cleaned = String(url).trim();
  if (cleaned.includes('<iframe')) {
    const srcMatch = cleaned.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      cleaned = srcMatch[1];
    }
  }
  const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const match = cleaned.match(regExp);
  return match ? match[1] : null;
};

const getDocumentUrl = (path) => {
  if (!path) return '';
  const trimmed = String(path).trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  const origin = apiBase.replace(/\/api\/?$/, '');
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${origin}${cleanPath}`;
};

const isMateriVideo = (materi) => {
  if (!materi) return false;
  if (materi.tipe === 'video' || materi.tipe === 'video_embed') return true;
  if (extractYouTubeId(materi.tautan)) return true;
  if (materi.tautan && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(materi.tautan)) return true;
  return false;
};

const CourseDetailNavbar = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-2 sm:gap-3">
        <img src={logoImg} alt="Logo BKPSDM" className="w-6 sm:w-8 object-contain" />
        <span className="font-semibold text-base sm:text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-[#1D315F] font-semibold text-sm">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63] transition-colors pb-1">{t('nav.dashboard')}</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors pb-1">{t('nav.community')}</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors pb-1">{t('nav.catalog')}</a>
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">{t('nav.myCourses')}</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors pb-1">{t('nav.helpCenter')}</a>

        <div className="flex items-center gap-4 ml-4 border-l border-gray-200 pl-6">
          <LanguageDropdown />
          <button className="relative text-[#1D315F] hover:text-[#006A63]">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">10+</span>
          </button>
          <button className="text-[#1D315F] hover:text-[#006A63]">
            <Search className="w-5 h-5" />
          </button>
          <ProfileDropdown onLogout={() => onNavigate('landing')} />
        </div>
      </div>

      <div className="md:hidden flex items-center gap-3">
        <LanguageDropdown />
        <ProfileDropdown onLogout={() => onNavigate('landing')} />
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#1D315F] hover:text-[#006A63] focus:outline-none">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md md:hidden flex flex-col py-4 px-6 gap-4 text-[#1D315F] font-semibold text-sm z-50">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63] transition-colors">{t('nav.dashboard')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors">{t('nav.community')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors">{t('nav.catalog')}</a>
          <a href="#" className="text-[#006A63]">{t('nav.myCourses')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors">{t('nav.helpCenter')}</a>
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
    if (status === 'locked') return <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />;
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
                subtitle={`Tipe: ${isMateriVideo(mat) ? 'Video' : 'Materi Bacaan'}`}
                duration={mat.durasi}
                status={mat.is_read ? 'completed' : (mat.is_locked ? 'locked' : 'pending')}
                isActive={activeMateri?.materi_id === mat.materi_id}
                onClick={() => {
                  if (mat.is_locked) {
                    Swal.fire({
                      icon: 'info',
                      title: 'Materi Masih Terkunci',
                      text: 'Selesaikan materi sebelumnya sesuai urutan silabus terlebih dahulu.',
                      confirmButtonColor: '#006A63'
                    });
                    return;
                  }
                  onSelectMateri(mat);
                }}
              />
            ))}
            {modul.kuis && (
              <SyllabusItem
                key={`kuis-${modul.kuis.kuis_id}`}
                index="Kuis"
                title={modul.kuis.judul}
                subtitle="Kuis Evaluasi Modul"
                duration={modul.kuis.durasi}
                status={modul.kuis.is_completed ? 'completed' : (modul.kuis.is_locked ? 'locked' : 'pending')}
                isActive={false}
                onClick={() => {
                  if (modul.kuis.is_locked) {
                    Swal.fire({
                      icon: 'info',
                      title: 'Kuis Masih Terkunci',
                      text: 'Selesaikan seluruh materi pada modul ini terlebih dahulu sebelum mengerjakan kuis.',
                      confirmButtonColor: '#006A63'
                    });
                    return;
                  }
                  localStorage.setItem('userModulId', modul.modul_id);
                  localStorage.setItem('userKuisId', modul.kuis.kuis_id);
                  onNavigate('kuis');
                }}
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
            status={parseFloat(courseData.progress) >= 100 ? 'active' : 'locked'}
            onClick={() => {
               if (parseFloat(courseData.progress) >= 100) onNavigate('post-test');
               else Swal.fire({
                 icon: 'info',
                 title: 'Post Test Masih Terkunci',
                 text: 'Selesaikan seluruh materi dan kuis modul terlebih dahulu sebelum mengikuti Post Test.',
                 confirmButtonColor: '#006A63'
               });
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

  if (activeMateri.is_locked) {
    return (
      <div className="bg-white border border-[#BBC9C7] rounded-lg p-12 text-center text-gray-500 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-[#1D315F] mb-1">{activeMateri.judul}</h3>
        <p className="text-sm text-gray-500 max-w-md">
          Materi ini masih terkunci. Silakan selesaikan seluruh materi sebelumnya sesuai urutan silabus.
        </p>
      </div>
    );
  }

  const isVideo = isMateriVideo(activeMateri);
  const youtubeId = extractYouTubeId(activeMateri.tautan);
  const docUrl = getDocumentUrl(activeMateri.tautan);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden">
        <h2 className="text-lg md:text-xl font-semibold text-[#1D315F] p-4 md:p-6 pb-3 md:pb-4">
          {activeMateri.judul}
        </h2>
        
        {isVideo ? (
          <div className="w-full bg-black aspect-video relative overflow-hidden flex items-center justify-center">
            {youtubeId ? (
              <iframe
                className="w-full h-full border-0"
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                title={activeMateri.judul || 'Video Pembelajaran'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : activeMateri.tautan ? (
              <video
                controls
                className="w-full h-full object-contain"
                src={getDocumentUrl(activeMateri.tautan)}
              >
                Browser Anda tidak mendukung pemutar video.
              </video>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                <Video className="w-12 h-12 mb-2 text-gray-500" />
                <p className="text-sm font-semibold text-white">Tautan video tidak tersedia</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 md:p-12 bg-gray-50 flex items-center justify-center">
            <div className="text-center max-w-md">
              <FileText className="w-16 h-16 text-teal-600/70 mx-auto mb-3" />
              <p className="text-gray-600 font-medium mb-5 text-sm md:text-base">
                Silakan baca dokumen materi berikut
              </p>
              {activeMateri.tautan ? (
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#006A63] text-white rounded-lg font-bold text-sm hover:bg-[#00534D] active:scale-95 transition-all shadow-sm cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Buka Materi</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-xs font-semibold">
                  Dokumen materi belum tersedia
                </div>
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

const Footer = ({ onNavigate }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-[#BBC9C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        <div className="md:col-span-5 pr-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
            <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
          </div>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-6 font-semibold">
            {t('footer.tagline')}
          </p>
          <p className="text-[11px] text-gray-500 font-semibold">
            {t('footer.copyright')}
          </p>
        </div>
        <div className="md:col-span-3">
          <h4 className="font-semibold text-[#1D315F] text-[15px] mb-6">{t('footer.quickLinks')}</h4>
          <ul className="text-[13px] text-[#1D315F] space-y-3 font-semibold">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('catalog'); }} className="hover:text-[#006A63] transition-colors">{t('footer.courses')}</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('community'); }} className="hover:text-[#006A63] transition-colors">{t('footer.community')}</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('help-center'); }} className="hover:text-[#006A63] transition-colors">{t('footer.help')}</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="font-semibold text-[#1D315F] text-[15px] mb-6">{t('footer.contactUs')}</h4>
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
};

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
      Swal.fire({
        icon: 'success',
        title: 'Materi Selesai!',
        text: 'Progres belajar Anda telah tersimpan.',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan Progres',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan progres.',
        confirmButtonColor: '#006A63'
      });
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
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
