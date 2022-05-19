export enum HTTPStatusCode {
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class NetworkError extends Error {
  constructor() {
    super('Network error');
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('The resource you requested was not found.');
  }
}

export class ServerError extends Error {
  constructor() {
    super('There was a server error.');
  }
}

const THROW_ERRORS: {
  [key: number]: Error;
} = {
  [HTTPStatusCode.NOT_FOUND]: new NotFoundError(),

  [HTTPStatusCode.INTERNAL_SERVER_ERROR]: new ServerError(),
};

export function _handleError(status: number) {
  throw THROW_ERRORS[status];
}

export function _throwSpecificError(error: any) {
  if (error instanceof NotFoundError || error instanceof ServerError) {
    throw error;
  }

  throw new NetworkError();
}
