# Problem 3 — Code Review & Refactor

## Issues / Anti-patterns
1. **Type safety gaps**: `getPriority(blockchain: any)` and `WalletBalance` missing a `blockchain` field → unsafe and inconsistent typing.
2. **Undefined variable**: `lhsPriority` in the filter is never declared; logic is broken.
3. **Filter logic unclear/incorrect**: Currently keeps balances only when `amount <= 0` and priority > -99; likely should keep supported chains with positive balances.
4. **Comparator incomplete**: Sort callback lacks a `0` return path; may return `undefined`, causing unstable ordering.
5. **useMemo deps incorrect**: `sortedBalances` depends on `prices` even though it doesn’t use it → unnecessary recompute.
6. **Price lookup unsafe**: `prices[balance.currency]` may be undefined → `NaN` usdValue.
7. **Formatting precision**: `toFixed()` with no digits defaults to 0 decimals; may lose precision.
8. **Key choice**: `key={index}` is unstable on reorder; use a stable key (e.g., currency).
9. **Priority switch verbosity**: Better expressed via a map with default.
10. **Children ignored**: `children` destructured but not rendered; either render or remove.

## Refactored Code (TypeScript, React)
```tsx
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo" | string;

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const priorityMap: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (chain: Blockchain) => priorityMap[chain] ?? -99;

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances(); // WalletBalance[]
  const prices = usePrices(); // Record<currency, number>

  const sortedBalances = useMemo(() => {
    return balances
      .filter((b) => getPriority(b.blockchain) > -99 && b.amount > 0) // keep supported & positive
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain)); // desc priority
  }, [balances]);

  const rows = useMemo(() => {
    return sortedBalances.map((balance) => {
      const price = prices?.[balance.currency] ?? 0;
      const usdValue = price * balance.amount;
      const formattedAmount = balance.amount.toLocaleString("en-US", {
        maximumFractionDigits: 6,
      });
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency} // stable key
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={formattedAmount}
        />
      );
    });
  }, [sortedBalances, prices]);

  return (
    <div {...rest}>
      {rows}
      {children}
    </div>
  );
};
```

### Improvements made
- Added `blockchain` to types; removed `any`.
- Fixed broken variable (`lhsPriority`) and clarified filter to include supported, positive balances.
- Completed comparator and removed unused dep (`prices`) from `sortedBalances`.
- Safe price lookup with default; stable keys for list.
- Better number formatting (locale, fractional digits).
- Priority via map with default; optionally render `children`.

