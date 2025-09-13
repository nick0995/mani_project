import { Router } from "express";
import { body } from "express-validator";
import { uploader } from "../utils/upload.js";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";


const router = Router();
router.use(requireAuth);


router.get("/", async (req, res) => {
res.json((await query("SELECT * FROM stories ORDER BY date DESC", [])).rows);
});


router.post(
"/",
uploader.array("files", 10),
body("state").notEmpty(),
body("category").notEmpty(),
body("module_name").notEmpty(),
body("description").notEmpty(),
body("date").isISO8601(),
async (req, res) => {
const { state, category, module_name, description, date } = req.body;
const files = (req.files || []).map((f) => f.filename);
const out = await query(
"INSERT INTO stories(state,category,module_name,description,date,files) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
[state, category, module_name, description, date, files]
);
res.status(201).json(out.rows[0]);
}
);


export default router;