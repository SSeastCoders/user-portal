import {plainToClass} from 'class-transformer';
import {ACCOUNT_ENDPOINT, BASE_URL, TRANSACTION_ENDPOINT} from './api';
import axiosToken from './axios';
import {Account} from './models/Account';
import {Transaction} from './models/Transaction';
import {User} from './models/User';
import {PageResponse} from './responses/PageResponse';

export const getUserById = async (id: string | null) => {
  const response = await axiosToken.get(`${BASE_URL}/users/${id}`);
  const data = plainToClass(User, response.data, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });
  return data;
};

export const getAccountByUserId = async (id: string | null) => {
  const response = await axiosToken.get(`${ACCOUNT_ENDPOINT}/users/${id}`);
  const accounts: Account[] = plainToClass(
    Account,
    response.data as Object[]
  ).filter(account => account.activeStatus === true);
  return accounts;
};

export const getTransactionsByOptions = async (
  id: number,
  page: number,
  pageSize: number,
  search?: string,
  fromDate?: string,
  toDate?: string,
  fromAmount?: number,
  toAmount?: number
) => {
  const response = await axiosToken.get(`${TRANSACTION_ENDPOINT}/${id}`, {
    params: {
      page: page,
      size: pageSize,
      search: search,
      fromDate: fromDate,
      toDate: toDate,
      fromAmount: fromAmount,
      toAmount: toAmount,
    },
  });
  const data: PageResponse<Transaction> = response.data;
  return data;
};

export const getAccountById = async (id: number) => {
  const response = await axiosToken.get(`${ACCOUNT_ENDPOINT}/${id}`);
  const account: Account = response.data;
  return account;
};
