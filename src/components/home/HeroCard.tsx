import { Headphones, MessageCircle, Play, Pause } from 'lucide-react';

interface HeroCardProps {
  greeting: string;
  imageUrl: string;
  canPlay: boolean;
  playing: boolean;
  onToggle: () => void;
  whatsapp: string | null;
}

export default function HeroCard({
  greeting,
  imageUrl,
  canPlay,
  playing,
  onToggle,
  whatsapp,
}: HeroCardProps) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-soft">
      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_minmax(0,1fr)] md:items-center md:gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-accent-700">{greeting}, Listener!</p>
            <h1 className="text-3xl font-semibold leading-tight text-sidebar sm:text-4xl">
              Selamat datang di siaran kami
            </h1>
            <p className="text-base leading-relaxed text-accent-700">
              Dengarkan siaran langsung, kirim request lagu, dan temani harimu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onToggle}
              disabled={!canPlay}
              aria-label={playing ? 'Pause stream' : 'Play stream'}
              className="inline-flex items-center gap-2 rounded-2xl bg-sidebar px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-sidebar-light active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-accent-300 disabled:text-sidebar"
            >
              {playing ? (
                <Pause className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4" aria-hidden="true" />
              )}
              {playing ? 'Pause' : 'Play'}
            </button>

            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-accent-300 px-5 py-3 text-sm font-semibold text-sidebar transition-colors hover:bg-accent-50"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Request Lagu
              </a>
            )}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-accent-100">
          <img
            src={imageUrl}
            alt="Studio microphone"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-sidebar backdrop-blur">
            <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
            Siaran Sahabat
          </div>
        </div>
      </div>
    </section>
  );
}
