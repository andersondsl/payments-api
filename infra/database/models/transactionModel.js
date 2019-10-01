/**
 * Transaction Schema
 * This file describes the Transaction Model
 * 
 * @module TransactionSchema
 */

import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  device_id: {
    type: String,
    required: true,    
  },
  nsu: {
    type: String,
    required: true,
  },
  grossValue: {
    type: Number,
    required: true, 
  },
  netValue: {
    type: Number,
    required: true, 
  },
  fee: {
    type: Number,
    required: true, 
  },
  cardBrand: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    required: true,
  },
  availableData: {
    type: Date,
    required: true,
  }
});

export const transactionModel = mongoose.model('Transaction', TransactionSchema);
