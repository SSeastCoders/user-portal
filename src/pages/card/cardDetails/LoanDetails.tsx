/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';

interface LoanDetailsProps {}

export const LoanDetails: React.FC<LoanDetailsProps> = () => {
  /*   const {state} = useLocation<{loan: Loan}>();
  const {data, ...result} = useQuery(['loan', state.loan.id], async () => {
    return getLoanById(state.loan.id);
  }) */
  return (
    <div>LOan</div>
    /*     <div className="content-wrapper">
      <div className="container pt-3">
        <LoanDetailCard loan={data}></LoanDetailCard>
      </div>
    </div> */
  );
};
