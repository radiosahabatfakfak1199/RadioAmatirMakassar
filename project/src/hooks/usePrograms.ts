import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Program } from '@/types/database';

export type ProgramsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; programs: Program[] };

export function usePrograms() {
  const [state, setState] = useState<ProgramsState>({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    const { data, error } = await supabase
      .from('programs')
      .select('id, title, day, time, host, description')
      .order('time', { ascending: true });

    if (error || !data) {
      setState({ status: 'error' });
      return;
    }
    setState({ status: 'ready', programs: data as Program[] });
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { state, reload: load };
}
