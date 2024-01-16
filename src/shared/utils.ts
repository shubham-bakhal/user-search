import { ErrorWithMessage } from "../interface/shared.interface";

export function getPropertyValue<T>(
  object: { [key: string]: any },
  propertyPath: string,
  defaultValue: any = null
): T {
  return doesObjectContainProperty(object, propertyPath)
    ? (propertyPath.split(".").reduce((previous, current) => {
        return previous[current];
      }, object) as T) // Add type assertion here
    : defaultValue;
}

export function getErrorMessage(error: unknown) {
  const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as Record<string, unknown>).message === "string"
    );
  };

  const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
    if (isErrorWithMessage(maybeError)) return maybeError;

    try {
      return new Error(JSON.stringify(maybeError));
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return new Error(String(maybeError));
    }
  };

  return toErrorWithMessage(error).message;
}

export function doesObjectContainProperty(
  object: { [key: string]: any },
  propertyPath: string
): boolean {
  // If there's nothing to check
  if (typeof object !== "object" || !object || !Object.keys(object).length) {
    return false;
  }

  // If there's nothing to check
  if (!propertyPath || !propertyPath.length) {
    return false;
  }

  try {
    // Iterate through propertyPath to dig into the object
    const finalValue = propertyPath.split(".").reduce((previous, current) => {
      // No hasOwnProperty check
      return typeof previous !== "undefined" && previous !== null
        ? previous[current]
        : undefined;
    }, object);
    // We specifically want to check for undefined & null to check if value exist here
    return typeof finalValue !== "undefined" && finalValue !== null;
  } catch (error) {
    // If the path has a wrong turn, the reduce function will throw an error
    return false;
  }
}
