"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Briefcase,
  GraduationCap,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  PlusCircle,
  CheckSquare,
  BookmarkPlus,
  Search,
  MessageSquare,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Get the first letter of the user's name for the avatar
  const getInitials = () => {
    if (!user?.name) return "U"
    return user.name.charAt(0).toUpperCase()
  }

  // Define navigation items based on user role
  const getNavItems = () => {
    if (user?.role === "admin") {
      return [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Pending Approvals", href: "/admin/approvals", icon: CheckSquare, badge: 5 },
        { name: "All Jobs", href: "/admin/jobs", icon: Briefcase },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Reports", href: "/admin/reports", icon: FileText },
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ]
    } else if (user?.role === "recruiter") {
      return [
        { name: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
        { name: "Post Job", href: "/recruiter/post-job", icon: PlusCircle },
        { name: "My Listings", href: "/recruiter/jobs", icon: Briefcase },
        { name: "Applications", href: "/recruiter/applications", icon: FileText, badge: 8 },
        { name: "Messages", href: "/recruiter/messages", icon: MessageSquare },
        { name: "Settings", href: "/recruiter/settings", icon: Settings },
      ]
    } else {
      return [
        { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
        { name: "Browse Jobs", href: "/student/jobs", icon: Search },
        { name: "Saved Jobs", href: "/student/saved", icon: BookmarkPlus },
        { name: "My Applications", href: "/student/applications", icon: FileText },
        { name: "Messages", href: "/student/messages", icon: MessageSquare, badge: 2 },
        { name: "Profile", href: "/student/profile", icon: Settings },
      ]
    }
  }

  const navItems = getNavItems()

  const getRoleIcon = () => {
    switch (user?.role) {
      case "admin":
        return <ShieldCheck className="h-5 w-5 text-pink-500" />
      case "recruiter":
        return <Briefcase className="h-5 w-5 text-cyan-500" />
      default:
        return <GraduationCap className="h-5 w-5 text-purple-500" />
    }
  }

  const getRoleGradient = () => {
    switch (user?.role) {
      case "admin":
        return "from-pink-500 to-rose-500"
      case "recruiter":
        return "from-cyan-500 to-blue-500"
      default:
        return "from-purple-500 to-indigo-500"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white border-r shadow-sm">
        <div className="flex-1 flex flex-col min-h-0">
          <div className={`flex items-center h-16 px-4 border-b bg-gradient-to-r ${getRoleGradient()}`}>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <Briefcase className="h-6 w-6" />
              <span>Career Portal</span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="px-4 mb-6">
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-white shadow-md">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                  <AvatarFallback className={`bg-gradient-to-br ${getRoleGradient()} text-white`}>
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <div className="flex items-center text-sm text-gray-500 gap-1">
                    {getRoleIcon()}
                    <span className="capitalize">{user?.role}</span>
                  </div>
                </div>
              </div>
            </div>
            <nav className="mt-2 flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md relative",
                    pathname === item.href
                      ? `bg-gradient-to-r ${getRoleGradient()} text-white shadow-md`
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      pathname === item.href ? "text-white" : "text-gray-400 group-hover:text-gray-500",
                    )}
                  />
                  {item.name}
                  {item.badge && (
                    <span
                      className={`absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${
                        pathname === item.href ? "bg-white text-indigo-600" : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <Button
              variant="ghost"
              className="flex items-center w-full text-gray-700 hover:bg-gray-100"
              onClick={logout}
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-40 bg-white rounded-full shadow-md">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex-1 flex flex-col min-h-0">
              <div className={`flex items-center h-16 px-4 border-b bg-gradient-to-r ${getRoleGradient()}`}>
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
                  <Briefcase className="h-6 w-6" />
                  <span>Career Portal</span>
                </Link>
              </div>
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="px-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-white shadow-md">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                      <AvatarFallback className={`bg-gradient-to-br ${getRoleGradient()} text-white`}>
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <div className="flex items-center text-sm text-gray-500 gap-1">
                        {getRoleIcon()}
                        <span className="capitalize">{user?.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <nav className="mt-2 flex-1 px-2 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-md relative",
                        pathname === item.href
                          ? `bg-gradient-to-r ${getRoleGradient()} text-white shadow-md`
                          : "text-gray-700 hover:bg-gray-100",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5",
                          pathname === item.href ? "text-white" : "text-gray-400 group-hover:text-gray-500",
                        )}
                      />
                      {item.name}
                      {item.badge && (
                        <span
                          className={`absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${
                            pathname === item.href ? "bg-white text-indigo-600" : "bg-indigo-100 text-indigo-600"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t p-4">
                <Button
                  variant="ghost"
                  className="flex items-center w-full text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                  <span>Log out</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <header
          className={`sticky top-0 z-10 bg-white md:py-4 px-4 md:px-8 flex items-center justify-between h-16 md:h-auto transition-all duration-200 ${
            scrolled ? "shadow-md" : "shadow-sm"
          }`}
        >
          <div className="md:hidden flex items-center h-full">
            <Link
              href="/"
              className={`flex items-center gap-2 font-bold text-xl ml-10 bg-gradient-to-r ${getRoleGradient()} bg-clip-text text-transparent`}
            >
              <Briefcase
                className={`h-6 w-6 text-${user?.role === "admin" ? "pink" : user?.role === "recruiter" ? "cyan" : "purple"}-500`}
              />
              <span>Career Portal</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-gray-900">
              {navItems.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium flex items-center justify-center text-white">
                  {notifications}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-8 w-8 md:hidden border border-gray-200">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
              <AvatarFallback className={`bg-gradient-to-br ${getRoleGradient()} text-white`}>
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
