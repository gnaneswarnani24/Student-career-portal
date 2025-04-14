"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getApplications } from "@/lib/api"
import DashboardLayout from "@/components/dashboard-layout"
import ApplicationCard from "@/components/application-card"
import { Search, FileText, Briefcase, Clock, Calendar, CheckCircle } from "lucide-react"
import type { Application } from "@/lib/types"

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applicationsData = await getApplications()
        setApplications(applicationsData)
        setFilteredApplications(applicationsData)
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
          app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.company.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const renderApplicationList = (apps: Application[]) => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="h-8 bg-slate-200 rounded w-24"></div>
                  <div className="h-8 bg-slate-200 rounded w-24"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    if (apps.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No applications found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {searchTerm || statusFilter !== "all"
              ? "No applications match your current filters. Try adjusting your search criteria."
              : "You haven't applied to any jobs yet. Start by searching for jobs that match your skills and interests."}
          </p>
          {!searchTerm && statusFilter === "all" && (
            <Link href="/jobs/search" className="mt-4 inline-block">
              <Button>Search Jobs</Button>
            </Link>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {apps.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track and manage your job applications</p>
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
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("all")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Briefcase
                className={`h-5 w-5 mb-2 ${statusFilter === "all" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "all" ? "text-primary" : ""}`}>All</p>
              <p className="text-2xl font-bold">{applications.length}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("pending")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Clock
                className={`h-5 w-5 mb-2 ${statusFilter === "pending" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "pending" ? "text-primary" : ""}`}>Pending</p>
              <p className="text-2xl font-bold">{getStatusCount("pending")}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("shortlisted")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <FileText
                className={`h-5 w-5 mb-2 ${statusFilter === "shortlisted" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "shortlisted" ? "text-primary" : ""}`}>
                Shortlisted
              </p>
              <p className="text-2xl font-bold">{getStatusCount("shortlisted")}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("interview")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Calendar
                className={`h-5 w-5 mb-2 ${statusFilter === "interview" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "interview" ? "text-primary" : ""}`}>Interview</p>
              <p className="text-2xl font-bold">{getStatusCount("interview")}</p>
            </CardContent>
          </Card>
          <Card
            className="bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
            onClick={() => setStatusFilter("offered")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <CheckCircle
                className={`h-5 w-5 mb-2 ${statusFilter === "offered" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${statusFilter === "offered" ? "text-primary" : ""}`}>Offered</p>
              <p className="text-2xl font-bold">{getStatusCount("offered")}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="pt-4">
            {renderApplicationList(filteredApplications)}
          </TabsContent>
          <TabsContent value="active" className="pt-4">
            {renderApplicationList(
              filteredApplications.filter((app) => !["rejected", "withdrawn"].includes(app.status)),
            )}
          </TabsContent>
          <TabsContent value="archived" className="pt-4">
            {renderApplicationList(
              filteredApplications.filter((app) => ["rejected", "withdrawn"].includes(app.status)),
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
