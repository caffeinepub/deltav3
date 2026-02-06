# Specification

## Summary
**Goal:** Build a DeltaV3.org branded DuckDuckGo-powered search site with a black/purple default theme, a customizable theme accent color, and no on-site search history storage.

**Planned changes:**
- Create a consistent branded UI shell (header/main/footer) with black background and purple accents, and set page title/metadata to include DeltaV3.org.
- Add the provided logo asset (148783974.png) to the header (and other appropriate branding spots) without altering it.
- Implement a search page that queries DuckDuckGo via a public/legal endpoint (e.g., Instant Answer API) with input + submit (button and Enter), loading/error states, and a clickable results list; provide a fallback link to open results on duckduckgo.com if in-browser fetching fails (e.g., CORS).
- Add a Settings page/tab that lets users change at least the primary accent color, applies changes immediately across the app, and persists the preference locally (e.g., localStorage).
- Ensure no on-site search history is stored or shown (no backend persistence and no local “recent searches” feature; do not store queries in localStorage/indexedDB/cookies).

**User-visible outcome:** Users see a DeltaV3.org-branded search site with the provided logo, can search DuckDuckGo and view/click results (or open the query on DuckDuckGo if needed), and can change/persist the theme accent color—without the site saving or displaying their search history.
