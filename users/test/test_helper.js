const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // use he global promise instead of

before((done)=>{
    mongoose.connect('mongodb://localhost/user_test');

    mongoose.connection
        .once('open',()=> {done();})
        .on('error', (error) => {
            console.warn('Warning', error);
        });

});


beforeEach((done)=>{ //some ES6 code

    const {users, comments, blogposts} = mongoose.connection.collections; // get collections from the mongoose
    users.drop(()=>{
        comments.drop(()=>{
            blogposts.drop(()=>{
                done();
            })
        })
        });
});