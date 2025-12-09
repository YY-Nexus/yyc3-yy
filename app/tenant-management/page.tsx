"use client"

import { TenantManagement } from "@/components/tenant-management"
import { PageContainer } from "@/components/layout/page-container"

export default function TenantManagementPage() {
  return (
    <PageContainer title="多门店管理" description="管理多个门店的运营数据、权限配置和业务流程">
      <TenantManagement />
    </PageContainer>
  )
}
