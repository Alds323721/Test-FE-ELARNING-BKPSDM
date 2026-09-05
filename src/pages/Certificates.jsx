import { useState } from 'react';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import sertifikatImg from '../assets/Sertifikat.png';
import ProfileDropdown from '../components/ProfileDropdown';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  ChevronLeft,
  Award,
  Download,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const CertificatesNavbar = ({ onNavigate }) => {
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
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="hover:text-[#006A63] transition-colors pb-1">Pelatihanku</a>
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">Sertifikat</a>
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
          <ProfileDropdown onLogout={() => onNavigate('landing')} />
        </div>
      </div>

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
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="hover:text-[#006A63] transition-colors">Pelatihanku</a>
          <a href="#" className="text-[#006A63]">Sertifikat</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors">Bantuan</a>
        </div>
      )}
    </nav>
  );
};

const CertificatesHeader = () => (
  <div className="relative bg-[#1D315F] py-12 md:py-16 px-6 md:px-12 overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-[#1D315F] opacity-60"></div>
    <div className="max-w-7xl mx-auto relative z-10 text-center">
      <h1 className="text-white text-3xl md:text-4xl font-semibold mb-4">Sertifikat Saya</h1>
      <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
        Kelola dan unduh semua sertifikat pelatihan yang telah Anda selesaikan.
      </p>
    </div>
  </div>
);

const CertificateCard = ({ id, image, title, institution, date, certificateId, isNew }) => (
  <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="relative">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      {isNew && (
        <span className="absolute top-3 left-3 bg-[#F59E0B] text-white px-2.5 py-1 text-[10px] font-bold rounded-full shadow-sm">
          BARU
        </span>
      )}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#1D315F] text-xs font-bold px-3 py-1.5 rounded shadow-sm">
        <Award className="w-4 h-4 inline mr-1" />
        100%
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="font-bold text-[#1D315F] text-[15px] leading-snug mb-3 flex-1 line-clamp-2">{title}</h3>
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <User className="w-3.5 h-3.5" />
        <span className="font-semibold">{institution}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <Calendar className="w-3.5 h-3.5" />
        <span className="font-semibold">Diterbitkan: {date}</span>
      </div>
      <div className="text-xs text-gray-500 mb-4 font-mono bg-gray-50 px-2 py-1 rounded">
        ID: {certificateId}
      </div>
      <button className="w-full py-2.5 bg-[#006A63] text-white text-sm font-bold rounded-md hover:bg-[#00534D] transition-colors flex items-center justify-center gap-2">
        <Download className="w-4 h-4" />
        Unduh PDF
      </button>
    </div>
  </div>
);

const CertificatesContent = () => {
  const certificates = [
    {
      id: 1,
      title: 'Manajemen Kinerja Pegawai ASN berbasis Sistem Informasi',
      institution: 'BKPSDM Provinsi Bima',
      date: '12 Oktober 2024',
      certificateId: 'CERT-2024-BKPSDM-001',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
      isNew: true,
    },
    {
      id: 2,
      title: 'Dasar-Dasar Keamanan Siber untuk ASN',
      institution: 'BKPSDM Provinsi Bima',
      date: '5 September 2024',
      certificateId: 'CERT-2024-BKPSDM-002',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
      isNew: false,
    },
    {
      id: 3,
      title: 'Service Excellence: Komunikasi Prim di Pelayanan Publik',
      institution: 'BKPSDM Provinsi Bima',
      date: '28 Agustus 2024',
      certificateId: 'CERT-2024-BKPSDM-003',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop',
      isNew: false,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1D315F] mb-2">Sertifikat yang Tersedia</h2>
        <p className="text-gray-500 text-sm font-semibold">{certificates.length} Sertifikat ditemukan</p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} {...cert} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <img src={sertifikatImg} alt="No certificates" className="w-48 h-48 mx-auto mb-6 opacity-30" />
          <h3 className="text-lg font-semibold text-[#1D315F] mb-2">Belum ada sertifikat</h3>
          <p className="text-gray-500 text-sm font-semibold">
            Selesaikan pelatihan untuk mendapatkan sertifikat pertama Anda.
          </p>
        </div>
      )}
    </section>
  );
};

const Footer = ({ onNavigate }) => (
  <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-[#BBC9C7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
      <div className="md:col-span-5 pr-8">
        <div className="flex items-center gap-3 mb-6">
          <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
          <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed mb-6 font-semibold">
          Platform Digital ASN untuk pengembangan kompetensi<br />dan peningkatan kapasitas secara berkelanjutan.
        </p>
        <p className="text-[11px] text-gray-500 font-semibold">
          © 2024 BKPSDM. Hak Cipta Dilindungi Undang-Undang. Platform Digital ASN.
        </p>
      </div>
      <div className="md:col-span-3">
        <h4 className="font-semibold text-[#1D315F] text-[15px] mb-6">Tautan Cepat</h4>
        <ul className="text-[13px] text-[#1D315F] space-y-3 font-semibold">
          <li><a href="#" onClick={() => onNavigate('dashboard')} className="hover:text-[#006A63] transition-colors">Dashboard</a></li>
          <li><a href="#" className="text-[#006A63]">Sertifikat</a></li>
          <li><a href="#" className="hover:text-[#006A63] transition-colors">Komunitas</a></li>
          <li><a href="#" className="hover:text-[#006A63] transition-colors">Bantuan</a></li>
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
            <span className="font-semibold leading-relaxed">Gedung Kepegawaian Lt. 3, Jl. Protokol<br />No. 1, Jakarta</span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default function Certificates({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FBFC]">
      <CertificatesNavbar onNavigate={onNavigate} />
      <CertificatesHeader />
      <main className="flex-grow">
        <CertificatesContent />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
