// components/ui/Pagination.tsx
export default function Pagination() {
  return (
    <div className="mt-4 flex flex-col gap-3 p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <select className="w-full min-w-0 rounded border border-gray-300 p-2 sm:w-auto sm:p-1">
        <option>10</option>
        <option>25</option>
        <option>50</option>
      </select>
      <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
        <button
          type="button"
          className="min-h-[2.25rem] min-w-[2.25rem] rounded border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
        >
          1
        </button>
        <button
          type="button"
          className="min-h-[2.25rem] min-w-[2.25rem] rounded border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
        >
          2
        </button>
        <button
          type="button"
          className="min-h-[2.25rem] min-w-[2.25rem] rounded border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
        >
          3
        </button>
      </div>
    </div>
  );
}
