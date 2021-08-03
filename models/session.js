const mongoose = require('../db/connection');

// Define the User Schema 
const SessionSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    token: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    status: { type: String, required: true },
    start: { type: Number, required: true },
    last_access: { type: Number, required: true },
}, {
    timestamps: true
});

// Creating User model : We need to convert our schema into a model-- will be stored in 'users' collection. 
// Mongo does this for you automatically
// Models are responsible for creating and reading documents from the underlying MongoDB Database.
const Session = mongoose.model('Session', SessionSchema);

//make this exportable to be accessed in `server.js`
module.exports = Session;
