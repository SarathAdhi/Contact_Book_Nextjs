const ACCESS_STORAGE_KEY = "SupaBook-";

export const storage = {
  getToken: (key: string): string | null =>
    window.localStorage.getItem(ACCESS_STORAGE_KEY + key),
  setToken: (key: string, value: string) =>
    window.localStorage.setItem(ACCESS_STORAGE_KEY + key, value),
  clearToken: (key: string) =>
    window.localStorage.removeItem(ACCESS_STORAGE_KEY + key),
};
