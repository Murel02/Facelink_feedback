const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const salt_rounds = 10;

let userPosts = [];

// Opretter en ny brugerprofil
exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Authenticate and login
exports.login = async (req, res) =>{
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user){
            console.error('Email not found');
        }

        const passwordCheck = await bcrypt.compare(req.body.password, user.password);

        if (!passwordCheck){
            return res.status(400).send({message: 'Login failed'})
        }

        console.log("Login succesful")
        res.render('index');


    } catch (error){
        res.status(500).send('Error login in');
        console.error('Error login in');
    }
}

// update bruger


// Henter alle posts for en bestemt bruger
exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user_id: req.params.id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



