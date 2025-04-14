"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  BookmarkPlus,
  ExternalLink,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  BookmarkCheck,
} from "lucide-react"
import { useAuth } from "@/providers/auth-provider"

export interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    companyLogo?: string
    location: string
    type: string
    salary?: string
    description: string
    postedAt: string
    deadline: string
    status: "pending" | "approved" | "rejected"
    isNew?: boolean
    applicants?: number
    skills?: string[]
  }
  actions?: "student" | "recruiter" | "admin"
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  onSave?: (id: string) => void
}

export default function JobCard({ job, actions = "student", onApprove, onReject, onSave }: JobCardProps) {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  const getStatusBadge = () => {
    switch (job.status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  const getGradientByRole = () => {
    switch (actions) {
      case "admin":
        return "from-pink-500 to-rose-500"
      case "recruiter":
        return "from-cyan-500 to-blue-500"
      default:
        return "from-purple-500 to-indigo-500"
    }
  }

  const handleSaveJob = (id: string) => {
    setSaved(!saved)
    onSave?.(id)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group">
      <div className={`h-1 w-full bg-gradient-to-r ${getGradientByRole()}`}></div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border">
              {job.companyLogo ? (
                <Image
                  src={job.companyLogo || "/placeholder.svg"}
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
              <Badge className={`bg-gradient-to-r ${getGradientByRole()} text-white`}>
                <span className="animate-pulse mr-1">●</span> New
              </Badge>
            )}
            {actions !== "student" && getStatusBadge()}
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
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>Posted {job.postedAt}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Deadline: {job.deadline}</span>
          </div>
        </div>

        {job.salary && (
          <div className="mb-3 flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-green-500" />
            <span className="text-sm font-medium text-green-700">{job.salary}</span>
          </div>
        )}

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

        {job.applicants && actions === "recruiter" && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{job.applicants} applicants</span>
          </div>
        )}
      </CardContent>
      <CardFooter
        className={`px-6 py-3 border-t flex justify-between transition-colors duration-200 ${
          actions === "student"
            ? "bg-gradient-to-r from-purple-50 to-indigo-50 group-hover:from-purple-100 group-hover:to-indigo-100"
            : actions === "recruiter"
              ? "bg-gradient-to-r from-cyan-50 to-blue-50 group-hover:from-cyan-100 group-hover:to-blue-100"
              : "bg-gradient-to-r from-pink-50 to-rose-50 group-hover:from-pink-100 group-hover:to-rose-100"
        }`}
      >
        {actions === "student" && (
          <>
            <Button
              variant={saved ? "default" : "outline"}
              size="sm"
              onClick={() => handleSaveJob(job.id)}
              className={saved ? `bg-gradient-to-r ${getGradientByRole()} hover:opacity-90` : ""}
            >
              {saved ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <BookmarkPlus className="h-4 w-4 mr-2" />}
              {saved ? "Saved" : "Save"}
            </Button>
            <Link href={`/student/jobs/${job.id}`}>
              <Button
                size="sm"
                className={`bg-gradient-to-r ${getGradientByRole()} hover:opacity-90 transition-opacity`}
              >
                Apply Now
              </Button>
            </Link>
          </>
        )}

        {actions === "recruiter" && (
          <>
            <Link href={`/recruiter/jobs/${job.id}`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
            <div className="flex gap-2">
              <Link href={`/recruiter/jobs/${job.id}/edit`}>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </Link>
              <Link href={`/recruiter/jobs/${job.id}/applications`}>
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${getGradientByRole()} hover:opacity-90 transition-opacity`}
                >
                  View Applications
                </Button>
              </Link>
            </div>
          </>
        )}

        {actions === "admin" && (
          <>
            <Link href={`/admin/jobs/${job.id}`}>
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
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
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
