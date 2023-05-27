import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"


const Login = () => {

  const { handleChange, data, baseUrl } = useContext(AppContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      const res = await axios.post(`${baseUrl}/api/login`, {
        ...data
      })
      if (res.status === 200) {
        navigate("/otp")
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h2 className="login-title">Log in Page</h2>
      <form className="login-form">
        <div>
          <label htmlFor="name">Telephone </label>
          <input
            id="tele"
            type="text"
            placeholder="Write Your Phone Number"
            name="telephone"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="actions">
          <button className="btn btn--form" type="submit" onClick={(e) => handleLogin(e)} value="Log in">
            Log in
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login

