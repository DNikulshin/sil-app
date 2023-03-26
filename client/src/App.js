import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
// import Header from './components/Header'
import { Loader } from './components/Loader'
import { ToastContainer } from 'react-toastify'

export default function App() {
    const { token, login, logout, userId, ready } = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
        <Router>
          <div className="container h-100 position-relative">
              <small className="version-app">v2</small>
              {/*{isAuthenticated && <Header/>}*/}
                  {routes}
				   <ToastContainer position='top-center'/>
          </div>
        </Router>
        </AuthContext.Provider>
  )
}
