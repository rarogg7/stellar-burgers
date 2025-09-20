import { FC, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import {
  burgerConstructorSelector,
  clearConstructor
} from '../../services/burgerConstructor/burgerConstructorSlice';

import {
  clearOrder,
  errorSelector,
  isOrderLoadingSelector,
  orderBurgerThunk,
  orderSelector
} from '../../services/order/orderSlice';

import { useDispatch, useSelector } from '../../services/store';
import { isUserAuthenticatedSelector } from '../../services/user/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(burgerConstructorSelector);
  const orderRequest = useSelector(isOrderLoadingSelector);
  const error = useSelector(errorSelector);
  const orderModalData = useSelector(orderSelector);
  const isAuthenticated = useSelector(isUserAuthenticatedSelector);

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, ingredient: TConstructorIngredient) => sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  const onOrderClick = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const orderData: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurgerThunk(orderData));
  }, [constructorItems, isAuthenticated, orderRequest, dispatch, navigate]);

  const closeOrderModal = useCallback(() => {
    dispatch(clearOrder());
    navigate('/', { replace: true });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!error && !orderRequest) {
      dispatch(clearConstructor());
    }
  }, [dispatch, error, orderRequest]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
