import React, { useState } from "react";

interface TableColumn {
  heading: string;
  subHeadings?: string[];
}

interface TableRow {
  id: number;
  project: string;
  columns: any[];
}

interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

const TableComponent: React.FC<TableProps> = ({ columns, rows }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRowSelection = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="overflow-x-auto p-5">
      <table className="table-auto border-collapse border border-gray-500 lg:w-4/5 md:w-2/3 sm:w-full">
        <thead>
          <tr>
            {columns.map((column, columnIndex) => (
              <th
                key={columnIndex}
                className="border border-gray-500 p-2 text-center lg:text-lg md:text-md sm:text-sm"
                colSpan={column.subHeadings ? column.subHeadings.length : 1}
                rowSpan={columnIndex < 2 ? 2 : 1}
              >
                {column.heading}
              </th>
            ))}
          </tr>
          {columns.slice(2).some((column) => column.subHeadings) && ( // Check if any column after ID and Project has subheadings
            <tr>
              {columns.slice(2).map(
                (
                  column,
                  columnIndex // Start from index 2 to skip ID and Project columns
                ) => (
                  <React.Fragment key={columnIndex}>
                    {column.subHeadings?.map((subHeading, subHeadingIndex) => (
                      <th
                        key={subHeadingIndex}
                        className="border border-gray-500 p-2 text-center lg:text-lg md:text-md sm:text-sm"
                      >
                        {subHeading}
                      </th>
                    ))}
                  </React.Fragment>
                )
              )}
            </tr>
          )}
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="border border-gray-500 p-2 text-center lg:text-lg md:text-md sm:text-sm">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => toggleRowSelection(row.id)}
                  className="mr-2"
                />
                {row.id}
              </td>
              <td className="border border-gray-500 p-2 text-center lg:text-lg md:text-md sm:text-sm">
                {row.project}
              </td>
           
              {row.columns.map((value, columnIndex) => (
                <td key={columnIndex} className="border border-gray-500 p-2 text-center lg:text-lg md:text-md sm:text-sm">
                  {value}
                </td>

            
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
