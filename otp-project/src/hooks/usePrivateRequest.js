import { useContext, useEffect } from "react";
import { privateRequest } from "../requests/requestMethods";
import { useNavigate } from "react-router-dom";
import LoginAuthContext from "../context/LoginAuthProvider";
import setCookies from "../utils/setCookies";

const usePrivateRequest = () => {
  const { auth, setAuth } = useContext(LoginAuthContext);
  const navigate = useNavigate();
  const access_token = document?.cookie?.split("=")[1];
  // console.log("OldAccessToken:", access_token);

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
        // console.log(err);
        if (err?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          // 1st senario set access_token cookie to undefined through this request
          // the navigate to login page to obtain a new access token
          setCookies(null, -1000);
          setAuth({});
          navigate("/");
          console.log("logging Out");

          // 2nd senario create new jwt and update the db and cokies with it through this request
          // const res = await axios.post("http://localhost:5000/api/createjwt", {
          //   ...auth,
          // });
          // setAuth({ ...auth, access_token: res.data.access_token });
          // console.log("NewAccessToken: ", res.data.access_token);
          // prevRequest.headers[
          //   "Authorization"
          // ] = `Bearer ${res.data.access_token}`;
          // return privateRequest(prevRequest);
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
