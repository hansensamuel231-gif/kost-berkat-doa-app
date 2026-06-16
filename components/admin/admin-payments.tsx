"use client"

import { useState } from "react"
import { Eye, Filter } from "lucide-react"
import { useApp } from "@/context/app-context"
import { formatRupiah, MONTHS } from "@/lib/data"
import { StatusBadge } from "@/components/shared"

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"

export default function AdminPayments() {
  const { payments } = useApp()
  const [month, setMonth] = useState("Semua")
  const [year, setYear] = useState("Semua")
  const [applied, setApplied] = useState({ month: "Semua", year: "Semua" })

  const filtered = payments.filter((p) => {
    const okMonth = applied.month === "Semua" || p.period.startsWith(applied.month)
    const okYear = applied.year === "Semua" || p.period.endsWith(applied.year)
    return okMonth && okYear
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pembayaran</h1>
        <p className="text-sm text-gray-500">Riwayat seluruh pembayaran kost</p>
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
            <option>Semua</option>
            <option>2024</option>
            <option>2025</option>
          </select>
        </label>
        <button
          onClick={() => setApplied({ month, year })}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          <Filter className="h-4 w-4" /> Tampilkan
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Kamar</th>
                <th className="px-5 py-3">Tgl Bayar</th>
                <th className="px-5 py-3">Periode</th>
                <th className="px-5 py-3">Jumlah</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-800">{p.tenantName}</td>
                  <td className="px-5 py-3 text-gray-600">{p.roomNumber}</td>
                  <td className="px-5 py-3 text-gray-600">{formatDate(p.payDate)}</td>
                  <td className="px-5 py-3 text-gray-600">{p.period}</td>
                  <td className="px-5 py-3 text-gray-600">{formatRupiah(p.amount)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => alert(`Detail pembayaran ${p.tenantName} - ${p.period}`)}
                        className="rounded-lg bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100"
                        aria-label="Lihat"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-6 text-center text-gray-400">
                    Tidak ada data pembayaran
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
