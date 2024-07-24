export default function CreateListings() {
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Create a listing
            </h1>
            <form className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1 gap-4">
                    <input
                        type="text"
                        className="rounded-lg p-3 border"
                        placeholder="Name"
                        id="name"
                        maxLength="62"
                        minLength="10"
                        required
                    />
                    <textarea
                        type="text"
                        className="rounded-lg p-3 border"
                        placeholder="Description"
                        id="description"
                        required
                    />
                    <input
                        type="text"
                        className="rounded-lg p-3 border"
                        placeholder="Address"
                        id="address"
                        required
                    />
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="sell" />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="parking"
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="furnished"
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                className="p-3 border border-gray-300 rounded-lg"
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="10"
                                required
                            />
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="p-3 border border-gray-300 rounded-lg"
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="10"
                                required
                            />
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="p-3 border border-gray-300 rounded-lg"
                                type="number"
                                id="regularPrice"
                                min="1"
                                max="10"
                                required
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular price</p>
                                <span>($ / month)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="p-3 border border-gray-300 rounded-lg"
                                type="number"
                                id="discountedPrice"
                                min="1"
                                max="10"
                                required
                            />
                            <div className="flex flex-col items-center">
                                <p>Discounted price</p>
                                <span>($ / month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">
                        Images:
                        <span className="font-normal text-gray-700 ml-2">
                            The first image will be the cover (max 6)
                        </span>
                    </p>

                    <div className="flex gap-4">
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                        />
                        <button
                            className="p-3 border text-green-700 border-green-700 rounded-lg hover:shadow-lg disabled:opacity:80"
                        >
                            Upload
                        </button>
                    </div>
                <button className="p-3 text-white text-center bg-slate-700 rounded-lg hover:opacity-95 disabled:opacity-80">
                    Create Listing
                </button>
                </div>

            </form>
        </main>
    );
}
