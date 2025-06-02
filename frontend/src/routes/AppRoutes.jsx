import { Routes, Route } from 'react-router-dom'
import SidebarLayout from '../components/Layout/SidebarLayout'
import ProtectedRoute from './ProtectedRoute';

import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/auth/LoginPage'
import SignupPage from '../pages/auth/SignupPage'

import DashboardPage from '../pages/app/DashboardPage'
import EntryPage from '../pages/app/EntryPage'
import HistoryPage from '../pages/app/HistoryPage'
import ProfilePage from '../pages/app/ProfilePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={
        <ProtectedRoute redirectIfAuth={true}>
          <LoginPage />
        </ProtectedRoute>
      } />
      <Route path="/signup" element={
        <ProtectedRoute redirectIfAuth={true}>
          <SignupPage />
        </ProtectedRoute>
      } />

      <Route element={
        <ProtectedRoute>
          <SidebarLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="entry" element={<EntryPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}
