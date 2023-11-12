import * as Joi from 'joi';

// For libs-test only
export const environmentSchema = Joi.object({
	NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development')
});
