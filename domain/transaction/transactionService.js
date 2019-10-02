/**
 * Transaction service.
 * This file handles all the business logic of users.
 *
 * @module TransactionService
 */

import { transactionRepository } from "./transactionRepository";
const moment = require("moment-business-days");
const Joi = require("@hapi/joi");
import { transactionSchemaValidation } from "./transactionSchemaValidation";

class TransactionService {
  constructor() {
    this.transactionRepository = transactionRepository;

    this.fees = {
      DEBITO: 2,
      CREDITO: 3
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

    try {
      await Joi.assert(
        { nsu, value, cardBrand, type, createdAt },
        transactionSchemaValidation
      );
    } catch (error) {
      result.data = error;
      result.status = 500;
      return result;
    }

    let fee = this.fees[type.toUpperCase()];
    let netValue = this._calculateFee(value, fee);
    let availableDate = this._getNextWeekDay(createdAt);

    result.data = await this.transactionRepository.createTransaction({
      nsu,
      grossValue: value,
      netValue,
      fee,
      cardBrand,
      type,
      createdAt,
      availableDate
    });

    result.status = result.data ? 200 : 500;
    return result;
  }

  _calculateFee(value, fee) {
    let feeValue = (value / 100) * fee;
    return value - feeValue;
  }

  _getNextWeekDay(date) {
    let formatedDate = date.match(/\d{4}-\d{2}-\d{2}/)[0];
    return moment(formatedDate, "YYYY-MM-DD").nextBusinessDay()._d;
  }
}

export const transactionService = new TransactionService();
