const splitUrl = (req, res, next) => {
  req.urlPathSections = req.url.split('/');
  next();
};
export default splitUrl;
