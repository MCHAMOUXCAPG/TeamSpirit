import React from "react";
import { IQuestionResponse } from "../models/interfaces";

export default React.createContext({
  questionsResponse: [
    { number: 1, note: 0, surveyCode: "", user: "" },
    { number: 2, note: 0, surveyCode: "", user: "" },
    { number: 3, note: 5, surveyCode: "", user: "" },
    { number: 4, note: 5, surveyCode: "", user: "" },
    { number: 5, note: 0, surveyCode: "", user: "" },
    { number: 6, note: 0, surveyCode: "", user: "" },
  ],
  setQuestionsResponse: (questionResponse: IQuestionResponse[]) => {},
  disabled: true,
  setDisabled: (bool: boolean) => {},
});
