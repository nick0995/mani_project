import { Router } from "express";
import { body, param } from "express-validator";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";


const router = Router();
router.use(requireAuth);


router.get("/", async (req, res) => {
res.json((await query("SELECT * FROM id_requests ORDER BY date DESC", [])).rows);
});


router.post(
"/",
body("name").notEmpty(),
body("mobile").notEmpty(),
body("reason").notEmpty(),
body("date").isISO8601(),
async (req, res) => {
const { name, mobile, reason, date } = req.body;
const out = await query(
"INSERT INTO id_requests(name,mobile,reason,date,status) VALUES($1,$2,$3,$4,'pending') RETURNING *",
[name, mobile, reason, date]
);
res.status(201).json(out.rows[0]);
}
);


router.put("/:id/status", param("id").isInt(), body("status").isIn(["pending", "approved", "rejected"]), async (req, res) => {
const out = await query("UPDATE id_requests SET status=$1 WHERE id=$2 RETURNING *", [req.body.status, req.params.id]);
res.json(out.rows[0]);
});


export default router;