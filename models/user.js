const mongoose = require('../db/connection');

// Define the User Schema 
const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    title: { type: String, required: false },
    company: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true  },
    status: { type: String, required: true },
    created: { type: Number, required: true },
    last_access: { type: Number, required: true },
}, {
    timestamps: true,
	toJSON: {
        virtuals: true,
        // ret is the returned Mongoose document
        transform: (_doc, ret) => {
            delete ret.password;
            return ret;
        },
    },    
});

// Creating User model : We need to convert our schema into a model-- will be stored in 'users' collection. 
// Mongo does this for you automatically
// Models are responsible for creating and reading documents from the underlying MongoDB Database.
const User = mongoose.model('User', UserSchema);

//make this exportable to be accessed in `server.js`
module.exports = User;

