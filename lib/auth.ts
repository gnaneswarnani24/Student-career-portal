// Mock authentication functions

/**
 * Login a user (used by login page)
 * @param username string
 * @param password string
 * @returns Promise<{ success: boolean, error?: string, role?: string }>
 */
export async function loginUser(username: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (!username || !password) {
    return { success: false, error: "Username and password are required" }
  }

  const MOCK_USERS = [
    { id: "1", name: "John Student", email: "student@example.com", password: "student", role: "student" },
    { id: "2", name: "Jane Recruiter", email: "recruiter@example.com", password: "recruiter", role: "recruiter" },
    { id: "3", name: "Admin User", email: "admin@example.com", password: "admin", role: "admin" },
  ]

  const user = MOCK_USERS.find(
    (u) => (u.email === username || u.name === username) && u.password === password
  )

  if (user) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user))
    }
    return { success: true, role: user.role }
  }

  return { success: false, error: "Invalid username or password" }
}

/**
 * Get the current user from localStorage/session
 * @returns Promise<User | null>
 */
export async function getCurrentUser() {
  if (typeof window === "undefined") return null

  try {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      return JSON.parse(storedUser)
    }
  } catch (error) {
    console.error("Error getting user from localStorage:", error)
  }

  return null
}

/**
 * Register a new user
 * @param name string
 * @param email string
 * @param password string
 * @param role string
 * @returns Promise<{ success: boolean, error?: string }>
 */
export async function registerUser(name: string, email: string, password: string, role: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required" }
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" }
  }

  const existingEmails = ["student@example.com", "recruiter@example.com", "admin@example.com"]
  if (existingEmails.includes(email.toLowerCase())) {
    return { success: false, error: "Email already in use" }
  }

  return { success: true }
}

/**
 * Logout the current user
 * @returns Promise<{ success: boolean }>
 */
export async function logoutUser() {
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
  return { success: true }
}
