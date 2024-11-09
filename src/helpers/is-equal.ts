export const isEqual = (newData, data): boolean => {
  for (const item in newData) {
    if (newData['item'] !== data['item']) return false;
  }
  return true;
};
