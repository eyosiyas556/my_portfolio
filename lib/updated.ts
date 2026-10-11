// Global in-memory modification timestamp to power real-time updates across all devices & visitors
declare global {
  var __portfolioLastUpdated: number | undefined;
}

export function notifyChange() {
  globalThis.__portfolioLastUpdated = Date.now();
}

export function getLastUpdated(): number {
  return globalThis.__portfolioLastUpdated ?? Date.now();
}
