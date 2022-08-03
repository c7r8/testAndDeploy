
import Knex from 'knex';
const knexfile = require('../knexfile'); // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile["test"]); // Now the connection is a testing connection.
import {UserService} from './UserService';

describe("StudentService",()=>{

    let userService:UserService;

    beforeEach(async ()=>{
        userService = new UserService(knex);
        await knex('users').del();
        await knex.insert({
            username: "jason",
            password: "1234"  
        }).into('users');
    })

    it("insertUser",async ( )=>{
        const result = await userService.insertUser("jason", "1234");
        expect(result!["username"]).toEqual("jason");
    });
    it("getUser",async ( )=>{
        const result = await userService.getUserByUsername("jason");
        expect(result!["username"]).toEqual("jason");
        expect(result!["password"]).toEqual("1234");
    });
   
})