const conn = require("../db/dbconnection");
const util =require("util");
const admin =async (req,res,next)=>{
    const query =util.promisify(conn.query).bind(conn);
    const {token}=req.headers;
   const admin= await query("select * from users where token=?",[token])
   if(admin[0]&& admin[0].role=="1")
    {
        next();
    }
    else
    {
        res.status(403).json({
            msg:"your not have this access",
        })
    }

}
module.exports=admin;
