"use client"

export function LoginFooter() {
  return (
    <footer className="relative z-10 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          {/* 快速链接 */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <button className="hover:text-sky-600 transition-colors">产品介绍</button>
            <button className="hover:text-sky-600 transition-colors">技术支持</button>
            <button className="hover:text-sky-600 transition-colors">隐私政策</button>
            <button className="hover:text-sky-600 transition-colors">服务条款</button>
          </div>

          {/* 版权信息 */}
          <div className="text-xs text-slate-500 space-y-1">
            <p>© 2024 锦澜家居企业管理系统. 保留所有权利.</p>
            <p>技术支持: 企业数字化解决方案团队</p>
          </div>

          {/* 联系信息 */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              support@jinlan.com
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              400-888-0000
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
