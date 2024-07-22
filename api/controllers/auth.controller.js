import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    try {
        await user.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        // This error handling middleware is defined in index.js file
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) {
            next(errorHandler(400, "Invalid password"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...user } = validUser._doc;

        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(user);
    } catch (error) {
        next(error);
    }
};
