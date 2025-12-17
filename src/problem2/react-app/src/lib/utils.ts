/**
 * Utility Functions & Constants
 * 
 * Shared utilities, types, and constants used across the app.
 */

// API endpoint for fetching live token prices
export const PRICE_URL = "https://interview.switcheo.com/prices.json";

// Base URL for token icon images
export const ICON_BASE = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

// TypeScript type definitions
export type PriceEntry = { symbol: string; price: number };
export type StatusState = { text: string; variant: "neutral" | "success" | "warning" };
export type ToastState = { message: string; variant: "success" | "error"; visible: boolean };

/**
 * Fallback prices used when API is unavailable
 */
export const FALLBACK_PRICES: PriceEntry[] = [
  { symbol: "USDC", price: 1 },
  { symbol: "USDT", price: 1 },
  { symbol: "SWTH", price: 0.005 },
  { symbol: "ETH", price: 3200 },
  { symbol: "BTC", price: 70000 },
  { symbol: "SOL", price: 160 },
];

/**
 * Format a number for display with locale-aware formatting
 * @param value - Number or string to format
 * @param maxDigits - Maximum decimal places (default: 6)
 * @returns Formatted string (e.g., "1,234.56")
 */
export const formatNumber = (value: number | string, maxDigits = 6) =>
  Number(value).toLocaleString("en-US", {
    maximumFractionDigits: maxDigits,
    minimumFractionDigits: 0,
  });

/**
 * Build full URL for token icon SVG
 * @param symbol - Token symbol (e.g., "USDC")
 * @returns Full URL to token icon
 */
export const buildIconUrl = (symbol: string) => `${ICON_BASE}${symbol}.svg`;

/**
 * Normalize price data from API into consistent format
 * Handles both array format [{currency, price}] and object format {symbol: price}
 * @param data - Raw API response (unknown format)
 * @returns Array of normalized price entries
 */
export const normalizePrices = (data: unknown): PriceEntry[] => {
  if (!data) return [];
  if (Array.isArray(data)) {
    return (data as any[])
      .filter((item) => item?.currency && typeof item.price === "number")
      .map((item) => ({ symbol: item.currency, price: item.price }));
  }
  return Object.entries(data as Record<string, unknown>)
    .filter(([, price]) => typeof price === "number")
    .map(([symbol, price]) => ({ symbol, price: price as number }));
};

/**
 * Async sleep utility for simulating delays
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after delay
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

