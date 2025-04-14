"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, FileText, User } from "lucide-react"
import type { Application, Candidate } from "@/lib/types"

interface CandidateCardProps {
  candidate?: Candidate
  application?: Application
}

export default function CandidateCard({ candidate, application }: CandidateCardProps) {
  // Handle both candidate and application objects
  const person =
    candidate ||
    (application
      ? {
          id: application.studentId || application.id,
          name: application.studentName || "Applicant",
          position: application.jobTitle || "Position",
          status: application.status || "new",
          skills: application.skills || [],
          appliedDate: application.appliedDate || "Unknown",
          matchScore: application.matchScore,
        }
      : null)

  if (!person) return null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="outline">New</Badge>
      case "shortlisted":
        return <Badge variant="secondary">Shortlisted</Badge>
      case "interview_scheduled":
      case "interviewed":
        return <Badge className="bg-green-500 text-white">Interview Scheduled</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{person.name}</CardTitle>
              <div className="text-sm text-muted-foreground">{person.position}</div>
            </div>
          </div>
          {getStatusBadge(person.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          {person.appliedDate && (
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Applied on {person.appliedDate}</span>
            </div>
          )}
          {person.matchScore && (
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Match Score: {person.matchScore}</span>
            </div>
          )}
          {person.skills && person.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {person.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {person.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{person.skills.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/candidates/${person.id}`}>View Profile</Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/candidates/${person.id}/resume`}>
              <FileText className="h-4 w-4" />
              <span className="sr-only">View Resume</span>
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/applications/${person.id}/action`}>Take Action</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
