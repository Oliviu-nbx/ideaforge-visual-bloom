
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, MapPin, Calendar, Mail, Github, Globe, Briefcase, ExternalLink, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillTag } from "@/components/ui/skill-tag";
import { CustomModal } from "@/components/ui/custom-modal";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/ProjectCard";
import MainLayout from "@/layouts/MainLayout";

// Sample user data
const USER = {
  id: "user1",
  name: "Sophia Chen",
  title: "Agricultural Data Scientist",
  location: "San Francisco, CA",
  joinedDate: "2022-11-15",
  avatar: "/placeholder.svg",
  bio: "I'm a data scientist passionate about sustainable agriculture. I combine machine learning and agricultural science to develop solutions that help farmers optimize yields while minimizing environmental impact.",
  skills: [
    "Python", "TensorFlow", "Data Science", "Machine Learning", 
    "Agricultural Systems", "React", "Project Management"
  ],
  email: "sophia.chen@example.com",
  website: "https://sophiachen.com",
  github: "sophiachen",
  company: "AgriTech Innovations",
  // Projects the user has created
  createdProjects: [
    {
      id: "1",
      title: "AI-Powered Sustainable Agriculture Platform",
      description: "Building a platform that uses machine learning to optimize crop yields while minimizing environmental impact, helping small farmers adopt sustainable practices.",
      createdAt: "2023-05-15T12:00:00Z",
      creator: {
        id: "user1",
        name: "Sophia Chen",
        avatar: "/placeholder.svg",
      },
      categories: ["AI/ML", "Environment", "Social Impact"],
      skills: ["Python", "TensorFlow", "React", "Node.js", "AWS"],
      collaborators: 3,
    }
  ],
  // Projects the user has joined as a collaborator
  collaboratingProjects: [
    {
      id: "4",
      title: "Community-Based Health Monitoring App",
      description: "Developing a mobile app that enables communities to track and share health data, particularly focusing on preventable diseases in underserved regions.",
      createdAt: "2023-06-10T15:45:00Z",
      creator: {
        id: "user3",
        name: "Amara Patel",
        avatar: "/placeholder.svg",
      },
      categories: ["Health", "Mobile App", "IoT"],
      skills: ["Flutter", "Kotlin", "IoT", "Firebase", "UX Research"],
      collaborators: 4,
    },
    {
      id: "5",
      title: "Decentralized Energy Trading Marketplace",
      description: "Building a blockchain-based platform allowing homeowners with solar panels to sell excess energy directly to neighbors, creating local energy markets.",
      createdAt: "2023-06-05T14:20:00Z",
      creator: {
        id: "user5",
        name: "Elena Rodriguez",
        avatar: "/placeholder.svg",
      },
      categories: ["Blockchain", "Environment", "IoT"],
      skills: ["Solidity", "React", "Node.js", "Smart Contracts", "Web3"],
      collaborators: 3,
    }
  ]
};

// This is a mock profile page - in a real app, it would fetch the user's information based on the route parameter
const ProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // State for editable user data
  const [editableUser, setEditableUser] = useState({
    name: USER.name,
    title: USER.title,
    location: USER.location,
    bio: USER.bio,
    email: USER.email,
    website: USER.website,
    github: USER.github,
    company: USER.company,
    skills: [...USER.skills]
  });
  
  // For skill editing
  const [skillInput, setSkillInput] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !editableUser.skills.includes(skillInput.trim())) {
      setEditableUser(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setEditableUser(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };
  
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Saving profile:", editableUser);
      // In a real app, this would update the user data in the database
      setIsSaving(false);
      setIsEditModalOpen(false);
    }, 1500);
  };
  
  // Format join date
  const joinDate = new Date(USER.joinedDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="h-24 w-24 rounded-lg">
                  <AvatarImage src={USER.avatar} />
                  <AvatarFallback className="text-xl">{USER.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              
              {/* User Info */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">{USER.name}</h1>
                    <p className="text-lg text-slate-600">{USER.title}</p>
                  </div>
                  
                  <Button
                    onClick={() => setIsEditModalOpen(true)}
                    variant="outline"
                    className="mt-3 sm:mt-0 self-start"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 mb-6">
                  {USER.location && (
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="mr-2 h-4 w-4 text-slate-400" />
                      <span>{USER.location}</span>
                    </div>
                  )}
                  
                  {USER.joinedDate && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                      <span>Joined {joinDate}</span>
                    </div>
                  )}
                  
                  {USER.email && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="mr-2 h-4 w-4 text-slate-400" />
                      <a href={`mailto:${USER.email}`} className="hover:underline">{USER.email}</a>
                    </div>
                  )}
                  
                  {USER.company && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Briefcase className="mr-2 h-4 w-4 text-slate-400" />
                      <span>{USER.company}</span>
                    </div>
                  )}
                  
                  {USER.website && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Globe className="mr-2 h-4 w-4 text-slate-400" />
                      <a 
                        href={USER.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center"
                      >
                        {USER.website.replace(/^https?:\/\//, '')}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  )}
                  
                  {USER.github && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Github className="mr-2 h-4 w-4 text-slate-400" />
                      <a 
                        href={`https://github.com/${USER.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center"
                      >
                        {USER.github}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
                
                {USER.bio && (
                  <div className="mb-6">
                    <p className="text-slate-700">{USER.bio}</p>
                  </div>
                )}
                
                {/* Skills */}
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {USER.skills.map((skill) => (
                      <SkillTag key={skill} name={skill} variant="secondary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for Projects */}
          <Tabs defaultValue="created" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="created">
                Created Projects ({USER.createdProjects.length})
              </TabsTrigger>
              <TabsTrigger value="collaborating">
                Collaborating ({USER.collaboratingProjects.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="created" className="space-y-6">
              {USER.createdProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {USER.createdProjects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                    <Sparkles className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No created projects yet</h3>
                  <p className="text-slate-600 mb-6">Share your ideas with the community.</p>
                  <Button asChild>
                    <Link to="/post-idea">Post an Idea</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="collaborating" className="space-y-6">
              {USER.collaboratingProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {USER.collaboratingProjects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                    <Sparkles className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Not collaborating on any projects</h3>
                  <p className="text-slate-600 mb-6">Find exciting projects to join.</p>
                  <Button asChild>
                    <Link to="/projects">Browse Projects</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={() => !isSaving && setIsEditModalOpen(false)}
        title="Edit Profile"
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProfile} 
              disabled={isSaving}
            >
              {isSaving ? (
                <LoadingSpinner size="sm" text="Saving..." />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={editableUser.name}
                onChange={handleInputChange}
                disabled={isSaving}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={editableUser.title}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer"
                disabled={isSaving}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={editableUser.location}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA"
                disabled={isSaving}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={editableUser.company}
                onChange={handleInputChange}
                placeholder="e.g., Tech Innovations Inc."
                disabled={isSaving}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editableUser.email}
                onChange={handleInputChange}
                placeholder="e.g., you@example.com"
                disabled={isSaving}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={editableUser.website}
                onChange={handleInputChange}
                placeholder="e.g., https://yoursite.com"
                disabled={isSaving}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Username</Label>
              <Input
                id="github"
                name="github"
                value={editableUser.github}
                onChange={handleInputChange}
                placeholder="e.g., username"
                disabled={isSaving}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={editableUser.bio}
              onChange={handleInputChange}
              placeholder="Tell the community about yourself..."
              rows={4}
              disabled={isSaving}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {editableUser.skills.map((skill) => (
                <SkillTag
                  key={skill}
                  name={skill}
                  variant="secondary"
                  className="pr-1.5 flex items-center"
                  onClick={() => !isSaving && handleRemoveSkill(skill)}
                >
                  <X className="h-3 w-3 ml-1 cursor-pointer" />
                </SkillTag>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                disabled={isSaving}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddSkill}
                disabled={!skillInput.trim() || isSaving}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </CustomModal>
    </MainLayout>
  );
};

export default ProfilePage;
