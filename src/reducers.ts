import { ActionType, AuthActions, AuthStateInterface, SignInAction, SignInActionPayload, SignOutAction } from "./types";

export function authReducer(state: AuthStateInterface, action: AuthActions): AuthStateInterface {
  switch (action.type) {
    case ActionType.SignIn:
      return {
        ...state,
        auth: action.payload.auth,
        userState: action.payload.userState,
        isSignIn: true,
      };
    case ActionType.SignOut:
      return {
        ...state,
        auth: null,
        userState: null,
        isSignIn: false,
      };
  }
}

export function doSignIn(signInParams: SignInActionPayload): SignInAction {
  return {
    type: ActionType.SignIn,
    payload: signInParams,
  };
}

export function doSignOut(): SignOutAction {
  return {
    type: ActionType.SignOut,
  };
}
