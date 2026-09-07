import os

file_path = 'src/pages/LandingPage.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add states
content = content.replace(
    "  const [remember, setRemember] = useState(false);",
    "  const [remember, setRemember] = useState(false);\n  const [showForgotPassword, setShowForgotPassword] = useState(false);\n  const [resetStep, setResetStep] = useState('email');\n  const [resetEmail, setResetEmail] = useState('');\n  const [resetOtp, setResetOtp] = useState('');\n  const [newPassword, setNewPassword] = useState('');\n  const [showNewPassword, setShowNewPassword] = useState(false);"
)

# 2. Add UI
target_form = '          ) : (\n            <form onSubmit={handleLoginSubmit}>'
replacement_ui = """          ) : showForgotPassword ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="mb-6">
                <h3 className="text-[#1D315F] font-bold text-lg mb-1">Lupa Kata Sandi?</h3>
                <p className="text-gray-500 text-xs font-semibold">
                  {resetStep === 'email' 
                    ? 'Masukkan email yang terdaftar untuk menerima kode OTP.' 
                    : 'Masukkan kode OTP yang dikirimkan ke email Anda dan kata sandi baru.'}
                </p>
              </div>

              {resetStep === 'email' ? (
                <form onSubmit={(e) => { e.preventDefault(); setResetStep('otp'); }}>
                  <div className="mb-5">
                    <label className="block text-[#1D315F] text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">ALAMAT EMAIL</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input 
                        type="email" 
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3FCDC1] focus:border-[#3FCDC1] text-sm text-gray-700 placeholder-gray-400"
                        placeholder="contoh: user@bkpsdm.go.id"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#1D315F] text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-[#152747] transition-colors text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md mb-3"
                  >
                    Kirim Kode OTP <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full bg-white text-gray-600 border border-gray-300 font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                  >
                    Kembali ke Login
                  </button>
                </form>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); alert('Tampilan berhasil: Password telah direset!'); setShowForgotPassword(false); setResetStep('email'); setResetEmail(''); setResetOtp(''); setNewPassword(''); }}>
                  <div className="mb-4">
                    <label className="block text-[#1D315F] text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">KODE OTP</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input 
                        type="text" 
                        value={resetOtp}
                        onChange={(e) => setResetOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3FCDC1] focus:border-[#3FCDC1] text-sm text-gray-700 placeholder-gray-400 text-center tracking-widest font-bold"
                        placeholder="123456"
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block text-[#1D315F] text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">KATA SANDI BARU</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input 
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3FCDC1] focus:border-[#3FCDC1] text-sm text-gray-700 placeholder-gray-400"
                        placeholder="Masukkan kata sandi baru"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#10B981] text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-[#0d9668] transition-colors text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md mb-3"
                  >
                    Reset Kata Sandi <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => setResetStep('email')}
                    className="w-full bg-white text-gray-600 border border-gray-300 font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                  >
                    Kembali
                  </button>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit}>"""
content = content.replace(target_form, replacement_ui)

# 3. Update Lupa Kata Sandi Link
target_link = '''<a href="#" className="text-xs sm:text-sm text-[#1D315F] font-semibold hover:underline">
                  Lupa Kata Sandi?
                </a>'''
replacement_link = '''<button type="button" onClick={() => setShowForgotPassword(true)} className="text-xs sm:text-sm text-[#1D315F] font-semibold hover:underline">
                  Lupa Kata Sandi?
                </button>'''
content = content.replace(target_link, replacement_link)

# 4. Update 'Kembali ke beranda' button
target_btn = "onClick={() => { setShowLogin(false); setError(''); setNip(''); setPassword(''); }}"
replacement_btn = "onClick={() => { setShowLogin(false); setError(''); setNip(''); setPassword(''); setShowForgotPassword(false); setResetStep('email'); }}"
content = content.replace(target_btn, replacement_btn)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
