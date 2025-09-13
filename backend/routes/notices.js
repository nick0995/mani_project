import { Router } from "express";
import { body, validationResult } from "express-validator";
import { uploader } from "../utils/upload.js";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";


const router = Router();
router.use(requireAuth);


router.get("/", async (req, res) => {
const out = await query("SELECT * FROM notices ORDER BY date DESC", []);
res.json(out.rows);
});


router.post(
"/",
uploader.array("files", 10),
body("title").notEmpty(),
body("description").notEmpty(),
body("date").isISO8601(),
body("type").isIn(["info", "alert", "update"]).withMessage("invalid type"),
body("icon").isString(),
async (req, res) => {
const { title, description, date, type, icon } = req.body;
const files = (req.files || []).map((f) => f.filename);
const out = await query(
"INSERT INTO notices(title,description,date,type,icon,files) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
[title, description, date, type, icon, files]
);
res.status(201).json(out.rows[0]);
}
);


export default router;