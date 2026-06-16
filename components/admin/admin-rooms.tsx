"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useApp } from "@/context/app-context"
import { formatRupiah, type Room, type RoomType, type RoomStatus } from "@/lib/data"
import { Modal, Field, inputClass } from "@/components/shared"

const emptyForm = {
  number: "",
  type: "Standard" as RoomType,
  price: 500000,
  facilities: "",
  status: "Kosong" as RoomStatus,
}

export default function AdminRooms() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useApp()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Room | null>(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (room: Room) => {
    setEditing(room)
    setForm({ ...room })
    setOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateRoom({ ...editing, ...form })
    } else {
      addRoom(form)
    }
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Kamar</h1>
          <p className="text-sm text-gray-500">Kelola data kamar kost</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" /> Tambah Kamar
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">No Kamar</th>
                <th className="px-5 py-3">Tipe</th>
                <th className="px-5 py-3">Harga/Bulan</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-800">{room.number}</td>
                  <td className="px-5 py-3 text-gray-600">{room.type}</td>
                  <td className="px-5 py-3 text-gray-600">{formatRupiah(room.price)}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        room.status === "Terisi"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(room)}
                        className="rounded-lg bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteRoom(room.id)}
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

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Kamar" : "Tambah Kamar"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="No Kamar">
            <input
              className={inputClass}
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              required
            />
          </Field>
          <Field label="Tipe">
            <select
              className={inputClass}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as RoomType })}
            >
              <option>Standard</option>
              <option>Deluxe</option>
              <option>VIP</option>
            </select>
          </Field>
          <Field label="Harga / Bulan">
            <input
              type="number"
              className={inputClass}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              required
            />
          </Field>
          <Field label="Fasilitas">
            <textarea
              className={inputClass}
              rows={3}
              value={form.facilities}
              onChange={(e) => setForm({ ...form, facilities: e.target.value })}
            />
          </Field>
          <Field label="Status">
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as RoomStatus })}
            >
              <option>Kosong</option>
              <option>Terisi</option>
            </select>
          </Field>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-500 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
