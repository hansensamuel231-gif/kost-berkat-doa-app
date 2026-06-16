"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ImageIcon, Send } from "lucide-react"
import { useApp } from "@/context/app-context"
import { MONTHS } from "@/lib/data"
import { Field, inputClass } from "@/components/shared"

export default function TenantUpload() {
  const { currentUser, tenants, addPayment } = useApp()
  const navigate = useNavigate()
  const tenant = tenants.find((t) => t.id === currentUser?.tenantId) ?? tenants[0]

  const [month, setMonth] = useState(MONTHS[0])
  const [year, setYear] = useState("2025")
  const [transferDate, setTransferDate] = useState("")
  const [amount, setAmount] = useState("")
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addPayment({
      tenantName: tenant.name,
      roomNumber: tenant.roomNumber,
      payDate: null,
      uploadDate: new Date().toISOString().slice(0, 10),
      period: `${month} ${year}`,
      amount: Number(amount),
      status: "Pending",
      proof: preview,
    })
    alert("Bukti bayar berhasil dikirim! Status menunggu konfirmasi admin.")
    navigate("/penghuni/riwayat")
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Upload Bukti Bayar</h1>
        <p className="text-sm text-gray-500">Kirim bukti transfer pembayaran Anda</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bulan">
            <select className={inputClass} value={month} onChange={(e) => setMonth(e.target.value)}>
              {MONTHS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </Field>
          <Field label="Tahun">
            <select className={inputClass} value={year} onChange={(e) => setYear(e.target.value)}>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </Field>
        </div>

        <Field label="Tanggal Transfer">
          <input type="date" className={inputClass} value={transferDate} onChange={(e) => setTransferDate(e.target.value)} required />
        </Field>

        <Field label="Jumlah yang Dibayar">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">Rp</span>
            <input
              type="number"
              className={`${inputClass} pl-9`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500000"
              required
            />
          </div>
          {amount && (
            <p className="mt-1 text-xs text-gray-500">
              Rp {Number(amount).toLocaleString("id-ID")}
            </p>
          )}
        </Field>

        <Field label="Upload Bukti Transfer">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
            {preview ? (
              <img src={preview || "/placeholder.svg"} alt="Preview bukti transfer" className="max-h-40 rounded-lg object-contain" />
            ) : (
              <>
                <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">Klik untuk pilih gambar</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/penghuni/dashboard")}
            className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            <Send className="h-4 w-4" /> Kirim Bukti Bayar
          </button>
        </div>
      </form>
    </div>
  )
}
