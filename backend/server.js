const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('AI Employee Portal Backend Running');
});

app.get('/employees', (req, res) => {
    res.json([
        {
            id: 1,
            name: "Nikhil",
            role: "DevOps Engineer"
        },
        {
            id: 2,
            name: "Rahul",
            role: "HR Manager"
        }
    ]);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});