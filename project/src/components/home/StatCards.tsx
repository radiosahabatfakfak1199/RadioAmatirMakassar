interface StatItem {
  label: string;
  value: string;
}

export default function StatCards({ items }: { items: StatItem[] }) {
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Station statistics">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl bg-white p-5 shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-accent-700">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold text-sidebar">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
