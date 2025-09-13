import { Router } from "express";


router.get("/find", q("belt").optional(), q("mobile").optional(), async (req, res) => {
const { belt, mobile } = req.query;
if (!belt && !mobile) return res.status(400).json({ error: "Provide belt or mobile" });
const out = await query(
"SELECT * FROM users WHERE ($1::text IS NULL OR belt=$1) OR ($2::text IS NULL OR mobile=$2) LIMIT 1",
[belt || null, mobile || null]
);
res.json(out.rows[0] || null);
});


router.post(
"/",
body("name").notEmpty(),
body("rank").notEmpty(),
body("belt").notEmpty(),
body("mobile").notEmpty(),
body("email").isEmail(),
async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { name, rank, belt, mobile, email } = req.body;
const out = await query(
"INSERT INTO users(name,rank,belt,mobile,email) VALUES($1,$2,$3,$4,$5) RETURNING *",
[name, rank, belt, mobile, email]
);
res.status(201).json(out.rows[0]);
}
);


router.put(
"/:id",
param("id").isInt(),
body("name").notEmpty(),
body("rank").notEmpty(),
body("belt").notEmpty(),
body("mobile").notEmpty(),
body("email").isEmail(),
async (req, res) => {
const { id } = req.params;
const { name, rank, belt, mobile, email } = req.body;
const out = await query(
"UPDATE users SET name=$1, rank=$2, belt=$3, mobile=$4, email=$5 WHERE id=$6 RETURNING *",
[name, rank, belt, mobile, email, id]
);
res.json(out.rows[0]);
}
);


router.delete("/:id", param("id").isInt(), async (req, res) => {
await query("DELETE FROM users WHERE id=$1", [req.params.id]);
res.json({ ok: true });
});


export default router;