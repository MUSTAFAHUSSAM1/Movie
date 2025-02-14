const conn = require("../db/dbconnection");
const util =require("util");
const authrized =async(req,res,next)=>{
const query =util.promisify(conn.query).bind(conn);
const {token}=req.headers;
const user = await query("select * from users where token=?",[token]);
if(user[0])
    {
        res.locals.user = user[0];
        next();
    }
    else{
        res.status(403).json({
            msg:"you are not authroized to access this route !"
        })
    }
}
module.exports = authrized;