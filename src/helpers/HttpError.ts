import ResponseError from '../types/Error';

const HttpError = (status: number, message: string) => {
  const error: ResponseError = new Error(message);

  error.status = status;

  return error;
};

export default HttpError;
