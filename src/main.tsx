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
import DefaultLayout from "@/layouts/default-layout.tsx";
import Dashboard from "@/pages/Admin/dashboard.tsx";
import Rooms from "@/pages/Admin/rooms.tsx";
import Reservations from "@/pages/Admin/reservations.tsx";
import Analytics from "@/pages/Admin/analytics.tsx";
import Notifications from "@/pages/notifications-page.tsx";
import CreateNewRoomPage from "@/pages/Admin/create-new-room-page.tsx";
import {Provider} from "react-redux";
import {persistor, store} from "@/state/store.ts";
import {QueryClient, QueryClientProvider} from "react-query";
import { PersistGate } from 'redux-persist/integration/react';
import {Loader} from "@/components/custom/loader.tsx";
import EmailSentPage from "@/pages/email-sent-page.tsx";
import ChangePasswordPage from "@/pages/change-password-page.tsx";
import ProfilePage from "@/pages/profile-page.tsx";
import EditProfilePage from "@/pages/edit-profile-page.tsx";


const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/auth",
        element: <LoginPage />,
        errorElement: <NotFoundPage />

    },
    {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/rooms",
        element: <RoomsPage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/email-sent",
        element: <EmailSentPage />,
        errorElement: <NotFoundPage />
    },

    {
        path: "/user",
        element: <DefaultLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "change-password",
                element: <ChangePasswordPage />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "profile/edit",
                element: <EditProfilePage />
            },
            {
                path: "notifications",
                element: <Notifications />
            },
        ]
    },
    {
        path: "/admin",
        element: <DefaultLayout />,
        children: [
            {
                path: "profile",
                element: <ProfilePage />
            },
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
          <PersistGate loading={<Loader />} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                      <RouterProvider router={router} />
                      <Toaster />
                  </ThemeProvider>
              </QueryClientProvider>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
)
