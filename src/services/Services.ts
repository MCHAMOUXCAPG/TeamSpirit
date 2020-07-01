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

  public getCurrentResult(
    surveyCode: string,
    token: string | null
  ): Promise<any> {
    const endPoint = "/survey/result/" + surveyCode;
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  public getResultByUser(teamName: string, token: string | null): Promise<any> {
    const endPoint = "/resultByUsers/" + teamName;
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
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
  public getUser(token: string | null): Promise<any> {
    const endPoint = "/me";
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}
