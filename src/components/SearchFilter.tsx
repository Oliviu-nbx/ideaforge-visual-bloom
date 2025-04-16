
import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryTag } from "@/components/ui/category-tag";
import { SkillTag } from "@/components/ui/skill-tag";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  categories: string[];
  skills: string[];
}

const SAMPLE_CATEGORIES = [
  "Web Development",
  "Mobile App",
  "AI/ML",
  "IoT",
  "Blockchain",
  "Design",
  "Education",
  "Health",
  "Environment",
  "Social Impact",
];

const SAMPLE_SKILLS = [
  "React",
  "Node.js",
  "Python",
  "JavaScript",
  "UI/UX Design",
  "Swift",
  "Flutter",
  "Kotlin",
  "TensorFlow",
  "AWS",
  "DevOps",
  "Figma",
];

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const applyFilters = () => {
    onFilter({
      categories: selectedCategories,
      skills: selectedSkills,
    });
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSkills([]);
    onFilter({
      categories: [],
      skills: [],
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Input
            placeholder="Search projects by keyword, skill, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleEnterKey}
            className="w-full pl-10 h-11"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSearch} className="h-11 px-4 py-2">
            Search
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 h-11"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {(selectedCategories.length > 0 || selectedSkills.length > 0) && (
              <span className="w-5 h-5 flex items-center justify-center bg-primary text-white text-xs rounded-full">
                {selectedCategories.length + selectedSkills.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedSkills.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-slate-700">Active filters:</span>
          {selectedCategories.map((category) => (
            <CategoryTag
              key={category}
              name={category}
              size="sm"
              onClick={() => toggleCategory(category)}
              className="pr-1.5 flex items-center"
            >
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </CategoryTag>
          ))}
          {selectedSkills.map((skill) => (
            <SkillTag
              key={skill}
              name={skill}
              variant="secondary"
              size="sm"
              onClick={() => toggleSkill(skill)}
              className="pr-1.5 flex items-center"
            >
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </SkillTag>
          ))}
          <Button
            variant="ghost"
            className="text-xs h-6 px-2 py-0 text-slate-600 hover:bg-slate-100"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 mt-2 space-y-5">
          <div>
            <h3 className="font-medium text-slate-900 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_CATEGORIES.map((category) => (
                <CategoryTag
                  key={category}
                  name={category}
                  onClick={() => toggleCategory(category)}
                  variant={selectedCategories.includes(category) ? "primary" : "default"}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-slate-900 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_SKILLS.map((skill) => (
                <SkillTag
                  key={skill}
                  name={skill}
                  onClick={() => toggleSkill(skill)}
                  variant={selectedSkills.includes(skill) ? "secondary" : "default"}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
