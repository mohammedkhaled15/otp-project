/* eslint-disable no-unused-vars */
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"

const CheckOtp = () => {

  const { handleChange, data, currentUser, baseUrl, setCurrentUser } = useContext(AppContext)

  const navigate = useNavigate()

  const handleGetOtp = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${baseUrl}/api/login`, {
        telephone: data.telephone
      })
    } catch (error) {
      console.log(error)
    }
  }


  const handleFullLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${baseUrl}/api/check/code`, {
        ...data
      })
      console.log(res)
      if (res.status === 200) {
        setCurrentUser({ ...res.data.data })
        navigate("/profile")
      }
      console.log(currentUser)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h2 className="login-title">OTP Page</h2>
      <form className="login-form">
        <div>
          <label htmlFor="code">Code </label>
          <input
            id="code"
            type="text"
            placeholder="Type Your Code"
            name="code"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="actions">
          <button className="btn btn--form" onClick={(e) => handleGetOtp(e)} type="submit" value="Log in">
            Get Another Otp
          </button>
          <button className="btn btn--form" onClick={(e) => handleFullLogin(e)} type="submit">
            Proceed
          </button>
        </div>
      </form>
    </div>
  )
}

export default CheckOtp