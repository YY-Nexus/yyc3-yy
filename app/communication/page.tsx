"use client"

import { useState } from "react"
import { PageContainer } from "@/components/layout/page-container"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, Send, Phone, Video, Plus, Search, Paperclip, Smile } from "lucide-react"

export default function CommunicationPage() {
  const [selectedChat, setSelectedChat] = useState("1")
  const [message, setMessage] = useState("")

  const chatList = [
    {
      id: "1",
      name: "产品开发团队",
      type: "group",
      lastMessage: "新产品原型设计已完成，请大家查看",
      time: "10:30",
      unread: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "张经理",
      type: "private",
      lastMessage: "明天的会议时间需要调整一下",
      time: "09:45",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "销售部门群",
      type: "group",
      lastMessage: "本月销售目标完成情况汇报",
      time: "昨天",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const messages = [
    {
      id: "1",
      sender: "张经理",
      content: "大家好，关于新产品的开发进度，我们需要加快推进",
      time: "09:30",
      isOwn: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      sender: "我",
      content: "好的，我这边的设计稿已经完成了，稍后发给大家",
      time: "09:32",
      isOwn: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      sender: "李工程师",
      content: "技术方案我已经评估过了，可行性很高",
      time: "09:35",
      isOwn: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("发送消息:", message)
      setMessage("")
    }
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">团队沟通</h1>
            <p className="text-slate-600 mt-1">与团队成员实时沟通协作</p>
          </div>
          <div className="flex gap-2">
            <EnhancedButton variant="outline">
              <Video className="w-4 h-4 mr-2" />
              视频会议
            </EnhancedButton>
            <EnhancedButton className="bg-sky-600 hover:bg-sky-700">
              <Plus className="w-4 h-4 mr-2" />
              新建群组
            </EnhancedButton>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard className="border-l-4 border-l-sky-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">活跃群组</p>
                <p className="text-2xl font-bold text-slate-800">12</p>
                <p className="text-xs text-sky-600 mt-1">正在使用</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-sky-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">今日消息</p>
                <p className="text-2xl font-bold text-slate-800">156</p>
                <p className="text-xs text-green-600 mt-1">↑ 23% 较昨日</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">在线成员</p>
                <p className="text-2xl font-bold text-slate-800">28</p>
                <p className="text-xs text-yellow-600 mt-1">当前在线</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">未读消息</p>
                <p className="text-2xl font-bold text-slate-800">5</p>
                <p className="text-xs text-purple-600 mt-1">需要处理</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </EnhancedCard>
        </div>

        {/* 沟通界面 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 群组列表 */}
          <EnhancedCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">群组列表</h2>
              <EnhancedButton size="sm" variant="outline">
                <Search className="w-4 h-4" />
              </EnhancedButton>
            </div>
            <div className="space-y-2">
              {chatList.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors ${
                    selectedChat === chat.id ? "bg-blue-50 border border-blue-200" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {chat.type === "group" && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{chat.name}</p>
                      <p className="text-sm text-slate-600 truncate w-32">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">{chat.time}</p>
                    {chat.unread > 0 && <Badge className="bg-red-500 text-white mt-1">{chat.unread}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>

          {/* 聊天区域 */}
          <div className="lg:col-span-2">
            <EnhancedCard className="h-[600px] flex flex-col">
              {/* 聊天头部 */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>产</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-slate-800">产品开发团队</h3>
                    <p className="text-sm text-slate-600">8 名成员，5 人在线</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <EnhancedButton size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </EnhancedButton>
                  <EnhancedButton size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </EnhancedButton>
                </div>
              </div>

              {/* 消息列表 */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-xs lg:max-w-md ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            msg.isOwn ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {!msg.isOwn && <p className="text-xs font-medium mb-1">{msg.sender}</p>}
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className={`text-xs mt-1 ${msg.isOwn ? "text-right text-sky-100" : "text-slate-500"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 输入区域 */}
              <div className="p-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <EnhancedButton size="sm" variant="outline">
                    <Paperclip className="w-4 h-4" />
                  </EnhancedButton>
                  <EnhancedButton size="sm" variant="outline">
                    <Smile className="w-4 h-4" />
                  </EnhancedButton>
                  <Input
                    placeholder="输入消息..."
                    className="flex-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                  />
                  <EnhancedButton className="bg-sky-600 hover:bg-sky-700" onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </EnhancedButton>
                </div>
              </div>
            </EnhancedCard>
          </div>
        </div>
      </div>
      <FloatingNavButtons />
    </PageContainer>
  )
}
