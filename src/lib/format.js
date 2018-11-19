export const objToDotenv = obj =>
  Object.keys(obj).reduce((output, key) => `${output}${key}=${obj[key]}\n`, '');

export default {
  objToDotenv,
};
