export const createHtmlTag = (label: string) => {
  const whiteSpaces = /\s/g;

  return label.replace(whiteSpaces, '-').toLowerCase();
};

export const formatStatusText = (status: string) => {
  const underScores = /_/gi;

  return status.replace(underScores, ' ');
};
