
export default (users, id, req, nextUsers) => {
  const error = [];
  users.forEach((userId) => {
    if (userId === req.user.id) {
      error.push('you did it already ');
    }
    req.nextUsers = nextUsers;
  });
  return error;
};

