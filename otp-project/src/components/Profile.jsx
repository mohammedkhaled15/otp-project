import { useContext } from "react"
import usePrivateRequest from "../hooks/usePrivateRequest"
import LoginAuthContext from "../context/LoginAuthProvider"

const Profile = () => {

  const { auth } = useContext(LoginAuthContext)
  console.log(auth)
  const privateRequest = usePrivateRequest()

  const getUserData = async () => {
    const res = await privateRequest.post("/user/details")
    console.log(res)
  }
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={getUserData}>Get User Data</button>
    </div>
  )
}

export default Profile