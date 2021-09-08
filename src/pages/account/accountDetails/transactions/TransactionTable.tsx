import Pagination from "@vlsergey/react-bootstrap-pagination";
import React, { useMemo, useState } from 'react';
import { Card, Spinner, useAccordionToggle } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useQuery } from 'react-query';
import Select from 'react-select';
import { Column } from 'react-table';
import { CollapseButton } from '../../../../components/button/CollapseButton';
import { AppTable } from '../../../../components/table/AppTable';
import { getTransactionsByAccountId } from '../../../../services/services';

interface TransactionTableProps {
  id: number
}


export const TransactionTable: React.FC<TransactionTableProps> = ({ id }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  //must specify all dependency for usequery to update properly
  const { data, ...rest } = useQuery(['transactions', { page, pageSize, id }], async () => {
    return getTransactionsByAccountId(id, page, pageSize);
  }, { staleTime: 5 * 1000, keepPreviousData: true })

  const columns: Column[] = useMemo(() => [
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Amount",
      accessor: "amount",
      sortType: "basic"
    }
  ],
    []
  );

  let transactions = useMemo(() => {
    return rest.isSuccess ? data?.content : [];
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
  const handleSearchClick = () => {

  }

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
            isSearchable={false}
            className="tw-w-2/4"
            options={[{ value: "Transactions", label: "Transactions" }, { value: "Search", label: "Search" }]}
            defaultValue={{ label: "All Transactions", value: "All Transactions" }} />
          <button type="button" className="tw-text-primary tw-pl-3 hover:tw-text-gray-900" onClick={handleSearchClick}>Search</button>
        </div>
        <hr className="tw--mx-5 tw-mt-3" />

      </div>
      <div className="card-body">
        <AppTable bordered striped responsive columns={columns} data={transactions}></AppTable>
        <div className="row tw-mt-4">
          <Pagination value={page} totalPages={data?.totalPages} showFirstLast={false} onChange={handlePageChange}></Pagination>
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
      {rest.isLoading &&
        <div className="overlay">
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      }
    </div>
  );
}