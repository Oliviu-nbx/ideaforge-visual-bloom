
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Users, ArrowLeft, HeartHandshake, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillTag } from "@/components/ui/skill-tag";
import { CategoryTag } from "@/components/ui/category-tag";
import { CustomModal } from "@/components/ui/custom-modal";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertToast } from "@/components/ui/alert-toast";
import MainLayout from "@/layouts/MainLayout";

// Sample project data
const PROJECT = {
  id: "1",
  title: "AI-Powered Sustainable Agriculture Platform",
  description: `
    <p>We're building a platform that uses machine learning to optimize crop yields while minimizing environmental impact, helping small farmers adopt sustainable practices.</p>
    
    <p>Small-scale farmers face numerous challenges including climate change, limited resources, and lack of access to agricultural expertise. Our platform aims to democratize access to advanced agricultural techniques through an accessible digital solution.</p>
    
    <h3>Key Features:</h3>
    <ul>
      <li>Soil quality analysis using computer vision and sensor data</li>
      <li>Crop recommendation system based on local conditions and market demand</li>
      <li>Predictive analytics for weather patterns and pest outbreaks</li>
      <li>Resource optimization algorithms for water and fertilizer usage</li>
      <li>Knowledge sharing community connecting farmers with agricultural experts</li>
    </ul>
    
    <p>We have a basic prototype with the machine learning models, but need help with frontend development, UX research with farmers, and scaling our backend infrastructure.</p>
  `,
  createdAt: "2023-05-15T12:00:00Z",
  updatedAt: "2023-06-01T09:30:00Z",
  creator: {
    id: "user1",
    name: "Sophia Chen",
    avatar: "/placeholder.svg",
    title: "Agricultural Data Scientist",
    location: "San Francisco, CA",
  },
  categories: ["AI/ML", "Environment", "Social Impact", "Agriculture"],
  skills: ["Python", "TensorFlow", "React", "Node.js", "AWS", "UI/UX Research", "Mobile Development"],
  goals: [
    "Build an intuitive mobile app for farmers with limited technical experience",
    "Develop and refine machine learning models for crop recommendations",
    "Create a scalable backend to handle sensor data processing",
    "Conduct field tests with at least 50 small farms within 6 months",
    "Establish partnerships with agricultural extension programs"
  ],
  collaborators: [
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
  status: "active",
  openRoles: 3,
};

const ProjectDetail = () => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Format dates
  const formattedCreatedDate = new Date(PROJECT.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  
  const formattedUpdatedDate = new Date(PROJECT.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const handleApply = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApplicationModalOpen(false);
      setShowSuccessAlert(true);
      setApplicationMessage("");
      
      // Hide success alert after 5 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Success Alert */}
          {showSuccessAlert && (
            <div className="fixed top-20 right-4 z-50 w-full max-w-md">
              <AlertToast 
                variant="success" 
                title="Application Submitted" 
                onClose={() => setShowSuccessAlert(false)}
              >
                Your application was sent successfully. The project owner will be in touch soon.
              </AlertToast>
            </div>
          )}
          
          {/* Back Link */}
          <div className="mb-6">
            <Link to="/projects" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to projects
            </Link>
          </div>
          
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {PROJECT.categories.map((category) => (
                <CategoryTag key={category} name={category} />
              ))}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{PROJECT.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <div className="flex items-center">
                <Calendar className="mr-1.5 h-4 w-4 text-slate-400" />
                <span>Posted: {formattedCreatedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1.5 h-4 w-4 text-slate-400" />
                <span>Updated: {formattedUpdatedDate}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1.5 h-4 w-4 text-slate-400" />
                <span>Team: {PROJECT.collaborators.length} members</span>
              </div>
              <div className="flex items-center">
                <HeartHandshake className="mr-1.5 h-4 w-4 text-slate-400" />
                <span>Seeking: {PROJECT.openRoles} collaborators</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Project Description</h2>
                <div 
                  className="prose prose-slate max-w-none" 
                  dangerouslySetInnerHTML={{ __html: PROJECT.description }}
                />
              </div>
              
              {/* Goals */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Project Goals</h2>
                <ul className="space-y-3">
                  {PROJECT.goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 text-primary-800 inline-flex items-center justify-center mr-2 text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-slate-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Required Skills */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {PROJECT.skills.map((skill) => (
                    <SkillTag key={skill} name={skill} variant="secondary" />
                  ))}
                </div>
              </div>
              
              {/* Team */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-5">Current Team</h2>
                <div className="space-y-5">
                  {/* Project Creator */}
                  <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={PROJECT.creator.avatar} />
                      <AvatarFallback>{PROJECT.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-medium">{PROJECT.creator.name}</h4>
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded">
                          Creator
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{PROJECT.creator.title}</p>
                      <p className="text-sm text-slate-500">{PROJECT.creator.location}</p>
                      <Link 
                        to={`/profile/${PROJECT.creator.id}`}
                        className="mt-1 text-sm text-primary hover:underline inline-flex items-center"
                      >
                        View profile <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Team Members */}
                  <div className="space-y-4">
                    {PROJECT.collaborators.map((member) => (
                      <div key={member.id} className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-base font-medium">{member.name}</h4>
                          <p className="text-sm text-slate-600">{member.role}</p>
                          <Link 
                            to={`/profile/${member.id}`}
                            className="text-sm text-primary hover:underline inline-flex items-center"
                          >
                            View profile <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Action Card */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-2">Interested in collaborating?</h3>
                <p className="text-sm text-slate-600 mb-6">
                  This project is actively seeking collaborators with the skills listed.
                </p>
                <Button className="w-full" onClick={() => setIsApplicationModalOpen(true)}>
                  Apply to Join
                </Button>
              </div>
              
              {/* Creator Card */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">About the Creator</h3>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={PROJECT.creator.avatar} />
                    <AvatarFallback>{PROJECT.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{PROJECT.creator.name}</h4>
                    <p className="text-sm text-slate-600">{PROJECT.creator.title}</p>
                  </div>
                </div>
                <Link 
                  to={`/profile/${PROJECT.creator.id}`}
                  className="text-primary hover:underline inline-flex items-center text-sm"
                >
                  View full profile <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
              
              {/* Share Card (would contain social sharing in a real app) */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">Share Project</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Know someone who might be interested?
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Copy Link
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Application Modal */}
      <CustomModal
        isOpen={isApplicationModalOpen}
        onClose={() => !isSubmitting && setIsApplicationModalOpen(false)}
        title="Apply to Join Project"
        description="Send a message to the project creator explaining why you'd like to join and what skills you can contribute."
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsApplicationModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApply} 
              disabled={isSubmitting || applicationMessage.trim().length < 10}
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" text="Submitting..." />
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Applying to: <span className="font-medium text-slate-900">{PROJECT.title}</span>
          </p>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
              Your message <span className="text-destructive-500">*</span>
            </label>
            <Textarea
              id="message"
              placeholder="Describe why you're interested in this project and how your skills can contribute..."
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              rows={6}
              className="resize-none"
              disabled={isSubmitting}
            />
            <div className="text-xs text-slate-500 flex justify-between">
              <span>Be specific about how your skills match the project needs.</span>
              <span className={applicationMessage.length < 10 ? "text-destructive-500" : ""}>
                {applicationMessage.length} characters (min 10)
              </span>
            </div>
          </div>
        </div>
      </CustomModal>
    </MainLayout>
  );
};

export default ProjectDetail;
