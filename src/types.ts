export interface AuthProviderProps {
  authName: string;
  children: React.ReactNode;
}

export interface AuthContextInterface {
  authState: AuthStateInterface;
  dispatch: React.Dispatch<AuthActions>;
}

export interface AuthStateInterface {
  auth: {
    token: string;
    expiresAt: Date;
  } | null;
  userState: AuthStateUserObject | null;
  isSignIn: boolean;
}

export type AuthStateUserObject = {
  [x: string]: any;
};

export enum ActionType {
  SignIn,
  SignOut,
}
export interface SignInAction {
  type: ActionType.SignIn;
  payload: SignInActionPayload;
}

export interface SignInActionPayload {
  auth: {
    token: string;
    expiresAt: Date;
  };
  userState: AuthStateUserObject | null;
}

export interface SignOutAction {
  type: ActionType.SignOut;
}

export type AuthActions = SignInAction | SignOutAction;

export interface SignInFunctionParams {
  token: string;
  expiresIn: number;
  authState?: AuthStateUserObject;
}
