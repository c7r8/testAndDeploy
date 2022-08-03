import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("likes").del();
    await knex("memos").del();
    await knex("users").del();

    // Inserts seed entries
    await knex("memos").insert([
        { id: 1, content: "rowValue1" },
        
    ]);
    await knex("users").insert([
        { id: 1, username: "jason@tecky.io", password: "$2a$10$CBSB8spNGmlAYbB3vb/gUeMS23FBrIGqHcZ6fN8phvLzZm0L2miXm" },
        
    ]);
};
