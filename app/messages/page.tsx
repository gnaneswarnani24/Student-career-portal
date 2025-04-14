"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import { Search, Send, PlusCircle } from "lucide-react"

export default function MessagesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Simulate API call
    const fetchConversations = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockConversations = [
        {
          id: "conv1",
          with: {
            id: "user1",
            name: "Sarah Johnson",
            role: "Recruiter",
            company: "Tech Solutions Inc.",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          lastMessage: {
            text: "Thank you for your application. We'd like to schedule an interview.",
            timestamp: "10:30 AM",
            isRead: true,
            sender: "user1",
          },
          messages: [
            {
              id: "msg1",
              text: "Hello! I noticed your application for the Frontend Developer position.",
              timestamp: "Yesterday, 2:30 PM",
              sender: "user1",
            },
            {
              id: "msg2",
              text: "Hi Sarah, yes I'm very interested in the position!",
              timestamp: "Yesterday, 3:15 PM",
              sender: "me",
            },
            {
              id: "msg3",
              text: "Great! Your qualifications look promising. Are you available for an interview next week?",
              timestamp: "Yesterday, 4:00 PM",
              sender: "user1",
            },
            {
              id: "msg4",
              text: "Yes, I'm available on Tuesday and Thursday afternoon.",
              timestamp: "Yesterday, 4:30 PM",
              sender: "me",
            },
            {
              id: "msg5",
              text: "Thank you for your application. We'd like to schedule an interview.",
              timestamp: "10:30 AM",
              sender: "user1",
            },
          ],
        },
        {
          id: "conv2",
          with: {
            id: "user2",
            name: "Michael Chen",
            role: "HR Manager",
            company: "Digital Innovations",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          lastMessage: {
            text: "Could you send your portfolio link again?",
            timestamp: "Yesterday",
            isRead: false,
            sender: "user2",
          },
          messages: [
            {
              id: "msg1",
              text: "Hi there! I'm reviewing your application for the Full Stack Developer role.",
              timestamp: "2 days ago, 11:30 AM",
              sender: "user2",
            },
            {
              id: "msg2",
              text: "Hello Michael, thank you for considering my application.",
              timestamp: "2 days ago, 12:15 PM",
              sender: "me",
            },
            {
              id: "msg3",
              text: "I was impressed with your resume. Do you have a portfolio of your work?",
              timestamp: "2 days ago, 1:00 PM",
              sender: "user2",
            },
            {
              id: "msg4",
              text: "Yes, you can view my projects at portfolio.example.com",
              timestamp: "2 days ago, 1:30 PM",
              sender: "me",
            },
            {
              id: "msg5",
              text: "Could you send your portfolio link again?",
              timestamp: "Yesterday, 10:15 AM",
              sender: "user2",
            },
          ],
        },
      ]

      setConversations(mockConversations)
      setSelectedConversation(mockConversations[0])
      setIsLoading(false)
    }

    fetchConversations()
  }, [])

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return

    const newMessage = {
      id: `msg${Date.now()}`,
      text: message,
      timestamp: "Just now",
      sender: "me",
    }

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: {
        text: message,
        timestamp: "Just now",
        isRead: true,
        sender: "me",
      },
    }

    setSelectedConversation(updatedConversation)
    setConversations(conversations.map((conv) => (conv.id === updatedConversation.id ? updatedConversation : conv)))
    setMessage("")
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse flex flex-col space-y-4 w-full">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-[calc(100vh-200px)] bg-slate-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">Communicate with recruiters and hiring managers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
            <div className="p-3 border-b bg-slate-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages" className="pl-10" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 border-b cursor-pointer hover:bg-slate-50 ${
                    selectedConversation?.id === conversation.id ? "bg-slate-50" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.with.avatar || "/placeholder.svg"} alt={conversation.with.name} />
                      <AvatarFallback>{conversation.with.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.with.name}</p>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.text}</p>
                        {!conversation.lastMessage.isRead && conversation.lastMessage.sender !== "me" && (
                          <Badge className="h-2 w-2 rounded-full p-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{conversation.with.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t">
              <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
          </div>

          {/* Conversation */}
          <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-3 border-b bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={selectedConversation.with.avatar || "/placeholder.svg"}
                        alt={selectedConversation.with.name}
                      />
                      <AvatarFallback>{selectedConversation.with.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedConversation.with.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.with.role} at {selectedConversation.with.company}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((msg: any) => (
                    <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === "me" ? "bg-primary text-primary-foreground" : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
