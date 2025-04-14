import { Briefcase } from "lucide-react"
import { getRecentJobs } from "@/lib/api"
import { JobListingCard } from "@/components/job-listing-card"

export default async function StudentJobsPage() {
  const jobs = await getRecentJobs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Listings</h1>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Briefcase className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-medium">No jobs found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any job listings matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobListingCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
