"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Bell,
  Settings,
  User,
  Menu,
  MessageSquare,
  Calendar,
  HelpCircle,
  LogOut,
  ChevronDown,
  Bot,
  Shield,
  CreditCard,
  Users,
  Building,
  FileText,
  Moon,
  Sun,
  Globe,
  Bookmark,
  History,
  Star,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileDialog } from "@/components/dialogs/profile-dialog"
import { SettingsDialog } from "@/components/dialogs/settings-dialog"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface HeaderProps {
  onMenuClick?: () => void
  onToggleCollapse?: () => void
}

export function Header({ onMenuClick, onToggleCollapse }: HeaderProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState("zh-CN")

  const handleNotificationClick = () => {
    toast({
      title: "通知中心",
      description: "您有5条未读通知",
    })
  }

  const handleMessageClick = () => {
    toast({
      title: "消息中心",
      description: "您有3条新消息",
    })
  }

  const handleCalendarClick = () => {
    toast({
      title: "日程管理",
      description: "今日有2个重要会议",
    })
  }

  const handleHelpClick = () => {
    toast({
      title: "帮助中心",
      description: "正在为您打开帮助文档",
    })
  }

  const handleAIAssistantClick = () => {
    // 跳转到AI助手页面
    window.location.href = "/ai-assistant"
  }

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    toast({
      title: "主题切换",
      description: `已切换到${newTheme === "light" ? "浅色" : "深色"}主题`,
    })
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    toast({
      title: "语言设置",
      description: `已切换到${lang === "zh-CN" ? "简体中文" : lang === "en-US" ? "English" : "繁體中文"}`,
    })
  }

  const handleLogout = () => {
    toast({
      title: "退出登录",
      description: "正在安全退出系统...",
    })
    // 这里可以添加实际的登出逻辑
    setTimeout(() => {
      window.location.href = "/login"
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    toast({
      title: "快捷操作",
      description: `正在执行：${action}`,
    })
  }

  return (
    <>
      <header className="h-16 bg-white/95 backdrop-blur-sm border-b border-sky-200/60 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        {/* 左侧：菜单按钮和搜索 */}
        <div className="flex items-center gap-6">
          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden w-10 h-10 p-0 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* 桌面端折叠按钮 */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex w-10 h-10 p-0 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            onClick={onToggleCollapse}
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sky-400" />
            <Input
              type="search"
              placeholder="搜索功能模块、客户、任务..."
              className="pl-10 w-80 h-10 text-sm bg-sky-50/50 border-sky-200 focus:border-sky-400 focus:ring-sky-400/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* 右侧：功能图标和用户菜单 */}
        <div className="flex items-center gap-2">
          {/* AI智能助手 */}
          <Button
            variant="ghost"
            size="sm"
            className="relative w-10 h-10 p-0 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:text-sky-700 transition-all group"
            onClick={handleAIAssistantClick}
          >
            <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
          </Button>

          {/* 消息中心 */}
          <Button
            variant="ghost"
            size="sm"
            className="relative w-10 h-10 p-0 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            onClick={handleMessageClick}
          >
            <MessageSquare className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-0 font-medium">
              3
            </Badge>
          </Button>

          {/* 通知中心 */}
          <Button
            variant="ghost"
            size="sm"
            className="relative w-10 h-10 p-0 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            onClick={handleNotificationClick}
          >
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 font-medium">
              5
            </Badge>
          </Button>

          {/* 日程管理 */}
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            onClick={handleCalendarClick}
          >
            <Calendar className="w-5 h-5" />
          </Button>

          {/* 帮助中心 */}
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            onClick={handleHelpClick}
          >
            <HelpCircle className="w-5 h-5" />
          </Button>

          {/* 设置 */}
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            onClick={() => setSettingsDialogOpen(true)}
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 h-10 px-3 hover:bg-sky-50 transition-colors">
                <Avatar className="w-8 h-8 ring-2 ring-sky-200 ring-offset-2">
                  <AvatarImage src="/images/jinlan-icon-logo.png" />
                  <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-500 text-white text-sm font-medium">
                    <Image
                      src="/images/jinlan-icon-logo.png"
                      alt="锦澜家居"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-slate-900">系统管理员</div>
                  <div className="text-xs text-slate-500">admin@jinlan.com</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-2">
              {/* 用户信息头部 */}
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg mb-2">
                <Avatar className="w-12 h-12 ring-2 ring-sky-200">
                  <AvatarImage src="/images/jinlan-icon-logo.png" />
                  <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-500 text-white font-medium">
                    <Image
                      src="/images/jinlan-icon-logo.png"
                      alt="锦澜家居"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-slate-900">系统管理员</div>
                  <div className="text-sm text-slate-600">信息技术部</div>
                  <div className="text-xs text-slate-500">admin@jinlan.com</div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  在线
                </Badge>
              </div>

              <DropdownMenuSeparator />

              {/* 账户管理 */}
              <DropdownMenuLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                账户管理
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => setProfileDialogOpen(true)}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <div className="font-medium">个人资料</div>
                  <div className="text-xs text-slate-500">管理个人信息和偏好设置</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleQuickAction("安全设置")}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">安全设置</div>
                  <div className="text-xs text-slate-500">密码、双因素认证</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleQuickAction("账单管理")}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">账单管理</div>
                  <div className="text-xs text-slate-500">查看使用情况和账单</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* 快捷功能 */}
              <DropdownMenuLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                快捷功能
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => handleQuickAction("团队管理")}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">团队管理</div>
                  <div className="text-xs text-slate-500">管理团队成员和权限</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleQuickAction("组织架构")}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <div className="font-medium">组织架构</div>
                  <div className="text-xs text-slate-500">查看和管理组织结构</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleQuickAction("工作报告")}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="font-medium">工作报告</div>
                  <div className="text-xs text-slate-500">查看个人工作统计</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* 个性化设置 */}
              <DropdownMenuLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                个性化设置
              </DropdownMenuLabel>

              {/* 主题切换 */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-3 p-3 rounded-lg">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    {theme === "light" ? (
                      <Sun className="w-4 h-4 text-slate-600" />
                    ) : (
                      <Moon className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">主题设置</div>
                    <div className="text-xs text-slate-500">当前：{theme === "light" ? "浅色" : "深色"}主题</div>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleThemeToggle()}>
                    <Sun className="w-4 h-4 mr-2" />
                    浅色主题
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeToggle()}>
                    <Moon className="w-4 h-4 mr-2" />
                    深色主题
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* 语言设置 */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-3 p-3 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-medium">语言设置</div>
                    <div className="text-xs text-slate-500">当前：简体中文</div>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleLanguageChange("zh-CN")}>🇨🇳 简体中文</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange("zh-TW")}>🇹🇼 繁體中文</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange("en-US")}>🇺🇸 English</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              {/* 其他功能 */}
              <DropdownMenuLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                其他功能
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => handleQuickAction("收藏夹")}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <Bookmark className="w-4 h-4 text-slate-600" />
                <span>我的收藏</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleQuickAction("历史记录")}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <History className="w-4 h-4 text-slate-600" />
                <span>操作历史</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleQuickAction("反馈建议")}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <Star className="w-4 h-4 text-slate-600" />
                <span>反馈建议</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* 退出登录 */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <div className="font-medium">退出登录</div>
                  <div className="text-xs text-red-500">安全退出系统</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* 个人资料对话框 */}
      <ProfileDialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen} />

      {/* 设置对话框 */}
      <SettingsDialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen} />
    </>
  )
}
