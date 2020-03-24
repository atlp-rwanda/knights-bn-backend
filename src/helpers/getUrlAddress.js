const getUrlAddress = (splitURL) => (splitURL ? splitURL[splitURL.length - 2] || null : null);

export default getUrlAddress;
