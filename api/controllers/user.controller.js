import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import Listing from "../models/listing.model.js";

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account"));
    }

    try {
        if (req.body.password) {
            req.body.password = await bcryptjs.hash(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            // This option returns the updated document
            { new: true }
        );

        // extracting the password from the updatedUser before sending it back to the client
        const { password, ...rest } = updateUser._doc;

        return res.status(200).json(rest);
    } catch (error) {
        return next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account"));
    }

    try {
        await User.findByIdAndDelete(req.params.id);

        res.clearCookie("access_token");
        res.status(200).json("User has been deleted");
    } catch (error) {
        return next(error);
    }
};

export const getUserListings = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return next(
                errorHandler(401, "You can only view your own listings")
            );
        }

        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
    } catch (error) {
        return next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const response = await User.findById(req.params.id);
        if (!response) {
            return next(errorHandler(404, "User not found"));
        }

        const { password: pass, ...rest } = response._doc;
        res.status(200).json(rest);
    } catch (error) {
        return next(error);
    }
};
