
export default (date) => {
  const insertedDate = new Date(date);
  if (insertedDate.getFullYear() < 2020) return insertedDate;
  return null;
};
