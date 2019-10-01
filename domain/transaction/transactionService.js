/**
 * Transaction service.
 * This file handles all the business logic of users.
 * 
 * @module TransactionService
 */

import { transactionRepository } from './transactionRepository'

class TransactionService {
  constructor() {
    this.transactionRepository = transactionRepository;
    
    this.fees = {
      DEBIT: 2,
      CREDIT: 3
    }
  }

  async getAllTransactions() {
    let result = {}
    result.data = await this.transactionRepository.getAllTransactions();
    result.status = result.data ? 200 : 500
    return result;
  }

  async getTransactionById(id) {
    let result = {}
    result.data = await this.transactionRepository.getTransactionById(id)
    result.status = result.data ? 200 : 500
    return result
  }

  async createTransaction({ nsu, value, cardBrand, type, createdAt }) {
    let result = {}

    let fee = this.fees[type]
    let netValue = this.calculateFee(value, fee)

    result.data = await this.transactionRepository.createTransaction({ nsu, value, netvalue, cardBrand, type, createdAt });
    result.status = result.data ? 200 : 500
    return result;
  }

  async calculateFee(value, fee){
     return value / 100 * fee
  }

}

export const transactionService = new TransactionService();
