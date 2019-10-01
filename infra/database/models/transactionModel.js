/**
 * Transaction Schema
 * This file describes the Transaction Model
 *
 * @module TransactionSchema
 */

import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  nsu: {
    type: String,
    required: true
  },
  grossValue: {
    type: String,
    required: true
  },
  netValue: {
    type: String,
    required: true
  },
  fee: {
    type: String,
    required: true
  },
  cardBrand: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  availableDate: {
    type: Date,
    required: true
  }
});

export const transactionModel = mongoose.model(
  "Transaction",
  TransactionSchema
);
