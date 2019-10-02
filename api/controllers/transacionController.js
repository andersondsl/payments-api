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

export const findById = async (ctx, next) => {
  if (!validateAccess(ctx, "terminal", "123456")) {
    return;
  }

  const { id } = ctx.params;
  await handleResponse(ctx, transactionService.getTransactionById(id));
};

export const create = async (ctx, next) => {
  if (!validateAccess(ctx, "terminal", "123456")) {
    return;
  }

  const { nsu, valor, bandeira, modalidade, horario } = ctx.request.body;

  let result = await transactionService.createTransaction({
    nsu,
    value: valor,
    cardBrand: bandeira,
    type: modalidade,
    createdAt: horario
  });

  if (!result) {
    ctx.status = 400;
    ctx.body = "Not Found";
  }

  ctx.status = 200;
  ctx.body = {
    nsu,
    valor: result.data.grossValue,
    liquido: result.data.netValue,
    bandeira: result.data.cardBrand,
    modalidade: result.data.type,
    horario: result.data.createdAt,
    disponivel: result.data.availableDate
  };
};
