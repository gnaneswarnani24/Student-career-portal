"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"
import { FileText, Clock, CheckCircle, Award, BookOpen } from "lucide-react"

export default function MockTestsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [tests, setTests] = useState<any[]>([])
  const [completedTests, setCompletedTests] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchTests = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800))

      setTests([
        {
          id: "test1",
          title: "Technical Interview Preparation",
          description: "Practice common technical interview questions for software development roles.",
          duration: 60,
          questions: 25,
          category: "Technical",
          difficulty: "Intermediate",
          tags: ["Algorithms", "Data Structures", "Problem Solving"],
          attempts: 0,
        },
        {
          id: "test2",
          title: "Behavioral Interview Questions",
          description: "Prepare for behavioral questions commonly asked in job interviews.",
          duration: 45,
          questions: 20,
          category: "Behavioral",
          difficulty: "Beginner",
          tags: ["Communication", "Teamwork", "Leadership"],
          attempts: 0,
        },
        {
          id: "test3",
          title: "Frontend Development Assessment",
          description: "Test your knowledge of HTML, CSS, JavaScript, and modern frontend frameworks.",
          duration: 90,
          questions: 30,
          category: "Technical",
          difficulty: "Advanced",
          tags: ["HTML", "CSS", "JavaScript", "React"],
          attempts: 0,
        },
      ])

      setCompletedTests([
        {
          id: "test4",
          title: "Basic Programming Concepts",
          description: "Test your understanding of fundamental programming concepts.",
          completedDate: "2023-04-01",
          score: 85,
          duration: 45,
          questions: 20,
          category: "Technical",
          difficulty: "Beginner",
        },
        {
          id: "test5",
          title: "Communication Skills Assessment",
          description: "Evaluate your communication skills for professional settings.",
          completedDate: "2023-03-25",
          score: 92,
          duration: 30,
          questions: 15,
          category: "Soft Skills",
          difficulty: "Intermediate",
        },
      ])

      setIsLoading(false)
    }

    fetchTests()
  }, [])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse flex flex-col space-y-4 w-full">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="h-60 bg-slate-200 rounded"></div>
              <div className="h-60 bg-slate-200 rounded"></div>
              <div className="h-60 bg-slate-200 rounded"></div>
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
          <h1 className="text-3xl font-bold mb-2">Mock Tests</h1>
          <p className="text-muted-foreground">Practice with mock tests to prepare for your interviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-500" />
                Available Tests
              </CardTitle>
              <CardDescription>Tests you can take</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tests.length}</div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                Completed Tests
              </CardTitle>
              <CardDescription>Tests you've finished</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedTests.length}</div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Average Score
              </CardTitle>
              <CardDescription>Your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {completedTests.length > 0
                  ? `${Math.round(completedTests.reduce((acc, test) => acc + test.score, 0) / completedTests.length)}%`
                  : "N/A"}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="available">Available Tests</TabsTrigger>
            <TabsTrigger value="completed">Completed Tests</TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tests.map((test) => (
                <Card key={test.id} className="border shadow-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{test.title}</CardTitle>
                      <Badge
                        variant={
                          test.difficulty === "Beginner"
                            ? "outline"
                            : test.difficulty === "Intermediate"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {test.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {test.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="bg-slate-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          Duration
                        </span>
                        <span>{test.duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          Questions
                        </span>
                        <span>{test.questions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                          Category
                        </span>
                        <span>{test.category}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/tests/${test.id}`} className="w-full">
                      <Button className="w-full">Start Test</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedTests.map((test) => (
                <Card key={test.id} className="border shadow-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{test.title}</CardTitle>
                      <Badge variant={test.score >= 90 ? "default" : test.score >= 70 ? "secondary" : "outline"}>
                        {test.score}%
                      </Badge>
                    </div>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Score</span>
                          <span className="font-medium">{test.score}%</span>
                        </div>
                        <Progress value={test.score} className="h-2" />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Completed on</span>
                          <span>{test.completedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration</span>
                          <span>{test.duration} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Questions</span>
                          <span>{test.questions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Category</span>
                          <span>{test.category}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link href={`/tests/${test.id}/results`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Results
                      </Button>
                    </Link>
                    <Link href={`/tests/${test.id}`} className="flex-1">
                      <Button className="w-full">Retake Test</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
