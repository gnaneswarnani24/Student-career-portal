"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert } from "@/components/ui/alert"
import { getUserResume, getResumeFeedback } from "@/lib/api"
import DashboardLayout from "@/components/dashboard-layout"
import { FileText, Upload, Download, Edit, Star, AlertCircle, CheckCircle, ArrowRight, Briefcase } from "lucide-react"
import type { Resume, ResumeFeedback } from "@/lib/types"

export default function ResumePage() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [feedback, setFeedback] = useState<ResumeFeedback | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resumeData = await getUserResume()
        setResume(resumeData)

        if (resumeData?.id) {
          const feedbackData = await getResumeFeedback(resumeData.id)
          setFeedback(feedbackData)
        }
      } catch (error) {
        console.error("Error fetching resume data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse flex flex-col space-y-4 w-full">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="h-80 bg-slate-200 rounded"></div>
              <div className="h-80 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Resume Management</h1>
          <p className="text-muted-foreground">Upload, update, and get feedback on your resume</p>
        </div>

        {!resume && (
          <Card className="border-dashed border-2 bg-slate-50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="bg-white p-3 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Resume Uploaded</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Upload your resume to apply for jobs and get personalized feedback to improve your chances of getting
                  hired.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/resume/upload">
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resume
                    </Button>
                  </Link>
                  <Link href="/resume/builder">
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Create Resume
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {resume && (
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        <span>Resume Preview</span>
                        <Badge variant={resume.isApproved ? "default" : "outline"}>
                          {resume.isApproved ? "Approved" : "Pending Review"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>Last updated: {resume.lastUpdated}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] w-full border-t">
                        <Image
                          src={resume.previewUrl || "/placeholder.svg?height=800&width=600"}
                          alt="Resume Preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <div className="flex gap-2">
                        <Link href="/resume/update">
                          <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                        <Link href="/resume/upload">
                          <Button>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload New
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Resume Score</CardTitle>
                      <CardDescription>Based on industry standards</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-center">
                          <div className="relative w-32 h-32">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-3xl font-bold">{resume.score}</span>
                            </div>
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle
                                className="text-slate-100"
                                strokeWidth="10"
                                stroke="currentColor"
                                fill="transparent"
                                r="40"
                                cx="50"
                                cy="50"
                              />
                              <circle
                                className="text-emerald-500"
                                strokeWidth="10"
                                strokeDasharray={`${(resume.score / 100) * 251.2} 251.2`}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="40"
                                cx="50"
                                cy="50"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Content Quality</span>
                            <span className="font-medium">{resume.contentScore}%</span>
                          </div>
                          <Progress value={resume.contentScore} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Format & Structure</span>
                            <span className="font-medium">{resume.formatScore}%</span>
                          </div>
                          <Progress value={resume.formatScore} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>ATS Compatibility</span>
                            <span className="font-medium">{resume.atsScore}%</span>
                          </div>
                          <Progress value={resume.atsScore} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Link href="/resume/feedback" className="w-full">
                        <Button variant="outline" className="w-full justify-start">
                          <Star className="mr-2 h-4 w-4 text-amber-500" />
                          Get Detailed Feedback
                        </Button>
                      </Link>
                      <Link href="/resume/builder" className="w-full">
                        <Button variant="outline" className="w-full justify-start">
                          <Edit className="mr-2 h-4 w-4" />
                          Use Resume Builder
                        </Button>
                      </Link>
                      <Link href="/jobs/recommendations" className="w-full">
                        <Button variant="outline" className="w-full justify-start">
                          <Briefcase className="mr-2 h-4 w-4 text-emerald-500" />
                          View Matching Jobs
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="pt-6">
              {feedback ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <Card className="border shadow-sm">
                      <CardHeader>
                        <CardTitle>AI Resume Feedback</CardTitle>
                        <CardDescription>Generated on {feedback.generatedDate}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <Star className="mr-2 h-4 w-4 text-amber-500" />
                            Summary
                          </h3>
                          <p className="text-muted-foreground">{feedback.summary}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                            Strengths
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {feedback.strengths.map((strength, index) => (
                              <li key={index}>{strength}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                            Areas for Improvement
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {feedback.improvements.map((improvement, index) => (
                              <li key={index}>{improvement}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Section-by-Section Feedback</h3>
                          <div className="space-y-4">
                            {feedback.sectionFeedback.map((section, index) => (
                              <div key={index} className="bg-slate-50 p-4 rounded-md">
                                <h4 className="font-medium mb-1">{section.section}</h4>
                                <p className="text-sm text-muted-foreground">{section.feedback}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href="/resume/update" className="w-full">
                          <Button className="w-full">
                            <Edit className="mr-2 h-4 w-4" />
                            Apply Suggestions
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    <Card className="border shadow-sm">
                      <CardHeader>
                        <CardTitle>Industry-Specific Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Alert className="bg-blue-50 border-blue-200">
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-1 rounded-full mr-2">
                              <Briefcase className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-blue-800">Tailored for {feedback.targetIndustry}</p>
                              <p className="text-sm text-blue-700">{feedback.industryRecommendation}</p>
                            </div>
                          </div>
                        </Alert>

                        <div>
                          <h3 className="font-semibold mb-2">Keywords to Include</h3>
                          <div className="flex flex-wrap gap-2">
                            {feedback.keywordsToInclude.map((keyword, index) => (
                              <Badge key={index} variant="secondary">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle>ATS Compatibility</CardTitle>
                        <CardDescription>How well your resume performs with ATS systems</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-center">
                            <div className="relative w-32 h-32">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold">{feedback.atsScore}%</span>
                              </div>
                              <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                  className="text-slate-100"
                                  strokeWidth="10"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="40"
                                  cx="50"
                                  cy="50"
                                />
                                <circle
                                  className={`${
                                    feedback.atsScore >= 80
                                      ? "text-emerald-500"
                                      : feedback.atsScore >= 60
                                        ? "text-amber-500"
                                        : "text-red-500"
                                  }`}
                                  strokeWidth="10"
                                  strokeDasharray={`${(feedback.atsScore / 100) * 251.2} 251.2`}
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="40"
                                  cx="50"
                                  cy="50"
                                />
                              </svg>
                            </div>
                          </div>
                          <p className="text-sm text-center text-muted-foreground">{feedback.atsComment}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle>Next Steps</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {feedback.nextSteps.map((step, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-emerald-500 mt-1" />
                              <p className="text-sm">{step}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href="/resume/update" className="w-full">
                          <Button className="w-full">Improve Your Resume</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Feedback Available</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    {resume
                      ? "You haven't requested feedback for your resume yet. Get personalized feedback to improve your chances of getting hired."
                      : "Upload your resume first to get personalized feedback."}
                  </p>
                  {resume ? (
                    <Button>Request Feedback</Button>
                  ) : (
                    <Link href="/resume/upload">
                      <Button>Upload Resume</Button>
                    </Link>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="versions" className="pt-6">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Resume Versions</CardTitle>
                  <CardDescription>Track changes and previous versions of your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  {resume.versions && resume.versions.length > 0 ? (
                    <div className="space-y-4">
                      {resume.versions.map((version, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-md hover:bg-slate-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-slate-100 p-2 rounded">
                              <FileText className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                              <p className="font-medium">{version.name}</p>
                              <p className="text-sm text-muted-foreground">Updated on {version.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Restore
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No previous versions available.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  )
}
