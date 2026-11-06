import { Pause, Play, Radio } from 'lucide-react';

interface StickyPlayerProps {
  stationName: string | null;
  isLive: boolean;
  canPlay: boolean;
  playing: boolean;
  failed: boolean;
  onToggle: () => void;
}

export default function StickyPlayer({
  stationName,
  isLive,
  canPlay,
  playing,
  failed,
  onToggle,
}: StickyPlayerProps) {
  let statusText = 'Siaran belum dimulai';
  if (!canPlay) statusText = 'Stream belum aktif';
  if (failed) statusText = 'Stream tidak dapat diputar';

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-sidebar text-white shadow-[0_-8px_24px_-12px_rgba(36,54,69,0.5)] lg:left-64">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={onToggle}
          disabled={!canPlay}
          aria-label={playing ? 'Pause stream' : 'Play stream'}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sidebar transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/60"
        >
          {playing ? (
            <Pause className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Play className="h-5 w-5 translate-x-px" aria-hidden="true" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" />
                LIVE
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                OFF AIR
              </span>
            )}
            <span className="flex items-center gap-1.5 truncate text-sm font-medium">
              <Radio className="h-3.5 w-3.5 shrink-0 text-accent-300" aria-hidden="true" />
              <span className="truncate">{stationName ?? 'Amateur Radio'}</span>
            </span>
          </div>
          <p className="mt-0.5 truncate text-sm text-accent-100">{statusText}</p>
        </div>
      </div>
    </div>
  );
}
