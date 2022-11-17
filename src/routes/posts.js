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

router.get('/posts/:slug', (_req, __res)=> {
    Post.find({slug: _req.params.slug})
        .then(res => {
            __res.json(res)
        })
})

router.post('/posts', userValidate, (req, res) => {
    
    async function createPost(){
        const request = req.body
        const createSlug = (title) => {
            if(title[title.length-1] === ' '){
                title = title.slice(0, title.length-1)
                return title.toLowerCase().split(' ').join('-')
            }else{
                return title.toLowerCase().split(' ').join('-')
            }
        }
        
        const slug = createSlug(request.title)
        const post = new Post({
            title: request.title,
            desc : request.desc,
            body: request.body,
            createdAt: new Date(),
            tags: request.tags,
            img: request.img,
            slug: slug
        })
        post.validate((err) => {
            if(err){
                res.json(err)
            }else{
                res.json(post)
                post.save()
                res.send()
            }
        })
        
    }
    
    createPost()
})

module.exports = router;
