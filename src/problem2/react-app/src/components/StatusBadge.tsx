/**
 * StatusBadge Component
 * 
 * Displays a colored status badge indicating the current state of the app.
 * Used to show price feed status (live/fallback/loading).
 * 
 * @prop {string} variant - Badge style: "success" (green), "warning" (amber), "neutral" (gray)
 * @prop {string} text - Status message to display (e.g., "Live prices")
 * 
 * @example
 * <StatusBadge variant="success" text="Live prices" />
 * <StatusBadge variant="warning" text="Using fallback prices" />
 * <StatusBadge variant="neutral" text="Loading prices…" />
 */

type Props = {
  variant: "success" | "warning" | "neutral";
  text: string;
};

function StatusBadge({ variant, text }: Readonly<Props>) {
  let className = "border-white/10 bg-white/5 text-slate-200";
  if (variant === "success") {
    className = "border-emerald-400/60 bg-emerald-900/60 text-emerald-100";
  } else if (variant === "warning") {
    className = "border-amber-400/60 bg-amber-900/60 text-amber-100";
  }

  return (
    <span className={`px-3 py-2 rounded-full border text-sm font-semibold ${className}`}>
      {text}
    </span>
  );
}

export default StatusBadge;

