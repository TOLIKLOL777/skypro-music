import { withReauth } from './withReauth';
import { refreshToken } from '@/services/auth/authapi';
import { setAccessToken } from '@/store/features/authSlice';
import { AppDispatch } from '@/store/store';
import { AxiosError, AxiosResponse } from 'axios';

jest.mock('@/services/auth/authapi');
jest.mock('@/store/features/authSlice', () => ({
  setAccessToken: jest.fn((token: string) => ({
    type: 'auth/setAccessToken',
    payload: token,
  })),
}));

const mockRefreshToken = refreshToken as jest.MockedFunction<
  typeof refreshToken
>;

const createAxiosError = (status?: number, message = 'Request failed') => {
  const response = status ? ({ status } as AxiosResponse) : undefined;
  return new AxiosError(
    message,
    status ? String(status) : undefined,
    undefined,
    undefined,
    response,
  );
};

describe('withReauth', () => {
  const refresh = 'test-refresh-token';
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
  });

  it('успешно возвращает результат apiFunction с первой попытки (без ошибки 401)', async () => {
    const apiFunction = jest.fn().mockResolvedValue('success-data');

    const result = await withReauth(
      apiFunction,
      refresh,
      mockDispatch as unknown as AppDispatch,
    );

    expect(result).toBe('success-data');
    expect(apiFunction).toHaveBeenCalledTimes(1);
    expect(apiFunction).toHaveBeenCalledWith('');
    expect(mockRefreshToken).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('при ошибке 401 обновляет токен, диспатчит его и повторяет запрос с новым токеном', async () => {
    const newAccess = 'new-access-token';
    mockRefreshToken.mockResolvedValue({ access: newAccess });

    const apiFunction = jest
      .fn()
      .mockRejectedValueOnce(createAxiosError(401, 'Unauthorized'))
      .mockResolvedValueOnce('retried-data');

    const result = await withReauth(
      apiFunction,
      refresh,
      mockDispatch as unknown as AppDispatch,
    );

    expect(result).toBe('retried-data');
    expect(apiFunction).toHaveBeenCalledTimes(2);
    expect(apiFunction).toHaveBeenNthCalledWith(1, '');
    expect(apiFunction).toHaveBeenNthCalledWith(2, newAccess);

    expect(mockRefreshToken).toHaveBeenCalledTimes(1);
    expect(mockRefreshToken).toHaveBeenCalledWith(refresh);

    expect(setAccessToken).toHaveBeenCalledWith(newAccess);
    expect(mockDispatch).toHaveBeenCalledWith(setAccessToken(newAccess));
  });

  it('при ошибке 401 и сбое обновления токена (refreshToken) пробрасывает ошибку обновления', async () => {
    const refreshError = new Error('Refresh token expired');
    mockRefreshToken.mockRejectedValue(refreshError);

    const apiFunction = jest
      .fn()
      .mockRejectedValue(createAxiosError(401, 'Unauthorized'));

    await expect(
      withReauth(apiFunction, refresh, mockDispatch as unknown as AppDispatch),
    ).rejects.toThrow('Refresh token expired');

    expect(mockRefreshToken).toHaveBeenCalledTimes(1);
    expect(mockRefreshToken).toHaveBeenCalledWith(refresh);
    expect(apiFunction).toHaveBeenCalledTimes(1);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('при ошибке 401 и сбое повторного запроса пробрасывает ошибку повторного запроса', async () => {
    const newAccess = 'new-access-token';
    mockRefreshToken.mockResolvedValue({ access: newAccess });

    const retryError = createAxiosError(500, 'Server error');
    const apiFunction = jest
      .fn()
      .mockRejectedValueOnce(createAxiosError(401, 'Unauthorized'))
      .mockRejectedValueOnce(retryError);

    await expect(
      withReauth(apiFunction, refresh, mockDispatch as unknown as AppDispatch),
    ).rejects.toThrow('Server error');

    expect(apiFunction).toHaveBeenCalledTimes(2);
    expect(mockRefreshToken).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('при ошибке, отличной от 401 (например, 403, 404, 500), сразу пробрасывает ошибку без обновления токена', async () => {
    const error500 = createAxiosError(500, 'Internal Server Error');
    const apiFunction = jest.fn().mockRejectedValue(error500);

    await expect(
      withReauth(apiFunction, refresh, mockDispatch as unknown as AppDispatch),
    ).rejects.toThrow('Internal Server Error');

    expect(apiFunction).toHaveBeenCalledTimes(1);
    expect(mockRefreshToken).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('при ошибке без объекта response (сетевая ошибка) сразу пробрасывает её', async () => {
    const networkError = new Error('Network Error');
    const apiFunction = jest.fn().mockRejectedValue(networkError);

    await expect(
      withReauth(apiFunction, refresh, mockDispatch as unknown as AppDispatch),
    ).rejects.toThrow('Network Error');

    expect(apiFunction).toHaveBeenCalledTimes(1);
    expect(mockRefreshToken).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
