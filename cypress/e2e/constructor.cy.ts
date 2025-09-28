/// <reference types="cypress" />

// Селекторы
const SELECTORS = {
  ingredientBun: '[data-cy="ingredient-bun"]',
  ingredientMain: '[data-cy="ingredient-main"]',
  ingredientSauce: '[data-cy="ingredient-sauce"]',
  constructorText: 'div.constructor-element span.constructor-element__text',
  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  modalOverlay: '[data-cy="modal-overlay"]',
  orderButton: '[data-cy="onOrderClick"]',
  orderNumber: '[data-cy="order-number"]',
  constructorTop: '[data-cy="top"]',
  constructorMid: '[data-cy="mid"]',
  constructorBottom: '[data-cy="bottom"]'
};

// Общая настройка для каждого describe
const setupPage = () => {
  cy.viewport(1280, 1024);

  // Моки API
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getAuth');
  cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );

  // Загрузка страницы
  cy.visit('/');
  cy.wait(['@getIngredients', '@getAuth']);

  cy.get(SELECTORS.ingredientBun).as('bunIngredients');
  cy.get(SELECTORS.ingredientMain).as('mainIngredients');
  cy.get(SELECTORS.ingredientSauce).as('sauceIngredients');
};

describe('Конструктор бургера', () => {
  beforeEach(() => {
    setupPage();
  });

  it('Добавление булок и ингредиентов в заказ', () => {
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get(SELECTORS.constructorText)
      .contains('Краторная булка N-200i (верх)')
      .should('exist');
    cy.get(SELECTORS.constructorText)
      .contains('Краторная булка N-200i (низ)')
      .should('exist');

    cy.get('@mainIngredients').contains('Добавить').click();
    cy.get(SELECTORS.constructorText)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    cy.get('@sauceIngredients').contains('Добавить').click();
    cy.get(SELECTORS.constructorText).contains('Соус Spicy-X').should('exist');

    cy.get('@mainIngredients').contains('Добавить').click();
    cy.get(SELECTORS.constructorText)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    cy.get('@bunIngredients').first().click();
    cy.get(SELECTORS.modal).should('be.visible');

    // Закрытие по крестику
    cy.get(SELECTORS.modalClose).click();
    cy.get(SELECTORS.modal).should('not.exist');

    // Открытие снова и закрытие по оверлею
    cy.get('@bunIngredients').first().click();
    cy.get(SELECTORS.modal).should('be.visible');
    cy.get(SELECTORS.modalOverlay).click({ force: true });
    cy.get(SELECTORS.modal).should('not.exist');
  });

  it('Успешное создание заказа после авторизации', () => {
    // Добавляем ингредиенты
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get('@mainIngredients').contains('Добавить').click();
    cy.get('@sauceIngredients').contains('Добавить').click();
    cy.get('@mainIngredients').contains('Добавить').click();

    // Устанавливаем токены авторизации
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');

    // Кликаем кнопку "Оформить заказ"
    cy.get(SELECTORS.orderButton).click();
    cy.wait('@createOrder');

    // Проверка модального окна заказа
    cy.get(SELECTORS.modal).should('exist');
    cy.get(SELECTORS.orderNumber).should('contain', '83756');
    cy.get(SELECTORS.modalClose).click();

    // Проверка, что конструктор пуст
    cy.get(SELECTORS.constructorTop).contains('Выберите булки');
    cy.get(SELECTORS.constructorMid).contains('Выберите начинку');
    cy.get(SELECTORS.constructorBottom).contains('Выберите булки');
  });
});
