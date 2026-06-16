"use client"

import { useEffect, useState } from "react"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppProvider } from "@/context/app-context"
import LoginPage from "@/components/login-page"
import AdminLayout from "@/components/admin/admin-layout"
import AdminDashboard from "@/components/admin/admin-dashboard"
import AdminRooms from "@/components/admin/admin-rooms"
import AdminTenants from "@/components/admin/admin-tenants"
import AdminPayments from "@/components/admin/admin-payments"
import AdminConfirm from "@/components/admin/admin-confirm"
import AdminReports from "@/components/admin/admin-reports"
import TenantLayout from "@/components/tenant/tenant-layout"
import TenantDashboard from "@/components/tenant/tenant-dashboard"
import TenantUpload from "@/components/tenant/tenant-upload"
import TenantHistory from "@/components/tenant/tenant-history"
import TenantProfile from "@/components/tenant/tenant-profile"

export default function Page() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="kamar" element={<AdminRooms />} />
            <Route path="penghuni" element={<AdminTenants />} />
            <Route path="pembayaran" element={<AdminPayments />} />
            <Route path="konfirmasi" element={<AdminConfirm />} />
            <Route path="laporan" element={<AdminReports />} />
          </Route>

          <Route path="/penghuni" element={<TenantLayout />}>
            <Route index element={<Navigate to="/penghuni/dashboard" replace />} />
            <Route path="dashboard" element={<TenantDashboard />} />
            <Route path="bayar" element={<TenantUpload />} />
            <Route path="riwayat" element={<TenantHistory />} />
            <Route path="profil" element={<TenantProfile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  )
}
