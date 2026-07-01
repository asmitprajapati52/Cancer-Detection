const jwt=require('jsonwebtoken');

const protect=async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];

            const decoded=jwt.verify(token, process.env.JWT_SECRET || || 'your_jwt_secret_key');

            req.user={_id:decoded.id};
            next();
        }catch(error){
            console.error("❌ Token Verification Failed:", error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if(!token){
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
}

module.exports={protect};