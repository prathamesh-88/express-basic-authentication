var fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const {NODE_ENV, PORT, LOG_DESTINATION} = require('./constants/environment');
const {add_user, login} = require('./controllers/authenticator');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}else{
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(LOG_DESTINATION, { flags: 'a' });
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
}



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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})