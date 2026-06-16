"use client"

import { useState } from "react"
import { Download, TrendingUp, Users, AlertCircle } from "lucide-react"
import { useApp } from "@/context/app-context"
import { formatRupiah, MONTHS } from "@/lib/data"
import { StatusBadge } from "@/components/shared"

export default function AdminReports() {
  const { payments } = useApp()
  const [month, setMonth] = useState("Semua")
  const [year, setYear] = useState("2025")

  const filtered = payments.filter((p) => {
    const okMonth = month === "Semua" || p.period.startsWith(month)
    const okYear = p.period.endsWith(year)
    return okMonth && okYear
  })

  const totalPemasukan = filtered
    .filter((p) => p.status === "Lunas")
    .reduce((sum, p) => sum + p.amount, 0)
  const totalBayar = filtered.filter((p) => p.status === "Lunas").length
  const belumBayar = filtered.filter((p) => p.status === "Belum Bayar" || p.status === "Pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Laporan Keuangan</h1>
          <p className="text-sm text-gray-500">Rekapitulasi pemasukan kost</p>
        </div>
        <button
          onClick={() => alert("Mengunduh PDF...")}
          className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600"
        >
          <Download className="h-4 w-4" /> Export PDF
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <label className="text-sm">
          <span className="mb-1 block text-xs font-medium text-gray-500">Bulan</span>
          <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option>Semua</option>
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-xs font-medium text-gray-500">Tahun</span>
          <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm" value={year} onChange={(e) => setYear(e.target.value)}>
            <option>2024</option>
            <option>2025</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm text-gray-500">Total Pemasukan</p>
          <p className="mt-1 text-xl font-bold text-gray-800">{formatRupiah(totalPemasukan)}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
            <Users className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm text-gray-500">Penghuni Bayar</p>
          <p className="mt-1 text-xl font-bold text-gray-800">{totalBayar}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm text-gray-500">Belum Bayar</p>
          <p className="mt-1 text-xl font-bold text-gray-800">{belumBayar}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Kamar</th>
                <th className="px-5 py-3">Periode</th>
                <th className="px-5 py-3">Jumlah</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-800">{p.tenantName}</td>
                  <td className="px-5 py-3 text-gray-600">{p.roomNumber}</td>
                  <td className="px-5 py-3 text-gray-600">{p.period}</td>
                  <td className="px-5 py-3 text-gray-600">{formatRupiah(p.amount)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center text-gray-400">
                    Tidak ada data pada periode ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
