const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



exports.createuser = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { name, password, email, role, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone already exists" });
        }

        const passwordhash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: passwordhash,
            role,
            phone
        });

        res.status(201).json({ message: "User created", user });

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};

/*
exports.createuser = async (req, res) => {
    try {
        const {name, password, email, role, phone} = req.body;
         //check existing email
    const existingEmail = await User.findOne((email));
    if(existingEmail){
        return res.statue(400).json({message: 'user with Email already exist'})
    }

    const existingPhone = await User.findOne((phone));
    if(existingPhone){
        return res.statue(400).json({message: 'user with Same Phone Number already exist'})
    }
    //hash password
        const passwordhash = await bcrypt.hash(password, 10);

    const userRole = role === 'admin' ? 'salesperson' : role;
    const user = await User.create({
        name,
        password : passwordhash,
        email,
        phone
    });
  
     res.status(200).json({message: 'user created'})
    }
    
     catch(err)
    {
    res.status(500).json ({message: 'unable to create'})
    
    }
};*/
//LOGIN
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: 'Invalid Credentials'})
        }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'})
        }
        //Generate Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    );

    res.json({
        message: 'Login Successful',
        token,
        user: {
            id: user._id,
            name: user.name,
            role: user.role
        }
    });

    }catch (error) {
        console.error(err);
        res.status(500).json({message: error.message});
    }
} 
