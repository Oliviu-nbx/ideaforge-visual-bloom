
import React, { useState } from "react";
import { ArrowUpDown, Grid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import ProjectCard from "@/components/ProjectCard";
import SearchFilter, { FilterOptions } from "@/components/SearchFilter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Sample projects data
const SAMPLE_PROJECTS = [
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
  {
    id: "4",
    title: "Virtual Reality Therapy Platform",
    description: "Creating a VR platform that offers therapeutic experiences for anxiety, PTSD, and phobia treatment, designed in collaboration with mental health professionals.",
    createdAt: "2023-05-22T10:15:00Z",
    creator: {
      id: "user4",
      name: "James Wilson",
      avatar: "/placeholder.svg",
    },
    categories: ["Health", "VR/AR", "Social Impact"],
    skills: ["Unity", "C#", "3D Modeling", "UX Research", "Psychology"],
    collaborators: 5,
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
  },
  {
    id: "6",
    title: "Collaborative Open Source Music Creation Tool",
    description: "Developing a browser-based digital audio workstation that allows multiple musicians to collaborate remotely in real-time on music projects.",
    createdAt: "2023-06-12T09:45:00Z",
    creator: {
      id: "user6",
      name: "David Kim",
      avatar: "/placeholder.svg",
    },
    categories: ["Web Development", "Design", "Education"],
    skills: ["JavaScript", "Web Audio API", "React", "WebRTC", "UI/UX Design"],
    collaborators: 2,
  },
];

type SortOption = "newest" | "oldest" | "popular" | "updated";

const sortOptions: Record<SortOption, string> = {
  newest: "Newest",
  oldest: "Oldest",
  popular: "Most Popular",
  updated: "Recently Updated",
};

const ProjectsListing = () => {
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    skills: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would trigger an API call with the search query
    console.log("Searching for:", query);
  };

  const handleFilter = (filters: FilterOptions) => {
    setActiveFilters(filters);
    // In a real app, this would trigger an API call with the filter options
    console.log("Filtering by:", filters);
  };

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    // In a real app, this would trigger an API call with sorting
    console.log("Sorting by:", option);

    // For demo purposes, let's actually sort the projects
    const sortedProjects = [...projects];
    switch (option) {
      case "newest":
        sortedProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        sortedProjects.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "popular":
        sortedProjects.sort((a, b) => b.collaborators - a.collaborators);
        break;
      default:
        break;
    }
    setProjects(sortedProjects);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Discover Projects</h1>
            <p className="text-lg text-slate-600">
              Find innovative ideas to collaborate on or browse for inspiration
            </p>
          </div>

          <div className="mb-8">
            <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-sm text-slate-600">
              Showing <span className="font-medium">{projects.length}</span> projects
              {searchQuery && <span> matching "<span className="font-medium">{searchQuery}</span>"</span>}
            </div>
            
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    <span>Sort: {sortOptions[sortBy]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {Object.entries(sortOptions).map(([key, label]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() => handleSort(key as SortOption)}
                      className={sortBy === key ? "font-medium bg-slate-50" : ""}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 rounded-none rounded-l-md ${
                    viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-600"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 rounded-none rounded-r-md ${
                    viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-600"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {projects.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2" : "grid-cols-1"}`}>
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-medium text-slate-900 mb-2">No projects found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => { setSearchQuery(""); setActiveFilters({ categories: [], skills: [] }); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectsListing;
