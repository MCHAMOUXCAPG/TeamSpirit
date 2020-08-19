import { SurveyService } from "../src/services/Services";
import { IValidationCode } from "../src/models/interfaces";

jest.mock("../src/services/Services.ts");

const surveyCode = "GORN-ABCDE";
const body = [
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

it('Check if the function "surveyCode" is called and the parameters "surveyCode" and "body" are passed', async () => {
  const Mockcall = jest.spyOn(SurveyService.prototype, "sendSurvey");
  const sendSurveyService: SurveyService = new SurveyService();
  const data = await sendSurveyService.sendSurvey(surveyCode, body);

  expect.assertions(2);
  expect(Mockcall).toHaveBeenCalledTimes(1);
  expect(Mockcall).toBeCalledWith(surveyCode, body);
});

it("Check that the parameters are reached and veryfied with the service", async () => {
  expect.assertions(4);
  const sendSurveyService: SurveyService = new SurveyService();
  const data = await sendSurveyService.sendSurvey(surveyCode, body);

  expect(data.code).toEqual("GORN-ABCDE");
  expect(data.teamName).toEqual("GORN");
  expect(data.notes.length).toEqual(6);
  expect(data.notes[0].user).toEqual(
    "8fe30b94b9922f2103b13dd493b29260b6688c83d0599964d18f72c653c20753"
  );
});

it("tests error with async/await", async () => {
  expect.assertions(1);

  const sendSurveyService: SurveyService = new SurveyService();
  await expect(sendSurveyService.sendSurvey("error", body)).rejects.toEqual({
    message: "Not Found",
  });
});
