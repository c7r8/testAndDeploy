// import { User } from "./models";
import { dbClient } from "../db_client";
import { hashPassword } from "../hash";

// type importUser = Omit<User, "id">;

export async function importUser() {
  // let user1: User = { id: 1, username: "dasfsf", password: "adsfads" };
  // let user2: importUser = { username: "dasfsf", password: "ads" };

  //   -- INSERT INTO users (username, password) VALUES ('jason@tecky.io', '1234'), ('adams@tecky.io', '1234');
  await dbClient.connect();

  let hash_password = await hashPassword("1234");
  let result = await dbClient.query(
    `insert into "users" (username, password) values ($1,$2)`,
    ["jason@tecky.io", hash_password]
  );

  hash_password = await hashPassword("1234");
  result = await dbClient.query(
    `insert into "users" (username, password) values ($1,$2)`,
    ["adams@tecky.io", hash_password]
  );

  await dbClient.end();
}

importUser();
