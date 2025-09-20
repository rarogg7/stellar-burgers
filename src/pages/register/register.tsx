import { FC, SyntheticEvent, useState, useEffect, ChangeEvent } from 'react';
import { RegisterUI } from '@ui-pages';

import { useSelector, useDispatch } from '../../services/store';
import { clearErrors, errorSelector, registerUserThunk } from '../../services/user/userSlice';

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export const Register: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);

  const [formValue, setFormValue] = useState<IRegisterForm>({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk(formValue));
  };

  return (
    <RegisterUI
      errorText={error || ''}
      userName={formValue.name}
      email={formValue.email}
      password={formValue.password}
      setUserName={(value: string) => setFormValue((prev) => ({ ...prev, name: value }))}
      setEmail={(value: string) => setFormValue((prev) => ({ ...prev, email: value }))}
      setPassword={(value: string) => setFormValue((prev) => ({ ...prev, password: value }))}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
