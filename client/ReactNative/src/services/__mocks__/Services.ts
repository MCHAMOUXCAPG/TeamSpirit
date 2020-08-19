import { environment } from "./environment/environment";
import { IQuestionResponse, IValidationCode } from "../../models/interfaces";

const notes = [
  {
    number: 1,
    surveyCode: "GORN-ABCDE",
    user: "8fe30b94b9922f2103b13dd493b29260b6688c83d0599964d18f72c653c20753",
    note: 7.5,
  },
  {
    number: 2,
    surveyCode: "GORN-ABCDE",
    user: "8fe30b94b9922f2103b13dd493b29260b6688c83d0599964d18f72c653c20753",
    note: 10,
  },
  {
    number: 3,
    surveyCode: "GORN-ABCDE",
    user: "8fe30b94b9922f2103b13dd493b29260b6688c83d0599964d18f72c653c20753",
    note: 5,
  },
  {
    number: 4,
    surveyCode: "GORN-ABCDE",
    user: "8fe30b94b9922f2103b13dd493b29260b6688c83d0599964d18f72c653c20753",
    note: 2.5,
  },
  {
    number: 5,
    surveyCode: "GORN-ABCDE",
    user: "8fe30b94b9922f2103b13dd493b29260b6688c83d0599964d18f72c653c20753",
    note: 7.5,
  },
  {
    number: 6,
    surveyCode: "GORN-ABCDE",
    user: "8fe30b94b9922f2103b13dd493b29260b6688c83d0599964d18f72c653c20753",
    note: 7.5,
  },
];

const sendSurveyResponse = {
  teamName: "GORN",
  code: "GORN-ABCDE",
  endDate: "2020-09-30 00:00:00+00:00",
  notes: notes,
  startDate: "2020-06-01 00:00:00+00:00",
};
// Service to send survey marks chosen by the user to the database.
export class SurveyService {
  public sendSurvey(
    surveyCode: string,
    body: IQuestionResponse[]
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (surveyCode !== "error" && body !== null) {
        resolve(sendSurveyResponse);
      } else {
        reject({ message: "Not Found" });
      }
    });
  }
}

// Service that validates the survey code sent by the user.
export class CodeValidationService {
  public sendCode(code: IValidationCode): Promise<any> {
    return new Promise((resolve, reject) => {
      if (code !== "error") {
        resolve(sendSurveyResponse);
      } else {
        reject({ message: "Invalid code" });
      }
    });
  }
}
