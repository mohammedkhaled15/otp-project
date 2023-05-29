import { useState } from "react"
import usePrivateRequest from "../hooks/usePrivateRequest"
// import LoginAuthContext from "../context/LoginAuthProvider"

const Profile = () => {

  const [dummyData, setDummyData] = useState("")

  const privateRequest = usePrivateRequest()

  const getUserData = async () => {
    try {
      const res = await privateRequest.post("/user/details")
      setDummyData(res?.data?.data)
    } catch (error) {
      // console.log(error)
    }
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