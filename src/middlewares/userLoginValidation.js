export default (req, res, next) => {
  const { email, password } = req.body;


  if ((typeof email !== 'undefined') && (typeof password !== 'undefined')) {
    const user = email.split(' ').join('').trim();
    const UserPassword = password.split(' ').join('').trim();
    req.email = user;
    req.password = UserPassword;
    next();
  } else {
    res.status(401).json({
      status: 401,
      message: 'One of your credentials is missing'
    });
  }
};
