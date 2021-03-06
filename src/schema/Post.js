const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        required: true
      },
    tags:{
        type: [String]
    }, 
    img:{
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    }
})

module.exports = mongoose.model('Post', postSchema)