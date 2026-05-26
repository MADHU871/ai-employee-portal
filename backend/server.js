const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "employeeportalkey";

const users = [

    {
        id: 1,
        username: "hr",
        password: "hr123",
        role: "HR"
    },

    {
        id: 2,
        username: "employee",
        password: "emp123",
        role: "Employee"
    }

];

app.get('/', (req, res) => {

    res.send('AI Employee Portal Backend Running');

});

app.post('/login', (req, res) => {

    const { username, password } = req.body;

    const user = users.find(

        u => u.username === username && u.password === password
    );

    if (!user) {

        return res.status(401).json({

            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(

        {
            username: user.username,
            role: user.role
        },

        SECRET_KEY,

        {
            expiresIn: '1h'
        }
    );

    res.json({

        token,
        role: user.role
    });
});

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {

        return res.status(403).json({

            message: "Token Required"
        });
    }

    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, authData) => {

        if (err) {

            return res.status(403).json({

                message: "Invalid Token"
            });
        }

        req.user = authData;

        next();
    });
}

app.get('/employees', verifyToken, (req, res) => {

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