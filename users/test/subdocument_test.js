const assert = require('assert');
const User = require('../src/user');

describe('SubDocuments',()=>{
    it('can create a subDocument', (done) =>{
        const joe = new User ({
            name:'Joe',
            posts: [{title : 'PostTitle'}]
        });

        joe.save()
            .then( ()=> User.findOne({name:'Joe'}))
            .then((user)=> {
                assert(user.posts[0].title === 'PostTitle');
                done();
            })
    });

    it('Can add subDocuments to an existing record',(done)=>{
       // create Joe
        const joe = new User ({
            name: 'Joe',
            posts: []
        });
       // Save Joe
        joe.save()
            .then(() => User.findOne({name: 'Joe'}))//Fetch Joe
            .then((user) => {
                user.posts.push({title: 'New Post'}); // add a post
                return user.save(); //save Joe
            })
            .then(() => User.findOne({name:'Joe'})) // save() was returned, and them will be execute
            .then((user) => { // execute after findOne
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('can remove an existing subDocuments', (done)=>{
        const joe = new User({
            name : 'Joe',
            posts : [{title : 'New Title'}]
        });
        joe.save()
            .then( () => User.findOne({name: 'Joe'}))
            .then((user) => {
                user.posts[0].remove(); // this is changing the fetched local data
                return user.save();
            })
            .then(()=>User.findOne({name:'Joe'}))
            .then((user) =>{
                assert(user.posts.length === 0);
                done();
            });
    })

});