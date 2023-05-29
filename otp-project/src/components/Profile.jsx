import { useContext, useState } from "react"
import usePrivateRequest from "../hooks/usePrivateRequest"
// import LoginAuthContext from "../context/LoginAuthProvider"

const Profile = () => {

  const [dummyData, setDummyData] = useState("")

  // const { auth } = useContext(LoginAuthContext)
  // console.log(auth)
  const privateRequest = usePrivateRequest()

  const getUserData = async () => {
    const res = await privateRequest.post("/user/details")
    setDummyData(res?.data?.data)
    // console.log(res.data?.data)
  }
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={getUserData}>Get User Data</button>
      {dummyData && <h5>{JSON.stringify(dummyData)}</h5>}
    </div>
  )
}

export default Profile