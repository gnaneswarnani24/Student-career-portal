import { ClipboardList } from "lucide-react"
import { getUserApplications } from "@/lib/api"
import { ApplicationCard } from "@/components/application-card"

export default async function StudentApplicationsPage() {
  const applications = await getUserApplications()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Applications</h1>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <ClipboardList className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-medium">No applications yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You haven't applied to any jobs yet. Start by browsing available positions.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  )
}
