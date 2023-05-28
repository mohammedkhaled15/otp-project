import { useContext } from "react";
import LoginAuthContext from "../context/LoginAuthProvider";

const useLogAuth = () => {
    return useContext(LoginAuthContext);
}

export default useLogAuth;