import { environment } from "./environment/environment";
import {
  IQuestionResponse,
  IValidationCode,
  IValidationUser,
  ITeamDTO,
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

  public getResultByQuestions(
    teamName: string,
    token: string | null
  ): Promise<any> {
    const endPoint = "/resultByQuestions/" + teamName;
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  public getResultSurveyConfig(
    teamName: string,
    token: string | null
  ): Promise<any> {
    const endPoint = "/team/" + teamName;
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  public getCSV(
    startDate: string,
    endDate: string,
    token: string | null
  ): Promise<any> {
    const endPoint =
      "/survey/exportCsv?startDate=" + startDate + "&endDate=" + endDate;
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  public deleteSurvey(token: string | null, surveyCode: string): Promise<any> {
    const endPoint = "/survey/" + surveyCode;
    return environment.delete(endPoint, {
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
  public putTeamConfig(
    body: ITeamDTO,
    teamName: string,
    token: string | null
  ): Promise<any> {
    const endPoint = "/team/" + teamName;
    return environment.put(endPoint, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
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
