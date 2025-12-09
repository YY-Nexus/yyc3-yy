"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Database,
  Zap,
  Eye,
  EyeOff,
  Save,
  X,
  AlertTriangle,
  Info,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Wifi,
  Download,
  Upload,
  HardDrive,
  Cpu,
  MemoryStick,
  Activity,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // 通用设置
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("zh-CN")
  const [timezone, setTimezone] = useState("Asia/Shanghai")
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD")

  // 通知设置
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationVolume, setNotificationVolume] = useState([70])

  // 隐私设置
  const [profileVisibility, setProfileVisibility] = useState("team")
  const [activityTracking, setActivityTracking] = useState(true)
  const [dataCollection, setDataCollection] = useState(true)
  const [analyticsSharing, setAnalyticsSharing] = useState(false)

  // 性能设置
  const [autoSave, setAutoSave] = useState(true)
  const [autoSaveInterval, setAutoSaveInterval] = useState([5])
  const [cacheEnabled, setCacheEnabled] = useState(true)
  const [compressionEnabled, setCompressionEnabled] = useState(true)
  const [preloadData, setPreloadData] = useState(true)

  // 安全设置
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState([30])
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [deviceTracking, setDeviceTracking] = useState(true)

  // 系统信息
  const systemInfo = {
    version: "v2.1.0",
    buildDate: "2024-01-15",
    environment: "生产环境",
    uptime: "15天 8小时",
    memoryUsage: 68,
    cpuUsage: 45,
    diskUsage: 72,
    networkStatus: "正常",
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // 模拟保存设置
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "设置已保存",
        description: "您的设置已成功更新并生效",
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "保存失败",
        description: "设置保存时出现错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    // 重置所有设置为默认值
    setTheme("light")
    setLanguage("zh-CN")
    setTimezone("Asia/Shanghai")
    setDateFormat("YYYY-MM-DD")
    setEmailNotifications(true)
    setPushNotifications(true)
    setSmsNotifications(false)
    setSoundEnabled(true)
    setNotificationVolume([70])
    setProfileVisibility("team")
    setActivityTracking(true)
    setDataCollection(true)
    setAnalyticsSharing(false)
    setAutoSave(true)
    setAutoSaveInterval([5])
    setCacheEnabled(true)
    setCompressionEnabled(true)
    setPreloadData(true)
    setTwoFactorAuth(false)
    setSessionTimeout([30])
    setLoginAlerts(true)
    setDeviceTracking(true)

    toast({
      title: "设置已重置",
      description: "所有设置已恢复为默认值",
    })
  }

  const handleExportSettings = () => {
    const settings = {
      theme,
      language,
      timezone,
      dateFormat,
      notifications: {
        email: emailNotifications,
        push: pushNotifications,
        sms: smsNotifications,
        sound: soundEnabled,
        volume: notificationVolume[0],
      },
      privacy: {
        profileVisibility,
        activityTracking,
        dataCollection,
        analyticsSharing,
      },
      performance: {
        autoSave,
        autoSaveInterval: autoSaveInterval[0],
        cacheEnabled,
        compressionEnabled,
        preloadData,
      },
      security: {
        twoFactorAuth,
        sessionTimeout: sessionTimeout[0],
        loginAlerts,
        deviceTracking,
      },
    }

    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `settings-${Date.now()}.json`
    a.click()

    toast({
      title: "设置已导出",
      description: "设置文件已下载到本地",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-sky-600" />
            系统设置
          </DialogTitle>
          <DialogDescription>管理您的个人偏好、通知、隐私和安全设置</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">通用</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
            <TabsTrigger value="privacy">隐私</TabsTrigger>
            <TabsTrigger value="performance">性能</TabsTrigger>
            <TabsTrigger value="security">安全</TabsTrigger>
            <TabsTrigger value="system">系统</TabsTrigger>
          </TabsList>

          {/* 通用设置 */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5 text-sky-600" />
                  外观设置
                </CardTitle>
                <CardDescription>自定义界面外观和主题</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">主题模式</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4" />
                            浅色主题
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="w-4 h-4" />
                            深色主题
                          </div>
                        </SelectItem>
                        <SelectItem value="auto">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4" />
                            跟随系统
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">显示语言</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">🇨🇳 简体中文</SelectItem>
                        <SelectItem value="zh-TW">🇹🇼 繁體中文</SelectItem>
                        <SelectItem value="en-US">🇺🇸 English</SelectItem>
                        <SelectItem value="ja-JP">🇯🇵 日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">时区设置</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">中国标准时间 (UTC+8)</SelectItem>
                        <SelectItem value="Asia/Tokyo">日本标准时间 (UTC+9)</SelectItem>
                        <SelectItem value="America/New_York">美国东部时间 (UTC-5)</SelectItem>
                        <SelectItem value="Europe/London">格林威治时间 (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">日期格式</Label>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YYYY-MM-DD">2024-01-15</SelectItem>
                        <SelectItem value="DD/MM/YYYY">15/01/2024</SelectItem>
                        <SelectItem value="MM/DD/YYYY">01/15/2024</SelectItem>
                        <SelectItem value="YYYY年MM月DD日">2024年01月15日</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 通知设置 */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-sky-600" />
                  通知偏好
                </CardTitle>
                <CardDescription>管理您接收通知的方式和频率</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">邮件通知</Label>
                      <p className="text-xs text-muted-foreground">接收重要更新和提醒邮件</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">推送通知</Label>
                      <p className="text-xs text-muted-foreground">在浏览器中显示实时通知</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">短信通知</Label>
                      <p className="text-xs text-muted-foreground">紧急情况下发送短信提醒</p>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">声音提醒</Label>
                        <p className="text-xs text-muted-foreground">播放通知声音</p>
                      </div>
                      <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                    </div>

                    {soundEnabled && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">通知音量</Label>
                          <span className="text-sm text-muted-foreground">{notificationVolume[0]}%</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <VolumeX className="w-4 h-4 text-muted-foreground" />
                          <Slider
                            value={notificationVolume}
                            onValueChange={setNotificationVolume}
                            max={100}
                            min={0}
                            step={5}
                            className="flex-1"
                          />
                          <Volume2 className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 隐私设置 */}
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sky-600" />
                  隐私控制
                </CardTitle>
                <CardDescription>管理您的数据隐私和可见性设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>个人资料可见性</Label>
                    <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            公开 - 所有人可见
                          </div>
                        </SelectItem>
                        <SelectItem value="team">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            团队 - 仅团队成员可见
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <EyeOff className="w-4 h-4" />
                            私密 - 仅自己可见
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">活动跟踪</Label>
                      <p className="text-xs text-muted-foreground">记录您的系统使用活动</p>
                    </div>
                    <Switch checked={activityTracking} onCheckedChange={setActivityTracking} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">数据收集</Label>
                      <p className="text-xs text-muted-foreground">收集使用数据以改进服务</p>
                    </div>
                    <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">分析数据共享</Label>
                      <p className="text-xs text-muted-foreground">与第三方分析服务共享匿名数据</p>
                    </div>
                    <Switch checked={analyticsSharing} onCheckedChange={setAnalyticsSharing} />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-amber-800">隐私提醒</h4>
                      <p className="text-xs text-amber-700">
                        我们严格遵守数据保护法规，您的个人信息将得到妥善保护。
                        您可以随时修改这些设置或请求删除您的数据。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 性能设置 */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-sky-600" />
                  性能优化
                </CardTitle>
                <CardDescription>调整系统性能和响应速度</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">自动保存</Label>
                      <p className="text-xs text-muted-foreground">自动保存您的工作进度</p>
                    </div>
                    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>

                  {autoSave && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">自动保存间隔</Label>
                        <span className="text-sm text-muted-foreground">{autoSaveInterval[0]} 分钟</span>
                      </div>
                      <Slider
                        value={autoSaveInterval}
                        onValueChange={setAutoSaveInterval}
                        max={30}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">启用缓存</Label>
                      <p className="text-xs text-muted-foreground">缓存常用数据以提高加载速度</p>
                    </div>
                    <Switch checked={cacheEnabled} onCheckedChange={setCacheEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">数据压缩</Label>
                      <p className="text-xs text-muted-foreground">压缩传输数据以节省带宽</p>
                    </div>
                    <Switch checked={compressionEnabled} onCheckedChange={setCompressionEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">预加载数据</Label>
                      <p className="text-xs text-muted-foreground">预先加载可能需要的数据</p>
                    </div>
                    <Switch checked={preloadData} onCheckedChange={setPreloadData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 安全设置 */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sky-600" />
                  安全设置
                </CardTitle>
                <CardDescription>保护您的账户和数据安全</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">双因素认证</Label>
                      <p className="text-xs text-muted-foreground">为您的账户添加额外的安全层</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                      {twoFactorAuth && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          已启用
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">会话超时</Label>
                      <span className="text-sm text-muted-foreground">{sessionTimeout[0]} 分钟</span>
                    </div>
                    <Slider
                      value={sessionTimeout}
                      onValueChange={setSessionTimeout}
                      max={120}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">无操作后自动退出登录的时间</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">登录提醒</Label>
                      <p className="text-xs text-muted-foreground">新设备登录时发送通知</p>
                    </div>
                    <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">设备跟踪</Label>
                      <p className="text-xs text-muted-foreground">记录登录设备信息</p>
                    </div>
                    <Switch checked={deviceTracking} onCheckedChange={setDeviceTracking} />
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-red-800">安全提醒</h4>
                      <p className="text-xs text-red-700">
                        建议启用双因素认证以提高账户安全性。 如发现异常登录活动，请立即联系管理员。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 系统信息 */}
          <TabsContent value="system" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database className="w-5 h-5 text-sky-600" />
                    系统信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">版本号</span>
                      <Badge variant="outline">{systemInfo.version}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">构建日期</span>
                      <span className="text-sm">{systemInfo.buildDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">运行环境</span>
                      <Badge className="bg-green-100 text-green-800">{systemInfo.environment}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">运行时间</span>
                      <span className="text-sm">{systemInfo.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">网络状态</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-3 h-3 text-green-500" />
                        <span className="text-sm text-green-600">{systemInfo.networkStatus}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-sky-600" />
                    性能监控
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MemoryStick className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">内存使用</span>
                        </div>
                        <span className="text-sm font-medium">{systemInfo.memoryUsage}%</span>
                      </div>
                      <Progress value={systemInfo.memoryUsage} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-green-500" />
                          <span className="text-sm">CPU使用</span>
                        </div>
                        <span className="text-sm font-medium">{systemInfo.cpuUsage}%</span>
                      </div>
                      <Progress value={systemInfo.cpuUsage} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-purple-500" />
                          <span className="text-sm">磁盘使用</span>
                        </div>
                        <span className="text-sm font-medium">{systemInfo.diskUsage}%</span>
                      </div>
                      <Progress value={systemInfo.diskUsage} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">操作选项</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" onClick={handleExportSettings}>
                    <Download className="w-4 h-4 mr-2" />
                    导出设置
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    导入设置
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <X className="w-4 h-4 mr-2" />
                    重置设置
                  </Button>
                  <Button variant="outline" size="sm">
                    <Info className="w-4 h-4 mr-2" />
                    检查更新
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleReset} size="sm">
              重置默认
            </Button>
            <Button variant="outline" onClick={handleExportSettings} size="sm">
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4 mr-2" />
              取消
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "保存中..." : "保存设置"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
