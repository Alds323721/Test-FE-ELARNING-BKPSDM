import { useState, useEffect } from 'react'
import './index.css'
import LandingPage from './components/LandingPage'
import UserDashboard from './components/UserDashboard'
import CourseCatalog from './components/CourseCatalog'
import MyCourses from './components/MyCourses'
import Community from './components/Community'
import CourseDetail from './components/CourseDetail'
import PostTest from './components/PostTest'
import TestResult from './components/TestResult'
import HelpCenter from './components/HelpCenter'
import Certificates from './components/Certificates'
import LoadingSkeleton from './components/LoadingSkeleton'

function App() {
  const [currentRoute, setCurrentRoute] = useState('landing')
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

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
      setIsTransitioning(false)
      window.scrollTo(0, 0)
    }, 500)
  }

  if (isLoading || isTransitioning) {
    return <LoadingSkeleton />
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

  return <LandingPage onLogin={() => handleNavigate('dashboard')} onNavigate={handleNavigate} />
}

export default App
