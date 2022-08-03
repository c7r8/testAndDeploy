import type { UserService } from "../services/UserService";
import type { Request, Response } from "express";
import { checkPassword } from "../hash";
import fetch from "cross-fetch";
import crypto from "crypto";

export class UserController {
  constructor(private service: UserService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json({ success: false, message: "invalid username/password" });
      return;
    }

    const user = await this.service.getUserByUsername(username);

    if (!user) {
      res.status(401).json({ message: "no such user or wrong password" });
      return;
    }
    
    if (await checkPassword(password, user.password)) {
      req.session["user"] = { id: user.id, username };
      res.json({ message: "success" });
    } else {
      res.status(401).json({ message: "no such user or wrong password" });
    }
  };

  getUserInfo = async (req: Request, res: Response) => {
    try {
      const user = req.session["user"];
      const { id, ...others } = user;
      res.json({ success: true, user: others });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ success: false, message: "internal server error" });
    }
  };

  loginGoogle = async (req: Request, res: Response) => {
    const accessToken = req.session?.["grant"].response.access_token;
    const fetchRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await fetchRes.json();
    let user = await this.service.getUserByUsername(result.email);
    if (!user) {
      const tempPassword = crypto.randomBytes(20).toString("hex");
      user = await this.service.insertUser(result.email, tempPassword);
    }

    if (req.session) {
      req.session["user"] = { id: user.id, username: user.username };
    }

    return res.redirect("/admin.html");
  };
}
