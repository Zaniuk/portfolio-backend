const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userValidate = require('./verifyToken')
const Post = require('../schema/Post')
dotenv.config()
const Admin = require('../schema/Admin')

const connectionUrl = process.env.CONNECTION_URL
mongoose.connect(connectionUrl, (err) => {
    if(err) throw err
    else console.log('DB Connected')
})

router.get('/posts', (_req, __res)=> {
    Post.find({})
        .then(res => {
            __res.json(res)
        })
})

router.post('/posts', userValidate, (req, res) => {
    
    async function createPost(){
        const request = req.body
        const post = new Post({
            title: request.title,
            desc : request.desc,
            body: request.body,
            createdAt: new Date(),
            tags: request.tags,
            img: request.img
        })
        post.validate((err) => {
            if(err){
                res.json(err)
            }else{
                res.json(post)
                post.save()
            }
        })
        
    }
    createPost()
})

module.exports = router;
