"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Users,
  MessageSquare,
  DollarSign,
  FolderOpen,
  Calendar,
  Settings,
  Bell,
  Target,
  FileText,
  Shield,
  Zap,
  Brain,
  Database,
  Smartphone,
  Monitor,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  CheckSquare,
  UserCheck,
  Activity,
  Globe,
  Layers,
  TestTube,
  GraduationCap,
  BarChart4,
  Bot,
  FormInput,
  LogIn,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

interface NavItem {
  title: string
  href: string
  icon: any
  badge?: string
  description?: string
  isNew?: boolean
  category?: string
}

const navigationItems: NavItem[] = [
  {
    title: "仪表板",
    href: "/dashboard",
    icon: Home,
    description: "系统概览和关键指标",
    category: "核心功能",
  },
  {
    title: "数据分析",
    href: "/analytics",
    icon: BarChart3,
    description: "业务数据分析和报表",
    category: "核心功能",
  },
  {
    title: "客户管理",
    href: "/customers",
    icon: Users,
    description: "客户信息和关系管理",
    category: "核心功能",
  },
  {
    title: "任务管理",
    href: "/tasks",
    icon: CheckSquare,
    description: "项目任务和进度跟踪",
    category: "核心功能",
  },
  {
    title: "沟通协作",
    href: "/communication",
    icon: MessageSquare,
    description: "团队沟通和协作工具",
    category: "核心功能",
  },
  {
    title: "财务管理",
    href: "/finance",
    icon: DollarSign,
    description: "财务数据和成本分析",
    category: "核心功能",
  },
  {
    title: "项目管理",
    href: "/projects",
    icon: FolderOpen,
    description: "项目规划和执行管理",
    category: "核心功能",
  },
  {
    title: "日程安排",
    href: "/schedule",
    icon: Calendar,
    description: "日程规划和时间管理",
    category: "效率工具",
  },
  {
    title: "OKR管理",
    href: "/okr",
    icon: Target,
    description: "目标设定和关键结果",
    category: "效率工具",
  },
  {
    title: "通知中心",
    href: "/notifications",
    icon: Bell,
    description: "系统通知和消息管理",
    category: "效率工具",
  },
  {
    title: "团队协作",
    href: "/collaboration",
    icon: Users,
    description: "团队合作和知识共享",
    category: "效率工具",
  },
  {
    title: "审批流程",
    href: "/approval",
    icon: FileText,
    description: "工作流程和审批管理",
    category: "效率工具",
  },
  {
    title: "AI智能助手",
    href: "/ai-assistant",
    icon: Bot,
    description: "AI驱动的智能业务助手",
    category: "AI功能",
    isNew: true,
  },
  {
    title: "AI客户数据",
    href: "/ai-customer-data",
    icon: Brain,
    description: "AI客户数据分析和洞察",
    category: "AI功能",
    isNew: true,
  },
  {
    title: "AI智能表单",
    href: "/ai-smart-forms",
    icon: FormInput,
    description: "智能表单生成和处理",
    category: "AI功能",
    isNew: true,
  },
  {
    title: "高级BI",
    href: "/advanced-bi",
    icon: BarChart4,
    description: "高级商业智能分析",
    category: "高级功能",
  },
  {
    title: "移动应用",
    href: "/mobile-app",
    icon: Smartphone,
    description: "移动端应用管理",
    category: "高级功能",
  },
  {
    title: "安全中心",
    href: "/security",
    icon: Shield,
    description: "系统安全和权限管理",
    category: "系统管理",
  },
  {
    title: "性能监控",
    href: "/performance",
    icon: Activity,
    description: "系统性能和监控",
    category: "系统管理",
  },
  {
    title: "系统管理",
    href: "/system-management",
    icon: Settings,
    description: "系统配置和管理",
    category: "系统管理",
  },
  {
    title: "系统监控",
    href: "/system-monitor",
    icon: Monitor,
    description: "系统状态实时监控",
    category: "系统管理",
  },
  {
    title: "租户管理",
    href: "/tenant-management",
    icon: Globe,
    description: "多租户管理和配置",
    category: "系统管理",
  },
  {
    title: "模块管理",
    href: "/modules",
    icon: Layers,
    description: "系统模块和功能管理",
    category: "系统管理",
  },
  {
    title: "用户培训",
    href: "/training",
    icon: GraduationCap,
    description: "用户培训和学习资源",
    category: "支持服务",
  },
  {
    title: "数据集成",
    href: "/data-integration",
    icon: Database,
    description: "数据集成和同步",
    category: "支持服务",
  },
  {
    title: "性能优化",
    href: "/performance-optimization",
    icon: Zap,
    description: "系统性能优化建议",
    category: "支持服务",
  },
  {
    title: "系统测试",
    href: "/system-testing",
    icon: TestTube,
    description: "系统测试和质量保证",
    category: "支持服务",
  },
  {
    title: "帮助中心",
    href: "/help",
    icon: HelpCircle,
    description: "帮助文档和支持",
    category: "支持服务",
  },
  {
    title: "个人资料",
    href: "/profile",
    icon: UserCheck,
    description: "个人信息和偏好设置",
    category: "个人中心",
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: Settings,
    description: "个人和系统设置",
    category: "个人中心",
  },
  {
    title: "登录",
    href: "/login",
    icon: LogIn,
    description: "用户登录",
    category: "认证",
  },
]

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  // 响应式处理
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const groupedItems = navigationItems.reduce(
    (acc, item) => {
      const category = item.category || "其他"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, NavItem[]>,
  )

  const categoryOrder = ["核心功能", "效率工具", "AI功能", "高级功能", "系统管理", "支持服务", "个人中心", "认证"]

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-white/95 backdrop-blur-sm border-r border-sky-200/60 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* 顶部Logo区域 */}
      <div className="flex items-center justify-between p-4 border-b border-sky-100">
        {!isCollapsed ? (
          <Link href="/dashboard" className="flex items-center space-x-3">
            <Image
              src="/images/jinlan-complete-logo.png"
              alt="锦澜家居"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        ) : (
          <Link href="/dashboard" className="flex items-center justify-center w-full">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/images/jinlan-icon-logo.png"
                alt="锦澜家居"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                priority
              />
            </div>
          </Link>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="hidden lg:flex h-8 w-8 p-0 hover:bg-sky-50"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* 导航菜单 */}
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-6">
          {categoryOrder.map((category) => {
            const items = groupedItems[category]
            if (!items || items.length === 0) return null

            return (
              <div key={category}>
                {!isCollapsed && (
                  <div className="px-3 mb-2">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{category}</h3>
                  </div>
                )}

                <div className="space-y-1">
                  {items.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                      <div key={item.href} className="relative">
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                            isActive
                              ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
                              : "text-slate-700 hover:bg-sky-50 hover:text-sky-700",
                            isCollapsed && "justify-center px-2",
                          )}
                          onMouseEnter={() => setHoveredItem(item.href)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <Icon
                            className={cn(
                              "h-5 w-5 flex-shrink-0 transition-colors",
                              isActive ? "text-white" : "text-slate-500 group-hover:text-sky-600",
                            )}
                          />

                          {!isCollapsed && (
                            <>
                              <span className="flex-1 truncate">{item.title}</span>
                              {item.isNew && (
                                <Badge
                                  variant="secondary"
                                  className="bg-emerald-100 text-emerald-700 text-xs px-1.5 py-0.5"
                                >
                                  新
                                </Badge>
                              )}
                              {item.badge && (
                                <Badge variant="secondary" className="bg-sky-100 text-sky-700 text-xs px-1.5 py-0.5">
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </Link>

                        {/* 折叠状态下的悬浮提示 */}
                        {isCollapsed && hoveredItem === item.href && (
                          <div className="absolute left-full top-0 ml-2 z-50 bg-slate-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                            <div className="font-medium">{item.title}</div>
                            {item.description && <div className="text-xs text-slate-300 mt-1">{item.description}</div>}
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {!isCollapsed && <Separator className="my-4 bg-sky-100" />}
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* 底部状态信息 */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sky-100 bg-sky-50/50">
          <div className="text-xs text-slate-500 space-y-1">
            <div className="flex items-center justify-between">
              <span>系统状态</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600">正常</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>版本</span>
              <span className="font-mono">v2.1.0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
