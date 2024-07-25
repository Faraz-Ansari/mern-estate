import { useState } from "react";
import { app } from "../firebase";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

export default function CreateListings() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageURLs: [],
    });
    const [imageUploadError, setImageError] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageURLs.length < 7) {
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
                        imageURLs: formData.imageURLs.concat(urls),
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
            imageURLs: formData.imageURLs.filter((_, i) => i !== index),
        });
    };

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
                    {formData.imageURLs.length > 0 &&
                        formData.imageURLs.map((url, index) => (
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
                    <button className="p-3 text-white text-center bg-slate-700 rounded-lg hover:opacity-95 disabled:opacity-80">
                        Create Listing
                    </button>
                </div>
            </form>
        </main>
    );
}
