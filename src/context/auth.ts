import { createContext, useContext } from "react";

export const AuthContext = createContext({
  valid: false,
  setValid: (valid: boolean) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
