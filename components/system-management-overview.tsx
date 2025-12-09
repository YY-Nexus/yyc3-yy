"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  Database,
  Shield,
  Zap,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Settings,
  RefreshCw,
  Download,
  Users,
  Search,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface SystemStatus {
  category: string
  status: "good" | "warning" | "critical"
  score: number
  description: string
  lastCheck: Date
  icon: any
  route: string
  colorTheme: string
  borderColor: string
  progressColor: string
}

interface SystemConfig {
  id: string
  name: string
  category: string
  value: string | boolean | number
  type: "text" | "boolean" | "number" | "select"
  options?: string[]
  description: string
  editable: boolean
}

interface SystemLog {
  id: string
  timestamp: Date
  level: "info" | "warning" | "error" | "debug"
  module: string
  message: string
  details?: string
  user?: string
}

export function SystemManagementOverview() {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [selectedConfig, setSelectedConfig] = useState<SystemConfig | null>(null)

  const systemStatuses: SystemStatus[] = [
    {
      category: "系统测试",
      status: "good",
      score: 92,
      description: "所有核心功能测试通过",
      lastCheck: new Date(Date.now() - 5 * 60 * 1000),
      icon: Activity,
      route: "/system-testing",
      colorTheme: "blue",
      borderColor: "border-l-blue-500",
      progressColor: "bg-gradient-to-r from-blue-400 to-blue-500",
    },
    {
      category: "性能优化",
      status: "warning",
      score: 78,
      description: "部分模块需要优化",
      lastCheck: new Date(Date.now() - 10 * 60 * 1000),
      icon: Zap,
      route: "/performance-optimization",
      colorTheme: "green",
      borderColor: "border-l-green-500",
      progressColor: "bg-gradient-to-r from-green-400 to-green-500",
    },
    {
      category: "数据集成",
      status: "good",
      score: 88,
      description: "数据源连接正常",
      lastCheck: new Date(Date.now() - 2 * 60 * 1000),
      icon: Database,
      route: "/data-integration",
      colorTheme: "purple",
      borderColor: "border-l-purple-500",
      progressColor: "bg-gradient-to-r from-purple-400 to-purple-500",
    },
    {
      category: "用户培训",
      status: "good",
      score: 85,
      description: "培训完成率良好",
      lastCheck: new Date(Date.now() - 15 * 60 * 1000),
      icon: BookOpen,
      route: "/training",
      colorTheme: "orange",
      borderColor: "border-l-orange-500",
      progressColor: "bg-gradient-to-r from-orange-400 to-orange-500",
    },
    {
      category: "安全防护",
      status: "good",
      score: 95,
      description: "安全状态优秀",
      lastCheck: new Date(Date.now() - 1 * 60 * 1000),
      icon: Shield,
      route: "/security",
      colorTheme: "red",
      borderColor: "border-l-red-500",
      progressColor: "bg-gradient-to-r from-red-400 to-red-500",
    },
  ]

  const systemConfigs: SystemConfig[] = [
    {
      id: "max_users",
      name: "最大用户数",
      category: "用户管理",
      value: 1000,
      type: "number",
      description: "系统支持的最大并发用户数",
      editable: true,
    },
    {
      id: "session_timeout",
      name: "会话超时时间",
      category: "安全设置",
      value: 30,
      type: "number",
      description: "用户会话超时时间（分钟）",
      editable: true,
    },
    {
      id: "auto_backup",
      name: "自动备份",
      category: "数据管理",
      value: true,
      type: "boolean",
      description: "启用自动数据备份功能",
      editable: true,
    },
    {
      id: "backup_frequency",
      name: "备份频率",
      category: "数据管理",
      value: "daily",
      type: "select",
      options: ["hourly", "daily", "weekly", "monthly"],
      description: "自动备份执行频率",
      editable: true,
    },
    {
      id: "log_level",
      name: "日志级别",
      category: "系统设置",
      value: "info",
      type: "select",
      options: ["debug", "info", "warning", "error"],
      description: "系统日志记录级别",
      editable: true,
    },
    {
      id: "email_notifications",
      name: "邮件通知",
      category: "通知设置",
      value: true,
      type: "boolean",
      description: "启用邮件通知功能",
      editable: true,
    },
    {
      id: "api_rate_limit",
      name: "API限流",
      category: "安全设置",
      value: 1000,
      type: "number",
      description: "每小时API调用限制",
      editable: true,
    },
    {
      id: "maintenance_mode",
      name: "维护模式",
      category: "系统设置",
      value: false,
      type: "boolean",
      description: "启用系统维护模式",
      editable: true,
    },
  ]

  const systemLogs: SystemLog[] = [
    {
      id: "1",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      level: "info",
      module: "系统启动",
      message: "系统启动完成，所有服务正常运行",
      user: "系统",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      level: "warning",
      module: "性能监控",
      message: "CPU使用率超过80%，建议检查系统负载",
      details: "当前CPU使用率：85%，内存使用率：72%",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      level: "info",
      module: "数据备份",
      message: "自动备份任务执行成功",
      details: "备份文件大小：2.3GB，耗时：5分钟",
      user: "系统",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      level: "error",
      module: "邮件服务",
      message: "邮件服务连接失败",
      details: "SMTP服务器连接超时，请检查网络配置",
    },
    {
      id: "5",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      level: "info",
      module: "用户管理",
      message: "新用户注册",
      details: "用户：张三，邮箱：zhang@example.com",
      user: "张三",
    },
    {
      id: "6",
      timestamp: new Date(Date.now() - 75 * 60 * 1000),
      level: "warning",
      module: "安全监控",
      message: "检测到异常登录尝试",
      details: "IP地址：192.168.1.100，尝试次数：5次",
    },
  ]

  const quickActions = [
    {
      name: "运行全面测试",
      description: "执行完整的系统功能测试",
      icon: Activity,
      action: () => router.push("/system-testing"),
      colorTheme: "blue",
      borderColor: "border-l-blue-500",
      bgColor: "bg-blue-500",
    },
    {
      name: "性能优化",
      description: "启动系统性能优化流程",
      icon: Zap,
      action: () => router.push("/performance-optimization"),
      colorTheme: "green",
      borderColor: "border-l-green-500",
      bgColor: "bg-green-500",
    },
    {
      name: "数据同步",
      description: "检查并同步所有数据源",
      icon: Database,
      action: () => router.push("/data-integration"),
      colorTheme: "purple",
      borderColor: "border-l-purple-500",
      bgColor: "bg-purple-500",
    },
    {
      name: "安全扫描",
      description: "执行安全漏洞扫描",
      icon: Shield,
      action: () => router.push("/security"),
      colorTheme: "red",
      borderColor: "border-l-red-500",
      bgColor: "bg-red-500",
    },
    {
      name: "系统备份",
      description: "立即执行系统数据备份",
      icon: Download,
      action: () => handleBackup(),
      colorTheme: "indigo",
      borderColor: "border-l-indigo-500",
      bgColor: "bg-indigo-500",
    },
    {
      name: "重启服务",
      description: "重启所有系统服务",
      icon: RefreshCw,
      action: () => handleRestart(),
      colorTheme: "yellow",
      borderColor: "border-l-yellow-500",
      bgColor: "bg-yellow-500",
    },
  ]

  const recentActivities = [
    {
      id: "1",
      type: "test",
      message: "AI智能助手功能测试完成",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "success",
      colorTheme: "blue",
      borderColor: "border-l-blue-500",
    },
    {
      id: "2",
      type: "optimization",
      message: "代码分割优化已启用",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: "success",
      colorTheme: "green",
      borderColor: "border-l-green-500",
    },
    {
      id: "3",
      type: "sync",
      message: "客户数据同步完成",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: "success",
      colorTheme: "purple",
      borderColor: "border-l-purple-500",
    },
    {
      id: "4",
      type: "training",
      message: "新用户培训模块上线",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "info",
      colorTheme: "orange",
      borderColor: "border-l-orange-500",
    },
    {
      id: "5",
      type: "security",
      message: "检测到异常登录尝试",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: "warning",
      colorTheme: "red",
      borderColor: "border-l-red-500",
    },
  ]

  const refreshSystemStatus = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const handleBackup = async () => {
    // 模拟备份操作
    console.log("开始系统备份...")
  }

  const handleRestart = async () => {
    // 模拟重启操作
    console.log("重启系统服务...")
  }

  const handleConfigSave = (config: SystemConfig) => {
    // 保存配置
    console.log("保存配置:", config)
    setIsConfigDialogOpen(false)
    setSelectedConfig(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100"
      case "warning":
        return "bg-yellow-100"
      case "critical":
        return "bg-red-100"
      default:
        return "bg-gray-100"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "test":
        return <Activity className="w-4 h-4" />
      case "optimization":
        return <Zap className="w-4 h-4" />
      case "sync":
        return <Database className="w-4 h-4" />
      case "training":
        return <BookOpen className="w-4 h-4" />
      case "security":
        return <Shield className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "error":
        return "text-red-600 bg-red-100"
      default:
        return "text-blue-600 bg-blue-100"
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "debug":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredConfigs = systemConfigs.filter((config) => {
    const matchesSearch =
      config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || config.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredLogs = systemLogs.filter(
    (log) =>
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const overallScore = Math.round(systemStatuses.reduce((sum, status) => sum + status.score, 0) / systemStatuses.length)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">系统管理总览</h1>
          <p className="text-slate-600 mt-2">系统状态监控和管理中心</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshSystemStatus} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            刷新状态
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="w-4 h-4 mr-2" />
            系统设置
          </Button>
        </div>
      </div>

      {/* 系统健康度总览 */}
      <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-blue-500 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">系统健康度</h2>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-green-600">{overallScore}</span>
            <span className="text-slate-600">/100</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-blue-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-600">系统整体运行状况良好，建议定期进行维护和优化</p>
      </Card>

      {/* 系统状态卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemStatuses.map((status, index) => (
          <Card
            key={index}
            className={`bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 cursor-pointer border-l-4 ${status.borderColor} p-4 group`}
            onClick={() => router.push(status.route)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getStatusBg(status.status)}`}>
                  <status.icon className={`w-5 h-5 ${getStatusColor(status.status)}`} />
                </div>
                <h3 className="font-semibold text-slate-900">{status.category}</h3>
              </div>
              <span className={`text-xl font-bold ${getStatusColor(status.status)}`}>{status.score}</span>
            </div>
            <p className="text-sm text-slate-600 mb-3">{status.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`${status.progressColor} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${status.score}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500">最后检查: {status.lastCheck.toLocaleString()}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">系统概览</TabsTrigger>
          <TabsTrigger value="actions">快捷操作</TabsTrigger>
          <TabsTrigger value="activities">活动日志</TabsTrigger>
          <TabsTrigger value="configs">系统配置</TabsTrigger>
          <TabsTrigger value="logs">系统日志</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-blue-500 p-6">
              <h3 className="text-lg font-semibold mb-4">系统指标</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">CPU使用率</span>
                  <span className="font-semibold text-blue-600">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">内存使用率</span>
                  <span className="font-semibold text-green-600">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">磁盘使用率</span>
                  <span className="font-semibold text-purple-600">32%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">网络延迟</span>
                  <span className="font-semibold text-orange-600">85ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">在线用户</span>
                  <span className="font-semibold text-red-600">24</span>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-green-500 p-6">
              <h3 className="text-lg font-semibold mb-4">功能状态</h3>
              <div className="space-y-3">
                {[
                  { name: "AI智能助手", status: "正常", color: "text-green-600" },
                  { name: "多租户管理", status: "正常", color: "text-green-600" },
                  { name: "BI分析系统", status: "正常", color: "text-green-600" },
                  { name: "移动端应用", status: "维护中", color: "text-yellow-600" },
                  { name: "安全中心", status: "正常", color: "text-green-600" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{item.name}</span>
                    <span className={`text-sm font-medium ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className={`bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 cursor-pointer border-l-4 ${action.borderColor} p-4 group`}
                onClick={action.action}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 ${action.bgColor} rounded-lg`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:translate-x-1 transition-transform duration-300">
                      {action.name}
                    </h3>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <Card
                key={activity.id}
                className={`bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 ${activity.borderColor} p-4`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                    <p className="text-xs text-slate-500">{activity.timestamp.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {activity.status === "success" && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {activity.status === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                    {activity.status === "info" && <TrendingUp className="w-4 h-4 text-blue-600" />}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configs" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索配置项..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                <SelectItem value="用户管理">用户管理</SelectItem>
                <SelectItem value="安全设置">安全设置</SelectItem>
                <SelectItem value="数据管理">数据管理</SelectItem>
                <SelectItem value="系统设置">系统设置</SelectItem>
                <SelectItem value="通知设置">通知设置</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredConfigs.map((config) => (
              <Card key={config.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{config.name}</h3>
                      <Badge variant="outline">{config.category}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{config.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">当前值:</span>
                      {config.type === "boolean" ? (
                        <Badge className={config.value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {config.value ? "启用" : "禁用"}
                        </Badge>
                      ) : (
                        <span className="font-medium">{config.value.toString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {config.editable && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedConfig(config)
                          setIsConfigDialogOpen(true)
                        }}
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        编辑
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索日志..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              导出日志
            </Button>
          </div>

          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="p-4">
                <div className="flex items-start gap-4">
                  <Badge className={getLogLevelColor(log.level)}>{log.level.toUpperCase()}</Badge>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900">{log.module}</span>
                      <span className="text-xs text-slate-500">{log.timestamp.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-slate-700 mb-1">{log.message}</p>
                    {log.details && <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded">{log.details}</p>}
                    {log.user && (
                      <div className="flex items-center gap-1 mt-2">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">操作用户: {log.user}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 配置编辑对话框 */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑配置</DialogTitle>
            <DialogDescription>修改系统配置项，请谨慎操作</DialogDescription>
          </DialogHeader>
          {selectedConfig && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="config-name">配置名称</Label>
                <Input id="config-name" value={selectedConfig.name} disabled />
              </div>
              <div>
                <Label htmlFor="config-description">描述</Label>
                <Textarea id="config-description" value={selectedConfig.description} disabled />
              </div>
              <div>
                <Label htmlFor="config-value">配置值</Label>
                {selectedConfig.type === "boolean" ? (
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch
                      id="config-value"
                      checked={selectedConfig.value as boolean}
                      onCheckedChange={(checked) => setSelectedConfig({ ...selectedConfig, value: checked })}
                    />
                    <Label htmlFor="config-value">{selectedConfig.value ? "启用" : "禁用"}</Label>
                  </div>
                ) : selectedConfig.type === "select" ? (
                  <Select
                    value={selectedConfig.value as string}
                    onValueChange={(value) => setSelectedConfig({ ...selectedConfig, value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedConfig.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="config-value"
                    type={selectedConfig.type === "number" ? "number" : "text"}
                    value={selectedConfig.value.toString()}
                    onChange={(e) =>
                      setSelectedConfig({
                        ...selectedConfig,
                        value: selectedConfig.type === "number" ? Number.parseInt(e.target.value) || 0 : e.target.value,
                      })
                    }
                  />
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={() => handleConfigSave(selectedConfig)}>保存</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
