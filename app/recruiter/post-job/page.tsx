"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Plus,
  X,
  Loader2,
  Building2,
  Clock,
  CheckCircle,
  FileText,
  Users,
} from "lucide-react"

export default function PostJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  // Form state
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("full-time")
  const [salaryMin, setSalaryMin] = useState("")
  const [salaryMax, setSalaryMax] = useState("")
  const [deadline, setDeadline] = useState("")
  const [description, setDescription] = useState("")
  const [requirements, setRequirements] = useState<string[]>([])
  const [newRequirement, setNewRequirement] = useState("")
  const [responsibilities, setResponsibilities] = useState<string[]>([])
  const [newResponsibility, setNewResponsibility] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const handleAddResponsibility = () => {
    if (newResponsibility.trim()) {
      setResponsibilities([...responsibilities, newResponsibility.trim()])
      setNewResponsibility("")
    }
  }

  const handleRemoveResponsibility = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index))
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!title || !company || !location || !description || !deadline) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill in all required fields.",
        })
        setIsSubmitting(false)
        return
      }

      // Create job object
      const job = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        company,
        location,
        type,
        salary: salaryMin && salaryMax ? `${salaryMin} - ${salaryMax}` : undefined,
        description,
        requirements,
        responsibilities,
        skills,
        deadline,
        postedAt: new Date().toISOString(),
        status: isDraft ? "draft" : "pending",
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: isDraft ? "Job saved as draft" : "Job submitted for approval",
        description: isDraft
          ? "You can edit and submit it later."
          : "Your job listing will be reviewed by an administrator.",
      })

      // Redirect to jobs page
      router.push("/recruiter/jobs")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error submitting your job listing. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:hidden">Post a Job</h1>
          <p className="text-gray-500">Create a new job listing for approval</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-gradient-to-r from-cyan-50 to-blue-50 p-1">
            <TabsTrigger
              value="details"
              className={activeTab === "details" ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" : ""}
            >
              <FileText className="h-4 w-4 mr-2" />
              Job Details
            </TabsTrigger>
            <TabsTrigger
              value="requirements"
              className={activeTab === "requirements" ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" : ""}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Requirements
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className={activeTab === "preview" ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" : ""}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Preview & Submit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card className="border-t-4 border-t-cyan-500 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-cyan-500" />
                  Basic Information
                </CardTitle>
                <CardDescription>Enter the basic details about the job position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g. Frontend Developer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border-cyan-200 focus-visible:ring-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="company"
                      placeholder="e.g. Acme Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      className="pl-10 border-cyan-200 focus-visible:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-sm font-medium">
                      Job Type <span className="text-red-500">*</span>
                    </Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger id="type" className="border-cyan-200 focus-visible:ring-cyan-500">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="e.g. New York, NY or Remote"
                        className="pl-10 border-cyan-200 focus-visible:ring-cyan-500"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-sm font-medium">
                      Salary Range
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="salary-min"
                          placeholder="Min"
                          className="pl-10 border-cyan-200 focus-visible:ring-cyan-500"
                          value={salaryMin}
                          onChange={(e) => setSalaryMin(e.target.value)}
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="salary-max"
                          placeholder="Max"
                          className="pl-10 border-cyan-200 focus-visible:ring-cyan-500"
                          value={salaryMax}
                          onChange={(e) => setSalaryMax(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="text-sm font-medium">
                      Application Deadline <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="deadline"
                        type="date"
                        className="pl-10 border-cyan-200 focus-visible:ring-cyan-500"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Job Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the job position, responsibilities, and company culture..."
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border-cyan-200 focus-visible:ring-cyan-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-gradient-to-r from-cyan-50 to-blue-50 border-t">
                <Button variant="outline" onClick={() => router.push("/recruiter/jobs")}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setActiveTab("requirements")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"
                >
                  Next: Requirements
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="requirements">
            <Card className="border-t-4 border-t-cyan-500 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-cyan-500" />
                  Requirements & Responsibilities
                </CardTitle>
                <CardDescription>Define what you're looking for in candidates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Requirements</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a requirement"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddRequirement()}
                      className="border-cyan-200 focus-visible:ring-cyan-500"
                    />
                    <Button
                      type="button"
                      onClick={handleAddRequirement}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add</span>
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {requirements.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md"
                      >
                        <span>{req}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveRequirement(index)}
                          className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    ))}
                    {requirements.length === 0 && <p className="text-sm text-gray-500">No requirements added yet.</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Responsibilities</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a responsibility"
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddResponsibility()}
                      className="border-cyan-200 focus-visible:ring-cyan-500"
                    />
                    <Button
                      type="button"
                      onClick={handleAddResponsibility}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add</span>
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {responsibilities.map((resp, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md"
                      >
                        <span>{resp}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveResponsibility(index)}
                          className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    ))}
                    {responsibilities.length === 0 && (
                      <p className="text-sm text-gray-500">No responsibilities added yet.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Required Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g. React, JavaScript)"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                      className="border-cyan-200 focus-visible:ring-cyan-500"
                    />
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add</span>
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1 flex items-center gap-1"
                      >
                        {skill}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSkill(index)}
                          className="h-4 w-4 p-0 ml-1 text-gray-500 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </Badge>
                    ))}
                    {skills.length === 0 && <p className="text-sm text-gray-500">No skills added yet.</p>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-gradient-to-r from-cyan-50 to-blue-50 border-t">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Back
                </Button>
                <Button
                  onClick={() => setActiveTab("preview")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"
                >
                  Next: Preview
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card className="border-t-4 border-t-cyan-500 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-cyan-500" />
                  Preview & Submit
                </CardTitle>
                <CardDescription>Review your job listing before submitting for approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="p-6 border-b bg-gradient-to-r from-cyan-50 to-blue-50">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-md overflow-hidden bg-white flex items-center justify-center border">
                        <Building2 className="h-6 w-6 text-cyan-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{title || "Job Title"}</h2>
                        <div className="flex items-center mt-1 text-gray-500">
                          <Building2 className="h-4 w-4 mr-1" />
                          <span>{company || "Company Name"}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="bg-white">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {type === "full-time"
                              ? "Full-time"
                              : type === "part-time"
                                ? "Part-time"
                                : type === "contract"
                                  ? "Contract"
                                  : type === "internship"
                                    ? "Internship"
                                    : type === "remote"
                                      ? "Remote"
                                      : "Job Type"}
                          </Badge>
                          <Badge variant="outline" className="bg-white">
                            <MapPin className="h-3 w-3 mr-1" />
                            {location || "Location"}
                          </Badge>
                          {salaryMin && salaryMax && (
                            <Badge variant="outline" className="bg-white">
                              <DollarSign className="h-3 w-3 mr-1" />${salaryMin} - ${salaryMax}
                            </Badge>
                          )}
                          <Badge variant="outline" className="bg-white">
                            <Calendar className="h-3 w-3 mr-1" />
                            {deadline || "Deadline"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-cyan-500" />
                      Job Description
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">{description || "No description provided."}</p>
                  </div>

                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-cyan-500" />
                      Requirements
                    </h3>
                    {requirements.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No requirements specified.</p>
                    )}
                  </div>

                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-cyan-500" />
                      Responsibilities
                    </h3>
                    {responsibilities.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No responsibilities specified.</p>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-cyan-500" />
                      Required Skills
                    </h3>
                    {skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-gradient-to-r from-cyan-50 to-blue-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No skills specified.</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-yellow-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Note:</strong> Your job listing will be reviewed by an administrator before it becomes
                      visible to students. This process typically takes 1-2 business days.
                    </span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-t">
                <Button variant="outline" onClick={() => setActiveTab("requirements")}>
                  Back
                </Button>
                <div className="flex-1"></div>
                <Button variant="outline" onClick={(e) => handleSubmit(e, true)} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save as Draft"
                  )}
                </Button>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit for Approval"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
