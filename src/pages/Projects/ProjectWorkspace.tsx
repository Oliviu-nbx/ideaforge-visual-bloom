
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, CheckSquare, File, Users, Calendar, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/layouts/MainLayout";

// Sample project data
const PROJECT = {
  id: "1",
  title: "AI-Powered Sustainable Agriculture Platform",
  creator: {
    id: "user1",
    name: "Sophia Chen",
    avatar: "/placeholder.svg",
  },
  members: [
    {
      id: "user1",
      name: "Sophia Chen",
      avatar: "/placeholder.svg",
      role: "Project Lead"
    },
    {
      id: "user7",
      name: "Miguel Sanchez",
      avatar: "/placeholder.svg",
      role: "Backend Developer"
    },
    {
      id: "user8",
      name: "Priya Sharma",
      avatar: "/placeholder.svg",
      role: "ML Engineer"
    },
    {
      id: "user9",
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      role: "UX Researcher"
    }
  ],
  // Sample data for tasks
  tasks: [
    {
      id: "task1",
      title: "Design database schema for sensor data",
      assignee: {
        id: "user7",
        name: "Miguel Sanchez",
        avatar: "/placeholder.svg",
      },
      status: "in-progress",
      dueDate: "2023-06-30T00:00:00Z",
      priority: "high"
    },
    {
      id: "task2",
      title: "Create wireframes for mobile interface",
      assignee: {
        id: "user9",
        name: "Alex Johnson",
        avatar: "/placeholder.svg",
      },
      status: "done",
      dueDate: "2023-06-15T00:00:00Z",
      priority: "medium"
    },
    {
      id: "task3",
      title: "Refine crop recommendation algorithm",
      assignee: {
        id: "user8",
        name: "Priya Sharma",
        avatar: "/placeholder.svg",
      },
      status: "todo",
      dueDate: "2023-07-10T00:00:00Z",
      priority: "high"
    },
    {
      id: "task4",
      title: "Set up automated testing for ML models",
      assignee: {
        id: "user8",
        name: "Priya Sharma",
        avatar: "/placeholder.svg",
      },
      status: "todo",
      dueDate: "2023-07-15T00:00:00Z",
      priority: "medium"
    },
    {
      id: "task5",
      title: "Research potential agricultural partnerships",
      assignee: {
        id: "user1",
        name: "Sophia Chen",
        avatar: "/placeholder.svg",
      },
      status: "in-progress",
      dueDate: "2023-07-05T00:00:00Z",
      priority: "medium"
    }
  ],
  // Sample data for discussions
  discussions: [
    {
      id: "disc1",
      title: "Weekly Progress Update - June 22",
      author: {
        id: "user1",
        name: "Sophia Chen",
        avatar: "/placeholder.svg",
      },
      date: "2023-06-22T14:30:00Z",
      commentsCount: 5,
      lastActivity: "2023-06-23T10:15:00Z",
    },
    {
      id: "disc2",
      title: "API Design for Sensor Integration",
      author: {
        id: "user7",
        name: "Miguel Sanchez",
        avatar: "/placeholder.svg",
      },
      date: "2023-06-20T09:15:00Z",
      commentsCount: 8,
      lastActivity: "2023-06-21T16:45:00Z",
    },
    {
      id: "disc3",
      title: "User Research Findings from Farmer Interviews",
      author: {
        id: "user9",
        name: "Alex Johnson",
        avatar: "/placeholder.svg",
      },
      date: "2023-06-18T11:20:00Z",
      commentsCount: 12,
      lastActivity: "2023-06-19T14:30:00Z",
    }
  ],
  // Sample data for files
  files: [
    {
      id: "file1",
      name: "Field Test Results.pdf",
      uploadedBy: {
        id: "user1",
        name: "Sophia Chen",
      },
      uploadDate: "2023-06-21T10:30:00Z",
      size: "2.4 MB",
      type: "pdf"
    },
    {
      id: "file2",
      name: "UI Mockups v2.fig",
      uploadedBy: {
        id: "user9",
        name: "Alex Johnson",
      },
      uploadDate: "2023-06-19T15:45:00Z",
      size: "8.7 MB",
      type: "figma"
    },
    {
      id: "file3",
      name: "ML Model Documentation.docx",
      uploadedBy: {
        id: "user8",
        name: "Priya Sharma",
      },
      uploadDate: "2023-06-17T09:20:00Z",
      size: "1.2 MB",
      type: "word"
    },
    {
      id: "file4",
      name: "Database Schema Diagram.png",
      uploadedBy: {
        id: "user7",
        name: "Miguel Sanchez",
      },
      uploadDate: "2023-06-16T14:10:00Z",
      size: "456 KB",
      type: "image"
    }
  ]
};

// This is a workspace mockup - the focus is on UI layout rather than complete functionality
const ProjectWorkspace = () => {
  // Helper to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Helper to get status color classes
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-slate-100 text-slate-700";
      case "in-progress":
        return "bg-primary-100 text-primary-800";
      case "done":
        return "bg-success-100 text-success-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // Helper to get priority color classes
  const getPriorityColorClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive-100 text-destructive-800";
      case "medium":
        return "bg-warning-100 text-warning-800";
      case "low":
        return "bg-info-100 text-info-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Project Header */}
        <div className="mb-6">
          <Link to="/projects/1" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to project overview
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{PROJECT.title}</h1>
              <p className="text-slate-600">Workspace</p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Team Members Avatars */}
              <div className="flex -space-x-2 mr-2">
                {PROJECT.members.slice(0, 4).map((member) => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {PROJECT.members.length > 4 && (
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600 border-2 border-white">
                    +{PROJECT.members.length - 4}
                  </div>
                )}
              </div>
              
              <Button variant="outline" size="sm">
                Invite
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="bg-transparent border-b border-slate-200 w-full justify-start rounded-none pb-0 mb-6">
            <TabsTrigger 
              value="tasks" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <CheckSquare className="h-4 w-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger 
              value="discussions" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Discussions
            </TabsTrigger>
            <TabsTrigger 
              value="files" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <File className="h-4 w-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
          </TabsList>
          
          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6 mt-0">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search tasks..." className="pl-10" />
              </div>
              
              <div>
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do Column */}
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                <h3 className="font-medium text-slate-700 mb-4 flex items-center">
                  To Do
                  <span className="ml-2 bg-slate-200 text-slate-700 rounded-full text-xs px-2 py-0.5">
                    {PROJECT.tasks.filter(t => t.status === "todo").length}
                  </span>
                </h3>
                
                <div className="space-y-3">
                  {PROJECT.tasks
                    .filter(task => task.status === "todo")
                    .map(task => (
                      <div key={task.id} className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
                        <h4 className="font-medium text-slate-900 mb-2">{task.title}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColorClass(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-slate-600">{task.assignee.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* In Progress Column */}
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                <h3 className="font-medium text-slate-700 mb-4 flex items-center">
                  In Progress
                  <span className="ml-2 bg-slate-200 text-slate-700 rounded-full text-xs px-2 py-0.5">
                    {PROJECT.tasks.filter(t => t.status === "in-progress").length}
                  </span>
                </h3>
                
                <div className="space-y-3">
                  {PROJECT.tasks
                    .filter(task => task.status === "in-progress")
                    .map(task => (
                      <div key={task.id} className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
                        <h4 className="font-medium text-slate-900 mb-2">{task.title}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColorClass(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-slate-600">{task.assignee.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Done Column */}
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                <h3 className="font-medium text-slate-700 mb-4 flex items-center">
                  Done
                  <span className="ml-2 bg-slate-200 text-slate-700 rounded-full text-xs px-2 py-0.5">
                    {PROJECT.tasks.filter(t => t.status === "done").length}
                  </span>
                </h3>
                
                <div className="space-y-3">
                  {PROJECT.tasks
                    .filter(task => task.status === "done")
                    .map(task => (
                      <div key={task.id} className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
                        <h4 className="font-medium text-slate-900 mb-2">{task.title}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColorClass(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-slate-600">{task.assignee.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6 mt-0">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search discussions..." className="pl-10" />
              </div>
              
              <div>
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="divide-y divide-slate-200">
                {PROJECT.discussions.map((discussion) => (
                  <div key={discussion.id} className="p-5 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-slate-900 hover:text-primary">
                        {discussion.title}
                      </h3>
                      <span className="text-xs text-slate-500">
                        {formatDate(discussion.date)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={discussion.author.avatar} />
                          <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-600">{discussion.author.name}</span>
                      </div>
                      <div className="flex items-center text-xs text-slate-500">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        <span>{discussion.commentsCount} comments</span>
                        <span className="mx-2">•</span>
                        <span>Last activity: {formatDate(discussion.lastActivity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Files Tab */}
          <TabsContent value="files" className="space-y-6 mt-0">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search files..." className="pl-10" />
              </div>
              
              <div>
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Uploaded By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {PROJECT.files.map((file) => (
                    <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{file.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{file.uploadedBy.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{formatDate(file.uploadDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{file.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6 mt-0">
            <div className="flex justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="divide-y divide-slate-200">
                {PROJECT.members.map((member) => (
                  <div key={member.id} className="p-5 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-slate-900">{member.name}</h3>
                        <p className="text-sm text-slate-600">{member.role}</p>
                      </div>
                    </div>
                    <div>
                      {member.id === PROJECT.creator.id ? (
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Project Creator
                        </span>
                      ) : (
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProjectWorkspace;
