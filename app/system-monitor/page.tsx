"use client"

import { SystemStatusMonitor } from "@/components/system-status-monitor"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"

export default function SystemMonitorPage() {
  return (
    <div className="p-6">
      <SystemStatusMonitor />
      <FloatingNavButtons />
    </div>
  )
}
