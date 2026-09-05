import { useState } from 'react';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import ProfileDropdown from './ProfileDropdown';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  BookOpen,
  Award,
  Wrench,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Star
} from 'lucide-react';

const HelpCenterNavbar = ({ onNavigate }) => {
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
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63] transition-colors pb-1">Sertifikat</a>
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">Bantuan</a>

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
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63] transition-colors">Sertifikat</a>
          <a href="#" className="text-[#006A63]">Bantuan</a>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => (
  <div className="relative bg-[#1D315F] py-16 md:py-20 px-6 overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
    
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">Pusat Bantuan</h1>
      <p className="text-sm md:text-base text-white/90 font-semibold mb-8 max-w-2xl mx-auto">
        Temukan jawaban atas pertanyaan Anda atau hubungi tim dukungan kami untuk bantuan lebih lanjut terkait platform pembelajaran BKPSDM Pintar.
      </p>
      
      <div className="max-w-2xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
        <input
          type="text"
          placeholder="Cari topik bantuan atau keluhan Anda di sini..."
          className="w-full py-3 md:py-4 pl-12 pr-4 rounded-lg border-none focus:ring-2 focus:ring-[#3FCDC1] outline-none text-sm md:text-base font-semibold bg-[#FFFFFF] text-[#6B7280] placeholder-[#6B7280]"
        />
      </div>
    </div>
  </div>
);

const CategoryCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-[#BBC9C7] rounded-lg p-6 hover:shadow-lg hover:border-[#3FCDC1] transition-all cursor-pointer">
    <div className="w-12 h-12 bg-[#3FCDC1]/10 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#006A63]" />
    </div>
    <h3 className="font-semibold text-[#1D315F] text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-600 font-semibold leading-relaxed">{description}</p>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-[#BBC9C7] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#1D315F] text-sm md:text-base pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#006A63] flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    rating: 0
  });

  return (
    <div className="bg-white border border-[#BBC9C7] rounded-lg p-6 md:p-8">
      <div className="flex items-start gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-[#1D315F] text-lg mb-2">Formulir Keluhan</h3>
          <p className="text-sm text-gray-600 font-semibold">
            Mengalami masalah atau memiliki saran untuk layanan kami? Sampaikan melalui form di bawah ini agar kami dapat memperbaikinya.
          </p>
        </div>
      </div>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1D315F] mb-2">
            Jenis Keluhan <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006A63] focus:border-transparent text-sm font-semibold"
          >
            <option value="">Pilih jenis keluhan...</option>
            <option value="akun">Akun & Profil</option>
            <option value="kelas">Kelas & Pelatihan</option>
            <option value="sertifikat">Sertifikat & JPL</option>
            <option value="teknis">Kendala Teknis</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1D315F] mb-2">
            Deskripsi Keluhan <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Jelaskan secara detail masalah yang Anda alami..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006A63] focus:border-transparent text-sm font-semibold resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1D315F] mb-3">
            Tingkat Kepuasan Layanan Bantuan (Opsional)
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= formData.rating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#006A63] text-white font-semibold rounded-md hover:bg-[#00534D] transition-colors"
        >
          Kirim Keluhan ▶
        </button>

        <p className="text-xs text-gray-500 font-semibold text-center">
          Tim kami akan merespons melalui email akun Anda dalam waktu maksimal 2×24 jam.
        </p>
      </form>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-[#BBC9C7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
      <div className="md:col-span-5 pr-8">
        <div className="flex items-center gap-3 mb-6">
          <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
          <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed mb-6 font-semibold">
          Platform Digital ASN untuk pengembangan kompetensi dan peningkatan kapasitas secara berkelanjutan.
        </p>
        <p className="text-[11px] text-gray-500 font-semibold">
          © 2024 BKPSDM. Hak Cipta Dilindungi Undang-Undang. Platform Digital ASN.
        </p>
      </div>
      <div className="md:col-span-3">
        <h4 className="font-semibold text-[#1D315F] text-[15px] mb-6">Tautan Cepat</h4>
        <ul className="text-[13px] text-[#1D315F] space-y-3 font-semibold">
          <li><a href="#" className="hover:text-[#006A63] transition-colors">Tentang</a></li>
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
            <span className="font-semibold leading-relaxed">Gedung Kepegawaian Lt. 3, Jl. Protokol<br/>No. 1, Jakarta</span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default function HelpCenter({ onNavigate }) {
  const categories = [
    {
      icon: User,
      title: 'Akun & Profil',
      description: 'Pengaturan NIP, lupa kata sandi, pembaruan data diri, dan masalah login.'
    },
    {
      icon: BookOpen,
      title: 'Kelas & Pelatihan',
      description: 'Pendaftaran kursus, akses materi, jadwal pelatihan, dan penilaian modul.'
    },
    {
      icon: Award,
      title: 'Sertifikat & JPL',
      description: 'Pengunduhan sertifikat, perhitungan Jam Pelajaran (JPL), dan verifikasi kelulusan.'
    },
    {
      icon: Wrench,
      title: 'Kendala Teknis',
      description: 'Sistem error, halaman tidak dapat dimuat, masalah pemutaran video, dan bug aplikasi.'
    }
  ];

  const faqs = [
    {
      question: 'Bagaimana cara mereset kata sandi akun NIP saya?',
      answer: 'Anda dapat mereset kata sandi dengan mengklik "Lupa Password" pada halaman login. Masukkan NIP Anda dan ikuti instruksi yang dikirimkan ke email terdaftar.'
    },
    {
      question: 'Berapa lama sertifikat pelatihan akan diterbitkan setelah menyelesaikan kursus?',
      answer: 'Sertifikat akan diterbitkan secara otomatis segera setelah Anda lulus post test dengan nilai di atas passing grade. Sertifikat dapat diunduh langsung dari dashboard Anda.'
    },
    {
      question: 'Apakah saya dikenakan biaya untuk mengikuti pelatihan di platform ini?',
      answer: 'Tidak, semua pelatihan di platform BKPSDM Pintar adalah gratis untuk seluruh ASN. Anda hanya perlu login menggunakan NIP yang terdaftar.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FBFC]">
      <HelpCenterNavbar onNavigate={onNavigate} />
      <HeroSection />
      
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Categories */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D315F] mb-8 text-center">
              Kategori Bantuan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, idx) => (
                <CategoryCard key={idx} {...cat} />
              ))}
            </div>
          </section>

          {/* FAQ & Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1D315F] mb-6">
                Pertanyaan yang Sering Diajukan
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <FAQItem key={idx} {...faq} />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
