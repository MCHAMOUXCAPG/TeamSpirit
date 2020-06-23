import { environment } from "./environment/environment";
import {
  IQuestionResponse,
  IValidationCode,
  IValidationUser,
} from "../models/interfaces";

export class SurveyService {
  public sendSurvey(
    surveyCode: string,
    body: IQuestionResponse[]
  ): Promise<any> {
    const endPoint = "/survey/" + surveyCode + "/addNotes";
    return environment.post(endPoint, body);
  }
}

export class CodeValidationService {
  public sendCode(code: IValidationCode): Promise<any> {
    const endPoint = "/access";
    return environment.post(endPoint, code);
  }
}

export class UserValidationService {
  public sendUser(body: IValidationUser): Promise<any> {
    const endPoint = "/login";
    return environment.post(endPoint, body);
  }
}
