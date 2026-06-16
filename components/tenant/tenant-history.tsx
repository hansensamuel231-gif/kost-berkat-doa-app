"use client"

import { useApp } from "@/context/app-context"
import { formatRupiah } from "@/lib/data"
import { StatusBadge } from "@/components/shared"

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"

export default function TenantHistory() {
  const { currentUser, tenants, payments } = useApp()
  const tenant = tenants.find((t) => t.id === currentUser?.tenantId) ?? tenants[0]
  const myPayments = payments.filter((p) => p.tenantName === tenant.name)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Riwayat Pembayaran</h1>
        <p className="text-sm text-gray-500">Catatan pembayaran kamar Anda</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Periode</th>
                <th className="px-4 py-3">Tgl Bayar</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {myPayments.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">{p.period}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(p.payDate ?? p.uploadDate)}</td>
                  <td className="px-4 py-3 text-gray-600">{formatRupiah(p.amount)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
              {myPayments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                    Belum ada riwayat pembayaran
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
