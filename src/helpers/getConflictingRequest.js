const getConflictingRequest = (request) => {
  let conflictingRequest;
  const {
    createdAt, updatedAt, returnDate: returningDate, cities, ...oneWayTrip
  } = request;
  const {
    createdAt: creationDate, updatedAt: updatedDate, cities: cit, ...twoWayTrip
  } = request;
  const { createdAt: creationDat, updatedAt: updatedDAt, ...multiWayTrip } = request;

  request.type === 'one_way' ? conflictingRequest = oneWayTrip
    : request.type === 'two_way' ? conflictingRequest = twoWayTrip
      : conflictingRequest = multiWayTrip;
  return conflictingRequest;
};

export default getConflictingRequest;
