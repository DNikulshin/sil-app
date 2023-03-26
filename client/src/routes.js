import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ClaimsPage } from './pages/ClaimsPage'
import { AllClaimsPage } from './pages/AllClaimsPage'
import { DetailPage } from './pages/DetailPage'
import { MapPage } from './pages/MapPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/"
                       element={<ClaimsPage/>}
                >
                </Route>
                <Route path="/login"
                       element={<AuthPage/>}
                >
                </Route>
                <Route path="/all"
                       element={<AllClaimsPage/>}
                >
                </Route>
                <Route path="/coordinates/:id"
                       element={<MapPage/>}
                >
                </Route>
                <Route path="/detail/:id"
                       element={<DetailPage/>}
                >
                </Route>
                <Route path="*"
                       element={<Navigate to="/" replace/>}
                >
                </Route>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/"
                   element={<AuthPage to="/"/>}
            >
            </Route>
            <Route path="*"
                   element={<Navigate to="/" replace/>}
            >
            </Route>
        </Routes>
    )

}
