
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This is a placeholder - in a real app, this would be linked to auth state
const isLoggedIn = false;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">IF</span>
              </div>
              <span className="font-heading font-semibold text-xl">IdeaForge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/projects" className="text-slate-600 hover:text-primary font-medium">
              Browse Projects
            </Link>
            <Link to="/how-it-works" className="text-slate-600 hover:text-primary font-medium">
              How It Works
            </Link>
            <Link to="/about" className="text-slate-600 hover:text-primary font-medium">
              About
            </Link>
          </div>

          {/* Desktop Auth / User Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="text-slate-600">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-600">
                  <Bell className="h-5 w-5" />
                </Button>
                <Link to="/profile" className="flex items-center space-x-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-slate-600" />
              ) : (
                <Menu className="h-6 w-6 text-slate-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-200 mt-4">
            <div className="space-y-1">
              <Link
                to="/projects"
                className="block py-2 text-slate-600 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Projects
              </Link>
              <Link
                to="/how-it-works"
                className="block py-2 text-slate-600 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/about"
                className="block py-2 text-slate-600 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="block py-2 text-slate-600 hover:text-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/notifications"
                    className="block py-2 text-slate-600 hover:text-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Notifications
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-slate-600 hover:text-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 text-slate-600 hover:text-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
