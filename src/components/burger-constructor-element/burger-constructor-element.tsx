import { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import {
  moveUpIngredient,
  moveDownIngredient,
  removeIngredient
} from '../../services/burgerConstructor/burgerConstructorSlice';

import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = useCallback(() => {
      dispatch(moveUpIngredient(index));
    }, [dispatch, index]);

    const handleMoveDown = useCallback(() => {
      dispatch(moveDownIngredient(index));
    }, [dispatch, index]);

    const handleClose = useCallback(() => {
      dispatch(removeIngredient(ingredient));
    }, [dispatch, ingredient]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
