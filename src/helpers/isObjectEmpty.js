const isObjectEmpty = (obj) => ((!obj) || (Object.entries(obj).length === 0)) ? true : false;

export default isObjectEmpty;
