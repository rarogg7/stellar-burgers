import { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import {
  getOrdersThunk,
  userOrdersSelector
} from '../../services/user/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(userOrdersSelector);

  const fetchOrders = useCallback(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return <ProfileOrdersUI orders={orders} />;
};
