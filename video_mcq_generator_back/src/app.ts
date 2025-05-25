import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UploadController } from "./controllers/UploadController";

const app = createExpressServer({
  controllers: [UploadController],
  cors: {
    origin: true,
    credentials: true,
  }
});

export { app };
