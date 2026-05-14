// frontend/src/app/router.jsx - React Router configuration

import { createBrowserRouter } from "react-router";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import NewbornListPage from "../pages/newborns/NewbornListPage";
import NewbornDetailPage from "../pages/newborns/NewbornDetailPage";
import CreateNewbornPage from "../pages/newborns/CreateNewbornPage";
import VaccinationListPage from "../pages/vaccinations/VaccinationListPage";
import GrowthTrackingPage from "../pages/growth/GrowthTrackingPage";
import ConsultationRecordPage from "../pages/consultations/ConsultationRecordPage";
import PrescriptionManagePage from "../pages/prescriptions/PrescriptionManagePage";
import BillingPage from "../pages/billing/BillingPage";
import SmartCardPage from "../pages/smartcards/SmartCardPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import AnalyticsDashboardPage from "../pages/analytics/AnalyticsDashboardPage";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/newborns",
    element: (
      <ProtectedRoute>
        <NewbornListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/newborns/create",
    element: (
      <ProtectedRoute>
        <CreateNewbornPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/newborns/:id",
    element: (
      <ProtectedRoute>
        <NewbornDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/vaccinations",
    element: (
      <ProtectedRoute>
        <VaccinationListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/growth/:newbornId",
    element: (
      <ProtectedRoute>
        <GrowthTrackingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/consultations/record/:newbornId",
    element: (
      <ProtectedRoute>
        <ConsultationRecordPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prescriptions/:newbornId",
    element: (
      <ProtectedRoute>
        <PrescriptionManagePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/billing",
    element: (
      <ProtectedRoute>
        <BillingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/smartcards",
    element: (
      <ProtectedRoute>
        <SmartCardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <NotificationsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <AnalyticsDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: (
      <div className="p-8 text-center">
        <h1 className="text-headline-l">Accès refusé</h1>
        <p className="mt-4 text-body">
          <a href="/dashboard" className="text-primary-600">
            Retour au tableau de bord
          </a>
        </p>
      </div>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
