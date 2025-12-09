"use client"

import { DashboardContent } from "@/components/dashboard-content"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <DashboardContent />
      </div>
    </div>
  )
}
