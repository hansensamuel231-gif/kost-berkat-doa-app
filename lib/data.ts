export type RoomStatus = "Terisi" | "Kosong"
export type RoomType = "Standard" | "Deluxe" | "VIP"

export interface Room {
  id: string
  number: string
  type: RoomType
  price: number
  facilities: string
  status: RoomStatus
}

export type Duration = "1 bulan" | "3 bulan" | "6 bulan" | "1 tahun"

export interface Tenant {
  id: string
  name: string
  ktp: string
  phone: string
  email: string
  roomNumber: string
  startDate: string // yyyy-mm-dd
  duration: Duration
}

export type PaymentStatus = "Lunas" | "Pending" | "Belum Bayar" | "Ditolak"

export interface Payment {
  id: string
  tenantName: string
  roomNumber: string
  payDate: string | null
  uploadDate: string | null
  period: string // e.g. "Januari 2024"
  amount: number
  status: PaymentStatus
  proof?: string | null
}

export const formatRupiah = (value: number): string =>
  "Rp " + value.toLocaleString("id-ID")

export const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

export const initialRooms: Room[] = [
  { id: "r1", number: "A1", type: "Standard", price: 500000, facilities: "Kasur, Lemari, Kipas Angin", status: "Terisi" },
  { id: "r2", number: "A2", type: "Standard", price: 500000, facilities: "Kasur, Lemari, Kipas Angin", status: "Kosong" },
  { id: "r3", number: "B1", type: "Deluxe", price: 750000, facilities: "Kasur, Lemari, AC, Meja Belajar", status: "Terisi" },
  { id: "r4", number: "B2", type: "Deluxe", price: 750000, facilities: "Kasur, Lemari, AC, Meja Belajar", status: "Terisi" },
  { id: "r5", number: "C1", type: "VIP", price: 1000000, facilities: "Kasur, Lemari, AC, Kamar Mandi Dalam, TV", status: "Terisi" },
]

export const initialTenants: Tenant[] = [
  { id: "t1", name: "Budi Santoso", ktp: "3201010101990001", phone: "081234567890", email: "budi@email.com", roomNumber: "A1", startDate: "2024-01-01", duration: "1 tahun" },
  { id: "t2", name: "Sari Dewi", ktp: "3201020202980002", phone: "081298765432", email: "sari@email.com", roomNumber: "B1", startDate: "2024-03-15", duration: "6 bulan" },
  { id: "t3", name: "Ahmad Fauzi", ktp: "3201030303970003", phone: "081377889900", email: "ahmad@email.com", roomNumber: "B2", startDate: "2024-06-01", duration: "1 tahun" },
]

export const initialPayments: Payment[] = [
  { id: "p1", tenantName: "Budi Santoso", roomNumber: "A1", payDate: "2024-12-03", uploadDate: "2024-12-03", period: "Desember 2024", amount: 500000, status: "Lunas" },
  { id: "p2", tenantName: "Sari Dewi", roomNumber: "B1", payDate: "2024-12-02", uploadDate: "2024-12-02", period: "Desember 2024", amount: 750000, status: "Lunas" },
  { id: "p3", tenantName: "Ahmad Fauzi", roomNumber: "B2", payDate: null, uploadDate: "2024-12-10", period: "Desember 2024", amount: 750000, status: "Pending" },
  { id: "p4", tenantName: "Budi Santoso", roomNumber: "A1", payDate: null, uploadDate: "2025-01-09", period: "Januari 2025", amount: 500000, status: "Pending" },
  { id: "p5", tenantName: "Sari Dewi", roomNumber: "B1", payDate: null, uploadDate: null, period: "Januari 2025", amount: 750000, status: "Belum Bayar" },
  { id: "p6", tenantName: "Ahmad Fauzi", roomNumber: "B2", payDate: null, uploadDate: null, period: "Januari 2025", amount: 750000, status: "Belum Bayar" },
]

export const monthlyIncome = [
  { month: "Jul", amount: 5500000 },
  { month: "Agu", amount: 6000000 },
  { month: "Sep", amount: 6250000 },
  { month: "Okt", amount: 6750000 },
  { month: "Nov", amount: 7000000 },
  { month: "Des", amount: 7000000 },
]

// due date for the currently logged-in tenant: 5 days from now (triggers warning)
export const getDueDateInfo = () => {
  const due = new Date()
  due.setDate(due.getDate() + 5)
  const today = new Date()
  const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return {
    date: due.toISOString().slice(0, 10),
    daysLeft: diff,
  }
}
