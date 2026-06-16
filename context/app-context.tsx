"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {
  initialRooms,
  initialTenants,
  initialPayments,
  type Room,
  type Tenant,
  type Payment,
  type PaymentStatus,
} from "@/lib/data"

export type Role = "Admin" | "Penghuni"

export interface CurrentUser {
  role: Role
  name: string
  tenantId?: string
}

interface AppContextValue {
  currentUser: CurrentUser | null
  login: (user: CurrentUser) => void
  logout: () => void
  rooms: Room[]
  addRoom: (room: Omit<Room, "id">) => void
  updateRoom: (room: Room) => void
  deleteRoom: (id: string) => void
  tenants: Tenant[]
  addTenant: (tenant: Omit<Tenant, "id">) => void
  updateTenant: (tenant: Tenant) => void
  deleteTenant: (id: string) => void
  payments: Payment[]
  addPayment: (payment: Omit<Payment, "id">) => void
  setPaymentStatus: (id: string, status: PaymentStatus) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants)
  const [payments, setPayments] = useState<Payment[]>(initialPayments)

  const login = (user: CurrentUser) => setCurrentUser(user)
  const logout = () => setCurrentUser(null)

  const addRoom = (room: Omit<Room, "id">) =>
    setRooms((prev) => [...prev, { ...room, id: "r" + Date.now() }])
  const updateRoom = (room: Room) =>
    setRooms((prev) => prev.map((r) => (r.id === room.id ? room : r)))
  const deleteRoom = (id: string) =>
    setRooms((prev) => prev.filter((r) => r.id !== id))

  const addTenant = (tenant: Omit<Tenant, "id">) =>
    setTenants((prev) => [...prev, { ...tenant, id: "t" + Date.now() }])
  const updateTenant = (tenant: Tenant) =>
    setTenants((prev) => prev.map((t) => (t.id === tenant.id ? tenant : t)))
  const deleteTenant = (id: string) =>
    setTenants((prev) => prev.filter((t) => t.id !== id))

  const addPayment = (payment: Omit<Payment, "id">) =>
    setPayments((prev) => [{ ...payment, id: "p" + Date.now() }, ...prev])
  const setPaymentStatus = (id: string, status: PaymentStatus) =>
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status, payDate: status === "Lunas" ? new Date().toISOString().slice(0, 10) : p.payDate }
          : p,
      ),
    )

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        rooms,
        addRoom,
        updateRoom,
        deleteRoom,
        tenants,
        addTenant,
        updateTenant,
        deleteTenant,
        payments,
        addPayment,
        setPaymentStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
