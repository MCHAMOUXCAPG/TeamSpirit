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
  User: string | null;
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
export interface IResultsByUsers {
  Average: number;
  Notes: { Number: number; Note: number; SurveyCode: string }[];
  User: string;
}
export interface IResultsByQuestions {
  Average: number;
  Notes: { Note: number; User: string }[];
  QuestionNumber: number;
}
export interface ITeamDTO {
  frequency: number;
  name: string; //TeamName
  num_munbers: number;
  startDate: string; // format "2number2number-number1-31"
}
export interface IOneTeamDTO {
  Frequency: number;
  Name: string;
  Num_mumbers: number;
  StartDate: string;
  surveys: [
    {
      code: string;
      endDate: string;
      notes: [
        {
          Number: number;
          SurveyCode: string;
          User: string;
          note: number;
        }
      ];
      startDate: string;
      teamName: string;
    }
  ];
  users: [
    {
      email: string;
      full_name: string;
      id: number;
      password: string;
      roles: [
        {
          id: number;
          name: string;
          userID: number;
        }
      ];
      teams: [];
    }
  ];
}
