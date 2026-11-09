import axios from 'axios';
import { BASE_URL } from '../constants';

interface UserCredentials {
  login: string;
  password: string;
}

export async function Login(userData: UserCredentials) {
  try {
    const data = await axios.post(BASE_URL + '/user/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.data.user;
  } catch (error) {
    const axiosError = error as { response?: { data?: { error?: string } } };
    throw new Error(axiosError.response?.data?.error || 'Failed to login', {
      cause: error,
    });
  }
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export async function Register(userData: RegisterData) {
  try {
    const response = await axios.post(BASE_URL + '/user/signup/', userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response.data);
    return response.data.user;
  } catch (error) {
    console.log(error);
    const axiosError = error as { response?: { data?: { error?: string } } };
    throw new Error(axiosError.response?.data?.error || 'Failed to register', {
      cause: error,
    });
  }
}
