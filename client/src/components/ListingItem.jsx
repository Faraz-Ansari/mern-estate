import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
    return (
        <div className=" shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[330px]">
            <Link to={`/listing/${listing._id}`}>
                <img
                    src={listing.imageURL[0]}
                    alt="listing cover"
                    className="h-[300px] md:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-200"
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="text-lg font-semibold text-slate-700 truncate">
                        {listing.name}
                    </p>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className="h-4 w-4 text-green-700" />
                        <p className="text-sm text-gray-700 truncate w-full">
                            {listing.address}
                        </p>
                    </div>
                    <p className="line-clamp-2 text-gray-600 text-sm">
                        {listing.description}
                    </p>
                    <p className=" mt-4 font-semibold">
                        ₹{""}
                        {listing.offer
                            ? listing.discountedPrice.toLocaleString("en-IN")
                            : listing.regularPrice.toLocaleString("en-IN")}
                        {listing.type === "rent" && " / month"}
                    </p>

                    <div className="text-green-700 flex items-center gap-2">
                        <div className="font-bold text-sm">
                            {
                                listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`
                            }
                        </div>
                        <div className="font-bold text-sm">
                            {
                                listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
