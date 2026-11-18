import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { setAuth } from '@/store/features/authSlice';
import Navigation from './Navigation';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const renderWithStore = (
  component: React.ReactElement,
  store = makeStore(),
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Navigation component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Меню изначально закрыто, открывается и закрывается по клику на бургер', () => {
    const { container } = renderWithStore(<Navigation />);

    expect(screen.queryByText('Главное')).not.toBeInTheDocument();

    const burger = container.querySelector('.nav__burger');
    fireEvent.click(burger!);

    expect(screen.getByText('Главное')).toBeInTheDocument();
    expect(screen.getByText('Мой плейлист')).toBeInTheDocument();

    fireEvent.click(burger!);
    expect(screen.queryByText('Главное')).not.toBeInTheDocument();
  });

  test('Для неавторизованного пользователя отображается кнопка "Войти"', () => {
    const { container } = renderWithStore(<Navigation />);

    const burger = container.querySelector('.nav__burger');
    fireEvent.click(burger!);

    expect(screen.getByText('Войти')).toBeInTheDocument();

    expect(screen.queryByText('Выйти')).not.toBeInTheDocument();
  });

  test('Для авторизованного пользователя отображается кнопка "Выйти"', () => {
    const store = makeStore();
    store.dispatch(
      setAuth({ _id: 1, email: 'test@test.ru', username: 'TestUser' }),
    );

    const { container } = renderWithStore(<Navigation />, store);

    const burger = container.querySelector('.nav__burger');
    fireEvent.click(burger!);

    expect(screen.getByText('Выйти')).toBeInTheDocument();

    expect(screen.queryByText('Войти')).not.toBeInTheDocument();
  });

  test('Клик по кнопке "Выйти" вызывает редирект на страницу входа', () => {
    const store = makeStore();
    store.dispatch(
      setAuth({ _id: 1, email: 'test@test.ru', username: 'TestUser' }),
    );

    const { container } = renderWithStore(<Navigation />, store);

    const burger = container.querySelector('.nav__burger');
    fireEvent.click(burger!);

    const exit = screen.getByText('Выйти');
    fireEvent.click(exit!);

    expect(mockPush).toHaveBeenCalledWith('/auth/signin');
    expect(store.getState().auth.isAuth).toBe(false);
  });
});
