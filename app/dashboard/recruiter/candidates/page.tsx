import { Users } from "lucide-react"
import { getCandidates } from "@/lib/api"
import { CandidateCard } from "@/components/candidate-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function RecruiterCandidatesPage() {
  const candidates = await getCandidates()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Candidates</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input placeholder="Search candidates..." />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Candidates</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="interviewed">Interviewed</SelectItem>
            <SelectItem value="offered">Offered</SelectItem>
            <SelectItem value="hired">Hired</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Filter</Button>
      </div>

      {candidates.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-medium">No candidates found</h2>
          <p className="mt-2 text-sm text-muted-foreground">No candidates match your current filters.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </div>
  )
}
