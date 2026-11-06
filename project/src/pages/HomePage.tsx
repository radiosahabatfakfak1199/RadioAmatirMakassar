import { useMemo } from 'react';
import HeroCard from '@/components/home/HeroCard';
import StatCards from '@/components/home/StatCards';
import StickyPlayer from '@/components/home/StickyPlayer';
import RecentlyRequested from '@/components/home/RecentlyRequested';
import DailyMix from '@/components/home/DailyMix';
import type { SiteSettingsState } from '@/hooks/useSiteSettings';
import { usePrograms } from '@/hooks/usePrograms';
import { useRequestStats } from '@/hooks/useRequestStats';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { getGreeting, isProgramToday } from '@/lib/dates';

const HERO_IMAGE_URL =
  'https://images.pexels.com/photos/484/sound-speaker-radio-microphone.jpg?auto=compress&cs=tinysrgb&h=650&w=940';

const UNAVAILABLE = '-';

interface HomePageProps {
  settingsState: SiteSettingsState;
}

export default function HomePage({ settingsState }: HomePageProps) {
  const settings = settingsState.status === 'ready' ? settingsState.settings : null;
  const streamUrl = settings?.stream_url ?? null;
  const isLive = settings?.is_live ?? false;
  const canPlay = Boolean(streamUrl);

  const { audioRef, playing, failed, toggle } = useAudioPlayer(streamUrl);
  const { state: programsState } = usePrograms();
  const { state: requestState } = useRequestStats();

  const greeting = useMemo(() => getGreeting(), []);

  const todayProgramCount =
    programsState.status === 'ready'
      ? programsState.programs.filter((program) => isProgramToday(program.day)).length
      : UNAVAILABLE;

  const requestStats = requestState.status === 'ready' ? requestState.stats : null;

  const statItems = [
    { label: 'Pendengar Sekarang', value: '0' },
    {
      label: 'Lagu Diputar Hari Ini',
      value: requestStats ? String(requestStats.playedToday) : UNAVAILABLE,
    },
    {
      label: 'Total Request',
      value: requestStats ? String(requestStats.totalRequests) : UNAVAILABLE,
    },
    { label: 'Acara Hari Ini', value: String(todayProgramCount) },
  ];

  return (
    <div className="space-y-8 pb-32">
      {streamUrl && <audio ref={audioRef} src={streamUrl} preload="none" />}

      <HeroCard
        greeting={greeting}
        imageUrl={HERO_IMAGE_URL}
        canPlay={canPlay}
        playing={playing}
        onToggle={toggle}
        whatsapp={settings?.whatsapp ?? null}
      />

      <StatCards items={statItems} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentlyRequested state={requestState} />
        <DailyMix state={programsState} />
      </div>

      <StickyPlayer
        stationName={settings?.radio_name ?? null}
        isLive={isLive}
        canPlay={canPlay}
        playing={playing}
        failed={failed}
        onToggle={toggle}
      />
    </div>
  );
}
