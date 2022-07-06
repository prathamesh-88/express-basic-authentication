const schemas = require('../schema/verify-schema.js');


function verify_user_details(user){
    for (i in schemas.user){
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

module.exports = {verify_user_details}
