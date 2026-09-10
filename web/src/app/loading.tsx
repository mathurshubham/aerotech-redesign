/**
 * Route-level loading state. A hairline skeleton in token greys — no spinner,
 * no motion, so it stays quiet under `prefers-reduced-motion`.
 */
export default function Loading() {
  return (
    <div className="container-site py-16 lg:py-28" aria-busy="true">
      <p className="eyebrow" role="status">
        Loading
      </p>
      <div
        aria-hidden="true"
        className="mt-6 flex max-w-[46rem] flex-col gap-4"
      >
        <div className="h-10 w-4/5 rounded-lg bg-surface-2" />
        <div className="h-4 w-full rounded-lg bg-surface-2" />
        <div className="h-4 w-11/12 rounded-lg bg-surface-2" />
        <div className="h-4 w-2/3 rounded-lg bg-surface-2" />
      </div>
    </div>
  );
}
