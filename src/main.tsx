import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginPage from "@/pages/login-page.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";
import RegisterPage from "@/pages/register-page.tsx";
import {ThemeProvider} from "@/components/Theme/theme-provider.tsx";
import NotFoundPage from "@/pages/not-found-page.tsx";
import HomePage from "@/pages/home-page.tsx";
import ForgotPasswordPage from "@/pages/forgot-password-page.tsx";
import ResetPasswordPage from "@/pages/reset-password-page.tsx";
import RoomsPage from "@/pages/rooms-page.tsx";
import {Users} from "@/pages/Admin/users.tsx";
import AdminLayout from "@/layouts/admin-layout.tsx";
import Dashboard from "@/pages/Admin/dashboard.tsx";
import Rooms from "@/pages/Admin/rooms.tsx";
import Reservations from "@/pages/Admin/reservations.tsx";
import Analytics from "@/pages/Admin/analytics.tsx";
import Notifications from "@/pages/notifications.tsx";
import CreateNewRoomPage from "@/pages/Admin/create-new-room-page.tsx";
import {Provider} from "react-redux";
import {store} from "@/state/store.ts";
import {QueryClient, QueryClientProvider} from "react-query";


const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/auth",
        element: <LoginPage />,

    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/404",
        element: <NotFoundPage />
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />
    },
    {
        path: "/rooms",
        element: <RoomsPage />
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "users",
                element: <Users />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "rooms",
                element: <Rooms />
            },
            {
                path: "reservations",
                element: <Reservations />
            },
            {
                path: "analytics",
                element: <Analytics />
            },
            {
                path: "notifications",
                element: <Notifications />
            },
            {
                path: "rooms/create-new-room",
                element: <CreateNewRoomPage />

            }
        ]
    }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                  <RouterProvider router={router} />
                  <Toaster />
              </ThemeProvider>
          </QueryClientProvider>
      </Provider>
  </React.StrictMode>,
)
