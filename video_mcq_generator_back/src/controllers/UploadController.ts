import {
  JsonController,
  Post,
  UploadedFile,
  Res,
} from "routing-controllers";
import { Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

@JsonController()


export class UploadController {
  @Post("/upload")
  upload(
    @UploadedFile("file", { options: upload }) file: Express.Multer.File
    ,
    @Res() res: Response
  ) {
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const filePath = path.resolve(file.path);

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath), {
      filename: file.originalname,
    });

    return axios
      .post(`${process.env.LLM_URL}/process`, formData, {
        headers: formData.getHeaders(),
        maxBodyLength: Infinity,
      })
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
}
