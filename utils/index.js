const getMonthYear = () => {
  const date = new Date();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  const expiryYear = year + 10;
  return { month, year,  expiryYear };
};

module.exports = {
    getMonthYear
}
