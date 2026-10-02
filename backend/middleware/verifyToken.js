const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || 'secret'

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'failed', message: '請先登入' });
    }

    const token = authHeader.replace('Bearer ', '');

    try{
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        next()
        
    }catch(err){
        return res.status(401).json({ status: 'failed', message: 'Token 無效或已過期'})
    }
}

module.exports = verifyToken