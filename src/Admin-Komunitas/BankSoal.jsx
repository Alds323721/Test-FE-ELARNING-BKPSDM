import React, { useState } from 'react';
import { 
  LayoutDashboard, LogOut, Bell, Settings, Search, Menu, X,
  FileText, RotateCcw, ChevronDown, CheckCircle, CheckCircle2,
  ChevronLeft, ChevronRight, BarChart2, Book, HelpCircle, 
  GraduationCap, HeadphonesIcon, ArrowLeft, Plus, Trash2, Edit3,
  Check, Filter, AlertCircle
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'katalog-kursus', onNavigate, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'admin-komunitas', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pelatihan-saya', label: 'Pelatihan Saya', icon: GraduationCap },
    { id: 'laporan-progress', label: 'Laporan Progress', icon: BarChart2 },
    { id: 'katalog-kursus', label: 'Katalog Kursus', icon: Book },
    { id: 'pusat-bantuan', label: 'Pusat Bantuan', icon: HelpCircle },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={`w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo Section */}
        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center">
              <img src="/vite.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-tight text-[#1D315F]">Buleleng ASN Corpu</h1>
              <p className="text-[10px] text-gray-500 font-medium">E-Learning System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden shrink-0">
              <img src="https://ui-avatars.com/api/?name=Admin+Komunitas&background=0D8ABC&color=fff" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm truncate w-36">Admin Komunitas</h2>
              <p className="text-xs text-gray-500">Dinas Kesehatan</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 py-2 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (onNavigate) onNavigate(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#0F766E] text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="text-left truncate leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 space-y-2 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-teal-600 text-teal-700 rounded-lg text-sm font-semibold hover:bg-teal-50 transition-colors">
            <HeadphonesIcon className="w-4 h-4" /> Bantuan Teknis
          </button>
          <button 
            onClick={() => {
              if (onNavigate) onNavigate('landing');
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400 shrink-0" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </>
  );
};

const Header = ({ setIsOpen }) => (
  <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
    <div className="flex items-center gap-4 flex-1">
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div className="relative w-full max-w-md hidden sm:block">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Cari modul atau peserta..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
        />
      </div>
    </div>
    <div className="flex items-center gap-2 sm:gap-4">
      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative hidden sm:block">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
      </button>
      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
        <Settings className="w-5 h-5" />
      </button>
      <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
      <button className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-full transition-colors">
        <img src="https://ui-avatars.com/api/?name=Admin+Komunitas&background=0D8ABC&color=fff" alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
      </button>
    </div>
  </header>
);

const initialQuestions = [
  {
    id: 1,
    type: 'pilihan_ganda',
    pertanyaan: 'Apa prinsip utama integritas bagi seorang Aparatur Sipil Negara (ASN) menurut pedoman terbaru?',
    jawabanBenar: 'A',
    opsi: [
      { key: 'A', text: 'Bertindak jujur, transparan, dan akuntabel dalam setiap pelaksanaan tugas.' },
      { key: 'B', text: 'Menjaga rahasia jabatan meskipun diminta oleh pihak berwenang.' },
      { key: 'C', text: 'Mengutamakan kepentingan golongan di atas kepentingan publik.' },
      { key: 'D', text: 'Menyelesaikan tugas secepat mungkin tanpa memperhatikan SOP.' }
    ]
  },
  {
    id: 2,
    type: 'pilihan_ganda',
    pertanyaan: 'Dalam konteks pelayanan prima, tindakan mana yang paling mencerminkan nilai akuntabilitas?',
    jawabanBenar: 'B',
    opsi: [
      { key: 'A', text: 'Memberikan pelayanan hanya pada jam kerja formal.' },
      { key: 'B', text: 'Memberikan laporan kinerja secara berkala dan terbuka kepada publik.' },
      { key: 'C', text: 'Menolak memberikan informasi kepada wartawan yang tidak dikenal.' },
      { key: 'D', text: 'Mendelegasikan semua tanggung jawab kepada staf junior.' }
    ]
  },
  {
    id: 3,
    type: 'benar_salah',
    pertanyaan: 'Seorang ASN diperbolehkan menerima imbalan fasilitas khusus dari vendor pihak ketiga apabila proyek telah selesai dilaksanakan dengan sukses.',
    jawabanBenar: 'B',
    opsi: [
      { key: 'A', text: 'Benar' },
      { key: 'B', text: 'Salah, segala bentuk gratifikasi yang berhubungan dengan jabatan dilarang keras.' }
    ]
  },
  {
    id: 4,
    type: 'pilihan_ganda',
    pertanyaan: 'Bagaimana langkah pertama yang harus diambil ASN saat menghadapi benturan kepentingan (conflict of interest)?',
    jawabanBenar: 'C',
    opsi: [
      { key: 'A', text: 'Melanjutkan proses pengambilan keputusan secara diam-diam.' },
      { key: 'B', text: 'Meminta persetujuan lisan dari rekan sejawat satu divisi.' },
      { key: 'C', text: 'Melaporkan potensi benturan kepentingan kepada atasan langsung secara tertulis.' },
      { key: 'D', text: 'Mengabaikannya jika nominal transaksi di bawah ketentuan pelaporan.' }
    ]
  }
];

const BankSoal = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('semua'); // 'semua', 'pilihan_ganda', 'benar_salah'
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState(initialQuestions);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // New question form state
  const [newType, setNewType] = useState('pilihan_ganda');
  const [newQuestion, setNewQuestion] = useState('');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState('A');
  const [newOptions, setNewOptions] = useState({
    A: '',
    B: '',
    C: '',
    D: ''
  });

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesFilter = 
      activeFilter === 'semua' || 
      (activeFilter === 'pilihan_ganda' && q.type === 'pilihan_ganda') ||
      (activeFilter === 'benar_salah' && q.type === 'benar_salah');
    
    const matchesSearch = 
      q.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.opsi.some(o => o.text.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / itemsPerPage));
  const displayedQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleAddQuestionSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    let createdOptions = [];
    if (newType === 'pilihan_ganda') {
      createdOptions = [
        { key: 'A', text: newOptions.A || 'Pilihan A' },
        { key: 'B', text: newOptions.B || 'Pilihan B' },
        { key: 'C', text: newOptions.C || 'Pilihan C' },
        { key: 'D', text: newOptions.D || 'Pilihan D' }
      ];
    } else {
      createdOptions = [
        { key: 'A', text: 'Benar' },
        { key: 'B', text: 'Salah' }
      ];
    }

    const newQ = {
      id: Date.now(),
      type: newType,
      pertanyaan: newQuestion,
      jawabanBenar: newCorrectAnswer,
      opsi: createdOptions
    };

    setQuestions([newQ, ...questions]);
    setIsAddModalOpen(false);
    setNewQuestion('');
    setNewOptions({ A: '', B: '', C: '', D: '' });
    setNewCorrectAnswer('A');
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24">
      <AdminSidebar 
        activeMenu="katalog-kursus" 
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Breadcrumb Back Link */}
            <div>
              <button 
                onClick={() => onNavigate && onNavigate('detail-kursus')}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0F766E] font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali ke Kelola Kursus
              </button>
            </div>

            {/* Page Title & Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-gray-900 tracking-tight">
                Bank Soal: Etika Birokrasi Modern
              </h1>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F766E] hover:bg-[#0D655E] text-white font-semibold rounded-lg shadow-sm text-sm transition-all w-full sm:w-auto shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Tambah Soal</span>
              </button>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => { setActiveFilter('semua'); setCurrentPage(1); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all shrink-0 ${
                    activeFilter === 'semua'
                      ? 'bg-[#0F766E] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  Semua Soal
                </button>
                <button
                  onClick={() => { setActiveFilter('pilihan_ganda'); setCurrentPage(1); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all shrink-0 ${
                    activeFilter === 'pilihan_ganda'
                      ? 'bg-[#0F766E] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  Pilihan Ganda
                </button>
                <button
                  onClick={() => { setActiveFilter('benar_salah'); setCurrentPage(1); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all shrink-0 ${
                    activeFilter === 'benar_salah'
                      ? 'bg-[#0F766E] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  Benar/Salah
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Cari soal..."
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Questions Card Container */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-8 space-y-8">
                {displayedQuestions.length === 0 ? (
                  <div className="py-12 text-center">
                    <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Tidak ada soal yang ditemukan.</p>
                    <p className="text-xs text-gray-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter kategori.</p>
                  </div>
                ) : (
                  displayedQuestions.map((question, index) => {
                    const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <div key={question.id} className="group">
                        {/* Question Title & Actions */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h3 className="text-base sm:text-[17px] font-bold text-gray-900 leading-snug">
                            {globalIndex}. {question.pertanyaan}
                          </h3>
                          <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button 
                              onClick={() => handleDeleteQuestion(question.id)}
                              title="Hapus Soal"
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Options Stack with subtle vertical line */}
                        <div className="border-l-2 border-gray-200 pl-3 sm:pl-5 space-y-2.5 my-3">
                          {question.opsi.map((opt) => {
                            const isCorrect = opt.key === question.jawabanBenar;

                            if (isCorrect) {
                              return (
                                <div 
                                  key={opt.key}
                                  className="bg-[#EAF7EE] border border-[#B9E8CA] rounded-lg px-3.5 sm:px-4 py-3 flex items-center justify-between gap-3 shadow-xs transition-all"
                                >
                                  <div className="flex items-start gap-2.5 sm:gap-3 text-sm min-w-0 flex-1">
                                    <span className="font-bold text-[#15803D] shrink-0">
                                      {opt.key}.
                                    </span>
                                    <span className="font-medium text-gray-900 leading-relaxed break-words">
                                      {opt.text}
                                    </span>
                                  </div>
                                  <div className="shrink-0 flex items-center ml-2">
                                    <CheckCircle className="w-5 h-5 text-[#16A34A] fill-[#EAF7EE]" />
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div 
                                key={opt.key}
                                className="px-3.5 sm:px-4 py-2 flex items-start gap-2.5 sm:gap-3 text-sm text-gray-800"
                              >
                                <span className="font-bold text-gray-700 shrink-0">
                                  {opt.key}.
                                </span>
                                <span className="font-normal text-gray-700 leading-relaxed break-words">
                                  {opt.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Divider between questions if not the last on the page */}
                        {index < displayedQuestions.length - 1 && (
                          <div className="h-px bg-gray-100 mt-8 mb-2"></div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Pagination Footer */}
              <div className="border-t border-gray-100 px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
                <span className="text-xs sm:text-sm text-gray-500">
                  Menampilkan {displayedQuestions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                  {Math.min(currentPage * itemsPerPage, filteredQuestions.length)} dari 24 soal
                </span>
                
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`p-1.5 rounded-lg border border-gray-200 transition-colors ${
                      currentPage === 1 
                        ? 'text-gray-300 border-gray-100 cursor-not-allowed' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`p-1.5 rounded-lg border border-gray-200 transition-colors ${
                      currentPage === totalPages 
                        ? 'text-gray-300 border-gray-100 cursor-not-allowed' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Tambah Soal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 overflow-hidden space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Tambah Soal Baru</h3>
                <p className="text-xs text-gray-500">Tambahkan butir pertanyaan untuk bank soal kursus</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddQuestionSubmit} className="space-y-4">
              {/* Question Type */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Tipe Soal
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setNewType('pilihan_ganda'); setNewCorrectAnswer('A'); }}
                    className={`py-2 px-3 text-sm font-semibold rounded-lg border text-center transition-all ${
                      newType === 'pilihan_ganda'
                        ? 'bg-teal-50 border-[#0F766E] text-[#0F766E]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    Pilihan Ganda
                  </button>
                  <button
                    type="button"
                    onClick={() => { setNewType('benar_salah'); setNewCorrectAnswer('A'); }}
                    className={`py-2 px-3 text-sm font-semibold rounded-lg border text-center transition-all ${
                      newType === 'benar_salah'
                        ? 'bg-teal-50 border-[#0F766E] text-[#0F766E]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    Benar / Salah
                  </button>
                </div>
              </div>

              {/* Question Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Pertanyaan
                </label>
                <textarea
                  rows="3"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Tuliskan butir pertanyaan di sini..."
                  required
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              {/* Options Input */}
              {newType === 'pilihan_ganda' ? (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Pilihan Jawaban (Pilih radio untuk jawaban benar)
                  </label>
                  {['A', 'B', 'C', 'D'].map((key) => (
                    <div key={key} className="flex items-center gap-3">
                      <input 
                        type="radio"
                        id={`ans-${key}`}
                        name="correctAnswer"
                        checked={newCorrectAnswer === key}
                        onChange={() => setNewCorrectAnswer(key)}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 accent-[#0F766E] cursor-pointer"
                      />
                      <label htmlFor={`ans-${key}`} className="font-bold text-sm text-gray-700 w-4">
                        {key}.
                      </label>
                      <input 
                        type="text"
                        value={newOptions[key]}
                        onChange={(e) => setNewOptions({ ...newOptions, [key]: e.target.value })}
                        placeholder={`Teks jawaban pilihan ${key}`}
                        required
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Kunci Jawaban Benar
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                      <input 
                        type="radio"
                        name="correctAnswer"
                        checked={newCorrectAnswer === 'A'}
                        onChange={() => setNewCorrectAnswer('A')}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 accent-[#0F766E]"
                      />
                      Benar
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                      <input 
                        type="radio"
                        name="correctAnswer"
                        checked={newCorrectAnswer === 'B'}
                        onChange={() => setNewCorrectAnswer('B')}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 accent-[#0F766E]"
                      />
                      Salah
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-50 transition-colors text-center"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0F766E] hover:bg-[#0D655E] text-white font-semibold rounded-lg text-sm transition-colors shadow-sm text-center"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSoal;
