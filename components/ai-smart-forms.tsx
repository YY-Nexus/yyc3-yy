"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Brain,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  Save,
  Share2,
  Download,
  Upload,
  RefreshCw,
  TrendingUp,
  Users,
  CheckCircle,
  Lightbulb,
  BarChart3,
  PieChart,
  LineChart,
  Smartphone,
  Tablet,
  Monitor,
  Star,
  Calendar,
  Mail,
  Phone,
  Hash,
  Type,
  FileText,
  List,
  CheckSquare,
  Radio,
  ImageIcon,
} from "lucide-react"

interface FormField {
  id: string
  type: string
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
  order: number
}

interface FormTemplate {
  id: string
  name: string
  description: string
  category: string
  fields: FormField[]
  completionRate: number
  responseCount: number
  avgCompletionTime: number
  aiScore: number
}

interface AIOptimization {
  id: string
  type: "field-order" | "field-type" | "validation" | "design" | "content"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  confidence: number
  recommendation: string
  beforeValue?: any
  afterValue?: any
}

export function AiSmartForms() {
  const { toast } = useToast()

  // 表单状态
  const [formTitle, setFormTitle] = useState("新建表单")
  const [formDescription, setFormDescription] = useState("")
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")

  // AI优化状态
  const [aiOptimizationEnabled, setAiOptimizationEnabled] = useState(true)
  const [aiAnalyzing, setAiAnalyzing] = useState(false)
  const [optimizations, setOptimizations] = useState<AIOptimization[]>([])
  const [autoOptimize, setAutoOptimize] = useState(false)

  // 分析数据
  const [analytics, setAnalytics] = useState({
    totalForms: 24,
    totalResponses: 9017,
    avgCompletionRate: 83.5,
    aiOptimizations: 12,
  })

  // 表单模板数据
  const formTemplates: FormTemplate[] = [
    {
      id: "customer-survey",
      name: "客户满意度调研",
      description: "收集客户对产品和服务的反馈意见",
      category: "调研",
      completionRate: 78,
      responseCount: 1247,
      avgCompletionTime: 3.2,
      aiScore: 92,
      fields: [
        {
          id: "name",
          type: "text",
          label: "您的姓名",
          placeholder: "请输入您的姓名",
          required: true,
          order: 1,
        },
        {
          id: "email",
          type: "email",
          label: "邮箱地址",
          placeholder: "请输入您的邮箱",
          required: true,
          order: 2,
        },
        {
          id: "satisfaction",
          type: "rating",
          label: "整体满意度",
          required: true,
          order: 3,
        },
        {
          id: "feedback",
          type: "textarea",
          label: "意见建议",
          placeholder: "请分享您的宝贵意见",
          required: false,
          order: 4,
        },
      ],
    },
    {
      id: "product-feedback",
      name: "产品反馈表",
      description: "收集用户对产品功能的使用体验",
      category: "反馈",
      completionRate: 85,
      responseCount: 892,
      avgCompletionTime: 2.1,
      aiScore: 88,
      fields: [
        {
          id: "product",
          type: "select",
          label: "使用的产品",
          required: true,
          options: ["产品A", "产品B", "产品C"],
          order: 1,
        },
        {
          id: "usage-frequency",
          type: "radio",
          label: "使用频率",
          required: true,
          options: ["每天", "每周", "每月", "偶尔"],
          order: 2,
        },
        {
          id: "features",
          type: "checkbox",
          label: "最喜欢的功能",
          required: false,
          options: ["界面设计", "功能丰富", "操作简单", "性能稳定"],
          order: 3,
        },
      ],
    },
    {
      id: "user-registration",
      name: "用户注册表",
      description: "新用户注册信息收集",
      category: "注册",
      completionRate: 92,
      responseCount: 2156,
      avgCompletionTime: 1.8,
      aiScore: 95,
      fields: [
        {
          id: "username",
          type: "text",
          label: "用户名",
          placeholder: "请输入用户名",
          required: true,
          order: 1,
        },
        {
          id: "email",
          type: "email",
          label: "邮箱地址",
          placeholder: "请输入邮箱地址",
          required: true,
          order: 2,
        },
        {
          id: "phone",
          type: "phone",
          label: "手机号码",
          placeholder: "请输入手机号码",
          required: true,
          order: 3,
        },
        {
          id: "company",
          type: "text",
          label: "公司名称",
          placeholder: "请输入公司名称",
          required: false,
          order: 4,
        },
      ],
    },
  ]

  // AI优化建议
  const aiOptimizations: AIOptimization[] = [
    {
      id: "1",
      type: "field-order",
      title: "字段顺序优化",
      description: "建议将邮箱字段移至姓名字段之后，可提升完成率12%",
      impact: "high",
      confidence: 89,
      recommendation: "根据用户行为分析，邮箱字段放在姓名后面更符合填写习惯",
    },
    {
      id: "2",
      type: "field-type",
      title: "字段类型建议",
      description: "电话号码字段建议使用专用输入类型，减少输入错误",
      impact: "medium",
      confidence: 76,
      recommendation: "使用tel类型可以在移动设备上显示数字键盘",
    },
    {
      id: "3",
      type: "validation",
      title: "验证规则优化",
      description: "邮箱字段添加实时验证，可减少无效提交23%",
      impact: "high",
      confidence: 82,
      recommendation: "实时验证可以立即提示用户输入错误，提升用户体验",
    },
    {
      id: "4",
      type: "design",
      title: "视觉设计建议",
      description: "使用渐进式表单设计，分步骤展示可提升用户体验",
      impact: "medium",
      confidence: 91,
      recommendation: "将长表单分解为多个步骤，降低用户心理负担",
    },
  ]

  // 字段类型配置
  const fieldTypes = [
    { id: "text", name: "单行文本", icon: Type, description: "简短文本输入" },
    { id: "textarea", name: "多行文本", icon: FileText, description: "长文本输入" },
    { id: "email", name: "邮箱", icon: Mail, description: "邮箱地址输入" },
    { id: "phone", name: "电话", icon: Phone, description: "电话号码输入" },
    { id: "number", name: "数字", icon: Hash, description: "数字输入" },
    { id: "date", name: "日期", icon: Calendar, description: "日期选择" },
    { id: "select", name: "下拉选择", icon: List, description: "单选下拉菜单" },
    { id: "radio", name: "单选按钮", icon: Radio, description: "单选选项" },
    { id: "checkbox", name: "多选框", icon: CheckSquare, description: "多选选项" },
    { id: "rating", name: "评分", icon: Star, description: "星级评分" },
    { id: "file", name: "文件上传", icon: Upload, description: "文件上传" },
    { id: "image", name: "图片上传", icon: ImageIcon, description: "图片上传" },
  ]

  // 获取字段图标
  const getFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find((ft) => ft.id === type)
    return fieldType ? fieldType.icon : Type
  }

  // 添加字段
  const handleAddField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: "text",
      label: "新字段",
      placeholder: "",
      required: false,
      order: formFields.length + 1,
    }
    setFormFields([...formFields, newField])
  }

  // 更新字段
  const handleUpdateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields((fields) => fields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)))
  }

  // 删除字段
  const handleDeleteField = (fieldId: string) => {
    setFormFields((fields) => fields.filter((field) => field.id !== fieldId))
  }

  // 选择模板
  const handleSelectTemplate = (template: FormTemplate) => {
    setSelectedTemplate(template)
    setFormTitle(template.name)
    setFormDescription(template.description)
    setFormFields(template.fields)

    toast({
      title: "模板已应用",
      description: `已成功应用"${template.name}"模板`,
    })
  }

  // AI分析
  const handleAIAnalysis = async () => {
    setAiAnalyzing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setOptimizations(aiOptimizations)
      toast({
        title: "AI分析完成",
        description: `发现${aiOptimizations.length}个优化建议`,
      })
    } catch (error) {
      toast({
        title: "分析失败",
        description: "AI分析时出现错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setAiAnalyzing(false)
    }
  }

  // 应用优化建议
  const handleApplyOptimization = (optimization: AIOptimization) => {
    // 这里实现具体的优化逻辑
    toast({
      title: "优化已应用",
      description: optimization.title,
    })
  }

  // 保存表单
  const handleSaveForm = () => {
    toast({
      title: "表单已保存",
      description: "表单配置已成功保存",
    })
  }

  // 发布表单
  const handlePublishForm = () => {
    toast({
      title: "表单已发布",
      description: "表单已成功发布，用户可以开始填写",
    })
  }

  // 导出表单
  const handleExportForm = () => {
    const formData = {
      title: formTitle,
      description: formDescription,
      fields: formFields,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `form-${Date.now()}.json`
    a.click()

    toast({
      title: "表单已导出",
      description: "表单配置已导出到本地文件",
    })
  }

  // 渲染表单字段预览
  const renderFieldPreview = (field: FormField) => {
    const commonProps = {
      placeholder: field.placeholder,
      required: field.required,
      className:
        "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500",
    }

    switch (field.type) {
      case "text":
        return <Input {...commonProps} type="text" />
      case "email":
        return <Input {...commonProps} type="email" />
      case "phone":
        return <Input {...commonProps} type="tel" />
      case "number":
        return <Input {...commonProps} type="number" />
      case "date":
        return <Input {...commonProps} type="date" />
      case "textarea":
        return <Textarea {...commonProps} rows={3} />
      case "select":
        return (
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.placeholder || "请选择..."} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" name={field.id} id={`${field.id}-${index}`} className="w-4 h-4" />
                <label htmlFor={`${field.id}-${index}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )
      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" id={`${field.id}-${index}`} className="w-4 h-4" />
                <label htmlFor={`${field.id}-${index}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )
      case "rating":
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>
        )
      case "file":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">点击或拖拽文件到此处</p>
          </div>
        )
      default:
        return <Input {...commonProps} type="text" />
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和控制栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI智能表单设计
          </h1>
          <p className="text-gray-600 mt-2">使用AI驱动的智能表单设计工具，提升表单完成率和用户体验</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleAIAnalysis} disabled={aiAnalyzing}>
            {aiAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                AI分析中...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                AI分析
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? "编辑模式" : "预览模式"}
          </Button>
          <Button onClick={handleSaveForm}>
            <Save className="w-4 h-4 mr-2" />
            保存表单
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">总表单数</p>
                <p className="text-2xl font-bold">{analytics.totalForms}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+12% 本月</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">总回复数</p>
                <p className="text-2xl font-bold">{analytics.totalResponses.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+23% 本月</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">平均完成率</p>
                <p className="text-2xl font-bold">{analytics.avgCompletionRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+5.2% 本月</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI优化建议</p>
                <p className="text-2xl font-bold">{analytics.aiOptimizations}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Lightbulb className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-600">待处理</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="templates">模板选择</TabsTrigger>
          <TabsTrigger value="builder">表单构建</TabsTrigger>
          <TabsTrigger value="preview">预览测试</TabsTrigger>
          <TabsTrigger value="analytics">数据分析</TabsTrigger>
          <TabsTrigger value="ai-insights">AI洞察</TabsTrigger>
        </TabsList>

        {/* 模板选择 */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    智能表单模板
                  </CardTitle>
                  <CardDescription>选择预设模板快速创建表单，或从空白开始</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormTitle("新建表单")
                    setFormDescription("")
                    setFormFields([])
                    setSelectedTemplate(null)
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  空白表单
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedTemplate?.id === template.id ? "ring-2 ring-sky-500 bg-sky-50" : ""
                    }`}
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="secondary">{template.category}</Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">完成率</span>
                          <p className="font-semibold text-green-600">{template.completionRate}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">回复数</span>
                          <p className="font-semibold">{template.responseCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">平均用时</span>
                          <p className="font-semibold">{template.avgCompletionTime}分钟</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">AI评分</span>
                          <p className="font-semibold text-purple-600">{template.aiScore}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          使用模板
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 表单构建 */}
        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 字段工具箱 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">字段工具箱</CardTitle>
                <CardDescription>拖拽字段到表单中</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {fieldTypes.map((fieldType) => (
                      <Button
                        key={fieldType.id}
                        variant="outline"
                        className="w-full justify-start h-auto p-3 bg-transparent"
                        onClick={() => {
                          const newField: FormField = {
                            id: `field-${Date.now()}`,
                            type: fieldType.id,
                            label: fieldType.name,
                            placeholder: "",
                            required: false,
                            order: formFields.length + 1,
                          }
                          setFormFields([...formFields, newField])
                        }}
                      >
                        <fieldType.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-medium">{fieldType.name}</div>
                          <div className="text-xs text-muted-foreground">{fieldType.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* 表单编辑区 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="表单标题"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="text-lg font-semibold"
                    />
                    <Textarea
                      placeholder="表单描述"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      rows={2}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {formFields.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>从左侧工具箱选择字段类型</p>
                          <p className="text-sm">或点击字段类型快速添加</p>
                        </div>
                      ) : (
                        formFields
                          .sort((a, b) => a.order - b.order)
                          .map((field) => (
                            <div key={field.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{field.label}</span>
                                  {field.required && (
                                    <Badge variant="destructive" className="text-xs">
                                      必填
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button size="sm" variant="ghost">
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => handleDeleteField(field.id)}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs font-medium text-muted-foreground">字段类型</label>
                                    <Select
                                      value={field.type}
                                      onValueChange={(value) => handleUpdateField(field.id, { type: value })}
                                    >
                                      <SelectTrigger className="h-8">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {fieldTypes.map((type) => (
                                          <SelectItem key={type.id} value={type.id}>
                                            {type.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium text-muted-foreground">字段标签</label>
                                    <Input
                                      value={field.label}
                                      onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                                      className="h-8"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-xs font-medium text-muted-foreground">占位文本</label>
                                  <Input
                                    value={field.placeholder || ""}
                                    onChange={(e) => handleUpdateField(field.id, { placeholder: e.target.value })}
                                    className="h-8"
                                    placeholder="输入占位文本（可选）"
                                  />
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={field.required}
                                    onCheckedChange={(checked) => handleUpdateField(field.id, { required: checked })}
                                  />
                                  <label className="text-xs">此字段为必填项</label>
                                </div>

                                {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
                                  <div>
                                    <label className="text-xs font-medium text-muted-foreground">选项</label>
                                    <div className="space-y-2">
                                      {field.options?.map((option, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                          <Input
                                            value={option}
                                            onChange={(e) => {
                                              const newOptions = [...(field.options || [])]
                                              newOptions[index] = e.target.value
                                              handleUpdateField(field.id, { options: newOptions })
                                            }}
                                            className="flex-1 h-8"
                                          />
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                              const newOptions = field.options?.filter((_, i) => i !== index)
                                              handleUpdateField(field.id, { options: newOptions })
                                            }}
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      ))}
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full h-8 bg-transparent"
                                        onClick={() => {
                                          const newOptions = [...(field.options || []), "新选项"]
                                          handleUpdateField(field.id, { options: newOptions })
                                        }}
                                      >
                                        <Plus className="w-3 h-3 mr-1" />
                                        添加选项
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* 设置面板 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">表单设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI优化</span>
                    <Switch checked={aiOptimizationEnabled} onCheckedChange={setAiOptimizationEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">自动优化</span>
                    <Switch checked={autoOptimize} onCheckedChange={setAutoOptimize} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">显示进度条</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">自动保存</span>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">设备预览</h4>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={selectedDevice === "desktop" ? "default" : "outline"}
                      onClick={() => setSelectedDevice("desktop")}
                    >
                      <Monitor className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedDevice === "tablet" ? "default" : "outline"}
                      onClick={() => setSelectedDevice("tablet")}
                    >
                      <Tablet className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedDevice === "mobile" ? "default" : "outline"}
                      onClick={() => setSelectedDevice("mobile")}
                    >
                      <Smartphone className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">操作</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleSaveForm}>
                      <Save className="w-3 h-3 mr-2" />
                      保存表单
                    </Button>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handlePublishForm}>
                      <Share2 className="w-3 h-3 mr-2" />
                      发布表单
                    </Button>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleExportForm}>
                      <Download className="w-3 h-3 mr-2" />
                      导出表单
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 预览测试 */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>表单预览</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={selectedDevice === "desktop" ? "default" : "outline"}
                    onClick={() => setSelectedDevice("desktop")}
                  >
                    <Monitor className="w-4 h-4 mr-1" />
                    桌面
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedDevice === "tablet" ? "default" : "outline"}
                    onClick={() => setSelectedDevice("tablet")}
                  >
                    <Tablet className="w-4 h-4 mr-1" />
                    平板
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedDevice === "mobile" ? "default" : "outline"}
                    onClick={() => setSelectedDevice("mobile")}
                  >
                    <Smartphone className="w-4 h-4 mr-1" />
                    手机
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div
                  className={`bg-white border rounded-lg p-6 shadow-sm ${
                    selectedDevice === "mobile"
                      ? "w-full max-w-sm"
                      : selectedDevice === "tablet"
                        ? "w-full max-w-md"
                        : "w-full max-w-2xl"
                  }`}
                >
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{formTitle}</h2>
                      {formDescription && <p className="text-gray-600 mt-2">{formDescription}</p>}
                    </div>

                    <div className="space-y-4">
                      {formFields
                        .sort((a, b) => a.order - b.order)
                        .map((field) => (
                          <div key={field.id} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {renderFieldPreview(field)}
                          </div>
                        ))}
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">提交表单</Button>
                      <Button variant="outline" className="bg-transparent">
                        重置
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据分析 */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-sky-600" />
                  完成率分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky-600">83.5%</div>
                    <div className="text-sm text-muted-foreground">平均完成率</div>
                  </div>
                  <Progress value={83.5} className="w-full" />
                  <div className="text-xs text-muted-foreground text-center">较上月提升 5.2%</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-sky-600" />
                  设备分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">移动端</span>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-green-500" />
                      <span className="text-sm">桌面端</span>
                    </div>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tablet className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">平板</span>
                    </div>
                    <span className="text-sm font-medium">7%</span>
                  </div>
                  <Progress value={7} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-sky-600" />
                  响应时间
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">2.3</div>
                    <div className="text-sm text-muted-foreground">平均完成时间（分钟）</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>最快完成</span>
                      <span className="font-medium">45秒</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>最慢完成</span>
                      <span className="font-medium">8分钟</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI洞察 */}
        <TabsContent value="ai-insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                AI优化建议
              </CardTitle>
              <CardDescription>基于数据分析的智能优化建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizations.map((optimization) => (
                  <div
                    key={optimization.id}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{optimization.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                optimization.impact === "high"
                                  ? "destructive"
                                  : optimization.impact === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {optimization.impact === "high"
                                ? "高影响"
                                : optimization.impact === "medium"
                                  ? "中影响"
                                  : "低影响"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {optimization.confidence}% 置信度
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{optimization.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">AI建议：</span>
                            {optimization.recommendation}
                          </div>
                          <Button size="sm" onClick={() => handleApplyOptimization(optimization)}>
                            应用建议
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
