"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCompanyProfile, getPostedJobs, getApplicationsByCompany } from "@/lib/api"
import JobListingCard from "@/components/job-listing-card"
import CandidateCard from "@/components/candidate-card"
import { Loader2 } from "lucide-react"
import type { Job, Application } from "@/lib/types"

export default function RecruiterDashboard() {
  const [company, setCompany] = useState<any>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await getCompanyProfile()
        const jobsData = await getPostedJobs()
        const applicationsData = await getApplicationsByCompany()

        setCompany(companyData)
        setJobs(jobsData)
        setApplications(applicationsData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        <Link href="/jobs/post">
          <Button>Post New Job</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>{company?.name || "Your Company"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-medium">{company?.status || "Active"}</span>
              </div>
              <div className="flex justify-between">
                <span>Jobs Posted</span>
                <span className="font-medium">{jobs.length}</span>
              </div>
              <Link href="/company/profile">
                <Button variant="outline" size="sm" className="w-full">
                  Update Company Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Manage candidate applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Applications</span>
                <span className="font-bold">{applications.length}</span>
              </div>
              <div className="flex justify-between">
                <span>New</span>
                <span>{applications.filter((app) => app.status === "new").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Shortlisted</span>
                <span>{applications.filter((app) => app.status === "shortlisted").length}</span>
              </div>
              <Link href="/applications/manage">
                <Button variant="outline" size="sm" className="w-full">
                  Manage Applications
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interviews</CardTitle>
            <CardDescription>Upcoming interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Scheduled</span>
                <span className="font-bold">
                  {applications.filter((app) => app.status === "interview_scheduled").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Today</span>
                <span>{applications.filter((app) => app.status === "interview_today").length}</span>
              </div>
              <Link href="/interviews">
                <Button variant="outline" size="sm" className="w-full">
                  Manage Interviews
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs">
        <TabsList>
          <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
          <TabsTrigger value="candidates">Recent Candidates</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Job Listings</h2>
            <Link href="/jobs/manage">
              <Button variant="outline" size="sm">Manage All Jobs</Button>
            </Link>
          </div>
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.slice(0, 3).map((job) => (
                <JobListingCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              You haven&apos;t posted any jobs yet. Click &quot;Post New Job&quot; to get started.
            </p>
          )}
        </TabsContent>
        <TabsContent value="candidates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Applicants</h2>
            <Link href="/candidates">
              <Button variant="outline" size="sm">View All Candidates</Button>
            </Link>
          </div>
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.slice(0, 3).map((application) => (
                <CandidateCard key={application.id} application={application} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No applications received yet. Post jobs to attract candidates.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
