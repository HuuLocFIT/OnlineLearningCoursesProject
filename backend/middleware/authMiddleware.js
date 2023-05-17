const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const db = require('../mysqldb/db');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try{
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const [rows, fields] = await db.connection.execute('SELECT * FROM user WHERE id=?', [decoded.id]);
        req.user = rows[0];
        next()
    }catch(error){
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
    }
  }
  if(!token){
    res.status(401)
    throw new Error('Not authorized, no token') 
  }
});

module.exports = {protect};
