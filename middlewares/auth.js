import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    // console.log("token ifno", token)
    // console.log('req.headers.authorization', req.headers.authorization)

    if (!token) return res.status(401).json({ message: "No token Provied" })

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
                console.log("decode", decode)
                req.user = await User.findById(decode.id).select
                ('-password')
            next();

        } catch (error) {
            res.status(401).json({message:"Invailed or Expired token!"})
        }
}