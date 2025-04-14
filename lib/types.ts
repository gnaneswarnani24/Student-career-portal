export interface User {
  id: string
  name: string
  email: string
  role: "student" | "recruiter" | "admin"
  createdAt: string
}

export interface StudentProfile {
  id: string
  userId: string
  cgpa: number
  skills: string[]
  interests: string[]
  education: Education[]
  experience: Experience[]
  resumeUrl?: string
  completionPercentage: number
  resumeLastUpdated?: string
}

export interface RecruiterProfile {
  id: string
  userId: string
  company: string
  position: string
  companyDescription: string
  industry: string
  location: string
  website?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  current: boolean
  gpa?: number
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  description: string
  requirements: string[]
  responsibilities?: string[]
  postedDate?: string
  postedDaysAgo: number
  deadline: string
  status?: string
  recruiterId?: string
  isNew?: boolean
  applicationsCount?: number
  views?: number
  salary?: string
}

export interface Application {
  id: string
  jobId: string
  jobTitle?: string
  company?: string
  studentId?: string
  studentName?: string
  resumeUrl?: string
  coverLetter?: string
  appliedDate?: string
  status?: string
  lastUpdated?: string
  interviewDate?: string
  interviewId?: string
  skills?: string[]
  matchScore?: number
  nextStep?: string
  nextStepDate?: string
}

export interface Interview {
  id: string
  jobId: string
  position: string
  company: string
  date: string
  time: string
  duration: number
  type: string
  location: string
  status: string
  notes?: string
}

export interface ActivityLog {
  id: string
  type: string
  action: string
  message: string
  timestamp: string
  user: string
  entityId: string
}

export interface Resume {
  id: string
  userId: string
  fileName: string
  fileUrl: string
  previewUrl: string
  uploadDate: string
  lastUpdated: string
  isApproved: boolean
  score: number
  contentScore: number
  formatScore: number
  atsScore: number
  versions: ResumeVersion[]
}

export interface ResumeVersion {
  id: string
  name: string
  date: string
  url: string
}

export interface ResumeFeedback {
  id: string
  resumeId: string
  generatedDate: string
  summary: string
  strengths: string[]
  improvements: string[]
  sectionFeedback: {
    section: string
    feedback: string
  }[]
  targetIndustry: string
  industryRecommendation: string
  keywordsToInclude: string[]
  atsScore: number
  atsComment: string
  nextSteps: string[]
}

export interface Candidate {
  id: string
  name: string
  position?: string
  education?: string
  experience?: string
  skills: string[]
  status: string
  appliedDate: string
  matchScore?: number
}
