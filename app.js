// Entry point file 
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();
const app = express();
app.use(express.json());
const DB_uri = process.env.DB_URI;


// Connect to MongoDB
mongoose.connect(DB_uri, {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

// Use routes
app.use('/login', userRoutes);
app.use('/', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));