import { Router } from "express";
import { body, validationResult, param, query as q } from "express-validator";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";


const router = Router();
router.use(requireAuth);


router.get("/", async (req, res) => {
const out = await query("SELECT * FROM assessments ORDER BY date DESC", []);
res.json(out.rows);
});


router.get("/by-user/:userId", param("userId").isInt(), async (req, res) => {
const out = await query("SELECT * FROM assessments WHERE user_id=$1 ORDER BY date DESC", [req.params.userId]);
res.json(out.rows);
});


router.post(
"/",
body("user_id").isInt(),
body("course_id").isInt(),
body("score").isInt({ min: 0, max: 100 }),
body("passed").isBoolean(),
body("date").isISO8601(),
async (req, res) => {
const { user_id, course_id, score, passed, date } = req.body;
const out = await query(
"INSERT INTO assessments(user_id,course_id,score,passed,date) VALUES($1,$2,$3,$4,$5) RETURNING *",
[user_id, course_id, score, passed, date]
);
res.status(201).json(out.rows[0]);
}
);


router.put(
"/:id/certificate",
param("id").isInt(),
body("certificate_url").isString(),
async (req, res) => {
const out = await query(
"UPDATE assessments SET certificate_url=$1 WHERE id=$2 RETURNING *",
[req.body.certificate_url, req.params.id]
);
res.json(out.rows[0]);
}
);


router.delete("/:id", param("id").isInt(), async (req, res) => {
await query("DELETE FROM assessments WHERE id=$1", [req.params.id]);
res.json({ ok: true });
});


export default router;