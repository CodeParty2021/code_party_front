export const removeUndefinedFromObject = (object: object) => {
  return Object.fromEntries(
    Object.entries(object).filter((items) => items[1] !== undefined)
  );
};
