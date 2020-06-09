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
  answer: number;
  status?: string;
  valid: boolean;
}
