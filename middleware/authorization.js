const jwt = require("jsonwebtoken")
const authRouter = require("../router/auth.routes")

module.exports = async function(req, res, next) {
    try{
        const authorization = req.headers.authorization

    if(!authorization){
        return res.status(400).json({
            message: "Token not found"
        })
    }

        const changeToken = authorization.split(" ")

        const bearer = changeToken[0]

        const token = changeToken[1]

        if (bearer !== "Bearer" || !token) {
            return res.status(400).json({
            message: "Bearer token is required"
        })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode

      
        next()

    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
}

