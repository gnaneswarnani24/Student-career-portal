"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import JobCard from "@/components/job/job-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, Briefcase, Loader2, MapPin, Sparkles, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

// Mock data for approved jobs
const mockApprovedJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and TypeScript.",
    postedAt: "2 days ago",
    deadline: "2023-06-30",
    status: "approved" as const,
    isNew: true,
    skills: ["React", "TypeScript", "CSS", "HTML"],
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Creative Designs Co.",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "New York, NY",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    description: "Join our design team to create beautiful and intuitive user interfaces for our clients' products.",
    postedAt: "3 days ago",
    deadline: "2023-07-15",
    status: "approved" as const,
    skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
  },
  {
    id: "3",
    title: "Data Scientist Intern",
    company: "Data Insights Corp.",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "Remote",
    type: "Internship",
    description: "Great opportunity for students to gain hands-on experience in data science and machine learning.",
    postedAt: "1 day ago",
    deadline: "2023-06-25",
    status: "approved" as const,
    isNew: true,
    skills: ["Python", "Machine Learning", "Data Analysis", "Statistics"],
  },
  {
    id: "4",
    title: "Backend Developer",
    company: "Software Solutions Ltd.",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$95,000 - $130,000",
    description:
      "We're looking for a Backend Developer to help build and maintain our server-side applications using Node.js and MongoDB.",
    postedAt: "5 days ago",
    deadline: "2023-07-10",
    status: "approved" as const,
    skills: ["Node.js", "MongoDB", "Express", "API Development"],
  },
  {
    id: "5",
    title: "Marketing Intern",
    company: "Global Marketing Agency",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "Remote",
    type: "Internship",
    description:
      "Join our marketing team to learn about digital marketing strategies, social media management, and content creation.",
    postedAt: "4 days ago",
    deadline: "2023-06-28",
    status: "approved" as const,
    skills: ["Social Media", "Content Creation", "Digital Marketing", "Analytics"],
  },
]

export default function StudentJobsPage() {
  const { toast } = useToast()
  const [jobs, setJobs] = useState(mockApprovedJobs)
  const [filteredJobs, setFilteredJobs] = useState(mockApprovedJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [jobType, setJobType] = useState<string[]>([])
  const [location, setLocation] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [salaryRange, setSalaryRange] = useState([0, 150000])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchJobs = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    let filtered = jobs

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.skills && job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))),
      )
    }

    // Apply job type filter
    if (jobType.length > 0) {
      filtered = filtered.filter((job) => jobType.some((type) => job.type.toLowerCase() === type.toLowerCase()))
    }

    // Apply location filter
    if (location) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
    }

    // Apply skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter((job) => selectedSkills.some((skill) => job.skills && job.skills.includes(skill)))
    }

    setFilteredJobs(filtered)
  }, [searchTerm, jobType, location, selectedSkills, jobs])

  const handleSaveJob = (id: string) => {
    toast({
      title: "Job saved",
      description: "The job has been added to your saved jobs.",
    })
  }

  const toggleJobType = (type: string) => {
    if (jobType.includes(type)) {
      setJobType(jobType.filter((t) => t !== type))
    } else {
      setJobType([...jobType, type])
    }
  }

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  // Get all unique skills from jobs
  const allSkills = Array.from(new Set(jobs.flatMap((job) => (job.skills ? job.skills : [])))).sort()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold md:hidden">Browse Jobs</h1>
            <p className="text-gray-500">Explore available job opportunities</p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, skills, companies..."
                className="pl-10 border-purple-200 focus-visible:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden border-purple-200"
            >
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Mobile */}
          {showFilters && (
            <Card className="md:hidden border-t-4 border-t-purple-500 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-purple-500" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="font-medium">Job Type</Label>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-type-${type}`}
                          checked={jobType.includes(type)}
                          onCheckedChange={() => toggleJobType(type)}
                          className="border-purple-200 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                        />
                        <Label htmlFor={`job-type-${type}`} className="text-sm font-normal">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="location-filter" className="font-medium">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location-filter"
                      placeholder="City, state, or remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 border-purple-200 focus-visible:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="font-medium">Salary Range</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      value={salaryRange}
                      max={150000}
                      step={10000}
                      onValueChange={setSalaryRange}
                      className="[&>span]:bg-purple-500"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>${salaryRange[0].toLocaleString()}</span>
                    <span>${salaryRange[1].toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="font-medium">Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.slice(0, 10).map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedSkills.includes(skill) ? "bg-purple-500 hover:bg-purple-600" : "hover:bg-purple-100"
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="sort-by" className="font-medium">
                    Sort By
                  </Label>
                  <Select defaultValue="recent">
                    <SelectTrigger id="sort-by" className="border-purple-200 focus-visible:ring-purple-500">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="relevant">Most Relevant</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                      <SelectItem value="salary-low">Lowest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <Card className="border-t-4 border-t-purple-500 shadow-md sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-purple-500" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="font-medium">Job Type</Label>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-type-desktop-${type}`}
                          checked={jobType.includes(type)}
                          onCheckedChange={() => toggleJobType(type)}
                          className="border-purple-200 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                        />
                        <Label htmlFor={`job-type-desktop-${type}`} className="text-sm font-normal">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="location-filter-desktop" className="font-medium">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location-filter-desktop"
                      placeholder="City, state, or remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 border-purple-200 focus-visible:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="font-medium">Salary Range</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      value={salaryRange}
                      max={150000}
                      step={10000}
                      onValueChange={setSalaryRange}
                      className="[&>span]:bg-purple-500"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>${salaryRange[0].toLocaleString()}</span>
                    <span>${salaryRange[1].toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="font-medium">Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedSkills.includes(skill) ? "bg-purple-500 hover:bg-purple-600" : "hover:bg-purple-100"
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="sort-by-desktop" className="font-medium">
                    Sort By
                  </Label>
                  <Select defaultValue="recent">
                    <SelectTrigger id="sort-by-desktop" className="border-purple-200 focus-visible:ring-purple-500">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="relevant">Most Relevant</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                      <SelectItem value="salary-low">Lowest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="md:col-span-3">
            <div className="mb-6">
              <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex h-12 w-12 rounded-full bg-white/20 items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Find Your Dream Job</h2>
                      <p className="text-purple-100">
                        {filteredJobs.length} jobs matching your criteria. Apply now and take the next step in your
                        career!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                <span className="ml-2 text-gray-500">Loading jobs...</span>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} actions="student" onSave={handleSaveJob} />
                ))}
              </div>
            ) : (
              <div className="bg-white border rounded-lg p-12 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-purple-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchTerm || jobType.length > 0 || location || selectedSkills.length > 0
                    ? "No jobs match your search criteria. Try adjusting your filters."
                    : "There are no job listings available at the moment. Check back later for new opportunities."}
                </p>
                {(searchTerm || jobType.length > 0 || location || selectedSkills.length > 0) && (
                  <Button
                    className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90"
                    onClick={() => {
                      setSearchTerm("")
                      setJobType([])
                      setLocation("")
                      setSelectedSkills([])
                    }}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}

            {filteredJobs.length > 5 && (
              <div className="mt-6 flex justify-center">
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90">
                  <Clock className="mr-2 h-4 w-4" />
                  Load More Jobs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
