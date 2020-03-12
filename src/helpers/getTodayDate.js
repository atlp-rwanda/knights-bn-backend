const getTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  return new Date(`${yyyy}-${mm}-${dd}`);
};
export default getTodayDate;
