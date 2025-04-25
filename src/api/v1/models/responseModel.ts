/**
 * Formats a standardized success response.
 * @param data The actual data to return (array, object, string, etc.)
 * @param message Optional message for clarity
 */
export const successResponse = (data: any, message: string = "Success") => ({
    status: "success",
    message,
    data,
  });
  