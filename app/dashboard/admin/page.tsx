"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSystemStats, getPendingJobs, getSystemActivity } from "@/lib/api"
import JobApprovalCard from "@/components/job-approval-card"
import ActivityLogItem from "@/components/activity-log-item"
import type { Job, ActivityLog } from "@/lib/types"

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [pendingJobs, setPendingJobs] = useState<Job[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getSystemStats()
        const pendingJobsData = await getPendingJobs()
        const activityData = await getSystemActivity()

        setStats(statsData)
        setPendingJobs(pendingJobsData)
        setActivityLogs(activityData)
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
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/reports">
          <Button>Generate Reports</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Users</CardTitle>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Jobs</CardTitle>
            <CardDescription>Currently active listings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.activeJobs || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Applications</CardTitle>
            <CardDescription>Total job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalApplications || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Jobs awaiting review</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pendingJobs.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="activity">System Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Jobs Awaiting Approval</h2>
            <Link href="/admin/jobs/pending">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          {pendingJobs.length > 0 ? (
            <div className="space-y-4">
              {pendingJobs.slice(0, 3).map((job) => (
                <JobApprovalCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No jobs are currently awaiting approval.</p>
          )}
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent System Activity</h2>
            <Link href="/admin/activity">
              <Button variant="outline" size="sm">View All Activity</Button>
            </Link>
          </div>
          {activityLogs.length > 0 ? (
            <div className="space-y-2">
              {activityLogs.slice(0, 5).map((log) => (
                <ActivityLogItem key={log.id} log={log} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No recent activity to display.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
