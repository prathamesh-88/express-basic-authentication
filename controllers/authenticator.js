require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const {verify_user, verify_user_details, user_process} = require('../utility/verify.js')
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const SHA256 = require("crypto-js/sha256");



async function user_exist(email){
    let results = {'Default': 'Default'};
    try{
        await client.connect();
        const db = client.db('template');
        const collection = db.collection('users');
        const result = await collection.findOne({email: email});
        if (result){
            return true;
        }else{
            return false;
        }
    }catch(err){
        results = {
            status: 'failed',
            error: {
                err, 
                message: 'Something went wrong'}
        }
    }finally{
        client.close();
    }
    return results;
}


async function add_user(user){
    let results = {'Default': 'Default'};
    const user_status = verify_user_details(user);
    if (user_exist(user.email)){
        results = {
            status: 'failed',
            error: 'User already exists'
        }
        return results
    }
    if (user_status.status){

        user = user_process(user)

        try{
            await client.connect();
            const db = client.db('template');
            const collection = db.collection('users');
            const result = await collection.insertOne(user);
            results = {
                status: 'success',
                _id: result.insertedId,
            }
        }catch(err){
            results = {
                status: 'failed',
                error: err
            }
        }finally{
            client.close();
        }
    }else{
        results = {
            status: 'failed',
            error: user_status.error
        }
    }
    
    return results;
}

async function login(user){
    let results = {'Default': 'Default'};

        try{
            await client.connect();
            const db = client.db('template');
            const collection = db.collection('users');
            const result = await collection.findOne({email: user.email});
         
            if (result){
                const password = SHA256(result.password.salt + user.password).toString();
                if (result.password.password === password){
                    results = {
                        status: 'success',
                        _id: result._id,
                    }
                }else{
                    results = {
                        status: 'failed',
                        error: 'Incorrect password'
                    }
                }
            }else{
                results = {
                    status: 'failed',
                    error: 'User does not exist'
                }
            }
        }catch(err){
            results = {
                status: 'failed',
                error: {
                    err, 
                    message: 'Something went wrong'}
            }
        }finally{
            client.close();
        }

    return results;
}

module.exports = {add_user, login};
    