import { BASE_URL } from '../constants';
import axios from 'axios';

interface loginUser {
  email: string;
  password: string;
}

type loginUserReturn = {
  email: string;
  username: string;
  _id: number;
};

export async function Login(userData: loginUser): Promise<loginUserReturn> {
  return await axios
    .post(BASE_URL + '/user/login/', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

type registerDataReturn = {
  email: string;
  password: string;
  username: string;
  _id: number;
};

export async function Register(
  userData: RegisterData,
): Promise<registerDataReturn> {
  return await axios
    .post(BASE_URL + '/user/signup/', userData, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.data);
}

type tokensReturn = {
  access: string;
  refresh: string;
};

export async function getTokens(userData: loginUser): Promise<tokensReturn> {
  return await axios
    .post(BASE_URL + '/user/token/', userData)
    .then((res) => res.data);
}

export async function refreshToken(
  userData: loginUser,
): Promise<{ access: string }> {
  return await axios
    .post(BASE_URL + '/user/token/refresh/', userData)
    .then((res) => res.data);
}
