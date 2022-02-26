import { AuthStateInterface, AuthStateUserObject } from "./types";

class TokenObject {
  private readonly authStorageName: string;

  constructor(authStorageName: string) {
    this.authStorageName = authStorageName;
  }

  initialToken(): AuthStateInterface {
    const t = localStorage.getItem(this.authStorageName);
    const x = localStorage.getItem(`${this.authStorageName}_user`);
    const e = localStorage.getItem(`${this.authStorageName}_expires`);
    const auth = t ? { token: t, expiresAt: new Date(e || "") } : null;
    return {
      auth,
      userState: x ? JSON.parse(x) : null,
      isSignIn: !!t,
    };
  }

  syncToken(authState: AuthStateInterface): void {
    if (authState.auth) {
      this.setToken(authState.auth.token, authState.auth.expiresAt, authState.userState);
    } else {
      this.removeToken();
    }
  }

  setToken(authToken: string, expiresAt: Date, authState: AuthStateUserObject | null): void {
    localStorage.setItem(this.authStorageName, authToken);
    localStorage.setItem(`${this.authStorageName}_expires`, expiresAt.toISOString());
    localStorage.setItem(`${this.authStorageName}_user`, JSON.stringify(authState));
  }

  removeToken(): void {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(`${this.authStorageName}_user`);
    localStorage.removeItem(`${this.authStorageName}_expires`);
  }
}

export default TokenObject;
