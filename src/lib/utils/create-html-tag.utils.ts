export const createHtmlTag = (label: string) => {
  return label.replaceAll(' ', '-').toLowerCase();
};
