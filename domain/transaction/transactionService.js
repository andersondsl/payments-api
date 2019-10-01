/**
 * Transaction service.
 * This file handles all the business logic of users.
 *
 * @module TransactionService
 */

import { transactionRepository } from "./transactionRepository";
import moment from "moment-business-days";

class TransactionService {
  constructor() {
    this.transactionRepository = transactionRepository;

    this.fees = {
      DEBIT: 2,
      CREDIT: 3
    };
  }

  async getAllTransactions() {
    let result = {};
    result.data = await this.transactionRepository.getAllTransactions();
    result.status = result.data ? 200 : 500;
    return result;
  }

  async getTransactionById(id) {
    let result = {};
    result.data = await this.transactionRepository.getTransactionById(id);
    result.status = result.data ? 200 : 500;
    return result;
  }

  async createTransaction({ nsu, value, cardBrand, type, createdAt }) {
    let result = {};

    let fee = this.fees[type];
    let netValue = this._calculateFee(value, fee);
    let availableData = this._getNextWeekDay(date);

    result.data = await this.transactionRepository.createTransaction({
      nsu,
      value,
      netValue,
      cardBrand,
      type,
      createdAt,
      availableData
    });

    result.status = result.data ? 200 : 500;
    return result;
  }

  async _calculateFee(value, fee) {
    return (value / 100) * fee;
  }

  async _getNextWeekDay(date) {
    return moment.nextBusinessDay(date);
  }
}

export const transactionService = new TransactionService();
