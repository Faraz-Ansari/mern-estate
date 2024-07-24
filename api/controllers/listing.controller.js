import Listing from "../models/listing.model.js";

export const createListing = async(req, res, next) => {
    try {
        const listing = new Listing(req.body);
        await listing.save();
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};
