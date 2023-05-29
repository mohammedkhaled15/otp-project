import { useEffect } from "react";
import { privateRequest } from "../requests/requestMethods";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const usePrivateRequest = () => {
  const navigate = useNavigate();
  const access_token = document?.cookie?.split("=")[1];
  console.log(access_token);
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
          await axios.post("http://localhost:5000/api/logout");
          console.log("logging Out");
          navigate("/");
          // prevRequest.headers["token"] = `Bearer ${newAccessToken}`;
          return privateRequest(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      privateRequest.interceptors.request.eject(requestInterceptor);
      privateRequest.interceptors.response.eject(responseInterceptor);
    };
  }, [access_token, navigate]);

  return privateRequest;
};

export default usePrivateRequest;
