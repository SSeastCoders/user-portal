import Pagination from '@vlsergey/react-bootstrap-pagination';
import React, {useMemo, useReducer, useState} from 'react';
import {Collapse, Spinner} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useQuery} from 'react-query';
import Select from 'react-select';
import {Column} from 'react-table';
import {AppTable} from '../../../../components/table/AppTable';
import {getTransactionsByOptions} from '../../../../services/services';
import {TransactionOptions} from '../../../../utils/constants/transactionTableOptions';
import {SearchForm} from './SearchForm';

interface TransactionTableProps {
  id: number;
}

export interface SearchData {
  search?: string;
  fromDate?: string;
  toDate?: string;
  fromAmount?: number;
  toAmount?: number;
}

const initialState: SearchData = {
  search: undefined,
  fromDate: undefined,
  toDate: undefined,
  fromAmount: undefined,
  toAmount: undefined,
};

type Action = {
  type: string;
  payload?: SearchData;
};

function reducer(state: SearchData, action: Action): SearchData {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'update':
      return {...state, ...action.payload};
    default:
      return initialState;
  }
}

export const TransactionTable: React.FC<TransactionTableProps> = ({id}) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  // const [dates, setDates] = useState<{fromDate: Date, toDate: Date} | undefined>(undefined);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectVal, setSelectVal] = useState(TransactionOptions[0]);

  //must specify all dependency for usequery to update properly
  const {data, refetch, ...rest} = useQuery(
    ['transactions', {page, pageSize, id, ...state}],
    async () => {
      return getTransactionsByOptions(
        id,
        page,
        pageSize,
        state.search,
        state.fromDate,
        state.toDate,
        state.fromAmount,
        state.toAmount
      );
    },
    {staleTime: 5 * 1000, keepPreviousData: true}
  );

  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        sortType: 'basic',
      },
    ],
    []
  );

  const transactions = useMemo(() => {
    return rest.isSuccess ? data?.content : [];
  }, [data]);
  const handleSearchClick = () => {
    setSelectVal(TransactionOptions[1]);
    setOpen(!open);
  };

  const selectChange = (e: {label: string; value: string} | null) => {
    setSelectVal({label: e?.label!, value: e?.value!});
    if (e?.value === 'Transactions') {
      dispatch({type: 'reset'});
      setPage(0);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value);
    setPage(0);
  };
  const handlePageChange = (event: any) => {
    setPage(event.target.value);
  };
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="tw-py-3">Account Activity</h2>
        <hr className="tw--mx-5" />
        <div className="tw-flex tw-pt-3 tw-flex-nowrap tw-items-center">
          <h2 className="tw-pr-2">Showing</h2>
          <Select
            value={selectVal}
            isSearchable={false}
            className="tw-w-2/4"
            options={TransactionOptions}
            defaultValue={{
              label: 'All Transactions',
              value: 'All Transactions',
            }}
            onChange={selectChange}
          />
          <button
            type="button"
            className="tw-text-primary tw-pl-3 hover:tw-text-gray-900"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
        <Collapse in={open}>
          <div>
            <hr className="tw--mx-5 tw-mt-3" />
            <SearchForm
              dispatch={dispatch}
              refetch={refetch}
              setPage={setPage}
            ></SearchForm>
          </div>
        </Collapse>
      </div>
      <div className="card-body">
        <AppTable
          bordered
          striped
          responsive
          columns={columns}
          data={transactions}
        ></AppTable>
        <div className="row tw-mt-4">
          <Pagination
            value={page}
            totalPages={data?.totalPages}
            showFirstLast={false}
            onChange={handlePageChange}
          ></Pagination>
          <div className="ml-3">
            <span>Page Size:</span>
            <select value={pageSize} onChange={handlePageSizeChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>
      </div>
      {rest.isFetching && (
        <div className="overlay">
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      )}
    </div>
  );
};
