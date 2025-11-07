import { RateLimitOptions } from '@fastify/rate-limit';
import { FastifyRequest } from 'fastify';
import { ERRORS } from 'shared';

type ParamsWithToken = { token?: string };

type RequestWithToken = FastifyRequest<{
  Params: ParamsWithToken;
}>;

const getTokenFromRequest = (request: FastifyRequest): string | undefined => {
  const paramsToken = (request as RequestWithToken).params?.token;
  if (paramsToken) {
    return paramsToken;
  }
};

export const rateLimitConfig: RateLimitOptions = {
  max: 30,
  timeWindow: '1 minute',
  keyGenerator: (request) => getTokenFromRequest(request) ?? request.ip,
  errorResponseBuilder: () => ({ error: ERRORS.TOO_MANY_REQUESTS }),
};
