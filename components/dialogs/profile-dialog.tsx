"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AvatarUpload } from "@/components/avatar-upload"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Palette,
  Globe,
  Save,
  Edit3,
  Award,
  Clock,
  Activity,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [currentAvatar, setCurrentAvatar] = useState("/images/jinlan-icon-logo.png")
  const [profileData, setProfileData] = useState({
    name: "系统管理员",
    email: "admin@jinlan.com",
    phone: "+86 138-0013-8000",
    department: "信息技术部",
    position: "系统管理员",
    location: "上海市浦东新区",
    joinDate: "2023-01-15",
    bio: "负责企业管理系统的运维和技术支持，致力于为团队提供高效稳定的技术服务。",
    skills: ["系统管理", "数据分析", "项目管理", "团队协作"],
  })

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: "个人资料已更新",
    })
    setIsEditing(false)
  }

  const handleAvatarChange = (newAvatar: string) => {
    setCurrentAvatar(newAvatar)
    toast({
      title: "头像更新成功",
      description: "您的头像已更新",
    })
  }

  const recentActivities = [
    { action: "登录系统", time: "2分钟前", icon: Activity },
    { action: "查看客户数据", time: "15分钟前", icon: User },
    { action: "更新任务状态", time: "1小时前", icon: Clock },
    { action: "生成分析报告", time: "2小时前", icon: Award },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-sky-600" />
            个人资料
          </DialogTitle>
          <DialogDescription>管理您的个人信息和账户设置</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">基本信息</TabsTrigger>
            <TabsTrigger value="security">安全设置</TabsTrigger>
            <TabsTrigger value="preferences">偏好设置</TabsTrigger>
            <TabsTrigger value="activity">活动记录</TabsTrigger>
          </TabsList>

          {/* 基本信息 */}
          <TabsContent value="profile" className="space-y-6 max-h-[60vh] overflow-y-auto">
            {/* 头像和基本信息 */}
            <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <AvatarUpload
                  currentAvatar={currentAvatar}
                  onAvatarChange={handleAvatarChange}
                  size="lg"
                  fallbackText="管理员"
                />
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  在线
                </Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{profileData.name}</h3>
                    <p className="text-slate-600">{profileData.position}</p>
                    <p className="text-sm text-slate-500">{profileData.department}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    {isEditing ? "取消编辑" : "编辑资料"}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span className="text-slate-600">{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sky-600" />
                    <span className="text-slate-600">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span className="text-slate-600">{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span className="text-slate-600">入职：{profileData.joinDate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-sky-100 text-sky-800 border-sky-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* 详细信息表单 */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">电话</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">职位</Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">部门</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">地址</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">个人简介</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSave} className="bg-gradient-to-r from-sky-500 to-blue-600">
                    <Save className="w-4 h-4 mr-2" />
                    保存更改
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* 安全设置 */}
          <TabsContent value="security" className="space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <h3 className="font-medium text-orange-900">账户安全</h3>
                </div>
                <p className="text-sm text-orange-700">保护您的账户安全，定期更新密码和安全设置。</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">当前密码</Label>
                  <Input id="current-password" type="password" placeholder="请输入当前密码" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">新密码</Label>
                  <Input id="new-password" type="password" placeholder="请输入新密码" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">确认新密码</Label>
                  <Input id="confirm-password" type="password" placeholder="请再次输入新密码" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">双因素认证</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">短信验证</p>
                    <p className="text-sm text-slate-600">通过短信接收验证码</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    已启用
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">邮箱验证</p>
                    <p className="text-sm text-slate-600">通过邮箱接收验证码</p>
                  </div>
                  <Badge variant="secondary">未启用</Badge>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-sky-500 to-blue-600">
                <Shield className="w-4 h-4 mr-2" />
                更新安全设置
              </Button>
            </div>
          </TabsContent>

          {/* 偏好设置 */}
          <TabsContent value="preferences" className="space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-sky-600" />
                  <h3 className="font-medium">界面设置</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg cursor-pointer hover:bg-sky-50 transition-colors">
                    <div className="w-full h-20 bg-gradient-to-r from-sky-100 to-blue-100 rounded mb-2"></div>
                    <p className="text-sm font-medium">浅色主题</p>
                  </div>
                  <div className="p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="w-full h-20 bg-gradient-to-r from-slate-700 to-slate-900 rounded mb-2"></div>
                    <p className="text-sm font-medium">深色主题</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-sky-600" />
                  <h3 className="font-medium">语言设置</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>🇨🇳 简体中文</span>
                    <Badge variant="secondary" className="bg-sky-100 text-sky-800">
                      当前
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <span>🇺🇸 English</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <span>🇹🇼 繁體中文</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-sky-600" />
                  <h3 className="font-medium">通知设置</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>邮件通知</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>系统通知</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>任务提醒</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>消息推送</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 活动记录 */}
          <TabsContent value="activity" className="space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-600" />
                <h3 className="font-medium">最近活动</h3>
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">登录历史</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">上海市浦东新区</p>
                      <p className="text-xs text-slate-500">Chrome 浏览器 • 今天 09:30</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      当前会话
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">上海市浦东新区</p>
                      <p className="text-xs text-slate-500">Safari 浏览器 • 昨天 18:45</p>
                    </div>
                    <Badge variant="outline">已结束</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">北京市朝阳区</p>
                      <p className="text-xs text-slate-500">移动端 • 3天前 14:20</p>
                    </div>
                    <Badge variant="outline">已结束</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
