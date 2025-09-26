// components/ui/Pagination.tsx
export default function Pagination() {
  return (
    <div className="flex items-center justify-between p-3 text-sm mt-4">
      <select className="border p-1 rounded">
        <option>10</option>
        <option>25</option>
        <option>50</option>
      </select>
      <div className="flex gap-2">
        <button className="px-2 py-1 border rounded">1</button>
        <button className="px-2 py-1 border rounded">2</button>
        <button className="px-2 py-1 border rounded">3</button>
      </div>
    </div>
  )
}
