const LOCAL_STORAGE_KEY = "TOKEN";
export class TokenService {
  static setToken = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  };
  static clearToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };
  static getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  };
}
