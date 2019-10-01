/**
 * Transaction controller.
 * This file provides all the methods exported in routes file.
 * All methods uses the transaction service api to handle business logic, and returns a http response.
 * @module Transaction controller.
 */

"use strict";

import { transactionService } from "../../domain/transaction/transactionService";

const handleResponse = async (ctx, callback) => {
  let { status, data } = await callback;
  ctx.status = status;
  ctx.body = data ? data : { error: "Internal server error" };
};

export const index = async (ctx, next) => {
  await handleResponse(ctx, transactionService.getAllTransactions());
};

export const findById = async (ctx, next) => {
  const { id } = ctx.params;
  await handleResponse(ctx, transactionService.getTransactionById(id));
};

export const create = async (ctx, next) => {
  const { nsu, value, cardBrand, type, createdAt } = ctx.request.body;

  await handleResponse(
    ctx,
    transactionService.createTransaction({
      nsu,
      value,
      cardBrand,
      type,
      createdAt
    })
  );
};
