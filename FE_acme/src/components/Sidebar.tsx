import * as React from "react"
import { NavLink } from "react-router-dom"
import {
  Home, Users, Settings as SettingsIcon,
  ChevronLeft, ChevronRight, Star, Plus, MessageCircle,
  Ellipsis 
} from "lucide-react"
import ProfileButton from "./ProfileButton";

export type NavItem = { label: string; to: string; icon: React.ReactNode }

export function Sidebar({
  collapsed,
  onToggle,
  orgName = "aaa",
  items,
  favorites = [],
  userName = "Jame donW",
  showInnerToggle = false,
}: {
  collapsed: boolean
  onToggle: () => void
  orgName?: string
  items: NavItem[]
  favorites?: { label: string; to?: string }[]
  userName?: string
  showInnerToggle?: boolean
}) {
  return (
    <aside
      className={`hidden h-full shrink-0 transition-all duration-200 md:block ${
        collapsed ? "w-16" : "w-[240px]"
      }`}
      aria-label="Primary"
    >
      <div className="h-full flex flex-col justify-between bg-white">
        {/* Expanded */}
        {!collapsed ? (
          <>
            <div>
              {/* Org + toggle */}
              <div className="flex items-center justify-between p-3 h-14">
                <div className="flex items-center gap-2 p-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">
                    {orgName[0]?.toUpperCase()}
                  </div>
                  <div className="font-medium">{orgName}</div>
                </div>
                {showInnerToggle && (
                  <button
                    aria-label="Collapse sidebar"
                    onClick={onToggle}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Nav */}
              <nav className="space-y-1 p-3" role="navigation">
                {items.map((i) => (
                  <NavLink
                    key={i.label}
                    to={i.to}
                    className={({ isActive }) =>
                      `group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm ${
                        isActive ? "bg-neutral-100 font-medium" : "text-neutral-700 hover:bg-neutral-100"
                      }`
                    }
                  >
                    <span className="text-neutral-600">{i.icon}</span>
                    <span className="truncate">{i.label}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Favorites */}
              {favorites.length > 0 && (
                <div className="mt-4 p-3">
                  <div className="px-3 pb-1 text-base font-medium tracking-wide text-neutral-500">
                    Favorites
                  </div>
                  <div className="space-y-1">
                    {favorites.map((f) => (
                      <NavLink
                        key={f.label}
                        to={f.to ?? "#"}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        <Star className="h-4 w-4 text-amber-500" />
                        <span className="truncate">{f.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {/* Footer actions */}
              <div className="mt-6 space-y-1 p-3 pb-0">
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  <Plus className="h-4 w-4" /> Invite member
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  <MessageCircle className="h-4 w-4" /> Feedback
                </button>
              </div>

              {/* Current user */}
              <div className="flex items-center rounded-lg hover:bg-neutral-50 p-3 h-14">
                <div className="flex flex-row items-center w-full gap-2 h-9 pl-1 pr-3.5 p-2.5 justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-neutral-200" />
                    <div className="text-sm">
                      <div className="font-medium">{userName}</div>
                    </div>
                  </div>
                  <ProfileButton />

                </div>
              </div>
            </div>
          </>
        ) : (
          // Collapsed (rail) — synced paddings/heights with expanded
          <div className="flex h-full flex-col justify-between">
            <div>
              {/* Org row (same p-3 h-14) */}
              <div className="flex items-center justify-between p-3 h-14">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">
                    {orgName[0]?.toUpperCase()}
                  </div>
                </div>
                {showInnerToggle && (
                  <button
                    aria-label="Expand sidebar"
                    onClick={onToggle}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Nav (same p-3) */}
              <nav className="space-y-1 p-3" role="navigation">
                {items.map((i) => (
                  <NavLink
                    key={i.label}
                    to={i.to}
                    className={({ isActive }) =>
                      `group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm ${
                        isActive ? "bg-neutral-100 font-medium" : "text-neutral-700 hover:bg-neutral-100"
                      } justify-center`
                    }
                    aria-label={i.label}
                  >
                    <span className="text-neutral-700">{i.icon}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Favorites (same mt-4 p-3) */}
              {favorites.length > 0 && (
                <div className="mt-4 p-3">
                  <div className="space-y-1">
                    {favorites.map((f) => (
                      <NavLink
                        key={f.label}
                        to={f.to ?? "#"}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 justify-center"
                        aria-label={f.label}
                      >
                        <Star className="h-4 w-4 text-amber-500" />
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {/* Footer actions (same mt-6 p-3 pb-0) */}
              <div className="mt-6 space-y-1 p-3 pb-0">
                <button
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 justify-center"
                  aria-label="Invite member"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 justify-center"
                  aria-label="Feedback"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>

              {/* Current user (same p-3 h-14) */}
              <div className="flex items-center rounded-lg hover:bg-neutral-50 p-3 h-14">
                <div className="flex w-full items-center justify-center gap-2 h-9">
                  <div className="h-8 w-8 rounded-full bg-neutral-200" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )

}

export default React.memo(Sidebar)
