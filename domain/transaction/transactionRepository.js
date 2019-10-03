/**
 * Transaction repository.
 * This module handle all requests with the Transaction Collection in mongo databases.
 *
 * @module TransactionRepository
 */

import mongoose from "mongoose";
import { logger } from "../../infra/logger";
const Transaction = mongoose.model("Transaction");

const handleMongoQuery = async queryCallback => {
  try {
    let result = await queryCallback;
    return result;
  } catch (error) {
    logger.error(error, { scope: "Mongo Repository" });
    return null;
  }
};

export const transactionRepository = {
  getAllTransactions: async () => {
    return handleMongoQuery(Transaction.find({}));
  },
  getTransactionById: async id => {
    return handleMongoQuery(Transaction.findById(id));
  },
  createTransaction: async data => {
    return handleMongoQuery(Transaction.create(data));
  },
  getBalance: async data => {
    return handleMongoQuery(
      Transaction.find({
        availableDate: { $eq: data }
      })
    );
  }
};
