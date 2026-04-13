import { useState, useEffect, useRef } from "react";
import Pagination from "../ui/Pagination";
import FiltersBar from "./FiltersBar";
import ProductTable from "./ProductTable";
import Tabs from "./Tabs";
import BulkOrderTable from "./Bulkordertable";
import {
  getBulkOrders,
  uploadBiltiDetails,
} from "../services/prodile/profile.service";
import api from "../api.jsx";

const ORDER_TABS = [
  "On Hold",
  "Pending",
  "To Dispatched",
  "Ready To Ship",
  "Shipped",
  "Cancelled",
  "All",
];

const ORDER_HEADERS = [
  "Product Details",
  "Pushed Date & Time",
  "C-Code",
  "Clout Price",
  "More Details",
];

export default function ManageOrder() {
  const [activeSection, setActiveSection] = useState("orders");
  const [bulkOrders, setBulkOrders] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState(null);

  // upload state per orderId
  const [uploadState, setUploadState] = useState({});
  /** @type {{ [orderId: string]: { loading?: boolean; error?: string | null; labelUrl?: string } }} */
  const [shipmentState, setShipmentState] = useState({});
  const fileRefs = useRef({});

  useEffect(() => {
    if (activeSection !== "bulk") return;
    const fetchBulkOrders = async () => {
      setBulkLoading(true);
      setBulkError(null);
      try {
        const res = await getBulkOrders();
        const orders = res?.data?.data?.orders ?? [];
        setBulkOrders(orders);
        // Initialize shipment state from existing order data
        const initialShipmentState = {};
        orders.forEach((order) => {
          if (order.waybill || order.labelUrl) {
            initialShipmentState[order.orderId] = {
              loading: false,
              error: null,
              waybill: order.waybill || null,
              labelUrl: order.labelUrl || null,
            };
          }
        });
        setShipmentState(initialShipmentState);
      } catch (err) {
        setBulkError(err?.message || "Failed to fetch bulk orders.");
      } finally {
        setBulkLoading(false);
      }
    };
    fetchBulkOrders();
  }, [activeSection]);

  // Append newly selected files and generate preview URLs
  const handleFileChange = (orderId, newFiles) => {
    const newFileArray = Array.from(newFiles);

    // Generate object URLs for preview
    const newPreviews = newFileArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setUploadState((prev) => {
      const existing = prev[orderId]?.previews || [];
      return {
        ...prev,
        [orderId]: {
          ...prev[orderId],
          files: [...(prev[orderId]?.files || []), ...newFileArray],
          previews: [...existing, ...newPreviews],
          error: null,
          success: false,
        },
      };
    });
  };

  // Remove a single image from the list
  const handleRemoveImage = (orderId, index) => {
    setUploadState((prev) => {
      const state = prev[orderId] || {};
      const previews = [...(state.previews || [])];
      const files = [...(state.files || [])];

      // Revoke object URL to free memory
      URL.revokeObjectURL(previews[index]?.url);

      previews.splice(index, 1);
      files.splice(index, 1);

      return {
        ...prev,
        [orderId]: { ...state, previews, files, error: null, success: false },
      };
    });
  };

  const handleNumberChange = (orderId, value) => {
    setUploadState((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        number: value,
        error: null,
        success: false,
      },
    }));
  };

  const handleUpload = async (orderId) => {
    const state = uploadState[orderId] || {};
    const { files = [], number } = state;

    if (!files.length) {
      return setUploadState((prev) => ({
        ...prev,
        [orderId]: { ...state, error: "Select at least one file." },
      }));
    }
    if (!number) {
      return setUploadState((prev) => ({
        ...prev,
        [orderId]: { ...state, error: "Enter Bilti number." },
      }));
    }

    setUploadState((prev) => ({
      ...prev,
      [orderId]: { ...state, uploading: true, error: null, success: false },
    }));

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("biltiImages", file));
      formData.append("bilti_number", number);
      formData.append("order_id", orderId);

      await uploadBiltiDetails(formData);

      // Revoke all preview URLs on success
      (uploadState[orderId]?.previews || []).forEach((p) =>
        URL.revokeObjectURL(p.url),
      );

      setUploadState((prev) => ({
        ...prev,
        [orderId]: {
          files: [],
          previews: [],
          number: "",
          success: true,
          uploading: false,
        },
      }));

      if (fileRefs.current[orderId]) fileRefs.current[orderId].value = "";
    } catch (err) {
      setUploadState((prev) => ({
        ...prev,
        [orderId]: {
          ...prev[orderId],
          uploading: false,
          error: err?.response?.data?.message || "Upload failed.",
        },
      }));
    }
  };

  const handleCreateShipment = async (orderId) => {
    setShipmentState((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], loading: true, error: null },
    }));
    try {
      const { data } = await api.post(
        `suppliers/supplier/orders/${orderId}/create-shipment`,
      );
      if (!data?.success) {
        throw new Error(data?.message || "Create shipment failed");
      }
      setShipmentState((prev) => ({
        ...prev,
        [orderId]: {
          loading: false,
          error: null,
          waybill: data.waybill || null,
          labelUrl: data.label_url,
        },
      }));
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Create shipment failed.";
      setShipmentState((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], loading: false, error: msg },
      }));
    }
  };

  return (
    <div>
      {/* Section tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveSection("orders")}
          className={`px-4 py-2 text-sm font-semibold ${
            activeSection === "orders"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Manage Orders
        </button>
        <button
          onClick={() => setActiveSection("bulk")}
          className={`px-4 py-2 text-sm font-semibold ${
            activeSection === "bulk"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Manage Bulk Orders
        </button>
      </div>

      {activeSection === "orders" ? (
        <>
          <h2 className="text-lg font-semibold mb-4">Manage Orders</h2>
          <Tabs tabItems={ORDER_TABS} />
          <FiltersBar type="order" />
          <ProductTable TableHeader={ORDER_HEADERS} />
          <Pagination />
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">Manage Bulk Orders</h2>

          {bulkLoading ? (
            <p className="text-center py-6 text-gray-500">Loading...</p>
          ) : bulkError ? (
            <p className="text-center py-6 text-red-500">{bulkError}</p>
          ) : bulkOrders.length === 0 ? (
            <p className="text-center py-6 text-gray-400">No orders found</p>
          ) : (
            <>
              {bulkOrders.map((order) => {
                const orderId = order.orderId;
                const state = uploadState[orderId] || {};
                const previews = state.previews || [];

                return (
                  <div
                    key={orderId}
                    className="mb-4 border border-gray-300 rounded-lg overflow-hidden"
                  >
                    {/* Order header */}
                    <div className="bg-gray-100 px-4 py-2 flex justify-between">
                      <span className="text-sm font-semibold">
                        Order #{orderId}
                      </span>
                      <span className="text-xs text-gray-500">
                        {order.orderStatus ?? order.status}
                      </span>
                    </div>

                    {/* Order table */}
                    <div className="p-3">
                      <BulkOrderTable orders={[order]} />
                    </div>

                    {/* Shipment + bilti */}
                    <div className="border-t bg-gray-50 p-3 space-y-3">
                      <div className="flex flex-wrap gap-2 items-center">
                        {!shipmentState[orderId]?.waybill ? (
                          <button
                            type="button"
                            onClick={() => handleCreateShipment(orderId)}
                            disabled={shipmentState[orderId]?.loading}
                            className="bg-emerald-600 text-white px-3 py-2 text-xs rounded hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {shipmentState[orderId]?.loading
                              ? "Creating…"
                              : "Create Shipment"}
                          </button>
                        ) : (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                            AWB: {shipmentState[orderId].waybill}
                          </span>
                        )}
                        {shipmentState[orderId]?.labelUrl ? (
                          <a
                            href={shipmentState[orderId].labelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 text-xs rounded border border-blue-600 text-blue-600 hover:bg-blue-50"
                          >
                            Download Label
                          </a>
                        ) : null}
                      </div>
                      {shipmentState[orderId]?.error ? (
                        <p className="text-red-500 text-xs">
                          {shipmentState[orderId].error}
                        </p>
                      ) : null}

                      {/* Image previews */}
                      {previews.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {previews.map((preview, idx) => (
                            <div
                              key={idx}
                              className="relative w-16 h-16 rounded border border-gray-300 overflow-hidden group shadow-sm"
                            >
                              <img
                                src={preview.url}
                                alt={preview.name}
                                className="w-full h-full object-cover"
                              />
                              {/* Tooltip with filename on hover */}
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                {preview.name}
                              </div>
                              {/* Remove button */}
                              <button
                                onClick={() => handleRemoveImage(orderId, idx)}
                                className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                title="Remove"
                              >
                                ✕
                              </button>
                            </div>
                          ))}

                          {/* Count badge */}
                          <div className="w-16 h-16 flex flex-col items-center justify-center rounded border border-dashed border-gray-300 text-gray-400 text-xs text-center leading-tight">
                            <span className="text-lg font-bold text-gray-600">
                              {previews.length}
                            </span>
                            image{previews.length !== 1 ? "s" : ""}
                          </div>
                        </div>
                      )}

                      {/* Controls row */}
                      <div className="flex gap-3 flex-wrap items-end">
                        {/* File picker */}
                        <div>
                          <button
                            type="button"
                            onClick={() => fileRefs.current[orderId]?.click()}
                            className="flex items-center gap-1.5 border border-dashed border-blue-400 text-blue-600 px-3 py-2 rounded text-xs hover:bg-blue-50 transition-colors"
                          >
                            {/* Upload icon */}
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0L8 8m4-4l4 4"
                              />
                            </svg>
                            {previews.length > 0
                              ? "Add more images"
                              : "Choose images"}
                          </button>
                          <input
                            ref={(el) => (fileRefs.current[orderId] = el)}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              handleFileChange(orderId, e.target.files);
                              e.target.value = ""; // reset so same file can be added again
                            }}
                          />
                        </div>

                        {/* AWB number */}
                        <input
                          type="text"
                          value={state.number || ""}
                          onChange={(e) =>
                            handleNumberChange(orderId, e.target.value)
                          }
                          placeholder="Bilti number"
                          className="border px-3 py-2 text-xs rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />

                        {/* Submit */}
                        <button
                          onClick={() => handleUpload(orderId)}
                          disabled={state.uploading}
                          className="bg-blue-600 text-white px-4 py-2 text-xs rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        >
                          {state.uploading ? (
                            <span className="flex items-center gap-1.5">
                              <svg
                                className="w-3 h-3 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                              Uploading…
                            </span>
                          ) : (
                            "Upload"
                          )}
                        </button>
                      </div>

                      {/* Feedback */}
                      {state.error && (
                        <p className="text-red-500 text-xs">{state.error}</p>
                      )}
                      {state.success && (
                        <p className="text-green-600 text-xs font-medium">
                          ✓ Uploaded successfully.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              <Pagination />
            </>
          )}
        </>
      )}
    </div>
  );
}
