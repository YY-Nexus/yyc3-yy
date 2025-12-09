"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  Download,
  Share,
  BarChart3,
  PieChartIcon,
  Activity,
  Users,
  DollarSign,
  Eye,
  MousePointer,
  Clock,
  Target,
  Database,
  Settings,
  Plus,
  Search,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ReportData {
  id: string
  name: string
  type: "bar" | "line" | "pie" | "area" | "scatter" | "radar"
  category: string
  description: string
  data: any[]
  metrics: string[]
  filters: any[]
  createdAt: Date
  lastUpdated: Date
  isPublic: boolean
  views: number
}

interface DashboardWidget {
  id: string
  title: string
  type: "chart" | "metric" | "table" | "text"
  size: "small" | "medium" | "large"
  data: any
  position: { x: number; y: number }
}

export function AdvancedBIReports() {
  const [selectedReport, setSelectedReport] = useState<string>("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 模拟数据
  const salesData = [
    { month: "1月", sales: 4000, profit: 2400, orders: 240 },
    { month: "2月", sales: 3000, profit: 1398, orders: 221 },
    { month: "3月", sales: 2000, profit: 9800, orders: 229 },
    { month: "4月", sales: 2780, profit: 3908, orders: 200 },
    { month: "5月", sales: 1890, profit: 4800, orders: 218 },
    { month: "6月", sales: 2390, profit: 3800, orders: 250 },
  ]

  const customerData = [
    { name: "新客户", value: 400, color: "#0088FE" },
    { name: "回头客", value: 300, color: "#00C49F" },
    { name: "VIP客户", value: 300, color: "#FFBB28" },
    { name: "流失客户", value: 200, color: "#FF8042" },
  ]

  const performanceData = [
    { subject: "销售额", A: 120, B: 110, fullMark: 150 },
    { subject: "客户满意度", A: 98, B: 130, fullMark: 150 },
    { subject: "产品质量", A: 86, B: 130, fullMark: 150 },
    { subject: "服务响应", A: 99, B: 100, fullMark: 150 },
    { subject: "市场占有率", A: 85, B: 90, fullMark: 150 },
    { subject: "品牌知名度", A: 65, B: 85, fullMark: 150 },
  ]

  const reports: ReportData[] = [
    {
      id: "1",
      name: "销售业绩分析",
      type: "bar",
      category: "销售",
      description: "月度销售额和利润分析",
      data: salesData,
      metrics: ["销售额", "利润", "订单数"],
      filters: ["时间范围", "产品类别", "销售区域"],
      createdAt: new Date("2024-01-15"),
      lastUpdated: new Date(),
      isPublic: true,
      views: 1250,
    },
    {
      id: "2",
      name: "客户分布统计",
      type: "pie",
      category: "客户",
      description: "客户类型分布情况",
      data: customerData,
      metrics: ["客户数量", "客户价值"],
      filters: ["客户类型", "注册时间", "地理位置"],
      createdAt: new Date("2024-01-20"),
      lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPublic: false,
      views: 890,
    },
    {
      id: "3",
      name: "综合绩效雷达图",
      type: "radar",
      category: "绩效",
      description: "多维度绩效评估",
      data: performanceData,
      metrics: ["各项指标得分"],
      filters: ["评估周期", "部门", "指标类型"],
      createdAt: new Date("2024-02-01"),
      lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isPublic: true,
      views: 567,
    },
  ]

  const dashboardWidgets: DashboardWidget[] = [
    {
      id: "1",
      title: "总销售额",
      type: "metric",
      size: "small",
      data: { value: "¥2,345,678", change: "+12.5%", trend: "up" },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      title: "新增客户",
      type: "metric",
      size: "small",
      data: { value: "1,234", change: "+8.3%", trend: "up" },
      position: { x: 1, y: 0 },
    },
    {
      id: "3",
      title: "订单转化率",
      type: "metric",
      size: "small",
      data: { value: "23.4%", change: "-2.1%", trend: "down" },
      position: { x: 2, y: 0 },
    },
    {
      id: "4",
      title: "销售趋势",
      type: "chart",
      size: "large",
      data: salesData,
      position: { x: 0, y: 1 },
    },
  ]

  const handleCreateReport = () => {
    console.log("创建新报表")
    setIsCreateDialogOpen(false)
  }

  const handleExportReport = (reportId: string) => {
    console.log("导出报表:", reportId)
  }

  const handleShareReport = (reportId: string) => {
    console.log("分享报表:", reportId)
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderChart = (report: ReportData) => {
    switch (report.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={report.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="销售额" />
              <Bar dataKey="profit" fill="#10b981" name="利润" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={report.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {report.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      case "radar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={report.data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="当前" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Radar name="目标" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )
      default:
        return <div className="h-64 flex items-center justify-center text-slate-500">暂无图表数据</div>
    }
  }

  const getMetricIcon = (title: string) => {
    switch (title) {
      case "总销售额":
        return <DollarSign className="w-6 h-6" />
      case "新增客户":
        return <Users className="w-6 h-6" />
      case "订单转化率":
        return <Target className="w-6 h-6" />
      default:
        return <Activity className="w-6 h-6" />
    }
  }

  const getMetricColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">高级BI分析</h1>
          <p className="text-slate-600 mt-2">智能数据分析和可视化报表</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出数据
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                创建报表
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建新报表</DialogTitle>
                <DialogDescription>配置报表参数和数据源</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-name">报表名称</Label>
                    <Input id="report-name" placeholder="输入报表名称" />
                  </div>
                  <div>
                    <Label htmlFor="report-type">图表类型</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择图表类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">柱状图</SelectItem>
                        <SelectItem value="line">折线图</SelectItem>
                        <SelectItem value="pie">饼图</SelectItem>
                        <SelectItem value="area">面积图</SelectItem>
                        <SelectItem value="radar">雷达图</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="data-source">数据源</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择数据源" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">销售数据</SelectItem>
                        <SelectItem value="customer">客户数据</SelectItem>
                        <SelectItem value="product">产品数据</SelectItem>
                        <SelectItem value="finance">财务数据</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-category">报表分类</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">销售</SelectItem>
                        <SelectItem value="customer">客户</SelectItem>
                        <SelectItem value="finance">财务</SelectItem>
                        <SelectItem value="operation">运营</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="time-range">时间范围</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择时间范围" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">最近7天</SelectItem>
                        <SelectItem value="30d">最近30天</SelectItem>
                        <SelectItem value="90d">最近90天</SelectItem>
                        <SelectItem value="1y">最近1年</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="report-description">报表描述</Label>
                    <Textarea id="report-description" placeholder="输入报表描述" />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Switch id="public-report" />
                <Label htmlFor="public-report">公开报表</Label>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleCreateReport}>创建</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">数据仪表板</TabsTrigger>
          <TabsTrigger value="reports">报表管理</TabsTrigger>
          <TabsTrigger value="analytics">深度分析</TabsTrigger>
          <TabsTrigger value="settings">配置管理</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* 关键指标卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardWidgets
              .filter((widget) => widget.type === "metric")
              .map((widget) => (
                <Card
                  key={widget.id}
                  className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 border-l-4 border-l-indigo-500 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">{widget.title}</p>
                      <p className="text-2xl font-bold text-indigo-600">{widget.data.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`text-sm font-medium ${getMetricColor(widget.data.trend)}`}>
                          {widget.data.change}
                        </span>
                        <span className="text-xs text-slate-500">vs 上月</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      {getMetricIcon(widget.title)}
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          {/* 主要图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-indigo-500 p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  销售趋势分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-indigo-500 p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-indigo-600" />
                  客户分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 实时数据表格 */}
          <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-indigo-500 p-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                实时数据监控
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "在线用户", value: "1,234", icon: Users, color: "text-blue-600" },
                  { label: "页面浏览", value: "45,678", icon: Eye, color: "text-green-600" },
                  { label: "点击率", value: "12.3%", icon: MousePointer, color: "text-purple-600" },
                  { label: "平均停留", value: "3:45", icon: Clock, color: "text-orange-600" },
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                    <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                    <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                    <p className="text-sm text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索报表..."
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
                <SelectItem value="销售">销售</SelectItem>
                <SelectItem value="客户">客户</SelectItem>
                <SelectItem value="财务">财务</SelectItem>
                <SelectItem value="绩效">绩效</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">最近7天</SelectItem>
                <SelectItem value="30d">最近30天</SelectItem>
                <SelectItem value="90d">最近90天</SelectItem>
                <SelectItem value="1y">最近1年</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 border-l-4 border-l-indigo-500 p-6 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:translate-x-1 transition-transform duration-300">
                      {report.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">{report.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{report.category}</Badge>
                      <Badge className={report.isPublic ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {report.isPublic ? "公开" : "私有"}
                      </Badge>
                      <span className="text-xs text-slate-500">{report.views} 次查看</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShareReport(report.id)}>
                      <Share className="w-3 h-3 mr-1" />
                      分享
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExportReport(report.id)}>
                      <Download className="w-3 h-3 mr-1" />
                      导出
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-3 h-3 mr-1" />
                      设置
                    </Button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">{renderChart(report)}</div>

                <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
                  <span>创建时间: {report.createdAt.toLocaleDateString()}</span>
                  <span>最后更新: {report.lastUpdated.toLocaleString()}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-indigo-500 p-6">
              <CardHeader className="pb-4">
                <CardTitle>预测分析</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="实际销售" />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="预测销售"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-indigo-500 p-6">
              <CardHeader className="pb-4">
                <CardTitle>异常检测</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "销售额异常", status: "正常", color: "text-green-600", value: "0 个异常点" },
                    { metric: "客户流失率", status: "警告", color: "text-yellow-600", value: "2 个异常点" },
                    { metric: "库存周转", status: "异常", color: "text-red-600", value: "5 个异常点" },
                    { metric: "成本控制", status: "正常", color: "text-green-600", value: "0 个异常点" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.metric}</h4>
                        <p className="text-sm text-slate-600">{item.value}</p>
                      </div>
                      <Badge
                        className={
                          item.color === "text-green-600"
                            ? "bg-green-100 text-green-800"
                            : item.color === "text-yellow-600"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-indigo-500 p-6">
            <CardHeader className="pb-4">
              <CardTitle>智能洞察</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "销售机会",
                    insight: "华东地区销售额增长潜力最大，建议加大投入",
                    confidence: "95%",
                    impact: "高",
                  },
                  {
                    title: "成本优化",
                    insight: "物流成本可通过路线优化降低15%",
                    confidence: "87%",
                    impact: "中",
                  },
                  {
                    title: "客户留存",
                    insight: "VIP客户满意度下降，需要关注服务质量",
                    confidence: "92%",
                    impact: "高",
                  },
                ].map((item, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600 mb-3">{item.insight}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">置信度: {item.confidence}</span>
                      <Badge variant={item.impact === "高" ? "destructive" : "secondary"}>{item.impact}影响</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-indigo-500 p-6">
              <h3 className="text-lg font-semibold mb-4">数据源配置</h3>
              <div className="space-y-4">
                {[
                  { name: "销售数据库", status: "已连接", lastSync: "2分钟前" },
                  { name: "客户管理系统", status: "已连接", lastSync: "5分钟前" },
                  { name: "财务系统", status: "连接中", lastSync: "10分钟前" },
                  { name: "库存管理", status: "已连接", lastSync: "1分钟前" },
                ].map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-indigo-600" />
                      <div>
                        <h4 className="font-medium">{source.name}</h4>
                        <p className="text-sm text-slate-600">最后同步: {source.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          source.status === "已连接" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {source.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-indigo-500 p-6">
              <h3 className="text-lg font-semibold mb-4">报表设置</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">自动刷新</h4>
                    <p className="text-sm text-slate-600">定期更新报表数据</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">数据缓存</h4>
                    <p className="text-sm text-slate-600">缓存数据以提高性能</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">异常告警</h4>
                    <p className="text-sm text-slate-600">数据异常时发送通知</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-indigo-500 p-6">
              <h3 className="text-lg font-semibold mb-4">导出设置</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="export-format">默认导出格式</Label>
                  <Select defaultValue="excel">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="json">JSON (.json)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="export-quality">图表质量</Label>
                  <Select defaultValue="high">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低质量</SelectItem>
                      <SelectItem value="medium">中等质量</SelectItem>
                      <SelectItem value="high">高质量</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
