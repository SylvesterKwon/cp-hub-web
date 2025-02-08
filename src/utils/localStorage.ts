/**
 * LocalStorage wrapper class
 * This is needed because global object like localStorage is not available on the server
 */
export class LocalStorage {
  static set(key: string, value: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  }

  static get(key: string) {
    if (typeof window === "undefined") return;
    return localStorage.getItem(key);
  }

  static delete(key: string) {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  }
}
