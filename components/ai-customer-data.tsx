"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { commonStyles, formatCurrency, formatDate } from "@/lib/design-system"
import {
  Users,
  TrendingUp,
  Target,
  Brain,
  Search,
  Filter,
  Download,
  Share2,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Star,
  ShoppingCart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Cpu,
} from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  location: string
  segment: string
  value: number
  status: "active" | "inactive" | "potential" | "churned"
  lastActivity: string
  joinDate: string
  totalOrders: number
  averageOrderValue: number
  satisfactionScore: number
  engagementLevel: "high" | "medium" | "low"
  preferredChannel: string
  tags: string[]
  aiInsights: {
    churnRisk: number
    lifetimeValue: number
    nextBestAction: string
    personalityType: string
    buyingPattern: string
    recommendations: string[]
  }
}

interface CustomerSegment {
  name: string
  count: number
  percentage: number
  value: number
  growth: number
  color: string
}

interface AIInsight {
  type: "opportunity" | "risk" | "trend" | "recommendation"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  confidence: number
  actionable: boolean
  category: string
}

export function AiCustomerData() {
  const { toast } = useToast()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [segments, setSegments] = useState<CustomerSegment[]>([])
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [sortBy, setSortBy] = useState("value")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  // 模拟数据加载
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 生成模拟客户数据
      const mockCustomers: Customer[] = [
        {
          id: "1",
          name: "张明华",
          email: "zhang.minghua@example.com",
          phone: "138-0013-8888",
          company: "华润集团",
          location: "北京市朝阳区",
          segment: "企业客户",
          value: 2580000,
          status: "active",
          lastActivity: "2024-01-15",
          joinDate: "2023-03-15",
          totalOrders: 45,
          averageOrderValue: 57333,
          satisfactionScore: 92,
          engagementLevel: "high",
          preferredChannel: "电话",
          tags: ["VIP", "长期合作", "大客户"],
          aiInsights: {
            churnRisk: 15,
            lifetimeValue: 5200000,
            nextBestAction: "推荐高端定制服务",
            personalityType: "决策型",
            buyingPattern: "季度性采购",
            recommendations: ["提供专属客户经理", "定制化产品方案", "优先技术支持"],
          },
        },
        {
          id: "2",
          name: "李雅婷",
          email: "li.yating@example.com",
          phone: "139-0013-6666",
          company: "个人客户",
          location: "上海市浦东新区",
          segment: "高端个人",
          value: 680000,
          status: "active",
          lastActivity: "2024-01-12",
          joinDate: "2023-08-20",
          totalOrders: 12,
          averageOrderValue: 56667,
          satisfactionScore: 88,
          engagementLevel: "high",
          preferredChannel: "微信",
          tags: ["设计师", "品质追求", "口碑传播"],
          aiInsights: {
            churnRisk: 25,
            lifetimeValue: 1200000,
            nextBestAction: "邀请参加新品发布会",
            personalityType: "完美主义",
            buyingPattern: "冲动性购买",
            recommendations: ["个性化设计服务", "限量版产品推荐", "社交媒体互动"],
          },
        },
        {
          id: "3",
          name: "王建国",
          email: "wang.jianguo@example.com",
          phone: "137-0013-5555",
          company: "建国装饰",
          location: "广州市天河区",
          segment: "合作伙伴",
          value: 1250000,
          status: "active",
          lastActivity: "2024-01-10",
          joinDate: "2022-11-10",
          totalOrders: 28,
          averageOrderValue: 44643,
          satisfactionScore: 85,
          engagementLevel: "medium",
          preferredChannel: "邮件",
          tags: ["装饰公司", "批量采购", "价格敏感"],
          aiInsights: {
            churnRisk: 35,
            lifetimeValue: 2100000,
            nextBestAction: "提供批量采购优惠",
            personalityType: "实用主义",
            buyingPattern: "项目驱动",
            recommendations: ["批量折扣方案", "项目合作模式", "技术培训支持"],
          },
        },
        {
          id: "4",
          name: "陈美玲",
          email: "chen.meiling@example.com",
          phone: "135-0013-7777",
          company: "个人客户",
          location: "深圳市南山区",
          segment: "新兴客户",
          value: 180000,
          status: "potential",
          lastActivity: "2024-01-08",
          joinDate: "2023-12-01",
          totalOrders: 3,
          averageOrderValue: 60000,
          satisfactionScore: 78,
          engagementLevel: "medium",
          preferredChannel: "在线客服",
          tags: ["年轻客户", "科技爱好者", "环保意识"],
          aiInsights: {
            churnRisk: 45,
            lifetimeValue: 450000,
            nextBestAction: "提供智能家居解决方案",
            personalityType: "探索型",
            buyingPattern: "研究型购买",
            recommendations: ["智能产品推荐", "环保材料介绍", "在线体验服务"],
          },
        },
        {
          id: "5",
          name: "刘德华",
          email: "liu.dehua@example.com",
          phone: "136-0013-9999",
          company: "德华地产",
          location: "成都市锦江区",
          segment: "企业客户",
          value: 3200000,
          status: "active",
          lastActivity: "2024-01-14",
          joinDate: "2022-05-20",
          totalOrders: 67,
          averageOrderValue: 47761,
          satisfactionScore: 94,
          engagementLevel: "high",
          preferredChannel: "面谈",
          tags: ["地产商", "长期合作", "战略客户"],
          aiInsights: {
            churnRisk: 10,
            lifetimeValue: 8500000,
            nextBestAction: "续签年度合作协议",
            personalityType: "关系型",
            buyingPattern: "合同制采购",
            recommendations: ["战略合作升级", "独家供应协议", "联合市场推广"],
          },
        },
      ]

      // 生成客户细分数据
      const mockSegments: CustomerSegment[] = [
        { name: "企业客户", count: 156, percentage: 35, value: 12500000, growth: 15.2, color: "bg-blue-500" },
        { name: "高端个人", count: 89, percentage: 20, value: 6800000, growth: 22.8, color: "bg-purple-500" },
        { name: "合作伙伴", count: 67, percentage: 15, value: 8900000, growth: 8.5, color: "bg-green-500" },
        { name: "新兴客户", count: 134, percentage: 30, value: 3200000, growth: 45.6, color: "bg-orange-500" },
      ]

      // 生成AI洞察
      const mockInsights: AIInsight[] = [
        {
          type: "opportunity",
          title: "高价值客户增长机会",
          description: "识别到23个潜在高价值客户，预计可带来180万元收入增长",
          impact: "high",
          confidence: 87,
          actionable: true,
          category: "收入增长",
        },
        {
          type: "risk",
          title: "客户流失风险预警",
          description: "8个重要客户显示流失风险信号，需要立即关注",
          impact: "high",
          confidence: 92,
          actionable: true,
          category: "客户保留",
        },
        {
          type: "trend",
          title: "购买行为变化趋势",
          description: "客户更倾向于在线咨询和数字化体验，线上转化率提升35%",
          impact: "medium",
          confidence: 78,
          actionable: true,
          category: "行为分析",
        },
        {
          type: "recommendation",
          title: "个性化营销建议",
          description: "基于客户画像分析，建议实施分层营销策略",
          impact: "medium",
          confidence: 85,
          actionable: true,
          category: "营销优化",
        },
      ]

      setCustomers(mockCustomers)
      setSegments(mockSegments)
      setInsights(mockInsights)
      setLoading(false)
    }

    loadData()
  }, [])

  // 自动刷新数据
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      // 模拟数据更新
      setCustomers((prev) =>
        prev.map((customer) => ({
          ...customer,
          aiInsights: {
            ...customer.aiInsights,
            churnRisk: Math.max(0, Math.min(100, customer.aiInsights.churnRisk + (Math.random() - 0.5) * 10)),
          },
        })),
      )
    }, 30000) // 30秒更新一次

    return () => clearInterval(interval)
  }, [autoRefresh])

  // 过滤和排序客户数据
  const filteredCustomers = customers
    .filter((customer) => {
      if (
        searchQuery &&
        !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !customer.company.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      if (selectedSegment !== "all" && customer.segment !== selectedSegment) {
        return false
      }
      if (filterStatus !== "all" && customer.status !== filterStatus) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "value":
          return b.value - a.value
        case "churnRisk":
          return b.aiInsights.churnRisk - a.aiInsights.churnRisk
        case "satisfaction":
          return b.satisfactionScore - a.satisfactionScore
        case "lastActivity":
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        default:
          return 0
      }
    })

  const handleExportData = () => {
    const exportData = {
      customers: filteredCustomers,
      segments,
      insights,
      exportTime: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `customer-data-${Date.now()}.json`
    a.click()

    toast({
      title: "数据导出成功",
      description: "客户数据已导出到本地文件",
    })
  }

  const handleRefreshData = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    toast({
      title: "数据刷新完成",
      description: "客户数据已更新到最新状态",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "potential":
        return "bg-yellow-100 text-yellow-800"
      case "churned":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEngagementColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return TrendingUp
      case "risk":
        return AlertTriangle
      case "trend":
        return BarChart3
      case "recommendation":
        return Lightbulb
      default:
        return Brain
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-green-100 text-green-800 border-green-200"
      case "risk":
        return "bg-red-100 text-red-800 border-red-200"
      case "trend":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "recommendation":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className={commonStyles.layout.container}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600">AI正在分析客户数据...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={commonStyles.layout.container}>
      {/* 页面标题和控制栏 */}
      <div className={commonStyles.layout.pageHeader}>
        <div>
          <h1 className={commonStyles.text.title}>AI客户数据分析</h1>
          <p className={commonStyles.text.caption}>基于人工智能的客户数据洞察和分析</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">自动刷新</span>
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
          </div>

          <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新
          </Button>

          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>

          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            分享
          </Button>
        </div>
      </div>

      {/* 客户细分概览 */}
      <div className={commonStyles.layout.grid.cols4}>
        {segments.map((segment, index) => (
          <Card key={index} className={commonStyles.card.enhanced}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{segment.name}</p>
                  <p className="text-2xl font-bold text-slate-900">{segment.count}</p>
                  <p className="text-xs text-slate-500">{formatCurrency(segment.value)}</p>
                </div>
                <div className="text-right">
                  <div className={`w-12 h-12 ${segment.color} rounded-lg flex items-center justify-center mb-2`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-green-600">+{segment.growth}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>占比</span>
                  <span>{segment.percentage}%</span>
                </div>
                <Progress value={segment.percentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">数据概览</TabsTrigger>
          <TabsTrigger value="customers">客户列表</TabsTrigger>
          <TabsTrigger value="insights">AI洞察</TabsTrigger>
          <TabsTrigger value="analytics">深度分析</TabsTrigger>
          <TabsTrigger value="predictions">预测模型</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* AI洞察卡片 */}
          <div className={commonStyles.layout.grid.cols2}>
            {insights.map((insight, index) => {
              const Icon = getInsightIcon(insight.type)
              return (
                <Card key={index} className={`${commonStyles.card.enhanced} ${getInsightColor(insight.type)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5" />
                        <CardTitle className="text-sm">{insight.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% 置信度
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant={insight.impact === "high" ? "default" : "secondary"}>
                        {insight.impact === "high" ? "高" : insight.impact === "medium" ? "中" : "低"}影响
                      </Badge>
                      {insight.actionable && (
                        <Button size="sm" variant="outline">
                          查看建议
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* 关键指标 */}
          <div className={commonStyles.layout.grid.cols3}>
            <Card className={commonStyles.card.enhanced}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Target className="w-4 h-4 mr-2 text-blue-500" />
                  客户生命周期价值
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  {formatCurrency(customers.reduce((sum, c) => sum + c.aiInsights.lifetimeValue, 0) / customers.length)}
                </div>
                <p className="text-xs text-slate-500">平均每客户价值</p>
                <div className="mt-3">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">较上月提升12%</p>
                </div>
              </CardContent>
            </Card>

            <Card className={commonStyles.card.enhanced}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                  平均流失风险
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  {Math.round(customers.reduce((sum, c) => sum + c.aiInsights.churnRisk, 0) / customers.length)}%
                </div>
                <p className="text-xs text-slate-500">需要关注的客户比例</p>
                <div className="mt-3">
                  <Progress value={26} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">较上月降低8%</p>
                </div>
              </CardContent>
            </Card>

            <Card className={commonStyles.card.enhanced}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  客户满意度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  {Math.round(customers.reduce((sum, c) => sum + c.satisfactionScore, 0) / customers.length)}%
                </div>
                <p className="text-xs text-slate-500">综合满意度评分</p>
                <div className="mt-3">
                  <Progress value={87} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">较上月提升5%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* 搜索和筛选 */}
          <Card className={commonStyles.card.base}>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="搜索客户姓名或公司..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="客户细分" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部细分</SelectItem>
                    {segments.map((segment) => (
                      <SelectItem key={segment.name} value={segment.name}>
                        {segment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="active">活跃</SelectItem>
                    <SelectItem value="inactive">非活跃</SelectItem>
                    <SelectItem value="potential">潜在</SelectItem>
                    <SelectItem value="churned">流失</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="排序" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">客户价值</SelectItem>
                    <SelectItem value="churnRisk">流失风险</SelectItem>
                    <SelectItem value="satisfaction">满意度</SelectItem>
                    <SelectItem value="lastActivity">最近活动</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                  <Filter className="w-4 h-4 mr-2" />
                  高级筛选
                </Button>
              </div>

              {showAdvancedFilters && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">客户价值范围</label>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="最小值" className="text-xs" />
                        <span className="text-slate-400">-</span>
                        <Input placeholder="最大值" className="text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">参与度</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择参与度" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">高</SelectItem>
                          <SelectItem value="medium">中</SelectItem>
                          <SelectItem value="low">低</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">地区</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择地区" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beijing">北京</SelectItem>
                          <SelectItem value="shanghai">上海</SelectItem>
                          <SelectItem value="guangzhou">广州</SelectItem>
                          <SelectItem value="shenzhen">深圳</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 客户列表 */}
          <Card className={commonStyles.card.base}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">客户列表</CardTitle>
                <Badge variant="outline">{filteredCustomers.length} 个客户</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-2 p-4">
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">{customer.name}</h3>
                            <p className="text-sm text-slate-600">{customer.company}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getStatusColor(customer.status)} variant="outline">
                                {customer.status === "active"
                                  ? "活跃"
                                  : customer.status === "inactive"
                                    ? "非活跃"
                                    : customer.status === "potential"
                                      ? "潜在"
                                      : "流失"}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${getEngagementColor(customer.engagementLevel)}`}
                                ></div>
                                <span className="text-xs text-slate-500">
                                  {customer.engagementLevel === "high"
                                    ? "高参与"
                                    : customer.engagementLevel === "medium"
                                      ? "中参与"
                                      : "低参与"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <p className="font-semibold text-slate-900">{formatCurrency(customer.value)}</p>
                          <p className="text-xs text-slate-500">客户价值</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-slate-200 rounded-full h-1">
                              <div
                                className={`h-1 rounded-full ${
                                  customer.aiInsights.churnRisk > 50
                                    ? "bg-red-500"
                                    : customer.aiInsights.churnRisk > 30
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${100 - customer.aiInsights.churnRisk}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-500">{customer.aiInsights.churnRisk}% 风险</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span className="flex items-center">
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            {customer.totalOrders} 订单
                          </span>
                          <span className="flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            {customer.satisfactionScore}% 满意度
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(customer.lastActivity)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          {customer.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                              {tag}
                            </Badge>
                          ))}
                          {customer.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                              +{customer.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className={commonStyles.layout.grid.cols1}>
            {insights.map((insight, index) => {
              const Icon = getInsightIcon(insight.type)
              return (
                <Card key={index} className={commonStyles.card.enhanced}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{insight.title}</CardTitle>
                          <CardDescription className="text-sm">{insight.category}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={insight.impact === "high" ? "default" : "secondary"}>
                          {insight.impact === "high" ? "高" : insight.impact === "medium" ? "中" : "低"}影响
                        </Badge>
                        <Badge variant="outline">{insight.confidence}% 置信度</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 mb-4">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Progress value={insight.confidence} className="w-24 h-2" />
                        <span className="text-xs text-slate-500">置信度</span>
                      </div>
                      {insight.actionable && (
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          <Button size="sm">执行建议</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className={commonStyles.layout.grid.cols2}>
            <Card className={commonStyles.card.enhanced}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <PieChart className="w-4 h-4 mr-2" />
                  客户价值分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {segments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                        <span className="text-sm text-slate-700">{segment.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(segment.value)}</p>
                        <p className="text-xs text-slate-500">{segment.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={commonStyles.card.enhanced}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  客户活跃度趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">高活跃度客户</span>
                    <span className="text-sm font-medium">
                      {customers.filter((c) => c.engagementLevel === "high").length}
                    </span>
                  </div>
                  <Progress
                    value={(customers.filter((c) => c.engagementLevel === "high").length / customers.length) * 100}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">中活跃度客户</span>
                    <span className="text-sm font-medium">
                      {customers.filter((c) => c.engagementLevel === "medium").length}
                    </span>
                  </div>
                  <Progress
                    value={(customers.filter((c) => c.engagementLevel === "medium").length / customers.length) * 100}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">低活跃度客户</span>
                    <span className="text-sm font-medium">
                      {customers.filter((c) => c.engagementLevel === "low").length}
                    </span>
                  </div>
                  <Progress
                    value={(customers.filter((c) => c.engagementLevel === "low").length / customers.length) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className={commonStyles.card.enhanced}>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                AI分析摘要
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.round(
                      customers.reduce((sum, c) => sum + c.aiInsights.lifetimeValue, 0) / customers.length / 10000,
                    )}
                    万
                  </div>
                  <p className="text-sm text-slate-600">平均客户生命周期价值</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {customers.filter((c) => c.aiInsights.churnRisk > 50).length}
                  </div>
                  <p className="text-sm text-slate-600">高风险客户数量</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {Math.round(customers.reduce((sum, c) => sum + c.satisfactionScore, 0) / customers.length)}%
                  </div>
                  <p className="text-sm text-slate-600">平均客户满意度</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className={commonStyles.layout.grid.cols2}>
            <Card className={commonStyles.card.enhanced}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                  收入预测模型
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">下月预测收入</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(3200000)}</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-slate-500">基于历史数据和客户行为分析，预测准确率85%</p>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>乐观预测</span>
                      <span className="font-medium">{formatCurrency(3800000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>保守预测</span>
                      <span className="font-medium">{formatCurrency(2600000)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={commonStyles.card.enhanced}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                  客户流失预测
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">预计流失客户</span>
                    <span className="text-lg font-bold text-red-600">
                      {customers.filter((c) => c.aiInsights.churnRisk > 70).length} 个
                    </span>
                  </div>
                  <Progress value={15} className="h-2" />
                  <p className="text-xs text-slate-500">基于客户行为模式分析，建议立即采取保留措施</p>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>高风险客户</span>
                      <span className="font-medium text-red-600">
                        {customers.filter((c) => c.aiInsights.churnRisk > 70).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>中风险客户</span>
                      <span className="font-medium text-yellow-600">
                        {customers.filter((c) => c.aiInsights.churnRisk > 40 && c.aiInsights.churnRisk <= 70).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>低风险客户</span>
                      <span className="font-medium text-green-600">
                        {customers.filter((c) => c.aiInsights.churnRisk <= 40).length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className={commonStyles.card.enhanced}>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Cpu className="w-4 h-4 mr-2 text-purple-500" />
                AI预测模型性能
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600 mb-1">92%</div>
                  <p className="text-xs text-slate-600">收入预测准确率</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 mb-1">88%</div>
                  <p className="text-xs text-slate-600">流失预测准确率</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600 mb-1">95%</div>
                  <p className="text-xs text-slate-600">行为模式识别率</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600 mb-1">0.2s</div>
                  <p className="text-xs text-slate-600">平均预测响应时间</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 客户详情弹窗 */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle>{selectedCustomer.name}</CardTitle>
                    <CardDescription>{selectedCustomer.company}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 基本信息 */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">基本信息</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{selectedCustomer.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>加入于 {formatDate(selectedCustomer.joinDate)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* 客户价值指标 */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">客户价值指标</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">当前价值</p>
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(selectedCustomer.value)}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">生命周期价值</p>
                    <p className="text-lg font-bold text-slate-900">
                      {formatCurrency(selectedCustomer.aiInsights.lifetimeValue)}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">平均订单价值</p>
                    <p className="text-lg font-bold text-slate-900">
                      {formatCurrency(selectedCustomer.averageOrderValue)}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">总订单数</p>
                    <p className="text-lg font-bold text-slate-900">{selectedCustomer.totalOrders}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* AI洞察 */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">AI洞察分析</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">流失风险</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            selectedCustomer.aiInsights.churnRisk > 50
                              ? "bg-red-500"
                              : selectedCustomer.aiInsights.churnRisk > 30
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${selectedCustomer.aiInsights.churnRisk}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedCustomer.aiInsights.churnRisk}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">满意度评分</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${selectedCustomer.satisfactionScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedCustomer.satisfactionScore}%</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium mb-1">下一步最佳行动</p>
                    <p className="text-sm text-slate-700">{selectedCustomer.aiInsights.nextBestAction}</p>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-purple-600 font-medium mb-1">客户类型分析</p>
                    <p className="text-sm text-slate-700">
                      {selectedCustomer.aiInsights.personalityType} · {selectedCustomer.aiInsights.buyingPattern}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-2">AI推荐策略</p>
                    <div className="space-y-1">
                      {selectedCustomer.aiInsights.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-slate-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* 标签 */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">客户标签</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// 确保正确的导出
export default AiCustomerData
