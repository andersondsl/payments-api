/**
 * Transaction controller.
 * This file provides all the methods exported in routes file.
 * All methods uses the transaction service api to handle business logic, and returns a http response.
 * @module Transaction controller.
 */

"use strict";

import { transactionService } from "../../domain/transaction/transactionService";

const validateAccess = (ctx, user, password) => {
  if (ctx.state.user !== user || ctx.state.password !== password) {
    ctx.status = 404;
    ctx.body = "Unauthorized access";
    return false;
  }
  return true;
};

const handleResponse = async (ctx, callback) => {
  let { status, data } = await callback;
  ctx.status = status;
  ctx.body = data ? data : { error: "Internal server error" };
};

export const index = async (ctx, next) => {
  if (!validateAccess(ctx, "portal", "123456")) {
    return;
  }

  await handleResponse(ctx, transactionService.getAllTransactions());
};

export const create = async (ctx, next) => {
  let result = {};

  if (!validateAccess(ctx, "terminal", "123456")) {
    ctx.status = 400;
    ctx.body = result;
    return;
  }
  let data = ctx.request.body;
  result = await transactionService.createTransaction(data);

  ctx.status = 200;
  ctx.body = result.data;
};

export const getBalance = async (ctx, next) => {
  let result = {};
  let data = ctx.headers.horario;
  if (!validateAccess(ctx, "portal", "123456")) {
    ctx.status = 400;
    ctx.body = result;
    return;
  }

  result = await transactionService.getBalance(data);
  console.log(result);
  ctx.status = 200;
  ctx.body = result.data;
};
