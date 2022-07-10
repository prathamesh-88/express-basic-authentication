const path  = require('path');
const NODE_ENV =  'development'; //'production';
const LOG_DESTINATION = path.join(__dirname, '../access.logs');

if (NODE_ENV === 'development') {
    require('dotenv').config({path: path.join(__dirname, '..', '.env.dev')});
}else if(NODE_ENV === 'production'){
    require('dotenv').config();
}

module.exports = {
    LOG_DESTINATION,
    NODE_ENV,
    MONGODB_URI : process.env.MONGODB_URI,
    PORT        : process.env.PORT || 3000
}
