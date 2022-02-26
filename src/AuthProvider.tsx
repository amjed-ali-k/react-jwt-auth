import React from "react";

import TokenObject from "./token";
import { authReducer } from "./reducers";
import { AuthContextInterface, AuthProviderProps } from "./types";

export const AuthContext = React.createContext<AuthContextInterface | null>(null);

const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ children, authName }) => {
  const tokenObject = createToken(authName);

  const [authState, dispatch] = React.useReducer(authReducer, tokenObject.initialToken());

  React.useEffect(() => {
    tokenObject.syncToken(authState);
  }, [authState, tokenObject, authName]);

  return <AuthContext.Provider value={{ authState, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

const createToken = (authName: string) => {
  return new TokenObject(authName);
};
