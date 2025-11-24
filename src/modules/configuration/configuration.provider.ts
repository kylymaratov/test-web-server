import Joi from 'joi'

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  POSTGRES_URL: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production'),
})
