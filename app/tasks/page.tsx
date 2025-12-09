"use client"

import { useState } from "react"
import { PageContainer } from "@/components/layout/page-container"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckSquare, Plus, Clock, AlertCircle, CheckCircle, User, Calendar, Search, Filter } from "lucide-react"
import { getProgressColor } from "@/lib/design-system"

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const tasks = [
    {
      id: "1",
      title: "完善客户管理系统",
      assignee: "张三",
      progress: 75,
      priority: "高",
      dueDate: "2025-01-15",
      status: "进行中",
      description: "优化客户数据管理功能，提升用户体验",
    },
    {
      id: "2",
      title: "优化数据分析报表",
      assignee: "李四",
      progress: 100,
      priority: "中",
      dueDate: "2025-01-12",
      status: "已完成",
      description: "完善数据分析功能，增加新的图表类型",
    },
    {
      id: "3",
      title: "更新用户界面设计",
      assignee: "王五",
      progress: 30,
      priority: "低",
      dueDate: "2025-01-20",
      status: "进行中",
      description: "根据用户反馈更新界面设计",
    },
    {
      id: "4",
      title: "修复系统安全漏洞",
      assignee: "赵六",
      progress: 0,
      priority: "紧急",
      dueDate: "2025-01-10",
      status: "逾期",
      description: "紧急修复发现的安全漏洞",
    },
  ]

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">任务管理</h1>
            <p className="text-slate-600 mt-1">跟踪和管理团队任务进度</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <EnhancedButton className="bg-sky-600 hover:bg-sky-700">
                <Plus className="w-4 h-4 mr-2" />
                新建任务
              </EnhancedButton>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建新任务</DialogTitle>
                <DialogDescription>填写任务详细信息</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="title">任务标题</Label>
                  <Input id="title" placeholder="请输入任务标题" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">任务描述</Label>
                  <Textarea id="description" placeholder="请输入任务描述" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">负责人</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择负责人" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zhang">张三</SelectItem>
                      <SelectItem value="li">李四</SelectItem>
                      <SelectItem value="wang">王五</SelectItem>
                      <SelectItem value="zhao">赵六</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">优先级</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低优先级</SelectItem>
                      <SelectItem value="medium">中优先级</SelectItem>
                      <SelectItem value="high">高优先级</SelectItem>
                      <SelectItem value="urgent">紧急</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">截止日期</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">所属项目</Label>
                  <Input id="project" placeholder="请输入项目名称" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <EnhancedButton variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  取消
                </EnhancedButton>
                <EnhancedButton onClick={() => setIsCreateDialogOpen(false)}>创建任务</EnhancedButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard className="border-l-4 border-l-sky-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">总任务数</p>
                <p className="text-2xl font-bold text-slate-800">156</p>
                <p className="text-xs text-sky-600 mt-1">本月任务</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-sky-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">已完成</p>
                <p className="text-2xl font-bold text-slate-800">89</p>
                <p className="text-xs text-green-600 mt-1">完成率 57%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">进行中</p>
                <p className="text-2xl font-bold text-slate-800">45</p>
                <p className="text-xs text-yellow-600 mt-1">正在处理</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">逾期任务</p>
                <p className="text-2xl font-bold text-slate-800">12</p>
                <p className="text-xs text-red-600 mt-1">需要关注</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </EnhancedCard>
        </div>

        {/* 搜索和筛选 */}
        <EnhancedCard>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="搜索任务标题或负责人..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="进行中">进行中</SelectItem>
                <SelectItem value="已完成">已完成</SelectItem>
                <SelectItem value="逾期">逾期</SelectItem>
              </SelectContent>
            </Select>
            <EnhancedButton variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </EnhancedButton>
          </div>

          {/* 任务列表 */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-slate-800">{task.title}</h3>
                    <Badge
                      variant={
                        task.priority === "紧急"
                          ? "destructive"
                          : task.priority === "高"
                            ? "default"
                            : task.priority === "中"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <Badge
                      variant={
                        task.status === "已完成" ? "default" : task.status === "逾期" ? "destructive" : "secondary"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <EnhancedButton size="sm" variant="outline">
                    查看详情
                  </EnhancedButton>
                </div>

                <p className="text-sm text-slate-600 mb-3">{task.description}</p>

                <div className="flex items-center gap-6 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {task.assignee}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    截止: {task.dueDate}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">进度</span>
                      <span className="text-slate-800 font-medium">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(task.progress)}`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </EnhancedCard>
      </div>
      <FloatingNavButtons />
    </PageContainer>
  )
}
