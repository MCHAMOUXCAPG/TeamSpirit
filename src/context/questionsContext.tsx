import React from "react";
import { IQuestionResponse } from "../models/interfaces";

export default React.createContext({
  questionsResponse: [
    { number: 1, note: 0, surveyCode: "" },
    { number: 2, note: 0, surveyCode: "" },
    { number: 3, note: 5, surveyCode: "" },
    { number: 4, note: 5, surveyCode: "" },
    { number: 5, note: 0, surveyCode: "" },
    { number: 6, note: 0, surveyCode: "" },
  ],
  setQuestionsResponse: (questionResponse: IQuestionResponse[]) => {},
  disabled: true,
  setDisabled: (bool: boolean) => {},
});
