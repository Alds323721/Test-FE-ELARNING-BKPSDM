import React, { useState, useEffect } from 'react';
import AdminKomunitasSkeleton from './AdminKomunitasSkeleton';
import api from '../api/axios';
import Swal from 'sweetalert2';
import logoImg from '../assets/logo-removebg-preview 1.png';
import {
  Users, BookOpen, Award, TrendingUp, TrendingDown,
  LayoutDashboard, LogOut, Bell, Settings, Search, Menu, X,
  FileText, RotateCcw, ChevronDown, CheckCircle2,
  PlayCircle, Edit, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Clock,
  BarChart2, Book, HelpCircle, GraduationCap, HeadphonesIcon,
  ArrowLeft, Upload, Plus, AlertCircle, File, Eye, Trash2, Edit2, Download,
  ExternalLink, Video, Check, Image as ImageIcon
} from 'lucide-react';

const AdminSidebar = ({ activeMenu = 'katalog-kursus', onNavigate, isOpen, setIsOpen }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [communityName, setCommunityName] = useState('Dinas Kesehatan');

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const u = JSON.parse(userStr);
        setCurrentUser(u);
      }
      api.get('/admin-komunitas/komunitas-saya').then(res => {
        if (res.data?.data?.length > 0) {
          setCommunityName(res.data.data[0].nama_komunitas);
        }
      }).catch(() => { });
    } catch (e) { }
  }, []);

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
              <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-tight text-[#1D315F]">Buleleng ASN Corpu</h1>
              <p className="text-[10px] text-gray-500 font-medium">E-Learning System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden shrink-0">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.nama_lengkap || 'Admin Komunitas')}&background=0D8ABC&color=fff`} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm truncate w-36">{currentUser?.nama_lengkap || 'Admin Komunitas'}</h2>
              <p className="text-xs text-gray-500 truncate w-36">{communityName}</p>
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
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
          <button
            onClick={() => onNavigate && onNavigate('pusat-bantuan')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-teal-600 text-teal-700 rounded-lg text-sm font-semibold hover:bg-teal-50 transition-colors"
          >
            <HeadphonesIcon className="w-4 h-4" /> Bantuan Teknis
          </button>
          <button
            onClick={() => onNavigate && onNavigate('landing')}
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
        <Menu className="w-5 h-5" />
      </button>
      <div className="relative w-full max-w-md hidden sm:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari modul atau materi..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
        />
      </div>
    </div>
  </header>
);

const DetailKursus = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [postTest, setPostTest] = useState(null);
  const [openModuleIds, setOpenModuleIds] = useState({});
  const [loading, setLoading] = useState(true);

  // Course Thumbnail State
  const [courseThumbnailFile, setCourseThumbnailFile] = useState(null);
  const [courseThumbnailPreview, setCourseThumbnailPreview] = useState('');
  const [savingBasicInfo, setSavingBasicInfo] = useState(false);

  // Modal State: Tambah & Edit Modul
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [isEditingModule, setIsEditingModule] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [moduleForm, setModuleForm] = useState({ judul_modul: '', deskripsi: '' });
  const [moduleThumbnailFile, setModuleThumbnailFile] = useState(null);
  const [moduleThumbnailPreview, setModuleThumbnailPreview] = useState('');

  // Modal State: Tambah Materi
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [targetModuleId, setTargetModuleId] = useState(null);
  const [materialForm, setMaterialForm] = useState({
    judul_materi: '',
    tipe_materi: 'pdf',
    durasi_menit: 15,
    tautan_atau_berkas_embed: '',
    file_pdf: null
  });

  // Modal State: Kuis Modul
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [targetQuizModule, setTargetQuizModule] = useState(null);
  const [quizForm, setQuizForm] = useState({
    judul_kuis: '',
    nilai_kelulusan: 70,
    maks_percobaan: 3,
    soal: []
  });
  const [newQuizItem, setNewQuizItem] = useState({
    teks_soal: '',
    kunci_jawaban: 'A',
    opsiA: '',
    opsiB: '',
    opsiC: '',
    opsiD: ''
  });

  // Surat Pernyataan State
  const [suratFile, setSuratFile] = useState(null);
  const [isUploadingSurat, setIsUploadingSurat] = useState(false);

  const fetchCourseData = async () => {
    const id = localStorage.getItem('adminKomunitasCourseId');
    if (!id) {
      if (onNavigate) onNavigate('katalog-kursus');
      return;
    }
    try {
      setLoading(true);
      const [resCourse, resModul, resPostTest] = await Promise.allSettled([
        api.get(`/admin-komunitas/pembelajaran/${id}`),
        api.get(`/admin-komunitas/pembelajaran/${id}/modul`),
        api.get(`/admin-komunitas/pembelajaran/${id}/post-test`)
      ]);

      if (resCourse.status === 'fulfilled') {
        const cData = resCourse.value.data.data;
        if (cData && !cData.kategori) {
          cData.kategori = 'Pengembangan Kompetensi';
        }
        setCourse(cData);
        setCourseThumbnailPreview(cData?.thumbnail_url || '');
        setCourseThumbnailFile(null);
      }
      if (resModul.status === 'fulfilled') {
        const modData = resModul.value.data.data || [];
        setModules(modData);
        if (modData.length > 0) {
          setOpenModuleIds(prev => ({ ...prev, [modData[0].modul_id]: true }));
        }
      }
      if (resPostTest.status === 'fulfilled') {
        setPostTest(resPostTest.value.data.data);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const toggleModuleOpen = (modulId) => {
    setOpenModuleIds(prev => ({
      ...prev,
      [modulId]: !prev[modulId]
    }));
  };

  const handleCourseThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: 'warning',
        title: 'File Terlalu Besar',
        text: 'Ukuran file thumbnail maksimal 2MB.',
        confirmButtonColor: '#0F766E'
      });
      e.target.value = '';
      return;
    }

    setCourseThumbnailFile(file);
    setCourseThumbnailPreview(URL.createObjectURL(file));
  };

  const handleRemoveCourseThumbnail = () => {
    setCourseThumbnailFile(null);
    setCourseThumbnailPreview(course?.thumbnail_url || '');
  };

  // --- Informasi Dasar & Aksi Kursus ---
  const handleUpdateBasicInfo = async () => {
    if (!course) return;
    const wasPublished = course.status === 'dipublikasikan';
    try {
      setSavingBasicInfo(true);
      const data = new FormData();
      data.append('judul_pembelajaran', course.judul_pembelajaran);
      data.append('deskripsi', course.deskripsi || '-');
      data.append('kategori', course.kategori || 'Pengembangan Kompetensi');
      data.append('capaian_pembelajaran', course.capaian_pembelajaran || '-');
      data.append('nilai_kelulusan', course.nilai_kelulusan ?? 70);
      data.append('komunitas_id', course.komunitas_id);
      if (courseThumbnailFile) {
        data.append('thumbnail', courseThumbnailFile);
      }

      const res = await api.post(`/admin-komunitas/pembelajaran/${course.pembelajaran_id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data?.data) {
        setCourse(res.data.data);
        if (res.data.data.thumbnail_url) {
          setCourseThumbnailPreview(res.data.data.thumbnail_url);
        }
        setCourseThumbnailFile(null);
      }

      if (wasPublished) {
        Swal.fire({
          icon: 'info',
          title: 'Status Berubah ke Draft',
          text: 'Perubahan informasi dasar & thumbnail berhasil disimpan! Karena pelatihan sebelumnya aktif dipublikasikan, statusnya otomatis dikembalikan ke Draft. Silakan ajukan approval kembali jika sudah siap.',
          confirmButtonColor: '#0F766E'
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Tersimpan!',
          text: 'Perubahan informasi dasar & thumbnail berhasil disimpan.',
          timer: 1500,
          showConfirmButton: false
        });
      }
      fetchCourseData();
    } catch (error) {
      console.error('Error updating course:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan',
        text: error.response?.data?.message || 'Gagal menyimpan perubahan.'
      });
    } finally {
      setSavingBasicInfo(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!course) return;
    const result = await Swal.fire({
      title: 'Hapus Pelatihan?',
      text: `Apakah Anda yakin ingin menghapus pelatihan "${course.judul_pembelajaran}"? Seluruh modul, materi, kuis, dan data terkait akan dihapus secara total dan permanen.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, Hapus Permanen',
      cancelButtonText: 'Batal',
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/admin-komunitas/pembelajaran/${course.pembelajaran_id}`);
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil Dihapus',
        text: 'Pelatihan telah dihapus secara total.',
        timer: 1500,
        showConfirmButton: false
      });
      localStorage.removeItem('adminKomunitasCourseId');
      if (onNavigate) onNavigate('pelatihan-saya');
    } catch (error) {
      console.error('Error deleting course:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menghapus',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menghapus pelatihan.'
      });
    }
  };

  // --- Modul Handlers ---
  const handleOpenAddModuleModal = () => {
    setIsEditingModule(false);
    setEditingModuleId(null);
    setModuleForm({ judul_modul: '', deskripsi: '' });
    setModuleThumbnailFile(null);
    setModuleThumbnailPreview('');
    setShowAddModuleModal(true);
  };

  const handleOpenEditModuleModal = (modul) => {
    setIsEditingModule(true);
    setEditingModuleId(modul.modul_id);
    setModuleForm({
      judul_modul: modul.judul_modul || '',
      deskripsi: modul.deskripsi || modul.gambaran_umum || ''
    });
    setModuleThumbnailFile(null);
    setModuleThumbnailPreview(modul.thumbnail_url || '');
    setShowAddModuleModal(true);
  };

  const handleModuleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: 'warning',
        title: 'File Terlalu Besar',
        text: 'Ukuran file thumbnail maksimal 2MB.',
        confirmButtonColor: '#0F766E'
      });
      e.target.value = '';
      return;
    }

    setModuleThumbnailFile(file);
    setModuleThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSaveModule = async (e) => {
    e.preventDefault();
    if (!moduleForm.judul_modul.trim()) return;

    const desc = moduleForm.deskripsi?.trim() || `Gambaran umum modul ${moduleForm.judul_modul}`;
    const data = new FormData();
    data.append('judul_modul', moduleForm.judul_modul);
    data.append('gambaran_umum', desc);
    data.append('deskripsi', desc);
    data.append('evaluasi_deskripsi', 'Evaluasi pemahaman materi modul');
    if (moduleThumbnailFile) {
      data.append('thumbnail', moduleThumbnailFile);
    }

    try {
      if (isEditingModule && editingModuleId) {
        await api.post(`/admin-komunitas/modul/${editingModuleId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Diperbarui',
          text: 'Modul berhasil diperbarui!',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        const res = await api.post(`/admin-komunitas/pembelajaran/${course.pembelajaran_id}/modul`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const newId = res.data?.data?.modul_id;
        if (newId) {
          setOpenModuleIds(prev => ({ ...prev, [newId]: true }));
        }
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Ditambahkan',
          text: 'Modul baru berhasil ditambahkan!',
          timer: 1500,
          showConfirmButton: false
        });
      }
      setShowAddModuleModal(false);
      setModuleForm({ judul_modul: '', deskripsi: '' });
      setModuleThumbnailFile(null);
      setModuleThumbnailPreview('');
      fetchCourseData();
    } catch (error) {
      console.error('Error saving module:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan',
        text: error.response?.data?.message || 'Gagal menyimpan modul.'
      });
    }
  };

  const handleDeleteModule = async (modulId, judulModul) => {
    const result = await Swal.fire({
      title: 'Hapus Modul?',
      text: `Apakah Anda yakin ingin menghapus modul "${judulModul}" beserta seluruh materi dan kuisnya?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/admin-komunitas/modul/${modulId}`);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Dihapus',
        text: 'Modul berhasil dihapus!',
        timer: 1500,
        showConfirmButton: false
      });
      fetchCourseData();
    } catch (error) {
      console.error('Error deleting module:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menghapus',
        text: error.response?.data?.message || 'Gagal menghapus modul.'
      });
    }
  };

  // --- Materi Handlers ---
  const handleOpenAddMaterialModal = (modulId) => {
    setTargetModuleId(modulId);
    setMaterialForm({
      judul_materi: '',
      tipe_materi: 'pdf',
      durasi_menit: 15,
      tautan_atau_berkas_embed: '',
      file_pdf: null
    });
    setShowAddMaterialModal(true);
  };

  const handleCreateMaterial = async (e) => {
    e.preventDefault();
    if (!materialForm.judul_materi.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Judul Diperlukan',
        text: 'Silakan isi judul materi terlebih dahulu.',
        confirmButtonColor: '#0F766E'
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('judul_materi', materialForm.judul_materi);
      formData.append('tipe_materi', materialForm.tipe_materi);
      formData.append('durasi_menit', materialForm.durasi_menit);

      if (materialForm.tipe_materi === 'pdf') {
        if (!materialForm.file_pdf) {
          Swal.fire({
            icon: 'warning',
            title: 'File PDF Belum Dipilih',
            text: 'Silakan pilih file PDF yang ingin diunggah.',
            confirmButtonColor: '#0F766E'
          });
          return;
        }
        formData.append('file_pdf', materialForm.file_pdf);
      } else {
        if (!materialForm.tautan_atau_berkas_embed.trim()) {
          Swal.fire({
            icon: 'warning',
            title: 'Tautan Video Diperlukan',
            text: 'Silakan masukkan tautan video YouTube.',
            confirmButtonColor: '#0F766E'
          });
          return;
        }
        formData.append('tautan_atau_berkas_embed', materialForm.tautan_atau_berkas_embed);
      }

      await api.post(`/admin-komunitas/modul/${targetModuleId}/materi`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      await Swal.fire({
        icon: 'success',
        title: 'Materi Berhasil Diunggah!',
        text: 'Materi pembelajaran baru berhasil ditambahkan ke modul.',
        confirmButtonColor: '#0F766E',
        timer: 2000,
        showConfirmButton: true
      });
      setShowAddMaterialModal(false);
      fetchCourseData();
    } catch (error) {
      console.error('Error creating material:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengunggah Materi',
        text: error.response?.data?.message || 'Terjadi kesalahan saat mengunggah materi.',
        confirmButtonColor: '#0F766E'
      });
    }
  };

  const handleDeleteMaterial = async (materiId, judulMateri) => {
    const result = await Swal.fire({
      title: 'Hapus Materi?',
      text: `Apakah Anda yakin ingin menghapus materi "${judulMateri}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/admin-komunitas/materi/${materiId}`);
      Swal.fire({
        icon: 'success',
        title: 'Materi Berhasil Dihapus',
        text: 'Materi telah dihapus dari modul.',
        timer: 1500,
        showConfirmButton: false
      });
      fetchCourseData();
    } catch (error) {
      console.error('Error deleting material:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menghapus Materi',
        text: error.response?.data?.message || 'Gagal menghapus materi.',
        confirmButtonColor: '#0F766E'
      });
    }
  };

  // --- Helper Kuis ---
  const getModulQuiz = (m) => {
    if (!m) return null;
    if (Array.isArray(m.kuis)) {
      return m.kuis.length > 0 ? m.kuis[0] : null;
    }
    return m.kuis || null;
  };

  // --- Kuis Handlers ---
  const handleOpenQuizModal = (modul) => {
    setTargetQuizModule(modul);
    const existingQuiz = getModulQuiz(modul);
    if (existingQuiz && existingQuiz.kuis_id) {
      setQuizForm({
        judul_kuis: existingQuiz.judul_kuis || `Kuis ${modul.judul_modul}`,
        nilai_kelulusan: existingQuiz.nilai_kelulusan ?? 70,
        maks_percobaan: existingQuiz.maks_percobaan ?? 3,
        soal: (existingQuiz.soal_kuis || []).map(s => {
          let opts = s.pilihan_jawaban_json;
          if (typeof opts === 'string') {
            try { opts = JSON.parse(opts); } catch (e) { opts = {}; }
          }
          return {
            teks_soal: s.teks_soal || '',
            kunci_jawaban: s.kunci_jawaban || 'A',
            pilihan_jawaban_json: opts || {}
          };
        })
      });
    } else {
      setQuizForm({
        judul_kuis: `Kuis ${modul.judul_modul}`,
        nilai_kelulusan: 70,
        maks_percobaan: 3,
        soal: []
      });
    }
    setNewQuizItem({
      teks_soal: '',
      kunci_jawaban: 'A',
      opsiA: '',
      opsiB: '',
      opsiC: '',
      opsiD: ''
    });
    setShowQuizModal(true);
  };

  const handleAddQuestionToQuiz = (e) => {
    e.preventDefault();
    if (!newQuizItem.teks_soal.trim() || !newQuizItem.opsiA.trim() || !newQuizItem.opsiB.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Butir Soal Belum Lengkap',
        text: 'Teks pertanyaan dan minimal pilihan opsi A & B wajib diisi!',
        confirmButtonColor: '#0F766E'
      });
      return;
    }

    const item = {
      teks_soal: newQuizItem.teks_soal,
      kunci_jawaban: newQuizItem.kunci_jawaban,
      pilihan_jawaban_json: {
        A: newQuizItem.opsiA,
        B: newQuizItem.opsiB,
        C: newQuizItem.opsiC || '-',
        D: newQuizItem.opsiD || '-'
      },
      bobot_nilai: 1
    };

    setQuizForm(prev => ({
      ...prev,
      soal: [...prev.soal, item]
    }));

    setNewQuizItem({
      teks_soal: '',
      kunci_jawaban: 'A',
      opsiA: '',
      opsiB: '',
      opsiC: '',
      opsiD: ''
    });
  };

  const handleRemoveQuestionFromQuiz = (index) => {
    setQuizForm(prev => ({
      ...prev,
      soal: prev.soal.filter((_, i) => i !== index)
    }));
  };

  const handleSaveQuiz = async () => {
    if (!targetQuizModule) return;
    if (quizForm.soal.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Kuis Masih Kosong',
        text: 'Kuis harus memiliki minimal 1 butir pertanyaan sebelum disimpan.',
        confirmButtonColor: '#0F766E'
      });
      return;
    }

    try {
      const payload = {
        judul_kuis: quizForm.judul_kuis,
        nilai_kelulusan: quizForm.nilai_kelulusan,
        maks_percobaan: quizForm.maks_percobaan,
        soal: quizForm.soal
      };

      const existingQuiz = getModulQuiz(targetQuizModule);
      if (existingQuiz && existingQuiz.kuis_id) {
        await api.put(`/admin-komunitas/kuis/${existingQuiz.kuis_id}`, payload);
      } else {
        await api.post(`/admin-komunitas/modul/${targetQuizModule.modul_id}/kuis`, payload);
      }

      await Swal.fire({
        icon: 'success',
        title: 'Kuis Berhasil Disimpan!',
        text: 'Kuis evaluasi modul berhasil disimpan dan diperbarui.',
        confirmButtonColor: '#0F766E',
        timer: 2000,
        showConfirmButton: true
      });
      setShowQuizModal(false);
      fetchCourseData();
    } catch (error) {
      console.error('Error saving quiz:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan Kuis',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan kuis.',
        confirmButtonColor: '#0F766E'
      });
    }
  };

  // --- Post Test Config Handlers ---
  const handleSavePostTestConfig = async () => {
    if (!course) return;
    try {
      const passingGrade = course.nilai_kelulusan ?? 70;
      const payload = {
        nilai_kelulusan: passingGrade,
        maks_percobaan: postTest?.maks_percobaan || 3,
        durasi_menit: postTest?.durasi_menit || 45
      };

      if (postTest) {
        await api.put(`/admin-komunitas/post-test/${postTest.post_test_id}`, payload);
      } else {
        await api.post(`/admin-komunitas/pembelajaran/${course.pembelajaran_id}/post-test`, payload);
      }
      await Swal.fire({
        icon: 'success',
        title: 'Konfigurasi Tersimpan!',
        text: 'Pengaturan Post Test berhasil diperbarui.',
        confirmButtonColor: '#0F766E',
        timer: 2000,
        showConfirmButton: true
      });
      fetchCourseData();
    } catch (error) {
      console.error('Error saving post test config:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan Post Test',
        text: error.response?.data?.message || 'Gagal menyimpan konfigurasi post test.',
        confirmButtonColor: '#0F766E'
      });
    }
  };

  // --- Surat Pernyataan Handlers ---
  const handleUploadSuratPernyataan = async () => {
    if (!suratFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Berkas Belum Dipilih',
        text: 'Silakan pilih berkas PDF surat pernyataan terlebih dahulu.',
        confirmButtonColor: '#0F766E'
      });
      return;
    }
    try {
      setIsUploadingSurat(true);
      const formData = new FormData();
      formData.append('surat_pernyataan', suratFile);

      await api.post(`/admin-komunitas/pembelajaran/${course.pembelajaran_id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      await Swal.fire({
        icon: 'success',
        title: 'Surat Berhasil Diunggah!',
        text: 'Surat pernyataan komitmen telah berhasil disimpan.',
        confirmButtonColor: '#0F766E',
        timer: 2000,
        showConfirmButton: true
      });
      setSuratFile(null);
      fetchCourseData();
    } catch (error) {
      console.error('Error uploading surat pernyataan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengunggah Surat',
        text: error.response?.data?.message || 'Gagal mengunggah surat pernyataan.',
        confirmButtonColor: '#0F766E'
      });
    } finally {
      setIsUploadingSurat(false);
    }
  };

  // --- Ajukan Approval ---
  const handleAjukanApproval = async () => {
    if (!course) return;

    if (modules.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Pelatihan Belum Lengkap',
        text: 'Pelatihan belum memiliki modul. Harap tambahkan minimal 1 modul beserta materi dan kuisnya sebelum mengajukan approval.',
        confirmButtonColor: '#0F766E'
      });
      return;
    }

    const totalMateri = modules.reduce((acc, m) => acc + (m.materi?.length || 0), 0);
    if (totalMateri === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Materi Belum Tersedia',
        text: 'Modul pelatihan belum memiliki materi pembelajaran. Harap unggah materi terlebih dahulu sebelum mengajukan approval.',
        confirmButtonColor: '#0F766E'
      });
      return;
    }

    const confirmSubmit = await Swal.fire({
      title: 'Ajukan Approval Publikasi?',
      html: `
        <div class="text-left text-sm text-gray-600 space-y-3 pt-2">
          <p>Kursus <b>"${course.judul_pembelajaran}"</b> akan diajukan ke tim <b>BKPSDM</b> untuk proses review dan persetujuan publikasi.</p>
          <div class="bg-teal-50 border border-teal-200 rounded-lg p-3 text-xs text-teal-800 space-y-1">
            <div class="font-semibold">Kelengkapan Kursus Saat Ini:</div>
            <div>• Jumlah Modul: <b>${modules.length}</b> modul</div>
            <div>• Total Materi: <b>${totalMateri}</b> materi</div>
            <div>• Bank Soal Post Test: <b>${postTest?.soal_post_test?.length || 0}</b> butir soal</div>
          </div>
          <p class="text-xs text-amber-700 bg-amber-50 p-2.5 rounded border border-amber-200">
            ⚠️ Pastikan seluruh konten pelatihan sudah final dan sesuai standar kompetensi.
          </p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0F766E',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, Ajukan Sekarang',
      cancelButtonText: 'Batal',
      reverseButtons: true
    });

    if (!confirmSubmit.isConfirmed) return;

    try {
      // Pastikan informasi dasar dan thumbnail terbaru tersimpan sebelum diajukan
      if (courseThumbnailFile) {
        const formData = new FormData();
        formData.append('judul_pembelajaran', course.judul_pembelajaran);
        formData.append('deskripsi', course.deskripsi || '-');
        formData.append('kategori', course.kategori || 'Pengembangan Kompetensi');
        formData.append('capaian_pembelajaran', course.capaian_pembelajaran || '-');
        formData.append('nilai_kelulusan', course.nilai_kelulusan ?? 70);
        formData.append('komunitas_id', course.komunitas_id);
        formData.append('thumbnail', courseThumbnailFile);
        await api.post(`/admin-komunitas/pembelajaran/${course.pembelajaran_id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setCourseThumbnailFile(null);
      } else {
        await api.put(`/admin-komunitas/pembelajaran/${course.pembelajaran_id}`, {
          judul_pembelajaran: course.judul_pembelajaran,
          deskripsi: course.deskripsi,
          kategori: course.kategori || 'Pengembangan Kompetensi',
          capaian_pembelajaran: course.capaian_pembelajaran || '-',
          nilai_kelulusan: course.nilai_kelulusan,
          komunitas_id: course.komunitas_id
        });
      }

      if (suratFile) {
        const formData = new FormData();
        formData.append('ringkasan_materi', course.deskripsi || 'Ringkasan materi kursus');
        formData.append('surat_pernyataan', suratFile);
        await api.post(`/admin-komunitas/pembelajaran/${course.pembelajaran_id}/ajukan-approval`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuratFile(null);
      } else {
        const payload = {
          ringkasan_materi: course.deskripsi || 'Ringkasan materi kursus'
        };
        await api.post(`/admin-komunitas/pembelajaran/${course.pembelajaran_id}/ajukan-approval`, payload);
      }

      await Swal.fire({
        icon: 'success',
        title: 'Pengajuan Approval Berhasil!',
        html: 'Pengajuan approval kursus berhasil dikirimkan ke <b>Admin BKPSDM</b>.<br/><span class="text-sm text-gray-500">Status pelatihan kini sedang dalam peninjauan verifikator.</span>',
        confirmButtonColor: '#0F766E'
      });
      fetchCourseData();
    } catch (error) {
      console.error('Error submitting for approval:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengajukan Approval',
        text: error.response?.data?.message || 'Terjadi kesalahan saat mengajukan approval.',
        confirmButtonColor: '#0F766E'
      });
    }
  };

  if (loading) return <AdminKomunitasSkeleton />;
  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-36 sm:pb-24">
      <AdminSidebar
        activeMenu="katalog-kursus"
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div>
                <button
                  onClick={() => onNavigate('pelatihan-saya')}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0F766E] mb-3 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Manajemen Pelatihan
                </button>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {course.judul_pembelajaran || 'Kursus Baru'}
                  </h1>
                  {course.status && (
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase ${course.status === 'dipublikasikan'
                        ? 'bg-green-100 text-green-700'
                        : course.status === 'menunggu_approval'
                          ? 'bg-amber-100 text-amber-700'
                          : course.status === 'ditolak'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}>
                      {course.status.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeleteCourse}
                  className="flex items-center gap-1.5 px-3.5 py-2 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  <Trash2 className="w-4 h-4" /> Hapus Pelatihan
                </button>
              </div>
            </div>

            {/* Published Alert Banner */}
            {course.status === 'dipublikasikan' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-amber-900 mb-1">Pelatihan Sedang Aktif Dipublikasikan</h3>
                  <p className="text-xs text-amber-800 leading-relaxed mb-2">
                    Pelatihan ini saat ini berstatus aktif di katalog umum. Jika Anda melakukan perubahan (edit informasi dasar, modul, materi, kuis, atau post-test), status pelatihan akan <b>otomatis kembali menjadi Draft</b> dan ditarik dari katalog publik sampai diajukan dan disetujui kembali oleh Admin BKPSDM.
                  </p>
                  <p className="text-[11px] text-amber-700 font-medium">
                    💡 Anda juga dapat menghapus pelatihan ini secara permanen jika sudah tidak dibutuhkan lagi.
                  </p>
                </div>
              </div>
            )}

            {/* Rejection Alert Banner */}
            {course.status === 'ditolak' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-red-900">Pengajuan Pembelajaran Ditolak oleh BKPSDM</h3>
                    {course.validasi?.pemvalidasi?.nama_lengkap && (
                      <span className="text-[11px] text-red-700 bg-red-100/70 px-2 py-0.5 rounded">
                        Diverifikasi oleh: {course.validasi.pemvalidasi.nama_lengkap}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-red-700 mb-2.5 leading-relaxed bg-white/70 p-3 rounded-lg border border-red-100">
                    <span className="font-semibold block text-red-800 mb-0.5">Catatan Perbaikan:</span>
                    {course.validasi?.catatan
                      ? course.validasi.catatan
                      : 'Pembelajaran ini memerlukan perbaikan sebelum dapat dipublikasikan. Silakan lengkapi modul, materi, atau evaluasi sesuai arahan verifikator.'}
                  </p>
                  <p className="text-[11px] text-red-600 font-medium flex items-center gap-1.5">
                    <span>💡 <b>Petunjuk:</b> Lakukan perbaikan konten pada halaman ini, lalu klik tombol <b>"Simpan Draft"</b> untuk mengembalikan status kursus ke <b>Draft</b> sebelum diajukan approval kembali.</span>
                  </p>
                </div>
              </div>
            )}

            {/* Section 1: Informasi Dasar Kursus */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Informasi Dasar Kursus</h2>
                <span className="text-xs text-gray-500 font-medium">ID Pembelajaran: #{course.pembelajaran_id}</span>
              </div>
              <div className="p-6 space-y-6">
                {/* Thumbnail / Cover Kursus */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thumbnail / Cover Kursus <span className="text-gray-400 text-xs font-normal">(Maks. 2MB)</span>
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-full sm:w-56 h-32 rounded-lg border border-gray-200 overflow-hidden bg-gray-100 shrink-0 relative shadow-2xs">
                      <img
                        src={courseThumbnailPreview || course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'}
                        alt={course.judul_pembelajaran}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer px-3.5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-2">
                          <Upload className="w-3.5 h-3.5 text-gray-500" />
                          <span>{courseThumbnailFile ? 'Ganti File Dipilih' : 'Pilih File Thumbnail'}</span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            onChange={handleCourseThumbnailChange}
                            className="hidden"
                          />
                        </label>
                        {courseThumbnailFile && (
                          <button
                            type="button"
                            onClick={handleRemoveCourseThumbnail}
                            className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                          >
                            Batal Pilih
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        Format yang didukung: JPG, JPEG, PNG, WEBP. Maksimal 2MB. Gambar ini tampil di kartu kursus katalog dan dasbor peserta.
                      </p>
                      {courseThumbnailFile && (
                        <p className="text-xs text-teal-700 font-medium">
                          File baru terpilih: <strong>{courseThumbnailFile.name}</strong> (klik <em>Simpan Perubahan</em> di bawah untuk menerapkan)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Kursus</label>
                  <input
                    type="text"
                    value={course.judul_pembelajaran || ''}
                    onChange={(e) => setCourse({ ...course, judul_pembelajaran: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                    <div className="relative">
                      <select
                        value={course.kategori || 'Pengembangan Kompetensi'}
                        onChange={(e) => setCourse({ ...course, kategori: e.target.value })}
                        className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10"
                      >
                        <option value="Pengembangan Kompetensi">Pengembangan Kompetensi</option>
                        <option value="Manajemen ASN">Manajemen ASN</option>
                        <option value="Teknologi Informasi">Teknologi Informasi</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Target Capaian Pembelajaran</label>
                    <input
                      type="text"
                      value={course.capaian_pembelajaran || ''}
                      onChange={(e) => setCourse({ ...course, capaian_pembelajaran: e.target.value })}
                      placeholder="Contoh: Menguasai prinsip integritas birokrasi"
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Kursus</label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                    value={course.deskripsi || ''}
                    onChange={(e) => setCourse({ ...course, deskripsi: e.target.value })}
                    placeholder="Tuliskan deskripsi lengkap mengenai tujuan dan target pelatihan ini..."
                  ></textarea>
                </div>

                {/* Tombol Simpan Cepat untuk Informasi Dasar & Thumbnail */}
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="button"
                    onClick={handleUpdateBasicInfo}
                    disabled={savingBasicInfo}
                    className="px-5 py-2.5 bg-[#0F766E] hover:bg-teal-800 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    {savingBasicInfo ? 'Menyimpan...' : 'Simpan Informasi Dasar & Thumbnail'}
                  </button>
                </div>
              </div>
            </section>

            {/* Section 2: Modul & Materi */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Modul & Materi Pembelajaran</h2>
                  <p className="text-xs text-gray-500">Kelola bab, dokumen bacaan PDF, dan video pendukung.</p>
                </div>
                <button
                  onClick={handleOpenAddModuleModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-[#0F766E]/30 text-[#0F766E] text-sm font-semibold rounded-lg hover:bg-teal-100 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Tambah Modul
                </button>
              </div>

              <div className="p-6 space-y-4">
                {modules.length === 0 ? (
                  <div className="py-10 text-center border-2 border-dashed border-gray-200 rounded-xl">
                    <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-700">Belum ada modul pada kursus ini</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">Mulai dengan menambahkan modul pembelajaran pertama.</p>
                    <button
                      onClick={handleOpenAddModuleModal}
                      className="px-4 py-2 bg-[#0F766E] text-white rounded-lg text-xs font-semibold hover:bg-teal-800"
                    >
                      Tambah Modul Sekarang
                    </button>
                  </div>
                ) : (
                  modules.map((modul, idx) => {
                    const isOpen = !!openModuleIds[modul.modul_id];
                    const materiList = modul.materi || [];

                    return (
                      <div key={modul.modul_id} className="border border-gray-200 rounded-xl overflow-hidden transition-all shadow-xs">
                        {/* Accordion Header */}
                        <div
                          className={`flex items-center justify-between px-4 py-3.5 cursor-pointer transition-colors ${isOpen ? 'bg-teal-50/60 border-b border-teal-100' : 'bg-white hover:bg-gray-50'
                            }`}
                        >
                          <div
                            className="flex items-center gap-3 text-sm font-bold text-gray-900 flex-1 min-w-0"
                            onClick={() => toggleModuleOpen(modul.modul_id)}
                          >
                            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs flex items-center justify-center font-bold shrink-0">
                              {idx + 1}
                            </span>
                            {modul.thumbnail_url && (
                              <img 
                                src={modul.thumbnail_url} 
                                alt={modul.judul_modul} 
                                className="w-8 h-8 rounded-md object-cover border border-gray-200 shrink-0" 
                              />
                            )}
                            <span className="truncate">{modul.judul_modul}</span>
                            <span className="text-xs font-normal text-gray-500 hidden sm:inline">
                              ({materiList.length} Materi • {modul.durasi_total_menit || 0} Menit)
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleOpenAddMaterialModal(modul.modul_id)}
                              title="Tambah Materi"
                              className="px-2.5 py-1 bg-white border border-gray-200 text-teal-700 hover:bg-teal-50 rounded text-xs font-semibold flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Materi</span>
                            </button>
                            <button
                              onClick={() => handleOpenEditModuleModal(modul)}
                              title="Edit Modul"
                              className="p-1 text-gray-400 hover:text-teal-600 rounded hover:bg-teal-50 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteModule(modul.modul_id, modul.judul_modul)}
                              title="Hapus Modul"
                              className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleModuleOpen(modul.modul_id)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Accordion Body */}
                        {isOpen && (
                          <div className="p-4 sm:p-5 bg-white space-y-4">
                            {(modul.deskripsi || modul.gambaran_umum || modul.thumbnail_url) && (
                              <div className="text-xs text-gray-700 bg-gray-50/80 p-3 rounded-lg border border-gray-100 flex items-start gap-3">
                                {modul.thumbnail_url && (
                                  <img 
                                    src={modul.thumbnail_url} 
                                    alt={modul.judul_modul} 
                                    className="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0" 
                                  />
                                )}
                                <div className="flex-1">
                                  <span className="font-semibold text-gray-900 block mb-0.5">Deskripsi Modul:</span>
                                  <span className="leading-relaxed text-gray-600">{modul.deskripsi || modul.gambaran_umum || '-'}</span>
                                </div>
                              </div>
                            )}

                            {/* Materi List */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Daftar Materi:</h4>
                                <span className="text-[11px] text-gray-400">Total: {materiList.length} berkas</span>
                              </div>

                              {materiList.length === 0 ? (
                                <div className="p-4 text-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                                  <p className="text-xs text-gray-500 mb-2">Belum ada berkas materi di modul ini.</p>
                                  <button
                                    onClick={() => handleOpenAddMaterialModal(modul.modul_id)}
                                    className="text-xs font-semibold text-teal-700 hover:underline inline-flex items-center gap-1"
                                  >
                                    <Plus className="w-3.5 h-3.5" /> Tambah materi sekarang
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {materiList.map((mat) => (
                                    <div key={mat.materi_id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50/70 hover:bg-gray-50 transition-colors">
                                      <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${mat.tipe_materi === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                          }`}>
                                          {mat.tipe_materi === 'pdf' ? <FileText className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-sm font-semibold text-gray-900 truncate">{mat.judul_materi}</p>
                                          <p className="text-xs text-gray-500">
                                            {mat.tipe_materi === 'pdf' ? 'Dokumen PDF' : 'Video Pembelajaran'} • {mat.durasi_menit} Menit
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 shrink-0 ml-3">
                                        <a
                                          href={mat.tautan_atau_berkas.startsWith('http') ? mat.tautan_atau_berkas : `http://localhost:8000${mat.tautan_atau_berkas}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-50 rounded transition-colors"
                                        >
                                          <Eye className="w-3.5 h-3.5" /> Buka
                                        </a>
                                        <button
                                          onClick={() => handleDeleteMaterial(mat.materi_id, mat.judul_materi)}
                                          className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                                          title="Hapus Materi"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* Section 3: Evaluasi & Post Test */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-bold text-gray-900">Evaluasi Pembelajaran (Kuis & Post Test)</h2>
              </div>
              <div className="p-6 space-y-8">

                {/* Kuis per Modul */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Kuis Evaluasi per Modul</h3>
                  <p className="text-xs text-gray-500 mb-4">Setiap modul wajib memiliki minimal 1 kuis pemahaman sebelum kursus diajukan approval.</p>

                  <div className="space-y-3">
                    {modules.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">Tambahkan modul terlebih dahulu untuk menyusun kuis.</p>
                    ) : (
                      modules.map((m) => {
                        const quiz = getModulQuiz(m);
                        const hasQuiz = Boolean(quiz && quiz.kuis_id);
                        const questionCount = quiz?.soal_kuis?.length || 0;

                        return (
                          <div
                            key={m.modul_id}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-xl transition-colors ${hasQuiz ? 'border-gray-200 bg-gray-50/50' : 'border-dashed border-amber-200 bg-amber-50/30'
                              }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-gray-900">{m.judul_modul}</p>
                                {hasQuiz ? (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Kuis Aktif</span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">Belum Ada Kuis</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {hasQuiz
                                  ? `${questionCount} Butir Soal • Batas Lulus ${quiz?.nilai_kelulusan ?? 70}% • Maks. ${quiz?.maks_percobaan ?? 3}x Coba`
                                  : 'Modul ini belum memiliki evaluasi kuis'}
                              </p>
                            </div>

                            <button
                              onClick={() => handleOpenQuizModal(m)}
                              className={`flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-colors w-full sm:w-auto ${hasQuiz
                                  ? 'bg-white border border-gray-200 text-teal-700 hover:bg-gray-50'
                                  : 'bg-[#0F766E] text-white hover:bg-teal-800'
                                }`}
                            >
                              {hasQuiz ? <><Edit2 className="w-3.5 h-3.5" /> Edit Kuis</> : <><Plus className="w-3.5 h-3.5" /> Buat Kuis</>}
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* Konfigurasi Post Test */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Konfigurasi Post Test Akhir</h3>
                      <p className="text-xs text-gray-500">Evaluasi kelulusan komprehensif setelah seluruh modul diselesaikan.</p>
                    </div>
                    <button
                      onClick={handleSavePostTestConfig}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-teal-700 hover:bg-teal-50 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Simpan Konfigurasi
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nilai Kelulusan (Passing Grade)</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0" max="100"
                          value={course.nilai_kelulusan ?? 70}
                          onChange={(e) => setCourse({ ...course, nilai_kelulusan: Number(e.target.value) })}
                          className="w-full pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Batas Maksimal Percobaan</label>
                      <div className="relative">
                        <select
                          value={postTest?.maks_percobaan || 3}
                          onChange={(e) => setPostTest(prev => prev ? { ...prev, maks_percobaan: Number(e.target.value) } : { maks_percobaan: Number(e.target.value) })}
                          className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10"
                        >
                          <option value="3">3 Kali Kesempatan</option>
                          <option value="1">1 Kali Kesempatan</option>
                          <option value="2">2 Kali Kesempatan</option>
                          <option value="5">5 Kali Kesempatan</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* Bank Soal Link Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-teal-50/50 rounded-xl border border-teal-100">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Bank Soal Post Test</h3>
                    <p className="text-xs text-gray-600">
                      Total <span className="font-bold text-teal-800">{postTest?.soal_post_test?.length || 0} Pertanyaan</span> telah dikonfigurasi pada Bank Soal kursus ini.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.setItem('adminKomunitasCourseId', course.pembelajaran_id);
                      if (onNavigate) onNavigate('bank-soal');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#0F766E] hover:bg-teal-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm text-center"
                  >
                    Kelola Bank Soal
                  </button>
                </div>
              </div>
            </section>

            {/* Section 4: Surat Pernyataan Keabsahan */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  Surat Pernyataan Keabsahan Konten
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold rounded">Opsional</span>
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-900 mb-1">Perhatian Regulasi Penerbitan Kursus ASN</h4>
                    <p className="text-xs text-blue-800 leading-relaxed">Admin Komunitas dapat melampirkan Surat Pernyataan Keabsahan Konten yang telah ditandatangani oleh Kepala Dinas/OPD terkait sebelum diajukan ke BKPSDM Kabupaten Buleleng.</p>
                  </div>
                </div>

                {/* Upload or View */}
                {course.surat_pernyataan_url ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-green-200 bg-green-50/50 rounded-xl gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
                        PDF
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-gray-900 truncate">Surat_Pernyataan_Keabsahan_Terupload.pdf</p>
                        <p className="text-xs text-green-700 font-semibold mt-0.5">Berkas telah tersimpan di server</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <a
                        href={course.surat_pernyataan_url.startsWith('http') ? course.surat_pernyataan_url : `http://localhost:8000${course.surat_pernyataan_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 px-3 py-1.5 rounded-md bg-white border border-teal-200"
                      >
                        <Eye className="w-3.5 h-3.5" /> Buka Dokumen
                      </a>
                    </div>
                  </div>
                ) : null}

                {/* File Upload Box */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {course.surat_pernyataan_url ? 'Ganti Surat Pernyataan (PDF)' : 'Unggah Berkas Surat Pernyataan (PDF)'}
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50/60 flex flex-col items-center justify-center text-center">
                    <Upload className="w-8 h-8 text-teal-600 mb-2" />
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setSuratFile(e.target.files[0] || null)}
                      className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                    <p className="text-xs text-gray-400 mt-2">Maksimal ukuran file 5MB (Format .pdf)</p>
                    {suratFile && (
                      <div className="mt-3">
                        <button
                          onClick={handleUploadSuratPernyataan}
                          disabled={isUploadingSurat}
                          className="px-4 py-1.5 bg-[#0F766E] text-white rounded-lg text-xs font-semibold hover:bg-teal-800 disabled:opacity-50"
                        >
                          {isUploadingSurat ? 'Mengunggah...' : 'Upload Berkas Sekarang'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-gray-200 p-4 px-6 z-20 flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleDeleteCourse}
          className="w-full sm:w-auto px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" /> Hapus Pelatihan
        </button>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button onClick={handleUpdateBasicInfo} disabled={savingBasicInfo} className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50">
            {savingBasicInfo ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          <button onClick={handleAjukanApproval} className="w-full sm:w-auto px-6 py-2.5 bg-[#0F766E] hover:bg-teal-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
            Ajukan Approval Publikasi ke BKPSDM
          </button>
        </div>
      </div>

      {/* MODAL: Tambah & Edit Modul */}
      {showAddModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base">
                {isEditingModule ? 'Edit Modul Pembelajaran' : 'Tambah Modul Pembelajaran'}
              </h3>
              <button onClick={() => setShowAddModuleModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveModule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Thumbnail / Gambar Modul</label>
                <div className="flex items-center gap-3.5">
                  {moduleThumbnailPreview ? (
                    <div className="relative w-16 h-16 rounded-lg border border-gray-200 overflow-hidden shrink-0 group">
                      <img src={moduleThumbnailPreview} alt="Thumbnail Modul" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => { setModuleThumbnailFile(null); setModuleThumbnailPreview(''); }}
                        className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] font-bold cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 shrink-0 bg-gray-50">
                      <ImageIcon className="w-5 h-5 mb-0.5 text-gray-400" />
                      <span className="text-[9px]">No Image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="module-thumbnail-upload"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleModuleThumbnailChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="module-thumbnail-upload"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" /> {moduleThumbnailPreview ? 'Ganti Gambar' : 'Pilih Gambar'}
                    </label>
                    <p className="text-[11px] text-gray-400 mt-1">Format: JPG, PNG, WEBP. Maksimal 2MB.</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Judul Modul</label>
                <input
                  type="text"
                  required
                  value={moduleForm.judul_modul || ''}
                  onChange={(e) => setModuleForm({ ...moduleForm, judul_modul: e.target.value })}
                  placeholder="Contoh: Modul 1: Konsep Dasar Integritas"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Deskripsi / Gambaran Umum Modul</label>
                <textarea
                  rows="3"
                  value={moduleForm.deskripsi || ''}
                  onChange={(e) => setModuleForm({ ...moduleForm, deskripsi: e.target.value })}
                  placeholder="Tuliskan deskripsi atau gambaran umum mengenai materi pada modul ini..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModuleModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F766E] text-white rounded-lg text-xs font-semibold hover:bg-teal-800"
                >
                  {isEditingModule ? 'Simpan Perubahan' : 'Simpan Modul'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Tambah Materi */}
      {showAddMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base">Tambah Materi Pembelajaran</h3>
              <button onClick={() => setShowAddMaterialModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Judul Materi</label>
                <input
                  type="text"
                  required
                  value={materialForm.judul_materi || ''}
                  onChange={(e) => setMaterialForm({ ...materialForm, judul_materi: e.target.value })}
                  placeholder="Contoh: Modul Bacaan Bab 1 (PDF)"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Tipe Materi</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMaterialForm({ ...materialForm, tipe_materi: 'pdf' })}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${materialForm.tipe_materi === 'pdf'
                        ? 'bg-teal-50 border-[#0F766E] text-[#0F766E]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    Dokumen PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaterialForm({ ...materialForm, tipe_materi: 'video_embed' })}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${materialForm.tipe_materi === 'video_embed'
                        ? 'bg-teal-50 border-[#0F766E] text-[#0F766E]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    Video YouTube (Embed)
                  </button>
                </div>
              </div>

              {materialForm.tipe_materi === 'pdf' ? (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Unggah Berkas PDF (Maks. 10MB)</label>
                  <input
                    type="file"
                    required
                    accept="application/pdf"
                    onChange={(e) => setMaterialForm({ ...materialForm, file_pdf: e.target.files[0] || null })}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">URL Video YouTube</label>
                  <input
                    type="url"
                    required
                    value={materialForm.tautan_atau_berkas_embed || ''}
                    onChange={(e) => setMaterialForm({ ...materialForm, tautan_atau_berkas_embed: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Estimasi Durasi Belajar (Menit)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={materialForm.durasi_menit ?? 15}
                  onChange={(e) => setMaterialForm({ ...materialForm, durasi_menit: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMaterialModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F766E] text-white rounded-lg text-xs font-semibold hover:bg-teal-800"
                >
                  Unggah Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Kelola Kuis Modul */}
      {showQuizModal && targetQuizModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Kelola Kuis: {targetQuizModule.judul_modul}</h3>
                <p className="text-xs text-gray-500">Konfigurasi soal evaluasi pemahaman untuk modul ini.</p>
              </div>
              <button onClick={() => setShowQuizModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quiz General Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Kuis</label>
                <input
                  type="text"
                  value={quizForm.judul_kuis || ''}
                  onChange={(e) => setQuizForm({ ...quizForm, judul_kuis: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Passing Grade (%)</label>
                <input
                  type="number"
                  min="0" max="100"
                  value={quizForm.nilai_kelulusan ?? 70}
                  onChange={(e) => setQuizForm({ ...quizForm, nilai_kelulusan: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Maks. Percobaan</label>
                <input
                  type="number"
                  min="1"
                  value={quizForm.maks_percobaan ?? 3}
                  onChange={(e) => setQuizForm({ ...quizForm, maks_percobaan: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-xs"
                />
              </div>
            </div>

            {/* Questions List */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Daftar Butir Pertanyaan ({quizForm.soal.length})
              </h4>
              {quizForm.soal.length === 0 ? (
                <p className="text-xs text-gray-400 italic py-3">Belum ada pertanyaan pada kuis ini. Tambahkan pertanyaan di bawah.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {quizForm.soal.map((q, idx) => (
                    <div key={idx} className="p-3 border border-gray-100 rounded-lg bg-gray-50/70 flex justify-between items-start gap-2">
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-gray-900">{idx + 1}. {q.teks_soal}</p>
                        <p className="text-teal-700 font-semibold">Kunci Jawaban: {q.kunci_jawaban}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveQuestionFromQuiz(idx)}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Question Form */}
            <form onSubmit={handleAddQuestionToQuiz} className="border border-teal-100 bg-teal-50/30 p-4 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider">Tambah Pertanyaan Baru</h4>
              <div>
                <input
                  type="text"
                  placeholder="Tuliskan butir soal pertanyaan..."
                  value={newQuizItem.teks_soal || ''}
                  onChange={(e) => setNewQuizItem({ ...newQuizItem, teks_soal: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['A', 'B', 'C', 'D'].map((optKey) => (
                  <div key={optKey} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-600 w-4">{optKey}.</span>
                    <input
                      type="text"
                      placeholder={`Pilihan ${optKey}`}
                      value={newQuizItem[`opsi${optKey}`] || ''}
                      onChange={(e) => setNewQuizItem({ ...newQuizItem, [`opsi${optKey}`]: e.target.value })}
                      className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded text-xs"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-700">Kunci Jawaban Benar:</span>
                  <select
                    value={newQuizItem.kunci_jawaban || 'A'}
                    onChange={(e) => setNewQuizItem({ ...newQuizItem, kunci_jawaban: e.target.value })}
                    className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-bold text-teal-700"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#0F766E] text-white rounded-lg text-xs font-semibold hover:bg-teal-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Soal
                </button>
              </div>
            </form>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowQuizModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveQuiz}
                className="px-6 py-2 bg-[#0F766E] text-white rounded-lg text-xs font-semibold hover:bg-teal-800 shadow-sm"
              >
                Simpan Seluruh Kuis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailKursus;
