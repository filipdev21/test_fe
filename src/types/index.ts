export type Product = {
  id: string;
  name: string;
}

export type Customer = {
  id: string;
  name: string;
  email: string;
};

export type Order = {
  id: string;
  product: string;
  customer: string;
  createdAt: string;
  updatedAt: string;
}
