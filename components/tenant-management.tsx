"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Plus,
  Search,
  MoreHorizontal,
  Crown,
  Star,
  Zap,
  Users,
  Settings,
  Activity,
  Globe,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface Tenant {
  id: string
  name: string
  domain: string
  plan: "basic" | "professional" | "enterprise"
  status: "active" | "suspended" | "trial"
  users: number
  maxUsers: number
  createdAt: Date
  lastActive: Date
  logo?: string
  storage: number
  maxStorage: number
  features: string[]
  billing: {
    amount: number
    currency: string
    period: string
    nextBilling: Date
  }
}

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
  tenantId: string
  status: "active" | "inactive"
  lastLogin: Date
  permissions: string[]
}

interface TenantSettings {
  id: string
  tenantId: string
  allowRegistration: boolean
  requireApproval: boolean
  sessionTimeout: number
  maxFileSize: number
  enableSSO: boolean
  customDomain: string
  branding: {
    primaryColor: string
    logo: string
    favicon: string
  }
}

export function TenantManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("all")
  const [newTenant, setNewTenant] = useState({
    name: "",
    domain: "",
    plan: "",
    adminEmail: "",
    adminName: "",
    description: "",
  })

  const tenants: Tenant[] = [
    {
      id: "1",
      name: "锦澜家居总部",
      domain: "jinlan-hq.com",
      plan: "enterprise",
      status: "active",
      users: 45,
      maxUsers: 100,
      createdAt: new Date("2024-01-15"),
      lastActive: new Date(),
      logo: "/images/jinlan-logo.png",
      storage: 15.6,
      maxStorage: 100,
      features: ["AI助手", "高级分析", "API访问", "自定义集成", "优先支持"],
      billing: {
        amount: 999,
        currency: "CNY",
        period: "月",
        nextBilling: new Date("2024-02-15"),
      },
    },
    {
      id: "2",
      name: "锦澜家居华东分公司",
      domain: "jinlan-east.com",
      plan: "professional",
      status: "active",
      users: 28,
      maxUsers: 50,
      createdAt: new Date("2024-02-20"),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      storage: 8.3,
      maxStorage: 50,
      features: ["基础分析", "团队协作", "数据导出"],
      billing: {
        amount: 499,
        currency: "CNY",
        period: "月",
        nextBilling: new Date("2024-03-20"),
      },
    },
    {
      id: "3",
      name: "锦澜家居华南分公司",
      domain: "jinlan-south.com",
      plan: "professional",
      status: "active",
      users: 32,
      maxUsers: 50,
      createdAt: new Date("2024-03-10"),
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000),
      storage: 12.1,
      maxStorage: 50,
      features: ["基础分析", "团队协作", "数据导出"],
      billing: {
        amount: 499,
        currency: "CNY",
        period: "月",
        nextBilling: new Date("2024-04-10"),
      },
    },
    {
      id: "4",
      name: "合作伙伴A",
      domain: "partner-a.com",
      plan: "basic",
      status: "trial",
      users: 8,
      maxUsers: 10,
      createdAt: new Date("2024-06-01"),
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
      storage: 2.5,
      maxStorage: 10,
      features: ["基础功能", "标准支持"],
      billing: {
        amount: 0,
        currency: "CNY",
        period: "试用",
        nextBilling: new Date("2024-07-01"),
      },
    },
  ]

  const users: User[] = [
    {
      id: "1",
      name: "张总经理",
      email: "zhang@jinlan-hq.com",
      role: "admin",
      tenantId: "1",
      status: "active",
      lastLogin: new Date(),
      permissions: ["全部权限"],
    },
    {
      id: "2",
      name: "李部长",
      email: "li@jinlan-hq.com",
      role: "manager",
      tenantId: "1",
      status: "active",
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      permissions: ["用户管理", "数据查看", "报表生成"],
    },
    {
      id: "3",
      name: "王主管",
      email: "wang@jinlan-east.com",
      role: "admin",
      tenantId: "2",
      status: "active",
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      permissions: ["全部权限"],
    },
    {
      id: "4",
      name: "赵员工",
      email: "zhao@jinlan-south.com",
      role: "user",
      tenantId: "3",
      status: "active",
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
      permissions: ["数据查看"],
    },
  ]

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return <Crown className="w-4 h-4" />
      case "professional":
        return <Star className="w-4 h-4" />
      case "basic":
        return <Zap className="w-4 h-4" />
      default:
        return <Building2 className="w-4 h-4" />
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "professional":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "basic":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "trial":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "manager":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateTenant = () => {
    console.log("创建租户:", newTenant)
    setIsCreateDialogOpen(false)
    setNewTenant({
      name: "",
      domain: "",
      plan: "",
      adminEmail: "",
      adminName: "",
      description: "",
    })
  }

  const handleTenantAction = (action: string, tenantId: string) => {
    console.log(`执行操作: ${action} 对租户: ${tenantId}`)
  }

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.domain.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">多租户管理</h1>
          <p className="text-slate-600 mt-2">管理多个企业组织和用户权限</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              新建租户
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>创建新租户</DialogTitle>
              <DialogDescription>添加新的企业组织到系统中</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tenant-name">租户名称</Label>
                  <Input
                    id="tenant-name"
                    placeholder="输入租户名称"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tenant-domain">域名</Label>
                  <Input
                    id="tenant-domain"
                    placeholder="example.com"
                    value={newTenant.domain}
                    onChange={(e) => setNewTenant({ ...newTenant, domain: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tenant-plan">套餐类型</Label>
                  <Select value={newTenant.plan} onValueChange={(value) => setNewTenant({ ...newTenant, plan: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择套餐" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">基础版 - ¥199/月</SelectItem>
                      <SelectItem value="professional">专业版 - ¥499/月</SelectItem>
                      <SelectItem value="enterprise">企业版 - ¥999/月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="admin-name">管理员姓名</Label>
                  <Input
                    id="admin-name"
                    placeholder="输入管理员姓名"
                    value={newTenant.adminName}
                    onChange={(e) => setNewTenant({ ...newTenant, adminName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="admin-email">管理员邮箱</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={newTenant.adminEmail}
                    onChange={(e) => setNewTenant({ ...newTenant, adminEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tenant-description">描述</Label>
                  <Textarea
                    id="tenant-description"
                    placeholder="租户描述信息"
                    value={newTenant.description}
                    onChange={(e) => setNewTenant({ ...newTenant, description: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleCreateTenant}>创建</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 border-l-4 border-l-emerald-500 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">总租户数</p>
              <p className="text-2xl font-bold text-emerald-600">{tenants.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-emerald-400" />
          </div>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 border-l-4 border-l-emerald-500 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">活跃租户</p>
              <p className="text-2xl font-bold text-emerald-600">
                {tenants.filter((t) => t.status === "active").length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-emerald-400" />
          </div>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 border-l-4 border-l-emerald-500 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">总用户数</p>
              <p className="text-2xl font-bold text-emerald-600">
                {tenants.reduce((sum, tenant) => sum + tenant.users, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-emerald-400" />
          </div>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 border-l-4 border-l-emerald-500 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">月收入</p>
              <p className="text-2xl font-bold text-emerald-600">
                ¥{tenants.reduce((sum, tenant) => sum + tenant.billing.amount, 0).toLocaleString()}
              </p>
            </div>
            <Globe className="w-8 h-8 text-emerald-400" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="tenants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tenants">租户管理</TabsTrigger>
          <TabsTrigger value="users">用户权限</TabsTrigger>
          <TabsTrigger value="billing">计费管理</TabsTrigger>
          <TabsTrigger value="settings">系统配置</TabsTrigger>
        </TabsList>

        <TabsContent value="tenants" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索租户名称或域名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="筛选套餐" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部套餐</SelectItem>
                <SelectItem value="basic">基础版</SelectItem>
                <SelectItem value="professional">专业版</SelectItem>
                <SelectItem value="enterprise">企业版</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredTenants.map((tenant) => (
              <Card
                key={tenant.id}
                className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 border-l-4 border-l-emerald-500 p-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      {tenant.logo ? (
                        <AvatarImage src={tenant.logo || "/placeholder.svg"} alt={tenant.name} />
                      ) : (
                        <AvatarFallback className="bg-emerald-100 text-emerald-600">
                          <Building2 className="w-6 h-6" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:translate-x-1 transition-transform duration-300">
                        {tenant.name}
                      </h3>
                      <p className="text-sm text-slate-600">{tenant.domain}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getPlanColor(tenant.plan)}>
                          {getPlanIcon(tenant.plan)}
                          <span className="ml-1 capitalize">
                            {tenant.plan === "basic" ? "基础版" : tenant.plan === "professional" ? "专业版" : "企业版"}
                          </span>
                        </Badge>
                        <Badge className={getStatusColor(tenant.status)}>
                          {tenant.status === "active" ? "活跃" : tenant.status === "trial" ? "试用" : "暂停"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">用户数</p>
                          <p className="font-semibold">
                            {tenant.users}/{tenant.maxUsers}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600">存储</p>
                          <p className="font-semibold">
                            {tenant.storage}GB/{tenant.maxStorage}GB
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">最后活跃: {tenant.lastActive.toLocaleString()}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleTenantAction("view", tenant.id)}>
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTenantAction("edit", tenant.id)}>
                          编辑设置
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTenantAction("users", tenant.id)}>
                          管理用户
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTenantAction("billing", tenant.id)}>
                          计费设置
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleTenantAction("suspend", tenant.id)}
                        >
                          暂停服务
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* 租户详细信息 */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">功能特性</h4>
                      <div className="flex flex-wrap gap-1">
                        {tenant.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">计费信息</h4>
                      <p className="text-sm text-slate-600">
                        ¥{tenant.billing.amount}/{tenant.billing.period}
                      </p>
                      <p className="text-xs text-slate-500">
                        下次计费: {tenant.billing.nextBilling.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">使用情况</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>用户使用率</span>
                          <span>{Math.round((tenant.users / tenant.maxUsers) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-1 rounded-full"
                            style={{ width: `${(tenant.users / tenant.maxUsers) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>存储使用率</span>
                          <span>{Math.round((tenant.storage / tenant.maxStorage) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-blue-500 h-1 rounded-full"
                            style={{ width: `${(tenant.storage / tenant.maxStorage) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索用户姓名或邮箱..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              添加用户
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card
                key={user.id}
                className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 border-l-4 border-l-emerald-500 p-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:translate-x-1 transition-transform duration-300">
                        {user.name}
                      </h3>
                      <p className="text-sm text-slate-600">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role === "admin" ? "管理员" : user.role === "manager" ? "经理" : "用户"}
                        </Badge>
                        <Badge
                          className={
                            user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {user.status === "active" ? "活跃" : "非活跃"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-600">最后登录: {user.lastLogin.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">
                        租户: {tenants.find((t) => t.id === user.tenantId)?.name}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.permissions.slice(0, 2).map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {user.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.permissions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>编辑权限</DropdownMenuItem>
                        <DropdownMenuItem>重置密码</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">禁用用户</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <div className="grid gap-4">
            {tenants.map((tenant) => (
              <Card
                key={tenant.id}
                className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 hover:scale-105 border-l-4 border-l-emerald-500 p-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      {tenant.logo ? (
                        <AvatarImage src={tenant.logo || "/placeholder.svg"} alt={tenant.name} />
                      ) : (
                        <AvatarFallback className="bg-emerald-100 text-emerald-600">
                          <Building2 className="w-5 h-5" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:translate-x-1 transition-transform duration-300">
                        {tenant.name}
                      </h3>
                      <p className="text-sm text-slate-600">{tenant.domain}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">当前套餐</p>
                      <Badge className={getPlanColor(tenant.plan)}>
                        {tenant.plan === "basic" ? "基础版" : tenant.plan === "professional" ? "专业版" : "企业版"}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">月费用</p>
                      <p className="text-lg font-bold text-emerald-600">¥{tenant.billing.amount}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">下次计费</p>
                      <p className="text-sm font-medium">{tenant.billing.nextBilling.toLocaleDateString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">状态</p>
                      <Badge
                        className={
                          tenant.billing.amount > 0 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {tenant.billing.amount > 0 ? "正常" : "试用"}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-3 h-3 mr-1" />
                      管理
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-emerald-500 p-6">
              <h3 className="text-lg font-semibold mb-4">全局设置</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">自动备份</h4>
                    <p className="text-sm text-slate-600">每日自动备份所有租户数据</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">安全策略</h4>
                    <p className="text-sm text-slate-600">配置密码策略和登录限制</p>
                  </div>
                  <Button variant="outline">配置</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">监控告警</h4>
                    <p className="text-sm text-slate-600">系统性能和异常监控</p>
                  </div>
                  <Button variant="outline">管理</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">邮件通知</h4>
                    <p className="text-sm text-slate-600">系统事件邮件通知</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-emerald-500 p-6">
              <h3 className="text-lg font-semibold mb-4">资源限制</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="max-tenants">最大租户数</Label>
                    <Input id="max-tenants" type="number" defaultValue="100" />
                  </div>
                  <div>
                    <Label htmlFor="max-users-per-tenant">每租户最大用户数</Label>
                    <Input id="max-users-per-tenant" type="number" defaultValue="1000" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="max-storage">最大存储空间(GB)</Label>
                    <Input id="max-storage" type="number" defaultValue="1000" />
                  </div>
                  <div>
                    <Label htmlFor="api-rate-limit">API调用限制(/小时)</Label>
                    <Input id="api-rate-limit" type="number" defaultValue="10000" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300 border-l-4 border-l-emerald-500 p-6">
              <h3 className="text-lg font-semibold mb-4">安全配置</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">强制双因素认证</h4>
                    <p className="text-sm text-slate-600">要求所有管理员启用2FA</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">IP白名单</h4>
                    <p className="text-sm text-slate-600">限制管理后台访问IP</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">审计日志</h4>
                    <p className="text-sm text-slate-600">记录所有管理操作</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
