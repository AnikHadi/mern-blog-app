export const errorHandler = (statusCode, message) => {
  const error = {};
  error.statusCode = statusCode;
  error.message = message;
  error.success = false;
  return error;
};
