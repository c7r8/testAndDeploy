//import { MemoController } from "./MemoController";
//import { MemoService } from "../services/MemoService";
//import {Request, Response} from "express";
//import type {Client} from "pg"
////import {SocketIO} from "../models"
//
//jest.mock("../services/MemoService");
//
//describe("MemoController", ()=> {
//    let controller: MemoController;
//    let service: MemoService;
//    let req: Request;
//    let res: Response;
//
//    beforeEach(() => {
//        service = new MemoService({} as Client);
//        
//
//        service.getAllMemo = jest.fn(() => Promise.resolve([{ id: 1, content: "123", image: "jason" }]));
//        service.createMemo = jest.fn((content: string, image: string) => Promise.resolve());
//        //service.editMemo = jest.fn((id: number, content: string) => Promise.resolve({count: Boolean}));
//        //service.searchMemoByCode = jest.fn((code: number) =>
//        //  Promise.resolve({ id: 1, code, name: "jason" })
//        //);
//        controller = new MemoController(service);
//        req = {
//          params: {},
//          query: {},
//          body: {},
//        } as Request;
//        res = { status: jest.fn(() => res), json: jest.fn() } as any as Response;
//      });
//
//      it("get", async()=> {
//        await controller.getAllMemo(req, res);
//        expect(service.getAllMemo).toBeCalledTimes(1);
//        expect(res.json).toBeCalledTimes(1);
//        expect(res.json).toBeCalledWith([{ id: 1, content: "123", image: "jason" }])
//      })
//
//      //it("create", async()=> {
////
//      //  req.form! = {
//      //      fields: {content: "123"}
//      //      files: {image: {["newFilename": "123"]}
//      //  }
//      //  }
//        //const content = form.fields.content as string | undefined;
//        //const image = form.files.image?.["newFilename"];
//
//      //  await controller.createMemo(req, res);
//      //  expect(service.getAllMemo).toBeCalledTimes(1);
//      //  expect(res.json).toBeCalledTimes(1);
//      //  expect(res.json).toBeCalledWith([{ id: 1, content: "123", image: "jason" }])
//      //})
//
//      //it("edit", async()=> {
//      //  req.params.id = 1
//      //  req.body.content = "abc"
//      //  await controller.getAllMemo(req, res);
//      //  expect(service.getAllMemo).toBeCalledTimes(1);
//      //  expect(res.json).toBeCalledTimes(1);
//      //  expect(res.json).toBeCalledWith([{ id: 1, content: "123", image: "jason" }])
//      //})
//})