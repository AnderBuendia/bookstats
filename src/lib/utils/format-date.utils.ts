export const formatDate = (date: Date) => {
  const dateToFormat = new Date(date);

  return dateToFormat.toDateString();
};
