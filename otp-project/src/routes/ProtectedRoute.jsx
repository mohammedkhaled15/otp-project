import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import LoginAuthContext from '../context/LoginAuthProvider';
import useLoginAuth from '../hooks/useLoginAuth';

const ProtectedRoute = () => {
  const { auth } = useLoginAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];

  useEffect(() => {
    if (accessToken && location.pathname === '/') {
      navigate('/profile', { replace: true });
    }
  }, [accessToken]);

  if (
    location.pathname === '/otp' ||
    location.pathname === '/profile' ||
    location.pathname.startsWith('/profile/')
  ) {
    if (location.pathname === '/otp' && auth?.phoneNumber) {
      return <Outlet />;
    } else if (location.pathname === '/profile' && accessToken) {
      return <Outlet />;
    } else if (location.pathname.startsWith('/profile/') && accessToken) {
      return <Outlet />;
    } else {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return null;
};

export default ProtectedRoute;
