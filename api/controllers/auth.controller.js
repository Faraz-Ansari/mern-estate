import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    try {
        await user.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }
};
