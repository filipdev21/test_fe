import axios, { AxiosResponse } from 'axios';
import {
  GetProductsResponse,
  LoginUserRequest,
  LoginUserResponse,
  OrderProductRequest,
  OrderProductResponse,
  VerifyUserResponse,
  GetOrdersResponse
} from './type';

export const getProducts = (): Promise<AxiosResponse<GetProductsResponse>> => {
  return axios.get<GetProductsResponse>('/product');
};

export const orderProduct = (
  payload: OrderProductRequest
): Promise<AxiosResponse<OrderProductResponse>> => {
  return axios.post<OrderProductResponse>('/customer/order', payload);
};

export const getOrders = (): Promise<AxiosResponse<GetOrdersResponse>> => {
  return axios.get<GetOrdersResponse>('/customer/order');
};

export const verifyUser = (): Promise<AxiosResponse<VerifyUserResponse>> => {
  return axios.get<VerifyUserResponse>('/customer/verify');
};

export const login = (
  payload: LoginUserRequest
): Promise<AxiosResponse<LoginUserResponse>> => {
  return axios.post<LoginUserResponse>('/customer/login', payload);
};
