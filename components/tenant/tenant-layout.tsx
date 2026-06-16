"use client"

import { NavLink, Outlet, useNavigate, Navigate, useLocation } from "react-router-dom"
import { LayoutDashboard, Upload, History, User, LogOut, Home } from "lucide-react"
import { useApp } from "@/context/app-context"

const nav = [
  { to: "/penghuni/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/penghuni/bayar", label: "Bayar", icon: Upload },
  { to: "/penghuni/riwayat", label: "Riwayat", icon: History },
  { to: "/penghuni/profil", label: "Profil", icon: User },
]

export default function TenantLayout() {
  const { currentUser, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  if (!currentUser || currentUser.role !== "Penghuni") {
    return <Navigate to="/" replace />
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
            <Home className="h-4 w-4" />
          </div>
          <p className="text-sm font-bold text-gray-800">Kost Berkat Doa</p>
        </div>
        <button onClick={handleLogout} className="rounded-lg p-2 text-red-500 transition hover:bg-red-50" aria-label="Logout">
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      <main key={location.pathname} className="mx-auto w-full max-w-2xl flex-1 p-4 pb-24 animate-in fade-in duration-300">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-2xl">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition ${
                  isActive ? "text-blue-500" : "text-gray-400"
                }`
              }
            >
              <n.icon className="h-5 w-5" />
              {n.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
