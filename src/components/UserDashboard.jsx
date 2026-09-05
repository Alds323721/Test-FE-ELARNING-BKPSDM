import { useState } from 'react';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import ProfileDropdown from './ProfileDropdown';
import {
  Search,
  Bell,
  ChevronDown,
  Clock,
  BookOpen,
  CheckCircle2,
  Award,
  PlayCircle,
  FileDown,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  BookMarked,
  ArrowRight
} from 'lucide-react';

/* ── Navbar ─────────────────────────────────────────── */
const DashboardNavbar = ({ onLogout, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-2 sm:gap-3">
        <img src={logoImg} alt="Logo BKPSDM" className="w-6 sm:w-8 object-contain" />
        <span className="font-semibold text-base sm:text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-[#1D315F] font-semibold text-sm">
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">Dashboard</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors pb-1">Komunitas</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors pb-1">Katalog</a>
         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="hover:text-[#006A63] transition-colors pb-1">Pelatihanku</a>
         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63] transition-colors pb-1">Sertifikat</a>
         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors pb-1">Bantuan</a>

         {/* Right icons */}
         <div className="flex items-center gap-4 ml-4 border-l border-gray-200 pl-6">
          <button className="flex items-center gap-1 text-[#1D315F] hover:text-[#006A63] text-xs font-semibold">
            EN <ChevronDown className="w-3 h-3" />
          </button>
          <button className="relative text-[#1D315F] hover:text-[#006A63]">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">3</span>
          </button>
          <button className="text-[#1D315F] hover:text-[#006A63]">
            <Search className="w-5 h-5" />
          </button>
          <ProfileDropdown onLogout={onLogout} />
        </div>
      </div>

      {/* Mobile toggle */}
      <div className="md:hidden flex items-center gap-3">
        <ProfileDropdown onLogout={onLogout} />
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#1D315F] hover:text-[#006A63] focus:outline-none">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md md:hidden flex flex-col py-4 px-6 gap-4 text-[#1D315F] font-semibold text-sm z-50">
          <a href="#" className="text-[#006A63]">Dashboard</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors">Komunitas</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors">Katalog</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="hover:text-[#006A63] transition-colors">Pelatihanku</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63] transition-colors">Sertifikat</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors">Bantuan</a>
        </div>
      )}
    </nav>
  );
};

/* ── Dashboard Header Banner ────────────────────────── */
const DashboardHeader = () => (
  <div className="bg-[#1D315F] py-8 px-6 md:px-12 relative overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
    <div className="max-w-6xl mx-auto relative z-10">
      <h1 className="text-white text-3xl md:text-4xl font-semibold">Dashboard</h1>
    </div>
  </div>
);

/* ── Welcome & Stats ────────────────────────────────── */
const WelcomeSection = () => {
  const stats = [
    { label: 'Pelatihan Aktif', value: 2, icon: BookMarked, color: '#3FCDC1' },
    { label: 'Selesai', value: 5, icon: CheckCircle2, color: '#10B981' },
    { label: 'Total JPL', value: 4, icon: Clock, color: '#F59E0B' },
    { label: 'Sertifikat', value: 5, icon: Award, color: '#3FCDC1' },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1D315F] mb-2">Selamat Datang, Budi Santoso</h2>
        <p className="text-gray-500 text-xs sm:text-sm">Terus tingkatkan kompetensi Anda untuk pelayanan publik yang lebih baik.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-[#BBC9C7] rounded-lg p-4 md:p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1 md:mb-2 font-medium">{s.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-[#1D315F]">{s.value}</p>
            </div>
            <div className="p-1.5 md:p-2 rounded-full" style={{ backgroundColor: `${s.color}15` }}>
              <s.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: s.color }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── Current Course + Activity ──────────────────────── */
const CurrentCourseSection = ({ onNavigate }) => {
  const activities = [
    { icon: CheckCircle2, color: '#10B981', title: 'Selesai Modul 7 - Inovasi Pelayanan', time: 'Hari ini, 10:30 WIB' },
    { icon: Award, color: '#F59E0B', title: 'Lulus Kuis Evaluasi Tahap 2', time: 'Kemarin, 15:45 WIB' },
    { icon: PlayCircle, color: '#3FCDC1', title: 'Mulai Pelatihan Kepemimpinan', time: '12 Okt 2023' },
    { icon: FileDown, color: '#6366F1', title: 'Unduh Materi Dasar Hukum', time: '10 Okt 2023' },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 md:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Current Course Card */}
        <div className="lg:col-span-2 bg-white border border-[#BBC9C7] rounded-lg overflow-hidden flex flex-col">
          <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
              alt="Current course"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 sm:p-6 flex-1 flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">◇ Manajemen Publik</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#1D315F] mb-3 leading-tight">Kepemimpinan Transformatif untuk ASN Era Digital</h3>

            <div className="flex items-center gap-4 sm:gap-5 text-xs text-gray-500 mb-4 sm:mb-5">
              <span className="flex items-center gap-1"><Clock className="w-3 sm:w-3.5 sm:h-3.5" /> 1 JPL</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3 sm:w-3.5 sm:h-3.5" /> 12 Modul</span>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-[#1D315F]">Progress</span>
                <span className="font-bold text-[#3FCDC1]">65%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#3FCDC1] rounded-full transition-all" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* Next module */}
            <div className="bg-[#F4F8FB] border border-gray-200 rounded-md p-3 mb-4 sm:mb-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Selanjutnya</p>
              <p className="text-xs sm:text-sm text-[#1D315F] font-bold">Modul 8 - Etika Digital</p>
            </div>

            <button
              onClick={() => onNavigate('course-detail')}
              className="w-full py-2.5 sm:py-3 bg-[#1D315F] text-white text-sm sm:text-base font-bold rounded-md hover:bg-[#162847] transition-colors flex items-center justify-center gap-2"
            >
              Lanjutkan Belajar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-[#BBC9C7] rounded-lg p-4 sm:p-6 flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-[#1D315F] mb-4 sm:mb-5">Aktivitas Terakhir</h3>
          <div className="flex flex-col gap-4 sm:gap-5 flex-1">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <a.icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: a.color }} />
                <div>
                  <p className="text-xs sm:text-[13px] font-bold text-[#1D315F] leading-snug">{a.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 sm:mt-5 py-2 sm:py-2.5 border border-[#BBC9C7] text-[#1D315F] font-bold text-xs sm:text-sm rounded-md hover:bg-gray-50 transition-colors">
            Lihat Semua
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── Rekomendasi Pelatihan ──────────────────────────── */
const RecommendationCard = ({ image, title, jpl, modules, onNavigate }) => (
  <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="h-40 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <h3 className="font-bold text-[#1D315F] text-[14px] leading-snug line-clamp-2 mb-4 flex-1">{title}</h3>
      <div className="flex items-center gap-5 text-[11px] text-gray-500 mb-4">
        <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5 text-gray-400" /> {jpl} JPL</span>
        <span className="flex items-center gap-1 font-medium"><BookOpen className="w-3.5 h-3.5 text-gray-400" /> {modules} Modul</span>
      </div>
      <button
        onClick={() => onNavigate('catalog')}
        className="w-full py-2.5 border border-[#006A63] text-[#006A63] bg-white rounded-md text-[13px] font-bold hover:bg-[#006A63] hover:text-white transition-colors"
      >
        Lihat Detail
      </button>
    </div>
  </div>
);

const Recommendations = ({ onNavigate }) => {
  const courses = [
    { image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', title: 'Manajemen Keuangan Daerah Berbasis Kinerja', jpl: 20, modules: 5 },
    { image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop', title: 'Komunikasi Publik dan Pelayanan Prima', jpl: 15, modules: 4 },
    { image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop', title: 'Penyusunan Kebijakan Publik Berbasis Data', jpl: 30, modules: 8 },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 md:mb-8 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#1D315F]">Rekomendasi Pelatihan</h2>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="text-[#3FCDC1] text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline">
          Lihat Katalog <ChevronRight className="w-4 h-4" />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {courses.map((c, i) => <RecommendationCard key={i} {...c} onNavigate={onNavigate} />)}
      </div>
    </section>
  );
};

/* ── Footer ─────────────────────────────────────────── */
const Footer = ({ onNavigate }) => (
  <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-gray-200">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
      <div className="md:col-span-5 pr-8">
        <div className="flex items-center gap-3 mb-6">
          <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
          <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed mb-6">
          Platform Digital ASN untuk pengembangan kompetensi<br/>dan peningkatan kapasitas secara berkelanjutan.
        </p>
        <p className="text-[11px] text-gray-500">
          © 2026 BKPSDM. Hak Cipta Dilindungi Undang-Undang. Platform Digital ASN.
        </p>
      </div>
      <div className="md:col-span-3">
        <h4 className="font-bold text-[#1D315F] text-[14px] mb-6">Tautan Cepat</h4>
        <ul className="text-[13px] text-gray-600 space-y-3 font-medium">
          <li><a href="#" className="hover:text-[#006A63] transition-colors">Tentang</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors">Komunitas</a></li>
          <li><a href="#" className="hover:text-[#006A63] transition-colors">Bantuan</a></li>
        </ul>
      </div>
      <div className="md:col-span-4">
        <h4 className="font-bold text-[#1D315F] text-[14px] mb-6">Kontak Kami</h4>
        <ul className="text-[13px] text-gray-600 space-y-4">
          <li className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-[#3FCDC1] mt-0.5 flex-shrink-0" />
            <span className="font-medium">support@bkpsdm-pintar.go.id</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-[#3FCDC1] mt-0.5 flex-shrink-0" />
            <span className="font-medium">(021) 123-4567 (Jam Kerja)</span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#3FCDC1] mt-0.5 flex-shrink-0" />
            <span className="font-medium leading-relaxed">Gedung Kepegawaian Lt. 3, Jl. Protokol<br/>No. 1, Jakarta</span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

/* ── Main Export ─────────────────────────────────────── */
export default function UserDashboard({ onLogout, onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <DashboardNavbar onLogout={onLogout} onNavigate={onNavigate} />
      <main className="flex-grow bg-[#F9FAFB]">
        <DashboardHeader />
        <WelcomeSection />
         <CurrentCourseSection onNavigate={onNavigate} />
         <Recommendations onNavigate={onNavigate} />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
