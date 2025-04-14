import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, GraduationCap, ShieldCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-violet-600" />
            <span className="font-bold text-xl">Career Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting Students with Career Opportunities</h1>
              <p className="text-xl mb-8 text-violet-100">
                A platform where students find jobs, recruiters post opportunities, and administrators ensure quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register?role=student">
                  <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 w-full sm:w-auto">
                    Join as Student
                  </Button>
                </Link>
                <Link href="/register?role=recruiter">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    Join as Recruiter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-violet-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Students</h3>
                <p className="text-gray-600 mb-4">
                  Browse approved job listings, save favorites, and apply directly through the platform.
                </p>
                <Link href="/register?role=student" className="text-violet-600 font-medium inline-flex items-center">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Recruiters</h3>
                <p className="text-gray-600 mb-4">
                  Post job opportunities, manage applications, and connect with qualified candidates.
                </p>
                <Link href="/register?role=recruiter" className="text-indigo-600 font-medium inline-flex items-center">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-fuchsia-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-fuchsia-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Administrators</h3>
                <p className="text-gray-600 mb-4">
                  Review and approve job listings, manage users, and maintain platform quality.
                </p>
                <Link href="/login?role=admin" className="text-fuchsia-600 font-medium inline-flex items-center">
                  Admin Login <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">The Approval Process</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-violet-200"></div>

                {/* Step 1 */}
                <div className="relative mb-12">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 order-2 md:order-1">
                      <h3 className="text-xl font-semibold text-violet-700 mb-2">Recruiters Post Jobs</h3>
                      <p className="text-gray-600">
                        Recruiters create detailed job listings with requirements, responsibilities, and application
                        instructions.
                      </p>
                    </div>
                    <div className="z-10 order-1 md:order-2">
                      <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                    </div>
                    <div className="flex-1 md:pl-8 order-3 hidden md:block"></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative mb-12">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:pr-8 mb-4 md:mb-0 order-2 md:order-1 hidden md:block"></div>
                    <div className="z-10 order-1 md:order-2">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                    </div>
                    <div className="flex-1 md:pl-8 order-3">
                      <h3 className="text-xl font-semibold text-indigo-700 mb-2">Admins Review Listings</h3>
                      <p className="text-gray-600">
                        Administrators review job postings to ensure quality, accuracy, and appropriateness before
                        approval.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 order-2 md:order-1">
                      <h3 className="text-xl font-semibold text-fuchsia-700 mb-2">Students Apply</h3>
                      <p className="text-gray-600">
                        Once approved, students can view, save, and apply to job listings that match their skills and
                        interests.
                      </p>
                    </div>
                    <div className="z-10 order-1 md:order-2">
                      <div className="w-10 h-10 bg-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                    </div>
                    <div className="flex-1 md:pl-8 order-3 hidden md:block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our platform today and connect with opportunities that will shape your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 w-full sm:w-auto">
                  Create an Account
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6 text-violet-400" />
                <span className="font-bold text-xl">Career Portal</span>
              </div>
              <p className="text-gray-400">Connecting students with opportunities and employers with talent.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/register?role=student" className="hover:text-violet-400">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/student/jobs" className="hover:text-violet-400">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/student/saved" className="hover:text-violet-400">
                    Saved Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/student/applications" className="hover:text-violet-400">
                    My Applications
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">For Recruiters</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/register?role=recruiter" className="hover:text-violet-400">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/recruiter/post-job" className="hover:text-violet-400">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/recruiter" className="hover:text-violet-400">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/recruiter/applications" className="hover:text-violet-400">
                    Manage Applications
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@careerportal.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Career St, Education City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Career Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
