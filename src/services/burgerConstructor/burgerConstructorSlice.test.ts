import reducer, {
  initialState,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructor,
  burgerConstructorState
} from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';

describe('burgerConstructorSlice reducer', () => {
  const bun: TIngredient = {
    _id: '1',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01.png'
  };

  const ingredient1: TIngredient = {
    _id: '2',
    name: 'Соус Spicy X',
    type: 'sauce',
    proteins: 20,
    fat: 30,
    carbohydrates: 40,
    calories: 50,
    price: 200,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02.png'
  };

  const ingredient2: TIngredient = {
    _id: '3',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  };

  it('должен вернуть initialState при неизвестном экшене', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('добавление булки заменяет старую', () => {
    let state = reducer(initialState, addIngredient(bun));
    expect(state.bun).toMatchObject(bun);

    const newBun = { ...bun, _id: 'newBun' };
    state = reducer(state, addIngredient(newBun));
    expect(state.bun?._id).toBe('newBun');
  });

  it('добавление обычного ингредиента кладёт в массив', () => {
    const state = reducer(initialState, addIngredient(ingredient1));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(ingredient1);
  });

  it('удаление ингредиента из конструктора', () => {
    const stateWithIngredients: burgerConstructorState = {
      bun: null,
      ingredients: [
        { ...ingredient1, id: 'id1' },
        { ...ingredient2, id: 'id2' }
      ],
      error: null
    };

    const state = reducer(stateWithIngredients, removeIngredient({ ...ingredient1, id: 'id1' }));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe(ingredient2.name);
  });

  it('перемещение ингредиента вверх', () => {
    const stateWithIngredients: burgerConstructorState = {
      bun: null,
      ingredients: [
        { ...ingredient1, id: 'id1' },
        { ...ingredient2, id: 'id2' }
      ],
      error: null
    };

    const state = reducer(stateWithIngredients, moveUpIngredient(1));
    expect(state.ingredients[0].id).toBe('id2');
    expect(state.ingredients[1].id).toBe('id1');
  });

  it('перемещение ингредиента вниз', () => {
    const stateWithIngredients: burgerConstructorState = {
      bun: null,
      ingredients: [
        { ...ingredient1, id: 'id1' },
        { ...ingredient2, id: 'id2' }
      ],
      error: null
    };

    const state = reducer(stateWithIngredients, moveDownIngredient(0));
    expect(state.ingredients[0].id).toBe('id2');
    expect(state.ingredients[1].id).toBe('id1');
  });

  it('очистка конструктора', () => {
    const stateWithIngredients: burgerConstructorState = {
      bun: { ...bun, id: 'bunId' },
      ingredients: [{ ...ingredient1, id: 'id1' }],
      error: null
    };

    const state = reducer(stateWithIngredients, clearConstructor());
    expect(state).toEqual(initialState);
  });
});
