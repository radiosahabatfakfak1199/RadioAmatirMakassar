import { AlertTriangle, CalendarDays } from 'lucide-react';
import type { ProgramsState } from '@/hooks/usePrograms';
import { isProgramToday } from '@/lib/dates';

export default function DailyMix({ state }: { state: ProgramsState }) {
  const todayPrograms = state.status === 'ready' ? state.programs.filter((program) => isProgramToday(program.day)) : [];

  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
      <h2 className="text-lg font-semibold text-sidebar">Daily Mix</h2>

      {state.status === 'loading' && (
        <div className="mt-4 animate-pulse space-y-3" aria-label="Loading programs">
          <div className="h-16 rounded-2xl bg-accent-50" />
        </div>
      )}

      {state.status === 'error' && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-canvas px-4 py-3 text-sm text-sidebar">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Jadwal acara belum bisa dimuat.
        </div>
      )}

      {state.status === 'ready' && todayPrograms.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100">
            <CalendarDays className="h-5 w-5 text-accent-700" aria-hidden="true" />
          </div>
          <p className="text-sm leading-relaxed text-accent-700">Tidak ada acara untuk hari ini.</p>
        </div>
      )}

      {state.status === 'ready' && todayPrograms.length > 0 && (
        <ul className="mt-4 space-y-3">
          {todayPrograms.map((program) => (
            <li
              key={program.id}
              className="rounded-2xl bg-accent-50 p-4 transition-colors hover:bg-accent-100/70"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-sidebar">{program.title}</p>
                {program.time && (
                  <span className="text-xs font-medium text-accent-700">{program.time}</span>
                )}
              </div>
              {program.host && <p className="mt-1 text-xs text-accent-700">Bersama {program.host}</p>}
              {program.description && (
                <p className="mt-2 text-sm leading-relaxed text-sidebar/80">{program.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
