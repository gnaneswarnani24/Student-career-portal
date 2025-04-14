"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Search,
  FileText,
  Briefcase,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  Users,
  BarChart3,
  Shield,
  User,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Simulate fetching user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock user data
        const userData = {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: pathname.includes("/student") ? "student" : pathname.includes("/recruiter") ? "recruiter" : "admin",
        }

        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [pathname])

  const role =
    user?.role || (pathname.includes("/student") ? "student" : pathname.includes("/recruiter") ? "recruiter" : "admin")

  const navigation = {
    student: [
      { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
      { name: "Search Jobs", href: "/jobs/search", icon: Search },
      { name: "My Applications", href: "/applications", icon: FileText },
      { name: "Resume", href: "/resume", icon: FileText },
      { name: "Mock Tests", href: "/tests", icon: FileText },
      { name: "Interviews", href: "/interviews", icon: Calendar },
      { name: "Messages", href: "/messages", icon: MessageSquare },
    ],
    recruiter: [
      { name: "Dashboard", href: "/dashboard/recruiter", icon: LayoutDashboard },
      { name: "Post Job", href: "/jobs/post", icon: Briefcase },
      { name: "Manage Jobs", href: "/jobs/manage", icon: Briefcase },
      { name: "Candidates", href: "/candidates", icon: Search },
      { name: "Applications", href: "/applications/manage", icon: FileText },
      { name: "Interviews", href: "/interviews/manage", icon: Calendar },
      { name: "Messages", href: "/messages", icon: MessageSquare },
    ],
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Manage Users", href: "/admin/users", icon: Users },
      { name: "Job Listings", href: "/admin/jobs", icon: Briefcase },
      { name: "Reports", href: "/admin/reports", icon: BarChart3 },
      { name: "System Activity", href: "/admin/activity", icon: Shield },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  }

  const handleLogout = () => {
    // Implement logout functionality
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    // Redirect to login page
    router.push("/login")
  }

  const NavItems = () => (
    <>
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <User className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{user?.name || "User"}</p>
          <p className="text-sm text-muted-foreground capitalize">{role}</p>
        </div>
      </div>
      <div className="space-y-1 px-3 py-2">
        {navigation[role as keyof typeof navigation].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </div>
      <div className="px-3 py-2">
        <Button variant="ghost" className="w-full justify-start gap-3 text-sm font-medium" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <aside className="w-64 border-r bg-background">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Briefcase className="h-5 w-5" />
                <span>Career Portal</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <NavItems />
            </div>
          </div>
        </aside>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 sm:max-w-xs">
                <div className="flex h-14 items-center border-b">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Briefcase className="h-5 w-5" />
                    <span>Career Portal</span>
                  </Link>
                </div>
                <div className="py-4">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          )}

          {isMobile && (
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Briefcase className="h-5 w-5" />
              <span>Career Portal</span>
            </Link>
          )}

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/messages">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/profile/${role === "admin" ? "admin" : ""}`}>
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
