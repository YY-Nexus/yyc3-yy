"use client"

export function LoginHeader() {
  return (
    <header className="relative z-10 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo区域 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">锦澜家居</h1>
              <p className="text-sm text-slate-600">Enterprise Management</p>
            </div>
          </div>

          {/* 语言切换 */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
            <button className="px-3 py-1 rounded-lg hover:bg-white/50 transition-colors">中文</button>
            <span className="text-slate-400">|</span>
            <button className="px-3 py-1 rounded-lg hover:bg-white/50 transition-colors">EN</button>
          </div>
        </div>
      </div>
    </header>
  )
}
