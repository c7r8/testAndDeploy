import type { MemoService } from "../services/MemoService";
import type { Request, Response } from "express";
import type { Server as SocketIO } from "socket.io";

export class MemoController {
  //constructor(private service: MemoService) {}
  constructor(private service: MemoService, private io: SocketIO) {}

  createMemo = async (req: Request, res: Response) => {
    const form = req.form!;
    const content = form.fields.content as string | undefined;
    const image = form.files.image?.["newFilename"];

    if (!content) {
      res.status(400).json({ success: false, message: "missing content" });
      return;
    }

    await this.service.createMemo(content, image);

    this.io.emit("create-memo");
    res.json({ success: true });
  };

  getAllMemo = async (req: Request, res: Response) => {
    const memos = await this.service.getAllMemo();
    res.json(memos);
  };

  editMemo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const content = req.body.content;

    if (isNaN(id) || !content) {
      res.status(400).json({ success: false, message: "invalid request" });
      return;
    }

    if (await this.service.editMemo(id, content)) {
      res.json({ success: true });
      return;
    }
    res.status(400).json({ success: false, message: "memo not found" });
  };

  deleteMemo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "invalid request" });
      return;
    }

    this.service.deleteMemo(id);
    res.json({ success: true });
  };

  getLikeMemos = async (req: Request, res: Response) => {
    const userId = parseInt(req.query.uid as string, 10);
    if (isNaN(userId)) {
      res.json({ memos: [] });
      return;
    }

    const memos = await this.service.getLikeMemos(userId);
    res.json({ user_id: userId, memos });
  };

  createLikeMemo = async (req: Request, res: Response) => {
    try {
      const user = req.session["user"];
      const memoId = parseInt(req.params.mid, 10);
      if (isNaN(memoId)) {
        res.status(400).json({ message: "invalid memo id" });
        return;
      }

      await this.service.createLikeMemo(user.id, memoId);
      res.json({ result: true });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ success: false, message: "internal server error" });
    }
  };
}
