const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can not be empty'
    },
    email: {
        type: String,
        required: 'email can not be empty'
        
    },
    password: {
        type: String,
        required: 'password can not be empty'
    },
    saltSecret: String

});

// userSchema.pre('save', functions (next) {
//     bcrypt.genSalt (10, (err, salt) => {
 
//         bcrypt.hash(this.password, salt , (err, hash) => {
//             this.password =hash;
//             this.saltSecret = salt;
//             next()
//         });
//     });
// });

userSchema.pre('save', (next)=> {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt , (err, hash) => {
            this.password =hash;
            this.saltSecret = salt;
            next()
        });
    });
});

mongoose.model('User', userSchema);