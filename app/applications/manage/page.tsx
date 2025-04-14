"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getApplicationsByCompany } from "@/lib/api"
import DashboardLayout from "@/components/dashboard-layout"
import { Search, FileText, Calendar, CheckCircle, X } from "lucide-react"
import type { Application } from "@/lib/types"

export default function ManageApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applicationsData = await getApplicationsByCompany()

        // Add more mock applications for UI demonstration
        const mockApplications = [
          ...applicationsData,
          {
            id: "app6",
            jobId: "job5",
            jobTitle: "DevOps Engineer",
            company: "Tech Solutions Inc.",
            studentId: "student4",
            studentName: "Emily Wilson",
            resumeUrl: "/resumes/emily-wilson.pdf",
            appliedDate: "2023-03-20",
            status: "new",
            skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
            matchScore: 92,
          },
          {
            id: "app7",
            jobId: "job1",
            jobTitle: "Frontend Developer",
            company: "Tech Solutions Inc.",
            studentId: "student5",
            studentName: "David Brown",
            resumeUrl: "/resumes/david-brown.pdf",
            appliedDate: "2023-04-01",
            status: "rejected",
            skills: ["JavaScript", "Angular", "CSS"],
            matchScore: 65,
          },
        ]

        setApplications(mockApplications)
        setFilteredApplications(mockApplications)
      } catch (error) {
        console.error("Error fetching applications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  useEffect(() => {
    let filtered = applications

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter)
    }

    setFilteredApplications(filtered)
  }, [searchTerm, statusFilter, applications])

  const getStatusCount = (status: string) => {
    return applications.filter((app) => app.status === status).length
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="outline">New</Badge>
      case "shortlisted":
        return <Badge variant="secondary">Shortlisted</Badge>
      case "interview_scheduled":
        return <Badge className="bg-green-500">Interview Scheduled</Badge>
      case "interview_today":
        return <Badge className="bg-amber-500">Interview Today</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
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
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Applications</h1>
          <p className="text-muted-foreground">Review and process job applications from candidates</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("all")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <FileText
                className={`h-5 w-5 mb-2 ${statusFilter === "all" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "all" ? "text-primary" : ""}`}>All Applications</p>
              <p className="text-2xl font-bold">{applications.length}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("new")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <FileText
                className={`h-5 w-5 mb-2 ${statusFilter === "new" ? "text-blue-500" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "new" ? "text-blue-500" : ""}`}>New</p>
              <p className="text-2xl font-bold">{getStatusCount("new")}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("shortlisted")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <CheckCircle
                className={`h-5 w-5 mb-2 ${statusFilter === "shortlisted" ? "text-amber-500" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "shortlisted" ? "text-amber-500" : ""}`}>
                Shortlisted
              </p>
              <p className="text-2xl font-bold">{getStatusCount("shortlisted")}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("interview_scheduled")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Calendar
                className={`h-5 w-5 mb-2 ${
                  statusFilter === "interview_scheduled" ? "text-emerald-500" : "text-muted-foreground"
                }`}
              />
              <p className={`text-sm font-medium ${statusFilter === "interview_scheduled" ? "text-emerald-500" : ""}`}>
                Interviews
              </p>
              <p className="text-2xl font-bold">
                {getStatusCount("interview_scheduled") + getStatusCount("interview_today")}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by candidate name or job title"
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
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="interview_today">Interview Today</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="processed">Processed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="pt-4">
            {filteredApplications.length > 0 ? (
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <Card key={application.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-4 md:p-6 flex-1">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={application.studentName} />
                              <AvatarFallback>{application.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{application.studentName}</h3>
                                {getStatusBadge(application.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Applied for {application.jobTitle} on {application.appliedDate}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium">Match Score</p>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-lg font-bold">{application.matchScore || "N/A"}</span>
                                {application.matchScore && application.matchScore >= 80 && (
                                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Resume</p>
                              <Link
                                href={application.resumeUrl}
                                className="text-sm text-primary hover:underline mt-1 inline-block"
                              >
                                View Resume
                              </Link>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Skills</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {application.skills ? (
                                  application.skills.slice(0, 3).map((skill, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-sm text-muted-foreground">Not specified</span>
                                )}
                                {application.skills && application.skills.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{application.skills.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex md:flex-col border-t md:border-t-0 md:border-l p-4 md:justify-center md:w-48 gap-2">
                          <Link href={`/applications/${application.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                          <div className="flex md:flex-col gap-2 flex-1">
                            {application.status === "new" && (
                              <>
                                <Link href={`/applications/${application.id}/shortlist`} className="flex-1">
                                  <Button variant="outline" size="sm" className="w-full">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Shortlist
                                  </Button>
                                </Link>
                                <Link href={`/applications/${application.id}/reject`} className="flex-1">
                                  <Button variant="outline" size="sm" className="w-full">
                                    <X className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </Link>
                              </>
                            )}
                            {application.status === "shortlisted" && (
                              <Link href={`/applications/${application.id}/schedule`} className="flex-1">
                                <Button className="w-full">Schedule Interview</Button>
                              </Link>
                            )}
                            {(application.status === "interview_scheduled" ||
                              application.status === "interview_today") && (
                              <Link href={`/interviews/${application.interviewId}`} className="flex-1">
                                <Button className="w-full">View Interview</Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No applications found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {searchTerm || statusFilter !== "all"
                    ? "No applications match your current filters. Try adjusting your search criteria."
                    : "You haven't received any job applications yet. Post more jobs to attract candidates."}
                </p>
                {!searchTerm && statusFilter === "all" && (
                  <Link href="/jobs/post">
                    <Button>Post New Job</Button>
                  </Link>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="pending" className="pt-4">
            {filteredApplications.filter((app) => app.status === "new").length > 0 ? (
              <div className="space-y-4">
                {filteredApplications
                  .filter((app) => app.status === "new")
                  .map((application) => (
                    <Card key={application.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-4 md:p-6 flex-1">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={application.studentName} />
                                <AvatarFallback>{application.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{application.studentName}</h3>
                                  {getStatusBadge(application.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Applied for {application.jobTitle} on {application.appliedDate}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm font-medium">Match Score</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-lg font-bold">{application.matchScore || "N/A"}</span>
                                  {application.matchScore && application.matchScore >= 80 && (
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Resume</p>
                                <Link
                                  href={application.resumeUrl}
                                  className="text-sm text-primary hover:underline mt-1 inline-block"
                                >
                                  View Resume
                                </Link>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Skills</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {application.skills ? (
                                    application.skills.slice(0, 3).map((skill, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))
                                  ) : (
                                    <span className="text-sm text-muted-foreground">Not specified</span>
                                  )}
                                  {application.skills && application.skills.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{application.skills.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex md:flex-col border-t md:border-t-0 md:border-l p-4 md:justify-center md:w-48 gap-2">
                            <Link href={`/applications/${application.id}`} className="flex-1">
                              <Button variant="outline" className="w-full">
                                View Details
                              </Button>
                            </Link>
                            <div className="flex md:flex-col gap-2 flex-1">
                              <Link href={`/applications/${application.id}/shortlist`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Shortlist
                                </Button>
                              </Link>
                              <Link href={`/applications/${application.id}/reject`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full">
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No pending applications</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You've reviewed all applications. Check back later for new applications.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="processed" className="pt-4">
            {filteredApplications.filter((app) => app.status !== "new").length > 0 ? (
              <div className="space-y-4">
                {filteredApplications
                  .filter((app) => app.status !== "new")
                  .map((application) => (
                    <Card key={application.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-4 md:p-6 flex-1">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={application.studentName} />
                                <AvatarFallback>{application.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{application.studentName}</h3>
                                  {getStatusBadge(application.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Applied for {application.jobTitle} on {application.appliedDate}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm font-medium">Match Score</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-lg font-bold">{application.matchScore || "N/A"}</span>
                                  {application.matchScore && application.matchScore >= 80 && (
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Resume</p>
                                <Link
                                  href={application.resumeUrl}
                                  className="text-sm text-primary hover:underline mt-1 inline-block"
                                >
                                  View Resume
                                </Link>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Status</p>
                                <p className="text-sm mt-1">
                                  {application.status === "shortlisted"
                                    ? "Shortlisted, awaiting interview"
                                    : application.status === "interview_scheduled"
                                      ? "Interview scheduled"
                                      : application.status === "interview_today"
                                        ? "Interview today"
                                        : "Application rejected"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex md:flex-col border-t md:border-t-0 md:border-l p-4 md:justify-center md:w-48 gap-2">
                            <Link href={`/applications/${application.id}`} className="flex-1">
                              <Button variant="outline" className="w-full">
                                View Details
                              </Button>
                            </Link>
                            {application.status === "shortlisted" && (
                              <Link href={`/applications/${application.id}/schedule`} className="flex-1">
                                <Button className="w-full">Schedule Interview</Button>
                              </Link>
                            )}
                            {(application.status === "interview_scheduled" ||
                              application.status === "interview_today") && (
                              <Link href={`/interviews/${application.interviewId}`} className="flex-1">
                                <Button className="w-full">View Interview</Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No processed applications</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You haven't processed any applications yet. Review your pending applications.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
