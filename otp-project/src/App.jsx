import Login from "./components/login"
import { Routes, Route } from "react-router-dom"
import { createContext, useState } from "react"
import CheckOtp from "./components/CheckOtp"
import Profile from "./components/Profile"
import ProtectedRoute from "./routes/ProtectedRoute"
import ErrorPage from "./pages/ErrorPage"
import SharedLayout from "./components/SharedLayout"


export const AppContext = createContext()


const App = () => {

  const [data, setData] = useState({})

  const handleChange = (e) => {
    setData(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  return (
    <AppContext.Provider value={{ data, setData, handleChange }}>
      <div className="app">
        <Routes>
          <Route path="/" element={<SharedLayout />}>

            {/* Public Routes */}
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/otp" element={<CheckOtp />} />
              <Route path="/profile" element={<Profile />} >
              </Route>
            </Route>

            {/* Catch All Routes */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App