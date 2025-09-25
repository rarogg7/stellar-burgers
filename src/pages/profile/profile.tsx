import { FC, useEffect, useState, SyntheticEvent, ChangeEvent } from 'react';
import { ProfileUI } from '@ui-pages';

import {
  clearErrors,
  errorSelector,
  updateUserThunk,
  userSelector
} from '../../services/user/userSlice';
import { useDispatch, useSelector } from '../../services/store';

interface IFormValue {
  name: string;
  email: string;
  password: string;
}

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const error = useSelector(errorSelector);

  const [formValue, setFormValue] = useState<IFormValue>({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prev) => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserThunk(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    dispatch(clearErrors());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error || ''}
    />
  );
};
