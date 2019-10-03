/**
 * Transaction service.
 * This file handles all the business logic of users.
 *
 * @module TransactionService
 */

import { transactionRepository } from "./transactionRepository";
const moment = require("moment-business-days");
const Joi = require("@hapi/joi");
import { validateTransaction } from "./transactionSchemaValidation";

class TransactionService {
  constructor() {
    this.transactionRepository = transactionRepository;

    this.fees = {
      DEBITO: 2,
      CREDITO: 3
    };
  }

  async transactionMapper(mapType, data) {
    if (mapType === "EnToBR") {
      return {
        nsu: data.nsu,
        valor: data.grossValue,
        liquido: data.netValue,
        bandeira: data.cardBrand,
        modalidade: data.type,
        horario: data.createdAt,
        disponivel: data.availableDate
      };
    }

    if (mapType === "brToEN") {
      return {
        nsu: data.nsu,
        grossValue: data.valor,
        cardBrand: data.bandeira,
        type: data.modalidade,
        createdAt: data.horario
      };
    }
  }

  async getAllTransactions() {
    let result = {};
    result.data = await this.transactionRepository.getAllTransactions();
    result.status = result.data ? 200 : 500;
    return result;
  }

  async createTransaction(data) {
    let result = {};

    let error = await validateTransaction();
    if (error) {
      result.data = error;
      result.status = 500;
      return result;
    }

    let dataMapped = await this.transactionMapper("brToEN", data);

    dataMapped.fee = this.fees[dataMapped.type.toUpperCase()];
    dataMapped.netValue = this._calculateFee(
      dataMapped.grossValue,
      dataMapped.fee
    );
    dataMapped.availableDate = this._getNextWeekDay(dataMapped.createdAt);

    result.data = await this.transactionRepository.createTransaction(
      dataMapped
    );

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

  async getBalance(data) {
    let result = {};
    result.data = await this.transactionRepository.getBalance(data);
    result.status = result.data ? 200 : 500;
    return result;
  }
}

export const transactionService = new TransactionService();
