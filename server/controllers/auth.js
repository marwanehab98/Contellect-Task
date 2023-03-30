import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"


/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            username,
            password,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: passwordHash,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* LOGIN */
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, "Y0u-Kn0w-517-H4pp3n5-50m371m35-3v3n-7h0u9h-W3-W15h-1t-D1d-N07-6u7-W3-4r3-H3r3-70-H3lp-H0w3v3r-W3-C4n");
        res.status(200).json({ token, user: { username: user.username, _id: user._id } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}