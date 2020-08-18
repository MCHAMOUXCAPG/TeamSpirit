import { environment } from "./environment/environment";
import {
  IQuestionResponse,
  IValidationCode,
  IValidationUser,
  ITeamDTO,
  IUserDTO,
} from "../models/interfaces";

export class SurveyService {
  //Service to get historic survey average
  public getHistoricSurveys(
    teamName: string,
    token: string | null
  ): Promise<any> {
    const endPoint = "/resultBySurveys/" + teamName;
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  // Service to add notes from a user
  public sendSurvey(
    surveyCode: string,
    body: IQuestionResponse[]
  ): Promise<any> {
    const endPoint = "/survey/" + surveyCode + "/addNotes";
    return environment.post(endPoint, body);
  }

  // Service to get the currect survey result
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

  //Service to get the notes ordered by user
  public getResultByUser(teamName: string, token: string | null): Promise<any> {
    const endPoint = "/resultByUsers/" + teamName;
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  //Service to get the notes ordered by question
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

  // Service to get team details
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

  // Service to get csv file
  public getCSV(
    startDate: string,
    endDate: string,
    teamName: string,
    token: string | null
  ): Promise<any> {
    const endPoint =
      "/survey/exportCsv?startDate=" +
      startDate +
      "&endDate=" +
      endDate +
      "&teamName=" +
      teamName;
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  // Service to delete the notes of a concrete survey
  public resetSurvey(token: string | null, surveyCode: string): Promise<any> {
    const endPoint = "/survey/resetSurvey/" + surveyCode;
    return environment.put(endPoint, null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  // Service to delete permanently a survey (surveyCode + notes)
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
  // Service to access the survey
  public sendCode(code: IValidationCode): Promise<any> {
    const endPoint = "/access";
    return environment.post(endPoint, code);
  }
}

export class UserValidationService {
  //Service to login in the application
  public sendUser(body: IValidationUser): Promise<any> {
    const endPoint = "/login";
    return environment.post(endPoint, body);
  }

  //Service to update the team configuration
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

  // Service to get the current user just with the token
  public getUser(token: string | null): Promise<any> {
    const endPoint = "/me";
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}

export class ManageUserService {
  // Service to delete a user
  public deleteUser(token: string | null, userId: string): Promise<any> {
    const endPoint = "/user/" + userId;
    return environment.delete(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  //Service to get all users
  public getUsers(token: string | null): Promise<any> {
    const endPoint = "/users";
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  // Service to get all teams
  public getTeams(token: string | null): Promise<any> {
    const endPoint = "/teams";
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  // Service to get all roles
  public getRoles(token: string | null): Promise<any> {
    const endPoint = "/roles";
    return environment.get(endPoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  //Service to create a user
  public createUser(body: IUserDTO, token: string | null): Promise<any> {
    const endPoint = "/user/create";
    return environment.post(endPoint, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  //Service to update a user
  public updateUser(
    body: IUserDTO,
    id: string,
    token: string | null
  ): Promise<any> {
    const endPoint = "/user/" + id;
    return environment.put(endPoint, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}
