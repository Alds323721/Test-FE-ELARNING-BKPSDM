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
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Folder,
  Scale,
  CheckCircle2
} from 'lucide-react';

/* ── Navbar ─────────────────────────────────────────── */
const MyCoursesNavbar = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
        <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-[#1D315F] font-semibold text-sm">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63] transition-colors pb-1">Dashboard</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors pb-1">Komunitas</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors pb-1">Katalog</a>
         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="text-[#006A63] border-b-2 border-[#006A63] pb-1">Pelatihanku</a>
         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63] transition-colors pb-1">Sertifikat</a>
         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors pb-1">Bantuan</a>

         {/* Right icons */}
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
          <ProfileDropdown onLogout={() => onNavigate('landing')} />
        </div>
      </div>

      {/* Mobile toggle */}
      <div className="md:hidden flex items-center gap-3">
        <ProfileDropdown onLogout={() => onNavigate('landing')} />
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
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63] transition-colors">Sertifikat</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors">Bantuan</a>
        </div>
      )}
    </nav>
  );
};

/* ── Header ────────────────────────── */
const MyCoursesHeader = () => (
  <div className="bg-[#1D315F] py-10 px-6 md:px-12 relative overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <h1 className="text-white text-3xl md:text-4xl font-semibold">Pelatihanku</h1>
    </div>
  </div>
);

/* ── Tabs ──────────────────────────── */
const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6 border-b border-gray-200">
    <div className="flex items-center gap-8 text-[15px] font-semibold">
      <button 
        onClick={() => setActiveTab('in-progress')}
        className={`pb-3 border-b-2 transition-colors ${activeTab === 'in-progress' ? 'border-[#006A63] text-[#006A63]' : 'border-transparent text-gray-500 hover:text-[#1D315F]'}`}
      >
        Sedang Berjalan (3)
      </button>
      <button 
        onClick={() => setActiveTab('completed')}
        className={`pb-3 border-b-2 transition-colors ${activeTab === 'completed' ? 'border-[#006A63] text-[#006A63]' : 'border-transparent text-gray-500 hover:text-[#1D315F]'}`}
      >
        Selesai (12)
      </button>
    </div>
  </div>
);

/* ── Cards ──────────────────────────── */
const InProgressCard = ({ image, categoryIcon: Icon, category, title, jpl, modules, progress, onContinue }) => (
  <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="h-44 relative">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-3 right-3 bg-[#006A63] text-white px-3 py-1 text-[11px] font-bold rounded-sm shadow-sm tracking-wider">
        GRATIS
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center gap-2 text-gray-500 text-[13px] font-semibold mb-3">
        <Icon className="w-4 h-4" /> {category}
      </div>
      <h3 className="font-bold text-[#1D315F] text-[17px] leading-snug mb-5 flex-1">{title}</h3>
      
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center gap-1.5 text-[12px] font-semibold bg-gray-100 px-3 py-1.5 rounded text-gray-600"><Clock className="w-3.5 h-3.5" /> {jpl} JPL</span>
        <span className="flex items-center gap-1.5 text-[12px] font-semibold bg-gray-100 px-3 py-1.5 rounded text-gray-600"><BookOpen className="w-3.5 h-3.5" /> {modules} Modul</span>
      </div>
      
      <div className="mb-5">
        <div className="flex justify-between items-center text-[13px] font-semibold mb-2">
          <span className="text-[#1D315F]">Progres Belajar</span>
          <span className="text-[#006A63]">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-[#006A63] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <button 
        onClick={onContinue}
        className="w-full py-2.5 bg-[#006A63] text-white rounded-md text-[13px] font-bold hover:bg-[#00534D] transition-colors flex items-center justify-center gap-2">
        Lanjutkan Belajar <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const CompletedCard = ({ image, categoryIcon: Icon, category, title, jpl, completedDate }) => (
  <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="h-44 relative">
      <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply" />
      <div className="absolute top-3 left-3 bg-[#3FCDC1] text-white px-3 py-1.5 text-[11px] font-bold rounded-sm shadow-sm flex items-center gap-1.5 tracking-wider">
        <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col bg-white">
      <div className="flex items-center gap-2 text-gray-500 text-[13px] font-semibold mb-3">
        <Icon className="w-4 h-4" /> {category}
      </div>
      <h3 className="font-bold text-[#1D315F] text-[17px] leading-snug mb-5 flex-1">{title}</h3>
      
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center gap-1.5 text-[12px] font-semibold bg-gray-100 px-3 py-1.5 rounded text-gray-600"><Clock className="w-3.5 h-3.5" /> {jpl} JPL</span>
      </div>
      
      <div className="flex justify-between items-center border-t border-gray-100 pt-5 pb-5">
        <span className="text-[13px] font-semibold text-gray-500">Diselesaikan pada</span>
        <span className="text-[13px] font-bold text-[#1D315F]">{completedDate}</span>
      </div>
      
      <button className="w-full py-2.5 border border-[#1D315F] text-[#1D315F] bg-white rounded-md text-[13px] font-bold hover:bg-gray-50 transition-colors">
        Lihat Detail
      </button>
    </div>
  </div>
);

/* ── Main Section ───────────────────────────── */
const MyCoursesContent = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('in-progress');

  const inProgressCourses = [
    { 
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop', 
      category: 'Manajemen Risiko', 
      categoryIcon: Folder,
      title: 'Pengantar Manajemen Risiko Sektor Publik Tahun 2024', 
      jpl: 20, 
      modules: 5,
      progress: 65
    },
    { 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
      category: 'Literasi Digital', 
      categoryIcon: Folder,
      title: 'Implementasi Sistem Pemerintahan Berbasis Elektronik (SPBE)', 
      jpl: 40, 
      modules: 8,
      progress: 15
    },
  ];

  const completedCourses = [
    { 
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop', 
      category: 'Hukum & Regulasi', 
      categoryIcon: Scale,
      title: 'Dasar-Dasar Hukum Administrasi Negara', 
      jpl: 10, 
      completedDate: '12 Okt 2024'
    },
  ];

  return (
    <section className="bg-[#F9FBFC] min-h-[500px]">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'in-progress' && inProgressCourses.map((c, i) => (
            <InProgressCard 
              key={i} 
              {...c} 
              onContinue={() => onNavigate('course-detail')}
            />
          ))}
          {activeTab === 'in-progress' && completedCourses.map((c, i) => <CompletedCard key={i} {...c} />)}
          
          {activeTab === 'completed' && completedCourses.map((c, i) => <CompletedCard key={i} {...c} />)}
        </div>
      </div>
    </section>
  );
};

/* ── Footer ─────────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-[#BBC9C7]">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
      <div className="md:col-span-5 pr-8">
        <div className="flex items-center gap-3 mb-6">
          <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
          <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed mb-6 font-medium">
          Platform Digital ASN untuk pengembangan kompetensi<br/>dan peningkatan kapasitas secara berkelanjutan.
        </p>
        <p className="text-[11px] text-gray-500 font-semibold">
          © 2026 BKPSDM. Hak Cipta Dilindungi Undang-Undang. Platform Digital ASN.
        </p>
      </div>
      <div className="md:col-span-3">
        <h4 className="font-bold text-[#1D315F] text-[15px] mb-6">Tautan Cepat</h4>
        <ul className="text-[13px] text-[#1D315F] space-y-3 font-semibold underline decoration-transparent hover:decoration-current transition-colors">
          <li><a href="#">Tentang</a></li>
          <li><a href="#">Komunitas</a></li>
          <li><a href="#">Bantuan</a></li>
        </ul>
      </div>
      <div className="md:col-span-4">
        <h4 className="font-bold text-[#1D315F] text-[15px] mb-6">Kontak Kami</h4>
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

/* ── Main Export ─────────────────────────────────────── */
export default function MyCourses({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <MyCoursesNavbar onNavigate={onNavigate} />
      <main className="flex-grow">
        <MyCoursesHeader />
        <MyCoursesContent onNavigate={onNavigate} />
      </main>
      <Footer />
    </div>
  );
}
