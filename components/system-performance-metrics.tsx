"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Database,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Settings,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface SystemMetrics {
  cpu: {
    usage: number
    cores: number
    temperature: number
  }
  memory: {
    used: number
    total: number
    available: number
  }
  disk: {
    used: number
    total: number
    iops: number
  }
  network: {
    inbound: number
    outbound: number
    latency: number
  }
  database: {
    connections: number
    queries: number
    responseTime: number
  }
}

export function SystemPerformanceMetrics() {
  const router = useRouter()
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: { usage: 45, cores: 8, temperature: 65 },
    memory: { used: 10.8, total: 16, available: 5.2 },
    disk: { used: 160, total: 500, iops: 1250 },
    network: { inbound: 125.6, outbound: 89.3, latency: 12 },
    database: { connections: 45, queries: 1247, responseTime: 23 },
  })
  const [isLoading, setIsLoading] = useState(false)

  // 模拟实时指标更新
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpu: {
          ...prev.cpu,
          usage: Math.max(20, Math.min(90, prev.cpu.usage + Math.floor(Math.random() * 10 - 5))),
        },
        network: {
          ...prev.network,
          latency: Math.max(5, Math.min(50, prev.network.latency + Math.floor(Math.random() * 6 - 3))),
        },
        database: {
          ...prev.database,
          queries: prev.database.queries + Math.floor(Math.random() * 20),
        },
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setMetrics({
      cpu: { usage: 45 + Math.floor(Math.random() * 20), cores: 8, temperature: 65 },
      memory: { used: 10.8 + Math.random() * 2, total: 16, available: 5.2 },
      disk: { used: 160 + Math.floor(Math.random() * 10), total: 500, iops: 1250 },
      network: { inbound: 125.6, outbound: 89.3, latency: 12 + Math.floor(Math.random() * 10) },
      database: { connections: 45, queries: 1247 + Math.floor(Math.random() * 100), responseTime: 23 },
    })
    setIsLoading(false)
  }

  const getStatusColor = (value: number, threshold: { warning: number; critical: number }) => {
    if (value >= threshold.critical) return "text-red-600 bg-red-50 border-red-200"
    if (value >= threshold.warning) return "text-amber-600 bg-amber-50 border-amber-200"
    return "text-emerald-600 bg-emerald-50 border-emerald-200"
  }

  const getProgressColor = (value: number, threshold: { warning: number; critical: number }) => {
    if (value >= threshold.critical) return "bg-gradient-to-r from-red-400 to-red-500"
    if (value >= threshold.warning) return "bg-gradient-to-r from-amber-400 to-amber-500"
    return "bg-gradient-to-r from-emerald-400 to-emerald-500"
  }

  return (
    <div className="space-y-6">
      {/* 性能指标头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">系统性能指标</h3>
          <p className="text-sm text-slate-600">实时监控系统各项性能参数</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            刷新
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/performance")}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            优化
          </Button>
        </div>
      </div>

      {/* 核心性能指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CPU性能 */}
        <Card className="border-l-4 border-l-sky-400 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cpu className="w-5 h-5 text-sky-600" />
              CPU性能
              <Badge className={getStatusColor(metrics.cpu.usage, { warning: 70, critical: 90 })}>
                {metrics.cpu.usage < 70 ? "正常" : metrics.cpu.usage < 90 ? "警告" : "严重"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">使用率</span>
                <span className="text-lg font-bold text-sky-600">{metrics.cpu.usage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(metrics.cpu.usage, {
                    warning: 70,
                    critical: 90,
                  })}`}
                  style={{ width: `${metrics.cpu.usage}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">核心数</p>
                <p className="font-semibold">{metrics.cpu.cores}核</p>
              </div>
              <div>
                <p className="text-slate-600">温度</p>
                <p className="font-semibold">{metrics.cpu.temperature}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 内存使用 */}
        <Card className="border-l-4 border-l-purple-400 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MemoryStick className="w-5 h-5 text-purple-600" />
              内存使用
              <Badge
                className={getStatusColor((metrics.memory.used / metrics.memory.total) * 100, {
                  warning: 80,
                  critical: 95,
                })}
              >
                {(metrics.memory.used / metrics.memory.total) * 100 < 80
                  ? "正常"
                  : (metrics.memory.used / metrics.memory.total) * 100 < 95
                    ? "警告"
                    : "严重"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">使用率</span>
                <span className="text-lg font-bold text-purple-600">
                  {((metrics.memory.used / metrics.memory.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(
                    (metrics.memory.used / metrics.memory.total) * 100,
                    { warning: 80, critical: 95 },
                  )}`}
                  style={{ width: `${(metrics.memory.used / metrics.memory.total) * 100}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">已用</p>
                <p className="font-semibold">{metrics.memory.used.toFixed(1)}GB</p>
              </div>
              <div>
                <p className="text-slate-600">可用</p>
                <p className="font-semibold">{metrics.memory.available.toFixed(1)}GB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 磁盘I/O */}
        <Card className="border-l-4 border-l-emerald-400 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HardDrive className="w-5 h-5 text-emerald-600" />
              磁盘I/O
              <Badge
                className={getStatusColor((metrics.disk.used / metrics.disk.total) * 100, {
                  warning: 80,
                  critical: 95,
                })}
              >
                {(metrics.disk.used / metrics.disk.total) * 100 < 80
                  ? "正常"
                  : (metrics.disk.used / metrics.disk.total) * 100 < 95
                    ? "警告"
                    : "严重"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">使用率</span>
                <span className="text-lg font-bold text-emerald-600">
                  {((metrics.disk.used / metrics.disk.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(
                    (metrics.disk.used / metrics.disk.total) * 100,
                    { warning: 80, critical: 95 },
                  )}`}
                  style={{ width: `${(metrics.disk.used / metrics.disk.total) * 100}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">IOPS</p>
                <p className="font-semibold">{metrics.disk.iops.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-600">可用</p>
                <p className="font-semibold">{metrics.disk.total - metrics.disk.used}GB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 网络和数据库性能 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 网络性能 */}
        <Card className="border-t-4 border-t-amber-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5 text-amber-600" />
              网络性能
              <Badge className={getStatusColor(metrics.network.latency, { warning: 30, critical: 50 })}>
                {metrics.network.latency < 30 ? "优秀" : metrics.network.latency < 50 ? "良好" : "较差"}
              </Badge>
            </CardTitle>
            <CardDescription>网络流量和延迟监控</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-600">延迟</p>
                <p className="text-xl font-bold text-amber-600">{metrics.network.latency}ms</p>
                <div className="flex items-center justify-center mt-1">
                  {metrics.network.latency < 20 ? (
                    <TrendingDown className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingUp className="w-3 h-3 text-amber-500" />
                  )}
                </div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-slate-600">入站</p>
                <p className="text-xl font-bold text-blue-600">{metrics.network.inbound}MB/s</p>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="w-3 h-3 text-blue-500" />
                </div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-slate-600">出站</p>
                <p className="text-xl font-bold text-green-600">{metrics.network.outbound}MB/s</p>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 数据库性能 */}
        <Card className="border-t-4 border-t-indigo-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              数据库性能
              <Badge className={getStatusColor(metrics.database.responseTime, { warning: 50, critical: 100 })}>
                {metrics.database.responseTime < 50 ? "优秀" : metrics.database.responseTime < 100 ? "良好" : "较差"}
              </Badge>
            </CardTitle>
            <CardDescription>数据库连接和查询性能</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-sm text-slate-600">连接数</p>
                <p className="text-xl font-bold text-indigo-600">{metrics.database.connections}</p>
                <p className="text-xs text-slate-500">/ 100</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-slate-600">查询数</p>
                <p className="text-xl font-bold text-purple-600">{metrics.database.queries.toLocaleString()}</p>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="w-3 h-3 text-purple-500" />
                </div>
              </div>
              <div className="text-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-sm text-slate-600">响应时间</p>
                <p className="text-xl font-bold text-teal-600">{metrics.database.responseTime}ms</p>
                <div className="flex items-center justify-center mt-1">
                  <CheckCircle className="w-3 h-3 text-teal-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
