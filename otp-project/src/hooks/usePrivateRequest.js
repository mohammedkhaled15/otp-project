import { useEffect, useContext } from "react";
import { privateRequest } from "../requests/requestMethods";
import LoginAuthContext from "../context/LoginAuthProvider";

const usePrivateRequest = () => {
  const { auth } = useContext(LoginAuthContext);
  useEffect(() => {
    const requestInterceptor = privateRequest.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    return () => {
      privateRequest.interceptors.request.eject(requestInterceptor);
    };
  }, [auth?.access_token]);

  return privateRequest;
};

export default usePrivateRequest;
