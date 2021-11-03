/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import React from 'react';
import BTable, {TableProps} from 'react-bootstrap/Table';
import {Column, useSortBy, useTable} from 'react-table';
interface AppTableProps extends TableProps {
  columns: Column[];
  data: any;
}

export const AppTable: React.FC<AppTableProps> = ({columns, data, ...rest}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: {sortBy},
  } = useTable({columns, data}, useSortBy);
  return (
    <BTable {...rest} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span className="tw-pl-2">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <i className="fas fa-sort-down"></i>
                    ) : (
                      <i className="fas fa-sort-up"></i>
                    )
                  ) : (
                    <i className="fas fa-sort"></i>
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </BTable>
  );
};
