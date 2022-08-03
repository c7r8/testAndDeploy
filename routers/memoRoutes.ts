import express from "express";
import { formidableMiddleware } from "../formidable";
import { isLoggedInAPI } from "../guards";
import { memoController } from "../server";

export const memoRoutes = express.Router();

memoRoutes.post("/", formidableMiddleware, memoController.createMemo);
memoRoutes.get("/", memoController.getAllMemo);
memoRoutes.put("/:id", isLoggedInAPI, memoController.editMemo);
memoRoutes.delete("/:id", isLoggedInAPI, memoController.deleteMemo);
memoRoutes.get("/likes", isLoggedInAPI, memoController.getLikeMemos);
memoRoutes.post("/:mid/likes", isLoggedInAPI, memoController.createLikeMemo);
