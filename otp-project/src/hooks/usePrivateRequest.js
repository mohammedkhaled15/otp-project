import { useContext, useEffect } from "react";
import { privateRequest } from "../requests/requestMethods";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginAuthContext from "../context/LoginAuthProvider";

const usePrivateRequest = () => {
  const { auth, setAuth } = useContext(LoginAuthContext);
  const navigate = useNavigate();
  const access_token = document?.cookie?.split("=")[1];
  console.log("OldAccessToken:", access_token);

  useEffect(() => {
    const requestInterceptor = privateRequest.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${"access_token"}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = privateRequest.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        console.log(err);
        if (err?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          // 1st senario set access_token cookie to undefined through this request
          // the navigate to login page to obtain a new access token
          // await axios.post("http://localhost:5000/api/logout");
          // const now = new Date();
          // now.setTime(now.getTime() + 24 * 60 * 60 * 1000); // Expiration time , should be weeks i will edit later
          // document.cookie = `access_token=; expires=${now.toUTCString()}; httpOnly: true`;

          // console.log("logging Out");
          // navigate("/");

          // 2nd senario create new jwt and update the db and cokies with it through this request
          const res = await axios.post("http://localhost:5000/api/createjwt", {
            ...auth,
          });
          setAuth({ ...auth, access_token: res.data.access_token });
          console.log("NewAccessToken: ", res.data.access_token);
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.access_token}`;
          return privateRequest(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      privateRequest.interceptors.request.eject(requestInterceptor);
      privateRequest.interceptors.response.eject(responseInterceptor);
    };
  }, [access_token, auth, navigate, setAuth]);

  return privateRequest;
};

export default usePrivateRequest;
