import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Building } from "lucide-react"
import type { Job } from "@/lib/types"

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1">{job.title}</CardTitle>
          <Badge variant={job.isNew ? "default" : "outline"}>{job.isNew ? "New" : job.postedDaysAgo + "d ago"}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Building className="mr-1 h-3 w-3" />
          {job.company}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Apply by {job.deadline}</span>
          </div>
        </div>
        <div className="mt-3 line-clamp-2 text-sm text-muted-foreground">{job.description}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/jobs/${job.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        <Link href={`/jobs/${job.id}/apply`}>
          <Button size="sm">Apply Now</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
