import queryString from 'querystring';

export default (res, url, content) => {
  res.redirect(`${url}?${queryString.encode(content)}`);
};
