// import  jwt  from 'jsonwebtoken';

// const authMiddleware = async (req, res, next) =>{
//     const {token} = req.headers;
//     if(!token){
//         return res.json({success:false, message:'Not Authorized, login again'})
//     }

//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:'Error'})
//     }
// }

// export default authMiddleware;



// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not Authorized, login again' 
        });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Set userId in req object, not req.body
        req.userId = token_decode.id;
        
        console.log("Auth Middleware - User ID:", req.userId);
        next();
    } catch (error) {
        console.log("Auth middleware error:", error);
        res.status(401).json({ 
            success: false, 
            message: 'Invalid token or token expired' 
        });
    }
}

export default authMiddleware;