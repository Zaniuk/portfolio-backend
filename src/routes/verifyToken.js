const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    let token = req.header('Authorization') || req.header('authorization')
    token  = token.replace('Bearer ', '')
    if (!token) return res.status(401).send('Access denied')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}