import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Account} from '../../services/models/Account';

interface AccountCardProps {
  account: Account;
}

export const AccountCard: React.FC<AccountCardProps> = ({account}) => {
  return (
    <div className="card tw-max-w-2xl">
      <div className="card-body">
        <Link
          to={{
            pathname: '/dashboard/overviewAccounts/overview/account',
            state: {account},
          }}
        >
          <div className="tw-flex tw-justify-between">
            <div className="tw-flex">
              <span className="tw-mr-2">
                <svg
                  width="42px"
                  height="34px"
                  x="0px"
                  y="0px"
                  viewBox="0 0 42 34"
                  aria-hidden="true"
                  role="img"
                  focusable="false"
                >
                  <g>
                    <path
                      fill="#D3D3D3"
                      d="M0,4.5v20h4v3.817c0,1.231,0.56,1.996,1.461,1.996h16.762c0.963,0,1.776-0.914,1.776-1.996V24.5h18v-20H0z
          M3,6.5h16v2.062H3V6.5z M3,12.5v-2h11v2H3z M23.25,28.5c0,0.406-0.421,1.062-1.026,1.062H5.461c-0.642,0-0.711-0.871-0.711-1.246
          V17.064c0-0.924,0.718-1.001,1.062-1.001h16.411c0.614,0,1.026,0.402,1.026,1.185V28.5z M34.5,18.668v1.894H33v-1.786
          c-1.011-0.026-1.663-0.301-2.237-0.608l0.446-1.722c0.634,0.336,1.526,0.641,2.506,0.638c0.86-0.003,1.462-0.343,1.46-0.917
          c-0.002-0.559-0.502-0.909-1.619-1.273c-1.616-0.523-2.905-1.255-2.911-2.681C30.641,10.906,31.5,9.889,33,9.589V8.193l1.5-0.005
          v1.293c1.5,0.027,1.867,0.244,2.38,0.478l-0.36,1.663c-0.378-0.175-1.045-0.511-2.131-0.507c-0.98,0.003-1.274,0.431-1.272,0.843
          c0.001,0.471,0.541,0.792,1.826,1.243c1.812,0.611,2.372,1.417,2.377,2.755C37.324,17.262,36.75,18.368,34.5,18.668z"
                    ></path>
                    <rect
                      x="18"
                      y="24.5"
                      fill="#D3D3D3"
                      width="3"
                      height="2"
                    ></rect>
                    <rect
                      x="6"
                      y="24.5"
                      fill="#D3D3D3"
                      width="10"
                      height="1"
                    ></rect>
                  </g>
                </svg>
              </span>
              <span className="tw-text-lg">
                {account.nickName} {account.accountType}
              </span>
            </div>
            <div className="tw-flex tw-flex-col">
              <span className="tw-text-lg">
                <sup className="tw-relative -top-1">$</sup>
                {account.balance}
              </span>
              <span className="tw-text-xs">Available balance</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
