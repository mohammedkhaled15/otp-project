/* eslint-disable no-unused-vars */
import { publicRequest } from "../requests/requestMethods"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"
import LoginAuthContext from "../context/LoginAuthProvider"
import setCookies from "../utils/setCookies"

const CheckOtp = () => {

  const { handleChange, data } = useContext(AppContext)
  const { setAuth } = useContext(LoginAuthContext);

  const [timer, setTimer] = useState(6)
  const [disabled, setDisabled] = useState(true)


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    if (timer === 0) {
      setDisabled(false)
      clearInterval(interval)
    }
    return () => clearInterval(interval)

  }, [timer])

  const navigate = useNavigate()

  const handleGetOtp = async (e) => {
    e.preventDefault()
    try {
      const res = await publicRequest.post(`/login`, {
        ...data
      })
      if (res.code === 200) {
        const interval = setInterval(() => {
          setTimer(prev => prev - 1)
        }, 1000)
        if (timer === 0) {
          setDisabled(false)
          clearInterval(interval)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFullLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await publicRequest.post(`/check/code`, {
        ...data
      })
      const { access_token, name, telephone } = res.data.data
      // console.log(res)
      const dbUpdate = await axios.post("http://localhost:5000/api/updatedb", { access_token, name, telephone })
      const accessToken = res.data.data.access_token;
      // console.log(accessToken)
      setAuth({ ...res.data.data })
      const tokenMatch = document.cookie.match(/access_token=([^;]+)/);
      if (!tokenMatch) {
        setCookies(accessToken, 24 * 60 * 60 * 1000)
      }
      if (res.status === 200) {
        navigate("/profile")
      }
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
          <button className={`btn btn--form ${disabled ? "disabled" : ""}`} onClick={(e) => handleGetOtp(e)} type="submit" value="Log in">
            Get Another Otp after  <span style={{ visibility: disabled ? "visible" : "hidden" }}> {timer}</span>
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