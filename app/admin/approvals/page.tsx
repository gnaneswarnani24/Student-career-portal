"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import JobCard from "@/components/job/job-card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, CheckCircle, Loader2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for pending job approvals
const mockPendingJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and TypeScript.",
    postedAt: "2 days ago",
    deadline: "2023-06-30",
    status: "pending" as const,
    isNew: true,
    skills: ["React", "TypeScript", "CSS", "HTML"],
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Creative Designs Co.",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "New York, NY",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    description: "Join our design team to create beautiful and intuitive user interfaces for our clients' products.",
    postedAt: "3 days ago",
    deadline: "2023-07-15",
    status: "pending" as const,
    skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
  },
  {
    id: "3",
    title: "Data Scientist Intern",
    company: "Data Insights Corp.",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "Remote",
    type: "Internship",
    description: "Great opportunity for students to gain hands-on experience in data science and machine learning.",
    postedAt: "1 day ago",
    deadline: "2023-06-25",
    status: "pending" as const,
    isNew: true,
    skills: ["Python", "Machine Learning", "Data Analysis", "Statistics"],
  },
]

export default function AdminApprovalsPage() {
  const { toast } = useToast()
  const [pendingJobs, setPendingJobs] = useState(mockPendingJobs)
  const [filteredJobs, setFilteredJobs] = useState(mockPendingJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchPendingJobs = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }

    fetchPendingJobs()
  }, [])

  useEffect(() => {
    let filtered = pendingJobs

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply job type filter
    if (filterType !== "all") {
      filtered = filtered.filter((job) => job.type.toLowerCase() === filterType.toLowerCase())
    }

    setFilteredJobs(filtered)
  }, [searchTerm, filterType, pendingJobs])

  const handleApprove = async (id: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Update local state
      setPendingJobs(pendingJobs.filter((job) => job.id !== id))

      toast({
        title: "Job approved",
        description: "The job listing has been approved and is now visible to students.",
        variant: "default",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error approving the job. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async (id: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Update local state
      setPendingJobs(pendingJobs.filter((job) => job.id !== id))

      toast({
        title: "Job rejected",
        description: "The job listing has been rejected and the recruiter has been notified.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error rejecting the job. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold md:hidden">Pending Approvals</h1>
            <p className="text-gray-500">Review and approve job listings submitted by recruiters</p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                className="pl-10 border-pink-200 focus-visible:ring-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px] border-pink-200 focus-visible:ring-pink-500">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Clock className="h-5 w-5 mr-2 text-pink-500" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-600">{pendingJobs.length}</div>
              <p className="text-sm text-gray-500">Jobs awaiting your review</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <CheckCircle className="h-5 w-5 mr-2 text-emerald-500" />
                Approved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">12</div>
              <p className="text-sm text-gray-500">Jobs approved in the last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Filter className="h-5 w-5 mr-2 text-indigo-500" />
                Average Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">4.2h</div>
              <p className="text-sm text-gray-500">Average time to review job listings</p>
            </CardContent>
          </Card>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
            <span className="ml-2 text-gray-500">Loading pending approvals...</span>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} actions="admin" onApprove={handleApprove} onReject={handleReject} />
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-pink-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No pending approvals</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm || filterType !== "all"
                ? "No job listings match your search criteria. Try a different search term."
                : "All job listings have been reviewed. Check back later for new submissions."}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
