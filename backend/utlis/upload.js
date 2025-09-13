import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


const root = process.cwd();
const uploadDir = path.join(root, process.env.UPLOADS_DIR || "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });


const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, uploadDir),
filename: (req, file, cb) => {
const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
cb(null, unique + path.extname(file.originalname));
}
});


export const uploader = multer({ storage });
export const uploadsPath = uploadDir;