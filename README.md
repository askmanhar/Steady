# Steady

A free, gentle, private mood journal — built for people living with mental
illness (BPD, bipolar, depression), by [Ritmann](https://www.ritmann.co).

**Steady is a journaling tool, not a medical device or crisis service.** It
doesn't diagnose or treat anything, and it isn't a substitute for care from a
doctor or therapist.

Everything you write stays on your device. Steady makes **no network
connections at all** — no fonts, no analytics, nothing.

## Deploy for free (GitHub Pages, ~10 minutes)

1. Create a GitHub account, then a new public repository (e.g. `steady`).
2. Upload these files: `index.html`, `manifest.json`, `sw.js`, `icon.svg`.
3. Repository **Settings → Pages → Source: Deploy from a branch → main → / (root) → Save**.
4. After a minute your app is live at `https://<username>.github.io/steady/`.

## Install on your phone

- **Android (Chrome):** open the link → ⋮ menu → **Add to Home screen** → Install.
- **iPhone (Safari):** open the link → Share button → **Add to Home Screen**.

## What's new in this build

- Light/dark themes, a warmer rounded type system, and the mood-gradient dial track
- Fixed calendar periods (day/week/month/year) with back/forward navigation
- A pinned calendar inside the Log, entry editing, and see-more journal folding
- Reminder recurrence (daily/weekly/monthly), Taken/Later/not-today medicine flow
- Copy-as-text and print-to-PDF exports (with a Steady footer), plus full JSON
  backup & restore

## Honest limitations

- Reminders ring only while Steady is open. Real push notifications need a
  backend and are planned for a future release.
- Your data lives only on this device. **Export regularly** (Settings → Your
  data); the JSON export can be restored anytime via **Import backup** — that's
  also how you move to a new phone. iOS can evict rarely-used web-app storage;
  the export/import pair is your safety net.
