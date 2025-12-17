const NotFound = () => {
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
};

export default NotFound;

