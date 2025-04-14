import type React from "react"
import RoleBasedSidebar from "@/components/role-based-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RoleBasedSidebar>{children}</RoleBasedSidebar>
}
