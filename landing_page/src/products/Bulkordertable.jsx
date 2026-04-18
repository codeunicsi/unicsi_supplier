import moment from "moment";

const statusStyles = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Processing: "bg-blue-100 text-blue-700",
};

const paymentStyles = {
  VERIFIED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
};

export default function BulkOrderTable({ orders = [] }) {
  if (!orders.length) {
    return (
      <p className="text-sm text-gray-400 text-center py-10">
        No bulk orders found.
      </p>
    );
  }

  return (
    <>
      {/* Mobile / small tablet: stacked cards */}
      <div className="space-y-3 md:hidden">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="min-w-0 rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-100 pb-2">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-800">{order.invoiceNumber}</p>
                <p className="mt-0.5 break-all text-xs text-gray-400">
                  {order.orderId}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  statusStyles[order.orderStatus] ??
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>
            <div className="mt-2 space-y-1.5 text-sm">
              <p className="font-medium text-gray-800 break-words">
                {order.customerName}
              </p>
              <p className="break-all text-xs text-gray-500">
                {order.customerPhone}
              </p>
              <p className="break-all text-xs text-gray-500">
                {order.customerEmail}
              </p>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2 text-xs sm:text-sm">
              <div>
                <dt className="text-gray-400">Qty</dt>
                <dd className="font-semibold text-gray-800">{order.quantity}</dd>
              </div>
              <div>
                <dt className="text-gray-400">Total</dt>
                <dd className="font-medium text-gray-800">
                  ₹{order.totalPayable}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-400">Supplier payout</dt>
                <dd className="font-medium text-gray-800">
                  ₹{order.supplierPayoutAmount}
                  <span className="ml-1 text-xs font-normal text-gray-500">
                    ({order.supplierPayoutStatus})
                  </span>
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-400">Payment</dt>
                <dd>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      paymentStyles[order.paymentStatus] ??
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-400">Submitted</dt>
                <dd className="text-gray-600 break-words">
                  {order.submittedAt
                    ? moment(order.submittedAt).format("DD MMM YYYY, hh:mm A")
                    : "—"}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {/* md+: scrollable table */}
      <div className="hidden min-w-0 w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 [-ms-overflow-style:auto] [scrollbar-width:thin] md:block">
        <table className="w-full min-w-[52rem] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-2 py-3 sm:px-4">Invoice</th>
              <th className="px-2 py-3 sm:px-4">Customer</th>
              <th className="px-2 py-3 sm:px-4">Qty</th>
              <th className="px-2 py-3 sm:px-4">Total Payable</th>
              <th className="px-2 py-3 sm:px-4">Supplier Payout</th>
              <th className="px-2 py-3 sm:px-4">Order Status</th>
              <th className="px-2 py-3 sm:px-4">Payment</th>
              <th className="px-2 py-3 sm:px-4">Submitted At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {orders.map((order) => (
              <tr
                key={order.orderId}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-2 py-3 sm:px-4">
                  <p className="font-bold whitespace-nowrap text-gray-800">
                    {order.invoiceNumber}
                  </p>
                  <p className="mt-0.5 max-w-[160px] truncate text-sm text-gray-400">
                    {order.orderId}
                  </p>
                </td>
                <td className="min-w-0 max-w-[14rem] px-2 py-3 sm:px-4">
                  <p className="break-words font-medium text-gray-800">
                    {order.customerName}
                  </p>
                  <p className="break-all text-sm text-gray-400">
                    {order.customerPhone}
                  </p>
                  <p className="break-all text-sm text-gray-400">
                    {order.customerEmail}
                  </p>
                </td>
                <td className="px-2 py-3 font-semibold text-gray-700 sm:px-4">
                  {order.quantity}
                </td>
                <td className="px-2 py-3 font-medium text-gray-800 sm:px-4">
                  ₹{order.totalPayable}
                </td>
                <td className="px-2 py-3 sm:px-4">
                  <p className="font-medium text-gray-800">
                    ₹{order.supplierPayoutAmount}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {order.supplierPayoutStatus}
                  </p>
                </td>
                <td className="px-2 py-3 sm:px-4">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      statusStyles[order.orderStatus] ??
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-2 py-3 sm:px-4">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      paymentStyles[order.paymentStatus] ??
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="whitespace-nowrap px-2 py-3 text-gray-500 sm:px-4">
                  {order.submittedAt
                    ? moment(order.submittedAt).format("DD MMM YYYY, hh:mm A")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
