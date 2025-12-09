"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string; remember: boolean }) => Promise<void>
  isLoading: boolean
}

export function LoginForm({ onLogin, isLoading }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "请输入邮箱地址"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址"
    }

    if (!formData.password) {
      newErrors.password = "请输入密码"
    } else if (formData.password.length < 6) {
      newErrors.password = "密码长度至少6位"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await onLogin(formData)
    } catch (error) {
      setErrors({ general: "登录失败，请检查用户名和密码" })
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 通用错误提示 */}
      {errors.general && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* 邮箱输入 */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-slate-700">
          邮箱地址
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="email"
            type="email"
            placeholder="请输入邮箱地址"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={cn(
              "pl-10 h-12 border-sky-200 focus:border-sky-400 focus:ring-sky-400",
              errors.email && "border-red-300 focus:border-red-400 focus:ring-red-400",
            )}
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.email}
          </p>
        )}
      </div>

      {/* 密码输入 */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-slate-700">
          密码
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="请输入密码"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={cn(
              "pl-10 pr-10 h-12 border-sky-200 focus:border-sky-400 focus:ring-sky-400",
              errors.password && "border-red-300 focus:border-red-400 focus:ring-red-400",
            )}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.password}
          </p>
        )}
      </div>

      {/* 记住我和忘记密码 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.remember}
            onCheckedChange={(checked) => handleInputChange("remember", checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
            记住我
          </Label>
        </div>
        <button
          type="button"
          className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors"
          disabled={isLoading}
        >
          忘记密码？
        </button>
      </div>

      {/* 登录按钮 */}
      <Button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>登录中...</span>
          </div>
        ) : (
          "登录"
        )}
      </Button>

      {/* 演示账户提示 */}
      <div className="mt-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <h4 className="text-sm font-medium text-sky-800 mb-2">演示账户</h4>
        <div className="text-xs text-sky-700 space-y-1">
          <p>邮箱: admin@jinlan.com</p>
          <p>密码: 123456</p>
        </div>
      </div>
    </form>
  )
}
