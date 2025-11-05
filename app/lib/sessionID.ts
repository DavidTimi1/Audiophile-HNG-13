export function getSessionID() {
  if (typeof window === "undefined") return "";
  const key = "audiophile:sessionID";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}
