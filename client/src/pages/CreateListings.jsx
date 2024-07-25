import { useState } from "react";
import { app } from "../firebase";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListings() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageURL: [],
        name: "",
        description: "",
        address: "",
        type: "rent",
        parking: false,
        furnished: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountedPrice: 0,
    });
    const [imageUploadError, setImageError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useSelector((state) => state.user);
    const navigateTo = useNavigate();

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageURL.length < 7) {
            setUploading(true);
            setImageError("");

            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageURL: formData.imageURL.concat(urls),
                    });
                    setImageError("");
                    setUploading(false);
                })
                .catch((error) => {
                    setImageError("Image upload failed (2 MB max per image)");
                    setUploading(false);
                });
        } else {
            setImageError("You can only upload 6 images per listing");
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        snapshot.bytesTransferred / snapshot.totalBytes;
                    console.log(
                        `Upload is ${Math.round(progress) * 100}% done`
                    );
                },
                (err) => {
                    reject(err);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            resolve(downloadURL);
                        }
                    );
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageURL: formData.imageURL.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === "sell" || e.target.id === "rent") {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === "number" ||
            e.target.type === "text" ||
            e.target.type === "textarea"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageURL.length < 1) {
                return setError("You need to upload at least one image");
            }

            // the + sign is used to convert the string to a number
            if (+formData.regularPrice < +formData.discountedPrice) {
                return setError(
                    "Discounted price must be lower than regular price"
                );
            }

            setLoading(true);
            setError(false);

            const response = await fetch("/api/listing/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, userRef: currentUser._id }),
            });

            const data = await response.json();

            if (data.success === false) {
                setLoading(false);
                setError(data.message);
            }

            setLoading(false);
            navigateTo(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Create a listing
            </h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-4"
            >
                <div className="flex flex-col flex-1 gap-4">
                    <input
                        type="text"
                        className="rounded-lg p-3 border"
                        placeholder="Name"
                        id="name"
                        maxLength="62"
                        minLength="5"
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        type="text"
                        className="rounded-lg p-3 border"
                        placeholder="Description"
                        id="description"
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        type="text"
                        className="rounded-lg p-3 border"
                        placeholder="Address"
                        id="address"
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2 ">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="sell"
                                onChange={handleChange}
                                checked={formData.type === "sell"}
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="rent"
                                onChange={handleChange}
                                checked={formData.type === "rent"}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="parking"
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="furnished"
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="offer"
                                onChange={handleChange}
                                checked={formData.offer}
                            />
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
                                onChange={handleChange}
                                value={formData.bedrooms}
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
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="p-3 border border-gray-300 rounded-lg"
                                type="number"
                                id="regularPrice"
                                min="50"
                                max="1000000"
                                required
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular price</p>
                                <span>($ / month)</span>
                            </div>
                        </div>

                        {/* if the offer is checked, show the discounted price input */}
                        {formData.offer && (
                            <div className="flex items-center gap-2">
                                <input
                                    className="p-3 border border-gray-300 rounded-lg"
                                    type="number"
                                    id="discountedPrice"
                                    min="0"
                                    max="1000000"
                                    required
                                    onChange={handleChange}
                                    value={formData.discountedPrice}
                                />
                                <div className="flex flex-col items-center">
                                    <p>Discounted price</p>
                                    <span>($ / month)</span>
                                </div>
                            </div>
                        )}
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
                            onChange={(e) => {
                                setFiles(e.target.files);
                            }}
                            className="p-3 border border-gray-300 rounded w-full"
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                        />
                        <button
                            type="button"
                            disabled={uploading}
                            onClick={handleImageSubmit}
                            className="p-3 border text-green-700 border-green-700 rounded-lg hover:shadow-lg disabled:opacity:80"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                    <p className="text-sm text-red-700">
                        {imageUploadError && imageUploadError}
                    </p>
                    {formData.imageURL.length > 0 &&
                        formData.imageURL.map((url, index) => (
                            <div
                                key={url}
                                className="flex justify-between p-3 border border-gray-300 rounded-lg items-center"
                            >
                                <img
                                    src={url}
                                    className="h-20 w-25 rounded-lg object-cover "
                                    alt="image"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="p-3 text-red-700 rounded-lg border-red-600 border hover:shadow-md"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    <button
                        disabled={loading || uploading}
                        className="p-3 text-white text-center bg-slate-700 rounded-lg hover:opacity-95 disabled:opacity-80"
                    >
                        {loading ? "Creating..." : "Create listing"}
                    </button>
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                </div>
            </form>
        </main>
    );
}
