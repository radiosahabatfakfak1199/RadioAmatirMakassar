/*
# Create radio foundation tables

Adds the three core tables for the amateur radio station website: station settings, the program schedule, and listener song requests.

1. New Tables
- `site_settings`: one row describing the station.
  - `id` (uuid, primary key)
  - `radio_name` (text) station name shown in the sidebar and header
  - `tagline` (text) short description under the name
  - `stream_url` (text) live audio stream address
  - `is_live` (boolean, default false) whether the station is currently on air
  - `whatsapp` (text) contact number for the station
- `programs`: scheduled shows.
  - `id` (uuid, primary key)
  - `title` (text) show name
  - `day` (text) day of the week the show airs
  - `time` (text) air time
  - `host` (text) presenter name
  - `description` (text) what the show is about
- `requests`: song requests submitted by visitors.
  - `id` (uuid, primary key)
  - `name` (text) requester's name
  - `song` (text) requested song
  - `message` (text) optional note to the host
  - `status` (text, default 'pending') one of pending, approved, played, rejected
  - `created_at` (timestamptz, default now())

2. Security
- Row level security is enabled on all three tables.
- Visitors (anonymous and signed-in roles) can READ `site_settings` and `programs` only. There are no write policies, so station content is changed from the database dashboard until a secure admin area exists.
- Visitors can INSERT into `requests` only, with length limits enforced by the database and status fixed to pending by default. They cannot read, edit, or delete other visitors' requests.

3. Important notes
- No sample or fake rows are inserted; the tables start empty.
- Text length limits on requests protect the database from oversized submissions.
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  radio_name text,
  tagline text,
  stream_url text,
  is_live boolean NOT NULL DEFAULT false,
  whatsapp text
);

CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  day text,
  time text,
  host text,
  description text
);

CREATE TABLE IF NOT EXISTS requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  song text NOT NULL CHECK (char_length(song) BETWEEN 1 AND 200),
  message text CHECK (message IS NULL OR char_length(message) <= 500),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'played', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON site_settings TO anon, authenticated;
GRANT SELECT ON programs TO anon, authenticated;
GRANT INSERT ON requests TO anon, authenticated;

DROP POLICY IF EXISTS "public_select_site_settings" ON site_settings;
CREATE POLICY "public_select_site_settings" ON site_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_select_programs" ON programs;
CREATE POLICY "public_select_programs" ON programs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_requests" ON requests;
CREATE POLICY "public_insert_requests" ON requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'pending');
