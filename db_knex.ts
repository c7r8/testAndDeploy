//import dotenv from "dotenv";
//import pg from "pg";

import Knex from "knex";
const knexConfig = require("./knexfile")

export const link = Knex(knexConfig["development" || process.env.NODE_ENV])

//dotenv.config();

//export const dbClient = new pg.Client({
//  database: process.env.DB_NAME,
//  user: process.env.DB_USERNAME,
//  password: process.env.DB_PASSWORD,
//});

//dbClient.connect();
