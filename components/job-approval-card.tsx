"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building } from "lucide-react"
import type { Job } from "@/lib/types"
import { approveJob, rejectJob } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface JobApprovalCardProps {
  job: Job
}

export default function JobApprovalCard({ job }: JobApprovalCardProps) {
  const { toast } = useToast()

  const handleApprove = async () => {
    try {
      await approveJob(job.id)
      toast({
        title: "Job Approved",
        description: `${job.title} has been approved and is now live.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve job. Please try again.",
      })
    }
  }

  const handleReject = async () => {
    try {
      await rejectJob(job.id)
      toast({
        title: "Job Rejected",
        description: `${job.title} has been rejected.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject job. Please try again.",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1">{job.title}</CardTitle>
          <Badge variant="outline">Pending</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Building className="mr-1 h-3 w-3" />
          {job.company}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Submitted: {job.postedDate}</span>
          </div>
          <div className="line-clamp-2 text-sm text-muted-foreground">{job.description}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReject}>
          Reject
        </Button>
        <Button onClick={handleApprove}>Approve</Button>
      </CardFooter>
    </Card>
  )
}
