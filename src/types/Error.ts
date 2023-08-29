interface ResponseError extends Error {
  status?: number;
  code?: number;
};

export default ResponseError;
