# Currency Swap (React + Vite + Tailwind)

This is a React/Tailwind implementation of the currency swap form. It fetches live token prices, shows token icons, validates input, computes rates, and simulates a swap with loading + toast feedback.

## Quick start

```bash
cd src/problem2/react-app
npm install --cache ./.npm-cache   # already installed in this repo, but safe to re-run
npm run dev                        # start dev server
npm run build                      # production build check
```

The build output goes to `dist/`.

## Notes
- Prices are loaded from `https://interview.switcheo.com/prices.json` with a 4.5s timeout; a local fallback price list is used if the fetch fails.
- Token icons are pulled from the Switcheo token icon repo (SVG URLs).
- Form validation: amount must be > 0; error state highlights the input.
- Swap direction button flips the selected tokens.
- Submit simulates execution with a short delay, shows a loading spinner, and displays a toast result.

## File map
- `src/App.jsx` — main UI/logic
- `src/index.css` — Tailwind base + global gradient background
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

/**
 * App Component - Currency Swap Interface
 * 
 * Main application component for swapping between different cryptocurrency tokens.
 * Features:
 * - Fetches live prices from API with fallback support
 * - Real-time exchange rate calculation
 * - Input validation and error handling
 * - Lazy-loaded components for optimized bundle size
 * - Simulated swap execution with loading states
 * - Toast notifications for user feedback
 * 
 * Flow:
 * 1. Load prices from API (or fallback if unavailable)
 * 2. User enters amount and selects tokens
 * 3. Calculate exchange rate and output amount
 * 4. Validate and execute swap with simulated delay
 * 5. Show success toast notification
 * 
 * State Management:
 * - prices: Map of token symbols to USD prices
 * - tokens: Array of available token symbols (filtered by price availability)
 * - fromToken/toToken: Selected source and destination tokens
 * - amount: User-entered amount to swap
 * - status: Price feed status (live/fallback/loading)
 * - isLoading: Swap execution in progress
 * - showError: Input validation error display
 * - toast: Notification state
 */