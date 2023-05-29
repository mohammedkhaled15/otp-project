import Login from "./components/login"
import { Routes, Route } from "react-router-dom"
import { createContext, useState } from "react"
import CheckOtp from "./components/CheckOtp"
import Profile from "./components/Profile"
import ProtectedRoute from "./routes/ProtectedRoute"
import ErrorPage from "./pages/ErrorPage"
import SharedLayout from "./components/SharedLayout"

export const AppContext = createContext()
const baseUrl = "https://apis.refon-loyalty.com"


const App = () => {

  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];

  // console.log(accessToken)

  const [data, setData] = useState({})
  const [currentUser, setCurrentUser] = useState("")

  const handleChange = (e) => {
    setData(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  return (
    <AppContext.Provider value={{ data, setData, handleChange, baseUrl, setCurrentUser, currentUser }}>
      <div className="app">
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {!accessToken && <Route path="/" element={<Login />} />}

            <Route element={<ProtectedRoute />}>
              {accessToken && <Route path="/" element={<Login />} />}
              <Route path="/otp" element={<CheckOtp />} />
              <Route path="/profile" element={<Profile />} >
              </Route>
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App