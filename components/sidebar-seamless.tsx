"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Monitor,
  Home,
  Users,
  CheckSquare,
  MessageSquare,
  TrendingUp,
  DollarSign,
  FolderOpen,
  Bell,
  Calendar,
  Settings,
  HelpCircle,
  Bot,
  Building2,
  Smartphone,
  Shield,
  ChevronDown,
  FileText,
  Brain,
  X,
  ChevronLeft,
  Sparkles,
  Target,
  UserCheck,
  Activity,
  BookOpen,
  Layers,
  Zap,
  Globe,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const navigationItems = [
  {
    title: "运营中心",
    href: "/dashboard",
    icon: BarChart3,
    color: "text-green-600",
    bgColor: "hover:bg-green-50",
    activeColor: "bg-green-50 text-green-700 border-r-2 border-green-500",
  },
  {
    title: "系统监控",
    href: "/system-monitor",
    icon: Monitor,
    color: "text-blue-600",
    bgColor: "hover:bg-blue-50",
    activeColor: "bg-blue-50 text-blue-700 border-r-2 border-blue-500",
  },
]

const newFeatureModules = [
  {
    title: "应用总览",
    href: "/modules",
    icon: Home,
    color: "text-blue-600",
    bgColor: "hover:bg-blue-50",
    activeColor: "bg-blue-50 text-blue-700 border-r-2 border-blue-500",
  },
  {
    title: "AI智能助手",
    href: "/ai-assistant",
    icon: Bot,
    color: "text-purple-600",
    bgColor: "hover:bg-purple-50",
    activeColor: "bg-purple-50 text-purple-700 border-r-2 border-purple-500",
  },
  {
    title: "AI客户数据",
    href: "/ai-customer-data",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "hover:bg-purple-50",
    activeColor: "bg-purple-50 text-purple-700 border-r-2 border-purple-500",
  },
  {
    title: "AI智能表单",
    href: "/ai-smart-forms",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "hover:bg-purple-50",
    activeColor: "bg-purple-50 text-purple-700 border-r-2 border-purple-500",
  },
  {
    title: "多门店管理",
    href: "/tenant-management",
    icon: Building2,
    color: "text-green-600",
    bgColor: "hover:bg-green-50",
    activeColor: "bg-green-50 text-green-700 border-r-2 border-green-500",
  },
  {
    title: "高级BI分析",
    href: "/advanced-bi",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "hover:bg-purple-50",
    activeColor: "bg-purple-50 text-purple-700 border-r-2 border-purple-500",
  },
  {
    title: "移动端应用",
    href: "/mobile-app",
    icon: Smartphone,
    color: "text-rose-600",
    bgColor: "hover:bg-rose-50",
    activeColor: "bg-rose-50 text-rose-700 border-r-2 border-rose-500",
  },
  {
    title: "安全中心",
    href: "/security",
    icon: Shield,
    color: "text-orange-600",
    bgColor: "hover:bg-orange-50",
    activeColor: "bg-orange-50 text-orange-700 border-r-2 border-orange-500",
  },
]

const coreModules = [
  {
    title: "客户管理",
    href: "/customers",
    icon: Users,
    color: "text-orange-600",
    bgColor: "hover:bg-orange-50",
    activeColor: "bg-orange-50 text-orange-700 border-r-2 border-orange-500",
  },
  {
    title: "任务管理",
    href: "/tasks",
    icon: CheckSquare,
    color: "text-green-600",
    bgColor: "hover:bg-green-50",
    activeColor: "bg-green-50 text-green-700 border-r-2 border-green-500",
  },
  {
    title: "沟通协作",
    href: "/communication",
    icon: MessageSquare,
    color: "text-green-600",
    bgColor: "hover:bg-green-50",
    activeColor: "bg-green-50 text-green-700 border-r-2 border-green-500",
  },
  {
    title: "数据分析",
    href: "/analytics",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "hover:bg-purple-50",
    activeColor: "bg-purple-50 text-purple-700 border-r-2 border-purple-500",
  },
  {
    title: "财务管理",
    href: "/finance",
    icon: DollarSign,
    color: "text-orange-600",
    bgColor: "hover:bg-orange-50",
    activeColor: "bg-orange-50 text-orange-700 border-r-2 border-orange-500",
  },
  {
    title: "项目管理",
    href: "/projects",
    icon: FolderOpen,
    color: "text-purple-600",
    bgColor: "hover:bg-purple-50",
    activeColor: "bg-purple-50 text-purple-700 border-r-2 border-purple-500",
  },
  {
    title: "OKR管理",
    href: "/okr",
    icon: Target,
    color: "text-red-600",
    bgColor: "hover:bg-red-50",
    activeColor: "bg-red-50 text-red-700 border-r-2 border-red-500",
  },
  {
    title: "团队协作",
    href: "/collaboration",
    icon: UserCheck,
    color: "text-cyan-600",
    bgColor: "hover:bg-cyan-50",
    activeColor: "bg-cyan-50 text-cyan-700 border-r-2 border-cyan-500",
  },
]

const systemModules = [
  {
    title: "通知中心",
    href: "/notifications",
    icon: Bell,
    color: "text-yellow-600",
    bgColor: "hover:bg-yellow-50",
    activeColor: "bg-yellow-50 text-yellow-700 border-r-2 border-yellow-500",
  },
  {
    title: "OA审批",
    href: "/approval",
    icon: FileText,
    color: "text-indigo-600",
    bgColor: "hover:bg-indigo-50",
    activeColor: "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-500",
  },
  {
    title: "日程安排",
    href: "/schedule",
    icon: Calendar,
    color: "text-yellow-600",
    bgColor: "hover:bg-yellow-50",
    activeColor: "bg-yellow-50 text-yellow-700 border-r-2 border-yellow-500",
  },
  {
    title: "用户培训",
    href: "/training",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "hover:bg-blue-50",
    activeColor: "bg-blue-50 text-blue-700 border-r-2 border-blue-500",
  },
  {
    title: "数据集成",
    href: "/data-integration",
    icon: Layers,
    color: "text-green-600",
    bgColor: "hover:bg-green-50",
    activeColor: "bg-green-50 text-green-700 border-r-2 border-green-500",
  },
  {
    title: "性能优化",
    href: "/performance-optimization",
    icon: Zap,
    color: "text-purple-600",
    bgColor: "hover:bg-purple-50",
    activeColor: "bg-purple-50 text-purple-700 border-r-2 border-purple-500",
  },
  {
    title: "系统测试",
    href: "/system-testing",
    icon: Activity,
    color: "text-orange-600",
    bgColor: "hover:bg-orange-50",
    activeColor: "bg-orange-50 text-orange-700 border-r-2 border-orange-500",
  },
  {
    title: "系统管理",
    href: "/system-management",
    icon: Globe,
    color: "text-gray-600",
    bgColor: "hover:bg-gray-50",
    activeColor: "bg-gray-50 text-gray-700 border-r-2 border-gray-500",
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: Settings,
    color: "text-blue-600",
    bgColor: "hover:bg-blue-50",
    activeColor: "bg-blue-50 text-blue-700 border-r-2 border-blue-500",
  },
  {
    title: "帮助中心",
    href: "/help",
    icon: HelpCircle,
    color: "text-yellow-600",
    bgColor: "hover:bg-yellow-50",
    activeColor: "bg-yellow-50 text-yellow-700 border-r-2 border-yellow-500",
  },
]

interface SeamlessSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function SeamlessSidebar({
  isOpen = true,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: SeamlessSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isNewFeaturesExpanded, setIsNewFeaturesExpanded] = useState(true)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isAutoCollapsed, setIsAutoCollapsed] = useState(false)

  // 自动收缩逻辑
  useEffect(() => {
    const handleMouseLeave = () => {
      if (!isCollapsed) {
        const timer = setTimeout(() => {
          setIsAutoCollapsed(true)
        }, 3000) // 3秒后自动收缩

        return () => clearTimeout(timer)
      }
    }

    const handleMouseEnter = () => {
      setIsAutoCollapsed(false)
    }

    const sidebar = document.getElementById("seamless-sidebar")
    if (sidebar) {
      sidebar.addEventListener("mouseenter", handleMouseEnter)
      sidebar.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        sidebar.removeEventListener("mouseenter", handleMouseEnter)
        sidebar.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isCollapsed])

  const isActive = (href: string) => pathname === href
  const shouldCollapse = isCollapsed || isAutoCollapsed

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  const sidebarVariants = {
    expanded: {
      width: 200, // 从280px减少到200px
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      },
    },
    collapsed: {
      width: 72,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      },
    },
  }

  const contentVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1,
        duration: 0.2,
      },
    },
    collapsed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.15,
      },
    },
  }

  const iconVariants = {
    expanded: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    collapsed: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  }

  return (
    <>
      {/* 移动端遮罩层 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* 侧边栏 */}
      <motion.div
        id="seamless-sidebar"
        variants={sidebarVariants}
        animate={shouldCollapse ? "collapsed" : "expanded"}
        className={`
          bg-white/95 backdrop-blur-xl border-r border-gray-200/60 flex flex-col h-full
          fixed md:relative z-50 md:z-auto shadow-xl md:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
        }}
      >
        {/* Logo区域 */}
        <div className="p-6 border-b border-gray-200/60 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!shouldCollapse ? (
              <motion.div
                key="logo-expanded"
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="flex items-center justify-center w-full"
              >
                <Image
                  src="/images/jinlan-complete-logo.png"
                  alt="锦澜家居"
                  width={140} // 从180px减少到140px
                  height={60} // 从80px减少到60px
                  className="h-16 w-auto object-contain" // 从h-20减少到h-16
                  priority
                />
              </motion.div>
            ) : (
              <motion.div
                key="logo-collapsed"
                variants={iconVariants}
                initial="expanded"
                animate="collapsed"
                className="w-full flex justify-center"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">锦</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 移动端关闭按钮 */}
          <Button variant="ghost" size="sm" className="md:hidden w-8 h-8 p-0" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* 导航内容 */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {/* 主要导航 */}
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredItem(item.href)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Button
                    variant="ghost"
                    className={`w-full h-12 transition-all duration-300 group relative overflow-hidden ${
                      shouldCollapse ? "justify-center px-2" : "justify-start px-4"
                    } ${active ? `${item.activeColor} shadow-sm` : `${item.bgColor} hover:shadow-sm`}`}
                    onClick={() => handleNavigation(item.href)}
                  >
                    {/* 背景光效 */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ${active ? "opacity-30" : "opacity-0 group-hover:opacity-100"}`}
                    />

                    <motion.div variants={iconVariants} className="relative z-10">
                      <Icon className={`w-5 h-5 ${shouldCollapse ? "" : "mr-3"} flex-shrink-0 ${item.color}`} />
                    </motion.div>

                    <AnimatePresence>
                      {!shouldCollapse && (
                        <motion.div
                          variants={contentVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="flex items-center justify-between flex-1 relative z-10"
                        >
                          <span className={`font-medium ${item.color}`}>{item.title}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 折叠状态下的提示 */}
                    <AnimatePresence>
                      {shouldCollapse && hoveredItem === item.href && (
                        <motion.div
                          initial={{ opacity: 0, x: -10, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -10, scale: 0.9 }}
                          className="absolute left-full ml-3 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-xl border border-gray-700"
                        >
                          {item.title}
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              )
            })}

            {/* 新功能模块 */}
            <div className="mt-8">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="ghost"
                  className={`w-full h-10 transition-all duration-300 group ${
                    shouldCollapse ? "justify-center px-2" : "justify-between px-4"
                  } text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 relative overflow-hidden`}
                  onClick={() => setIsNewFeaturesExpanded(!isNewFeaturesExpanded)}
                >
                  {/* 背景光效 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <div className="flex items-center relative z-10">
                    <Sparkles className="w-4 h-4 mr-3 flex-shrink-0 text-purple-500" />
                    <AnimatePresence>
                      {!shouldCollapse && (
                        <motion.span
                          variants={contentVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        >
                          新功能模块
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence>
                    {!shouldCollapse && (
                      <motion.div
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="relative z-10"
                      >
                        <motion.div
                          animate={{ rotate: isNewFeaturesExpanded ? 0 : -90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-purple-500" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <AnimatePresence>
                {isNewFeaturesExpanded && !shouldCollapse && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="ml-4 mt-2 space-y-1 overflow-hidden"
                  >
                    {newFeatureModules.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.href)
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="ghost"
                            className={`w-full justify-start h-10 px-3 transition-all duration-300 group relative overflow-hidden ${
                              active ? item.activeColor : `${item.bgColor} hover:shadow-sm`
                            }`}
                            onClick={() => handleNavigation(item.href)}
                          >
                            {/* 背景光效 */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ${active ? "opacity-30" : "opacity-0 group-hover:opacity-100"}`}
                            />

                            <Icon className={`w-4 h-4 mr-3 ${item.color} relative z-10`} />
                            <span className={`text-sm font-medium ${item.color} relative z-10`}>{item.title}</span>
                          </Button>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 折叠状态下的新功能模块 */}
              <AnimatePresence>
                {shouldCollapse && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 space-y-1"
                  >
                    {newFeatureModules.slice(0, 4).map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.href)
                      return (
                        <motion.div
                          key={item.href}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onHoverStart={() => setHoveredItem(item.href)}
                          onHoverEnd={() => setHoveredItem(null)}
                        >
                          <Button
                            variant="ghost"
                            className={`w-full justify-center h-10 px-2 transition-all duration-300 group relative ${
                              active ? item.activeColor : item.bgColor
                            }`}
                            onClick={() => handleNavigation(item.href)}
                          >
                            <Icon className={`w-4 h-4 ${item.color}`} />

                            {/* 悬停提示 */}
                            <AnimatePresence>
                              {hoveredItem === item.href && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                                  animate={{ opacity: 1, x: 0, scale: 1 }}
                                  exit={{ opacity: 0, x: -10, scale: 0.9 }}
                                  className="absolute left-full ml-3 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-xl border border-gray-700"
                                >
                                  {item.title}
                                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Button>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 核心功能 */}
            <AnimatePresence>
              {!shouldCollapse && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8">
                  <div className="px-4 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">核心功能</h3>
                  </div>
                  <div className="space-y-1">
                    {coreModules.map((item, index) => {
                      const Icon = item.icon
                      const active = isActive(item.href)
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="ghost"
                            className={`w-full justify-start h-10 px-4 transition-all duration-300 group relative overflow-hidden ${
                              active ? item.activeColor : `${item.bgColor} hover:shadow-sm`
                            }`}
                            onClick={() => handleNavigation(item.href)}
                          >
                            {/* 背景光效 */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ${active ? "opacity-30" : "opacity-0 group-hover:opacity-100"}`}
                            />

                            <Icon className={`w-4 h-4 mr-3 ${item.color} relative z-10`} />
                            <span className={`text-sm font-medium ${item.color} relative z-10`}>{item.title}</span>
                          </Button>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 折叠状态下的核心功能 */}
            <AnimatePresence>
              {shouldCollapse && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 space-y-1"
                >
                  {coreModules.slice(0, 6).map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <motion.div
                        key={item.href}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredItem(item.href)}
                        onHoverEnd={() => setHoveredItem(null)}
                      >
                        <Button
                          variant="ghost"
                          className={`w-full justify-center h-10 px-2 transition-all duration-300 group relative ${
                            active ? item.activeColor : item.bgColor
                          }`}
                          onClick={() => handleNavigation(item.href)}
                        >
                          <Icon className={`w-4 h-4 ${item.color}`} />

                          {/* 悬停提示 */}
                          <AnimatePresence>
                            {hoveredItem === item.href && (
                              <motion.div
                                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -10, scale: 0.9 }}
                                className="absolute left-full ml-3 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-xl border border-gray-700"
                              >
                                {item.title}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 系统功能 */}
            <AnimatePresence>
              {!shouldCollapse && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8">
                  <div className="px-4 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">系统功能</h3>
                  </div>
                  <div className="space-y-1">
                    {systemModules.map((item, index) => {
                      const Icon = item.icon
                      const active = isActive(item.href)
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="ghost"
                            className={`w-full justify-start h-10 px-4 transition-all duration-300 group relative overflow-hidden ${
                              active ? item.activeColor : `${item.bgColor} hover:shadow-sm`
                            }`}
                            onClick={() => handleNavigation(item.href)}
                          >
                            {/* 背景光效 */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ${active ? "opacity-30" : "opacity-0 group-hover:opacity-100"}`}
                            />

                            <Icon className={`w-4 h-4 mr-3 ${item.color} relative z-10`} />
                            <span className={`text-sm font-medium ${item.color} relative z-10`}>{item.title}</span>
                          </Button>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* 折叠/展开按钮 */}
        <div className="p-4 border-t border-gray-200/60 hidden md:block">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center h-10 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group relative overflow-hidden"
              onClick={onToggleCollapse}
            >
              {/* 背景光效 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <motion.div
                animate={{ rotate: shouldCollapse ? 0 : 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* 状态指示器 */}
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
          />
        </div>
      </motion.div>
    </>
  )
}
