/**
 * Toast Component
 * 
 * Displays temporary notification messages in the bottom-right corner.
 * Auto-dismisses after a timeout (controlled by parent component).
 * 
 * @prop {ToastState} toast - Toast state object with:
 *   - message: string - Text to display
 *   - variant: "success" | "error" - Style variant
 *   - visible: boolean - Whether toast is shown
 * 
 * @example
 * const [toast, setToast] = useState({
 *   message: "Swap successful!",
 *   variant: "success",
 *   visible: true
 * });
 * <Toast toast={toast} />
 */

import type { ToastState } from "../lib/utils";

function Toast({ toast }: Readonly<{ toast: ToastState }>) {
  if (!toast.visible) return null;
  const isSuccess = toast.variant === "success";
  const className = isSuccess
    ? "border-emerald-400/50 bg-emerald-900/70 text-emerald-50"
    : "border-red-400/50 bg-red-900/70 text-red-50";

  return (
    <output
      className={`fixed bottom-6 right-6 rounded-xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur ${className}`}
      aria-live="polite"
    >
      {toast.message}
    </output>
  );
}

export default Toast;

