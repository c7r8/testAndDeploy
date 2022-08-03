//import type { Client } from "pg";
//import { Memo } from "../models";
//@ts-ignore
//import {link} from "../db_knex"
import {Knex} from "knex"
//import redis from 'redis';
//const client = redis.createClient();
//import knex from "knex";

export class MemoService {
  constructor(private link: Knex) {}
  //constructor(private link: Knex, private redis:any) {}

  async createMemo(content: string, image: string) {
    //await this.client.query(
    //  /*sql */ `INSERT INTO memos (content, image) VALUES ($1, $2)`,
    //  [content, image]
    //);
    return (await this.link.insert<Array<{id: number}>>({"content": `${content}`, "image": `${image}`}).into("memos")
    .returning("id"))
      //*sql */ `INSERT INTO memos (content, image) VALUES ($1, $2)`,
      
    
  }

  async getAllMemo() {
    //redis connect
    //redis get
    
      //await this.client.query<Memo>(
      //  /*sql */ `SELECT id, content, image FROM memos ORDER BY id`
      //)
      return (await this.link.select("id", "content", "image").from("memos"))

      //redis set
      
   
  }

  async editMemo(id: number, content: string) {
    //const result = await this.client.query(
    //  /*sql */ `UPDATE memos SET content = $1 WHERE id = $2`,
    //  [content, id]
    //);
    const result = await this.link("memos").update({"content": `${content}`}).where("id" , `${id}`)
    //(
    //  /*sql */ `UPDATE memos SET content = $1 WHERE id = $2`,
    //  [content, id]
    //);
    return result > 0;
  }

  async deleteMemo (id: number) {//this.client.query(/*sql */ `DELETE FROM memos WHERE id = $1`, [id]);
    await this.link("memos").where("id", `${id}`).del()}
    

  async getLikeMemos(userId: number) {
    //return (
    //  await this.client.query<Memo>(
    //    /*sql */ `
    //SELECT m.id, m.content, m.image
    //FROM likes
    //INNER JOIN memos m ON likes.memo_id = m.id
    //WHERE likes.user_id = $1
    //`,
    //    [userId]
    //  )
    //).rows;
    return (
      await this.link
      .select("memos.id", "memos.content", "memos.image")
      .from('likes')
      .innerJoin('memos', "likes.memo_id", "=", "memos.id")
      .where("likes.user_id", "=", `${userId}`))
  //   <Memo>(
  //     /*sql */ `
  // SELECT m.id, m.content, m.image
  // FROM likes
  // INNER JOIN memos m ON likes.memo_id = m.id
  // WHERE likes.user_id = $1
  // `,
  //     [userId]
  //   )
  // ).rows;
  }

  async createLikeMemo(userId: number, memoId: number) {
    //await this.client.query(
    //  /*sql */ `INSERT INTO likes (user_id, memo_id) VALUES ($1, $2)`,
    //  [userId, memoId]
    //);
    await this.link.insert([{"user_id" : `${userId}`, "memo_id": `${memoId}`}]).into("likes")
    //(
    //  /*sql */ `INSERT INTO likes (user_id, memo_id) VALUES ($1, $2)`,
    //  [userId, memoId]
    //);
  }
}
