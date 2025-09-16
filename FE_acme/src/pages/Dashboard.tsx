// import { useAuthStore } from '@/store/authStore';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { User, Mail, Calendar, Settings } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';

// export default function HomePage() {
//   const { user } = useAuthStore();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [showProfile, setShowProfile] = useState(false);

//   // Check URL params to show profile view
//   useEffect(() => {
//     const view = searchParams.get('view');
//     if (view === 'profile') {
//       setShowProfile(true);
//     }
//   }, [searchParams]);

//   const handleBackToHome = () => {
//     setShowProfile(false);
//     navigate('/dashboard');
//   };

//   // Extract name from email if name is not available
//   const getUserDisplayName = () => {
//     if (user?.name) {
//       return user.name;
//     }
//     // if (user?.email) {
//     //   // Extract name from email (part before @)
//     //   return user.email.split('@')[0];
//     // }
//     return 'User';
//   };

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('vi-VN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (showProfile) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <div className="mb-6">
//             <Button 
//               variant="outline" 
//               onClick={handleBackToHome}
//               className="mb-4"
//             >
//               ← Back to Home
//             </Button>
//             <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
//             <p className="text-gray-600">Manage your account information</p>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             {/* Profile Info Card */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="h-5 w-5" />
//                   Personal Information
//                 </CardTitle>
//                 <CardDescription>
//                   Your account details and information
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Name (extracted from email)</label>
//                   <p className="text-gray-900">{getUserDisplayName()}</p>
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Email Address</label>
//                   <div className="flex items-center gap-2">
//                     <Mail className="h-4 w-4 text-gray-500" />
//                     <p className="text-gray-900">{user?.email}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Account Info Card */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Calendar className="h-5 w-5" />
//                   Account Information
//                 </CardTitle>
//                 <CardDescription>
//                   Account creation and activity details
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Account Created</label>
//                   <p className="text-gray-900">{formatDate(user?.createdAt)}</p>
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Last Updated</label>
//                   <p className="text-gray-900">{formatDate(user?.updatedAt)}</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-4xl">
//         {/* Welcome Section */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Welcome, {getUserDisplayName()}! 👋
//           </h1>
//           <p className="text-lg text-gray-600 mb-6">
//             Great to see you back. Here's what's happening with your account.
//           </p>
          
//           <div className="flex justify-center gap-4">
//             <Button onClick={() => setShowProfile(true)}>
//               <User className="h-4 w-4 mr-2" />
//               View Profile
//             </Button>
//             <Button variant="outline">
//               <Settings className="h-4 w-4 mr-2" />
//               Settings
//             </Button>
//           </div>
//         </div>

//         {/* Quick Stats Cards */}
//         <div className="grid gap-6 md:grid-cols-3 mb-8">
//           <Card>
//             <CardHeader className="text-center">
//               <CardTitle className="text-lg">Account Status</CardTitle>
//             </CardHeader>
//             <CardContent className="text-center">
//               <div className="text-2xl font-bold text-green-600 mb-2">Active</div>
//               <p className="text-sm text-gray-600">Your account is in good standing</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="text-center">
//               <CardTitle className="text-lg">Member Since</CardTitle>
//             </CardHeader>
//             <CardContent className="text-center">
//               <div className="text-2xl font-bold text-blue-600 mb-2">
//                 {formatDate(user?.createdAt)}
//               </div>
//               <p className="text-sm text-gray-600">Registration date</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="text-center">
//               <CardTitle className="text-lg">Profile Completion</CardTitle>
//             </CardHeader>
//             <CardContent className="text-center">
//               <div className="text-2xl font-bold text-orange-600 mb-2">
//                 {user?.name ? '100%' : '80%'}
//               </div>
//               <p className="text-sm text-gray-600">
//                 {user?.name ? 'Complete!' : 'Add your name to complete'}
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* User Info Summary */}
//         <Card className="mt-6">
//           <CardHeader>
//             <CardTitle>Account Summary</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Email</label>
//                 <p className="text-gray-900">{user?.email}</p>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Display Name</label>
//                 <p className="text-gray-900">{getUserDisplayName()}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Sidebar, { type NavItem } from "@/components/Sidebar"
import {
  Home as HomeIcon,
  Users,
  Settings as SettingsIcon,
  Calendar,
  Github,
  X,
  PanelLeft, 
  PanelLeftOpen,
} from "lucide-react"

// ====== Data & helpers ======
const RANGE_TABS = ["1d", "3d", "7d", "30d", "Custom"] as const
type Range = typeof RANGE_TABS[number]

type Contact = { name: string; count: number; icon?: React.ReactNode }

const MOST_VISITED: Contact[] = [
  { name: "Oracle", count: 0 },
  { name: "Hugo Schmidt", count: 0 },
  { name: "Mateo Jensen", count: 0 },
  { name: "Airbnb", count: 0 },
  { name: "Olivia Weber", count: 0 },
  { name: "Tesla", count: 0 },
]

const LEAST_VISITED: Contact[] = [
  { name: "Oracle", count: 0 },
  { name: "Hugo Schmidt", count: 0 },
  { name: "Mateo Jensen", count: 0 },
  { name: "Airbnb", count: 0 },
  { name: "Olivia Weber", count: 0 },
  { name: "Tesla", count: 0 },
]

function StatCell({ title, value }: { title: string; value: number | string }) {
  return (
    <div className=" border-l px-6 py-4 ">
      <div className="flex flex-col gap-1 text-start">
        <div className="text-sm text-neutral-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  )
}

function ContactList({ items, title }: { items: Contact[]; title: string }) {
  return (
    <Card className="rounded-xl py-0 gap-0">
      <CardHeader className="p-6 gap-0">
        <CardTitle className="text-base font-medium text-neutral-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ul className="">
          {items.map((c, i) => (
            <li key={i} className="flex items-center justify-between mt-1">
              

              <a href="" className="inline-flex rounded-md text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 group w-full items-center justify-between px-3">
                <div className="inline-flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                    {c.icon ?? <Users className="h-4 w-4" />}
                  </div>
                  <span className="truncate">{c.name}</span>
                </div>
                <span className="rounded-md bg-neutral-100 px-2 py-1 text-sm font-medium tabular-nums text-neutral-700 group-hover:bg-neutral-200">
                  {c.count}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// ====== Page ======
export default function Dashboard() {
  const { user } = useAuthStore()

  // nhớ trạng thái thu gọn sidebar
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return typeof window !== "undefined" && localStorage.getItem("sidebar-collapsed") === "1"
  })
  const toggleSidebar = () => {
    setCollapsed((v) => {
      const next = !v
      try {
        localStorage.setItem("sidebar-collapsed", next ? "1" : "0")
      } catch {}
      return next
    })
  }

  const [range, setRange] = useState<Range>("30d")
  const [dateRange] = useState("Aug 16, 2025 - Sep 15, 2025")

  
  return (
    <div className=" flex min-h-screen bg-neutral-50 text-neutral-900">
      {/* Sidebar trái có thể thu gọn/mở rộng */}
      <div className="sticky left-0 top-0 z-20 h-screen flex-shrink-0 border-r">
        <Sidebar
          collapsed={collapsed}
          onToggle={toggleSidebar}
          items={
            [
              { label: "Home", to: "/dashboard", icon: <HomeIcon className="h-4 w-4" /> },
              { label: "Contacts", to: "/contacts", icon: <Users className="h-4 w-4" /> },
              { label: "Settings", to: "/settings", icon: <SettingsIcon className="h-4 w-4" /> },
            ] satisfies NavItem[]
          }
          favorites={[{ label: "Airbnb" }, { label: "Google" }, { label: "Microsoft" }]}
          orgName="aaa"
          userName={user?.name ?? "Jame donW"}
        />
      </div>

      {/* Content */}
      {/* Top bar (chỉ có nút Github/X bên phải như mẫu) */}
      <div className="flex-1">
        <header className="sticky top-0 z-10 flex flex-col items-stretch bg-white">
          {/* header1 */}
          <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 border-b">
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                aria-pressed={collapsed}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="h-8 px-2 size-8"
              >
                {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
              </Button>
              {/* vertical line */} 
              <div className="h-4 w-px bg-neutral-200 mr-2" role="separator" />
              
              <div className="flex flex-row items-center gap-2  text-neutral-700">
                <h1 className="text-sm font-semibold">Overview</h1>
                {/* svg ! in circle symbol  */}
                <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="sm" className="h-8 px-2 text-neutral-600">
                <Github className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-8 size-9 px-2 text-neutral-600">
                {/* X (old twitter) logo  */}
                <img src="/logo_x.png" alt="X" width={24} height={24} />
              </Button>
            </div>
          </div>

          {/* <div className="h-px w-full bg-neutral-200" role="separator" /> */}

          {/* header2: Toolbar */}
          <div className="flex h-12 items-center gap-2 px-4 border-b">
            <div className="flex items-center gap-x-2 rounded-lg bg-white p-1" role="tablist" aria-label="Range">
              {RANGE_TABS.map((r) => (
                <button
                  key={r}
                  type="button"
                  role="tab"
                  aria-selected={range === r}
                  onClick={() => setRange(r)}
                  className={`rounded-md px-2 py-1 text-[14.5] ${
                    range === r ? "underline text-black" : "text-neutral-500 hover:bg-neutral-100"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              className="inline-flex items-center gap-2 rounded-sm border bg-white px-3 py-1.5 text-sm text-neutral-700"
            >
              <Calendar className="h-4 w-4" />
              <span>{dateRange}</span>
            </Button>
          </div>
        </header>

        <div className="mx-auto max-w-6xl">
          <div className="flex py-6 px-6">
            {/* Main */}
            <main className="flex-1 flex flex-col gap-8">
              {/* Lead generation card */}
              <div className="">
                <Card className="rounded-xl py-0 ">
                  <div className="flex items-center justify-between border-b">
                    <div className="flex flex-1 flex-col justify-center px-6 py-5 gap-1">
                      <div className="text-base font-medium text-neutral-800">Lead generation</div>
                      <div className="text-sm text-neutral-500">New contacts added to the pool.</div>
                    </div>
                    <div className="flex overflow-hidden text-center">
                      <StatCell title="People" value={0} />
                      <StatCell title="Companies" value={0} />
                    </div>
                  </div>
                  <CardContent>
                    {/* placeholder vùng chart */}
                    <div className="h-48 rounded-md bg-white text-sm text-neutral-400" />
                  </CardContent>
                </Card>
              </div>

              {/* Lists */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <ContactList title="Most visited contacts" items={MOST_VISITED} />
                <ContactList title="Least visited contacts" items={LEAST_VISITED} />
              </div>
            </main>
          </div>
        </div>
      </div>
      
    </div>
  )
}
