
const router = require('express').Router()
const Admin = require('../schema/Admin')
const { loginValidation } = require('../services/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



router.post('api/login/', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
  
    const user = await Admin.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or password is wrong')
  
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Email or password is wrong')
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
  })
  
  module.exports = router
