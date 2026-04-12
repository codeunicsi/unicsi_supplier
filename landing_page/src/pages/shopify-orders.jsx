import { useEffect, useState } from "react";
import { getShopifyOrders } from "../services/shopifyOrders.service";

export default function ShopifyOrders() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getShopifyOrders();
        const list = res?.data?.data?.items ?? [];
        if (!cancelled) setItems(Array.isArray(list) ? list : []);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Failed to load Shopify orders.");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading Shopify orders…</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!items.length) {
    return <p className="text-gray-500 py-8 text-center">No Shopify orders yet</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Shopify Orders</h1>
      <table className="min-w-full border border-gray-200 rounded-lg text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 border-b">Shopify order</th>
            <th className="text-left p-3 border-b">Customer</th>
            <th className="text-left p-3 border-b">Total</th>
            <th className="text-left p-3 border-b">Status</th>
            <th className="text-left p-3 border-b">Line summary</th>
          </tr>
        </thead>
        <tbody>
          {items.map((order) => (
            <tr key={order.fulfillmentId} className="border-b border-gray-100">
              <td className="p-3">{order.shopifyOrderId}</td>
              <td className="p-3">{order.customerName ?? "—"}</td>
              <td className="p-3">
                {order.totalPrice != null
                  ? `${order.totalPrice}${order.currency ? ` ${order.currency}` : ""}`
                  : "—"}
              </td>
              <td className="p-3">{order.status}</td>
              <td className="p-3 max-w-md whitespace-pre-wrap text-gray-700">
                {order.lineSummary ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
