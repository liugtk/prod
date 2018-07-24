const mongoose = require ('mongoose');
const assert = require('assert');

const User = require ('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', ()=>{
    let joe, blogPost; // start from lower case => instance

    beforeEach((done)=>{
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title:'JS is Great', content: 'Yep it really is'});

        joe.blogPosts.push(blogPost); // although we push the entire instance, mongoose will create the reference

        //ES6 code
        Promise.all ([joe.save(), blogPost.save()]) // in this way all of three will work in parallel, save time
            .then(( )=> done());
    });

    it('Users clean up dangling blogPosts on remove', (done)=>{
        joe.remove()
            .then(()=>BlogPost.count())
            .then((count) =>{
                console.log('this is the console post ' + count );
                assert (count === 0);
                done();
            })
    });


});