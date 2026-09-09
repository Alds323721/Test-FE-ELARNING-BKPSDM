import React from 'react';

const AdminKomunitasSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex-col z-50">
        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gray-200 animate-pulse shrink-0"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-gray-100 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-gray-100 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 py-2 px-4 space-y-3">
          {/* Admin Komunitas has 5 menu items now */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg">
              <div className="w-5 h-5 rounded bg-gray-200 animate-pulse shrink-0"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="p-4 space-y-2 mt-auto">
           <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
           <div className="w-full h-10 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full overflow-hidden">
        {/* Header Skeleton */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-gray-200 animate-pulse lg:hidden"></div>
            <div className="w-40 sm:w-64 md:w-96 h-10 bg-gray-100 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse hidden sm:block"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse hidden sm:block"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
          </div>
        </div>

        {/* Dashboard Content Skeleton */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-80 animate-pulse"></div>
          </div>
          
          {/* Stat Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-20 animate-pulse mb-2 mt-4"></div>
                <div className="h-3 bg-gray-100 rounded w-28 animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* Chart Skeleton */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2 h-80 animate-pulse flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100"></div>
            </div>
            {/* Recent Activity Skeleton */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm h-80 animate-pulse flex flex-col">
              <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
              <div className="space-y-6 flex-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                     <div className="space-y-2 flex-1 pt-1">
                       <div className="h-4 bg-gray-200 rounded w-full"></div>
                       <div className="h-3 bg-gray-100 rounded w-24"></div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Table Skeleton */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8 h-64 animate-pulse">
             <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
             </div>
             <div className="p-6 space-y-4">
                <div className="h-10 bg-gray-50 rounded-lg w-full"></div>
                <div className="h-10 bg-gray-50 rounded-lg w-full"></div>
                <div className="h-10 bg-gray-50 rounded-lg w-full"></div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminKomunitasSkeleton;
