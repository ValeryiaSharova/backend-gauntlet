export enum HTTP_STATUS {
  OK = 200,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  LEGALS_REASON = 451,
  INTERNAL_SERVER = 500,
}

export enum ERRORS {
  BAD_ENDPOINT = 'Bad endpoint',
  BAD_REQUEST = 'Bad Request',

  INTERNAL_SERVER = 'Internal server error',

  INVALID_ID = 'Invalid id',

  NOT_FOUND = 'Not found',

  PERMISSION_DENIED = 'Permission denied',

  TOO_MANY_REQUESTS = 'Too many requests, please try again later',
}
