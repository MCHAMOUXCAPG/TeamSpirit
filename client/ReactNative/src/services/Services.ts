import { environment } from "./environment/environment";
import { IQuestionResponse, IValidationCode } from "../models/interfaces";

// Service to send survey marks chosen by the user to the database.
export class SurveyService {
  public sendSurvey(
    surveyCode: string,
    body: IQuestionResponse[]
  ): Promise<any> {
    const endPoint = "/survey/" + surveyCode + "/addNotes";
    return environment.post(endPoint, body);
  }
}

// Service that validates the survey code sent by the user.
export class CodeValidationService {
  public sendCode(code: IValidationCode): Promise<any> {
    const endPoint = "/access";
    return environment.post(endPoint, code);
  }
}
