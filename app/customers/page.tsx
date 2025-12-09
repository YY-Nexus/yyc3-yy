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
import { Users, UserPlus, Search, Filter, TrendingUp, Star, Phone, Mail, MapPin, Eye, Edit } from "lucide-react"
import { getProgressColor } from "@/lib/design-system"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const customers = [
    {
      id: "1",
      name: "张三",
      company: "ABC科技有限公司",
      level: "VIP",
      phone: "138****1234",
      email: "zhang@abc.com",
      status: "活跃",
      satisfaction: 95,
      value: 500000,
      lastContact: "2025-06-28",
    },
    {
      id: "2",
      name: "李四",
      company: "XYZ贸易公司",
      level: "普通",
      phone: "139****5678",
      email: "li@xyz.com",
      status: "活跃",
      satisfaction: 78,
      value: 300000,
      lastContact: "2025-06-27",
    },
    {
      id: "3",
      name: "王五",
      company: "DEF制造企业",
      level: "重要",
      phone: "137****9012",
      email: "wang@def.com",
      status: "潜在",
      satisfaction: 88,
      value: 800000,
      lastContact: "2025-06-26",
    },
  ]

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">客户管理</h1>
            <p className="text-slate-600 mt-1">管理和维护客户关系</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <EnhancedButton className="bg-sky-600 hover:bg-sky-700">
                <UserPlus className="w-4 h-4 mr-2" />
                新增客户
              </EnhancedButton>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>添加新客户</DialogTitle>
                <DialogDescription>填写客户基本信息</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">客户姓名</Label>
                  <Input id="name" placeholder="请输入客户姓名" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">公司名称</Label>
                  <Input id="company" placeholder="请输入公司名称" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input id="email" type="email" placeholder="请输入邮箱地址" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">联系电话</Label>
                  <Input id="phone" placeholder="请输入联系电话" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">联系地址</Label>
                  <Input id="address" placeholder="请输入联系地址" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">客户级别</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择客户级别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vip">VIP客户</SelectItem>
                      <SelectItem value="important">重要客户</SelectItem>
                      <SelectItem value="normal">普通客户</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">预估价值</Label>
                  <Input id="value" type="number" placeholder="请输入预估价值" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="notes">备注信息</Label>
                  <Textarea id="notes" placeholder="请输入备注信息" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <EnhancedButton variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </EnhancedButton>
                <EnhancedButton onClick={() => setIsAddDialogOpen(false)}>保存客户</EnhancedButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard className="border-l-4 border-l-sky-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">总客户数</p>
                <p className="text-2xl font-bold text-slate-800">1,234</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% 较上月</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-sky-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">活跃客户</p>
                <p className="text-2xl font-bold text-slate-800">856</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% 较上月</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">VIP客户</p>
                <p className="text-2xl font-bold text-slate-800">89</p>
                <p className="text-xs text-yellow-600 mt-1">↑ 5% 较上月</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">新增客户</p>
                <p className="text-2xl font-bold text-slate-800">45</p>
                <p className="text-xs text-purple-600 mt-1">本月新增</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-purple-600" />
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
                placeholder="搜索客户姓名、公司或联系方式..."
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
                <SelectItem value="活跃">活跃客户</SelectItem>
                <SelectItem value="潜在">潜在客户</SelectItem>
                <SelectItem value="非活跃">非活跃</SelectItem>
              </SelectContent>
            </Select>
            <EnhancedButton variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </EnhancedButton>
          </div>

          {/* 客户列表 */}
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-slate-800">{customer.name}</h3>
                      <Badge
                        variant={
                          customer.level === "VIP" ? "default" : customer.level === "重要" ? "secondary" : "outline"
                        }
                      >
                        {customer.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{customer.company}</p>

                    {/* 客户满意度进度条 */}
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-600">客户满意度</span>
                        <span className="text-xs font-medium">{customer.satisfaction}%</span>
                      </div>
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(customer.satisfaction)}`}
                          style={{ width: `${customer.satisfaction}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      价值: ¥{customer.value.toLocaleString()}
                    </div>
                  </div>
                  <Badge variant={customer.status === "活跃" ? "default" : "secondary"}>{customer.status}</Badge>
                  <div className="flex gap-2">
                    <EnhancedButton size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      查看
                    </EnhancedButton>
                    <EnhancedButton size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      编辑
                    </EnhancedButton>
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
