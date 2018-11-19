export const sortObjectByKeys = obj =>
  Object.keys(obj)
    .sort()
    .reduce(
      (output, key) => ({
        ...output,
        [key]: obj[key],
      }),
      {},
    );

export default {};
