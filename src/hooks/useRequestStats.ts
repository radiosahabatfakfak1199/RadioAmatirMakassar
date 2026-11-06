import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { startOfToday } from '@/lib/dates';
import type { SongRequest } from '@/types/database';

export interface RequestStats {
  totalRequests: number;
  playedToday: number;
  recentlyPlayed: SongRequest[];
}

export type RequestStatsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; stats: RequestStats };

const RECENT_LIMIT = 5;

export function useRequestStats() {
  const [state, setState] = useState<RequestStatsState>({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    const todayStart = startOfToday().toISOString();

    const [total, playedToday, recent] = await Promise.all([
      supabase.from('requests').select('id', { count: 'exact', head: true }),
      supabase
        .from('requests')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'played')
        .gte('created_at', todayStart),
      supabase
        .from('requests')
        .select('id, name, song, message, status, created_at')
        .eq('status', 'played')
        .order('created_at', { ascending: false })
        .limit(RECENT_LIMIT),
    ]);

    if (total.error || playedToday.error || recent.error || !recent.data) {
      setState({ status: 'error' });
      return;
    }

    setState({
      status: 'ready',
      stats: {
        totalRequests: total.count ?? 0,
        playedToday: playedToday.count ?? 0,
        recentlyPlayed: recent.data as SongRequest[],
      },
    });
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { state, reload: load };
}
