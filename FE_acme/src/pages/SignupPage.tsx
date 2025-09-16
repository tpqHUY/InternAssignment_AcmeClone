import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useAuthStore } from "@/store/authStore";
import { signupSchema, type SignupFormData } from "@/schemas/auth";
import { cn } from "@/lib/utils";

import * as React from "react";
import { Mail, Lock, Eye, EyeOff, CircleX, User } from "lucide-react"

export default function SignupPage() {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError("");
      // Extract name from email for display
      const name = data.email.split("@")[0];
      await signup(name, data.email, data.password);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      console.log("Error response data:", err.response?.data);
      console.log("Error status:", err.response?.status);

      // Xử lý lỗi 403 (Forbidden) - email đã tồn tại
      if (err.response?.status === 403) {
        const message = "Email này đã được sử dụng. Vui lòng chọn email khác.";
        setError(message);
        toast.error(message);

        // Reset form khi email đã tồn tại
        reset();
        return;
      }

      // Xử lý lỗi 400 (Bad Request) - có thể là email đã tồn tại
      if (err.response?.status === 400) {
        const message =
          err.response?.data?.message ||
          "Email này có thể đã được sử dụng. Vui lòng thử email khác.";
        setError(message);
        toast.error(message);
        reset();
        return;
      }

      // Xử lý các lỗi khác
      const message =
        err.response?.data?.message ||
        err.message ||
        "Sign up failed. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div className="justify-center flex">
          <div className={cn("flex items-center space-x-2")}>
            <img
              src="/logo_acme.png"
              alt="Acme Logo"
              width={30}
              height={30}
              className="rounded"
            />
            <span className="font-bold text-lg">Acme</span>
          </div>
        </div>


        <Card>
          <CardHeader>
            <CardTitle className="font-semibold text-[17px]">Create your account</CardTitle>
            <CardDescription>
              Please fill in the details to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    // placeholder="Your name"
                    {...register("name")}
                    className={`pl-9 ${errors.name ? "border-red-500" : ""}`}
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    // placeholder="
                    {...register("email")}
                    className={`pl-9 ${errors.email ? "border-red-500" : ""}`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`pl-9 pr-10 ${errors.password ? "border-red-500" : ""}`}
                    // placeholder="Create a password"
                    required  
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
                <div className="flex justify-start items-center space-x-1 font-semibold px-1">
                  <CircleX className="inline mr-1 h-4 w-4 text-gray-500"/>
                  <p className="text-xs text-gray-500">
                    8 or more characters
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create account
              </Button>
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="flex space-x-4  justify-center">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => toast.error("Not implemented yet")}
                >
                  <img
                    src="/logo_gg.png"
                    alt="Acme Logo"
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => toast.error("Not implemented yet")}
                >
                  <img
                    src="/logo_ms.png"
                    alt="Acme Logo"
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  Microsoft
                </Button> 
              </div>
              <div className="flex text-xm text-gray-500 text-center justify-center gap-1">
                <p>Already have an account?</p>
                <Link
                  to="/login"
                  className="font-medium text-primary underline hover:text-primary/80"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-xs text-gray-500 text-center font-medium">
          By signing up, you agree to our{" "}
          <a href="#" className=" text-black underline hover:text-primary/80">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className=" text-black underline hover:text-primary/80">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
