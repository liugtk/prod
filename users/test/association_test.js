const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comments');
const BlogPost = require('../src/blogPost');


describe('Associations',()=>{
    let joe, blogPost, comment; // start from lower case => instance

    beforeEach((done)=>{
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title:'JS is Great', content: 'Yep it realy is'});
        comment = new Comment({content: 'Congrats on great post'});

        joe.blogPosts.push(blogPost); // although we push the entire instance, mongoose will create the reference
        blogPost.comments.push(comment);
        comment.user = joe; //magic of mongoose, assign will make it a ref

        //ES6 code
        Promise.all ([joe.save(), blogPost.save(), comment.save()]) // in this way all of three will work in parallel, save time
            .then(( )=> done());
    });

    it('saves a relation between a user and a blogPost', (done)=>{
        User.findOne({name:'Joe'})
            .populate('blogPosts')
            .then((user)=>{
                assert(user.blogPosts[0].title === 'JS is Great');

                done();
            })
    });

    it('saves a full relation tree', (done)=>{
       User.findOne({name:'Joe'})
           .populate({
               path:'blogPosts', // look for the path and attempt to load up the associated thing
               populate: { // inside the blogPosts you fetched just, find the paths
                   path: 'comments', //
                   model: 'comment', // mongoose require this model
                   populate:{
                       path:'user',
                       model: 'user'
                   }
               }
           })
           .then((user)=>{
            console.log(user.blogPosts[0].comments[0]);
            done();
       })
    });
});


