const express = require('express');
const connection = require('./connections/connection')
const loginRoutes = require('./routes/login-register')
const crudrouts = require('./routes/crudrouts')
const jwt = require('jsonwebtoken');

const port = 3000;
const app = express();
connection()

 //   ----------------------------------------middlewares-----------------------
app.post('/posts', (req, res, next) => {

    const token = req.headers.authorization
    console.log(token);
    if (token) {

        jwt.verify(token,"secret" ,function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    status: "failed",
                    message: "Token is not valid "
                })
            }
            console.log(decoded);
            req.user = decoded.data

            next();
        });

    } else {
        return res.status(403).json({
            status: "failed",
            message: "Token is not authenticarted "
        })
    }
})
//---------------------------------------------------------------------
app.get('/posts', (req, res, next) => {

    const token = req.headers.authorization
    console.log(token);
    if (token) {

        jwt.verify(token,"secret" ,function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    status: "failed",
                    message: "Token is not valid "
                })
            }
            console.log(decoded);
            req.user = decoded.data

            next();
        });

    } else {
        return res.status(403).json({
            status: "failed",
            message: "Token is not authenticarted "
        })
    }
})
//-------------------------------------------------------------------
app.use(loginRoutes);
app.use(crudrouts);


app.get('/', (req, res) => {

    res.send("This is home page ");

});
app.listen(port, () => { console.log(`server is running at ${port}`) });