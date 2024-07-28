import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = new Listing(req.body);
        await listing.save();
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only delete your own listings"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Listing deleted" });
    } catch (error) {
        return next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only update your own listings"));
    }

    try {
        await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Listing updated" });
    } catch (error) {
        return next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing not found"));
        }
        res.status(200).json(listing);
    } catch (error) {
        return next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        // If offer is not provided or is false, return both sell and rent listings
        if (offer == "false" || offer == undefined) {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;
        // If furnished is not provided or is false, return both furnished and unfurnished listings
        if (furnished == "false" || furnished == undefined) {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;
        //  If parking is not provided or is false, return both listings with and without parking
        if (parking == "false" || parking == undefined) {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;
        // If type is not provided or is all, return both sell and rent listings
        if (type == "all" || type == undefined) {
            type = { $in: ["sell", "rent"] };
        }

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";

        const listings = await Listing.find({
            // Search by searchTerm in the name field and ignore the case sensitivity
            name: { $regex: searchTerm, $options: "i" },
            offer,
            furnished,
            parking,
            type,
        })
        //  Sort the listings by the sort field in the order specified
            .sort({ [sort]: order })
            // Limit the number of listings returned
            .limit(limit)
            //  Skip the first startIndex listings
            .skip(startIndex);

        res.status(200).json(listings);
    } catch (error) {
        return next(error);
    }
};
