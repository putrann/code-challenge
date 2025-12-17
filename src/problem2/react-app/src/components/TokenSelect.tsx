/**
 * TokenSelect Component
 * 
 * Dropdown selector for choosing a cryptocurrency token with icon preview.
 * Displays token symbol, current price, and icon (with lazy loading + fallback).
 * 
 * @prop {string} value - Currently selected token symbol (e.g., "USDC")
 * @prop {function} onChange - Callback when user selects a different token
 * @prop {string[]} tokens - Array of available token symbols
 * @prop {Map<string, number>} prices - Map of token symbols to USD prices
 * 
 * @example
 * <TokenSelect
 *   value={fromToken}
 *   onChange={setFromToken}
 *   tokens={["USDC", "ETH", "BTC"]}
 *   prices={priceMap}
 * />
 */

import { buildIconUrl, formatNumber } from "../lib/utils";

const FALLBACK_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23374151' stroke='%2356647a' stroke-width='4'/%3E%3Ctext x='32' y='38' text-anchor='middle' font-family='Inter, sans-serif' font-size='20' fill='%23cbd5e1'%3F%3E%3F%3C/text%3E%3C/svg%3E";

type Props = {
  value: string;
  onChange: (value: string) => void;
  tokens: string[];
  prices: Map<string, number>;
};

function TokenSelect({ value, onChange, tokens, prices }: Readonly<Props>) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      {value && (
        <img
          src={buildIconUrl(value)}
          alt={value}
          className="w-7 h-7 rounded-full border border-white/10"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== FALLBACK_ICON) {
              target.src = FALLBACK_ICON;
            }
          }}
        />
      )}
      <select
        className="bg-transparent text-white font-semibold outline-none cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {tokens.map((sym) => (
          <option key={sym} value={sym} className="text-slate-900">
            {sym} · ${formatNumber(prices.get(sym) ?? 0, 6)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TokenSelect;

