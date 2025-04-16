
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">IF</span>
              </div>
              <span className="font-heading font-semibold text-xl">IdeaForge</span>
            </Link>
            <p className="mt-4 text-sm text-slate-600">
              Connect, collaborate, and bring your ideas to life with the help of passionate
              innovators around the world.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-900 mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects" className="text-slate-600 hover:text-primary text-sm">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-600 hover:text-primary text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/post-idea" className="text-slate-600 hover:text-primary text-sm">
                  Post an Idea
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-slate-600 hover:text-primary text-sm">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-900 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-600 hover:text-primary text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-600 hover:text-primary text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-primary text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-900 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-slate-600 hover:text-primary text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-600 hover:text-primary text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-slate-600 hover:text-primary text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center">
            © {new Date().getFullYear()} IdeaForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
