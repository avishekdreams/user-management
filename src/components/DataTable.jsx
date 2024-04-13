import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';

DataTable.propTypes = {
  userData: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  filteredData: PropTypes.string.isRequired,
  setFiltering: PropTypes.func.isRequired,
};

export default function DataTable({ userData, handleDelete, filteredData, setFiltering }) {
  const columnHelper = createColumnHelper();
  const navigate = useNavigate();

  const columns = [
    columnHelper.accessor('id', {
      header: () => "ID",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('username', {
      header: () => "Username",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('email', {
      header: () => "Email",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('role', {
      header: () => "Role",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('actions', {
      header: () => "Actions",
      cell: (info) => (
        <div className="flex justify-center items-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => navigate(`/view/${info.row.original.id}`)}>
            View
          </button>
          <span className="text-gray-500 mr-2">|</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => navigate(`/update/${info.row.original.id}`)}>
            Edit
          </button>
          <span className="text-gray-500">|</span>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleDelete(info.row.original.id)}>
            Delete
          </button>
        </div>
      )
    })
  ];

  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filteredData
    },
    onGlobalFilterChange: setFiltering
  });

  return (
    <>
      {table.getFilteredRowModel().rows.length === 0 ? (
        <div className="text-center text-gray-500">No results found.</div>
      ) : (
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div>
                      {flexRender(header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead >
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b dark:border-neutral-500">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="whitespace-nowrap px-6 py-4 font-medium">
                    {flexRender(cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table >
      )}

      <div>
        <button onClick={() => table.setPageIndex(0)} className="h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100">First Page</button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className={`h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline ${table.getCanPreviousPage() ? 'hover:bg-indigo-100' : 'text-gray-400 cursor-not-allowed bg-gray-200'}`}>
          Previous
        </button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className={`h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline ${table.getCanNextPage() ? 'hover:bg-indigo-100' : 'text-gray-400 cursor-not-allowed bg-gray-200'}`}>
          Next
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100">Last Page</button>
      </div >
    </>
  )
}