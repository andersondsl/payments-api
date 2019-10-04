/**
 * Transaction service.
 * This file handles all the business logic of users.
 *
 * @module TransactionService
 */

import { transactionRepository } from "./transactionRepository";
const moment = require("moment-business-days");
import { validateTransaction } from "./transactionSchemaValidation";

class TransactionService {
  constructor() {
    this.transactionRepository = transactionRepository;

    this.fees = {
      DEBITO: 2,
      CREDITO: 3
    };
  }
  
  /**
   * Translate data between specific languages
   * @param {string} mapType - type of localization "EnToBR" or "brToEN"
   * @param {Object} data - A positive or negative number.
   */
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

  /**
   * Get all transaction on transaction collection
   */
  async getAllTransactions() {
    let result = {};
    result.data = await this.transactionRepository.getAllTransactions();
    result.status = result.data ? 200 : 500;
    return result;
  }

  /**
   * Create a transaction with a payload
   * @param {} data - create transaction payload
   */
  async createTransaction(data) {
    let result = {};

    // validate transaction schema
    let error = await validateTransaction(data);
    if (error) {
      result.data = error;
      result.status = 500;
      return result;
    }
    
    // translate payload data to database schema
    let dataMapped = await this.transactionMapper("brToEN", data);
    
    // add calculated properties to dataMapped
    dataMapped.fee = this.fees[dataMapped.type.toUpperCase()];
    
    // calculate fee based on type of transaction
    dataMapped.netValue = this._calculateFee(
      dataMapped.grossValue,
      dataMapped.fee
    );
    dataMapped.availableDate = this._getNextWeekDay(dataMapped.createdAt);
    
    // add calculated properties to dataMapped
    result.data = await this.transactionRepository.createTransaction(
      dataMapped
    );

    // calculate request status
    result.status = result.data ? 200 : 500;
    return result;
  }

  /**
   * Calculate the fee of transaction and return a net value.
   * @param {Number} value - gorss value from transaction
   * @param {Number} fee - Fee based on type of transaction
   */
  _calculateFee(value, fee) {
    let feeValue = (value / 100) * fee;
    return value - feeValue;
  }

  /**
   * get the next weekday, using a moment plugin
   * @param {string} date - the date of transaction 
   */
  _getNextWeekDay(date) {
    let formatedDate = date.match(/\d{4}-\d{2}-\d{2}/)[0];
    return moment(formatedDate, "YYYY-MM-DD").nextBusinessDay()._d;
  }

  /**
   * Return the balance of available transactions from a specific day
   * @param {string} date - the date of the requested balance
   */
  async getBalance(data) {
    let result = {};
    result.data = await this.transactionRepository.getBalance(data);
    result.status = result.data ? 200 : 500;
    return result;
  }
}

export const transactionService = new TransactionService();
