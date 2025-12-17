/**
 * AmountInput Component
 * 
 * Styled input field for entering currency amounts with validation states.
 * Supports both editable and read-only modes.
 * 
 * @prop {string} value - Current input value
 * @prop {(value: string) => void} onChange - Callback when value changes (raw input string)
 * @prop {FocusEventHandler} [onBlur] - Optional callback when input loses focus
 * @prop {string} placeholder - Placeholder text (e.g., "0.00")
 * @prop {boolean} invalid - Whether to show error state (red border/ring)
 * @prop {boolean} [readOnly=false] - Whether input is read-only (for output field)
 * 
 * @example
 * <AmountInput
 *   value={amount}
 *   onChange={(e) => setAmount(e.target.value)}
 *   placeholder="0.00"
 *   invalid={showError}
 * />
 */

import type { FocusEventHandler } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder: string;
  invalid: boolean;
  readOnly?: boolean;
};

function AmountInput({ value, onChange, onBlur, placeholder, invalid, readOnly = false }: Readonly<Props>) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 bg-white/5 ${
        invalid ? "border-red-500/70 ring-2 ring-red-500/20" : "border-white/10"
      } ${readOnly ? "opacity-80" : ""}`}
    >
      <input
        type="text"
        inputMode="decimal"
        step="any"
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-500"
        placeholder={placeholder}
        aria-label={readOnly ? "Amount to receive" : "Amount to send"}
      />
    </div>
  );
}

export default AmountInput;

