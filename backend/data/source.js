const { envs } = require("../config/envs");
const { DataSource } = require("typeorm");
const Product = require("../models/Product");
require("reflect-metadata");

const AppDataSource = new DataSource({
  type: "mysql",
  host: envs.host,
  port: envs.db_port,
  username: envs.mysql_user,
  password: envs.mysql_user_password,
  database: envs.mysql_db,
  entities: [Product],
});

module.exports = { AppDataSource };
