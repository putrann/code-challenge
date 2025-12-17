import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  FALLBACK_PRICES,
  PRICE_URL,
  formatNumber,
  normalizePrices,
  sleep,
  type PriceEntry,
  type StatusState,
  type ToastState,
} from "./lib/utils";

// Lazy-loaded components for code-splitting
const AmountInput = lazy(() => import("./components/AmountInput"));
const TokenSelect = lazy(() => import("./components/TokenSelect"));
const RateRow = lazy(() => import("./components/RateRow"));
const StatusBadge = lazy(() => import("./components/StatusBadge"));
const Toast = lazy(() => import("./components/Toast"));

function App() {
  const pathIsRoot =
    typeof globalThis === "undefined" || !("location" in globalThis)
      ? true
      : globalThis.location?.pathname === "/";

  const [prices, setPrices] = useState<Map<string, number>>(new Map());
  const [tokens, setTokens] = useState<string[]>([]);
  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<StatusState>({ text: "Loading prices…", variant: "neutral" });
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({ message: "", variant: "success", visible: false });

  const applyPrices = useCallback(
    (entries: PriceEntry[], live: boolean) => {
      const map = new Map(entries.map((p) => [p.symbol, p.price]));
      const list = entries
        .map((p) => p.symbol)
        .filter((sym) => typeof map.get(sym) === "number")
        .sort((a, b) => a.localeCompare(b));

      setPrices(map);
      setTokens(list);

      const defaultFrom = list.includes("USDC") ? "USDC" : list[0];
      const defaultTo = list.find((t) => t !== defaultFrom) || list[0];
      setFromToken((prev) => (prev && list.includes(prev) ? prev : defaultFrom));
      setToToken((prev) => (prev && list.includes(prev) ? prev : defaultTo));

      const ts = new Date();
      setLastUpdated(`${live ? "Live" : "Fallback"} • ${ts.toLocaleTimeString()}`);
      setStatus({
        text: live ? "Live prices" : "Using fallback prices",
        variant: live ? "success" : "warning",
      });
    },
    []
  );

  const fetchPrices = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await fetch(PRICE_URL, { signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const normalized = normalizePrices(data);
        if (!normalized.length) throw new Error("Empty price feed");
        applyPrices(normalized, true);
      } catch (err) {
        console.warn("[prices] using fallback", err);
        applyPrices(FALLBACK_PRICES, false);
      }
    },
    [applyPrices]
  );

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);

    fetchPrices(controller.signal).finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [fetchPrices]);

  const rate = useMemo(() => {
    const fromPrice = prices.get(fromToken);
    const toPrice = prices.get(toToken);
    if (!fromPrice || !toPrice) return 0;
    return toPrice / fromPrice;
  }, [prices, fromToken, toToken]);

  const normalizeInputNumber = (val: string) => Number.parseFloat(val.replace(/,/g, ""));

  const parsedAmount = normalizeInputNumber(amount);
  const isValidAmount = Number.isFinite(parsedAmount) && parsedAmount > 0;
  const computedOutput = isValidAmount && rate ? parsedAmount * rate : "";

  const fromPriceUsd = prices.get(fromToken);
  const toPriceUsd = prices.get(toToken);

  function swapDirection() {
    setFromToken(toToken);
    setToToken(fromToken);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidAmount) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setIsLoading(true);
    await sleep(900 + Math.random() * 600);
    setIsLoading(false);
    const message = `Swapped ${formatNumber(parsedAmount, 6)} ${fromToken} → ${formatNumber(
      computedOutput,
      6
    )} ${toToken}`;
    setToast({ message, variant: "success", visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2200);
  }

  const isButtonDisabled = !isValidAmount || isLoading;

  const handleAmountChange = useCallback(
    (val: string) => {
      const numeric = val.replace(/,/g, "");
      if (numeric === "") {
        setAmount("");
        return;
      }
      const match = numeric.match(/^(\d*)(?:\.(\d{0,6}))?$/);
      if (!match) return;

      const [, intPart = "0", decPart] = match;
      const formattedInt = Number(intPart || "0").toLocaleString("en-US");
      const next = decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
      setAmount(next);
    },
    []
  );

  if (!pathIsRoot) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-900 text-slate-100">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
          <h1 className="text-2xl font-bold mb-3">404 — Page Not Found</h1>
          <p className="text-slate-300 mb-6">The page you’re looking for doesn’t exist.</p>
          <a
            className="inline-block rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-4 py-2 font-semibold text-slate-950 shadow-lg"
            href="/"
          >
            Back to Swap
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-slate-900/60 shadow-2xl backdrop-blur-lg p-7 sm:p-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6">
          <div>
            <p className="uppercase tracking-[0.12em] text-xs font-semibold text-cyan-300">
              Multi-chain
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Currency Swap</h1>
            <p className="text-slate-400">Swap any supported asset with live market pricing.</p>
          </div>
          <Suspense fallback={<div className="text-slate-400 text-sm">Loading…</div>}>
            <StatusBadge variant={status.variant} text={status.text} />
          </Suspense>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <span className="text-sm text-white font-semibold">Amount to send</span>
              <span className="text-xs text-slate-400">
                {fromPriceUsd ? `$${formatNumber(fromPriceUsd, 6)} / ${fromToken}` : "—"}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-center">
              <Suspense fallback={<div className="h-12 rounded-xl bg-white/10" />}>
                <AmountInput
                  value={amount}
                  onChange={handleAmountChange}
                  onBlur={() => setShowError(!isValidAmount && amount.trim() !== "")}
                  placeholder="0.00"
                  invalid={showError}
                />
              </Suspense>

              <Suspense fallback={<div className="h-12 rounded-xl bg-white/10" />}>
                <TokenSelect value={fromToken} onChange={setFromToken} tokens={tokens} prices={prices} />
              </Suspense>
            </div>
            {showError && (
              <p className="text-sm text-red-400 mt-2">Enter a valid amount greater than zero.</p>
            )}
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <button
              type="button"
              onClick={swapDirection}
              className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 text-white text-xl font-semibold shadow hover:translate-y-[-1px] transition"
              aria-label="Swap direction"
            >
              ⇅
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <span className="text-sm text-white font-semibold">Amount to receive</span>
              <span className="text-xs text-slate-400">
                {toPriceUsd ? `$${formatNumber(toPriceUsd, 6)} / ${toToken}` : "—"}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-center">
              <Suspense fallback={<div className="h-12 rounded-xl bg-white/10" />}>
                <AmountInput
                  value={computedOutput ? formatNumber(computedOutput, 6) : ""}
                  onChange={() => undefined}
                  readOnly
                  placeholder="0.00"
                  invalid={false}
                />
              </Suspense>

              <Suspense fallback={<div className="h-12 rounded-xl bg-white/10" />}>
                <TokenSelect value={toToken} onChange={setToToken} tokens={tokens} prices={prices} />
              </Suspense>
            </div>
          </div>

          <Suspense fallback={<div className="h-12 rounded-xl bg-white/10" />}>
            <RateRow rate={rate} fromToken={fromToken} toToken={toToken} lastUpdated={lastUpdated} />
          </Suspense>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`relative flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-4 py-3 text-base font-semibold uppercase tracking-wide text-slate-950 shadow-lg transition hover:shadow-indigo-500/40 ${
              isButtonDisabled ? "opacity-60 cursor-not-allowed hover:shadow-none" : ""
            }`}
          >
            <span className="btn-label">{isLoading ? "Swapping…" : "Confirm Swap"}</span>
            <span
              className={`w-4 h-4 rounded-full border-2 border-white/70 border-l-transparent ${
                isLoading ? "animate-spin opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />
          </button>
          <p className="text-xs text-slate-400 mt-1">
            We simulate execution with a short delay to mimic network latency.
          </p>
        </form>
      </div>

      <Suspense fallback={null}>
        <Toast toast={toast} />
      </Suspense>
    </div>
  );
}

export default App;

