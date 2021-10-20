import React from 'react';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {getAccountByUserId} from '../../services/services';
import {AccountCard} from './AccountCard';

interface AccountCardListProps {}

export const AccountCardList: React.FC<AccountCardListProps> = ({}) => {
  const state = useSelector(state => state.auth);
  const {data: accounts, ...result} = useQuery(['accounts'], async () => {
    return getAccountByUserId(state.id!);
  });
  return (
    <div className="content-wrapper">
      <div className="container-fluid pt-3">
        <div className="pl-2">
          {accounts?.map((account, i) => {
            return <AccountCard key={i} account={account}></AccountCard>;
          })}
        </div>
      </div>
    </div>
  );
};
