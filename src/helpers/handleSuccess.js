const handlerSuccess = (res, statusCode, message, data) => {
  res.status(statusCode).json(
    data ? { message, data } : { message },
  );
};
export default handlerSuccess;
