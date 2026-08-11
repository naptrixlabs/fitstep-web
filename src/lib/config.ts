// Public content API base. In production, set VITE_API_BASE_URL to the API
// origin (e.g. https://api.vive.app/v1). Falls back to the local Express
// backend during development. Only same-origin, read-only content is fetched —
// the site itself stores nothing and tracks nothing.
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/v1';

// Where the app can be downloaded. Placeholders until store listings exist.
export const APP_STORE_URL = import.meta.env.VITE_APP_STORE_URL ?? '';
export const PLAY_STORE_URL = import.meta.env.VITE_PLAY_STORE_URL ?? '';

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@vive.app';
