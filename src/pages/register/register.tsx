import { FC, SyntheticEvent, useState, useEffect, ChangeEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearErrors,
  errorSelector,
  registerUserThunk
} from '../../services/user/userSlice';

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
      setUserName={(value) =>
        setFormValue((prev) => ({
          ...prev,
          name: typeof value === 'function' ? value(prev.name) : value
        }))
      }
      setEmail={(value) =>
        setFormValue((prev) => ({
          ...prev,
          email: typeof value === 'function' ? value(prev.email) : value
        }))
      }
      setPassword={(value) =>
        setFormValue((prev) => ({
          ...prev,
          password: typeof value === 'function' ? value(prev.password) : value
        }))
      }
      handleSubmit={handleSubmit}
    />
  );
};
