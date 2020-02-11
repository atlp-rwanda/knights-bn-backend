import googleFakeUser from './googleFakeUser';
import facebookFakeUser from './facebookFakeUser';

const fakeUser = (req, res, next) => {
  const urlPathSections = req.url.split('/');
  const resourceServer = urlPathSections[urlPathSections.length - 1];
  req.user = (resourceServer === 'facebook') ? facebookFakeUser : googleFakeUser;
  next();
};

export default fakeUser;
