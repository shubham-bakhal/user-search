import { AxiosError } from "axios";
import { IServerError } from "../../interface/network-service.interface";
import { getErrorMessage, getPropertyValue } from "../../shared/utils";

const responseInterceptor = (err: AxiosError<IServerError>) => {
  let parsedError = getPropertyValue<IServerError>(err, "response.data");

  if (!parsedError) {
    parsedError = {
      code: getPropertyValue<number>(err, "response.status"),
      message: getErrorMessage(err),
    };
  }

  return Promise.reject<IServerError>(parsedError);
};

export default responseInterceptor;
