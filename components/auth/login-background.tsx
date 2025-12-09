"use client"

export function LoginBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 背景几何图形 */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* 大圆形装饰 */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sky-200/30 to-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-sky-300/20 rounded-full blur-3xl" />

        {/* 中等圆形装饰 */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-sky-300/20 to-blue-400/15 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-tl from-blue-300/20 to-sky-400/15 rounded-full blur-2xl" />

        {/* 小装饰点 */}
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-sky-400/40 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400/40 rounded-full" />
        <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 bg-sky-300/40 rounded-full" />
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
    </div>
  )
}
