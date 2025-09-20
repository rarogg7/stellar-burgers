import { FC, SyntheticEvent, useState, useEffect, ChangeEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { clearErrors, errorSelector, isUserAuthenticatedSelector, loginUserThunk } from '../../services/user/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isUserAuthenticatedSelector);
  const error = useSelector(errorSelector);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
