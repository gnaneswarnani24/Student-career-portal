"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

type UserRole = "student" | "recruiter" | "admin"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallbackPath?: string
}

export default function AuthGuard({ children, allowedRoles, fallbackPath = "/login" }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push(fallbackPath)
      return
    }

    if (user && allowedRoles.includes(user.role)) {
      setIsAuthorized(true)
    } else {
      // Redirect to appropriate dashboard based on role
      if (user) {
        router.push(`/dashboard/${user.role}`)
      } else {
        router.push(fallbackPath)
      }
    }
  }, [user, isLoading, isAuthenticated, allowedRoles, fallbackPath, router])

  // Show nothing while checking authorization
  if (isLoading || !isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
