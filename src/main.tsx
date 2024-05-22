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
import Reservations from "@/pages/Admin/reservations.tsx";
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
import MyReservationsPage from "@/pages/my-reservations-page.tsx";
import ReservationDetailsPage from "@/pages/reservation-details-page.tsx";
import RoomAvailabilityPage from "@/pages/room-details-page.tsx";
import EditRoomPage from "@/pages/Admin/edit-room-page.tsx";
import ProtectedRoute from "@/routes/protected-routes.tsx";
import UnauthorizedPage from "@/pages/unauthorized-page.tsx";
import UserReservationsPage from "@/pages/Admin/user-reservations-page.tsx";


const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />
    },


    // Auth routes
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "notifications",
                element: <ProtectedRoute allowedRole="USER">
                    <Notifications />
                </ProtectedRoute>
            },
            {
                path: "profile",
                children: [
                    {
                        path: "",
                        element: <ProtectedRoute allowedRole="USER">
                            <ProfilePage />
                        </ProtectedRoute>
                    },
                    {
                        path: "edit",
                        element: <ProtectedRoute allowedRole="USER">
                            <EditProfilePage />
                        </ProtectedRoute>

                    },
                    {
                        path: "change-password",
                        element: <ProtectedRoute allowedRole="USER">
                            <ChangePasswordPage />
                        </ProtectedRoute>

                    },
                ]

            },
            {
                path: "rooms",
                children: [
                    {
                        path: "",
                        element: <ProtectedRoute allowedRole="USER">
                            <RoomsPage />,
                        </ProtectedRoute>
                    },
                    {
                        path: "room/:roomId/details",
                        element: <ProtectedRoute allowedRole="USER">
                            <RoomAvailabilityPage />
                        </ProtectedRoute>
                    },
                ]
            },

            {
                path: "my-reservations",
                children:[
                    {
                        path: "",
                        element:  <ProtectedRoute allowedRole="USER">
                            <MyReservationsPage />
                        </ProtectedRoute>
                    },
                    {
                        path: "reservation/:reservationId",
                        element: <ProtectedRoute allowedRole="USER">
                            <ReservationDetailsPage />
                        </ProtectedRoute>
                    },
                ]
            },

        ]
    },
    {
        path: "/auth",
        children: [
            {
                path: "login",
                element: <LoginPage />,
                errorElement: <NotFoundPage />

            },
            {
                path: "register",
                element: <RegisterPage />,
                errorElement: <NotFoundPage />
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage />,
                errorElement: <NotFoundPage />
            },
            {
                path: "reset-password",
                element: <ResetPasswordPage />,
                errorElement: <NotFoundPage />
            },

            {
                path: "email-sent",
                element: <EmailSentPage />,
                errorElement: <NotFoundPage />
            },
        ]
    },




    // Admin routes
    {
        path: "/admin",
        element: <DefaultLayout />,
        children: [
            {
                path: "users",
                children: [
                    {
                        path: "",
                        element: <ProtectedRoute allowedRole="ADMIN">
                            <Users />
                        </ProtectedRoute>
                    },
                    {
                        path: "user/:userId/reservations",
                        element: <ProtectedRoute allowedRole="ADMIN">
                            <UserReservationsPage />
                        </ProtectedRoute>
                    }
                ]
            },
            {
                path: "dashboard",
                element: <ProtectedRoute allowedRole="ADMIN">
                    <Dashboard />
                </ProtectedRoute>
            },
            {
                path: "rooms",
                children: [
                    {
                        path: "create-new-room",
                        element: <ProtectedRoute allowedRole="ADMIN">
                            <CreateNewRoomPage />
                        </ProtectedRoute>

                    },
                    {
                        path: "room/edit/:roomId",
                        element: <ProtectedRoute allowedRole="ADMIN">
                            <EditRoomPage />
                        </ProtectedRoute>
                    }
                ]
            },
            {
                path: "reservations",
                children: [
                    {
                        path: "",
                        element: <ProtectedRoute allowedRole="ADMIN">
                            <Reservations />
                        </ProtectedRoute>
                    },
                    {
                        path: "reservation/:reservationId",
                        element: <ProtectedRoute allowedRole="ADMIN">
                            <ReservationDetailsPage />
                        </ProtectedRoute>
                    },

                ]
            },

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
  </React.StrictMode>
)
