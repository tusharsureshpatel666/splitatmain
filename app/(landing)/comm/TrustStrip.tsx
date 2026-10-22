const metrics = [
  { value: "01", label: "One flexible platform" },
  { value: "24/7", label: "Space on your schedule" },
  { value: "100%", label: "Business-first thinking" },
  { value: "∞", label: "Ways to make space work" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-black/[.07] bg-purple-500">
      <div className="container-shell grid grid-cols-2 divide-x divide-y divide-white sm:grid-cols-4 sm:divide-y-0">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="px-4 py-6 first:pl-0 sm:px-7 sm:py-7"
          >
            <p className="text-2xl font-semibold text-white tracking-[-.06em] sm:text-3xl">
              {item.value}
            </p>
            <p className="mt-1.5 text-[11px] text-white sm:text-xs">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
