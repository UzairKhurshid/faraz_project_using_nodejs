const jwt=require('jsonwebtoken')
module.exports = async(req,res,next)=>{
    const authHeader=req.get("Authorization")
    if(!authHeader){
        req.isAuth=false
        throw new Error('Authentication Failed')
    }
    const token=authHeader.split(' ')[1]
    if(!token || token == ""){
        req.isAuth=false
        throw new Error('Authentication Failed')
    }
    let decodedToken;
    try {
        decodedToken=jwt.verify(token,process.env.HASHSECRET)
        if(!decodedToken){
            req.isAuth=false
            throw new Error('Authentication Failed')
        }
        req.decodedToken=decodedToken
        req.userID=decodedToken.userID
        req.userEmail=decodedToken.userEmail
        req.status=decodedToken.status
        req.isAuth=true
        next()
    } catch (e) {
        return res.status(400).send('Authorization failed')
    }
}