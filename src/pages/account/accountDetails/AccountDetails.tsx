/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import {useQuery} from 'react-query';
import {useLocation} from 'react-router-dom';
import {Account} from '../../../services/models/Account';
import {getAccountById} from '../../../services/services';
import {AccountDetailCard} from './AccountDetailCard';
import {TransactionTable} from './transactions/TransactionTable';

interface AccountDetailsProps {}

export const AccountDetails: React.FC<AccountDetailsProps> = () => {
  const {state} = useLocation<{account: Account}>();
  const {data, ...result} = useQuery(
    ['account', state.account.id],
    async () => {
      return getAccountById(state.account.id);
    }
  );
  return (
    <div className="content-wrapper">
      <div className="container pt-3">
        <AccountDetailCard account={data}></AccountDetailCard>
        {result.isSuccess && (
          <TransactionTable id={state.account.id}></TransactionTable>
        )}
      </div>
    </div>
  );
};
