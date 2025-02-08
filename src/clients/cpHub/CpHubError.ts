import { ValidationError } from "./validation-error.type";

export type ResponseBody = {
  errorCode: string;
  timeStamp: string;
  path: string;
  validationErrors?: ValidationError[];
};

// BASE ERROR
export class CpHubError extends Error {
  errorCode: string;
  timeStamp: string;
  path: string;
  validationErrors?: ValidationError[];

  constructor(body: ResponseBody) {
    super(body.errorCode);
    this.name = body.errorCode;

    this.errorCode = body.errorCode;
    this.timeStamp = body.timeStamp;
    this.path = body.path;
    this.validationErrors = body.validationErrors;
  }
}

export enum CpHubErrorCode {
  // COMMON
  UNHANDLED = "CP_HUB:UNHANDLED",
  VALIDATION_FAILED = "CP_HUB:VALIDATION_FAILED",

  // USER
  USERNAME_ALREADY_EXISTS = "CP_HUB:USER:USERNAME_ALREADY_EXISTS",
  EMAIL_ALREADY_EXISTS = "CP_HUB:USER:EMAIL_ALREADY_EXISTS",
  INVALID_PASSWORD = "CP_HUB:USER:INVALID_PASSWORD",
  UNAUTHENTICATED = "CP_HUB:USER:UNAUTHENTICATED",
  UNAUTHORIZED = "CP_HUB:USER:UNAUTHORIZED",
  USER_NOT_FOUND = "CP_HUB:USER:USER_NOT_FOUND",
}
