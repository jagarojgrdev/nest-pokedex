import * as Joi from 'joi';

// VALIDA ENVS
export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.string().default('dev'),
  DATABASE_HOST: Joi.required(),
  PORT: Joi.number().default(3005),
  DEFAULT_LIMIT: Joi.number().default(6),
});
