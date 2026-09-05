import { useState } from 'react';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import ProfileDropdown from './ProfileDropdown';
import {
  Search, Bell, ChevronDown, Menu, X,
  Mail, Phone, MapPin, Users, BookOpen,
  ArrowRight, ChevronLeft, ChevronRight, Check
} from 'lucide-react';

/* ── Navbar ───────────────────────────────────── */
const CommunityNavbar = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
        <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8 text-[#1D315F] font-semibold text-sm">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63] transition-colors pb-1">Dashboard</a>
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">Komunitas</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors pb-1">Katalog</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="hover:text-[#006A63] transition-colors pb-1">Pelatihanku</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63] transition-colors pb-1">Sertifikat</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors pb-1">Bantuan</a>
        <div className="flex items-center gap-4 ml-4 border-l border-gray-200 pl-6">
          <button className="flex items-center gap-1 text-[#1D315F] hover:text-[#006A63] text-xs font-semibold">EN <ChevronDown className="w-3 h-3" /></button>
          <button className="relative text-[#1D315F] hover:text-[#006A63]">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">10+</span>
          </button>
          <button className="text-[#1D315F] hover:text-[#006A63]"><Search className="w-5 h-5" /></button>
          <ProfileDropdown onLogout={() => onNavigate('landing')} />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-3">
        <ProfileDropdown onLogout={() => onNavigate('landing')} />
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#1D315F] hover:text-[#006A63]">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md md:hidden flex flex-col py-4 px-6 gap-4 text-[#1D315F] font-semibold text-sm z-50">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63]">Dashboard</a>
          <a href="#" className="text-[#006A63]">Komunitas</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63]">Katalog</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="hover:text-[#006A63]">Pelatihanku</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63]">Sertifikat</a>
          <a href="#" className="hover:text-[#006A63]">Bantuan</a>
        </div>
      )}
    </nav>
  );
};

/* ── Page Header ──────────────────────────────── */
const PageHeader = () => (
  <div className="bg-[#1D315F] py-10 px-6 md:px-12 relative overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <h1 className="text-white text-3xl md:text-4xl font-semibold">Komunitas Belajar</h1>
    </div>
  </div>
);

/* ── Community Card ───────────────────────────── */
const CommunityCard = ({ id, image, category, title, description, members, courses, isJoined, onJoin, onNavigate }) => (
  <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
    <div className="h-44 relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1D315F] text-[11px] font-bold px-3 py-1 rounded-sm shadow-sm">
        {category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="font-bold text-[#1D315F] text-[20px] leading-snug mb-3">{title}</h3>
      <p className="text-[13px] text-gray-500 leading-relaxed mb-5 flex-1 line-clamp-3">{description}</p>

      <div className="flex items-center gap-6 text-[13px] text-gray-600 font-semibold mb-6 border-t border-gray-100 pt-5">
        <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#006A63]" /> {members.toLocaleString('id-ID')} Anggota</span>
        <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#006A63]" /> {courses} Pelatihan</span>
      </div>

      {isJoined ? (
        <button
          onClick={() => onNavigate('catalog')}
          className="w-full py-2.5 border-2 border-[#006A63] text-[#006A63] bg-white rounded-md text-[13px] font-bold hover:bg-[#EFF5F3] transition-colors flex items-center justify-center gap-2"
        >
          Lihat Komunitas <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={() => onJoin(id)}
          className="w-full py-2.5 bg-[#006A63] text-white rounded-md text-[13px] font-bold hover:bg-[#00534D] transition-colors flex items-center justify-center gap-2"
        >
          Gabung Komunitas <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  </div>
);

/* ── Main Content ─────────────────────────────── */
const CommunityContent = ({ onNavigate }) => {
  const categories = ['Semua Kategori', 'Manajemen ASN', 'Teknologi Informasi', 'Pelayanan Publik', 'Kepemimpinan'];
  const [activeCategory, setActiveCategory] = useState('Semua Kategori');
  const [joinedSet, setJoinedSet] = useState(new Set());

  const handleJoin = (id) => {
    setJoinedSet(prev => new Set([...prev, id]));
  };

  const communities = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
      category: 'Teknologi Informasi',
      title: 'Komunitas IT BKPSDM',
      description: 'Forum diskusi bagi para pengembang, administrator sistem, dan analis data',
      members: 1240,
      courses: 15
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2069&auto=format&fit=crop',
      category: 'Pelayanan Publik',
      title: 'Service Excellence Forum',
      description: 'Wadah bagi aparatur pelayanan publik untuk berdiskusi mengenai teknik komunikasi prima, penanganan komplain, dan peningkatan kepuasan...',
      members: 3500,
      courses: 22
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop',
      category: 'Manajemen ASN',
      title: 'Pengembangan Kompetensi SDM',
      description: 'Komunitas khusus untuk para pengelola kepegawaian dalam merancang, melaksanakan, dan...',
      members: 890,
      courses: 8
    },
  ];

  return (
    <section className="bg-[#F9FBFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Sidebar */}
        <aside className="md:col-span-3">
          <div className="bg-white border border-[#BBC9C7] rounded-lg p-5">
            <h3 className="font-bold text-[#1D315F] text-[17px] mb-5">Kategori Komunitas</h3>
            <div className="space-y-4">
              {categories.map((cat) => (
                <label
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${activeCategory === cat ? 'bg-[#006A63] border-[#006A63]' : 'bg-white border-gray-300'}`}>
                    {activeCategory === cat && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-[14px] font-semibold transition-colors ${activeCategory === cat ? 'text-[#006A63]' : 'text-[#1D315F]'}`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="md:col-span-9">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-[14px] font-medium text-gray-500 mb-3 sm:mb-0">
              Menampilkan <span className="font-bold text-[#1D315F]">12</span> dari <span className="font-bold text-[#1D315F]">34</span> komunitas
            </p>
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1D315F]">
              Urutkan:
              <div className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded bg-white cursor-pointer ml-1">
                Terbaru <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {communities.map((c) => (
              <CommunityCard
                key={c.id}
                {...c}
                isJoined={joinedSet.has(c.id)}
                onJoin={handleJoin}
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
      </div>
    </section>
  );
};

/* ── Footer ───────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-[#BBC9C7]">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
      <div className="md:col-span-5 pr-8">
        <div className="flex items-center gap-3 mb-6">
          <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
          <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed mb-6 font-medium">
          Platform Digital ASN untuk pengembangan kompetensi<br />dan peningkatan kapasitas secara berkelanjutan.
        </p>
        <p className="text-[11px] text-gray-500 font-semibold">© 2026 BKPSDM. Hak Cipta Dilindungi Undang-Undang. Platform Digital ASN.</p>
      </div>
      <div className="md:col-span-3">
        <h4 className="font-bold text-[#1D315F] text-[15px] mb-6">Tautan Cepat</h4>
        <ul className="text-[13px] text-[#1D315F] space-y-3 font-semibold">
          <li><a href="#" className="hover:text-[#006A63] transition-colors underline">Tentang</a></li>
          <li><a href="#" className="hover:text-[#006A63] transition-colors underline">Komunitas</a></li>
          <li><a href="#" className="hover:text-[#006A63] transition-colors underline">Bantuan</a></li>
        </ul>
      </div>
      <div className="md:col-span-4">
        <h4 className="font-bold text-[#1D315F] text-[15px] mb-6">Kontak Kami</h4>
        <ul className="text-[13px] text-gray-600 space-y-4">
          <li className="flex items-start gap-3"><Mail className="w-4 h-4 text-[#006A63] mt-0.5 flex-shrink-0" /><span className="font-semibold">support@bkpsdm-pintar.go.id</span></li>
          <li className="flex items-start gap-3"><Phone className="w-4 h-4 text-[#006A63] mt-0.5 flex-shrink-0" /><span className="font-semibold">(021) 123-4567 (Jam Kerja)</span></li>
          <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#006A63] mt-0.5 flex-shrink-0" /><span className="font-semibold leading-relaxed">Gedung Kepegawaian Lt. 3, Jl. Protokol<br />No. 1, Jakarta</span></li>
        </ul>
      </div>
    </div>
  </footer>
);

/* ── Export ───────────────────────────────────── */
export default function Community({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <CommunityNavbar onNavigate={onNavigate} />
      <main className="flex-grow">
        <PageHeader />
        <CommunityContent onNavigate={onNavigate} />
      </main>
      <Footer />
    </div>
  );
}
