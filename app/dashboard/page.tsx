"use client"

import { DashboardContent } from "@/components/dashboard-content"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <DashboardContent />
      <FloatingNavButtons />
    </div>
  )
}
