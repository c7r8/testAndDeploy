
import Knex from 'knex';
const knexfile = require('../knexfile'); // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile["test"]); // Now the connection is a testing connection.
import {MemoService} from './MemoService';
import {UserService} from "./UserService";

describe("StudentService", ()=>{

    let memoService:MemoService;
    let userService:UserService;

    beforeEach(async ()=>{
        memoService = new MemoService(knex);
        userService = new UserService(knex);
        await knex('likes').del();
        await knex('memos').del();
        await knex('users').del();
        
        await knex.insert({
            content: "hello world",
            image: "2.jpeg"  
        }).into('memos');
        //await knex.insert({
        //    username: "alex",
        //    password: "1234"  
        //}).into('users');
    })

    it("getAllMemo",async ( )=>{
        const students = await memoService.getAllMemo();
        expect(students.length).toBe(1);
    });
    it("editMemo",async ( )=>{
        const result = await memoService.editMemo(1, "content");
        expect(result).toBeFalsy();
    });
    it("getLikeMemo",async ( )=>{
        const result = await memoService.getLikeMemos(1);
        expect(result).toEqual([]);
    });

    it("create memo",async ( )=>{
        const result = await memoService.createMemo("Peter", "image")
        expect(result).toHaveLength(1)
       
    });
    it("delete memo",async ( )=>{
        const result = await memoService.deleteMemo(1)
        expect(result).toBeUndefined();
    });
    
    it("createLikeMemo",async ( )=>{
        const ID = await memoService.createMemo("Peter", "image")
        const user = await userService.insertUser("Peter", "1234")
        console.log(user)
        const result = await memoService.createLikeMemo(user["id"], ID[0].id)
        expect(result).toBeUndefined();
    });
    

  

    //await knex.destroy();

})