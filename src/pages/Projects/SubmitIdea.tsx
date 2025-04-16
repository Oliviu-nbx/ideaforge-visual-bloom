
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, SendHorizonal, X, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SkillTag } from "@/components/ui/skill-tag";
import { CategoryTag } from "@/components/ui/category-tag";
import { AlertToast } from "@/components/ui/alert-toast";
import MainLayout from "@/layouts/MainLayout";

// Sample categories and skills data
const AVAILABLE_CATEGORIES = [
  "Web Development", "Mobile App", "AI/ML", "IoT",
  "Blockchain", "Design", "Education", "Health",
  "Environment", "Social Impact", "VR/AR", "Fintech",
  "Gaming", "Agriculture", "E-commerce"
];

const AVAILABLE_SKILLS = [
  "React", "Node.js", "Python", "JavaScript", "UI/UX Design",
  "Swift", "Flutter", "Kotlin", "TensorFlow", "AWS",
  "DevOps", "Figma", "Unity", "C#", "3D Modeling",
  "Solidity", "Smart Contracts", "Web3", "Firebase", "UX Research",
  "Machine Learning", "Data Science", "Backend Development", "Mobile Development"
];

const SubmitIdea = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedCategories: [] as string[],
    selectedSkills: [] as string[],
    goals: [""] as string[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (index: number, value: string) => {
    const updatedGoals = [...formData.goals];
    updatedGoals[index] = value;
    setFormData((prev) => ({ ...prev, goals: updatedGoals }));
  };

  const addGoal = () => {
    setFormData((prev) => ({ ...prev, goals: [...prev.goals, ""] }));
  };

  const removeGoal = (index: number) => {
    if (formData.goals.length > 1) {
      const updatedGoals = formData.goals.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, goals: updatedGoals }));
    }
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }));
  };

  const filteredCategories = AVAILABLE_CATEGORIES.filter((category) =>
    category.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  const filteredSkills = AVAILABLE_SKILLS.filter((skill) =>
    skill.toLowerCase().includes(skillFilter.toLowerCase())
  );

  const handleSaveDraft = () => {
    if (formData.title.trim() === "") {
      setError("Please provide a project title before saving.");
      return;
    }

    setSavingDraft(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Saving draft:", formData);
      setSavingDraft(false);
      // Navigate to projects page in a real app, or show success message
      navigate("/projects");
    }, 1500);
  };

  const validateForm = () => {
    if (formData.title.trim() === "") {
      setError("Please provide a project title.");
      return false;
    }
    if (formData.description.trim() === "") {
      setError("Please provide a project description.");
      return false;
    }
    if (formData.selectedCategories.length === 0) {
      setError("Please select at least one category.");
      return false;
    }
    if (formData.selectedSkills.length === 0) {
      setError("Please select at least one required skill.");
      return false;
    }
    if (formData.goals.some(goal => goal.trim() === "")) {
      setError("Please provide all project goals or remove empty ones.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Submitting idea:", formData);
      setSubmitting(false);
      // Navigate to the newly created project page in a real app
      navigate("/projects/1");
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Post a New Idea</h1>
            <p className="text-slate-600">
              Share your project idea with the community and find collaborators to help bring it to life.
            </p>
          </div>

          {/* Warning Prompt */}
          {showWarning && (
            <div className="mb-8">
              <AlertToast
                variant="warning"
                onClose={() => setShowWarning(false)}
              >
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium mb-1">Provide Clear Project Details</h5>
                    <p>
                      Projects with detailed descriptions and specific skill requirements are more likely to attract 
                      suitable collaborators. Be specific about what you're building and what help you need.
                    </p>
                  </div>
                </div>
              </AlertToast>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6">
              <AlertToast
                variant="error"
                onClose={() => setError(null)}
              >
                {error}
              </AlertToast>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">
                Project Title <span className="text-destructive-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., AI-Powered Sustainable Agriculture Platform"
                value={formData.title}
                onChange={handleInputChange}
                className="h-12"
                maxLength={100}
                disabled={submitting || savingDraft}
                onFocus={() => setShowWarning(true)}
              />
              <div className="flex justify-end">
                <span className="text-xs text-slate-500">
                  {formData.title.length}/100
                </span>
              </div>
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">
                Project Description <span className="text-destructive-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project idea, its purpose, and what problem it solves..."
                value={formData.description}
                onChange={handleInputChange}
                rows={8}
                className="resize-y"
                disabled={submitting || savingDraft}
              />
              <p className="text-xs text-slate-500">
                Use clear, detailed descriptions to help potential collaborators understand your vision.
                You can use markdown for formatting.
              </p>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <Label className="text-base">
                Categories <span className="text-destructive-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.selectedCategories.map((category) => (
                  <CategoryTag
                    key={category}
                    name={category}
                    onClick={() => toggleCategory(category)}
                    className="pr-1.5 flex items-center"
                  >
                    <X className="h-3 w-3 ml-1 cursor-pointer" />
                  </CategoryTag>
                ))}
              </div>
              
              <div className="relative">
                <Input
                  placeholder="Search categories..."
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  onFocus={() => setShowCategoryDropdown(true)}
                  className="h-12"
                  disabled={submitting || savingDraft}
                />
                {showCategoryDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-sm max-h-60 overflow-y-auto">
                    <div className="p-2 flex flex-wrap gap-2">
                      {filteredCategories.map((category) => (
                        <CategoryTag
                          key={category}
                          name={category}
                          onClick={() => toggleCategory(category)}
                          variant={formData.selectedCategories.includes(category) ? "primary" : "default"}
                        />
                      ))}
                    </div>
                    <div className="p-2 border-t border-slate-200 flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCategoryDropdown(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Select categories that best describe your project (up to 5).
              </p>
            </div>

            {/* Required Skills */}
            <div className="space-y-3">
              <Label className="text-base">
                Required Skills <span className="text-destructive-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.selectedSkills.map((skill) => (
                  <SkillTag
                    key={skill}
                    name={skill}
                    variant="secondary"
                    onClick={() => toggleSkill(skill)}
                    className="pr-1.5 flex items-center"
                  >
                    <X className="h-3 w-3 ml-1 cursor-pointer" />
                  </SkillTag>
                ))}
              </div>
              
              <div className="relative">
                <Input
                  placeholder="Search skills..."
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  onFocus={() => setShowSkillDropdown(true)}
                  className="h-12"
                  disabled={submitting || savingDraft}
                />
                {showSkillDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-sm max-h-60 overflow-y-auto">
                    <div className="p-2 flex flex-wrap gap-2">
                      {filteredSkills.map((skill) => (
                        <SkillTag
                          key={skill}
                          name={skill}
                          variant={formData.selectedSkills.includes(skill) ? "secondary" : "default"}
                          onClick={() => toggleSkill(skill)}
                        />
                      ))}
                    </div>
                    <div className="p-2 border-t border-slate-200 flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSkillDropdown(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Select the skills you're looking for in collaborators.
              </p>
            </div>

            {/* Project Goals */}
            <div className="space-y-3">
              <Label className="text-base">
                Project Goals <span className="text-destructive-500">*</span>
              </Label>
              <div className="space-y-3">
                {formData.goals.map((goal, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Goal ${index + 1}`}
                      value={goal}
                      onChange={(e) => handleGoalChange(index, e.target.value)}
                      className="h-12"
                      disabled={submitting || savingDraft}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeGoal(index)}
                      disabled={(formData.goals.length <= 1) || submitting || savingDraft}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-1"
                  onClick={addGoal}
                  disabled={submitting || savingDraft}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Another Goal</span>
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Define clear, achievable goals for your project to help collaborators understand what you're aiming to accomplish.
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                className="flex-1 flex items-center justify-center gap-1"
                onClick={handleSaveDraft}
                disabled={submitting || savingDraft}
              >
                {savingDraft ? (
                  <LoadingSpinner size="sm" text="Saving..." />
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Draft</span>
                  </>
                )}
              </Button>
              <Button
                type="submit"
                className="flex-1 flex items-center justify-center gap-1"
                disabled={submitting || savingDraft}
              >
                {submitting ? (
                  <LoadingSpinner size="sm" text="Submitting..." />
                ) : (
                  <>
                    <SendHorizonal className="h-4 w-4" />
                    <span>Submit Idea</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubmitIdea;
