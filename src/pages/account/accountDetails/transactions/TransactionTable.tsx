import React, { useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { AppTable } from '../../../../components/table/AppTable';
import { getTransactionsByAccountId } from '../../../../services/services';
import Pagination from "@vlsergey/react-bootstrap-pagination"

interface TransactionTableProps {
  id: number
}


export const TransactionTable: React.FC<TransactionTableProps> = ({ id }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, ...rest } = useQuery(['transactions', { page, pageSize }], async () => {
    return getTransactionsByAccountId(id, page, pageSize);
  }, { staleTime: 5 * 1000, keepPreviousData: true })

  const columns = useMemo(() => [
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
    }
  ],
    []
  );

  const transactions = useMemo(() => {
    return rest.isSuccess ? data?.content : [];
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value);
    setPage(0);
  };
  const handlePageChange = (event: any) => {
    setPage(event.target.value);
  };
  return (
    <div className="card">
      <div className="card-body">
        <AppTable bordered striped columns={columns} data={transactions}></AppTable>
        <div className="tw-flex tw-mt-4">
          <Pagination value={page} totalPages={data?.totalPages} onChange={handlePageChange}></Pagination>
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