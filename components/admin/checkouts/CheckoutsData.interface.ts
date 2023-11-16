import { Address, Basket, OrderProduct, User } from "swagger/services";

export interface CheckoutsData {
  key: string;
  id: string;
  user?: User;
  basket?: Basket;
  address?: Address,
  comment?: string
}