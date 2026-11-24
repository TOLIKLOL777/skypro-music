import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { setAuth } from '@/store/features/authSlice';
import Sidebar from './SideBar';

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

describe('SideBar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('При нажатии на кнопку выхода выполняется переход на страницу входа', () => {
    const { container } = renderWithStore(<Sidebar />);

    expect(screen.queryByText('Гость')).toBeInTheDocument();

    const exit_btn = container.querySelector('.sidebar__icon');
    fireEvent.click(exit_btn!);

    expect(mockPush).toHaveBeenCalledWith('/auth/signin');
  });

  test('Для неавторизованного пользователя отображается "Гость"', () => {
    renderWithStore(<Sidebar />);
    expect(screen.getByText('Гость')).toBeInTheDocument();
  });

  test('Для авторизованного пользователя отображается имя пользователя', () => {
    const store = makeStore();
    store.dispatch(
      setAuth({ _id: 1, email: 'test@test.ru', username: 'TestUser' }),
    );

    const { container } = renderWithStore(<Sidebar />, store);

    expect(screen.getByText('TestUser')).toBeInTheDocument();

    expect(screen.queryByText('Гость')).not.toBeInTheDocument();
  });

  test('Клик по кнопке плей листам вызывает редирект на страницу этго плейлиста', () => {
    const store = makeStore();
    store.dispatch(
      setAuth({ _id: 1, email: 'test@test.ru', username: 'TestUser' }),
    );

    const { container } = renderWithStore(<Sidebar />, store);

    const playlist = container.querySelector('.sidebar__link');
    fireEvent.click(playlist!);

    expect(playlist).toHaveAttribute('href', '/music/category/1');
  });
});
