export const generateQueryParams = (query: Record<string, string>) => {
  return Object.keys(query)
    .map((key) => {
      if (query[key]) return `${key}=${query[key]}`;
      else return key;
    })
    .join('&');
};
