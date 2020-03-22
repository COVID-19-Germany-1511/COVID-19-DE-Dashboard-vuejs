export const formatAbsoluteTickNumbers = (value: any): number | string => {
  const number = Number(value.toString());
  if (number < 1000) {
    return number;
  }

  if (number < 1000000) {
    return `${number / 1000}K`;
  }

  return `${number / 1000000}M`;
};

export const formatPercentNumbers = (value: any): number | string => {
  const number = Number(value.toString());
  return `${number}%`;
};
