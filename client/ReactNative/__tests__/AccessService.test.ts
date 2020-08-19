import { CodeValidationService } from "../src/services/Services";
import { IValidationCode } from "../src/models/interfaces";

jest.mock("../src/services/Services.ts");

const validationCode: IValidationCode = {
  code: "GORN-ABCDE",
  user: "8fe30b94b9922f2103b13dd493b29260b6688c83d0599964d18f72c653c20753",
};

it('Check if the function "sendCode" is called and the parameter "validationCode" is passed', async () => {
  const Mockcall = jest.spyOn(CodeValidationService.prototype, "sendCode");
  const sendCodeService: CodeValidationService = new CodeValidationService();
  const data = await sendCodeService.sendCode(validationCode);

  expect.assertions(2);
  expect(Mockcall).toHaveBeenCalledTimes(1);
  expect(Mockcall).toBeCalledWith(validationCode);
});

it("Check that the validationCode is reached and veryfied with the service", async () => {
  expect.assertions(1);
  const sendCodeService: CodeValidationService = new CodeValidationService();
  const data = await sendCodeService.sendCode(validationCode);

  expect(data.code).toEqual("GORN-ABCDE");
});

it("tests error with async/await", async () => {
  expect.assertions(1);

  const sendCodeService: CodeValidationService = new CodeValidationService();
  await expect(sendCodeService.sendCode("error")).rejects.toEqual({
    message: "Invalid code",
  });
});
