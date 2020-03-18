const handleError = (res, error) => {
  const errors = [
    { name: 'Request not found!', statusCode: 404 },
    { name: 'Unauthorized access!', statusCode: 403 },
    { name: 'The request was approved before!', statusCode: 200 },
    { name: 'The request start date is due.', statusCode: 405 },
    { name: 'The request was rejected before!', statusCode: 200 },
    { name: "Sorry can't reject ! The user is now on trip.", statusCode: 405 },
    { name: 'Sorry, the request was closed!', statusCode: 200 },
    { name: 'invalid input syntax for type integer', statusCode: 422 },
    { name: 'Empty request !', statusCode: 422 },
  ];
  const definedError = errors.find((err) => err.name === error);
  if (definedError) return res.status(definedError.statusCode).json({ error });
  return res.status(500).json({ error: error.message || error });
};
export default handleError;
