"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Home, LogIn } from "lucide-react"
import { useApp, type Role } from "@/context/app-context"
import { Field, inputClass } from "@/components/shared"

export default function LoginPage() {
  const { login, tenants } = useApp()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<Role>("Admin")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === "Admin") {
      login({ role: "Admin", name: "Pak Hendra" })
      navigate("/admin/dashboard")
    } else {
      const tenant = tenants[0]
      login({ role: "Penghuni", name: tenant.name, tenantId: tenant.id })
      navigate("/penghuni/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 text-white">
            <Home className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Kost Berkat Doa</h1>
          <p className="text-sm text-gray-500">Sistem Manajemen Pembayaran</p>
        </div>

        <div className="space-y-4">
          <Field label="Username">
            <input
              className={inputClass}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </Field>
          <Field label="Masuk sebagai">
            <select
              className={inputClass}
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value="Admin">Admin</option>
              <option value="Penghuni">Penghuni</option>
            </select>
          </Field>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-2.5 font-medium text-white transition hover:bg-blue-600"
          >
            <LogIn className="h-4 w-4" /> Masuk
          </button>
        </div>
      </form>
    </div>
  )
}
