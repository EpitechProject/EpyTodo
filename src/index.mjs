import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cookieParserModule } from "./middleware/cookie.mjs";
import { errorHandlerModule } from "./middleware/error_handler.mjs";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function bootstrap_app() {
  const app = express();
const port = process.env.PORT || 3000;
const routerPath = path.join(__dirname, "routes");

  app.use(express.json());
  app.use(cookieParserModule);

  app.get("/", (req, res) => {
    res.send({ msg: "Welcome to EpyTodo API (v1)!" });
  });

  fs.readdirSync(routerPath).forEach(async (folder) => {
    const routePath = path.join(routerPath, folder, `${folder}.mjs`);
    if (fs.existsSync(routePath)) {
      const route = await import(routePath);
      app.use("/", route.default);
    }
  });

  app.use(errorHandlerModule);

  app.listen(port, () => {
    console.log(`EpiTodo is now online at port ${port}`);
  });
}

bootstrap_app();
