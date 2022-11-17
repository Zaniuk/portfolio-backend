
const router = require('express').Router()
const Admin = require('../schema/Admin')
const { loginValidation } = require('../services/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
  
    const user = await Admin.findOne({ email: req.body.email })
    // if (!user) return res.status(400).send('Email or password is wrong')
    // bcrypt.hash(req.body.password, 10).then(res)
    // const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(user.password == req.body.password){
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.set({
      'Autohrization': `Bearer ${token}`
    })
    res.send({token})
    }else{
      res.send('Email or password is wrong')
    }
    // if (!validPassword) return res.status(400).send('Email or password is wrong')
    
  })
  
  module.exports = router
