import { useState, useEffect } from 'react';
import api from '../Admin-Komunitas/api/axios';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import ProfileDropdown from '../components/ProfileDropdown';
import LanguageDropdown from '../components/LanguageDropdown';
import { useLanguage } from '../context/LanguageContext';
import {
  Search, Bell, ChevronDown, Menu, X,
  Mail, Phone, MapPin, Users, BookOpen,
  ArrowRight, ChevronLeft, ChevronRight, Check
} from 'lucide-react';

/* ── Navbar ───────────────────────────────────── */
const CommunityNavbar = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
        <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8 text-[#1D315F] font-semibold text-sm">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63] transition-colors pb-1">{t('nav.dashboard')}</a>
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">{t('nav.community')}</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors pb-1">{t('nav.catalog')}</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="hover:text-[#006A63] transition-colors pb-1">{t('nav.myCourses')}</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63] transition-colors pb-1">{t('nav.certificates')}</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63] transition-colors pb-1">{t('nav.helpCenter')}</a>
        <div className="flex items-center gap-4 ml-4 border-l border-gray-200 pl-6">
          <LanguageDropdown />
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
        <LanguageDropdown />
        <ProfileDropdown onLogout={() => onNavigate('landing')} />
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#1D315F] hover:text-[#006A63]">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md md:hidden flex flex-col py-4 px-6 gap-4 text-[#1D315F] font-semibold text-sm z-50">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63]">{t('nav.dashboard')}</a>
          <a href="#" className="text-[#006A63]">{t('nav.community')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63]">{t('nav.catalog')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="hover:text-[#006A63]">{t('nav.myCourses')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-[#006A63]">{t('nav.certificates')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help-center'); }} className="hover:text-[#006A63]">{t('nav.helpCenter')}</a>
        </div>
      )}
    </nav>
  );
};

/* ── Page Header ──────────────────────────────── */
const PageHeader = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-[#1D315F] py-10 px-6 md:px-12 relative overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-white text-3xl md:text-4xl font-semibold">{t('community.title')}</h1>
      </div>
    </div>
  );
};

/* ── Community Card ───────────────────────────── */
const CommunityCard = ({ id, image, category, title, description, members, courses, isJoined, onJoin, onNavigate }) => {
  const { t, language } = useLanguage();
  return (
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
          <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#006A63]" /> {members.toLocaleString(language === 'EN' ? 'en-US' : 'id-ID')} {t('community.members')}</span>
          <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#006A63]" /> {courses} {t('community.courses')}</span>
        </div>

        {isJoined ? (
          <button
            onClick={() => onNavigate('catalog')}
            className="w-full py-2.5 border-2 border-[#006A63] text-[#006A63] bg-white rounded-md text-[13px] font-bold hover:bg-[#EFF5F3] transition-colors flex items-center justify-center gap-2"
          >
            {t('community.viewCommunity')} <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onJoin(id)}
            className="w-full py-2.5 bg-[#006A63] text-white rounded-md text-[13px] font-bold hover:bg-[#00534D] transition-colors flex items-center justify-center gap-2"
          >
            {t('community.joinCommunity')} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

/* ── Main Content ─────────────────────────────── */
const CommunityContent = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Semua Kategori');
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'Semua Kategori', label: t('catalog.allCategories') },
    { value: 'JPT', label: 'JPT' },
    { value: 'JA', label: 'JA' },
    { value: 'JF', label: 'JF' },
    { value: 'Pelaksana', label: t('community.staff') }
  ];

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await api.get('/user/komunitas');
        if (res.data?.data) {
          setCommunities(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch communities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, []);

  const handleJoin = async (id) => {
    try {
      await api.post(`/user/komunitas/${id}/join`);
      setCommunities(prev => prev.map(c => 
        c.id === id ? { ...c, is_joined: true, members: c.members + 1 } : c
      ));
      alert('Berhasil bergabung dengan komunitas!');
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal bergabung dengan komunitas');
    }
  };

  const handleNavigateToCatalog = (komunitasId) => {
    // Navigate ke catalog dengan mengirim ID komunitas
    localStorage.setItem('filterKomunitasId', komunitasId);
    onNavigate('catalog');
  };

  const filteredCommunities = communities.filter(c => 
    activeCategory === 'Semua Kategori' || c.category === activeCategory
  );

  return (
    <section className="bg-[#F9FBFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Sidebar */}
        <aside className="md:col-span-3">
          <div className="bg-white border border-[#BBC9C7] rounded-lg p-5">
            <h3 className="font-bold text-[#1D315F] text-[17px] mb-5">{t('community.jobFamily')}</h3>
            <div className="space-y-4">
              {categories.map((cat) => (
                <label
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${activeCategory === cat.value ? 'bg-[#006A63] border-[#006A63]' : 'bg-white border-gray-300'}`}>
                    {activeCategory === cat.value && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-[14px] font-semibold transition-colors ${activeCategory === cat.value ? 'text-[#006A63]' : 'text-[#1D315F]'}`}>{cat.label}</span>
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
              {t('community.showing')} <span className="font-bold text-[#1D315F]">{filteredCommunities.length}</span> {t('catalog.of')} <span className="font-bold text-[#1D315F]">{communities.length}</span> {t('community.communities')}
            </p>
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1D315F]">
              {t('catalog.sortBy')}
              <div className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded bg-white cursor-pointer ml-1">
                {t('catalog.newest')} <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10 font-bold text-[#1D315F]">{t('community.loading')}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredCommunities.map((c) => (
                <CommunityCard
                  key={c.id}
                  {...c}
                  isJoined={c.is_joined}
                  onJoin={handleJoin}
                  onNavigate={() => handleNavigateToCatalog(c.id)}
                />
              ))}
              {filteredCommunities.length === 0 && (
                 <div className="col-span-full text-center text-gray-500 py-10 font-semibold">{t('community.empty')}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ── Footer ───────────────────────────────────── */
const Footer = ({ onNavigate }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-[#BBC9C7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        <div className="md:col-span-5 pr-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
            <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
          </div>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-6 font-medium">
            {t('footer.tagline')}
          </p>
          <p className="text-[11px] text-gray-500 font-semibold">{t('footer.copyright')}</p>
        </div>
        <div className="md:col-span-3">
          <h4 className="font-bold text-[#1D315F] text-[15px] mb-6">{t('footer.quickLinks')}</h4>
          <ul className="text-[13px] text-[#1D315F] space-y-3 font-semibold">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('catalog'); }} className="hover:text-[#006A63] transition-colors">{t('footer.courses')}</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('community'); }} className="hover:text-[#006A63] transition-colors">{t('footer.community')}</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('help-center'); }} className="hover:text-[#006A63] transition-colors">{t('footer.help')}</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="font-bold text-[#1D315F] text-[15px] mb-6">{t('footer.contactUs')}</h4>
          <ul className="text-[13px] text-gray-600 space-y-4">
            <li className="flex items-start gap-3"><Mail className="w-4 h-4 text-[#006A63] mt-0.5 flex-shrink-0" /><span className="font-semibold">support@bkpsdm-pintar.go.id</span></li>
            <li className="flex items-start gap-3"><Phone className="w-4 h-4 text-[#006A63] mt-0.5 flex-shrink-0" /><span className="font-semibold">(021) 123-4567 (Jam Kerja)</span></li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#006A63] mt-0.5 flex-shrink-0" /><span className="font-semibold leading-relaxed">Gedung Kepegawaian Lt. 3, Jl. Protokol<br />No. 1, Jakarta</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

/* ── Export ───────────────────────────────────── */
export default function Community({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <CommunityNavbar onNavigate={onNavigate} />
      <main className="flex-grow">
        <PageHeader />
        <CommunityContent onNavigate={onNavigate} />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
