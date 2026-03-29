import { Router, type IRouter } from "express";
import { db, messagesTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import {
  CreateMessageBody,
  DeleteMessageParams,
  GetMessagesResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/messages", async (req, res) => {
  const rows = await db
    .select()
    .from(messagesTable)
    .orderBy(desc(messagesTable.createdAt));

  const data = GetMessagesResponse.parse(
    rows.map((r) => ({
      id: r.id,
      sender: r.sender,
      text: r.text,
      createdAt: r.createdAt.toISOString(),
    }))
  );
  res.json(data);
});

router.post("/messages", async (req, res) => {
  const body = CreateMessageBody.parse(req.body);
  const [row] = await db
    .insert(messagesTable)
    .values({ sender: body.sender, text: body.text })
    .returning();

  res.status(201).json({
    id: row.id,
    sender: row.sender,
    text: row.text,
    createdAt: row.createdAt.toISOString(),
  });
});

router.delete("/messages/:id", async (req, res) => {
  const { id } = DeleteMessageParams.parse({ id: req.params.id });
  await db.delete(messagesTable).where(eq(messagesTable.id, id));
  res.status(204).send();
});

export default router;
