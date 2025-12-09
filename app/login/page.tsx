"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { LoginBackground } from "@/components/auth/login-background"
import { LoginHeader } from "@/components/auth/login-header"
import { LoginFooter } from "@/components/auth/login-footer"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (credentials: { email: string; password: string; remember: boolean }) => {
    setIsLoading(true)
    try {
      // 模拟登录API调用
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 登录成功后跳转到仪表板
      router.push("/dashboard")
    } catch (error) {
      console.error("登录失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* 背景装饰 */}
      <LoginBackground />

      {/* 页面头部 */}
      <LoginHeader />

      {/* 主要内容区域 */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* 登录表单卡片 */}
          <div className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-2xl shadow-xl p-8">
            {/* 品牌标识 */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">锦澜家居</h1>
              <p className="text-slate-600">企业管理系统</p>
            </div>

            {/* 登录表单 */}
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
          </div>

          {/* 额外信息 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              还没有账户？{" "}
              <button className="text-sky-600 hover:text-sky-700 font-medium transition-colors">联系管理员</button>
            </p>
          </div>
        </div>
      </div>

      {/* 页面底部 */}
      <LoginFooter />
    </div>
  )
}
