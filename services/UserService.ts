//import type { Client } from "pg";
import { hashPassword } from "../hash";
import { User } from "../models";
//@ts-ignore
//import {link} from "../db_knex"
import {Knex} from "knex"

export class UserService {
  constructor(private link: Knex) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    //return (
    //  await this.client.query<User>(
    //    `select id, username, password from users where users.username = $1`,
    //    [username]
    //  )
    //).rows[0];
    return (
      await this.link
      .select("id", "username", "password")
      .from("users")
      .where("username", "=", `${username}`)
    //  <User>(
    //    `select id, username, password from users where users.username = $1`,
    //    [username]
    //  )
    )[0];
  }

  async insertUser(username: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password);
    //return (
    //  await this.client.query(
    //    `INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *`,
    //    [username, hashedPassword]
    //  )
    //).rows[0];
    return (
      await this.link
      .insert({"username": `${username}`, "password": `${hashedPassword}`})
      .into("users")
      .returning(["username", "id"])
     //   `INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *`,
     //   [username, hashedPassword]
      
    )[0];
  }
}
