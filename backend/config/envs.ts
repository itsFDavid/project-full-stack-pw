require("dotenv/config");
const joi = require("joi");

interface EnvsInterface {
  PORT: number;
  HOST: string;
  DB_PORT: number;
  MYSQL_DATABASE: string;
  MYSQL_USER: string;
  MYSQL_USER_PASSWORD: string;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    MYSQL_DATABASE: joi.string().required(),
    MYSQL_USER: joi.string().required(),
    MYSQL_USER_PASSWORD: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const env: EnvsInterface = value;

exports.envs = {
  port: env.PORT,
  host: env.HOST,
  db_port: env.DB_PORT,
  mysql_db: env.MYSQL_DATABASE,
  mysql_user: env.MYSQL_USER,
  mysql_user_password: env.MYSQL_USER_PASSWORD,
};
