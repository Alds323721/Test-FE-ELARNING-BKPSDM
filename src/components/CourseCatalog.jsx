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
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

/* ── Navbar ─────────────────────────────────────────── */
const CatalogNavbar = ({ onNavigate }) => {
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
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">Katalog</a>
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
          <a href="#" className="text-[#006A63]">Katalog</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="hover:text-[#006A63] transition-colors">Pelatihanku</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63] transition-colors">Sertifikat</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors">Bantuan</a>
        </div>
      )}
    </nav>
  );
};

/* ── Dashboard Header Banner ────────────────────────── */
const CatalogHeader = () => (
  <div className="bg-[#1D315F] py-8 px-6 md:px-12 relative overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <h1 className="text-white text-3xl md:text-4xl font-semibold">Katalog</h1>
    </div>
  </div>
);

/* ── Catalog Course Card ────────────────────────── */
const CatalogCard = ({ id, image, category, title, description, jpl, modules, isEnrolled, onEnroll, onNavigate }) => (
  <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="h-44 relative">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-3 bg-white px-3 py-1 text-[11px] font-bold text-[#1D315F] shadow-sm rounded-sm">
        {category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="font-bold text-[#1D315F] text-[17px] leading-snug mb-3">{title}</h3>
      <p className="text-[12px] text-gray-500 line-clamp-3 mb-5 flex-1">{description}</p>
      
      <div className="flex items-center gap-5 text-[12px] text-[#1D315F] mb-6">
        <span className="flex items-center gap-1 font-semibold"><Clock className="w-4 h-4 text-gray-500" /> {jpl} JPL</span>
        <span className="flex items-center gap-1 font-semibold"><BookOpen className="w-4 h-4 text-gray-500" /> {modules} Modul</span>
      </div>
      
      {isEnrolled ? (
        <button
          onClick={() => onNavigate('my-courses')}
          className="w-full py-2.5 border-2 border-[#006A63] text-[#006A63] bg-white rounded-md text-[13px] font-bold hover:bg-[#EFF5F3] transition-colors"
        >
          Lihat Kurikulum
        </button>
      ) : (
        <button
          onClick={() => onEnroll(id)}
          className="w-full py-2.5 bg-[#006A63] text-white rounded-md text-[13px] font-bold hover:bg-[#00534D] transition-colors"
        >
          Daftar Sekarang
        </button>
      )}
    </div>
  </div>
);

/* ── Main Catalog Section ────────────────────────────── */
const CatalogContent = ({ onNavigate }) => {
  const [enrolledSet, setEnrolledSet] = useState(new Set());

  const handleEnroll = (id) => {
    setEnrolledSet(prev => new Set([...prev, id]));
  };

  const courses = [
    { 
      id: 1,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', 
      category: 'Manajemen ASN', 
      title: 'Manajemen Kinerja Pegawai', 
      description: 'Pelajari strategi dan implementasi penilaian kinerja modern berbasis sistem informasi.', 
      jpl: 20, 
      modules: 5,
    },
    { 
      id: 2,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop', 
      category: 'Teknologi Informasi', 
      title: 'Dasar Keamanan Siber untuk ASN', 
      description: 'Pahami ancaman siber dan cara melindungi data instansi Anda secara efektif.', 
      jpl: 15, 
      modules: 3,
    },
    { 
      id: 3,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop', 
      category: 'Pelayanan Publik', 
      title: 'Service Excellence', 
      description: 'Teknik komunikasi prima dan penanganan komplain untuk meningkatkan kepuasan publik.', 
      jpl: 30, 
      modules: 8,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Sidebar Filters */}
      <aside className="md:col-span-3 space-y-6">
        {/* Kategori Filter */}
        <div className="bg-white border border-[#BBC9C7] rounded-lg p-5">
          <h3 className="font-bold text-xl text-[#1D315F] mb-4 pb-4 border-b border-gray-100">Kategori</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-[#006A63]">
                 <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[14px] font-semibold text-[#1D315F]">Semua Kategori</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center bg-white">
              </div>
              <span className="text-[14px] font-semibold text-[#1D315F]">Manajemen ASN</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center bg-white">
              </div>
              <span className="text-[14px] font-semibold text-[#1D315F]">Teknologi Informasi</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center bg-white">
              </div>
              <span className="text-[14px] font-semibold text-[#1D315F]">Pelayanan Publik</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center bg-white">
              </div>
              <span className="text-[14px] font-semibold text-[#1D315F]">Kepemimpinan</span>
            </label>
          </div>
        </div>

        {/* Tingkat Kesulitan Filter */}
        <div className="bg-white border border-[#BBC9C7] rounded-lg p-5">
          <h3 className="font-bold text-xl text-[#1D315F] mb-4 pb-4 border-b border-gray-100">Tingkat Kesulitan</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded-full border-[5px] border-[#006A63] bg-white flex-shrink-0"></div>
              <span className="text-[14px] font-semibold text-[#1D315F]">Semua Tingkat</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex-shrink-0"></div>
              <span className="text-[14px] font-semibold text-[#1D315F]">Dasar (Basic)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex-shrink-0"></div>
              <span className="text-[14px] font-semibold text-[#1D315F]">Menengah (Intermediate)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex-shrink-0"></div>
              <span className="text-[14px] font-semibold text-[#1D315F]">Lanjut (Advanced)</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <div className="md:col-span-9">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-[#BBC9C7]">
          <p className="text-[14px] font-medium text-gray-500 mb-4 sm:mb-0">
            Menampilkan <span className="font-bold text-[#1D315F]">12</span> dari <span className="font-bold text-[#1D315F]">45</span> pelatihan
          </p>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1D315F]">
            Urutkan:
            <div className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded bg-white cursor-pointer ml-1">
              Terbaru <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((c) => (
            <CatalogCard
              key={c.id}
              {...c}
              isEnrolled={enrolledSet.has(c.id)}
              onEnroll={handleEnroll}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-300 text-gray-500 bg-white hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded bg-[#006A63] text-white font-semibold">1</button>
          <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 font-semibold">2</button>
          <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 font-semibold">3</button>
          <span className="px-1 text-gray-400">...</span>
          <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 font-semibold">5</button>
          <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-300 text-gray-500 bg-white hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── Footer ─────────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-[#BBC9C7]">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
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

/* ── Main Export ───────────────────────────────────── */
export default function CourseCatalog({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FBFC]">
      <CatalogNavbar onNavigate={onNavigate} />
      <main className="flex-grow">
        <CatalogHeader />
        <CatalogContent onNavigate={onNavigate} />
      </main>
      <Footer />
    </div>
  );
}
