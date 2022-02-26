import React from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./AuthProvider";
import { doSignIn, doSignOut } from "./reducers";
import { AuthStateUserObject, SignInFunctionParams } from "./types";

const errorMessage = "Auth Provider is missing. Please add the AuthProvider before Router";

export function useSignIn(): (signInConfig: SignInFunctionParams) => boolean {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error(errorMessage);
  }
  return (signInConfig: SignInFunctionParams): boolean => {
    const { token, authState, expiresIn } = signInConfig;
    const expTime = new Date(new Date().getTime() + expiresIn * 60 * 1000);
    context.dispatch(
      doSignIn({
        auth: {
          token: token,
          expiresAt: expTime,
        },
        userState: authState ? authState : null,
      })
    );
    return true;
  };
}

export function useSignOut(): () => boolean {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error(errorMessage);
  }

  return () => {
    try {
      if (context) {
        context.dispatch(doSignOut());
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
}

export function useAuthUser(): () => AuthStateUserObject | null {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error(errorMessage);
  }
  return () => {
    return context.authState.auth ? context.authState.userState : null;
  };
}

export function useIsAuthenticated(): () => boolean {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error(errorMessage);
  }
  return () => {
    if (context.authState.auth) {
      if (context.authState.auth.expiresAt && context.authState.auth.expiresAt > new Date()) {
        return true;
      } else {
        context.dispatch(doSignOut());
        return false;
      }
    } else {
      return false;
    }
  };
}

export function useProtectedRoute(loginPath: string) {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error("Auth Provider is missing. Please add the AuthProvider before Router");
  }

  const isAuth = () => {
    if (context.authState.auth) {
      if (context.authState.auth.expiresAt && context.authState.auth.expiresAt > new Date()) {
        return true;
      } else {
        context.dispatch(doSignOut());
        return false;
      }
    } else {
      return false;
    }
  };
  return function protectedRoute(element: React.ReactNode) {
    if (isAuth()) {
      return element;
    } else {
      return <Navigate replace to={loginPath} />;
    }
  };
}
