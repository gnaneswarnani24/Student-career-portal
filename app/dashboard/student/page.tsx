"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import {
  Briefcase,
  GraduationCap,
  FileText,
  Calendar,
  BarChart2,
  CheckCircle,
  Clock,
  Search,
  ArrowUpRight,
} from "lucide-react"
import EnhancedJobCard from "@/components/enhanced-job-card"
import { getJobRecommendations } from "@/lib/api"

export default function StudentDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [profileCompletion, setProfileCompletion] = useState(75)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobs = await getJobRecommendations()
        setRecommendedJobs(jobs)
      } catch (error) {
        console.error("Error fetching recommended jobs:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load recommended jobs",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleSaveJob = (jobId: string) => {
    toast({
      title: "Job saved successfully",
      description: "You can find this job in your saved jobs list",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0] || "Student"}</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your job search</p>
        </div>
        <div className="flex gap-3">
          <Link href="/jobs/search">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Search Jobs
            </Button>
          </Link>
          <Link href="/applications">
            <Button className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-700 hover:opacity-90">
              <FileText className="h-4 w-4" />
              My Applications
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Completion Card */}
      <Card className="border-none bg-gradient-to-r from-violet-600 to-indigo-700 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-shrink-0">
              <div className="relative h-24 w-24 rounded-full border-4 border-white/30 overflow-hidden bg-white/10">
                {user?.avatar ? (
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name || "Profile"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <GraduationCap className="h-12 w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-xl font-bold">Complete Your Profile</h2>
                <p className="text-violet-100">Enhance your chances of getting hired by completing your profile</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Completion</span>
                  <span className="font-medium">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2 bg-white/20" indicatorClassName="bg-white" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/resume">
                <Button variant="secondary" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Update Resume
                </Button>
              </Link>
              <Link href="/dashboard/student/settings">
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Complete Profile
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Tomorrow at 2:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resume Views</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8 since last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Match</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% since last assessment</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events and Job Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recommended Jobs</CardTitle>
            <CardDescription>Personalized job recommendations based on your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-24 bg-slate-200 rounded-md mb-3"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recommendedJobs.length > 0 ? (
              <>
                {recommendedJobs.slice(0, 3).map((job) => (
                  <EnhancedJobCard key={job.id} job={job} onSave={handleSaveJob} />
                ))}
                <div className="text-center pt-4">
                  <Link href="/jobs/search">
                    <Button variant="outline" className="gap-2">
                      View More Jobs
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No recommendations yet</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Complete your profile and upload your resume to get personalized job recommendations.
                </p>
                <Link href="/resume">
                  <Button>Update Resume</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Interviews and career events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-violet-50 p-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Technical Interview</div>
                  <Badge className="bg-gradient-to-r from-violet-600 to-indigo-700">Tomorrow</Badge>
                </div>
                <div className="text-sm text-muted-foreground">Tech Solutions Inc.</div>
              </div>
              <div className="p-3 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>April 15, 2023 • 2:00 PM</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>Duration: 1 hour</span>
                </div>
                <div className="mt-3">
                  <Link href="/interviews/int1">
                    <Button size="sm" variant="outline" className="w-full">
                      Prepare
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-violet-50 p-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Career Fair</div>
                  <Badge variant="outline">Next Week</Badge>
                </div>
                <div className="text-sm text-muted-foreground">Virtual Tech Job Fair</div>
              </div>
              <div className="p-3 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>April 22, 2023 • 10:00 AM</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>Duration: 4 hours</span>
                </div>
                <div className="mt-3">
                  <Link href="/events/evt1">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-violet-600 to-indigo-700 hover:opacity-90"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link href="/events">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                >
                  View All Events
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
