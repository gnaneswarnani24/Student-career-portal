import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import type { Application } from "@/lib/types"

interface ApplicationCardProps {
  application: Application
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "shortlisted":
        return <Badge variant="secondary">Shortlisted</Badge>
      case "interview":
        return <Badge className="bg-green-500">Interview</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "offered":
        return <Badge className="bg-green-600">Offered</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1">{application.jobTitle}</CardTitle>
          {getStatusBadge(application.status)}
        </div>
        <div className="text-sm text-muted-foreground">{application.company}</div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Applied on {application.appliedDate}</span>
          </div>
          {application.interviewDate && (
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Interview on {application.interviewDate}</span>
            </div>
          )}
          {application.lastUpdated && (
            <div className="text-xs text-muted-foreground">Last updated: {application.lastUpdated}</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/applications/${application.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        {application.status === "interview" && (
          <Link href={`/interviews/${application.interviewId}`}>
            <Button size="sm">Prepare for Interview</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
