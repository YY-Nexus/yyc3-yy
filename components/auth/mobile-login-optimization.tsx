"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MobileLoginOptimizationProps {
  children: React.ReactNode
}

export function MobileLoginOptimization({ children }: MobileLoginOptimizationProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setViewportHeight(window.innerHeight)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("orientationchange", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
    }
  }, [])

  return (
    <div
      className={cn(
        "min-h-screen",
        isMobile && viewportHeight < 600 && "min-h-[100dvh]", // 使用动态视口高度
      )}
      style={{
        minHeight: isMobile ? `${viewportHeight}px` : "100vh",
      }}
    >
      {children}
    </div>
  )
}
