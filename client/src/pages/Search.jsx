import React from "react";

export default function Search() {
    return (
        <div className="flex md:flex-row flex-col">
            <div className="p-7 md:min-h-screen">
                <form className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            Search Term:
                        </label>
                        <input
                            className="border border-slate-300 p-3 rounded-lg w-full"
                            type="text"
                            id="searchTerm"
                            placeholder="Search"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="all" className="w-5" />
                            <span>Rent & Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="sell" className="w-5" />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5" />
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
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                            />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select
                            id="sort_order"
                            className="border border-slate-300 rounded-lg p-3"
                        >
                            <option>Price high to low</option>
                            <option>Price low to high</option>
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95">
                        Search
                    </button>
                </form>
            </div>
            <div>
                <h1 className="text-3xl font-semibold text-slate-700 mt-5">
                    Listing Results:
                </h1>
            </div>
        </div>
    );
}
