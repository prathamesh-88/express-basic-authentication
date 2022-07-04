const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

const {add_user, login} = require('./controllers/authenticator');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'))



app.post('/signup', (req, res) => {

    const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    }
    add_user(user)
    .then(result =>{
        res.send(result);
    })  

});


app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    login(user)
    .then(result =>{
        res.send(result);
    })

})


port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})