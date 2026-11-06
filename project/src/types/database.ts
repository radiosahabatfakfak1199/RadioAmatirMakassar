export interface SiteSettings {
  id: string;
  radio_name: string | null;
  tagline: string | null;
  stream_url: string | null;
  is_live: boolean;
  whatsapp: string | null;
}

export interface Program {
  id: string;
  title: string;
  day: string | null;
  time: string | null;
  host: string | null;
  description: string | null;
}

export type RequestStatus = 'pending' | 'approved' | 'played' | 'rejected';

export interface SongRequest {
  id: string;
  name: string;
  song: string;
  message: string | null;
  status: RequestStatus;
  created_at: string;
}
