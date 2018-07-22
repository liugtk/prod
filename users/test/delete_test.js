const assert = require('assert');
const User = require('../src/user');


describe('Deleting a user', ()=>{
    let joe;

    beforeEach((done)=>{
        joe = new User({name:'Joe'});
        joe.save()
            .then(()=>done());
    });
    // model instance => joe
    //class => User
    it('model instance remove',(done)=>{
        joe.remove()
            .then(()=>
                User.findOne({name:'Joe'})
            )
            .then((user)=>{
                assert(user === null);
                done();
            })
    });

    it ('class method remove', (done)=>{
        User.remove({name:'Joe'})
            .then(()=>
                User.findOne({name:'Joe'})
            )
            .then((user)=>{
                assert(user === null);
                done();
            })
    });

    it ('class method findAndRemove',(done)=>{
        User.findOneAndRemove({name:'Joe'})
            .then(()=>
                User.findOne({name:'Joe'})
            )
            .then((user)=>{
                assert(user === null);
                done();
            })
    });

    it('class method findByIdRemove',(done)=>{
        User.findByIdAndRemove(joe._id)
            .then(()=>
                User.findOne({name:'Joe'})
            )
            .then((user)=>{
                assert(user === null);
                done();
            })
    });
})