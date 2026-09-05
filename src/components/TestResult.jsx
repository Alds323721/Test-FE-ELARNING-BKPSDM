import { useState } from 'react';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Award,
  Download,
  Share2,
  ChevronLeft,
  Star,
  Info
} from 'lucide-react';

const TestResultNavbar = ({ onNavigate }) => {
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
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-semibold">10+</span>
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

const CertificatePreview = () => (
  <div className="bg-white border border-[#BBC9C7] rounded-lg p-8 md:p-12 flex flex-col items-center text-center shadow-sm">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#3FCDC1]/10 rounded-full flex items-center justify-center mb-6">
      <Award className="w-8 h-8 md:w-10 md:h-10 text-[#006A63]" />
    </div>
    
    <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">SERTIFIKAT KELULUSAN</p>
    
    <h2 className="text-2xl md:text-3xl font-semibold text-[#1D315F] mb-6 md:mb-8">
      Manajemen Kinerja Pegawai
    </h2>
    
    <div className="mb-6 md:mb-8">
      <p className="text-sm md:text-base text-gray-600 font-semibold mb-2">Diberikan Kepada:</p>
      <h3 className="text-xl md:text-2xl font-semibold text-[#1D315F] mb-1">Budi Prakoso, S.T.</h3>
      <p className="text-sm text-gray-500 font-semibold">NIP: 198502102010121001</p>
    </div>
    
    <div className="grid grid-cols-2 gap-8 md:gap-16 mb-8 md:mb-10 w-full max-w-md">
      <div className="text-center">
        <p className="text-xs text-gray-500 font-semibold mb-1">JPL</p>
        <p className="text-2xl md:text-3xl font-semibold text-[#1D315F]">40 Jam</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 font-semibold mb-1">Tanggal</p>
        <p className="text-base md:text-lg font-semibold text-[#1D315F]">24 Oktober 2023</p>
      </div>
    </div>
    
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
      <button className="flex-1 px-6 py-3 bg-[#006A63] text-white font-semibold rounded-md hover:bg-[#00534D] transition-colors flex items-center justify-center gap-2">
        <Download className="w-5 h-5" />
        Unduh Sertifikat (PDF)
      </button>
      <button className="flex-1 px-6 py-3 border-2 border-[#006A63] text-[#006A63] font-semibold rounded-md hover:bg-[#EFF5F3] transition-colors flex items-center justify-center gap-2">
        <Share2 className="w-5 h-5" />
        Bagikan Achievement
      </button>
    </div>
  </div>
);

const ScoreSummary = () => (
  <div className="bg-white border border-[#BBC9C7] rounded-lg p-6">
    <h3 className="font-semibold text-[#1D315F] text-lg mb-6">Ringkasan Nilai</h3>
    
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <span className="text-gray-600 font-semibold text-sm">Nilai Akhir Post Test</span>
        <div className="text-right">
          <span className="text-3xl font-semibold text-[#006A63]">92</span>
          <span className="text-gray-500 font-semibold">/100</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <span className="text-gray-600 font-semibold text-sm">Status Kelulusan</span>
        <span className="px-4 py-1.5 bg-[#10B981]/10 text-[#10B981] font-semibold text-sm rounded-full">
          Lulus
        </span>
      </div>
      
      <div className="bg-[#F4F8FB] border border-[#3FCDC1]/30 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#006A63] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-600 font-semibold">
          Sertifikat ini diakui secara resmi dalam sistem kepegawaian.
        </p>
      </div>
    </div>
  </div>
);

const FeedbackSection = () => {
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');

  return (
    <div className="bg-white border border-[#BBC9C7] rounded-lg p-6 mt-6">
      <h3 className="font-semibold text-[#1D315F] text-lg mb-4">Berikan Ulasan Anda</h3>
      
      <p className="text-sm text-gray-600 font-semibold mb-4">
        Bantu kami meningkatkan kualitas pelatihan dengan memberikan ulasan.
      </p>
      
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= rating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 font-semibold mb-4">Kesan & Pesan / Keluhan Layanan</p>
      
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Tuliskan pengalaman Anda mengikuti pelatihan ini..."
        className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#006A63] focus:border-transparent resize-none font-semibold"
      />
      
      <button className="mt-4 w-full px-6 py-2.5 bg-gray-100 text-[#1D315F] font-semibold rounded-md hover:bg-gray-200 transition-colors">
        Kirim Ulasan
      </button>
    </div>
  );
};

export default function TestResult({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FBFC]">
      <TestResultNavbar onNavigate={onNavigate} />
      
      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Success Banner */}
          <div className="text-center mb-8 md:mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-[#10B981]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1D315F] mb-3">
              Selamat, Anda Lulus!
            </h1>
            <p className="text-sm md:text-base text-gray-600 font-semibold">
              Anda telah berhasil menyelesaikan program pelatihan dan berhak mendapatkan sertifikat resmi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <CertificatePreview />
            </div>
            
            <div className="lg:col-span-4">
              <ScoreSummary />
              <FeedbackSection />
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => onNavigate('my-courses')}
              className="flex items-center gap-2 text-[#006A63] hover:text-[#00534D] font-semibold transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Pelatihanku
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
