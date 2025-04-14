"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { searchJobs } from "@/lib/api"
import DashboardLayout from "@/components/dashboard-layout"
import JobCard from "@/components/job-card"
import { Search, Filter, MapPin, X, Loader2 } from "lucide-react"
import type { Job } from "@/lib/types"

export default function JobSearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
  const [location, setLocation] = useState(searchParams.get("location") || "")
  const [jobType, setJobType] = useState<string[]>([])
  const [experienceLevel, setExperienceLevel] = useState<string>("")
  const [salary, setSalary] = useState<number[]>([0, 200000])
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await searchJobs(searchTerm, {
          location,
          jobType: jobType.join(","),
          experienceLevel,
          minSalary: salary[0],
          maxSalary: salary[1],
          skills: skills.join(","),
        })
        setJobs(jobsData)
        setFilteredJobs(jobsData)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setIsLoading(false)
        setIsSearching(false)
      }
    }

    fetchJobs()
  }, [searchTerm, location, jobType, experienceLevel, salary, skills])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Update URL with search params
    const params = new URLSearchParams()
    if (searchTerm) params.set("q", searchTerm)
    if (location) params.set("location", location)

    router.push(`/jobs/search?${params.toString()}`)
  }

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault()
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()])
      }
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const toggleJobType = (type: string) => {
    if (jobType.includes(type)) {
      setJobType(jobType.filter((t) => t !== type))
    } else {
      setJobType([...jobType, type])
    }
  }

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"]
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Manager", "Executive"]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
          <p className="text-muted-foreground">Search and apply for jobs that match your skills and interests</p>
        </div>

        <Card className="border shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Location (city, state, or remote)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search Jobs"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </form>

            {showFilters && (
              <div className="mt-4 md:hidden">
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Job Type</Label>
                    <div className="flex flex-wrap gap-2">
                      {jobTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`job-type-${type}`}
                            checked={jobType.includes(type)}
                            onCheckedChange={() => toggleJobType(type)}
                          />
                          <label
                            htmlFor={`job-type-${type}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience-level" className="mb-2 block">
                      Experience Level
                    </Label>
                    <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                      <SelectTrigger id="experience-level">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Experience</SelectItem>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Salary Range</Label>
                    <div className="pt-6 px-2">
                      <Slider
                        defaultValue={[0, 200000]}
                        max={200000}
                        step={10000}
                        value={salary}
                        onValueChange={setSalary}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${salary[0].toLocaleString()}</span>
                      <span>${salary[1].toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="skills" className="mb-2 block">
                      Skills
                    </Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveSkill(skill)} />
                        </Badge>
                      ))}
                    </div>
                    <Input
                      id="skills"
                      placeholder="Add skills (press Enter)"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h2>

              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">Job Type</Label>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-type-desktop-${type}`}
                          checked={jobType.includes(type)}
                          onCheckedChange={() => toggleJobType(type)}
                        />
                        <label
                          htmlFor={`job-type-desktop-${type}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="experience-level-desktop" className="mb-2 block">
                    Experience Level
                  </Label>
                  <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                    <SelectTrigger id="experience-level-desktop">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Experience</SelectItem>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block">Salary Range</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      defaultValue={[0, 200000]}
                      max={200000}
                      step={10000}
                      value={salary}
                      onValueChange={setSalary}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${salary[0].toLocaleString()}</span>
                    <span>${salary[1].toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="skills-desktop" className="mb-2 block">
                    Skills
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveSkill(skill)} />
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id="skills-desktop"
                    placeholder="Add skills (press Enter)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="md:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                {isLoading ? "Searching..." : `${filteredJobs.length} jobs found`}
              </p>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary-high">Highest Salary</SelectItem>
                  <SelectItem value="salary-low">Lowest Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded"></div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="h-8 bg-slate-200 rounded w-24"></div>
                        <div className="h-8 bg-slate-200 rounded w-24"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We couldn&apos;t find any jobs matching your search criteria. Try adjusting your filters or search
                  terms.
                </p>
              </div>
            )}

            {filteredJobs.length > 0 && (
              <div className="mt-6 flex justify-center">
                <Button variant="outline">Load More Jobs</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
