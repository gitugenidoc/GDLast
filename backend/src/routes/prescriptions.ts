import { Hono } from "hono";
type Env = { Bindings: { DB: D1Database } };
const app = new Hono<Env>();
app.get("/", async (c) =>
  c.json({ status: "success", message: "Prescriptions" }),
);
app.post("/", async (c) => c.json({ status: "success" }, 201));
export default app;
