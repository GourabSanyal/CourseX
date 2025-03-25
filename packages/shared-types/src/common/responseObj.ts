import { ErrorObj } from "./errorObj";
import { Course } from "./course";

export type ResponseData =
  | {
      message: string;
      data: Course | null;
    }
  | ErrorObj;