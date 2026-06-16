"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useApp } from "@/context/app-context"
import type { Tenant, Duration } from "@/lib/data"
import { Modal, Field, inputClass } from "@/components/shared"

const emptyForm = {
  name: "",
  ktp: "",
  phone: "",
  email: "",
  roomNumber: "",
  startDate: "",
  duration: "1 bulan" as Duration,
}

const formatDate = (d: string) =>
  d ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "-"

export default function AdminTenants() {
  const { tenants, rooms, addTenant, updateTenant, deleteTenant } = useApp()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Tenant | null>(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => {
    setEditing(null)
    setForm({ ...emptyForm, roomNumber: rooms[0]?.number ?? "" })
    setOpen(true)
  }

  const openEdit = (tenant: Tenant) => {
    setEditing(tenant)
    setForm({ ...tenant })
    setOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) updateTenant({ ...editing, ...form })
    else addTenant(form)
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Penghuni</h1>
          <p className="text-sm text-gray-500">Kelola data penyewa kamar</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" /> Tambah Penghuni
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">No KTP</th>
                <th className="px-5 py-3">No HP</th>
                <th className="px-5 py-3">Kamar</th>
                <th className="px-5 py-3">Tgl Masuk</th>
                <th className="px-5 py-3">Durasi</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-800">{t.name}</td>
                  <td className="px-5 py-3 text-gray-600">{t.ktp}</td>
                  <td className="px-5 py-3 text-gray-600">{t.phone}</td>
                  <td className="px-5 py-3 text-gray-600">{t.roomNumber}</td>
                  <td className="px-5 py-3 text-gray-600">{formatDate(t.startDate)}</td>
                  <td className="px-5 py-3 text-gray-600">{t.duration}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="rounded-lg bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTenant(t.id)}
                        className="rounded-lg bg-red-50 p-1.5 text-red-500 transition hover:bg-red-100"
                        aria-label="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Penghuni" : "Tambah Penghuni"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nama">
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
          <Field label="No KTP">
            <input className={inputClass} value={form.ktp} onChange={(e) => setForm({ ...form, ktp: e.target.value })} required />
          </Field>
          <Field label="No HP">
            <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </Field>
          <Field label="Email">
            <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field label="Pilih Kamar">
            <select className={inputClass} value={form.roomNumber} onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}>
              {rooms.map((r) => (
                <option key={r.id} value={r.number}>
                  {r.number} - {r.type}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tanggal Masuk">
            <input type="date" className={inputClass} value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
          </Field>
          <Field label="Durasi Sewa">
            <select className={inputClass} value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value as Duration })}>
              <option>1 bulan</option>
              <option>3 bulan</option>
              <option>6 bulan</option>
              <option>1 tahun</option>
            </select>
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
