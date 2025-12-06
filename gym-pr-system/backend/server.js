
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


const db = mysql.createConnection({
    host: 'btdtl1htdtxov68zxyeb-mysql.services.clever-cloud.com',
    user: 'ugemb64ynwvmi9oe',
    password: '6by9npii6CkdLaB8ftxw',
    database: 'btdtl1htdtxov68zxyeb',
    port: 3306
});

db.connect(err => {
    if (err) console.error("❌ DB Error:", err);
    else console.log('✅ Connected to MySQL Database');
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length > 0) res.json({ success: true, user: result[0] });
            else res.json({ success: false, message: 'Invalid credentials' });
        }
    );
});

app.get('/members', (req, res) => {
    const sqlMembers = 'SELECT * FROM members';
    const sqlPRs = 'SELECT * FROM member_prs';

    db.query(sqlMembers, (err, members) => {
        if (err) return res.status(500).json(err);
        db.query(sqlPRs, (err, prs) => {
            if (err) return res.status(500).json(err);

            const fullData = members.map(member => ({
                id: member.member_id,
                name: member.full_name,
                age: member.age,
                weightClass: member.weight_class,
                image: member.profile_picture,
                prs: prs.filter(p => p.member_id === member.member_id).map(p => ({
                    id: p.pr_id,
                    category: p.category_name,
                    weight: p.weight_lifted,
                    weightClass: p.weight_class_snapshot
                }))
            }));
            res.json(fullData);
        });
    });
});




app.post('/members', (req, res) => {
    const { name, age, weightClass, image } = req.body;
    const sql = `INSERT INTO members (full_name, age, weight_class, profile_picture) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, age, weightClass, image], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});





app.delete('/members/:id', (req, res) => {
    db.query('DELETE FROM members WHERE member_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});




app.post('/prs', (req, res) => {
    const { memberId, category, weight, weightClass } = req.body;
    db.query(
        'INSERT INTO member_prs (member_id, category_name, weight_lifted, weight_class_snapshot) VALUES (?, ?, ?, ?)',
        [memberId, category, weight, weightClass],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId });
        }
    );
});




app.delete('/prs/:id', (req, res) => {
    db.query('DELETE FROM member_prs WHERE pr_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});




app.get('/categories', (req, res) => {
    db.query('SELECT * FROM pr_categories', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result.map(c => c.category_name));
    });
});




app.post('/categories', (req, res) => {
    db.query('INSERT INTO pr_categories (category_name) VALUES (?)', [req.body.name], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});



app.delete('/categories/:name', (req, res) => {
    db.query('DELETE FROM pr_categories WHERE category_name = ?', [req.params.name], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));