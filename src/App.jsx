import { useState, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import './index.css'
import LandingPage from './pages/LandingPage'
import UserDashboard from './pages/UserDashboard'
import CourseCatalog from './pages/CourseCatalog'
import MyCourses from './pages/MyCourses'
import Community from './pages/Community'
import CourseDetail from './pages/CourseDetail'
import PostTest from './pages/PostTest'
import TestResult from './pages/TestResult'
import HelpCenter from './pages/HelpCenter'
import Certificates from './pages/Certificates'
import LoadingSkeleton from './components/LoadingSkeleton'
import AdminLoadingSkeleton from './components/AdminLoadingSkeleton'
import AdminDashboard from './Admin-BKPSDM/AdminDashboard'
import UserManagement from './Admin-BKPSDM/UserManagement'
import CommunityManagement from './Admin-BKPSDM/CommunityManagement'
import CourseValidation from './Admin-BKPSDM/CourseValidation'
import CourseReview from './Admin-BKPSDM/CourseReview'
import MonitoringReports from './Admin-BKPSDM/MonitoringReports'
import AdminKomunitasDashboard from './Admin-Komunitas/AdminKomunitasDashboard'
import AdminKomunitasSkeleton from './Admin-Komunitas/AdminKomunitasSkeleton'
import PelatihanSaya from './Admin-Komunitas/PelatihanSaya'
import LaporanProgress from './Admin-Komunitas/LaporanProgress'
import KatalogKursus from './Admin-Komunitas/KatalogKursus'
import DetailKursus from './Admin-Komunitas/DetailKursus'
import BankSoal from './Admin-Komunitas/BankSoal'
import PusatBantuan from './Admin-Komunitas/PusatBantuan'

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname;
    
    const hasToken = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');
    let userRole = null;
    try {
      if (userStr) userRole = JSON.parse(userStr).peran;
    } catch(e) {}

    // Enforce admin routes only on /admin path and role admin_bkpsdm
    if (path.startsWith('/admin')) {
      if (path === '/admin-komunitas') return 'admin-komunitas';
      if (!hasToken || userRole !== 'admin_bkpsdm') {
        window.history.replaceState({}, '', '/');
        return hasToken ? 'dashboard' : 'landing';
      }
      if (path === '/admin/user-management') return 'user-management';
      if (path === '/admin/community-management') return 'community-management';
      if (path === '/admin/course-validation/review') return 'course-review';
      if (path === '/admin/course-validation') return 'course-validation';
      if (path === '/admin/monitoring-reports') return 'monitoring-reports';
      return 'admin';
    }

    const savedRoute = localStorage.getItem('current_route');
    
    // Only restore non-admin routes from localStorage if not an admin path
    if (savedRoute && !savedRoute.startsWith('admin') && savedRoute !== 'landing' && savedRoute !== 'user-management' && savedRoute !== 'community-management' && savedRoute !== 'course-validation' && savedRoute !== 'course-review' && savedRoute !== 'monitoring-reports') {
      return savedRoute;
    }
    
    if (hasToken) {
      return userRole === 'admin_bkpsdm' ? 'admin' : 'dashboard';
    }
    return 'landing';
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showLoginSuccess, setShowLoginSuccess] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (route) => {
    setIsTransitioning(true)
    setCurrentRoute(route)
    if (route === 'landing') {
      localStorage.removeItem('current_route');
      window.history.pushState({}, '', '/');
    } else {
      localStorage.setItem('current_route', route);
      if (route === 'admin') {
        window.history.pushState({}, '', '/admin');
      } else if (route === 'user-management') {
        window.history.pushState({}, '', '/admin/user-management');
      } else if (route === 'community-management') {
        window.history.pushState({}, '', '/admin/community-management');
      } else if (route === 'course-validation') {
        window.history.pushState({}, '', '/admin/course-validation');
      } else if (route === 'course-review') {
        window.history.pushState({}, '', '/admin/course-validation/review');
      } else if (route === 'monitoring-reports') {
        window.history.pushState({}, '', '/admin/monitoring-reports');
      } else if (route === 'admin-komunitas') {
        window.history.pushState({}, '', '/admin-komunitas');
      }
    }
    setIsTransitioning(false)
    window.scrollTo(0, 0)
  }

  if (isLoading || isTransitioning) {
    if (currentRoute === 'admin-komunitas' || currentRoute === 'pelatihan-saya' || currentRoute === 'laporan-progress' || currentRoute === 'katalog-kursus' || currentRoute === 'detail-kursus' || currentRoute === 'bank-soal' || currentRoute === 'pusat-bantuan') {
      return <AdminKomunitasSkeleton />
    }
    if (currentRoute === 'admin' || currentRoute === 'user-management' || currentRoute === 'community-management' || currentRoute === 'course-validation' || currentRoute === 'course-review' || currentRoute === 'monitoring-reports') {
      return <AdminLoadingSkeleton />
    }
    return <LoadingSkeleton />
  }

  const renderRoute = () => {
    if (currentRoute === 'admin-komunitas') {
      return <AdminKomunitasDashboard onNavigate={handleNavigate} />
    }

    if (currentRoute === 'pelatihan-saya') {
      return <PelatihanSaya onNavigate={handleNavigate} />
    }

    if (currentRoute === 'laporan-progress') {
      return <LaporanProgress onNavigate={handleNavigate} />
    }

    if (currentRoute === 'katalog-kursus') {
      return <KatalogKursus onNavigate={handleNavigate} />
    }

    if (currentRoute === 'detail-kursus') {
      return <DetailKursus onNavigate={handleNavigate} />
    }

    if (currentRoute === 'bank-soal') {
      return <BankSoal onNavigate={handleNavigate} />
    }

    if (currentRoute === 'pusat-bantuan') {
      return <PusatBantuan onNavigate={handleNavigate} />
    }

    if (currentRoute === 'admin') {
      return <AdminDashboard onNavigate={handleNavigate} />
    }

    if (currentRoute === 'user-management') {
      return <UserManagement onNavigate={handleNavigate} />
    }

    if (currentRoute === 'community-management') {
      return <CommunityManagement onNavigate={handleNavigate} />
    }

    if (currentRoute === 'course-validation') {
      return <CourseValidation onNavigate={handleNavigate} />
    }

    if (currentRoute === 'course-review') {
      return <CourseReview onNavigate={handleNavigate} />
    }

    if (currentRoute === 'monitoring-reports') {
      return <MonitoringReports onNavigate={handleNavigate} />
    }

    if (currentRoute === 'dashboard') {
      return <UserDashboard onLogout={() => handleNavigate('landing')} onNavigate={handleNavigate} />
    }
    
    if (currentRoute === 'catalog') {
      return <CourseCatalog onNavigate={handleNavigate} />
    }

    if (currentRoute === 'my-courses') {
      return <MyCourses onNavigate={handleNavigate} />
    }

    if (currentRoute === 'certificates') {
      return <Certificates onNavigate={handleNavigate} />
    }

    if (currentRoute === 'community') {
      return <Community onNavigate={handleNavigate} />
    }

    if (currentRoute === 'course-detail') {
      return <CourseDetail onNavigate={handleNavigate} onBack={() => handleNavigate('my-courses')} fromPage="dashboard" />
    }

    if (currentRoute === 'post-test') {
      return <PostTest onNavigate={handleNavigate} onBack={() => handleNavigate('course-detail')} />
    }

    if (currentRoute === 'test-result') {
      return <TestResult onNavigate={handleNavigate} />
    }

    if (currentRoute === 'help-center') {
      return <HelpCenter onNavigate={handleNavigate} />
    }

    return <LandingPage onLogin={(route = 'dashboard') => {
      setShowLoginSuccess(true);
      setTimeout(() => setShowLoginSuccess(false), 3000);
      
      const userStr = localStorage.getItem('user');
      let userRole = null;
      try {
        if (userStr) userRole = JSON.parse(userStr).peran;
      } catch(e) {}
      
      if (userRole === 'admin_bkpsdm') {
        handleNavigate('admin');
      } else {
        handleNavigate(route);
      }
    }} onNavigate={handleNavigate} />
  }

  return (
    <>
      {showLoginSuccess && (
        <div className="fixed top-6 right-6 z-[99999] bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-xl flex items-start gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="text-green-800 font-bold text-sm">Login Berhasil</h4>
            <p className="text-green-600 text-xs mt-1 font-semibold">Selamat datang kembali di platform!</p>
          </div>
        </div>
      )}
      {renderRoute()}
    </>
  )
}

export default App
