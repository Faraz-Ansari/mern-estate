import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [sideBarData, setSideBarData] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "created_at",
        order: "desc",
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    console.log(listings);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get("searchTerm");
        const type = urlParams.get("type");
        const parking = urlParams.get("parking");
        const furnished = urlParams.get("furnished");
        const offer = urlParams.get("offer");
        const sort = urlParams.get("sort");
        const order = urlParams.get("order");

        if (
            searchTerm ||
            type ||
            parking ||
            furnished ||
            offer ||
            sort ||
            order
        ) {
            setSideBarData({
                searchTerm: searchTerm || "",
                type: type || "all",
                parking: parking === "true" ? true : false,
                furnished: furnished === "true" ? true : false,
                offer: offer === "true" ? true : false,
                sort: sort || "created_at",
                order: order || "desc",
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const response = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await response.json();

            setLoading(false);
            setListings(data);
        };

        fetchListings();
    }, [location.search]);

    const navigateTo = useNavigate();

    const handleChange = (e) => {
        if (
            e.target.id === "all" ||
            e.target.id === "rent" ||
            e.target.id === "sell"
        ) {
            setSideBarData({
                ...sideBarData,
                type: e.target.id,
            });
        }

        if (e.target.id === "searchTerm") {
            setSideBarData({ ...sideBarData, searchTerm: e.target.value });
        }

        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setSideBarData({
                ...sideBarData,
                [e.target.id]:
                    e.target.checked || e.target.id === "true" ? true : false,
            });
        }

        if (e.target.id === "sort_order") {
            // split the value of the select element to get the sort and order values
            const sort = e.target.value.split("_")[0] || "created_at";
            const order = e.target.value.split("_")[1] || "desc";

            setSideBarData({ ...sideBarData, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", sideBarData.searchTerm);
        urlParams.set("type", sideBarData.type);
        urlParams.set("parking", sideBarData.parking);
        urlParams.set("furnished", sideBarData.furnished);
        urlParams.set("offer", sideBarData.offer);
        urlParams.set("sort", sideBarData.sort);
        urlParams.set("order", sideBarData.order);

        const searchQuery = urlParams.toString();
        navigateTo(`/search?${searchQuery}`);
    };

    return (
        <div className="flex md:flex-row flex-col">
            <div className="p-7 md:min-h-screen">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            Search Term:
                        </label>
                        <input
                            className="border border-slate-300 p-3 rounded-lg w-full"
                            type="text"
                            id="searchTerm"
                            placeholder="Search"
                            value={sideBarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type:</label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="all"
                                className="w-5"
                                checked={sideBarData.type === "all"}
                                onChange={handleChange}
                            />
                            <span>Rent & Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="rent"
                                className="w-5"
                                checked={sideBarData.type === "rent"}
                                onChange={handleChange}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="sell"
                                className="w-5"
                                checked={sideBarData.type === "sell"}
                                onChange={handleChange}
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="offer"
                                className="w-5"
                                checked={sideBarData.offer}
                                onChange={handleChange}
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Amenities:</label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5"
                                value={sideBarData.parking}
                                onChange={handleChange}
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                                value={sideBarData.furnished}
                                onChange={handleChange}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select
                            id="sort_order"
                            className="border border-slate-300 rounded-lg p-3"
                            onChange={handleChange}
                            defaultValue="created_at_desc"
                        >
                            <option value="regularPrice_desc">
                                Price high to low
                            </option>
                            <option value="regularPrice_asc">
                                Price low to high
                            </option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>

                    <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95">
                        Search
                    </button>
                </form>
            </div>
            <div className="ml-7 md:ml-2">
                <h1 className="text-3xl font-semibold text-slate-700 md:mt-7">
                    Listing Results:
                </h1>
            </div>
        </div>
    );
}
