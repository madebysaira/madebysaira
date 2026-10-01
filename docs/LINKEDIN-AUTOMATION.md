# LinkedIn → Portfolio video automation

**What it does:** keeps the *Campaign Spec Ads* tab showing your latest
**3** LinkedIn videos. Videos are downloaded into the repo
(`public/videos/*.mp4` + posters in `public/images/posters/`), so the site
never depends on expiring LinkedIn CDN links.

## Day-to-day use (no setup needed)

**Option A — paste a URL (easiest):**
1. GitHub → repo → **Actions** → **Sync LinkedIn videos** → **Run workflow**
2. Paste the new post, one per line:
   `https://www.linkedin.com/posts/... | My Campaign Title | One-line subtitle`
   (title/subtitle optional — first line of the post text is used otherwise)
3. The workflow downloads the mp4 + poster, drops the oldest video beyond 3,
   and commits. The site rebuilds on deploy.

**Option B — edit the JSON:**
Edit `src/data/linkedin-posts.json` (newest first, max 3) and push —
the same workflow runs the downloads for you.

## Full-auto discovery (optional, one-time setup)

LinkedIn blocks unauthenticated listing of a profile's posts, so true
"detect my new upload" needs LinkedIn's official Posts API. Verified
2026-10: `yt-dlp` downloads your *public* post URLs with no login, but
profile/activity listing pages return 404/301 without auth.

To enable it:
1. Create an app at `developer.linkedin.com` → add products
   **Share on LinkedIn** + **Sign In with LinkedIn (OpenID)**.
2. Run the 3-legged OAuth flow for scopes `openid profile email w_member_social`
   (access token lasts 60 days; store the 365-day refresh token and refresh it
   on a schedule).
3. Find your person URN (`urn:li:person:...`) via `GET /v2/userinfo` → `sub`.
4. Add repo secrets `LINKEDIN_ACCESS_TOKEN` + `LINKEDIN_PERSON_URN`.

With those set, the daily 02:00 UTC run tries official-API discovery first
(`scripts/sync-linkedin.mjs → discoverViaOfficialApi`), then falls back to
the JSON list — API failures only warn, they never break the build.

## Files

- `src/data/linkedin-posts.json` — source of truth (newest first, max 3)
- `scripts/sync-linkedin.mjs` — download / poster / probe / trim / prune
- `.github/workflows/sync-linkedin.yml` — dispatch + push + daily schedule
- `src/components/Portfolio.jsx` — renders whatever the JSON holds
