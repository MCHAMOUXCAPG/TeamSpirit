import { createContext, useContext } from "react";

// Context to keep the application data between components
export const AuthContext = createContext({
  valid: false,
  surveyCode: "",
  currentTeam: "",
  myTeams: [{ Name: "" }],
  setValid: (valid: boolean) => {},
  setSurveyCode: (surveyCode: string) => {},
  setCurrentTeam: (team: string) => {},
  setMyTeams: (teams: any[]) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
