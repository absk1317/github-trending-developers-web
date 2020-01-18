export const en = (params = {}) => {
  return {
    loading: 'Loading...',
    errored: 'Some Error Occurred. Please retry...',
    noData: `No ${params.since} trending users in ${params.language}`,
  };
};
