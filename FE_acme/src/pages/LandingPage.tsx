import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Shield,
  Zap,
  Users,
  Lock,
  Rocket,
  Gauge,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "JWT-based auth with refresh tokens and robust server-side validation.",
    },
    {
      icon: Zap,
      title: "Fast & Modern",
      description:
        "React + Vite + Tailwind + shadcn/ui for speedy DX and clean UI.",
    },
    {
      icon: Users,
      title: "User Management",
      description:
        "Registration, session handling, protected routes, and profile basics.",
    },
    {
      icon: Lock,
      title: "Best Practices",
      description:
        "Minimal token payload, server-driven profile, sane defaults for safety.",
    },
    {
      icon: Gauge,
      title: "Minimal & Scalable",
      description:
        "Simple layout primitives that scale with your product needs.",
    },
    {
      icon: Rocket,
      title: "Ready to Ship",
      description:
        "Drop-in pages, cohesive styling, and easy deployment story.",
    },
  ]

  const steps = [
    { title: "Create an account", text: "Sign up with email and password." },
    { title: "Verify & sign in", text: "Obtain tokens and hydrate profile." },
    { title: "Start building", text: "Access dashboard and secure routes." },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900 text-white">
              A
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Auth App
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
            <a href="#features" className="hover:text-neutral-900">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-neutral-900">
              How it works
            </a>
            <a href="#preview" className="hover:text-neutral-900">
              Preview
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" className="px-3">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="px-3">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* subtle background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_60%)]"
        />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Minimal Auth,{" "}
              <span className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                Maximum Velocity
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-600">
              A clean, modern starter for authentication-driven apps. Built with
              NestJS, Prisma, React, Vite, Tailwind, and shadcn/ui—focused on
              clarity, security, and speed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/signup">
                <Button size="lg">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-500">
              <CheckCircle2 className="h-4 w-4" />
              No clutter. No bloat. Just what you need to start.
            </div>
          </div>
        </div>
      </section>

      {/* Logos (placeholder, minimal) */}
      <section className="border-y bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-6 px-4 py-8 sm:grid-cols-4">
          {["Airbnb", "Google", "Microsoft", "Oracle"].map((name) => (
            <div
              key={name}
              className="flex items-center justify-center text-sm text-neutral-400"
            >
              <div className="h-6 w-24 rounded bg-neutral-100" aria-hidden />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Everything you need, nothing you don’t
            </h2>
            <p className="mt-3 text-neutral-600">
              Production-ready primitives with minimal styling and sensible
              defaults.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="hover:shadow-sm">
                <CardHeader>
                  <div className="mb-3 inline-flex rounded-md bg-neutral-900/5 p-2">
                    <f.icon className="h-5 w-5 text-neutral-900" />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preview / Screens */}
      <section id="preview" className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight">
              See it in action
            </h3>
            <p className="mt-3 text-neutral-600">
              Auth screens and dashboard are included and wired to the backend.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:gap-4">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">Auth Screens</CardTitle>
                <CardDescription>Sign Up / Sign In</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Replace src with your real screenshots if available */}
                <div className="aspect-[16/9] w-full overflow-hidden rounded-md border">
                  <img
                    src="/signin.png"
                    alt="Auth preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // fallback block if image not present
                      ;(e.currentTarget as HTMLImageElement).style.display =
                        "none"
                    }}
                  />
                  <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400 [display:var(--fallback,flex)]">
                    Auth preview (add /screens/signin.png)
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">Dashboard</CardTitle>
                <CardDescription>
                  Minimal layout with collapsible sidebar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/9] w-full overflow-hidden rounded-md border">
                  <img
                    src="/dashboard-expanded.png"
                    alt="Dashboard preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      ;(e.currentTarget as HTMLImageElement).style.display =
                        "none"
                    }}
                  />
                  <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400 [display:var(--fallback,flex)]">
                    Dashboard preview (add /screens/dashboard-expanded.png)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight">
              Kick off in three steps
            </h3>
            <p className="mt-3 text-neutral-600">
              From zero to authenticated in minutes.
            </p>
          </div>

          <ol className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Card>
                  <CardHeader>
                    <div className="text-xs text-neutral-500">Step {i + 1}</div>
                    <CardTitle className="text-sm">{s.title}</CardTitle>
                    <CardDescription>{s.text}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-white">
          <h3 className="text-2xl font-semibold tracking-tight">
            Ready to get started?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-neutral-300">
            Sign up and jump straight into a clean, secure, and extensible
            starter.
          </p>
          <div className="mt-6 inline-flex gap-3">
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 text-sm text-neutral-600">
          <p>© {new Date().getFullYear()} Auth App. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-neutral-900">
              Features
            </a>
            <a href="#preview" className="hover:text-neutral-900">
              Preview
            </a>
            <Link to="/login" className="hover:text-neutral-900">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
