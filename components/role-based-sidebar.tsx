"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Briefcase,
  Search,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
  Calendar,
  ClipboardList,
  BarChart2,
  FileCheck,
  Shield,
  LogOut,
  GraduationCap,
  PlusCircle,
  Bell,
} from "lucide-react"

export default function RoleBasedSidebar({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      })
      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: "Please try again",
      })
    }
  }

  // Get role from user or from pathname as fallback
  const role =
    user?.role ||
    (pathname?.includes("/student")
      ? "student"
      : pathname?.includes("/recruiter")
        ? "recruiter"
        : pathname?.includes("/admin")
          ? "admin"
          : "student")

  // Role-specific navigation items
  const navigationItems = {
    student: [
      { href: "/dashboard/student", label: "Dashboard", icon: Home },
      { href: "/jobs/search", label: "Search Jobs", icon: Search },
      { href: "/applications", label: "Applications", icon: ClipboardList },
      { href: "/resume", label: "Resume", icon: FileText },
      { href: "/interviews", label: "Interviews", icon: Calendar },
      { href: "/tests", label: "Mock Tests", icon: FileCheck },
      { href: "/messages", label: "Messages", icon: MessageSquare },
      { href: "/dashboard/student/settings", label: "Settings", icon: Settings },
    ],
    recruiter: [
      { href: "/dashboard/recruiter", label: "Dashboard", icon: Home },
      { href: "/jobs/post", label: "Post Job", icon: PlusCircle },
      { href: "/jobs/manage", label: "Manage Jobs", icon: Briefcase },
      { href: "/candidates", label: "Candidates", icon: Users },
      { href: "/applications/manage", label: "Applications", icon: FileText },
      { href: "/interviews", label: "Interviews", icon: Calendar },
      { href: "/messages", label: "Messages", icon: MessageSquare },
      { href: "/dashboard/recruiter/settings", label: "Settings", icon: Settings },
    ],
    admin: [
      { href: "/dashboard/admin", label: "Dashboard", icon: Home },
      { href: "/admin/approvals", label: "Approvals", icon: FileCheck, badge: 5 },
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
      { href: "/admin/reports", label: "Reports", icon: BarChart2 },
      { href: "/admin/activity", label: "Activity", icon: Calendar },
      { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
    ],
  }

  // Helper functions for role-specific styling
  const getRoleGradient = () => {
    switch (role) {
      case "student":
        return "from-violet-600 to-indigo-700"
      case "recruiter":
        return "from-cyan-600 to-blue-700"
      case "admin":
        return "from-pink-600 to-rose-700"
      default:
        return "from-violet-600 to-indigo-700"
    }
  }

  const getRoleAccentColor = () => {
    switch (role) {
      case "student":
        return "bg-violet-500 text-white"
      case "recruiter":
        return "bg-cyan-500 text-white"
      case "admin":
        return "bg-pink-500 text-white"
      default:
        return "bg-violet-500 text-white"
    }
  }

  const getInitials = () => {
    if (!user?.name) return "U"
    return user.name.charAt(0).toUpperCase()
  }

  if (!mounted) {
    return null // Avoid rendering on server
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r shadow-sm">
          <SidebarHeader className={`bg-gradient-to-r ${getRoleGradient()} text-white p-4`}>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                <AvatarFallback className="bg-white/20 text-white">{getInitials()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold truncate w-32">{user?.name || "User"}</p>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  {role === "student" ? (
                    <GraduationCap className="h-3 w-3" />
                  ) : role === "recruiter" ? (
                    <Briefcase className="h-3 w-3" />
                  ) : (
                    <Shield className="h-3 w-3" />
                  )}
                  <span className="capitalize">{role}</span>
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="pt-4">
            <SidebarMenu>
              {navigationItems[role as keyof typeof navigationItems].map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname?.startsWith(`${item.href}/`)}
                    tooltip={item.label}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`ml-auto rounded-full ${getRoleAccentColor()} text-xs px-2 py-0.5`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header for mobile */}
          <header className="lg:hidden border-b bg-white p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <div
                className={`bg-gradient-to-r ${getRoleGradient()} text-white rounded-md px-3 py-2 flex items-center`}
              >
                <Briefcase className="h-5 w-5 mr-2" />
                <span className="font-medium">Career Portal</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center text-white">
                  3
                </span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                <AvatarFallback className={`bg-gradient-to-br ${getRoleGradient()} text-white`}>
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto py-6 px-4 lg:px-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
