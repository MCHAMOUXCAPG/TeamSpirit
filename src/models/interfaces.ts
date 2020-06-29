export enum questionType {
  slider,
  fiveIcons,
  twoIcons,
  stars,
}

export interface ISurveyQuestion {
  number: number;
  question: string;
  type: questionType;
  images: string[];
}

export interface IQuestionStatus {
  status?: string;
  valid: boolean;
  touched: boolean;
}

export interface IQuestionResponse {
  note: number;
  number: number;
  surveyCode: string;
}

export interface IValidationCode {
  code: string;
}

export interface ICurrentSurveyResult {
  Period: {
    StartDate: string;
    EndDate: string;
  };
  Completed: string;
  CurrentResult: number;
  HistoricResult: number;
}
export interface IValidationUser {
  Email: string;
  Password: string;
}
