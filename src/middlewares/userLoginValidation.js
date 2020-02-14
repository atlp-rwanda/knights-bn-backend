export default (req, res, next) => {
  const { email, password } = req.body;


  if ((typeof email !== 'undefined') && (typeof password !== 'undefined')) {
    const userEmail = email.split(' ').join('').trim();
    const UserPassword = password.split(' ').join('').trim();
    req.email = userEmail;
    req.password = UserPassword;
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: 'One of your credentials is missing'
    });
  }
};
