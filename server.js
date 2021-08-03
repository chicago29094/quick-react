const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Connection To DB
const userController = require('./controllers/user');
app.use('/api', userController);

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
})

