import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    AT_SECRET: Joi.string().required(),
    RT_SECRET: Joi.string().required(),
    FP_SECRET: Joi.string().required(),
    MAIL_HOST: Joi.string().required(),
    MAIL_USER: Joi.string().required(),
    MAIL_PASSWORD: Joi.string().required(),
    MAIL_FROM: Joi.string().required(),
    MAIL_PORT: Joi.string().required(),
    MAIL_TRANSPORT: Joi.string().required(),
    DB_URI: Joi.string().required(),
});