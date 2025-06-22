import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save()
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res)
            res.status(201).json({ message: "User registered successfully", newUser })
        }


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const user =await User.findOne({ email })

        const isMatch =await bcrypt.compare(password, user.password);


        if (!user || !isMatch) {
            return res.status(404).json({ message: "Invalid username or password" });
        }

        createTokenAndSaveCookie(user._id, res);
        res.status(201).json({
            message: "User Logged in successfully",
            user: {

                _id: user._id,
                name: user.name || "No Name Found",
                email: user.email,

            },
        });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }

}

export const logout = async (req, res) => {

    try {
        
        res.clearCookie('jwt');
        res.status(200).json({ message: "User Logged OUT successfully" });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }

}

