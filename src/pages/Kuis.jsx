import { useState, useEffect, useRef, useMemo } from 'react';
import api from '../api/axios';
import Swal from 'sweetalert2';
import logoImg from '../assets/logo-removebg-preview 1.png';
import hiasanImg from '../assets/Hiasan.png';
import ProfileDropdown from '../components/ProfileDropdown';
import CrosswordBoard from '../components/CrosswordBoard';
import DragDropQuiz from '../components/DragDropQuiz';
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
  MapPin,
  Grid,
  BookOpen,
  Sparkles
} from 'lucide-react';

/* ── Navbar ─────────────────────────────────────────── */
const KuisNavbar = ({ onNavigate }) => {
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

const KuisHeader = ({ onBack, testData, answeredCount = 0 }) => (
  <div className="bg-[#1D315F] py-6 md:py-8 px-6 md:px-12 relative overflow-hidden" style={{ backgroundImage: `url(${hiasanImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-[#1D315F] opacity-55"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <h1 className="text-white text-2xl md:text-3xl font-semibold mb-4">{testData?.judul_kuis || 'Kuis Evaluasi'}</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white text-xs sm:text-sm">
          <button
            onClick={onBack}
            className="flex items-center gap-1 hover:text-[#3FCDC1] transition-colors font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Pelatihan</span>
          </button>
          <span className="hidden sm:inline">•</span>
          <span className="text-xs sm:text-sm font-semibold">{testData?.judul_modul || 'Modul'}</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <span className="text-white">Kuis</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <div className="w-16 sm:w-20 h-1.5 bg-[#3FCDC1] rounded-full"></div>
            <span className="text-white text-xs">{answeredCount}/{testData?.soal?.length || 0} Terjawab</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TimerCard = ({ answeredCount, totalQuestions, durationMinutes, onTimeUp, maxAttempts = 3, isPreTest = false }) => {
  const [time, setTime] = useState(durationMinutes ? durationMinutes * 60 : 15 * 60);
  const timerRef = useRef(null);

  useEffect(() => {
    if (durationMinutes) {
        setTime(durationMinutes * 60);
    }
  }, [durationMinutes]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [onTimeUp]);

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
          <span className="text-gray-600 font-semibold">{isPreTest ? 'Jenis Ujian' : 'Batas Kesempatan'}</span>
          <span className="text-[#1D315F] font-semibold">{isPreTest ? 'Pre-Test Materi' : `${maxAttempts} Kali`}</span>
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

const QuestionCard = ({ questionNumber, questionData, onPrevious, onNext, onFlag, onAnswer, isDisabled, savedAnswer }) => {
  if (!questionData) return null;

  const handleSelectAnswer = (value) => {
    if (onAnswer) {
      onAnswer(questionData.soal_kuis_id, value);
    }
  };

  const options = questionData.pilihan_jawaban ? Object.entries(questionData.pilihan_jawaban) : [];

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
          {questionData.teks_soal}
        </p>
      </div>

      <div className="space-y-4">
        {options.map(([key, text]) => (
          <label
            key={key}
            className={`flex items-start gap-4 p-4 md:p-5 border-2 rounded-lg cursor-pointer transition-all ${savedAnswer === key
                ? 'border-[#006A63] bg-[#EFF5F3]'
                : 'border-gray-200 hover:border-[#3FCDC1] hover:bg-gray-50'
              }`}
          >
            <input
              type="radio"
              name={`answer-${questionData.soal_kuis_id}`}
              value={key}
              checked={savedAnswer === key}
              onChange={(e) => handleSelectAnswer(e.target.value)}
              className="mt-1 w-5 h-5 text-[#006A63] focus:ring-[#006A63] focus:ring-offset-0"
            />
            <div className="flex-1">
              <span className="font-semibold text-[#1D315F] text-sm md:text-base">
                {key}. {text}
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

export default function Kuis({ onNavigate, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('pg'); // 'pg' | 'tts'

  const courseId = localStorage.getItem('userCourseId');
  const modulId = localStorage.getItem('userModulId');
  const kuisId = localStorage.getItem('userKuisId');

  useEffect(() => {
    const fetchKuis = async () => {
      try {
        const res = await api.get(`/user/courses/${courseId}/modul/${modulId}/kuis/${kuisId}`);
        if (res.data?.data) {
          const data = res.data.data;
          setTestData(data);
          const hasPG = (data.soal || []).some(s => s.tipe_soal === 'pilihan_ganda' || (!s.tipe_soal && s.tipe_soal !== 'tts' && s.tipe_soal !== 'drag_drop'));
          const hasTTS = (data.soal || []).some(s => s.tipe_soal === 'tts');
          const hasDD = (data.soal || []).some(s => s.tipe_soal === 'drag_drop');
          if (hasPG) {
            setActiveSection('pg');
          } else if (hasTTS) {
            setActiveSection('tts');
          } else if (hasDD) {
            setActiveSection('drag_drop');
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memuat Kuis',
          text: error.response?.data?.message || 'Gagal mengambil soal kuis.',
          confirmButtonColor: '#006A63'
        });
        if (onBack) onBack();
        else onNavigate('my-courses');
      } finally {
        setLoading(false);
      }
    };
    if (courseId) {
      fetchKuis();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'ID Tidak Ditemukan',
        text: 'Data sesi pelatihan tidak ditemukan.',
        confirmButtonColor: '#006A63'
      });
      onNavigate('my-courses');
    }
  }, [courseId]);

  // Pisahkan soal PG, TTS, dan Drag & Drop
  const pgQuestions = useMemo(() => {
    return (testData?.soal || []).filter(s => s.tipe_soal === 'pilihan_ganda' || (!s.tipe_soal && s.tipe_soal !== 'tts' && s.tipe_soal !== 'drag_drop'));
  }, [testData]);

  const ttsQuestions = useMemo(() => {
    return (testData?.soal || []).filter(s => s.tipe_soal === 'tts');
  }, [testData]);

  const dragDropQuestions = useMemo(() => {
    return (testData?.soal || []).filter(s => s.tipe_soal === 'drag_drop');
  }, [testData]);

  const totalSoal = testData?.soal?.length || 0;

  // Hitung jumlah butir yang sudah terjawab
  const answeredCount = useMemo(() => {
    let count = 0;
    (testData?.soal || []).forEach(s => {
      const ans = answers[s.soal_kuis_id];
      if (s.tipe_soal === 'tts') {
        const minLen = s.panjang_kata || 2;
        if (typeof ans === 'string' && ans.trim().length >= minLen && !ans.includes(' ')) {
          count++;
        }
      } else if (s.tipe_soal === 'drag_drop') {
        const required = s.jumlah_blank || 1;
        if (Array.isArray(ans) && ans.filter(Boolean).length === required) {
          count++;
        }
      } else {
        if (typeof ans === 'string' && ans.trim().length > 0) {
          count++;
        }
      }
    });
    return count;
  }, [testData, answers]);

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
    if (currentQuestion < pgQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleQuestionSelect = (num) => {
    setCurrentQuestion(num);
  };

  const handleAnswer = (soalId, value) => {
    setAnswers(prev => ({
      ...prev,
      [soalId]: value
    }));
  };

  const handleSubmit = async (isTimeUp = false) => {
    if (!testData || submitting) return;

    const unansweredCount = totalSoal - answeredCount;

    if (!isTimeUp) {
      const confirmResult = await Swal.fire({
        title: 'Kumpulkan Kuis?',
        html: unansweredCount > 0 ? `
          <div class="text-left text-sm text-gray-600 space-y-2 pt-1">
            <p>Masih ada <b class="text-red-500">${unansweredCount} dari ${totalSoal} butir soal / kata</b> yang belum selesai Anda jawab.</p>
            <p class="text-xs text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200">
              ⚠️ Soal atau kata TTS yang tidak dijawab akan bernilai 0. Apakah Anda yakin ingin mengumpulkan kuis sekarang?
            </p>
          </div>
        ` : `
          <div class="text-left text-sm text-gray-600 space-y-2 pt-1">
            <p>Anda telah menjawab seluruh <b>${totalSoal} butir soal & kata TTS</b>.</p>
            <p>Apakah Anda yakin ingin menyelesaikan dan mengumpulkan kuis ini?</p>
          </div>
        `,
        icon: unansweredCount > 0 ? 'warning' : 'question',
        showCancelButton: true,
        confirmButtonColor: '#006A63',
        cancelButtonColor: '#6B7280',
        confirmButtonText: unansweredCount > 0 ? 'Ya, Tetap Kumpulkan' : 'Ya, Kumpulkan',
        cancelButtonText: 'Periksa Kembali',
        reverseButtons: true
      });

      if (!confirmResult.isConfirmed) return;
    }

    try {
      setSubmitting(true);
      
      const formattedAnswers = Object.entries(answers).map(([id, val]) => ({
        soal_kuis_id: parseInt(id),
        jawaban: typeof val === 'string' ? val.trim().toUpperCase() : val
      }));

      const res = await api.post(`/user/courses/${courseId}/modul/${modulId}/kuis/${kuisId}/submit`, {
        jawaban: formattedAnswers
      });

      const result = res.data?.data;
      const isPassed = !!result?.apakah_lulus;
      const score = result?.nilai ?? 0;
      const passingGrade = testData?.nilai_kelulusan ?? 70;
      const isPreTest = testData?.tipe_kuis === 'pre_test';

      if (isPreTest) {
        await Swal.fire({
          title: '🎉 Pre-Test Selesai!',
          html: `
            <div class="text-center space-y-4 pt-2">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-700 text-3xl font-bold mx-auto">
                ✓
              </div>
              <div>
                <div class="text-4xl font-extrabold text-[#006A63]">
                  ${score}
                </div>
                <div class="text-xs text-gray-500 font-semibold mt-1">
                  Skor Penilaian Awal (Pre-Test)
                </div>
              </div>
              <div class="p-3.5 rounded-lg text-xs md:text-sm text-left leading-relaxed bg-teal-50 text-teal-900 border border-teal-200">
                <b>Terima kasih!</b> Anda telah menyelesaikan Pre-Test ini. Akses berkas materi pembelajaran sekarang telah terbuka dan dapat Anda pelajari.
              </div>
            </div>
          `,
          icon: 'success',
          confirmButtonColor: '#006A63',
          confirmButtonText: 'Buka Materi Pembelajaran',
          allowOutsideClick: false
        });
      } else {
        // Pop-up keterangan kelulusan kuis evaluasi modul
        await Swal.fire({
          title: isPassed ? '🎉 Selamat, Anda Lulus Kuis!' : 'Belum Memenuhi Kelulusan',
          html: `
            <div class="text-center space-y-4 pt-2">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full ${isPassed ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-600'} text-3xl font-bold mx-auto">
                ${isPassed ? '✓' : '✕'}
              </div>
              <div>
                <div class="text-4xl font-extrabold ${isPassed ? 'text-[#006A63]' : 'text-red-600'}">
                  ${score}
                </div>
                <div class="text-xs text-gray-500 font-semibold mt-1">
                  Batas Kelulusan (KKM): ${passingGrade}
                </div>
              </div>
              <div class="p-3.5 rounded-lg text-xs md:text-sm text-left leading-relaxed ${isPassed ? 'bg-teal-50 text-teal-900 border border-teal-200' : 'bg-amber-50 text-amber-900 border border-amber-200'}">
                ${isPassed 
                  ? '<b>Hebat!</b> Anda telah memahami materi modul ini dengan baik dan berhak melanjutkan ke modul berikutnya.' 
                  : 'Nilai Anda belum mencapai batas minimal kelulusan. Silakan pelajari kembali materi pada modul ini dan ulangi kuis evaluasi.'}
              </div>
            </div>
          `,
          icon: isPassed ? 'success' : 'warning',
          confirmButtonColor: isPassed ? '#006A63' : '#1D315F',
          confirmButtonText: isPassed ? 'Lanjutkan Pelatihan' : 'Kembali ke Materi',
          allowOutsideClick: false
        });
      }
      
      onNavigate('course-detail');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengumpulkan Kuis',
        text: error.response?.data?.message || 'Terjadi gangguan saat mengumpulkan kuis. Silakan coba kembali.',
        confirmButtonColor: '#006A63'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#1D315F] font-bold">Memuat Soal...</div>;
  }

  if (!testData || testData.soal.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-[#1D315F] font-bold">Tidak ada soal tersedia.</div>;
  }

  const answeredQuestionsSet = new Set(
    pgQuestions
      .map((s, idx) => (answers[s.soal_kuis_id] ? idx + 1 : null))
      .filter(Boolean)
  );

  const currentQuestionData = pgQuestions[currentQuestion - 1];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FBFC]">
      <KuisNavbar onNavigate={onNavigate} />
      <KuisHeader onBack={onBack} testData={testData} answeredCount={answeredCount} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 md:py-8">
          {/* Timer Card - Top untuk semua tampilan */}
          <div className="mb-6">
            <TimerCard 
              answeredCount={answeredCount} 
              totalQuestions={totalSoal} 
              durationMinutes={testData.durasi_menit || 15}
              maxAttempts={testData.maks_percobaan || 3}
              isPreTest={testData.tipe_kuis === 'pre_test'}
              onTimeUp={() => handleSubmit(true)}
            />
          </div>

          {/* Tab Selector jika Kuis memiliki lebih dari 1 jenis soal (Hybrid) */}
          {[
            pgQuestions.length > 0 ? 'pg' : null,
            ttsQuestions.length > 0 ? 'tts' : null,
            dragDropQuestions.length > 0 ? 'drag_drop' : null
          ].filter(Boolean).length > 1 && (
            <div className="flex bg-white p-1.5 rounded-xl border border-gray-200 mb-6 shadow-xs max-w-2xl overflow-x-auto">
              {pgQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveSection('pg')}
                  className={`flex-1 min-w-[130px] py-2.5 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                    activeSection === 'pg'
                      ? 'bg-[#006A63] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Pilihan Ganda</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeSection === 'pg' ? 'bg-teal-800 text-teal-100' : 'bg-gray-100 text-gray-600'}`}>
                    {pgQuestions.filter(s => answers[s.soal_kuis_id]).length}/{pgQuestions.length}
                  </span>
                </button>
              )}
              {ttsQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveSection('tts')}
                  className={`flex-1 min-w-[130px] py-2.5 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                    activeSection === 'tts'
                      ? 'bg-[#006A63] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span>TTS</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeSection === 'tts' ? 'bg-teal-800 text-teal-100' : 'bg-gray-100 text-gray-600'}`}>
                    {ttsQuestions.filter(s => answers[s.soal_kuis_id] && answers[s.soal_kuis_id].trim().length === (s.panjang_kata || 0)).length}/{ttsQuestions.length}
                  </span>
                </button>
              )}
              {dragDropQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveSection('drag_drop')}
                  className={`flex-1 min-w-[150px] py-2.5 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                    activeSection === 'drag_drop'
                      ? 'bg-[#006A63] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Drag & Drop</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeSection === 'drag_drop' ? 'bg-teal-800 text-teal-100' : 'bg-gray-100 text-gray-600'}`}>
                    {dragDropQuestions.filter(s => Array.isArray(answers[s.soal_kuis_id]) && answers[s.soal_kuis_id].filter(Boolean).length === (s.jumlah_blank || 1)).length}/{dragDropQuestions.length}
                  </span>
                </button>
              )}
            </div>
          )}

          {/* TAMPILAN 1: PILIHAN GANDA */}
          {activeSection === 'pg' && pgQuestions.length > 0 && (
            <>
              {/* Desktop Layout: QuestionCard + Navigation + Submit */}
              <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                <div className="lg:col-span-8">
                  <QuestionCard
                    questionNumber={currentQuestion}
                    questionData={currentQuestionData}
                    savedAnswer={answers[currentQuestionData?.soal_kuis_id]}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onFlag={handleFlag}
                    onAnswer={handleAnswer}
                    isDisabled={{
                      previous: currentQuestion === 1,
                      next: currentQuestion === pgQuestions.length,
                    }}
                  />
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <QuestionNavigation
                    currentQuestion={currentQuestion}
                    totalQuestions={pgQuestions.length}
                    onNavigate={handleQuestionSelect}
                    flaggedQuestions={flaggedQuestions}
                    answeredQuestions={answeredQuestionsSet}
                  />

                  {/* Submit Button - Desktop (di samping navigasi) */}
                  <div>
                    <button
                      onClick={() => handleSubmit(false)}
                      disabled={submitting}
                      className="w-full px-8 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      <span className="text-lg">▶</span>
                      {submitting ? 'Mengumpulkan...' : 'Submit Kuis'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tablet & Mobile Layout: QuestionCard + Navigation */}
              <div className="lg:hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                  <div className="md:col-span-8">
                    <QuestionCard
                      questionNumber={currentQuestion}
                      questionData={currentQuestionData}
                      savedAnswer={answers[currentQuestionData?.soal_kuis_id]}
                      onPrevious={handlePrevious}
                      onNext={handleNext}
                      onFlag={handleFlag}
                      onAnswer={handleAnswer}
                      isDisabled={{
                        previous: currentQuestion === 1,
                        next: currentQuestion === pgQuestions.length,
                      }}
                    />
                  </div>

                  <div className="md:col-span-4">
                    <QuestionNavigation
                      currentQuestion={currentQuestion}
                      totalQuestions={pgQuestions.length}
                      onNavigate={handleQuestionSelect}
                      flaggedQuestions={flaggedQuestions}
                      answeredQuestions={answeredQuestionsSet}
                    />
                  </div>
                </div>

                {/* Submit Button - Bottom hanya untuk Tablet & Mobile */}
                <div className="mt-6">
                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={submitting}
                    className="w-full px-8 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <span className="text-lg">▶</span>
                    {submitting ? 'Mengumpulkan...' : 'Submit Kuis'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAMPILAN 2: TEKA-TEKI SILANG (TTS) */}
          {activeSection === 'tts' && ttsQuestions.length > 0 && (
            <div className="bg-white border border-[#BBC9C7] rounded-xl p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1D315F] flex items-center gap-2">
                    <Grid className="w-6 h-6 text-[#006A63]" />
                    Game Teka-Teki Silang (TTS)
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Klik pada kotak TTS atau klik nomor petunjuk (mendatar / menurun), lalu ketik huruf jawabannya.
                  </p>
                </div>
                <div className="text-xs bg-teal-50 text-[#006A63] font-bold px-3 py-1.5 rounded-lg border border-teal-200 self-start sm:self-auto flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#006A63]" />
                  {ttsQuestions.filter(s => answers[s.soal_kuis_id] && answers[s.soal_kuis_id].trim().length === (s.panjang_kata || 0)).length} dari {ttsQuestions.length} Kata Terisi Lengkap
                </div>
              </div>

              <CrosswordBoard
                gridConfig={testData.grid_config}
                words={ttsQuestions}
                answers={answers}
                onAnswerChange={handleAnswer}
              />

              {/* Submit Button Section for TTS */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  Pastikan seluruh kata terisi sebelum menyelesaikan kuis. Klik <b>Submit Kuis</b> jika sudah selesai.
                </div>
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer"
                >
                  <span className="text-base">▶</span>
                  {submitting ? 'Mengumpulkan...' : 'Submit Kuis'}
                </button>
              </div>
            </div>
          )}

          {/* TAMPILAN 3: DRAG & DROP / DROPDOWN */}
          {activeSection === 'drag_drop' && dragDropQuestions.length > 0 && (
            <div className="space-y-6">
              <div className="bg-white border border-[#BBC9C7] rounded-xl p-4 sm:p-6 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#1D315F] flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-[#006A63]" />
                      Soal Dropdown / Drag & Drop
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Lengkapi titik-titik kosong pada kalimat berikut dengan menyeret kata atau mengklik titik kosong untuk memilih kata yang tepat.
                    </p>
                  </div>
                  <div className="text-xs bg-teal-50 text-[#006A63] font-bold px-3 py-1.5 rounded-lg border border-teal-200 self-start sm:self-auto flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#006A63]" />
                    {dragDropQuestions.filter(s => Array.isArray(answers[s.soal_kuis_id]) && answers[s.soal_kuis_id].filter(Boolean).length === (s.jumlah_blank || 1)).length} dari {dragDropQuestions.length} Soal Terisi Lengkap
                  </div>
                </div>

                <div className="space-y-8">
                  {dragDropQuestions.map((q, idx) => (
                    <div key={q.soal_kuis_id} className="p-4 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#006A63] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-teal-100 text-[#006A63] flex items-center justify-center text-[11px]">
                            {idx + 1}
                          </span>
                          Pertanyaan #{idx + 1}
                        </span>
                        <span className="text-[11px] text-gray-400 font-semibold">
                          Bobot: {q.bobot_nilai || 1} Poin
                        </span>
                      </div>

                      <DragDropQuiz
                        question={q}
                        value={answers[q.soal_kuis_id] || []}
                        onChange={(newAns) => handleAnswer(q.soal_kuis_id, newAns)}
                        isReadOnly={submitting}
                      />
                    </div>
                  ))}
                </div>

                {/* Submit Button Section for Drag & Drop */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-500">
                    Pastikan seluruh titik kosong pada semua soal telah terisi sebelum menyelesaikan kuis.
                  </div>
                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer"
                  >
                    <span className="text-base">▶</span>
                    {submitting ? 'Mengumpulkan...' : 'Submit Kuis'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
