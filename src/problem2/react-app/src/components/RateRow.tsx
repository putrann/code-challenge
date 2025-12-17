/**
 * RateRow Component
 * 
 * Displays the current exchange rate between two tokens and the last update time.
 * Shows "1 FROM ≈ X.XX TO" format with timestamp badge.
 * 
 * @prop {number} rate - Exchange rate (toPrice / fromPrice)
 * @prop {string} fromToken - Source token symbol (e.g., "USDC")
 * @prop {string} toToken - Destination token symbol (e.g., "ETH")
 * @prop {string} lastUpdated - Timestamp string (e.g., "Live • 14:32:01")
 * 
 * @example
 * <RateRow
 *   rate={0.00032}
 *   fromToken="USDC"
 *   toToken="ETH"
 *   lastUpdated="Live • 14:32:01"
 * />
 */

import { formatNumber } from "../lib/utils";

type Props = {
  rate: number;
  fromToken: string;
  toToken: string;
  lastUpdated: string;
};

function RateRow({ rate, fromToken, toToken, lastUpdated }: Readonly<Props>) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <div>
        <p className="text-xs text-slate-400">Rate</p>
        <p className="text-white font-semibold mt-1">
          {rate ? `1 ${fromToken} ≈ ${formatNumber(rate, 6)} ${toToken}` : "—"}
        </p>
      </div>
      <span className="text-xs text-slate-300 px-3 py-1 rounded-full border border-white/10 bg-white/5">
        {lastUpdated || "Updating…"}
      </span>
    </div>
  );
}

export default RateRow;

