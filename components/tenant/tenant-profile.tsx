"use client"

import { useState } from "react"
import { Pencil, CreditCard, IdCard, Phone, Mail, BedDouble } from "lucide-react"
import { useApp } from "@/context/app-context"
import { formatRupiah, type Tenant } from "@/lib/data"
import { Modal, Field, inputClass } from "@/components/shared"

export default function TenantProfile() {
  const { currentUser, tenants, rooms, updateTenant } = useApp()
  const tenant = tenants.find((t) => t.id === currentUser?.tenantId) ?? tenants[0]
  const room = rooms.find((r) => r.number === tenant.roomNumber)

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Tenant>(tenant)

  const initials = tenant.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateTenant(form)
    setOpen(false)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-800">Profil Saya</h1>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800">{tenant.name}</h2>
            <p className="text-sm text-gray-500">Penghuni Kamar {tenant.roomNumber}</p>
          </div>
          <button
            onClick={() => {
              setForm(tenant)
              setOpen(true)
            }}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
            aria-label="Edit profil"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
          <InfoRow icon={IdCard} label="No KTP" value={tenant.ktp} />
          <InfoRow icon={Phone} label="No HP" value={tenant.phone} />
          <InfoRow icon={Mail} label="Email" value={tenant.email || "-"} />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-semibold text-gray-800">Informasi Kamar</h3>
        <div className="space-y-3">
          <InfoRow icon={BedDouble} label="No Kamar" value={tenant.roomNumber} />
          <InfoRow icon={BedDouble} label="Tipe" value={room?.type ?? "-"} />
          <InfoRow icon={CreditCard} label="Harga" value={room ? formatRupiah(room.price) + " / bulan" : "-"} />
          <InfoRow icon={BedDouble} label="Fasilitas" value={room?.facilities ?? "-"} />
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Edit Profil">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nama">
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
          <Field label="No KTP">
            <input className={inputClass} value={form.ktp} onChange={(e) => setForm({ ...form, ktp: e.target.value })} />
          </Field>
          <Field label="No HP">
            <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field label="Email">
            <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
              Batal
            </button>
            <button type="submit" className="flex-1 rounded-lg bg-blue-500 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
      <div className="flex-1">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-700">{value}</p>
      </div>
    </div>
  )
}
