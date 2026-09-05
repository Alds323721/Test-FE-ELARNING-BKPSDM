import { useState, useEffect } from 'react';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import ProfileDropdown from '../components/ProfileDropdown';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  ChevronLeft,
  Flag,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

/* ── Navbar ─────────────────────────────────────────── */
const PostTestNavbar = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-2 sm:gap-3">
        <img src={logoImg} alt="Logo BKPSDM" className="w-6 sm:w-8 object-contain" />
        <span className="font-semibold text-base sm:text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-[#1D315F] font-semibold text-sm">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="hover:text-[#006A63] transition-colors pb-1">Dashboard</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors pb-1">Komunitas</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }} className="hover:text-[#006A63] transition-colors pb-1">Katalog</a>
        <a href="#" className="text-[#006A63] border-b-2 border-[#006A63] pb-1">Pelatihanku</a>
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
          <a href="#" className="hover:text-[#006A63] transition-colors">Bantuan</a>
        </div>
      )}
    </nav>
  );
};

const PostTestHeader = ({ onBack }) => (
  <div className="bg-[#1D315F] py-6 md:py-8 px-6 md:px-12 relative overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <h1 className="text-white text-2xl md:text-3xl font-semibold mb-4">Post Test</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white text-xs sm:text-sm">
          <button
            onClick={onBack}
            className="flex items-center gap-1 hover:text-[#3FCDC1] transition-colors font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Modul</span>
          </button>
          <span className="hidden sm:inline">•</span>
          <span className="text-xs sm:text-sm font-semibold">Modul 2: Prinsip Dasar Manajemen Risiko</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
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

const TimerCard = ({ answeredCount, totalQuestions }) => {
  const [time, setTime] = useState(2535);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="bg-white border border-[#BBC9C7] rounded-lg p-4 md:p-6">
      <h3 className="font-semibold text-[#1D315F] text-base md:text-lg mb-4">Waktu Tersisa</h3>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6 mb-6">
        <div className="text-4xl md:text-5xl font-semibold text-red-500 text-center">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <span className="text-gray-600 font-semibold">Status</span>
          <span className="text-[#006A63] font-semibold">Sedang Berjalan</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <span className="text-gray-600 font-semibold">Batas Kesempatan</span>
          <span className="text-[#1D315F] font-semibold">3 Kali</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">Soal Terjawab</span>
          <span className="text-[#1D315F] font-semibold">{answeredCount} dari {totalQuestions}</span>
        </div>
      </div>
    </div>
  );
};

const QuestionNavigation = ({ currentQuestion, totalQuestions, onNavigate, flaggedQuestions, answeredQuestions }) => {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  const getButtonClass = (num) => {
    if (num === currentQuestion) {
      // Current question - always highlighted as the active one
      return 'bg-[#006A63] text-white ring-2 ring-[#006A63] ring-offset-2 hover:bg-[#00534D]';
    }
    if (flaggedQuestions.includes(num)) {
      // Flagged questions - yellow
      return 'bg-[#F59E0B] text-white hover:bg-[#D97706]';
    }
    if (answeredQuestions.has(num)) {
      // Answered questions - teal/soft green
      return 'bg-[#3FCDC1] text-white hover:bg-[#2eb3a3]';
    }
    // Not visited questions - neutral/white with border
    return 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50';
  };

  return (
    <div className="bg-white border border-[#BBC9C7] rounded-lg p-4 md:p-6 mt-6">
      <h3 className="font-semibold text-[#1D315F] text-base md:text-lg mb-4">Navigasi Soal</h3>

      <div className="grid grid-cols-5 gap-2">
        {questions.map((num) => (
          <button
            key={num}
            onClick={() => onNavigate(num)}
            className={`w-full aspect-square rounded-md font-semibold text-sm transition-all ${getButtonClass(num)}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

const QuestionCard = ({ questionNumber, onPrevious, onNext, onFlag, onAnswer, isDisabled }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('B');

  const handleSelectAnswer = (value) => {
    setSelectedAnswer(value);
    if (onAnswer) {
      onAnswer(questionNumber);
    }
  };

  return (
    <div className="bg-white border border-[#BBC9C7] rounded-lg p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1D315F]">Pertanyaan {questionNumber}</h2>
        <button
          onClick={onFlag}
          className="flex items-center gap-2 text-gray-500 hover:text-[#F59E0B] transition-colors text-sm font-semibold"
        >
          <Flag className="w-4 h-4" />
          <span className="hidden sm:inline">Tandai Ragu</span>
        </button>
      </div>

      <div className="mb-8">
        <p className="text-[#1D315F] text-base md:text-lg leading-relaxed font-semibold">
          Menurut Peraturan Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi terbaru,
          komponen apa saja yang menjadi indikator utama dalam penilaian capaian Manajemen Kinerja
          Pegawai ASN secara sistem informasi?
        </p>
      </div>

      <div className="space-y-4">
        {[
          { id: 'A', text: 'Kehadiran fisik, loyalitas kepada atasan, dan jumlah jam kerja harian.' },
          { id: 'B', text: 'Sasaran Kinerja Pegawai (SKP), Perilaku Kerja, dan Ide Baru/Inovasi yang terukur.' },
          { id: 'C', text: 'Lamanya masa jabatan, pangkat golongan, dan tingkat pendidikan terakhir.' },
          { id: 'D', text: 'Jumlah pelatihan yang diikuti, sertifikasi teknis, dan surat tugas dinas luar.' },
        ].map((option) => (
          <label
            key={option.id}
            className={`flex items-start gap-4 p-4 md:p-5 border-2 rounded-lg cursor-pointer transition-all ${selectedAnswer === option.id
                ? 'border-[#006A63] bg-[#EFF5F3]'
                : 'border-gray-200 hover:border-[#3FCDC1] hover:bg-gray-50'
              }`}
          >
            <input
              type="radio"
              name="answer"
              value={option.id}
              checked={selectedAnswer === option.id}
              onChange={(e) => handleSelectAnswer(e.target.value)}
              className="mt-1 w-5 h-5 text-[#006A63] focus:ring-[#006A63] focus:ring-offset-0"
            />
            <div className="flex-1">
              <span className="font-semibold text-[#1D315F] text-sm md:text-base">
                {option.id}. {option.text}
              </span>
            </div>
          </label>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onPrevious}
          disabled={isDisabled.previous}
          className={`px-6 py-2.5 border-2 border-[#1D315F] text-[#1D315F] font-semibold rounded-md transition-colors flex items-center justify-center gap-2 ${isDisabled.previous ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Sebelumnya
        </button>

        <button
          onClick={onFlag}
          className="px-6 py-2.5 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#D97706] transition-colors flex items-center justify-center gap-2"
        >
          <Flag className="w-4 h-4" />
          Ragu-ragu
        </button>

        <button
          onClick={onNext}
          disabled={isDisabled.next}
          className={`px-6 py-2.5 bg-[#006A63] text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2 ${isDisabled.next ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00534D]'
            }`}
        >
          Selanjutnya
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#EAEFF4] pt-16 pb-8 border-t border-[#BBC9C7] mt-12">
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
            <span className="font-semibold leading-relaxed">Gedung Kepegawaian Lt. 3, Jl. Protokol<br />No. 1, Jakarta</span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default function PostTest({ onNavigate, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const handleFlag = () => {
    setFlaggedQuestions((prev) => {
      if (prev.includes(currentQuestion)) {
        return prev.filter((q) => q !== currentQuestion);
      } else {
        return [...prev, currentQuestion];
      }
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < 20) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleQuestionSelect = (num) => {
    setCurrentQuestion(num);
    // Mark as answered/visited when clicked
    setAnsweredQuestions((prev) => new Set([...prev, num]));
  };

  const handleSubmit = () => {
    onNavigate('test-result');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FBFC]">
      <PostTestNavbar onNavigate={onNavigate} />
      <PostTestHeader onBack={onBack} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 md:py-8">
          {/* Timer Card - Top untuk semua tampilan */}
          <div className="mb-6">
            <TimerCard answeredCount={answeredQuestions.size} totalQuestions={20} />
          </div>

          {/* Desktop Layout: QuestionCard + Navigation + Submit */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            <div className="lg:col-span-8">
              <QuestionCard
                questionNumber={currentQuestion}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onFlag={handleFlag}
                onAnswer={handleQuestionSelect}
                isDisabled={{
                  previous: currentQuestion === 1,
                  next: currentQuestion === 20,
                }}
              />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <QuestionNavigation
                currentQuestion={currentQuestion}
                totalQuestions={20}
                onNavigate={handleQuestionSelect}
                flaggedQuestions={flaggedQuestions}
                answeredQuestions={answeredQuestions}
              />

              {/* Submit Button - Desktop (di samping navigasi) */}
              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full px-8 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span className="text-lg">▶</span>
                  Submit Post Test
                </button>
              </div>
            </div>
          </div>

          {/* Tablet & Mobile Layout: QuestionCard + Navigation */}
          <div className="lg:hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {/* QuestionCard */}
              <div className="md:col-span-8">
                <QuestionCard
                  questionNumber={currentQuestion}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onFlag={handleFlag}
                  onAnswer={handleQuestionSelect}
                  isDisabled={{
                    previous: currentQuestion === 1,
                    next: currentQuestion === 20,
                  }}
                />
              </div>

              <div className="md:col-span-4">
                <QuestionNavigation
                  currentQuestion={currentQuestion}
                  totalQuestions={20}
                  onNavigate={handleQuestionSelect}
                  flaggedQuestions={flaggedQuestions}
                  answeredQuestions={answeredQuestions}
                />
              </div>
            </div>

            {/* Submit Button - Bottom hanya untuk Tablet & Mobile */}
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full px-8 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span className="text-lg">▶</span>
                Submit Post Test
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
