import { useState, useEffect, useCallback } from "react";
import {
  fetchNdrCases,
  ndrReattempt,
  ndrRto,
  trackShipment,
} from "../services/prodile/profile.service";

const STATUS_TABS = ["All", "created", "action_pending", "reattempt", "rto", "closed"];
const TAB_LABELS = {
  All: "All",
  created: "Created",
  action_pending: "Action Pending",
  reattempt: "Re-attempt",
  rto: "RTO",
  closed: "Closed",
};

const STATUS_COLORS = {
  created: "bg-yellow-100 text-yellow-800",
  action_pending: "bg-orange-100 text-orange-800",
  reattempt: "bg-blue-100 text-blue-800",
  rto: "bg-red-100 text-red-800",
  closed: "bg-green-100 text-green-800",
};

export default function RtoReturnsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [trackingModal, setTrackingModal] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const loadCases = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (activeTab !== "All") params.status = activeTab;
      const res = await fetchNdrCases(params);
      setCases(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load NDR cases:", err);
      setCases([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadCases();
  }, [loadCases]);

  const handleReattempt = async (ndr) => {
    if (!ndr.awb) return alert("No AWB found for this NDR case");
    setActionLoading(ndr.ndr_id);
    try {
      await ndrReattempt(ndr.awb);
      alert("Re-attempt initiated successfully");
      loadCases();
    } catch (err) {
      alert("Failed to initiate re-attempt: " + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(null);
    }
  };

  const handleRto = async (ndr) => {
    if (!ndr.awb) return alert("No AWB found for this NDR case");
    if (!confirm("Are you sure you want to initiate RTO for AWB: " + ndr.awb + "?")) return;
    setActionLoading(ndr.ndr_id);
    try {
      await ndrRto(ndr.awb);
      alert("RTO initiated successfully");
      loadCases();
    } catch (err) {
      alert("Failed to initiate RTO: " + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(null);
    }
  };

  const handleTrack = async (awb) => {
    if (!awb) return;
    setTrackingModal(awb);
    setTrackingLoading(true);
    setTrackingData(null);
    try {
      const res = await trackShipment([awb]);
      setTrackingData(res.data?.data || res.data);
    } catch (err) {
      console.error("Tracking failed:", err);
      setTrackingData({ error: err.response?.data?.message || err.message });
    } finally {
      setTrackingLoading(false);
    }
  };

  const getOrderInfo = (ndr) => {
    const order = ndr.order_item?.shopify_order;
    return {
      orderName: order?.shopify_order_name || order?.order_id || "—",
      product: ndr.order_item?.title || "—",
      sku: ndr.order_item?.sku || "—",
    };
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-4 pb-6">
      <div className="min-w-0">
        <h1 className="text-base font-semibold text-[#111] sm:text-lg">
          Manage RTO / Returns
        </h1>
        <h2 className="mt-1 text-sm leading-snug text-gray-600 sm:text-base">
          View and manage NDR cases, re-attempts, and RTO for your orders.
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : cases.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white py-12 text-center text-gray-500">
          No NDR cases found{activeTab !== "All" ? ` with status "${TAB_LABELS[activeTab]}"` : ""}.
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-lg border border-gray-200 bg-white md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
                  <th className="px-3 py-3">Order</th>
                  <th className="px-3 py-3">Product</th>
                  <th className="px-3 py-3">AWB</th>
                  <th className="px-3 py-3">Reason</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Remarks</th>
                  <th className="px-3 py-3">Created</th>
                  <th className="px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((ndr) => {
                  const info = getOrderInfo(ndr);
                  const isActioning = actionLoading === ndr.ndr_id;
                  return (
                    <tr key={ndr.ndr_id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-3 font-medium text-gray-800">{info.orderName}</td>
                      <td className="max-w-[10rem] px-3 py-3">
                        <div className="truncate text-gray-700">{info.product}</div>
                        <div className="text-xs text-gray-400">{info.sku}</div>
                      </td>
                      <td className="px-3 py-3">
                        {ndr.awb ? (
                          <button
                            onClick={() => handleTrack(ndr.awb)}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {ndr.awb}
                          </button>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-gray-600 capitalize">
                        {ndr.reason?.replace(/_/g, " ") || "—"}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            STATUS_COLORS[ndr.status] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {ndr.status?.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="max-w-[8rem] px-3 py-3 text-gray-500 truncate">
                        {ndr.remarks || "—"}
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-400">
                        {ndr.createdAt
                          ? new Date(ndr.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {ndr.status !== "closed" && ndr.status !== "rto" && (
                            <>
                              <button
                                onClick={() => handleReattempt(ndr)}
                                disabled={isActioning}
                                className="rounded bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                              >
                                {isActioning ? "..." : "Re-attempt"}
                              </button>
                              <button
                                onClick={() => handleRto(ndr)}
                                disabled={isActioning}
                                className="rounded bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                              >
                                {isActioning ? "..." : "RTO"}
                              </button>
                            </>
                          )}
                          {ndr.awb && (
                            <button
                              onClick={() => handleTrack(ndr.awb)}
                              className="rounded bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                            >
                              Track
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {cases.map((ndr) => {
              const info = getOrderInfo(ndr);
              const isActioning = actionLoading === ndr.ndr_id;
              return (
                <div key={ndr.ndr_id} className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{info.orderName}</p>
                      <p className="text-sm text-gray-500">{info.product}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        STATUS_COLORS[ndr.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ndr.status?.replace(/_/g, " ")}
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                    <div>
                      <dt className="text-gray-400">AWB</dt>
                      <dd className="font-medium text-blue-600">
                        {ndr.awb ? (
                          <button onClick={() => handleTrack(ndr.awb)} className="hover:underline">
                            {ndr.awb}
                          </button>
                        ) : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-400">Reason</dt>
                      <dd className="font-medium text-gray-700 capitalize">
                        {ndr.reason?.replace(/_/g, " ") || "—"}
                      </dd>
                    </div>
                    {ndr.remarks && (
                      <div className="col-span-2">
                        <dt className="text-gray-400">Remarks</dt>
                        <dd className="text-gray-600">{ndr.remarks}</dd>
                      </div>
                    )}
                  </dl>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {ndr.status !== "closed" && ndr.status !== "rto" && (
                      <>
                        <button
                          onClick={() => handleReattempt(ndr)}
                          disabled={isActioning}
                          className="rounded bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          {isActioning ? "..." : "Re-attempt"}
                        </button>
                        <button
                          onClick={() => handleRto(ndr)}
                          disabled={isActioning}
                          className="rounded bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          {isActioning ? "..." : "RTO"}
                        </button>
                      </>
                    )}
                    {ndr.awb && (
                      <button
                        onClick={() => handleTrack(ndr.awb)}
                        className="rounded bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                      >
                        Track
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Tracking Modal */}
      {trackingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Tracking — {trackingModal}
              </h3>
              <button
                onClick={() => { setTrackingModal(null); setTrackingData(null); }}
                className="text-2xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-5">
              {trackingLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : trackingData?.error ? (
                <p className="text-center text-red-500">{trackingData.error}</p>
              ) : trackingData ? (
                <TrackingTimeline data={trackingData} />
              ) : (
                <p className="text-center text-gray-500">No tracking data available.</p>
              )}
            </div>
            <div className="border-t px-5 py-3 text-right">
              <button
                onClick={() => { setTrackingModal(null); setTrackingData(null); }}
                className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Tracking Timeline Sub-component ────────────────────────────────────────── */
function TrackingTimeline({ data }) {
  let events = [];
  let shipmentInfo = null;

  if (data?.result) {
    const awbKey = Object.keys(data.result)[0];
    const awbData = data.result[awbKey]?.tracking_data;
    if (awbData) {
      events = awbData.shipment_track_activities || [];
      shipmentInfo = awbData.shipment_track?.[0] || null;
    }
  } else if (Array.isArray(data)) {
    events = data;
  } else if (data?.tracking_data?.shipment_track_activities) {
    events = data.tracking_data.shipment_track_activities;
    shipmentInfo = data.tracking_data.shipment_track?.[0] || null;
  }

  if (events.length === 0 && !shipmentInfo) {
    return <p className="text-center text-gray-500">No tracking events found.</p>;
  }

  return (
    <div className="space-y-4">
      {shipmentInfo && (
        <div className="rounded-lg bg-gray-50 p-3 text-sm space-y-1">
          <p><span className="font-medium text-gray-600">Status:</span> <span className="capitalize font-semibold text-gray-800">{shipmentInfo.current_status?.replace(/_/g, " ")}</span></p>
          {shipmentInfo.origin && <p><span className="font-medium text-gray-600">Origin:</span> {shipmentInfo.origin}</p>}
          {shipmentInfo.destination && <p><span className="font-medium text-gray-600">Destination:</span> {shipmentInfo.destination}</p>}
          {shipmentInfo.consignee_name && <p><span className="font-medium text-gray-600">Consignee:</span> {shipmentInfo.consignee_name}</p>}
        </div>
      )}
      <ol className="relative border-l-2 border-blue-200 ml-3">
        {events.map((ev, i) => (
          <li key={i} className="mb-6 ml-6">
            <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
            <div className="text-sm">
              <p className="font-medium text-gray-800">
                {ev.activity || ev.status || ev.Status || "Update"}
              </p>
              {(ev.location || ev.Location) && (
                <p className="text-xs text-gray-500">{ev.location || ev.Location}</p>
              )}
              {(ev.date || ev.Date || ev["sr-status-date"]) && (
                <p className="text-xs text-gray-400">
                  {new Date(ev.date || ev.Date || ev["sr-status-date"]).toLocaleString()}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
