// Which tutorial steps someone has ticked off, per lesson, saved in their browser only.
const key = (slug: string) => `aiba:done:${slug}`;
export function loadDone(slug: string): number[] {
  try { const v = JSON.parse(localStorage.getItem(key(slug)) ?? "[]"); return Array.isArray(v) ? v.filter((n) => typeof n === "number") : []; } catch { return []; }
}
export function saveDone(slug: string, done: number[]) {
  try { localStorage.setItem(key(slug), JSON.stringify(done)); } catch { /* storage blocked */ }
}
