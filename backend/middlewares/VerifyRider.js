import jwt from 'jsonwebtoken'

function VerifyRider(req, res, next) {
    try {
        const token = req.cookies.rider_token;
        if (!token) {
            return res.status(401).json({ message: 'Rider not found' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.rider = {
            _id: decoded._id,
            email: decoded.email,
            name: decoded.name
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired rider token" });

    }
}

export default VerifyRider