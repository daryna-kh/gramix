import express from "express";
import authRouter from "./src/routes/auth";
import { errorHandler } from "./src/middleware/errorHandler";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth", authRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
