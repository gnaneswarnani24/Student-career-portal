"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function Dashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect based on user role
        router.push(`/dashboard/${user.role}`)
      } else {
        // No user, redirect to login
        router.push("/login")
      }
    }
  }, [user, isLoading, router])

  // Show loading state while checking auth
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-lg">Loading dashboard...</p>
      </div>
    </div>
  )
}
