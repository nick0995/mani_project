import { Router } from "express";
import { body, validationResult, param } from "express-validator";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";


const router = Router();
router.use(requireAuth);


router.get("/", async (req, res) => {
const out = await query("SELECT * FROM courses ORDER BY id DESC", []);
res.json(out.rows);
});


router.post(
"/",
body("name").notEmpty(),
body("category").notEmpty(),
body("description").notEmpty(),
async (req, res) => {
const { name, category, description, image_url } = req.body;
const out = await query(
"INSERT INTO courses(name,category,description,image_url) VALUES($1,$2,$3,$4) RETURNING *",
[name, category, description, image_url || null]
);
res.status(201).json(out.rows[0]);
}
);


router.put(
"/:id",
param("id").isInt(),
body("name").notEmpty(),
async (req, res) => {
const { id } = req.params;
const { name, category, description, image_url } = req.body;
const out = await query(
"UPDATE courses SET name=$1, category=$2, description=$3, image_url=$4 WHERE id=$5 RETURNING *",
[name, category, description, image_url || null, id]
);
res.json(out.rows[0]);
}
);


router.delete("/:id", param("id").isInt(), async (req, res) => {
await query("DELETE FROM courses WHERE id=$1", [req.params.id]);
res.json({ ok: true });
});


export default router;