const SHA256 = require("crypto-js/sha256");
const crypto = require('crypto');
const schemas = require('../schema/verify-schema.js');



function verify_user_details(user){
    console.log(schemas.user)
    for (i in schemas.user){
        console.log(i, user[i], typeof(user[i]), schemas.user[i]);
        if (!user[i] || typeof(user[i]) !== schemas.user[i]){
            return {
                status: false,
                error: 'User object does not match required format'
            };
        }
    }
    return {
        status: true,
        user: user
    };
}

function user_process(user){
    const salt      = crypto.randomBytes(32).toString('base64');
    const password  = SHA256(salt + user.password).toString();
    const temp_user = {
        fname : user['fname'],
        lname : user['lname'],
        email : user['email'],
        password : {
            password : password,
            salt: salt
        }
    }
    return temp_user;
}


function isExisting(user){

}


module.exports = {verify_user_details, user_process}
// user = {
//     fname : 'John',
//     lname : 'Doe',
//     email : 'johndoe@asd.com',
//     password : '123456'
// }

// verify_user(user);