"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUpcomingInterviews } from "@/lib/api"
import DashboardLayout from "@/components/dashboard-layout"
import { Calendar, Clock, Video, MapPin, FileText, CheckCircle, AlertCircle } from "lucide-react"
import type { Interview } from "@/lib/types"

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [pastInterviews, setPastInterviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const interviewsData = await getUpcomingInterviews()
        setInterviews(interviewsData)

        // Mock past interviews
        setPastInterviews([
          {
            id: "past1",
            jobId: "job1",
            position: "Frontend Developer",
            company: "Tech Solutions Inc.",
            date: "2023-03-20",
            time: "10:00 AM",
            duration: 60,
            type: "Technical",
            location: "Virtual (Zoom)",
            status: "completed",
            feedback: "Strong technical skills, could improve on system design explanations.",
            result: "passed",
          },
          {
            id: "past2",
            jobId: "job2",
            position: "Full Stack Developer",
            company: "Digital Innovations",
            date: "2023-03-15",
            time: "2:30 PM",
            duration: 45,
            type: "Behavioral",
            location: "Virtual (Google Meet)",
            status: "completed",
            feedback: "Great communication skills, provided clear examples of past experiences.",
            result: "passed",
          },
        ])
      } catch (error) {
        console.error("Error fetching interviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInterviews()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>
      case "completed":
        return <Badge variant="outline">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      case "rescheduled":
        return <Badge variant="secondary">Rescheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case "passed":
        return <Badge className="bg-green-500">Passed</Badge>
      case "failed":
        return <Badge variant="destructive">Not Selected</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{result}</Badge>
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse flex flex-col space-y-4 w-full">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="h-60 bg-slate-200 rounded"></div>
              <div className="h-60 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Interviews</h1>
          <p className="text-muted-foreground">Manage and prepare for your upcoming interviews</p>
        </div>

        {interviews.length === 0 && pastInterviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Calendar className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Interviews Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              You don't have any scheduled interviews yet. Keep applying to jobs and you'll receive interview
              invitations here.
            </p>
            <Link href="/jobs/search">
              <Button>Search for Jobs</Button>
            </Link>
          </div>
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
              <TabsTrigger value="past">Past Interviews</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="pt-6">
              {interviews.length > 0 ? (
                <div className="space-y-6">
                  {interviews.map((interview) => (
                    <Card key={interview.id} className="border shadow-sm">
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <CardTitle>{interview.position}</CardTitle>
                            <CardDescription>{interview.company}</CardDescription>
                          </div>
                          {getStatusBadge(interview.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>
                                {interview.time} ({interview.duration} minutes)
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{interview.location}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <FileText className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                              <span>
                                <strong>Type:</strong> {interview.type} Interview
                              </span>
                            </div>
                            {interview.notes && (
                              <div className="flex items-start">
                                <AlertCircle className="mr-2 h-4 w-4 text-amber-500 mt-0.5" />
                                <span className="text-sm">{interview.notes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-wrap gap-3">
                        <Link href={`/interviews/${interview.id}/prepare`}>
                          <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Preparation Tips
                          </Button>
                        </Link>
                        <Link href={`/interviews/${interview.id}/practice`}>
                          <Button>
                            <Video className="mr-2 h-4 w-4" />
                            Practice Interview
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <Calendar className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Upcoming Interviews</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You don't have any upcoming interviews scheduled. Keep applying to jobs to receive interview
                    invitations.
                  </p>
                  <Link href="/jobs/search">
                    <Button>Search for Jobs</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            <TabsContent value="past" className="pt-6">
              {pastInterviews.length > 0 ? (
                <div className="space-y-6">
                  {pastInterviews.map((interview) => (
                    <Card key={interview.id} className="border shadow-sm">
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <CardTitle>{interview.position}</CardTitle>
                            <CardDescription>{interview.company}</CardDescription>
                          </div>
                          {getResultBadge(interview.result)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>
                                {interview.time} ({interview.duration} minutes)
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{interview.location}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <FileText className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                              <span>
                                <strong>Type:</strong> {interview.type} Interview
                              </span>
                            </div>
                            {interview.feedback && (
                              <div className="flex items-start">
                                <CheckCircle className="mr-2 h-4 w-4 text-emerald-500 mt-0.5" />
                                <span className="text-sm">{interview.feedback}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/interviews/${interview.id}/feedback`} className="w-full">
                          <Button variant="outline" className="w-full">
                            <FileText className="mr-2 h-4 w-4" />
                            View Detailed Feedback
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <Calendar className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Past Interviews</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You haven't completed any interviews yet. Your past interviews will appear here once completed.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  )
}
