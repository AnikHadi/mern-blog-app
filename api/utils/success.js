export const successHandler = (statusCode, message) => {
  return {
    success: true,
    statusCode,
    message,
  };
};
