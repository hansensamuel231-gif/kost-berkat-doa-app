"use client"

import { NavLink, Outlet, useNavigate, Navigate, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  BedDouble,
  Users,
  CreditCard,
  CheckCircle,
  FileText,
  LogOut,
  Home,
} from "lucide-react"
import { useApp } from "@/context/app-context"

const menu = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/kamar", label: "Manajemen Kamar", icon: BedDouble },
  { to: "/admin/penghuni", label: "Manajemen Penghuni", icon: Users },
  { to: "/admin/pembayaran", label: "Pembayaran", icon: CreditCard },
  { to: "/admin/konfirmasi", label: "Konfirmasi Bukti Bayar", icon: CheckCircle },
  { to: "/admin/laporan", label: "Laporan Keuangan", icon: FileText },
]

export default function AdminLayout() {
  const { currentUser, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/" replace />
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">Kost Berkat Doa</p>
            <p className="text-xs text-gray-400">Panel Admin</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <m.icon className="h-5 w-5" />
              {m.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="m-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col md:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
          <p className="text-sm font-semibold text-gray-700 md:hidden">Kost Berkat Doa</p>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{currentUser.name}</p>
              <p className="text-xs text-gray-400">Pemilik Kost</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
              {currentUser.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-gray-200 bg-white px-3 py-2 md:hidden">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                }`
              }
            >
              <m.icon className="h-4 w-4" />
              {m.label.split(" ")[0]}
            </NavLink>
          ))}
        </div>

        <main key={location.pathname} className="flex-1 p-4 md:p-6 animate-in fade-in duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
