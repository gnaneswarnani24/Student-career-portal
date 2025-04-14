import { FileText } from "lucide-react"
import { getUserResume } from "@/lib/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function StudentResumePage() {
  const resume = await getUserResume()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Resume</h1>
        <Link href="/resume">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Edit Resume
          </Button>
        </Link>
      </div>

      {!resume ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-medium">No resume found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You haven't created a resume yet. Create one to apply for jobs.
          </p>
          <div className="mt-4">
            <Link href="/resume">
              <Button>Create Resume</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold">{resume.name}</h2>
              <p className="text-muted-foreground">
                {resume.email} • {resume.phone}
              </p>
            </div>

            <div>
              <h3 className="font-medium">Summary</h3>
              <p>{resume.summary}</p>
            </div>

            <div>
              <h3 className="font-medium">Education</h3>
              {resume.education.map((edu, index) => (
                <div key={index} className="mt-2">
                  <div className="flex justify-between">
                    <p className="font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  <p>{edu.degree}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-medium">Experience</h3>
              {resume.experience.map((exp, index) => (
                <div key={index} className="mt-2">
                  <div className="flex justify-between">
                    <p className="font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <p className="font-medium">{exp.position}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-medium">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {resume.skills.map((skill, index) => (
                  <div key={index} className="rounded-full bg-muted px-3 py-1 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
