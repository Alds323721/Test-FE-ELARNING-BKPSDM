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

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const savedRoute = localStorage.getItem('current_route');
    const hasToken = localStorage.getItem('access_token');
    if (savedRoute && savedRoute !== 'landing') {
      return savedRoute;
    }
    if (hasToken) {
      return 'dashboard';
    }
    return 'landing';
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showLoginSuccess, setShowLoginSuccess] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (route) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentRoute(route)
      if (route === 'landing') {
        localStorage.removeItem('current_route');
      } else {
        localStorage.setItem('current_route', route);
      }
      setIsTransitioning(false)
      window.scrollTo(0, 0)
    }, 500)
  }

  if (isLoading || isTransitioning) {
    return <LoadingSkeleton />
  }

  const renderRoute = () => {
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
      handleNavigate(route);
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
