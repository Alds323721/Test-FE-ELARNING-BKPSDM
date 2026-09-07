import os

file_path = 'src/pages/LandingPage.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target_login_btn = """const LoginButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed top-0 left-0 w-full z-50 bg-[#1D315F] text-white font-semibold py-3 px-6 flex justify-end hover:bg-[#152747] transition-colors cursor-pointer"
  >
    Masuk
  </button>
);"""

replacement_navbar = """const Navbar = ({ onLoginClick }) => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-white border-t-[5px] border-[#0099FF] shadow-sm flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
    <div className="flex items-center gap-2 sm:gap-3">
      <img src={logoImg} alt="Logo BKPSDM" className="w-8 sm:w-10 object-contain" />
      <span className="font-bold text-lg sm:text-xl text-[#1D315F] tracking-wide">Buleleng ASN Corpu</span>
    </div>
    <button
      onClick={onLoginClick}
      className="border border-gray-400 text-[#4B5563] font-semibold py-1.5 sm:py-2 px-3 sm:px-5 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer text-xs sm:text-sm shadow-sm"
    >
      Masuk / NIP Login
    </button>
  </nav>
);"""

content = content.replace(target_login_btn, replacement_navbar)

target_usage = "<LoginButton onClick={() => setShowLogin(true)} />"
replacement_usage = "<Navbar onLoginClick={() => setShowLogin(true)} />"
content = content.replace(target_usage, replacement_usage)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
