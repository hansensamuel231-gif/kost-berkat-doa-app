"use client"

import { CheckCircle2, AlertTriangle, CalendarClock, BedDouble } from "lucide-react"
import { useApp } from "@/context/app-context"
import { getDueDateInfo } from "@/lib/data"

export default function TenantDashboard() {
  const { currentUser, tenants, payments } = useApp()
  const tenant = tenants.find((t) => t.id === currentUser?.tenantId) ?? tenants[0]

  const latest = payments.find((p) => p.tenantName === tenant.name)
  const isPaid = latest?.status === "Lunas"
  const due = getDueDateInfo()
  const dueDateText = new Date(due.date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="space-y-4">
      {/* Welcome card */}
      <div className="rounded-2xl bg-blue-500 p-5 text-white">
        <p className="text-sm text-blue-100">Selamat datang,</p>
        <h1 className="text-xl font-bold">{tenant.name}</h1>
        <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-sm">
          <BedDouble className="h-4 w-4" /> Kamar {tenant.roomNumber}
        </div>
      </div>

      {/* Due date warning */}
      {due.daysLeft <= 7 && (
        <div
          className={`flex items-start gap-3 rounded-2xl p-4 ${
            due.daysLeft <= 3 ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-700"
          }`}
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Pengingat Jatuh Tempo</p>
            <p className="text-sm">
              Pembayaran Anda jatuh tempo dalam {due.daysLeft} hari. Segera lakukan pembayaran.
            </p>
          </div>
        </div>
      )}

      {/* Status pembayaran */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="mb-2 text-sm text-gray-500">Status Pembayaran</p>
          <div
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold ${
              isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
            }`}
          >
            <CheckCircle2 className="h-5 w-5" />
            {isPaid ? "Lunas" : "Belum Bayar"}
          </div>
          <p className="mt-2 text-xs text-gray-400">Periode {latest?.period ?? "-"}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="mb-2 text-sm text-gray-500">Jatuh Tempo</p>
          <div className="flex items-center gap-2 text-gray-800">
            <CalendarClock className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">{dueDateText}</span>
          </div>
          <p className="mt-2 text-xs text-gray-400">Sisa {due.daysLeft} hari lagi</p>
        </div>
      </div>
    </div>
  )
}
