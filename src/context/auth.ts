import { createContext, useContext } from "react";

export const AuthContext = createContext({
  valid: false,
  surveyCode: "",
  setValid: (valid: boolean) => {},
  setSurveyCode: (surveyCode: string) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
