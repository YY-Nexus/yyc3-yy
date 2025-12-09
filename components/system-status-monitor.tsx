"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  Activity,
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  Shield,
  CheckCircle,
  RefreshCw,
  Settings,
  TrendingUp,
  TrendingDown,
  Zap,
  Globe,
  Monitor,
  Clock,
} from "lucide-react"

export function SystemStatusMonitor() {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [systemData, setSystemData] = useState({
    cpu: 45,
    memory: 67,
    disk: 34,
    network: 89,
    database: 92,
    security: 98,
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // 模拟数据刷新
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 模拟数据变化
    setSystemData({
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      disk: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 100),
      database: Math.floor(Math.random() * 100),
      security: Math.floor(Math.random() * 100),
    })

    setIsRefreshing(false)
  }

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  const getStatusColor = (value: number) => {
    if (value >= 80) return "text-green-600"
    if (value >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (value: number) => {
    if (value >= 80) return { variant: "default" as const, text: "正常", color: "bg-green-100 text-green-800" }
    if (value >= 60) return { variant: "secondary" as const, text: "警告", color: "bg-yellow-100 text-yellow-800" }
    return { variant: "destructive" as const, text: "异常", color: "bg-red-100 text-red-800" }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和操作按钮 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">系统监控</h1>
          <p className="text-slate-600 mt-1">实时监控系统性能和运行状态</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            刷新数据
          </Button>
          <Button
            onClick={() => handleCardClick("/settings")}
            className="bg-sky-600 hover:bg-sky-700 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            系统设置
          </Button>
        </div>
      </div>

      {/* 系统状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CPU使用率 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50 border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/performance")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-sky-600 rounded-xl">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <Badge className={getStatusBadge(systemData.cpu).color}>{getStatusBadge(systemData.cpu).text}</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                CPU使用率
              </h3>
              <p className={`text-3xl font-bold ${getStatusColor(systemData.cpu)}`}>{systemData.cpu}%</p>
              <div className="flex items-center gap-2 text-sm">
                {systemData.cpu >= 80 ? (
                  <TrendingUp className="w-4 h-4 text-red-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-500" />
                )}
                <span className={systemData.cpu >= 80 ? "text-red-600" : "text-green-600"}>
                  {systemData.cpu >= 80 ? "高负载" : "正常"}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>使用率</span>
                  <span>{systemData.cpu}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${systemData.cpu}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 内存使用 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/performance")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <MemoryStick className="w-8 h-8 text-white" />
              </div>
              <Badge className={getStatusBadge(systemData.memory).color}>
                {getStatusBadge(systemData.memory).text}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                内存使用
              </h3>
              <p className={`text-3xl font-bold ${getStatusColor(systemData.memory)}`}>{systemData.memory}%</p>
              <div className="flex items-center gap-2 text-sm">
                <MemoryStick className="w-4 h-4 text-green-500" />
                <span className="text-green-600">8GB / 16GB</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>使用率</span>
                  <span>{systemData.memory}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${systemData.memory}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 磁盘空间 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/performance")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl">
                <HardDrive className="w-8 h-8 text-white" />
              </div>
              <Badge className={getStatusBadge(systemData.disk).color}>{getStatusBadge(systemData.disk).text}</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                磁盘空间
              </h3>
              <p className={`text-3xl font-bold ${getStatusColor(systemData.disk)}`}>{systemData.disk}%</p>
              <div className="flex items-center gap-2 text-sm">
                <HardDrive className="w-4 h-4 text-orange-500" />
                <span className="text-orange-600">340GB / 1TB</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>使用率</span>
                  <span>{systemData.disk}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${systemData.disk}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 网络状态 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-50 border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/performance")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <Badge className={getStatusBadge(systemData.network).color}>
                {getStatusBadge(systemData.network).text}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                网络状态
              </h3>
              <p className={`text-3xl font-bold ${getStatusColor(systemData.network)}`}>{systemData.network}%</p>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-purple-500" />
                <span className="text-purple-600">连接正常</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>连接质量</span>
                  <span>{systemData.network}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${systemData.network}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 数据库状态 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 border-l-4 border-l-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/data-integration")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <Badge className={getStatusBadge(systemData.database).color}>
                {getStatusBadge(systemData.database).text}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                数据库状态
              </h3>
              <p className={`text-3xl font-bold ${getStatusColor(systemData.database)}`}>{systemData.database}%</p>
              <div className="flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4 text-indigo-500" />
                <span className="text-indigo-600">运行正常</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>健康度</span>
                  <span>{systemData.database}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${systemData.database}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 安全状态 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-cyan-50 to-teal-50 border-l-4 border-l-cyan-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/security")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge className={getStatusBadge(systemData.security).color}>
                {getStatusBadge(systemData.security).text}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                安全状态
              </h3>
              <p className={`text-3xl font-bold ${getStatusColor(systemData.security)}`}>{systemData.security}%</p>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-cyan-500" />
                <span className="text-cyan-600">防护正常</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>安全等级</span>
                  <span>{systemData.security}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${systemData.security}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 系统服务状态 */}
      <Card className="bg-white border border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-slate-800">系统服务状态</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleCardClick("/system-management")}>
              <Monitor className="w-4 h-4 mr-2" />
              管理服务
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Web服务器", status: "running", uptime: "99.9%", icon: Server },
              { name: "数据库服务", status: "running", uptime: "99.8%", icon: Database },
              { name: "缓存服务", status: "running", uptime: "99.7%", icon: Zap },
              { name: "文件服务", status: "running", uptime: "99.9%", icon: HardDrive },
              { name: "邮件服务", status: "warning", uptime: "98.5%", icon: Globe },
              { name: "备份服务", status: "running", uptime: "99.6%", icon: Shield },
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      service.status === "running"
                        ? "bg-green-100 text-green-600"
                        : service.status === "warning"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    <service.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">{service.name}</h4>
                    <p className="text-sm text-slate-600">运行时间: {service.uptime}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    service.status === "running"
                      ? "default"
                      : service.status === "warning"
                        ? "secondary"
                        : "destructive"
                  }
                  className={
                    service.status === "running"
                      ? "bg-green-100 text-green-800"
                      : service.status === "warning"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {service.status === "running" ? "正常" : service.status === "warning" ? "警告" : "异常"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 系统日志 */}
      <Card className="bg-white border border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-slate-800">系统日志</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleCardClick("/system-management")}>
              <Clock className="w-4 h-4 mr-2" />
              查看全部
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "2024-01-15 14:30:25",
                level: "INFO",
                message: "系统启动完成",
                type: "info",
              },
              {
                time: "2024-01-15 14:25:12",
                level: "WARN",
                message: "内存使用率超过70%",
                type: "warning",
              },
              {
                time: "2024-01-15 14:20:08",
                level: "INFO",
                message: "数据库连接池已初始化",
                type: "info",
              },
              {
                time: "2024-01-15 14:15:33",
                level: "ERROR",
                message: "邮件服务连接超时",
                type: "error",
              },
            ].map((log, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    log.type === "info"
                      ? "bg-blue-100 text-blue-800"
                      : log.type === "warning"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {log.level}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800">{log.message}</p>
                  <p className="text-xs text-slate-500">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
