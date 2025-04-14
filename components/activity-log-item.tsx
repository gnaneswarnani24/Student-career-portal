import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, FileText, Briefcase, Shield } from "lucide-react"
import type { ActivityLog } from "@/lib/types"

interface ActivityLogItemProps {
  log: ActivityLog
}

export default function ActivityLogItem({ log }: ActivityLogItemProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />
      case "job":
        return <Briefcase className="h-4 w-4" />
      case "application":
        return <FileText className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "create":
        return <Badge className="bg-green-500">Created</Badge>
      case "update":
        return <Badge variant="secondary">Updated</Badge>
      case "delete":
        return <Badge variant="destructive">Deleted</Badge>
      case "approve":
        return <Badge className="bg-green-500">Approved</Badge>
      case "reject":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{getIcon(log.type)}</div>
            <div>
              <p className="text-sm font-medium">{log.message}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{log.timestamp}</span>
                <span>•</span>
                <span>{log.user}</span>
              </div>
            </div>
          </div>
          {getActionBadge(log.action)}
        </div>
      </CardContent>
    </Card>
  )
}
