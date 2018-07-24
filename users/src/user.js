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


UserSchema.pre('remove', function(next){ // this is not the fat arrow functions
    // this === joe
    const BlogPost = mongoose.model('blogPost');

    BlogPost.remove({ _id: { $in: this.blogPosts } })
       .then(()=>next()); // if there is no then, the remove will not be executed
        // next -> go on to next middleware if it exist
});

const User = mongoose.model('user', UserSchema); // the user here means the whole collection

module.exports = User;