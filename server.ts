import http from "http";
import express from "express";
import path from "path";
import expressSession from "express-session";

import { Server as SocketIO } from "socket.io";
import { isLoggedInStatic } from "./guards";
import { link } from "./db_knex";
import dotenv from "dotenv";
import grant from "grant";

dotenv.config();

const grantExpress = grant.express({
  defaults: {
    origin: "http://localhost:8080",
    transport: "session",
    state: true,
  },
  google: {
    key: process.env.GOOGLE_CLIENT_ID || "",
    secret: process.env.GOOGLE_CLIENT_SECRET || "",
    scope: ["profile", "email"],
    callback: "/login/google",
  },
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  expressSession({
    secret: "XXXXXXXX",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(grantExpress as express.RequestHandler);

const server = new http.Server(app);
const io = new SocketIO(server);

io.on("connection", function (socket) {
  console.log(`[INFO] Someone is connected with Socket: ${socket.id}`);

  socket.emit("hello", { msg: "Hello Client" });
});

app.use((req, res, next) => {
  console.log(`req path: ${req.path}, method: ${req.method}`);
  next();
});

import { MemoService } from "./services/MemoService";
import { MemoController } from "./controllers/MemoController";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";

const memoService = new MemoService(link);
const userService = new UserService(link);
//export const memoController = new MemoController(memoService);
export const memoController = new MemoController(memoService, io);
export const userController = new UserController(userService);

import { memoRoutes } from "./routers/memoRoutes";
import { userRoutes } from "./routers/userRoutes";

app.use("/memos", memoRoutes);
app.use(userRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "uploads")));
app.use(isLoggedInStatic, express.static(path.join(__dirname, "private")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
