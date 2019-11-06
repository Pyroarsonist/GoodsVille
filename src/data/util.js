// eslint-disable-next-line import/prefer-default-export
export const pageInputResolver = input => {
  const { limit = 10, offset = 0 } = input || {};
  return { limit, offset };
};
