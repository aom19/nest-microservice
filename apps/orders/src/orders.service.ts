import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderRequest } from './dto/create-order-request';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(request: CreateOrderRequest) {
    return this.ordersRepository.create(request);
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
