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
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-4 py-3">Invoice</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Qty</th>
            <th className="px-4 py-3">Total Payable</th>
            <th className="px-4 py-3">Supplier Payout</th>
            <th className="px-4 py-3">Order Status</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Submitted At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {orders.map((order) => (
            <tr
              key={order.orderId}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Invoice */}
              <td className="px-4 py-3">
                <p className="font-bold text-gray-800 whitespace-nowrap">
                  {order.invoiceNumber}
                </p>
                <p className="text-sm text-gray-400 mt-0.5 truncate max-w-[160px]">
                  {order.orderId}
                </p>
              </td>
              {/* Customer */}
              <td className="px-4 py-3">
                <p className="font-medium text-gray-800">
                  {order.customerName}
                </p>
                <p className="text-sm text-gray-400">{order.customerPhone}</p>
                <p className="text-sm text-gray-400">{order.customerEmail}</p>
              </td>
              {/* Quantity */}
              <td className="px-4 py-3 text-gray-700 font-semibold">
                {order.quantity}
              </td>
              {/* Total Payable */}
              <td className="px-4 py-3 text-gray-800 font-medium">
                ₹{order.totalPayable}
              </td>
              {/* Supplier Payout */}
              <td className="px-4 py-3">
                <p className="text-gray-800 font-medium">
                  ₹{order.supplierPayoutAmount}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {order.supplierPayoutStatus}
                </p>
              </td>
              {/* Order Status */}
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    statusStyles[order.orderStatus] ??
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </td>
              {/* Payment Status */}
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    paymentStyles[order.paymentStatus] ??
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {order.submittedAt
                  ? moment(order.submittedAt).format("DD MMM YYYY, hh:mm A")
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
