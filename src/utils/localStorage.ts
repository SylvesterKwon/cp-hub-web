/**
 * LocalStorage wrapper class
 * This is needed because global object like localStorage is not available on the server
 */
export class LocalStorage {
  static setItem(key: string, value: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  static getItem(key: string) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  }

  static removeItem(key: string) {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }
}
