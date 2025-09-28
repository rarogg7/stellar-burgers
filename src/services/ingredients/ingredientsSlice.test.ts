import reducer, {
  IngredientsState,
  getIngredientsThunk
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем getIngredientsThunk', () => {
    const initialState: IngredientsState = {
      ingredients: [],
      isIngredientsLoading: false,
      error: null
    };

    test('Тестируем отправку запроса (pending)', () => {
      const newState = reducer(
        initialState,
        getIngredientsThunk.pending('pending')
      );

      expect(newState.isIngredientsLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });

    test('Тестируем ошибку при запросе (rejected)', () => {
      const error: Error = {
        name: 'rejected',
        message: 'Ошибка при получении ингредиентов'
      };

      const newState = reducer(
        initialState,
        getIngredientsThunk.rejected(error, 'rejected')
      );

      expect(newState.isIngredientsLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });

    test('Тестируем успешный запрос (fulfilled)', () => {
      const mockIngredients: TIngredient[] = [
        {
          _id: '1',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 200,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '2',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 20,
          fat: 15,
          carbohydrates: 10,
          calories: 200,
          price: 150,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '3',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 0,
          fat: 10,
          carbohydrates: 5,
          calories: 50,
          price: 50,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ];

      const newState = reducer(
        initialState,
        getIngredientsThunk.fulfilled(mockIngredients, 'fulfilled')
      );

      expect(newState.isIngredientsLoading).toBeFalsy();
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toEqual(mockIngredients);
    });
  });
});
