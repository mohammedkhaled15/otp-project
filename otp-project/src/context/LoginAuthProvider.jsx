import { createContext, useState } from "react";

const LoginAuthContext = createContext({})


export const LoginAuthProvider = ({children}) =>{
    const [auth, setAuth] = useState({})

    return (
        <LoginAuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </LoginAuthContext.Provider>
    )
}

export default LoginAuthContext