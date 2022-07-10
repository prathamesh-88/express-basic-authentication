//Hashing Setup
const crypto = require('crypto');
const SHA256 = require("crypto-js/sha256");

//Database controllers
const {add_entry, find_one_entry} = require('./database.js');


// Custom made utility function to verify user details
const {verify_user_details} = require('../utility/verify.js')

//Global constants
const {SUCCESS, FAILED} = require('../constants/global.js');

// Check if user already exists
async function user_exist(email){
    let result = await find_one_entry('template', 'users', {email: email});
    // console.log('Inside user exists', result)
    if (result.status === SUCCESS){
        return {
            status: true,
            result: result.result
        }
    }else if (result.status === FAILED){
        return {
            status: false,
            error: result.error
        }
    }else{
        return {
            status: false,
            error: 'Database error'
        }
    }
    
}


// Convert user object to correct format for database
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

// Controller for /signup
async function add_user(user){
    let results = {'Default': 'Default'};
    let is_existing_user = await user_exist(user.email);

    if (is_existing_user.status){
        results = {
            status: FAILED,
            error: 'User already exists'
        }
    }else if (!is_existing_user['status'] && is_existing_user.error === 'Database error'){
        results = {
            status: FAILED,
            error: 'Database error'
        }
    }else{
        const user_status = verify_user_details(user);
        if (user_status.status){
            user = user_process(user)
            let result = await add_entry('template', 'users', user);
            if (result.status === SUCCESS){
                results = {
                    status: SUCCESS,
                    _id: result._id
                }
            }else if (result.status === FAILED){
                results = {
                    status: FAILED,
                    error: result.error
                }
            }
        }else{
            results = {
                status: FAILED,
                error: user_status.error
            }
        }    
    }
    return results;

}

// Controller for /login
async function login(user){
    let results = {'Default': 'Default'};
    const query_result = await find_one_entry('template','users',{email: user.email});  
    console.log('Inside login', query_result)
    if (query_result.status === SUCCESS){
        const password = SHA256(query_result.result.password.salt + user.password).toString();
        if (query_result.result.password.password === password){
            results = {
                status: SUCCESS,
                _id: query_result.result._id,
            }
        }else{
            results = {
                status: FAILED,
                error: 'Incorrect password'
            }
        }
    }else{
        results = {
            status: FAILED,
            error: 'User does not exist'
        }
    }
    return results;
}


module.exports = {add_user, login};
    