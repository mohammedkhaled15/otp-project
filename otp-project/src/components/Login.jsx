import { useContext } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"
import LoginAuthContext from "../context/LoginAuthProvider"
import { publicRequest } from "../requests/requestMethods"


const Login = () => {
  const navigate = useNavigate();

  const { handleChange, data } = useContext(AppContext)

  const { setAuth } = useContext(LoginAuthContext);

  const handleValidate = async (e) => {
    e.preventDefault();

    // Validate the phone number using regex for KSA format
    const isValidNumber = /^05[0-9]{8}$/.test(data.telephone);

    if (isValidNumber) {
      try {
        const response = await publicRequest.post(`/login`, { telephone: data.telephone })
        console.log('API Response:', response);
        setAuth({ phoneNumber: data.telephone });
        navigate('/otp', { state: { telephone: data.telephone } });

      } catch (error) {
        // Handle API errors
        console.log('API Error:', error);
      }
    } else {
      // Handle validation error for incorrect phone number format
      console.log('Invalid phone number format');
    }
  };

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
          <button className="btn btn--form" type="submit" onClick={(e) => handleValidate(e)} value="Log in">
            Log in
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login

