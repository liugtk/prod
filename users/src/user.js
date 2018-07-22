const mongoose = require('mongoose');
const PostSchema = require('./post');


const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        validate:{
          validator: (name)=> name.length > 2 ,
          message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.'],
    },
    //postCount: Number, //delete this and use it as a virtual type
    posts : [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function(){
    return this.posts.length;
});

const User = mongoose.model('user', UserSchema); // the user here means the whole collection

module.exports = User;