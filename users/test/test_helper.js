const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // use he global promise instead of

before(()=>{
    mongoose.connect('mongodb://localhost/user_test');
    mongoose.connection
        .once('open',()=> {done();})
        .on('error', (error) => {
            console.warn('Warning', error);
        });

});


beforeEach((done)=>{
    mongoose.connection.collections.users.drop(()=>{
        //ready to run the next test!
        done();
    });
});