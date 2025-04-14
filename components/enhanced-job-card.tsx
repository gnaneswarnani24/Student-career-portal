"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  BookmarkPlus,
  ExternalLink,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  BookmarkCheck,
} from "lucide-react"
import type { Job } from "@/lib/types"

interface EnhancedJobCardProps {
  job: Job
  onSave?: (id: string) => void
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

export default function EnhancedJobCard({ job, onSave, onApprove, onReject }: EnhancedJobCardProps) {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  // Determine user role for styling
  const role = user?.role || "student"

  // Role-specific gradient styling
  const getRoleGradient = () => {
    switch (role) {
      case "student":
        return "from-violet-500 to-indigo-600"
      case "recruiter":
        return "from-cyan-500 to-blue-600"
      case "admin":
        return "from-pink-500 to-rose-600"
      default:
        return "from-violet-500 to-indigo-600"
    }
  }

  // Role-specific button gradient
  const getButtonGradient = () => {
    switch (role) {
      case "student":
        return "bg-gradient-to-r from-violet-600 to-indigo-700 hover:opacity-90"
      case "recruiter":
        return "bg-gradient-to-r from-cyan-600 to-blue-700 hover:opacity-90"
      case "admin":
        return "bg-gradient-to-r from-pink-600 to-rose-700 hover:opacity-90"
      default:
        return "bg-gradient-to-r from-violet-600 to-indigo-700 hover:opacity-90"
    }
  }

  // Status badge based on job status
  const getStatusBadge = () => {
    switch (job.status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        )
      default:
        return null
    }
  }

  const handleSaveJob = () => {
    setSaved(!saved)
    if (onSave) onSave(job.id)
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group">
      <div className={`h-1.5 w-full bg-gradient-to-r ${getRoleGradient()}`}></div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border">
              {job.companyLogo ? (
                <Image
                  src={job.companyLogo || "/placeholder.svg?height=48&width=48"}
                  alt={job.company}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              ) : (
                <Building2 className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
              <div className="flex items-center mt-1 text-gray-500">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{job.company}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {job.isNew && (
              <Badge className={`bg-gradient-to-r ${getRoleGradient()} text-white`}>
                <span className="animate-pulse mr-1">●</span> New
              </Badge>
            )}
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
            <span>{job.type}</span>
          </div>
          {job.salary && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-500" />
              <span className="font-medium text-green-700">{job.salary}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Deadline: {job.deadline}</span>
          </div>
        </div>

        <p className="text-gray-600 line-clamp-2 mb-3">{job.description}</p>

        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {job.applicants !== undefined && role === "recruiter" && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{job.applicants} applicants</span>
          </div>
        )}
      </CardContent>
      <CardFooter
        className={`px-6 py-4 border-t flex justify-between items-center transition-colors duration-200 bg-gradient-to-r ${
          role === "student"
            ? "from-violet-50 to-indigo-50 group-hover:from-violet-100 group-hover:to-indigo-100"
            : role === "recruiter"
              ? "from-cyan-50 to-blue-50 group-hover:from-cyan-100 group-hover:to-blue-100"
              : "from-pink-50 to-rose-50 group-hover:from-pink-100 group-hover:to-rose-100"
        }`}
      >
        {role === "student" && (
          <>
            <Button
              variant={saved ? "default" : "outline"}
              size="sm"
              onClick={handleSaveJob}
              className={saved ? getButtonGradient() : ""}
            >
              {saved ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <BookmarkPlus className="h-4 w-4 mr-2" />}
              {saved ? "Saved" : "Save"}
            </Button>
            <Link href={`/jobs/${job.id}`}>
              <Button size="sm" className={getButtonGradient()}>
                Apply Now
              </Button>
            </Link>
          </>
        )}

        {role === "recruiter" && (
          <>
            <Link href={`/jobs/${job.id}`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
            <div className="flex gap-2">
              <Link href={`/jobs/${job.id}/edit`}>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </Link>
              <Link href={`/jobs/${job.id}/applications`}>
                <Button size="sm" className={getButtonGradient()}>
                  View Applications
                </Button>
              </Link>
            </div>
          </>
        )}

        {role === "admin" && (
          <>
            <Link href={`/jobs/${job.id}`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
            {job.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                  onClick={() => onReject?.(job.id)}
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
                  onClick={() => onApprove?.(job.id)}
                >
                  Approve
                </Button>
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  )
}
