
import React from "react";
import { Link } from "react-router-dom";
import { Clock, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillTag } from "@/components/ui/skill-tag";
import { CategoryTag } from "@/components/ui/category-tag";

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  categories: string[];
  skills: string[];
  collaborators: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  createdAt,
  creator,
  categories,
  skills,
  collaborators,
}) => {
  // Format date to be more readable
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      <Link to={`/projects/${id}`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">{title}</h3>
          </div>
          
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{description}</p>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {categories.slice(0, 3).map((category) => (
              <CategoryTag key={category} name={category} size="sm" />
            ))}
            {categories.length > 3 && (
              <span className="text-xs text-slate-500 flex items-center">
                +{categories.length - 3} more
              </span>
            )}
          </div>
          
          {/* Skills */}
          <div className="mb-5">
            <div className="text-sm font-medium text-slate-700 mb-1.5">Required Skills:</div>
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 4).map((skill) => (
                <SkillTag key={skill} name={skill} variant="secondary" size="sm" />
              ))}
              {skills.length > 4 && (
                <span className="text-xs text-slate-500 flex items-center">
                  +{skills.length - 4} more
                </span>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={creator.avatar} />
                <AvatarFallback className="text-xs">
                  {creator.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-slate-600">{creator.name}</span>
            </div>
            
            <div className="flex items-center space-x-4 text-slate-500">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs">{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span className="text-xs">{collaborators}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
