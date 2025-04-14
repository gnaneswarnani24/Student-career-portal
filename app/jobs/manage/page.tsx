"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPostedJobs } from "@/lib/api"
import DashboardLayout from "@/components/dashboard-layout"
import JobListingCard from "@/components/job-listing-card"
import { Search, Plus, Briefcase } from "lucide-react"
import type { Job } from "@/lib/types"

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getPostedJobs()

        // Add some mock draft and expired jobs for UI demonstration
        const mockJobs = [
          ...jobsData,
          {
            id: "job8",
            title: "Product Manager",
            company: "Tech Solutions Inc.",
            location: "Remote",
            type: "Full-time",
            description: "Looking for an experienced product manager to lead our product development.",
            requirements: ["Product Management", "Agile", "User Research"],
            responsibilities: ["Define product vision", "Work with engineering team", "Gather user feedback"],
            postedDate: "2023-03-10",
            postedDaysAgo: 25,
            deadline: "2023-04-10",
            status: "expired",
            recruiterId: "recruiter1",
            applicationsCount: 15,
            views: 200,
          },
          {
            id: "job9",
            title: "Marketing Specialist",
            company: "Tech Solutions Inc.",
            location: "New York, NY",
            type: "Full-time",
            description: "Draft job posting for a marketing specialist position.",
            requirements: ["Marketing", "Social Media", "Content Creation"],
            responsibilities: ["Create marketing campaigns", "Manage social media", "Analyze metrics"],
            postedDate: "",
            postedDaysAgo: 0,
            deadline: "",
            status: "draft",
            recruiterId: "recruiter1",
            applicationsCount: 0,
            views: 0,
          },
        ]

        setJobs(mockJobs)
        setFilteredJobs(mockJobs)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    let filtered = jobs

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((job) => job.status === statusFilter)
    }

    setFilteredJobs(filtered)
  }, [searchTerm, statusFilter, jobs])

  const getStatusCount = (status: string) => {
    return jobs.filter((job) => job.status === status).length
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse flex flex-col space-y-4 w-full">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
              <div className="h-20 bg-slate-200 rounded"></div>
              <div className="h-20 bg-slate-200 rounded"></div>
              <div className="h-20 bg-slate-200 rounded"></div>
              <div className="h-20 bg-slate-200 rounded"></div>
            </div>
            <div className="h-60 bg-slate-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Jobs</h1>
            <p className="text-muted-foreground">View and manage your job listings</p>
          </div>
          <Link href="/jobs/post">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("all")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Briefcase
                className={`h-5 w-5 mb-2 ${statusFilter === "all" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "all" ? "text-primary" : ""}`}>All Jobs</p>
              <p className="text-2xl font-bold">{jobs.length}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("active")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Briefcase
                className={`h-5 w-5 mb-2 ${statusFilter === "active" ? "text-emerald-500" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "active" ? "text-emerald-500" : ""}`}>Active</p>
              <p className="text-2xl font-bold">{getStatusCount("active")}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("draft")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Briefcase
                className={`h-5 w-5 mb-2 ${statusFilter === "draft" ? "text-blue-500" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "draft" ? "text-blue-500" : ""}`}>Drafts</p>
              <p className="text-2xl font-bold">{getStatusCount("draft")}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("expired")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Briefcase
                className={`h-5 w-5 mb-2 ${statusFilter === "expired" ? "text-amber-500" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "expired" ? "text-amber-500" : ""}`}>Expired</p>
              <p className="text-2xl font-bold">{getStatusCount("expired")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by job title or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="pt-4">
            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobListingCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Briefcase className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {searchTerm || statusFilter !== "all"
                    ? "No jobs match your current filters. Try adjusting your search criteria."
                    : "You haven't posted any jobs yet. Click the 'Post New Job' button to get started."}
                </p>
                {!searchTerm && statusFilter === "all" && (
                  <Link href="/jobs/post">
                    <Button>Post New Job</Button>
                  </Link>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="active" className="pt-4">
            {filteredJobs.filter((job) => job.status === "active").length > 0 ? (
              <div className="space-y-4">
                {filteredJobs
                  .filter((job) => job.status === "active")
                  .map((job) => (
                    <JobListingCard key={job.id} job={job} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Briefcase className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No active jobs</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  You don't have any active job listings. Post a new job or check your drafts.
                </p>
                <Link href="/jobs/post">
                  <Button>Post New Job</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          <TabsContent value="drafts" className="pt-4">
            {filteredJobs.filter((job) => job.status === "draft").length > 0 ? (
              <div className="space-y-4">
                {filteredJobs
                  .filter((job) => job.status === "draft")
                  .map((job) => (
                    <JobListingCard key={job.id} job={job} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Briefcase className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No draft jobs</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  You don't have any job drafts. Start creating a new job and save it as a draft to edit later.
                </p>
                <Link href="/jobs/post">
                  <Button>Create Draft</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
