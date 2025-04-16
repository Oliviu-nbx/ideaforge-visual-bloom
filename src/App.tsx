import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// Auth pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
// Projects pages
import ProjectsListing from "./pages/Projects/ProjectsListing";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import SubmitIdea from "./pages/Projects/SubmitIdea";
import ProjectWorkspace from "./pages/Projects/ProjectWorkspace";
// User Profile page
import ProfilePage from "./pages/UserProfile/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Index />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Projects routes */}
          <Route path="/projects" element={<ProjectsListing />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/post-idea" element={<SubmitIdea />} />
          <Route path="/projects/:id/workspace" element={<ProjectWorkspace />} />
          
          {/* User profile */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          
          {/* 404 catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
