/**
 * Transaction service.
 * This file handles all the business logic of users.
 *
 * @module TransactionService
 */

import { transactionRepository } from "./transactionRepository";
const moment = require("moment-business-days");
import { validateTransaction } from "./transactionSchemaValidation";
  
const fees = {
  DEBITO: 2,
      CREDITO: 3
}

  /**
   * Translate data between specific languages
   * @param {string} mapType - type of localization "EnToBR" or "brToEN"
   * @param {Object} data - A positive or negative number.
   */
  const transactionMapper = async (mapType, data) => {
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
  const getAllTransactions = async () => {
    let result = {};
    result.data = await transactionRepository.getAllTransactions();
    result.status = result.data ? 200 : 500;
    return result;
  }

  /**
   * Create a transaction with a payload
   * @param {} data - create transaction payl
   * const fees = {
  }
   * }
   * oad
   */
  const createTransaction = async(data) => {
    let result = {};

    // validate transaction schema
    let error = await validateTransaction(data);
    if (error) {
      result.data = error;
      result.status = 500;
      return result;
    }
    
    // translate payload data to database schema
    let dataMapped = await transactionMapper("brToEN", data);
    
    // add calculated properties to dataMapped
    dataMapped.fee = fees[dataMapped.type.toUpperCase()];
    
    // calculate fee based on type of transaction
    dataMapped.netValue = _calculateFee(
      dataMapped.grossValue,
      dataMapped.fee
    );

    let availableDate = new Date(dataMapped.createdAt);

    if (dataMapped.type === 'CREDITO'){
      availableDate.setDate(availableDate.getDate() + 30);
    }

    dataMapped.availableDate = _getNextWeekDay(dataMapped.createdAt).replace(/[-]/g, "");

    // add calculated properties to dataMapped
    result.data = await transactionRepository.createTransaction(
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
  const _calculateFee = (value, fee) => {
    let feeValue = (value / 100) * fee;
    return value - feeValue;
  }

  /**
   * get the next weekday, using a moment plugin
   * @param {string} date - the date of transaction 
   */
  const _getNextWeekDay = (date) => {
    let formatedDate = date.match(/\d{4}-\d{2}-\d{2}/)[0];
    return moment(formatedDate, "YYYY-MM-DD").nextBusinessDay()._i;
  }

  /**
   * Return the balance of available transactions from a specific day
   * @param {string} date - the date of the requested balance
   */
  const getBalance = async (data) => {
    let result = {};
    result.data = await transactionRepository.getBalance(data);
    result.status = result.data ? 200 : 500;
    return result;
  }

export const transactionService = {
  getAllTransactions: getAllTransactions,
  getBalance: getBalance,
  createTransaction: createTransaction
}