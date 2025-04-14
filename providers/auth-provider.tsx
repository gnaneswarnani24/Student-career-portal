"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type UserRole = "student" | "recruiter" | "admin" | null

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Handle route protection
    if (!isLoading) {
      const publicRoutes = ["/", "/login", "/register"]

      if (!user && !publicRoutes.includes(pathname) && !pathname.startsWith("/_next")) {
        router.push("/login")
      } else if (user) {
        // Redirect based on role if trying to access unauthorized areas
        if (pathname.startsWith("/admin") && user.role !== "admin") {
          router.push(`/${user.role}`)
        } else if (pathname.startsWith("/recruiter") && user.role !== "recruiter" && user.role !== "admin") {
          router.push(`/${user.role}`)
        } else if (pathname.startsWith("/student") && user.role !== "student" && user.role !== "admin") {
          router.push(`/${user.role}`)
        }
      }
    }
  }, [isLoading, user, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock users for demonstration
      const users = [
        {
          id: "1",
          name: "Student User",
          email: "student@example.com",
          password: "password",
          role: "student" as UserRole,
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "2",
          name: "Recruiter User",
          email: "recruiter@example.com",
          password: "password",
          role: "recruiter" as UserRole,
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "3",
          name: "Admin User",
          email: "admin@example.com",
          password: "password",
          role: "admin" as UserRole,
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ]

      const foundUser = users.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        return true
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would send this data to your API
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
