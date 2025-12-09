"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Download,
  Share2,
  Search,
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Loader2,
  Target,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Bookmark,
  Lightbulb,
  TrendingDown,
  Activity,
  Cpu,
  Wifi,
  WifiOff,
  Brain,
  Settings,
  FileText,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  model?: string
  confidence?: number
  processingTime?: number
  tokens?: number
  cost?: number
  rating?: number
  bookmarked?: boolean
  category?: string
  attachments?: string[]
}

interface AIModel {
  id: string
  name: string
  description: string
  speed: number
  accuracy: number
  cost: number
  capabilities: string[]
  status: "online" | "offline" | "maintenance"
  responseTime: number
  reliability: number
  maxTokens: number
  languages: string[]
}

interface SecurityMetrics {
  dataEncryption: boolean
  accessControl: boolean
  auditLog: boolean
  privacyCompliance: boolean
  threatDetection: boolean
  securityScore: number
  lastSecurityCheck: string
  vulnerabilities: number
}

interface PerformanceMetrics {
  responseTime: number
  throughput: number
  accuracy: number
  uptime: number
  errorRate: number
  resourceUsage: number
  totalRequests: number
  successRate: number
}

interface BusinessInsight {
  title: string
  description: string
  impact: "high" | "medium" | "low"
  confidence: number
  trend: "up" | "down" | "stable"
  category: string
  actionable: boolean
  priority: number
}

// 格式化日期时间的辅助函数
const formatDateTime = (date: Date): string => {
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function AIAssistant() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4-turbo")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([2048])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isRealTimeMode, setIsRealTimeMode] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [showMetrics, setShowMetrics] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [currentProcessingTime, setCurrentProcessingTime] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const processingIntervalRef = useRef<NodeJS.Timeout>()

  const aiModels: AIModel[] = [
    {
      id: "gpt-4-turbo",
      name: "GPT-4 Turbo",
      description: "最新的GPT-4模型，速度更快，成本更低，支持更长上下文",
      speed: 95,
      accuracy: 98,
      cost: 0.03,
      capabilities: ["文本生成", "代码编写", "数据分析", "创意写作", "问题解答", "多语言翻译"],
      status: "online",
      responseTime: 1.2,
      reliability: 99.8,
      maxTokens: 128000,
      languages: ["中文", "英文", "日文", "韩文", "法文", "德文"],
    },
    {
      id: "gpt-4",
      name: "GPT-4",
      description: "强大的多模态AI模型，适合复杂推理和分析任务",
      speed: 85,
      accuracy: 96,
      cost: 0.06,
      capabilities: ["深度分析", "复杂推理", "多语言支持", "图像理解", "学术写作"],
      status: "online",
      responseTime: 2.1,
      reliability: 99.5,
      maxTokens: 32000,
      languages: ["中文", "英文", "日文", "韩文"],
    },
    {
      id: "claude-3-opus",
      name: "Claude 3 Opus",
      description: "Anthropic的最强AI助手，擅长复杂推理和创意任务",
      speed: 88,
      accuracy: 97,
      cost: 0.075,
      capabilities: ["安全对话", "长文本处理", "代码审查", "学术写作", "创意写作"],
      status: "online",
      responseTime: 1.8,
      reliability: 99.2,
      maxTokens: 200000,
      languages: ["中文", "英文", "法文", "德文"],
    },
    {
      id: "claude-3-sonnet",
      name: "Claude 3 Sonnet",
      description: "平衡性能和成本的Claude模型，适合日常使用",
      speed: 92,
      accuracy: 94,
      cost: 0.015,
      capabilities: ["日常对话", "文档处理", "数据分析", "编程辅助"],
      status: "online",
      responseTime: 1.5,
      reliability: 99.0,
      maxTokens: 200000,
      languages: ["中文", "英文"],
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      description: "Google的先进AI模型，支持多模态理解",
      speed: 90,
      accuracy: 93,
      cost: 0.02,
      capabilities: ["多模态理解", "实时分析", "科学计算", "创新思维"],
      status: "maintenance",
      responseTime: 2.5,
      reliability: 98.9,
      maxTokens: 32000,
      languages: ["中文", "英文", "日文"],
    },
  ]

  const securityMetrics: SecurityMetrics = {
    dataEncryption: true,
    accessControl: true,
    auditLog: true,
    privacyCompliance: true,
    threatDetection: true,
    securityScore: 98,
    lastSecurityCheck: "2024-01-15 10:30:00",
    vulnerabilities: 0,
  }

  const performanceMetrics: PerformanceMetrics = {
    responseTime: 1.5,
    throughput: 1200,
    accuracy: 96.5,
    uptime: 99.9,
    errorRate: 0.1,
    resourceUsage: 65,
    totalRequests: 15420,
    successRate: 99.2,
  }

  const quickActions = [
    {
      icon: BarChart3,
      label: "数据分析",
      prompt: "帮我分析最新的业务数据趋势，包括销售、客户和财务指标",
      category: "分析",
    },
    { icon: Users, label: "客户洞察", prompt: "分析客户行为模式和偏好，提供客户细分建议", category: "客户" },
    { icon: TrendingUp, label: "市场预测", prompt: "基于当前数据预测下个季度的市场趋势和机会", category: "预测" },
    { icon: Target, label: "目标优化", prompt: "优化我们的业务目标和KPI设置，提供改进建议", category: "优化" },
    { icon: Lightbulb, label: "创新建议", prompt: "提供创新的业务改进建议和新产品开发思路", category: "创新" },
    { icon: Shield, label: "风险评估", prompt: "评估当前业务风险和潜在威胁，制定应对策略", category: "风险" },
    { icon: FileText, label: "报告生成", prompt: "生成详细的业务分析报告，包含图表和建议", category: "报告" },
    { icon: Cpu, label: "系统优化", prompt: "分析系统性能并提供优化建议", category: "技术" },
  ]

  const businessInsights: BusinessInsight[] = [
    {
      title: "客户满意度显著提升",
      description: "基于最新数据分析，客户满意度较上月提升15%，主要得益于服务质量改善和响应时间缩短",
      impact: "high",
      confidence: 92,
      trend: "up",
      category: "客户体验",
      actionable: true,
      priority: 1,
    },
    {
      title: "销售转化率优化机会",
      description: "识别到营销漏斗中的关键转化点，建议调整策略可提升转化率8-12%",
      impact: "high",
      confidence: 87,
      trend: "up",
      category: "销售优化",
      actionable: true,
      priority: 2,
    },
    {
      title: "成本控制效果显著",
      description: "通过AI优化建议，已识别并实施3个主要成本控制点，预计节省成本20%",
      impact: "high",
      confidence: 94,
      trend: "down",
      category: "成本管理",
      actionable: false,
      priority: 3,
    },
    {
      title: "新兴市场机会",
      description: "数据显示新兴市场需求增长35%，建议制定针对性市场进入策略",
      impact: "medium",
      confidence: 78,
      trend: "up",
      category: "市场拓展",
      actionable: true,
      priority: 4,
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // 模拟网络连接状态检测
    const checkConnection = () => {
      setIsConnected(navigator.onLine)
    }

    window.addEventListener("online", checkConnection)
    window.addEventListener("offline", checkConnection)

    // 初始化欢迎消息
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        type: "assistant",
        content:
          "您好！我是锦澜家居的AI智能助手。我可以帮助您进行数据分析、业务洞察、客户管理等各种任务。请告诉我您需要什么帮助？",
        timestamp: new Date(),
        model: selectedModel,
        confidence: 100,
        category: "系统",
      }
      setMessages([welcomeMessage])
    }

    return () => {
      window.removeEventListener("online", checkConnection)
      window.removeEventListener("offline", checkConnection)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const startProcessingTimer = () => {
    setCurrentProcessingTime(0)
    processingIntervalRef.current = setInterval(() => {
      setCurrentProcessingTime((prev) => prev + 0.1)
    }, 100)
  }

  const stopProcessingTimer = () => {
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current)
    }
  }

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("你好") || lowerInput.includes("您好")) {
      return "您好！很高兴为您服务。请问有什么可以帮您的吗？"
    } else if (lowerInput.includes("时间") || lowerInput.includes("日期")) {
      const now = new Date()
      return `当前时间是 ${formatDateTime(now)}。`
    } else if (lowerInput.includes("功能") || lowerInput.includes("能做什么")) {
      return "我可以帮助您进行数据分析、业务洞察、客户管理、报告生成等多种任务。您可以直接告诉我您的需求。"
    } else if (lowerInput.includes("分析") || lowerInput.includes("数据")) {
      return `基于您的数据分析需求，我为您提供以下专业分析：

📊 **数据洞察**
• 当前业务数据显示积极向上的发展态势
• 关键指标表现超出预期15-20%
• 建议重点关注转化率和客户留存

🎯 **行动建议**
1. 优先实施短期改进措施
2. 制定中长期战略规划
3. 建立持续监控机制

📈 **预期效果**
预计在2-3周内可见明显改善，ROI提升预期达到25-30%。

需要我详细解释某个方面或提供具体实施方案吗？`
    } else if (lowerInput.includes("建议") || lowerInput.includes("优化")) {
      return `关于优化建议，我为您提供以下专业方案：

💡 **优化策略**
• 采用数据驱动的决策方法
• 实施渐进式改进计划
• 建立反馈循环机制

⚡ **快速行动**
建议立即启动优先级最高的2个改进项目，预计投资回报周期为6-8周。

🔍 **效果监控**
• 设置关键绩效指标(KPI)
• 建立定期评估机制
• 持续优化调整策略

这个方案符合您的预期吗？需要我提供更详细的实施计划吗？`
    } else {
      return `感谢您的提问！基于您的需求，我为您提供以下回复：

🤖 **AI分析结果**
• 已理解您的问题并进行深度分析
• 结合企业实际情况提供针对性建议
• 确保方案的可行性和实用性

📋 **解决方案**
1. **分析阶段**：深入理解问题本质
2. **方案设计**：制定具体实施计划
3. **执行跟踪**：监控实施效果并优化

如需更精准的回答，请提供更多背景信息，我将为您提供更专业的建议。`
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
      category: "用户输入",
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)
    startProcessingTimer()

    try {
      // 模拟AI响应延迟
      const selectedModelData = aiModels.find((m) => m.id === selectedModel)
      const responseTime = selectedModelData?.responseTime || 1.5

      await new Promise((resolve) => setTimeout(resolve, responseTime * 1000))

      const tokens = Math.floor(Math.random() * 500) + 100
      const selectedModelCost = selectedModelData?.cost || 0.03
      const cost = Number.parseFloat(((tokens / 1000) * selectedModelCost).toFixed(4))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(currentInput),
        timestamp: new Date(),
        model: selectedModel,
        confidence: Math.floor(Math.random() * 20) + 80,
        processingTime: Number.parseFloat(currentProcessingTime.toFixed(2)),
        tokens,
        cost,
        category: "AI响应",
      }

      setMessages((prev) => [...prev, assistantMessage])

      toast({
        title: `已使用 ${tokens} 个token，成本约 ¥${cost}`,
        description: `模型: ${selectedModelData?.name || selectedModel}`,
      })
    } catch (error) {
      console.error("AI响应错误:", error)
      toast({
        title: "抱歉，处理您的请求时出现错误",
        description: "请稍后再试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      stopProcessingTimer()
      setTimeout(scrollToBottom, 100)
    }
  }

  const handleQuickAction = (action: { prompt: string }) => {
    setInput(action.prompt)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleMicToggle = () => {
    setIsListening((prev) => !prev)
    if (isListening) {
      toast({
        title: "语音识别已停止",
      })
    } else {
      toast({
        title: "正在识别语音...",
      })
      setTimeout(() => {
        setInput("这是一段模拟的语音输入内容")
        setIsListening(false)
      }, 3000)
    }
  }

  const handleClearMessages = () => {
    if (messages.length > 1) {
      setMessages([messages[0]])
      toast({
        title: "消息已清空",
      })
    }
  }

  const handleBookmarkMessage = (id: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, bookmarked: !msg.bookmarked } : msg)))
  }

  const handleRateMessage = (id: string, rating: number) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, rating } : msg)))
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "内容已复制到剪贴板",
    })
  }

  const handleExportChat = () => {
    const chatData = {
      messages,
      timestamp: new Date().toISOString(),
      model: selectedModel,
      settings: {
        temperature: temperature[0],
        maxTokens: maxTokens[0],
        realTimeMode: isRealTimeMode,
        autoSave: autoSave,
      },
    }

    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-chat-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "对话已导出",
      description: "对话记录已成功导出到本地文件",
    })
  }

  const handleShareChat = () => {
    const shareText = messages
      .filter((m) => m.type === "user" || m.type === "assistant")
      .map((m) => `${m.type === "user" ? "用户" : "AI助手"}: ${m.content}`)
      .join("\n\n")

    navigator.clipboard.writeText(shareText)
    toast({
      title: "对话已复制",
      description: "对话内容已复制到剪贴板，可以分享给他人",
    })
  }

  const getMessageColor = (type: "user" | "assistant") => {
    return type === "user"
      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
      : "bg-white border border-slate-200 text-slate-900 shadow-sm"
  }

  const getModelStatusColor = (status: "online" | "offline" | "maintenance") => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "offline":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (value: number) => {
    return `¥${value.toFixed(4)}`
  }

  const currentModel = aiModels.find((m) => m.id === selectedModel)

  return (
    <div className="p-6 space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI智能助手</h1>
          <p className="text-slate-600 mt-1">企业级AI助手，提供智能分析和决策支持</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 ${!isConnected ? "opacity-50" : ""}`}>
            {isConnected ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-red-500" />}
            <span className="text-sm">{isConnected ? "已连接" : "连接断开"}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowMetrics(!showMetrics)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            {showMetrics ? "隐藏" : "显示"}统计
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportChat}>
            <Download className="w-4 h-4 mr-2" />
            导出对话
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      {showMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-400">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">响应时间</p>
                  <p className="text-3xl font-bold text-blue-600">{performanceMetrics.responseTime}s</p>
                </div>
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-400">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">准确率</p>
                  <p className="text-3xl font-bold text-green-600">{performanceMetrics.accuracy}%</p>
                </div>
                <Target className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-400">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">安全评分</p>
                  <p className="text-3xl font-bold text-purple-600">{securityMetrics.securityScore}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-400">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">总请求数</p>
                  <p className="text-3xl font-bold text-orange-600">{performanceMetrics.totalRequests}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 对话区域 */}
        <div className="lg:col-span-3 space-y-4">
          {/* 控制栏 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map((model) => (
                        <SelectItem key={model.id} value={model.id} disabled={model.status !== "online"}>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                model.status === "online"
                                  ? "bg-green-500"
                                  : model.status === "maintenance"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            />
                            <span>{model.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="搜索对话..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleShareChat}>
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleClearMessages}>
                    <TrendingDown className="w-4 h-4 mr-2" />
                    清空
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 消息列表 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200">
            <CardContent className="p-0">
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] rounded-xl p-4 ${getMessageColor(message.type)}`}>
                        <div className="flex items-start space-x-3">
                          {message.type === "assistant" && (
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium opacity-75">
                                  {message.type === "user" ? "您" : "AI助手"}
                                </span>
                                {message.category && (
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                    {message.category}
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs opacity-60">{formatDateTime(message.timestamp)}</span>
                            </div>

                            <div className="prose prose-sm max-w-none">
                              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                            </div>

                            {/* 消息元数据 */}
                            {showMetrics && message.type === "assistant" && (
                              <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                                <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
                                  <div className="flex items-center justify-between">
                                    <span>模型:</span>
                                    <span className="font-medium">{message.model}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>置信度:</span>
                                    <span className="font-medium">{message.confidence}%</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>处理时间:</span>
                                    <span className="font-medium">{message.processingTime}s</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>成本:</span>
                                    <span className="font-medium">{formatCurrency(message.cost || 0)}</span>
                                  </div>
                                </div>
                                {message.tokens && (
                                  <div className="flex items-center justify-between text-xs text-slate-500">
                                    <span>令牌数:</span>
                                    <span className="font-medium">{message.tokens}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* 消息操作 */}
                            {message.type === "assistant" && (
                              <div className="flex items-center space-x-1 mt-3 pt-2 border-t border-slate-100">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRateMessage(message.id, 1)}
                                  className={`h-7 px-2 ${message.rating === 1 ? "text-green-600 bg-green-50" : "text-slate-400 hover:text-green-600"}`}
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRateMessage(message.id, -1)}
                                  className={`h-7 px-2 ${message.rating === -1 ? "text-red-600 bg-red-50" : "text-slate-400 hover:text-red-600"}`}
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleBookmarkMessage(message.id)}
                                  className={`h-7 px-2 ${message.bookmarked ? "text-yellow-600 bg-yellow-50" : "text-slate-400 hover:text-yellow-600"}`}
                                >
                                  <Bookmark className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyMessage(message.content)}
                                  className="h-7 px-2 text-slate-400 hover:text-slate-600"
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-xl p-4 max-w-[85%] shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
                            <span className="text-sm text-slate-600">AI正在思考中...</span>
                            <span className="text-xs text-slate-500">{currentProcessingTime.toFixed(1)}s</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* 输入区域 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="输入您的问题或需求..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="min-h-[80px] resize-none border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={handleMicToggle}
                      variant={isListening ? "default" : "outline"}
                      size="sm"
                      disabled={!isConnected}
                      className="h-10 w-10 p-0"
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading || !isConnected}
                      size="sm"
                      className="h-10 w-10 p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>💡 提示:</span>
                  <span>按 Enter 发送，Shift + Enter 换行</span>
                  <span>•</span>
                  <span>支持语音输入和文件上传</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-4">
          {/* 快捷操作 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200">
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                快捷操作
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-auto p-3 flex flex-col items-center space-y-2 bg-gradient-to-br from-white to-slate-50 hover:from-sky-50 hover:to-blue-50 border-slate-200 hover:border-sky-300 transition-all duration-200"
                    onClick={() => handleQuickAction(action)}
                    disabled={!isConnected}
                  >
                    <action.icon className="w-5 h-5 text-sky-600" />
                    <span className="text-xs font-medium text-center">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 当前模型状态 */}
          {currentModel && (
            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200">
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  当前模型
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{currentModel.name}</span>
                  <Badge variant={currentModel.status === "online" ? "default" : "secondary"}>
                    {currentModel.status === "online" ? "在线" : "维护中"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>速度</span>
                      <span>{currentModel.speed}%</span>
                    </div>
                    <Progress value={currentModel.speed} className="h-1.5" />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>准确性</span>
                      <span>{currentModel.accuracy}%</span>
                    </div>
                    <Progress value={currentModel.accuracy} className="h-1.5" />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>可靠性</span>
                      <span>{currentModel.reliability}%</span>
                    </div>
                    <Progress value={currentModel.reliability} className="h-1.5" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>响应时间:</span>
                    <span className="font-medium">{currentModel.responseTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>成本:</span>
                    <span className="font-medium">${currentModel.cost}/1K tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>最大令牌:</span>
                    <span className="font-medium">{currentModel.maxTokens.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-500 mb-2">支持语言:</p>
                  <div className="flex flex-wrap gap-1">
                    {currentModel.languages.slice(0, 3).map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                        {lang}
                      </Badge>
                    ))}
                    {currentModel.languages.length > 3 && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                        +{currentModel.languages.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 高级设置 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200">
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  高级设置
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}>
                  {showAdvancedSettings ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            {showAdvancedSettings && (
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-700">创造性 ({temperature[0]})</label>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">控制回答的创造性和随机性</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-700">最大令牌数 ({maxTokens[0]})</label>
                  <Slider
                    value={maxTokens}
                    onValueChange={setMaxTokens}
                    max={4096}
                    min={256}
                    step={256}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">限制单次回答的最大长度</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-medium text-slate-700">实时模式</label>
                      <p className="text-xs text-slate-500">启用流式响应</p>
                    </div>
                    <Switch checked={isRealTimeMode} onCheckedChange={setIsRealTimeMode} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-medium text-slate-700">自动保存</label>
                      <p className="text-xs text-slate-500">自动保存对话记录</p>
                    </div>
                    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* 使用统计 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200">
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                使用统计
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">今日对话</span>
                <span className="font-medium">{messages.length}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">总令牌数</span>
                <span className="font-medium">{messages.reduce((sum, msg) => sum + (msg.tokens || 0), 0)}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">总成本</span>
                <span className="font-medium">
                  {formatCurrency(messages.reduce((sum, msg) => sum + (msg.cost || 0), 0))}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">收藏消息</span>
                <span className="font-medium">{messages.filter((m) => m.bookmarked).length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
