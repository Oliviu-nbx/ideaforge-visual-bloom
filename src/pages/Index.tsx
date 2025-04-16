
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Users, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import ProjectCard from "@/components/ProjectCard";

// Sample featured projects data
const FEATURED_PROJECTS = [
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
  },
  {
    id: "2",
    title: "Accessible Learning Platform for STEM Education",
    description: "Creating an accessible e-learning platform focused on making STEM education available to underserved communities with interactive modules and mentorship.",
    createdAt: "2023-06-02T09:30:00Z",
    creator: {
      id: "user2",
      name: "Marcus Johnson",
      avatar: "/placeholder.svg",
    },
    categories: ["Education", "Web Development", "Design"],
    skills: ["React", "JavaScript", "UI/UX Design", "Firebase", "Accessibility"],
    collaborators: 2,
  },
  {
    id: "3",
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
];

// Platform statistics
const PLATFORM_STATS = [
  { label: "Ideas Posted", value: "2,500+", icon: Lightbulb },
  { label: "Active Users", value: "12,000+", icon: User },
  { label: "Collaborations Formed", value: "850+", icon: Users },
];

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-50 to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Connect, Collaborate, Create: <span className="text-primary">Bring Your Ideas to Life</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 mb-8">
              IdeaForge connects innovative thinkers with skilled collaborators. Post your ideas or join exciting projects that match your expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/post-idea">
                <Button size="lg" className="w-full sm:w-auto">
                  Post an Idea <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-90 hidden lg:block">
          <div className="relative w-[500px] h-[500px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-20 w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform makes it easy to bring your ideas to life through collaboration with talented individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Your Idea</h3>
              <p className="text-slate-600">
                Share your innovative project concept with details about goals and required skills.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Collaborators</h3>
              <p className="text-slate-600">
                Review applications from interested collaborators and build your ideal team.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bring Ideas to Life</h3>
              <p className="text-slate-600">
                Collaborate efficiently with tools designed to help your team succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Featured Ideas</h2>
            <Link to="/projects" className="text-primary font-medium flex items-center hover:underline">
              View all projects <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">A Growing Community</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of innovators and collaborators already making an impact on IdeaForge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {PLATFORM_STATS.map((stat, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-lg border border-slate-200 shadow-sm bg-white"
              >
                <div className="w-14 h-14 bg-primary-50 text-primary rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Bring Your Ideas to Life?</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community of creators, innovators, and collaborators today. It's free to get started!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="/projects">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
