"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  RefreshCw,
  Download,
  Eye,
  Target,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
} from "lucide-react"

export function DashboardContent() {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // 模拟数据刷新
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const handleExport = () => {
    // 模拟导出功能
    console.log("导出报表...")
  }

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和操作按钮 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">运营中心</h1>
          <p className="text-slate-600 mt-1">实时监控业务数据，掌握企业运营状况</p>
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
          <Button onClick={handleExport} className="bg-sky-600 hover:bg-sky-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            导出报表
          </Button>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 销售业绩卡片 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50 border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/analytics")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-sky-600 rounded-xl">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">月度目标</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                销售业绩
              </h3>
              <p className="text-3xl font-bold text-blue-600">¥2,847,392</p>
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">+12.5%</span>
                <span className="text-slate-600">较上月</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>完成进度</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 客户管理卡片 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/customers")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-300">活跃用户</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                客户管理
              </h3>
              <p className="text-3xl font-bold text-green-600">15,847</p>
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">+8.3%</span>
                <span className="text-slate-600">新增客户</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>活跃度</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 财务状况卡片 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/finance")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-orange-100 text-orange-800 border-orange-300">实时数据</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                财务状况
              </h3>
              <p className="text-3xl font-bold text-orange-600">¥8,924,156</p>
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">+15.2%</span>
                <span className="text-slate-600">净利润</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>预算执行</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 任务管理卡片 */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-50 border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/tasks")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">进行中</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                任务管理
              </h3>
              <p className="text-3xl font-bold text-purple-600">234</p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-blue-600 font-medium">45</span>
                <span className="text-slate-600">待处理</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>完成率</span>
                  <span>76%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: "76%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快速操作区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 数据分析 */}
        <Card
          className="bg-gradient-to-br from-indigo-50 to-blue-50 border-l-4 border-l-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/analytics")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">实时</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg mb-2 text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
              数据分析
            </CardTitle>
            <CardDescription className="text-slate-600 mb-4">深入了解业务数据和趋势</CardDescription>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">今日访问量</span>
                <span className="font-medium text-indigo-600">12,456</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">转化率</span>
                <span className="font-medium text-indigo-600">8.5%</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>数据完整性</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OKR管理 */}
        <Card
          className="bg-gradient-to-br from-cyan-50 to-teal-50 border-l-4 border-l-cyan-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/okr")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-cyan-100 text-cyan-800 border-cyan-300">季度</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg mb-2 text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
              OKR管理
            </CardTitle>
            <CardDescription className="text-slate-600 mb-4">目标与关键结果跟踪</CardDescription>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">本季度目标</span>
                <span className="font-medium text-cyan-600">8/10</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">关键结果</span>
                <span className="font-medium text-cyan-600">15/18</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>完成进度</span>
                  <span>83%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: "83%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 系统状态 */}
        <Card
          className="bg-gradient-to-br from-pink-50 to-rose-50 border-l-4 border-l-pink-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick("/system-monitor")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-300">正常</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg mb-2 text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
              系统状态
            </CardTitle>
            <CardDescription className="text-slate-600 mb-4">实时系统监控和性能</CardDescription>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">CPU使用率</span>
                <span className="font-medium text-pink-600">45%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">内存使用</span>
                <span className="font-medium text-pink-600">67%</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>系统健康度</span>
                  <span>98%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: "98%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近活动 */}
      <Card className="bg-white border border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-slate-800">最近活动</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleCardClick("/notifications")}>
              <Eye className="w-4 h-4 mr-2" />
              查看全部
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "新客户注册",
                description: "张三完成了账户注册",
                time: "5分钟前",
                type: "success",
                icon: Users,
              },
              {
                title: "订单完成",
                description: "订单 #12345 已完成支付",
                time: "15分钟前",
                type: "info",
                icon: ShoppingCart,
              },
              {
                title: "系统更新",
                description: "系统已更新到最新版本",
                time: "1小时前",
                type: "warning",
                icon: RefreshCw,
              },
              {
                title: "数据备份",
                description: "每日数据备份已完成",
                time: "2小时前",
                type: "success",
                icon: CheckCircle,
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div
                  className={`p-2 rounded-lg ${
                    activity.type === "success"
                      ? "bg-green-100 text-green-600"
                      : activity.type === "warning"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{activity.title}</h4>
                  <p className="text-sm text-slate-600">{activity.description}</p>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
