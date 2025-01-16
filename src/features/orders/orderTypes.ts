import { PaginatedResult } from '../sharedTypes';

export interface CreateOrderDto {
  userId: number;
}

export interface OrderItemDto {
  productId: number;
  quantity: number;
}

export interface GetOrderDto {
  id: number;
  userId: number;
  items: OrderItemDto[];
  orderDate: string;
}

export interface GetAllOrdersResponse extends PaginatedResult<GetOrderDto> {}
