import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Ellipsis, LogOut, User, Settings as Cog } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type Props = { className?: string }

export default function ProfileButton({ className = "" }: Props) {
  const navigate = useNavigate()
  // If your store has a logout action, we’ll call it; else we’ll clear tokens.
  const logoutFromStore = (useAuthStore as any)?.getState?.().logout

  const handleLogout = async () => {
    try {
      if (typeof logoutFromStore === "function") {
        await logoutFromStore()
      } else {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        ;(useAuthStore as any)?.setState?.({ user: null })
      }
    } finally {
      navigate("/signin") // change to your login route if different
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="More actions"
          className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-300 ${className}`}
        >
          <Ellipsis className="h-4 w-4 text-neutral-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={6} className="w-44">
        {/* Optional extra items */}
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Cog className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
