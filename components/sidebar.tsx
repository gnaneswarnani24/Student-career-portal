"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Briefcase,
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
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const role = user?.role || "student"

  const studentLinks = [
    { href: "/dashboard/student", label: "Dashboard", icon: Home },
    { href: "/dashboard/student/jobs", label: "Jobs", icon: Briefcase },
    { href: "/dashboard/student/applications", label: "Applications", icon: ClipboardList },
    { href: "/dashboard/student/resume", label: "Resume", icon: FileText },
    { href: "/interviews", label: "Interviews", icon: Calendar },
    { href: "/tests", label: "Tests", icon: FileCheck },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/student/settings", label: "Settings", icon: Settings },
  ]

  const recruiterLinks = [
    { href: "/dashboard/recruiter", label: "Dashboard", icon: Home },
    { href: "/dashboard/recruiter/jobs", label: "Manage Jobs", icon: Briefcase },
    { href: "/dashboard/recruiter/candidates", label: "Candidates", icon: Users },
    { href: "/dashboard/recruiter/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/recruiter/settings", label: "Settings", icon: Settings },
  ]

  const adminLinks = [
    { href: "/dashboard/admin", label: "Dashboard", icon: Home },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    { href: "/dashboard/admin/jobs", label: "Jobs", icon: Briefcase },
    { href: "/dashboard/admin/reports", label: "Reports", icon: BarChart2 },
    { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ]

  const links = role === "student" ? studentLinks : role === "recruiter" ? recruiterLinks : adminLinks

  return (
    <div className="h-full w-64 border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href={`/dashboard/${role}`} className="flex items-center gap-2 font-semibold">
          {role === "student" ? (
            <FileText className="h-5 w-5" />
          ) : role === "recruiter" ? (
            <Briefcase className="h-5 w-5" />
          ) : (
            <Shield className="h-5 w-5" />
          )}
          <span className="capitalize">{role} Portal</span>
        </Link>
      </div>
      <div className="py-4">
        <nav className="grid gap-1 px-2">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link key={link.href} href={link.href} passHref>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-2", isActive ? "bg-muted font-medium" : "font-normal")}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
