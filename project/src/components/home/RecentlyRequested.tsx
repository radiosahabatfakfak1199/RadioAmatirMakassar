import { AlertTriangle, Music } from 'lucide-react';
import type { RequestStatsState } from '@/hooks/useRequestStats';

export default function RecentlyRequested({ state }: { state: RequestStatsState }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
      <h2 className="text-lg font-semibold text-sidebar">Recently Requested</h2>

      {state.status === 'loading' && (
        <div className="mt-4 animate-pulse space-y-3" aria-label="Loading requests">
          <div className="h-12 rounded-2xl bg-accent-50" />
          <div className="h-12 rounded-2xl bg-accent-50" />
        </div>
      )}

      {state.status === 'error' && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-canvas px-4 py-3 text-sm text-sidebar">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Daftar request belum bisa dimuat.
        </div>
      )}

      {state.status === 'ready' && state.stats.recentlyPlayed.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100">
            <Music className="h-5 w-5 text-accent-700" aria-hidden="true" />
          </div>
          <p className="text-sm leading-relaxed text-accent-700">
            Belum ada lagu request yang diputar.
          </p>
        </div>
      )}

      {state.status === 'ready' && state.stats.recentlyPlayed.length > 0 && (
        <ul className="mt-4 divide-y divide-accent-100">
          {state.stats.recentlyPlayed.map((request) => (
            <li
              key={request.id}
              className="flex items-center gap-4 py-3 transition-colors hover:bg-accent-50/60"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-100">
                <Music className="h-4 w-4 text-accent-700" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-sidebar">{request.song}</p>
                <p className="truncate text-xs text-accent-700">Request dari {request.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
