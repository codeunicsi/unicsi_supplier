/**
 * shopifyOrderService.js
 *
 * API calls for Shopify orders (supplier side).
 * Uses the same `api` axios instance as all other supplier services,
 * so the Authorization header is sent automatically.
 */

import api from "../../api";

const BASE = "shopify-orders/supplier/orders";

/**
 * Fetch all Shopify orders routed to this supplier.
 * @param {string} [status] - Optional status filter
 * @param {number} [page=1]
 * @param {number} [limit=20]
 */
export const getShopifyOrders = (status = "", page = 1, limit = 20) => {
  const params = new URLSearchParams({ page, limit });
  if (status) params.set("status", status);
  return api.get(`${BASE}?${params.toString()}`);
};

/**
 * Accept a Shopify order (status: routed → accepted).
 * @param {string} orderId
 */
export const acceptShopifyOrder = (orderId) =>
  api.patch(`${BASE}/${orderId}/accept`);

/**
 * Mark a Shopify order as shipped + push tracking to Shopify.
 * @param {string} orderId
 * @param {string} trackingNumber
 * @param {string} [trackingCompany]
 */
export const shipShopifyOrder = (orderId, trackingNumber, trackingCompany = "") =>
  api.patch(`${BASE}/${orderId}/ship`, { trackingNumber, trackingCompany });
