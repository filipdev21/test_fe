import { Customer, Order, Product } from '@types';

export type GetProductsResponse = {
  data: Product[];
};

export type OrderProductRequest = {
  productId: string;
  customerId: string;
};

export type OrderProductResponse = {
  data: string;
};

export type GetOrdersResponse = {
  data: Order[];
};

export type VerifyUserResponse = {
  data: Customer;
};

export type LoginUserRequest = {
  email: string;
};

export type LoginUserResponse = {
  data: {
    user: Customer;
    token: string;
  };
};
