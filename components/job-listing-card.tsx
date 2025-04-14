"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Calendar, Eye } from "lucide-react"
import type { Job } from "@/lib/types"

interface JobListingCardProps {
  job: Job
}

export default function JobListingCard({ job }: JobListingCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "pending":
        return <Badge variant="outline">Pending Approval</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1">{job.title}</CardTitle>
          {getStatusBadge(job.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Posted: {job.postedDate}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Expires: {job.deadline}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{job.applicationsCount || 0} Applicants</span>
            </div>
            <div className="flex items-center">
              <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{job.views || 0} Views</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/jobs/${job.id}/edit`}>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </Link>
        <Link href={`/jobs/${job.id}/applicants`}>
          <Button size="sm">View Applicants</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
