export const createHtmlTag = (label: string) => {
  return label.replaceAll(' ', '-').toLowerCase();
};

export const formatStatusText = (status: string) => {
  return status.replaceAll('_', ' ');
};
