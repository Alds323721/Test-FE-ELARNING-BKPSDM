import { useState } from 'react';
import logoImg from '../assets/logo-removebg-preview 1.png';
import { 
  Search, 
  Users, 
  HandHeart, 
  Monitor, 
  Landmark, 
  Scale, 
  Banknote, 
  UserPlus, 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  Star,
  TrendingUp,
  Award,
  CalendarCheck,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-2 sm:gap-3">
        <img src={logoImg} alt="Logo BKPSDM" className="w-6 sm:w-8 object-contain" />
        <span className="font-semibold text-base sm:text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-[#1D315F] font-semibold text-sm">
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">Home</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors pb-1">Komunitas</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors pb-1">Katalog</a>
        <a href="#" className="hover:text-[#006A63] transition-colors pb-1">Tentang</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors pb-1">Bantuan</a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#1D315F] hover:text-[#006A63] focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md md:hidden flex flex-col py-4 px-6 gap-4 text-[#1D315F] font-semibold text-sm">
          <a href="#" className="text-[#006A63]">Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors">Komunitas</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors">Katalog</a>
          <a href="#" className="hover:text-[#006A63] transition-colors">Tentang</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors">Bantuan</a>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onLogin }) => (
  <div className="relative h-[400px] sm:h-[480px] flex flex-col justify-center items-center text-center">
    {/* Background Image Placeholder */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[#1D315F]/70 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" 
        alt="Audience" 
        className="w-full h-full object-cover"
      />
    </div>
    
    <div className="relative z-20 w-full max-w-4xl px-4 flex flex-col items-center mt-[-40px]">
      <p className="text-white text-xs sm:text-sm md:text-base mb-6 md:mb-8 px-4 leading-relaxed max-w-3xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      
      <div className="w-full max-w-2xl relative flex items-center mb-4 md:mb-6 shadow-lg rounded-md bg-white">
        <Search className="absolute left-4 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
        <input 
          type="text" 
          placeholder="Cari pelatihan..." 
          className="w-full py-3 sm:py-4 pl-10 sm:pl-12 pr-4 rounded-md bg-transparent border-none focus:ring-2 focus:ring-[#3FCDC1] outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400"
        />
      </div>
      
      <button onClick={onLogin} className="bg-[#10B981] text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 text-sm sm:text-base rounded-md hover:bg-[#0d9668] transition-colors shadow-md">
        Masuk / NIP Login
      </button>
    </div>
  </div>
);

const FeaturesBanner = () => (
  <div className="bg-[#1D315F] text-white py-6 relative z-20 shadow-xl">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 px-6 divide-y divide-white/10 md:divide-y-0 md:divide-x">
      
      <div className="flex items-center gap-5 justify-start md:justify-center py-5 md:py-2 px-4">
        <div className="bg-white/10 p-3.5 rounded-full flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-[#3FCDC1]" />
        </div>
        <p className="text-[14px] text-gray-200 font-medium">Belajar sesuai ritme Anda</p>
      </div>

      <div className="flex items-center gap-5 justify-start md:justify-center py-5 md:py-2 px-4">
        <div className="bg-white/10 p-3.5 rounded-full flex-shrink-0">
          <Award className="w-5 h-5 text-[#3FCDC1]" />
        </div>
        <p className="text-[14px] text-gray-200 font-medium">Tercatat di sistem kepegawaian</p>
      </div>

      <div className="flex items-center gap-5 justify-start md:justify-center py-5 md:py-2 px-4">
        <div className="bg-white/10 p-3.5 rounded-full flex-shrink-0">
          <CalendarCheck className="w-5 h-5 text-[#3FCDC1]" />
        </div>
        <p className="text-[14px] text-gray-200 font-medium">Akses tak terbatas untuk ASN</p>
      </div>

    </div>
  </div>
);

const CategoryCard = ({ icon: Icon, title, count }) => (
  <div className="bg-white border border-[#BBC9C7] rounded-md p-6 md:p-8 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-[#3FCDC1] transition-all cursor-pointer group">
    <div className="bg-[#3FCDC1] text-[#00534D] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-5 shadow-sm group-hover:scale-110 group-hover:bg-[#00534D] group-hover:text-[#3FCDC1] transition-all duration-300">
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
    </div>
    <h3 className="font-bold text-[#1D315F] text-xs md:text-[13px] mb-2">{title}</h3>
    <p className="text-[10px] md:text-[11px] text-gray-500 font-medium">{count} Pelatihan</p>
  </div>
);

const Categories = () => {
  const categories = [
    { icon: Users, title: 'Manajemen Kepemimpinan', count: 42 },
    { icon: HandHeart, title: 'Pelayanan Publik', count: 38 },
    { icon: Monitor, title: 'Teknologi & Informasi', count: 56 },
    { icon: Landmark, title: 'Tata Kelola Pemerintahan', count: 29 },
    { icon: Scale, title: 'Hukum & Kebijakan', count: 21 },
    { icon: Banknote, title: 'Keuangan Negara', count: 45 },
    { icon: UserPlus, title: 'Pengembangan Diri', count: 62 },
    { icon: ShieldCheck, title: 'Kesehatan & Keselamatan', count: 24 },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto bg-white">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-[#1D315F] mb-2 md:mb-3">Komunitas & Kategori Pelatihan</h2>
        <p className="text-gray-500 text-xs sm:text-sm px-4">Temukan berbagai topik pelatihan yang relevan dengan bidang<br className="hidden sm:block"/>tugas dan fungsi Anda di pemerintahan.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} {...cat} />
        ))}
      </div>
    </section>
  );
};

const CourseCard = ({ image, category, title, instructor, jpl, modules, rating }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all">
    <div className="relative h-44">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded text-[11px] font-bold text-[#1D315F] shadow-sm">
        {category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="font-bold text-[#1D315F] text-[15px] leading-snug line-clamp-2 mb-4 flex-1">{title}</h3>
      
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor}`} alt={instructor} />
        </div>
        <div>
          <p className="text-[12px] font-bold text-[#1D315F]">{instructor}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-5 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-gray-400" /> {jpl} JPL
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <BookOpen className="w-3.5 h-3.5 text-gray-400" /> {modules} Modul
        </div>
        <div className="flex items-center gap-1 text-[#F59E0B] font-bold">
          <Star className="w-3.5 h-3.5 fill-current" /> {rating}
        </div>
      </div>
      
      <button className="w-full py-2.5 border border-[#006A63] text-[#006A63] bg-[#FFFFFF] rounded-md text-[13px] font-bold hover:bg-[#006A63] hover:text-white transition-colors">
        Mulai Belajar
      </button>
    </div>
  </div>
);

const PopularCourses = () => {
  const courses = [
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      category: "Tata Kelola",
      title: "Manajemen Digitalisasi Pelayanan Publik Aparatur",
      instructor: "Dr. Budi Santoso, M.Si",
      jpl: 24,
      modules: 6,
      rating: 4.8
    },
    {
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      category: "Kepemimpinan",
      title: "Kepemimpinan Transformasional di Era Digital",
      instructor: "Dra. Siti Aminah, MPA",
      jpl: 32,
      modules: 8,
      rating: 4.9
    },
    {
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
      category: "Keuangan",
      title: "Teknis Penyusunan Anggaran Kinerja Berbasis Hasil",
      instructor: "Ir. Ahmad Wahyudi, MM",
      jpl: 18,
      modules: 5,
      rating: 4.7
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-[#EFF5F3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1D315F] mb-2">Pelatihan Terpopuler</h2>
            <p className="text-gray-500 text-xs sm:text-sm">Ikuti pelatihan yang paling banyak diminati oleh rekan-rekan ASN lainnya.</p>
          </div>
          <a href="#" className="text-[#3FCDC1] text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline">
            Lihat Semua Pelatihan <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: 1, title: 'Login dengan NIP', desc: 'Gunakan NIP dan kata sandi sistem kepegawaian Anda untuk masuk secara aman.' },
    { num: 2, title: 'Pilih Pelatihan', desc: 'Eksplorasi katalog dan pilih kursus yang sesuai dengan kebutuhan pengembangan Anda.' },
    { num: 3, title: 'Belajar Mandiri', desc: 'Ikuti materi, kerjakan kuis, dan selesaikan modul sesuai dengan waktu yang Anda miliki.' },
    { num: 4, title: 'Dapatkan Sertifikat', desc: 'Unduh sertifikat digital yang otomatis terintegrasi dengan riwayat kompetensi kepegawaian.' },
  ];

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto bg-white">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-[#1D315F] mb-2 md:mb-3">Cara Kerja Platform</h2>
        <p className="text-gray-500 text-xs sm:text-sm px-4">Langkah mudah untuk mulai meningkatkan kompetensi Anda melalui platform BKPSDM Pintar.</p>
      </div>
      <div className="relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[1px] bg-gray-200 z-0"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1D315F] text-white flex items-center justify-center font-bold text-base md:text-lg mb-4 md:mb-6 shadow-lg ring-4 md:ring-8 ring-white">
                {step.num}
              </div>
              <h3 className="font-bold text-[#1D315F] text-sm md:text-[14px] mb-2 md:mb-3">{step.title}</h3>
              <p className="text-xs md:text-[12px] text-gray-500 leading-relaxed max-w-[220px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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

export default function LandingPage({ onLogin, onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar onNavigate={onNavigate} />
      <main className="flex-grow">
        <Hero onLogin={onLogin} />
        <FeaturesBanner />
        <Categories />
        <PopularCourses />
        <HowItWorks />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
