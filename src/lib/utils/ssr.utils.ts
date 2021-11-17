export const isRequestSSR = (currentUrl?: string) => {
  if (!currentUrl) return true;
  const extension = currentUrl.split('?').shift()?.split('.').pop();
  return !extension || extension !== 'json';
};
