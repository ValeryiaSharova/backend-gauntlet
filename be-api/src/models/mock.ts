import { JSONSchema4 } from 'json-schema';

export const model: JSONSchema4 = {
  type: 'object',
  title: 'Mock',
  description: 'Mock model',
  additionalProperties: false,
};

export const driver = () => true;
