import jwt from 'jsonwebtoken'

function VerifyDriver(req,res,next) {
    const token = req.cookies.driver_token;
    if(!token){
        return res.status(401).json({message:'Driver not found'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.driver={
            _id: decoded._id,
            email: decoded.email,
            name: decoded.name
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired rider token" });
    }
}

export default VerifyDriver;