const jwt=require('jsonwebtoken');
const jwtAuthMiddleware=(req,res,next)=>{
    //extract jwt token from request header
    const token=req.header.authorization.split('')[1];
    ///here bearer keyword goes into 0 and 1
    if(!token) return res.status(401).json({error:'Unauthorized'});

try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    //Attach user Info to req.object
req.user=decoded;
next();




} catch (error) {
    console.log(error);
    res.status(400).json({error:'Invalid token'})
}


// Function to generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
}

}

module.exports={jwtAuthMiddleware,generateToken};

