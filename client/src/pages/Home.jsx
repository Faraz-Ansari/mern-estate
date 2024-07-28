import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
    const [offerListings, setOfferListings] = useState([]);
    const [sellListings, setSellListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);

    SwiperCore.use([Navigation]);

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const response = await fetch(
                    "/api/listing/get?offer=true&limit=4"
                );
                const data = await response.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.error(error);
            }
        };

        const fetchRentListings = async () => {
            try {
                const response = await fetch(
                    "/api/listing/get?type=rent&limit=4"
                );
                const data = await response.json();
                setRentListings(data);
                fetchSellListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSellListings = async () => {
            try {
                const response = await fetch(
                    "/api/listing/get?type=sell&limit=4"
                );
                const data = await response.json();
                setSellListings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOfferListings();
    }, []);

    return (
        <div>
            {/* top side */}
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-6xl text-slate-500 font-bold">
                    Find your next{" "}
                    <span className="text-slate-700">Perfect</span>
                    <br /> place with ease
                </h1>

                <div className="text-slate-700 text-xs md:text-base">
                    Discover your dream home effortlessly with CrestView's
                    tailored real estate solutions.
                    <br />
                    Elevate your home search with our personalized real estate
                    experience.
                </div>

                <Link
                    to="/search"
                    className="text-xs md:text-base text-blue-800 font-bold hover:underline"
                >
                    Let&apos;s get started...
                </Link>
            </div>

            {/* swiper */}
            <Swiper navigation>
                {offerListings &&
                    offerListings.length > 0 &&
                    offerListings.map((listing) => (
                        <SwiperSlide>
                            <div
                                className="h-[500px]"
                                key={listing._id}
                                style={{
                                    background: `url(${listing.imageURL[0]}) center no-repeat`,
                                    backgroundSize: "cover",
                                }}
                            ></div>
                        </SwiperSlide>
                    ))}
            </Swiper>

            {/* listing results  */}
            <div className="max-w-6xl mx-auto flex flex-col gap-8 my-10">
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h1 className="text-2xl font-semibold text-slate-600">
                                Recent offers
                            </h1>
                            <Link
                                to={`/search?offer=true`}
                                className="text-blue-800 hover:font-semibold"
                            >
                                Show more offers
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {offerListings.map((listing) => (
                                <ListingItem
                                    key={listing._id}
                                    listing={listing}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {rentListings && rentListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h1 className="text-2xl font-semibold text-slate-600">
                                Recent places for rent
                            </h1>
                            <Link
                                to={`/search?type=rent`}
                                className="text-blue-800 hover:font-semibold"
                            >
                                Show more places for rent
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {rentListings.map((listing) => (
                                <ListingItem
                                    key={listing._id}
                                    listing={listing}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {sellListings && sellListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h1 className="text-2xl font-semibold text-slate-600">
                                Recent places to buy
                            </h1>
                            <Link
                                to={`/search?type=sell`}
                                className="text-blue-800 hover:font-semibold"
                            >
                                Show more places to buy
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {sellListings.map((listing) => (
                                <ListingItem
                                    key={listing._id}
                                    listing={listing}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
