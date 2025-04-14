import { Briefcase, Plus } from "lucide-react"
import { getRecruiterJobs } from "@/lib/api"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function RecruiterJobsPage() {
  const jobs = await getRecruiterJobs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Jobs</h1>
        <Link href="/jobs/post">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Briefcase className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-medium">No jobs posted</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You haven't posted any jobs yet. Create your first job posting.
          </p>
          <div className="mt-4">
            <Link href="/jobs/post">
              <Button>Post a Job</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
