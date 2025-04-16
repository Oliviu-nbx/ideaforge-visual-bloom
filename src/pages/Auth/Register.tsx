
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertToast } from "@/components/ui/alert-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password validation
  const passwordLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword;
  const isPasswordValid = passwordLength && hasUppercase && hasNumber;

  // Mock registration function
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    
    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements.");
      return;
    }
    
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }
    
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, show success message
      console.log("Registration successful");
      // Would redirect in real app
      window.location.href = "/";
      setLoading(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-slate-600">Join IdeaForge to connect with collaborators</p>
        </div>

        {error && (
          <div className="mb-6">
            <AlertToast variant="error" onClose={() => setError(null)}>
              {error}
            </AlertToast>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="space-y-1 mt-2">
              <div className="text-xs text-slate-600">Password must:</div>
              <ul className="space-y-1">
                <li className="text-xs flex items-center">
                  <span className={`mr-1 text-lg ${passwordLength ? "text-success-500" : "text-slate-400"}`}>•</span>
                  <span className={passwordLength ? "text-success-700" : "text-slate-600"}>
                    Be at least 8 characters
                  </span>
                </li>
                <li className="text-xs flex items-center">
                  <span className={`mr-1 text-lg ${hasUppercase ? "text-success-500" : "text-slate-400"}`}>•</span>
                  <span className={hasUppercase ? "text-success-700" : "text-slate-600"}>
                    Contain at least one uppercase letter
                  </span>
                </li>
                <li className="text-xs flex items-center">
                  <span className={`mr-1 text-lg ${hasNumber ? "text-success-500" : "text-slate-400"}`}>•</span>
                  <span className={hasNumber ? "text-success-700" : "text-slate-600"}>
                    Contain at least one number
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={loading}
              required
            />
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-destructive-500 mt-1">Passwords do not match</p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              disabled={loading}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <LoadingSpinner size="sm" text="Creating account..." /> : "Create account"}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-slate-500">or continue with</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" disabled={loading}>
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" disabled={loading}>
            <Mail className="h-5 w-5" />
            <span>Google</span>
          </Button>
        </div>

        <p className="text-center mt-8 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default Register;
