import { useState } from 'react';
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

const CourseHeader = ({ onBack }) => (
  <div className="bg-[#1D315F] py-6 md:py-8 px-6 md:px-12 relative overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-4">Detail Materi Pelatihan</h1>
      
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
          <span className="text-xs sm:text-sm">Modul 2: Prinsip Dasar Manajemen Risiko</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-white">Modul 2</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <div className="w-16 sm:w-20 h-1.5 bg-[#3FCDC1] rounded-full"></div>
            <span className="text-white text-xs">1/6</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SyllabusItem = ({ number, title, subtitle, duration, status, isLocked }) => {
  const getStatusIcon = () => {
    if (status === 'completed') return <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#10B981]" />;
    if (isLocked) return <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />;
    return <Circle className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />;
  };

  return (
    <div className={`flex items-start gap-2 md:gap-3 py-2 md:py-3 ${isLocked ? 'opacity-50' : ''}`}>
      <div className="flex-shrink-0 mt-0.5">
        {getStatusIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#1D315F] text-xs md:text-sm mb-0.5">{number}. {title}</h4>
        <p className="text-xs text-gray-500 mb-1 font-semibold line-clamp-1">{subtitle}</p>
        {duration && <p className="text-xs text-gray-400 font-semibold">{duration}</p>}
      </div>
    </div>
  );
};

const Sidebar = ({ onNavigate }) => (
  <aside className="bg-white border border-[#BBC9C7] rounded-lg p-4 md:p-6">
    <h2 className="font-semibold text-[#1D315F] text-base md:text-lg mb-1">Silabus Modul 2</h2>
    <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 font-semibold">Prinsip Dasar Manajemen Risiko</p>

    <div className="space-y-2 divide-y divide-gray-100">
      <SyllabusItem
        number="1"
        title="Pengenalan Risiko"
        subtitle="Materi Bacaan"
        duration="• 10 menit"
        status="completed"
        isLocked={false}
      />
      <SyllabusItem
        number="2"
        title="Jenis Risiko"
        subtitle="Video"
        duration="• 12 menit"
        status="completed"
        isLocked={false}
      />
      <SyllabusItem
        number="3"
        title="Analisis Risiko Kualitatif"
        subtitle="Video • 15 menit • Sedang dipelajari"
        status="active"
        isLocked={false}
      />
      <SyllabusItem
        number="4"
        title="Analisis Kuantitatif"
        subtitle=""
        isLocked={true}
      />
      <SyllabusItem
        number="5"
        title="Studi Kasus"
        subtitle="Materi Bacaan • 30 menit"
        isLocked={true}
      />
      <SyllabusItem
        number="6"
        title="Kuis Evaluasi Modul 2"
        subtitle="Kuis • 10 menit • Syarat Kelulusan"
        isLocked={true}
      />
    </div>

    <button 
      onClick={() => onNavigate('post-test')}
      className="w-full mt-4 md:mt-6 py-2.5 md:py-3 bg-[#006A63] text-white text-sm md:text-base font-semibold rounded-md hover:bg-[#00534D] transition-colors"
    >
      Lanjut ke Materi Berikutnya →
    </button>
  </aside>
);

const MainContent = () => (
  <div className="space-y-4 md:space-y-6">
    <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden">
      <h2 className="text-lg md:text-xl font-semibold text-[#1D315F] p-4 md:p-6 pb-3 md:pb-4">
        Video Pembelajaran: Analisis Risiko Kualitatif
      </h2>
      
      <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-red-700 transition-colors">
              <div className="w-0 h-0 border-t-[10px] md:border-t-[12px] border-t-transparent border-l-[16px] md:border-l-[20px] border-l-white border-b-[10px] md:border-b-[12px] border-b-transparent ml-1"></div>
            </div>
            <div className="bg-black/70 px-4 py-4 md:px-6 md:py-8 rounded-lg max-w-md mx-auto">
              <p className="text-white font-semibold text-base md:text-2xl mb-1 md:mb-2">KEPEMIMPINAN & PELAYANAN</p>
              <p className="text-white font-semibold text-base md:text-2xl mb-2 md:mb-4">PUBLIK MODERN</p>
              <p className="text-white text-xs md:text-sm font-semibold">Agung Prasetyo, M.Si - Widyaiswara Ahli Madya</p>
            </div>
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-white text-xs md:text-sm font-semibold bg-black/50 px-2 py-1 rounded">
              45:30
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-[#BBC9C7] rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#1D315F] flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-base md:text-lg font-semibold text-[#1D315F] mb-2">Deskripsi Materi</h3>
          <div className="text-xs sm:text-sm text-[#64748B] leading-relaxed space-y-3 font-semibold">
            <p>
              Dalam materi ini, Anda akan mempelajari konsep dasar dan penerapan analisis risiko kualitatif dalam 
              konteks sektor publik. Materi ini dirancang untuk memberikan pemahaman praktis mengenai cara mengidentifikasi dan 
              mengevaluasi risiko tanpa menggunakan perhitungan matematis yang rumit.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Memahami perbedaan antara analisis kualitatif dan kuantitatif</li>
              <li>Menggunakan metrik probabilitas dan dampak untuk menilai risiko</li>
              <li>Mengidentifikasi prioritas risiko berdasarkan hasil analisis kualitatif</li>
              <li>Studi kasus penerapan pada instansi pemerintah daerah</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-[#BBC9C7] rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <Download className="w-5 h-5 md:w-6 md:h-6 text-[#1D315F] flex-shrink-0 mt-1" />
        <h3 className="text-base md:text-lg font-semibold text-[#1D315F]">Unduh Materi Pendukung</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        <div className="border border-gray-200 rounded-lg p-3 md:p-4 flex items-center gap-3 hover:border-[#3FCDC1] hover:shadow-sm transition-all cursor-pointer">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-xs sm:text-sm text-[#1D315F]">Slide Presentasi (PDF)</p>
            <p className="text-xs text-gray-500 font-semibold">2.6 MB</p>
          </div>
          <Download className="w-4 h-4 md:w-5 md:h-5 text-[#006A63] flex-shrink-0" />
        </div>

        <div className="border border-gray-200 rounded-lg p-3 md:p-4 flex items-center gap-3 hover:border-[#3FCDC1] hover:shadow-sm transition-all cursor-pointer">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-xs sm:text-sm text-[#1D315F] line-clamp-1">Template Checklist Analisis Risiko (XLS)</p>
            <p className="text-xs text-gray-500 font-semibold">1.1 MB</p>
          </div>
          <Download className="w-4 h-4 md:w-5 md:h-5 text-[#006A63] flex-shrink-0" />
        </div>
      </div>
    </div>
  </div>
);

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
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FBFC]">
      <CourseDetailNavbar onNavigate={onNavigate} />
      <CourseHeader onBack={onBack} />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <MainContent />
            </div>
            
            <div className="lg:col-span-4 order-1 lg:order-2">
              <Sidebar onNavigate={onNavigate} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
