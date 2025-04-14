// Mock API functions for demonstration purposes
// In a real application, these would connect to a backend API

import type { Job, Application, ActivityLog, Candidate } from "./types"

// Student API functions
export async function getUserProfile() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: "profile123",
    userId: "user123",
    name: "John Doe",
    email: "john@example.com",
    cgpa: 3.8,
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["Web Development", "AI", "Mobile Apps"],
    completionPercentage: 85,
    hasResume: true,
    resumeLastUpdated: "2023-04-15",
  }
}

// Mock data for jobs
const jobs: Job[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We are looking for a skilled software engineer to join our team and help build innovative solutions.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in software development",
      "Proficiency in JavaScript, TypeScript, and React",
      "Experience with Node.js and Express",
      "Knowledge of database systems like MongoDB or PostgreSQL",
    ],
    salary: "$120,000 - $150,000",
    deadline: "2023-12-15",
    postedDaysAgo: 3,
    isNew: true,
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Creative Designs Co.",
    location: "Remote",
    type: "Contract",
    description: "Join our design team to create beautiful and intuitive user interfaces for our clients' products.",
    requirements: [
      "Portfolio demonstrating UI/UX design skills",
      "Experience with Figma, Sketch, or Adobe XD",
      "Understanding of user-centered design principles",
      "Ability to create wireframes, prototypes, and high-fidelity designs",
    ],
    salary: "$90,000 - $110,000",
    deadline: "2023-12-20",
    postedDaysAgo: 5,
    isNew: false,
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Data Insights Corp.",
    location: "Boston, MA",
    type: "Full-time",
    description:
      "Looking for a data scientist to analyze complex datasets and provide actionable insights for our clients.",
    requirements: [
      "Master's or PhD in Data Science, Statistics, or related field",
      "Experience with Python, R, and SQL",
      "Knowledge of machine learning algorithms and statistical modeling",
      "Ability to communicate complex findings to non-technical stakeholders",
    ],
    salary: "$130,000 - $160,000",
    deadline: "2023-12-25",
    postedDaysAgo: 2,
    isNew: true,
  },
]

// Mock data for applications
const applications: Application[] = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "Software Engineer",
    company: "Tech Solutions Inc.",
    status: "Applied",
    appliedDate: "2023-11-28",
    nextStep: "Technical Interview",
    nextStepDate: "2023-12-05",
  },
  {
    id: "2",
    jobId: "2",
    jobTitle: "UX/UI Designer",
    company: "Creative Designs Co.",
    status: "Interview",
    appliedDate: "2023-11-25",
    nextStep: "Final Interview",
    nextStepDate: "2023-12-07",
  },
  {
    id: "3",
    jobId: "3",
    jobTitle: "Data Scientist",
    company: "Data Insights Corp.",
    status: "Offer",
    appliedDate: "2023-11-20",
    nextStep: "Decision Deadline",
    nextStepDate: "2023-12-10",
  },
]

// Mock data for candidates
const candidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "Software Engineer",
    education: "BS in Computer Science, Stanford University",
    experience: "5 years",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    status: "Interviewed",
    appliedDate: "2023-11-15",
  },
  {
    id: "2",
    name: "Jamie Smith",
    position: "UX/UI Designer",
    education: "BFA in Graphic Design, RISD",
    experience: "3 years",
    skills: ["Figma", "Adobe XD", "Sketch", "HTML/CSS"],
    status: "Application Review",
    appliedDate: "2023-11-20",
  },
  {
    id: "3",
    name: "Taylor Williams",
    position: "Data Scientist",
    education: "MS in Data Science, MIT",
    experience: "4 years",
    skills: ["Python", "R", "SQL", "Machine Learning"],
    status: "Technical Assessment",
    appliedDate: "2023-11-18",
  },
]

// API functions
export async function getJobs(): Promise<Job[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return jobs
}

export async function getJob(id: string): Promise<Job | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return jobs.find((job) => job.id === id)
}

export async function getJobRecommendations(): Promise<Job[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 700))

  return [
    {
      id: "job1",
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      type: "Full-time",
      description: "We're looking for a skilled frontend developer with experience in React and TypeScript.",
      requirements: ["React", "TypeScript", "CSS"],
      responsibilities: ["Build user interfaces", "Optimize applications", "Collaborate with backend team"],
      postedDate: "2023-04-01",
      postedDaysAgo: 3,
      deadline: "2023-04-30",
      status: "active",
      recruiterId: "recruiter1",
      isNew: true,
    },
    {
      id: "job2",
      title: "Full Stack Developer",
      company: "Digital Innovations",
      location: "New York, NY",
      type: "Full-time",
      description: "Join our team to build cutting-edge web applications using modern technologies.",
      requirements: ["JavaScript", "Node.js", "React", "MongoDB"],
      responsibilities: ["Develop full-stack applications", "Optimize performance", "Write clean code"],
      postedDate: "2023-03-25",
      postedDaysAgo: 10,
      deadline: "2023-04-25",
      status: "active",
      recruiterId: "recruiter2",
    },
    {
      id: "job3",
      title: "Software Engineer Intern",
      company: "StartUp Labs",
      location: "San Francisco, CA",
      type: "Internship",
      description: "Great opportunity for students to gain hands-on experience in software development.",
      requirements: ["Basic programming knowledge", "Willingness to learn", "Team player"],
      responsibilities: ["Assist in development", "Learn new technologies", "Participate in code reviews"],
      postedDate: "2023-04-02",
      postedDaysAgo: 2,
      deadline: "2023-05-15",
      status: "active",
      recruiterId: "recruiter3",
      isNew: true,
    },
  ]
}

export async function getApplications(): Promise<Application[]> {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return applications
}

export async function getApplication(id: string): Promise<Application | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return applications.find((application) => application.id === id)
}

// Add the missing exports
export async function getCandidates(): Promise<Candidate[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return candidates
}

export async function getRecruiterJobs(): Promise<Job[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  // For demo purposes, return the same jobs
  return jobs
}

export async function getUserApplications(): Promise<Application[]> {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return applications
}

export async function getRecentJobs(): Promise<Job[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  // Return jobs sorted by posted date (most recent first)
  return [...jobs].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
}

export async function getUpcomingInterviews() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600))

  return [
    {
      id: "int1",
      jobId: "job3",
      position: "Software Engineer Intern",
      company: "StartUp Labs",
      date: "2023-04-10",
      time: "2:00 PM",
      duration: 60,
      type: "Technical",
      location: "Virtual (Zoom)",
      status: "scheduled",
      notes: "Prepare to discuss your projects and experience with React.",
    },
    {
      id: "int2",
      jobId: "job4",
      position: "UX Designer",
      company: "Tech Solutions Inc.",
      date: "2023-04-15",
      time: "11:00 AM",
      duration: 45,
      type: "Portfolio Review",
      location: "Virtual (Google Meet)",
      status: "scheduled",
      notes: "Be ready to present your design portfolio and discuss your process.",
    },
  ]
}

export async function getUserResume() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 700))

  return {
    id: "resume123",
    userId: "user123",
    fileName: "john_doe_resume.pdf",
    fileUrl: "/resumes/john_doe_resume.pdf",
    previewUrl: "/placeholder.svg?height=800&width=600",
    uploadDate: "2023-04-15",
    lastUpdated: "2023-04-15",
    isApproved: true,
    score: 85,
    contentScore: 90,
    formatScore: 80,
    atsScore: 85,
    versions: [
      {
        id: "v2",
        name: "Version 2.0",
        date: "2023-04-15",
        url: "/resumes/john_doe_resume_v2.pdf",
      },
      {
        id: "v1",
        name: "Version 1.0",
        date: "2023-03-20",
        url: "/resumes/john_doe_resume_v1.pdf",
      },
    ],
  }
}

export async function getResumeFeedback(resumeId: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    id: "feedback123",
    resumeId: resumeId,
    generatedDate: "2023-04-16",
    summary:
      "Your resume is well-structured and highlights your technical skills effectively. With a few improvements to quantify your achievements and optimize for ATS systems, you can significantly increase your chances of landing interviews.",
    strengths: [
      "Clear organization and professional formatting",
      "Strong technical skills section with relevant technologies",
      "Good use of action verbs in experience descriptions",
    ],
    improvements: [
      "Quantify achievements with specific metrics and results",
      "Add more industry-specific keywords to improve ATS compatibility",
      "Expand on your project descriptions to showcase problem-solving abilities",
    ],
    sectionFeedback: [
      {
        section: "Professional Summary",
        feedback:
          "Your summary is concise but could better highlight your unique value proposition. Consider mentioning specific achievements or specialized skills.",
      },
      {
        section: "Work Experience",
        feedback:
          "Good use of action verbs, but try to quantify your achievements with metrics (e.g., increased efficiency by 20%, reduced costs by $10K).",
      },
      {
        section: "Education",
        feedback:
          "Well-formatted. Consider adding relevant coursework or academic achievements if you're a recent graduate.",
      },
      {
        section: "Skills",
        feedback: "Comprehensive list, but organize them by proficiency level or category to improve readability.",
      },
    ],
    targetIndustry: "Software Development",
    industryRecommendation:
      "For software development roles, emphasize your experience with agile methodologies, version control systems, and specific programming languages relevant to the positions you're targeting.",
    keywordsToInclude: [
      "Full Stack Development",
      "React",
      "Node.js",
      "CI/CD",
      "Agile",
      "Git",
      "API Integration",
      "Cloud Services",
    ],
    atsScore: 85,
    atsComment:
      "Your resume performs well with ATS systems but could be optimized further by including more job-specific keywords and using standard section headings.",
    nextSteps: [
      "Revise your professional summary to highlight your unique value proposition",
      "Add metrics to quantify your achievements in previous roles",
      "Reorganize your skills section by proficiency or category",
      "Create a tailored version for each job application",
    ],
  }
}

// Recruiter API functions
export async function getCompanyProfile() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: "company1",
    name: "Tech Solutions Inc.",
    industry: "Information Technology",
    location: "San Francisco, CA",
    website: "https://techsolutions.example.com",
    description: "Leading provider of innovative tech solutions",
    status: "Active",
  }
}

export async function getPostedJobs(): Promise<Job[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600))

  return [
    {
      id: "job1",
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      type: "Full-time",
      description: "We're looking for a skilled frontend developer with experience in React and TypeScript.",
      requirements: ["React", "TypeScript", "CSS"],
      responsibilities: ["Build user interfaces", "Optimize applications", "Collaborate with backend team"],
      postedDate: "2023-04-01",
      postedDaysAgo: 3,
      deadline: "2023-04-30",
      status: "active",
      recruiterId: "recruiter1",
      applicationsCount: 12,
      views: 145,
    },
    {
      id: "job4",
      title: "UX Designer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      type: "Full-time",
      description: "Looking for a talented UX designer to create intuitive user experiences.",
      requirements: ["Figma", "User Research", "Prototyping"],
      responsibilities: ["Design user interfaces", "Conduct user research", "Create wireframes"],
      postedDate: "2023-03-20",
      postedDaysAgo: 15,
      deadline: "2023-04-20",
      status: "active",
      recruiterId: "recruiter1",
      applicationsCount: 8,
      views: 98,
    },
    {
      id: "job5",
      title: "DevOps Engineer",
      company: "Tech Solutions Inc.",
      location: "Hybrid",
      type: "Full-time",
      description: "Join our team to improve our CI/CD pipeline and infrastructure.",
      requirements: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      responsibilities: ["Manage cloud infrastructure", "Automate deployments", "Monitor systems"],
      postedDate: "2023-03-15",
      postedDaysAgo: 20,
      deadline: "2023-04-15",
      status: "active",
      recruiterId: "recruiter1",
      applicationsCount: 5,
      views: 72,
    },
  ]
}

export async function getApplicationsByCompany(): Promise<Application[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 700))

  return [
    {
      id: "app1",
      jobId: "job1",
      jobTitle: "Frontend Developer",
      company: "Tech Solutions Inc.",
      studentId: "student1",
      studentName: "John Doe",
      resumeUrl: "/resumes/john-doe.pdf",
      appliedDate: "2023-04-02",
      status: "new",
      skills: ["JavaScript", "React", "CSS"],
    },
    {
      id: "app4",
      jobId: "job1",
      jobTitle: "Frontend Developer",
      company: "Tech Solutions Inc.",
      studentId: "student2",
      studentName: "Jane Smith",
      resumeUrl: "/resumes/jane-smith.pdf",
      appliedDate: "2023-04-03",
      status: "shortlisted",
      matchScore: 85,
      skills: ["JavaScript", "React", "TypeScript", "Redux"],
    },
    {
      id: "app5",
      jobId: "job4",
      jobTitle: "UX Designer",
      company: "Tech Solutions Inc.",
      studentId: "student3",
      studentName: "Alex Johnson",
      resumeUrl: "/resumes/alex-johnson.pdf",
      appliedDate: "2023-03-25",
      status: "interview_scheduled",
      interviewDate: "2023-04-10",
      interviewId: "int2",
      skills: ["Figma", "UI Design", "User Research"],
    },
  ]
}

// Admin API functions
export async function getSystemStats() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 400))

  return {
    totalUsers: 1245,
    activeJobs: 87,
    totalApplications: 543,
    newUsersToday: 12,
    newJobsToday: 5,
    newApplicationsToday: 28,
  }
}

export async function getPendingJobs(): Promise<Job[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "job6",
      title: "Data Scientist",
      company: "AI Research Labs",
      location: "Boston, MA",
      type: "Full-time",
      description: "Join our team to work on cutting-edge machine learning projects.",
      requirements: ["Python", "Machine Learning", "Data Analysis"],
      responsibilities: ["Develop ML models", "Analyze data", "Present findings"],
      postedDate: "2023-04-03",
      postedDaysAgo: 1,
      deadline: "2023-05-03",
      status: "pending",
      recruiterId: "recruiter4",
    },
    {
      id: "job7",
      title: "Backend Developer",
      company: "Cloud Services Inc.",
      location: "Remote",
      type: "Contract",
      description: "Looking for an experienced backend developer to help scale our services.",
      requirements: ["Node.js", "MongoDB", "AWS"],
      responsibilities: ["Design APIs", "Optimize database queries", "Implement security measures"],
      postedDate: "2023-04-02",
      postedDaysAgo: 2,
      deadline: "2023-04-25",
      status: "pending",
      recruiterId: "recruiter5",
    },
  ]
}

export async function getSystemActivity(): Promise<ActivityLog[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600))

  return [
    {
      id: "log1",
      type: "job",
      action: "create",
      message: "New job posted: Frontend Developer",
      timestamp: "2023-04-03 14:25",
      user: "Tech Solutions Inc.",
      entityId: "job1",
    },
    {
      id: "log2",
      type: "user",
      action: "create",
      message: "New user registered: John Doe (Student)",
      timestamp: "2023-04-03 12:10",
      user: "System",
      entityId: "user123",
    },
    {
      id: "log3",
      type: "application",
      action: "update",
      message: "Application status changed to 'Shortlisted'",
      timestamp: "2023-04-02 16:45",
      user: "Tech Solutions Inc.",
      entityId: "app2",
    },
    {
      id: "log4",
      type: "admin",
      action: "approve",
      message: "Job approved: Data Scientist at AI Research Labs",
      timestamp: "2023-04-02 10:30",
      user: "Admin",
      entityId: "job6",
    },
    {
      id: "log5",
      type: "user",
      action: "update",
      message: "User profile updated: Jane Smith",
      timestamp: "2023-04-01 09:15",
      user: "Jane Smith",
      entityId: "user456",
    },
  ]
}

// Job approval functions
export async function approveJob(jobId: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  return { success: true }
}

export async function rejectJob(jobId: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  return { success: true }
}

export async function searchJobs(
  searchTerm: string,
  filters: {
    location?: string
    jobType?: string
    experienceLevel?: string
    minSalary?: number
    maxSalary?: number
    skills?: string
  },
): Promise<Job[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  let jobs: Job[] = [
    {
      id: "job1",
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      type: "Full-time",
      description: "We're looking for a skilled frontend developer with experience in React and TypeScript.",
      requirements: ["React", "TypeScript", "CSS"],
      responsibilities: ["Build user interfaces", "Optimize applications", "Collaborate with backend team"],
      postedDate: "2023-04-01",
      postedDaysAgo: 3,
      deadline: "2023-04-30",
      status: "active",
      recruiterId: "recruiter1",
      isNew: true,
    },
    {
      id: "job2",
      title: "Full Stack Developer",
      company: "Digital Innovations",
      location: "New York, NY",
      type: "Full-time",
      description: "Join our team to build cutting-edge web applications using modern technologies.",
      requirements: ["JavaScript", "Node.js", "React", "MongoDB"],
      responsibilities: ["Develop full-stack applications", "Optimize performance", "Write clean code"],
      postedDate: "2023-03-25",
      postedDaysAgo: 10,
      deadline: "2023-04-25",
      status: "active",
      recruiterId: "recruiter2",
    },
    {
      id: "job3",
      title: "Software Engineer Intern",
      company: "StartUp Labs",
      location: "San Francisco, CA",
      type: "Internship",
      description: "Great opportunity for students to gain hands-on experience in software development.",
      requirements: ["Basic programming knowledge", "Willingness to learn", "Team player"],
      responsibilities: ["Assist in development", "Learn new technologies", "Participate in code reviews"],
      postedDate: "2023-04-02",
      postedDaysAgo: 2,
      deadline: "2023-05-15",
      status: "active",
      recruiterId: "recruiter3",
      isNew: true,
    },
    {
      id: "job4",
      title: "UX Designer",
      company: "Design Co.",
      location: "Remote",
      type: "Full-time",
      description: "Looking for a talented UX designer to create intuitive user experiences.",
      requirements: ["Figma", "User Research", "Prototyping"],
      responsibilities: ["Design user interfaces", "Conduct user research", "Create wireframes"],
      postedDate: "2023-03-20",
      postedDaysAgo: 15,
      deadline: "2023-04-20",
      status: "active",
      recruiterId: "recruiter1",
    },
  ]

  // Apply filters (mock implementation)
  jobs = jobs.filter((job) => {
    if (
      searchTerm &&
      !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    if (filters.jobType) {
      const jobTypes = filters.jobType.split(",")
      if (!jobTypes.includes(job.type)) {
        return false
      }
    }
    if (filters.experienceLevel && filters.experienceLevel !== "any") {
      // Mock experience level filtering - needs actual implementation
      // This is just a placeholder
      if (filters.experienceLevel === "Entry Level" && job.id !== "job3") return false
    }
    if (filters.minSalary && job.salary && Number.parseInt(job.salary) < filters.minSalary) {
      return false
    }
    if (filters.maxSalary && job.salary && Number.parseInt(job.salary) > filters.maxSalary) {
      return false
    }
    if (filters.skills) {
      const skills = filters.skills.split(",")
      let hasAllSkills = true
      for (const skill of skills) {
        if (!job.requirements.some((req) => req.toLowerCase().includes(skill.toLowerCase()))) {
          hasAllSkills = false
          break
        }
      }
      if (!hasAllSkills) {
        return false
      }
    }
    return true
  })

  return jobs
}
