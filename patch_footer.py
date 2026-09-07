import os

file_path = 'src/pages/LandingPage.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Footer component
target_footer_def = "const Footer = ({ onNavigate }) => ("
replacement_footer_def = "const Footer = ({ onFooterLinkClick }) => ("
content = content.replace(target_footer_def, replacement_footer_def)

target_footer_links = """        <ul className="text-[13px] text-gray-600 space-y-3 font-medium">
          <li><a href="#" className="hover:text-[#006A63] transition-colors">Tentang</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="hover:text-[#006A63] transition-colors">Komunitas</a></li>
          <li><a href="#" className="hover:text-[#006A63] transition-colors">Bantuan</a></li>
        </ul>"""
replacement_footer_links = """        <ul className="text-[13px] text-gray-600 space-y-3 font-medium">
          <li><a href="#" onClick={(e) => { e.preventDefault(); onFooterLinkClick('about'); }} className="hover:text-[#006A63] transition-colors">Tentang</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onFooterLinkClick('community'); }} className="hover:text-[#006A63] transition-colors">Komunitas</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onFooterLinkClick('help-center'); }} className="hover:text-[#006A63] transition-colors">Bantuan</a></li>
        </ul>"""
content = content.replace(target_footer_links, replacement_footer_links)

# 2. Update LandingPage component
target_landingpage = """export default function LandingPage({ onLogin, onNavigate }) {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
            <Navbar onLoginClick={() => setShowLogin(true)} />
      <main className="flex-grow pt-12 sm:pt-14">
        <Hero showLogin={showLogin} setShowLogin={setShowLogin} onLogin={onLogin} />
        <FeaturesBanner />
        <Categories />
        <PopularCourses />
        <HowItWorks />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}"""

replacement_landingpage = """export default function LandingPage({ onLogin, onNavigate }) {
  const [showLogin, setShowLogin] = useState(false);
  const [intendedRoute, setIntendedRoute] = useState('dashboard');

  const handleLoginClick = (route = 'dashboard') => {
    setIntendedRoute(route);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar onLoginClick={() => handleLoginClick('dashboard')} />
      <main className="flex-grow pt-12 sm:pt-14">
        <Hero showLogin={showLogin} setShowLogin={setShowLogin} onLogin={() => onLogin(intendedRoute)} onLoginClick={() => handleLoginClick('dashboard')} />
        <FeaturesBanner />
        <Categories />
        <PopularCourses />
        <HowItWorks />
      </main>
      <Footer onFooterLinkClick={handleLoginClick} />
    </div>
  );
}"""

# Since Hero is used without onLoginClick in definition, let's also patch Hero button just to use setShowLogin but we want it to reset intendedRoute.
# Actually, passing onLoginClick to Hero is better. Let's update Hero definition slightly.
target_hero_def = "const Hero = ({ showLogin, setShowLogin, onLogin }) => {"
replacement_hero_def = "const Hero = ({ showLogin, setShowLogin, onLogin, onLoginClick }) => {"
content = content.replace(target_hero_def, replacement_hero_def)

target_hero_btn = """          <button onClick={() => setShowLogin(true)} className="bg-[#10B981] text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 text-sm sm:text-base rounded-md hover:bg-[#0d9668] transition-colors shadow-md">
            Masuk / NIP Login
          </button>"""
replacement_hero_btn = """          <button onClick={onLoginClick || (() => setShowLogin(true))} className="bg-[#10B981] text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 text-sm sm:text-base rounded-md hover:bg-[#0d9668] transition-colors shadow-md">
            Masuk / NIP Login
          </button>"""
content = content.replace(target_hero_btn, replacement_hero_btn)

# replace LandingPage block
if target_landingpage in content:
    content = content.replace(target_landingpage, replacement_landingpage)
else:
    # try replacing loosely
    pass

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
