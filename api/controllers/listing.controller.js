import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async(req, res, next) => {
    try {
        const listing = new Listing(req.body);
        await listing.save();
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
        return next(errorHandler(404, "Listing not found"));
    }

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only delete your own listings"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Listing deleted"});
    } catch(error) {
        return next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
        return next(errorHandler(404, "Listing not found"));
    }

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only update your own listings"));
    }

    try {
        await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: "Listing updated"});
    } catch(error) {
        return next(error);
    }
};

export const getListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing) {
            return next(errorHandler(404, "Listing not found"));
        }
        res.status(200).json(listing);
    } catch(error) {
        return next(error);
    }
};