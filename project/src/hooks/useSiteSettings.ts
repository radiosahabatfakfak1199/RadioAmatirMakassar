import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { SiteSettings } from '@/types/database';

export type SiteSettingsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; settings: SiteSettings | null };

export function useSiteSettings() {
  const [state, setState] = useState<SiteSettingsState>({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    const { data, error } = await supabase
      .from('site_settings')
      .select('id, radio_name, tagline, stream_url, is_live, whatsapp')
      .limit(1)
      .maybeSingle();

    if (error) {
      setState({ status: 'error' });
      return;
    }
    setState({ status: 'ready', settings: data as SiteSettings | null });
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { state, reload: load };
}
