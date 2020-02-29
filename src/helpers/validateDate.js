
export default (date) => {
  const insertedDate = new Date(date);
  if (insertedDate.getFullYear() < new Date().getFullYear()) return insertedDate;
  return null;
};

