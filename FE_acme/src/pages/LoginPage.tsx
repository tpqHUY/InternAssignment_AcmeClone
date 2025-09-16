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
import { loginSchema, type LoginFormData } from "@/schemas/auth";

import * as React from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils";
 
export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      await login(data.email, data.password);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error('Login error:', err);
      const message =
        err.response?.data?.message || err.message || "Login failed. Please try again.";
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
            <span className=" font-semibold text-md">Acme</span>
          </div>
        </div>        

        <Card>
          <CardHeader>
            <CardTitle className=" font-semibold text-[17px]">Sign in to your account</CardTitle>
            <CardDescription>
              Welcome back! Please sign in to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    // placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email")}
                    className={`pl-9 ${errors.email ? "border-red-500" : ""}`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-muted-foreground underline hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    // placeholder="••••••••"
                    autoComplete="current-password"
                    {...register("password")}
                    className={`pl-9 pr-10 ${errors.password ? "border-red-500" : ""}`}
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
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
              </Button>

              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Social buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 justify-center gap-2"
                  onClick={() => toast.error("Not implemented yet")}
                >
                  <img
                    src="/logo_gg.png"
                    alt="Google"
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 justify-center gap-2"
                  onClick={() => toast.error("Not implemented yet")}
                >
                  <img
                    src="/logo_ms.png"
                    alt="Microsoft"
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  Microsoft
                </Button>
              </div>

              {/* Footer link */}
              <p className="text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary underline hover:text-primary/80"
                >
                  Sign up
                </Link>
              </p>
            </form>

            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
