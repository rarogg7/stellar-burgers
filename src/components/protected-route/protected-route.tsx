import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';

import {
  isUserAuthenticatedSelector,
  isLoginUserRequestSelector
} from '../../services/user/userSlice';

import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isUserAuthenticatedSelector);
  const loginUserRequest = useSelector(isLoginUserRequestSelector);
  const location = useLocation();

  if (!isAuthChecked && loginUserRequest) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
