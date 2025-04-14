"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getApplicationsByCompany } from "@/lib/api"
import DashboardLayout from "@/components/dashboard-layout"
import { Search, Filter, FileText, Star } from "lucide-react"
import type { Application } from "@/lib/types"

export default function CandidatesPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

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
          app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (app.skills && app.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())))
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
          <h1 className="text-3xl font-bold mb-2">Candidates</h1>
          <p className="text-muted-foreground">Browse and manage candidates who have applied to your job listings</p>
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
              <p className={`text-sm font-medium ${statusFilter === "all" ? "text-primary" : ""}`}>All Candidates</p>
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
              <Star
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
              <FileText
                className={`h-5 w-5 mb-2 ${
                  statusFilter === "interview_scheduled" ? "text-emerald-500" : "text-muted-foreground"
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  statusFilter === "interview_scheduled" ? "text-emerald-500" : ""
                }`}
              >
                Interviews
              </p>
              <p className="text-2xl font-bold">{getStatusCount("interview_scheduled")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, job title, or skills"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="w-full md:w-auto flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Candidates</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="md:hidden">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Job Title</p>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="frontend">Frontend Developer</SelectItem>
                    <SelectItem value="ux">UX Designer</SelectItem>
                    <SelectItem value="devops">DevOps Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Match Score</p>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by match score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="90">90% and above</SelectItem>
                    <SelectItem value="80">80% and above</SelectItem>
                    <SelectItem value="70">70% and above</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Date Applied</p>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <p className="font-medium mb-2">Job Title</p>
                  <Select defaultValue="all">\
