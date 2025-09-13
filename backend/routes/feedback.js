import { Router } from "express";
import { body, param } from "express-validator";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";


const router = Router();
router.use(requireAuth);


router.get("/", async (req, res) => {
res.json((await query("SELECT * FROM feedback ORDER BY date DESC", [])).rows);
});


router.post(
"/",
body("type").isIn(["feedback", "help"]).withMessage("invalid type"),
body("message").notEmpty(),
body("date").isISO8601(),
async (req, res) => {
const { type, message, date } = req.body;
const out = await query(
"INSERT INTO feedback(type,message,date,status) VALUES($1,$2,$3,'open') RETURNING *",
[type, message, date]
);
res.status(201).json(out.rows[0]);
}
);


router.put("/:id/close", param("id").isInt(), async (req, res) => {
const out = await query("UPDATE feedback SET status='closed' WHERE id=$1 RETURNING *", [req.params.id]);
res.json(out.rows[0]);
});


export default router;

