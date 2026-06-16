"use client"

import { useNavigate } from "react-router-dom"
import { BedDouble, DoorOpen, DoorClosed, Wallet, Eye } from "lucide-react"
import { useApp } from "@/context/app-context"
import { formatRupiah, monthlyIncome } from "@/lib/data"
import { StatusBadge } from "@/components/shared"

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType
  label: string
  value: string
  color: string
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-gray-800">{value}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const { rooms, payments } = useApp()
  const navigate = useNavigate()

  const total = rooms.length
  const terisi = rooms.filter((r) => r.status === "Terisi").length
  const kosong = rooms.filter((r) => r.status === "Kosong").length
  const pendapatan = 7000000

  const pending = payments.filter((p) => p.status === "Pending")
  const maxIncome = Math.max(...monthlyIncome.map((m) => m.amount))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Ringkasan operasional kost</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={BedDouble} label="Total Kamar" value={String(total)} color="bg-blue-500" />
        <StatCard icon={DoorClosed} label="Kamar Terisi" value={String(terisi)} color="bg-green-500" />
        <StatCard icon={DoorOpen} label="Kamar Kosong" value={String(kosong)} color="bg-yellow-500" />
        <StatCard icon={Wallet} label="Pendapatan Bulan Ini" value={formatRupiah(pendapatan)} color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending payments */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-800">Pembayaran Belum Dikonfirmasi</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
                  <th className="pb-2 pr-3">Nama</th>
                  <th className="pb-2 pr-3">Kamar</th>
                  <th className="pb-2 pr-3">Periode</th>
                  <th className="pb-2 pr-3">Status</th>
                  <th className="pb-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pending.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-400">
                      Tidak ada pembayaran menunggu konfirmasi
                    </td>
                  </tr>
                )}
                {pending.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50">
                    <td className="py-2.5 pr-3 font-medium text-gray-700">{p.tenantName}</td>
                    <td className="py-2.5 pr-3 text-gray-600">{p.roomNumber}</td>
                    <td className="py-2.5 pr-3 text-gray-600">{p.period}</td>
                    <td className="py-2.5 pr-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => navigate("/admin/konfirmasi")}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                      >
                        <Eye className="h-3.5 w-3.5" /> Lihat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bar chart */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-800">Pendapatan 6 Bulan Terakhir</h2>
          <div className="flex h-56 items-end justify-between gap-3">
            {monthlyIncome.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] font-medium text-gray-500">
                  {(m.amount / 1000000).toFixed(1)}jt
                </span>
                <div
                  className="w-full rounded-t-lg bg-blue-500 transition-all"
                  style={{ height: `${(m.amount / maxIncome) * 170}px` }}
                />
                <span className="text-xs text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
