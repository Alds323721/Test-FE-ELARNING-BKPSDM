import logoImg from '../assets/logo-removebg-preview 1.png';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Logo BKPSDM" className="w-8 object-contain" />
          <span className="font-semibold text-xl text-[#1D315F]">Buleleng ASN Corpu</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-[#1D315F] to-[#2A4575] py-8 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#3FCDC1] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#3FCDC1] rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="h-10 w-64 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>

      <main className="flex-grow bg-[#F9FBFC] py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-[#3FCDC1] border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-[#006A63] border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
              </div>
              
              <div className="space-y-2 mb-8">
                <div className="h-6 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
                <div className="h-4 w-64 bg-gray-100 rounded mx-auto animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse" style={{ animationDelay: '0.1s' }}>
                  <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse" style={{ animationDelay: '0.2s' }}>
                  <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingSkeleton;
