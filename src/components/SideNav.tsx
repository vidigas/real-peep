export default function SideNav() {
  return (
    <nav className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-6">
      {/* Logo */}
      <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col space-y-4">
        {/* Dashboard - Active */}
        <button className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"/>
          </svg>
        </button>

        {/* Transactions */}
        <button className="w-10 h-10 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>

        {/* Clients */}
        <button className="w-10 h-10 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </button>

        {/* Finances */}
        <button className="w-10 h-10 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </button>
      </div>

      {/* Settings Icon at Bottom */}
      <div className="mt-auto">
        <button className="w-10 h-10 rounded-lg text-secondary-500 hover:bg-secondary-50 flex items-center justify-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}
