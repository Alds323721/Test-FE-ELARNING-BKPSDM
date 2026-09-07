import os

file_path = 'src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
if "import { CheckCircle2 } from 'lucide-react'" not in content:
    content = content.replace("import './index.css'", "import { CheckCircle2 } from 'lucide-react'\nimport './index.css'")

# 2. Add state
content = content.replace(
    "const [isTransitioning, setIsTransitioning] = useState(false)",
    "const [isTransitioning, setIsTransitioning] = useState(false)\n  const [showLoginSuccess, setShowLoginSuccess] = useState(false)"
)

# 3. Refactor return logic
target_logic = """  if (currentRoute === 'dashboard') {
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

  return <LandingPage onLogin={() => handleNavigate('dashboard')} onNavigate={handleNavigate} />"""

replacement_logic = """  const renderRoute = () => {
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

    return <LandingPage onLogin={() => {
      setShowLoginSuccess(true);
      setTimeout(() => setShowLoginSuccess(false), 3000);
      handleNavigate('dashboard');
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
  )"""

content = content.replace(target_logic, replacement_logic)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
