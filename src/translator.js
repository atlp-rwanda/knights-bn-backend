import intl from 'i18n';
import path from 'path';

intl.configure({
  locales: ['en', 'iw', 'fr', 'it'],
  directory: path.join(__dirname, '/locales'),
  defaultLocale: 'en',
  cookie: 'lang',
});

const translator = (req, res, next) => {
  intl.init(req, res);
  return next();
};

export default translator;
