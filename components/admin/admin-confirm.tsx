"use client"

import { useState } from "react"
import { Check, X, Eye, ImageIcon } from "lucide-react"
import { useApp } from "@/context/app-context"
import { formatRupiah, type Payment } from "@/lib/data"
import { Modal } from "@/components/shared"

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "-"

export default function AdminConfirm() {
  const { payments, setPaymentStatus } = useApp()
  const [detail, setDetail] = useState<Payment | null>(null)

  const pending = payments.filter((p) => p.status === "Pending")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Konfirmasi Bukti Bayar</h1>
        <p className="text-sm text-gray-500">Verifikasi bukti transfer dari penghuni</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Kamar</th>
                <th className="px-5 py-3">Tgl Upload</th>
                <th className="px-5 py-3">Jumlah</th>
                <th className="px-5 py-3">Bukti</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-800">{p.tenantName}</td>
                  <td className="px-5 py-3 text-gray-600">{p.roomNumber}</td>
                  <td className="px-5 py-3 text-gray-600">{formatDate(p.uploadDate)}</td>
                  <td className="px-5 py-3 text-gray-600">{formatRupiah(p.amount)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setDetail(p)}
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition hover:bg-gray-200"
                      aria-label="Lihat bukti"
                    >
                      <ImageIcon className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setDetail(p)}
                        className="rounded-lg bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100"
                        aria-label="Detail"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setPaymentStatus(p.id, "Lunas")}
                        className="flex items-center gap-1 rounded-lg bg-green-500 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-green-600"
                      >
                        <Check className="h-3.5 w-3.5" /> Konfirmasi
                      </button>
                      <button
                        onClick={() => setPaymentStatus(p.id, "Ditolak")}
                        className="flex items-center gap-1 rounded-lg bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-red-600"
                      >
                        <X className="h-3.5 w-3.5" /> Tolak
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-6 text-center text-gray-400">
                    Tidak ada bukti bayar menunggu konfirmasi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title="Detail Bukti Bayar">
        {detail && (
          <div className="space-y-4">
            <div className="flex h-48 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
              <div className="text-center">
                <ImageIcon className="mx-auto h-10 w-10" />
                <p className="mt-2 text-sm">Bukti Transfer</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Nama</span>
                <span className="font-medium text-gray-800">{detail.tenantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kamar</span>
                <span className="font-medium text-gray-800">{detail.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Periode</span>
                <span className="font-medium text-gray-800">{detail.period}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Jumlah</span>
                <span className="font-medium text-gray-800">{formatRupiah(detail.amount)}</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setPaymentStatus(detail.id, "Ditolak")
                  setDetail(null)
                }}
                className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Tolak
              </button>
              <button
                onClick={() => {
                  setPaymentStatus(detail.id, "Lunas")
                  setDetail(null)
                }}
                className="flex-1 rounded-lg bg-green-500 py-2 text-sm font-medium text-white transition hover:bg-green-600"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
