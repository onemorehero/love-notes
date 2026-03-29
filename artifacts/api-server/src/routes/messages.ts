import { Router } from "express";
import { db, messagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/messages", async (req, res) => {
  try {
    const messages = await db.select().from(messagesTable);
    res.json(messages);
  } catch (err) {
    req.log.error({ err }, "Failed to get messages");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/messages", async (req, res) => {
  try {
    const { text, sender } = req.body;
    if (!text || !sender) {
      res.status(400).json({ error: "text and sender are required" });
      return;
    }
    const [message] = await db.insert(messagesTable).values({ text, sender }).returning();
    res.status(201).json(message);
  } catch (err) {
    req.log.error({ err }, "Failed to create message");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(messagesTable).where(eq(messagesTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete message");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;