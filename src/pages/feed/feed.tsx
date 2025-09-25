import { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { getFeedsThunk, ordersSelector } from '../../services/feed/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelector);

  const fetchFeeds = useCallback(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={fetchFeeds} />;
};
