/*
# Allow visitors to read published requests

Lets anonymous visitors read song requests that have been approved or played, so the home page can show recently played songs and request counts. Also confirms visitors can read all programs.

1. Modified Tables
- `requests`: visitors can now SELECT rows where status is 'approved' or 'played'. Pending and rejected requests stay private.
- `programs`: visitors can read all rows (the existing read policy is kept).

2. Security
- Grants SELECT on `requests` to the anon role only. The existing INSERT grant and policy are unchanged.
- Adds a SELECT policy on `requests` for the anon role with a status filter.
- No changes to `site_settings`.

3. Important notes
- Policy creation is idempotent: the policy is dropped first if it already exists.
- Visitors still cannot update or delete any request.
*/

GRANT SELECT ON requests TO anon;

DROP POLICY IF EXISTS "anon_select_published_requests" ON requests;
CREATE POLICY "anon_select_published_requests" ON requests FOR SELECT
  TO anon
  USING (status IN ('approved', 'played'));

DROP POLICY IF EXISTS "anon_select_programs" ON programs;
CREATE POLICY "anon_select_programs" ON programs FOR SELECT
  TO anon
  USING (true);
