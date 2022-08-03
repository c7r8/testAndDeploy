import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("users");
    if (!hasTable) {
      await knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("username");
        table.string("password");
        table.timestamps(false, true);
      });
    }
   
    if (!await knex.schema.hasTable("memos")) {
      await knex.schema.createTable("memos", (table) => {
        table.increments();
        table.string("content");
        table.string("image");
        table.timestamps(false, true);
      });
    }


    if (!await knex.schema.hasTable("likes")) {
      await knex.schema.createTable("likes", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table.integer("memo_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.foreign("memo_id").references("memos.id");
       
      });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
    await knex.schema.dropTableIfExists("memos");
    await knex.schema.dropTableIfExists("likes");
}

