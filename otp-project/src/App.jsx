import Login from "./components/login"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { createContext, useState } from "react"
import CheckOtp from "./components/CheckOtp"
import Profile from "./components/Profile"
import SharedLayout from "./components/SharedLayout"

export const AppContext = createContext()
const baseUrl = "https://apis.refon-loyalty.com"


const App = () => {

  const [data, setData] = useState({})
  const [currentUser, setCurrentUser] = useState("")

  const location = useLocation()

  const handleChange = (e) => {
    setData(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  return (
    <AppContext.Provider value={{ data, setData, handleChange, baseUrl, setCurrentUser, currentUser }}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={currentUser.name ? <SharedLayout /> : <Navigate to={"/login"} state={{ from: location }} replace={true} />}
          >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<CheckOtp />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App