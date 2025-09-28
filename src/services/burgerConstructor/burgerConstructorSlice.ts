import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface burgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  error: string | null;
}

export const initialState: burgerConstructorState = {
  bun: null,
  ingredients: [],
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    burgerConstructorSelector: (state) => state,
    bunSelector: (state) => state.bun,
    ingredientsSelector: (state) => state.ingredients
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const [item] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, item);
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        const [item] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, item);
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { burgerConstructorSelector, bunSelector, ingredientsSelector } =
  burgerConstructorSlice.selectors;

export const {
  addIngredient,
  moveUpIngredient,
  moveDownIngredient,
  removeIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
