import { useEffect, useRef, useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import {
    updateUserStart,
    updateUserFailure,
    updateUserSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signInStart,
    signInSuccess,
    signInFailure,
} from "../redux/user/userSlice";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercentage(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL });
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateUserStart());

            const response = await fetch(
                `/api/user/update/${currentUser._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart());
            const response = await fetch(
                `/api/user/delete/${currentUser._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }

            dispatch(deleteUserSuccess());
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        try {
            dispatch(signInStart());
            const response = await fetch("/api/auth/signout");
            const data = await response.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess());
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    const handleShowListings = async () => {
        try {
            setShowListingsError(false);
            const response = await fetch(
                `/api/user/listings/${currentUser._id}`
            );
            const data = await response.json();

            if (data.success === false) {
                setShowListingsError(true);
                return;
            }

            setUserListings(data);
        } catch (error) {
            setShowListingsError(true);
        }
    };

    const handleListingDelete = async (listingId) => {
        try {
            const response = await fetch(`/api/listing/delete/${listingId}`, {
                method: "DELETE",
            });

            const data = await response.json();
            if (data.success === false) {
                console.error(data.message);
                return;
            }
            setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3">
            <h1 className="text-3xl text-center my-5 font-semibold">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                />

                <img
                    onClick={() => fileRef.current.click()}
                    src={formData?.avatar || currentUser.avatar}
                    alt="profile pic"
                    className="rounded-full h-24 w-24 cursor-pointer object-cover self-center mt-2"
                />
                <p className="text-sm self-center">
                    {fileUploadError ? (
                        <span className="text-red-700">
                            Error Image upload (image must be less than 2 MB)
                        </span>
                    ) : filePercentage > 0 && filePercentage < 100 ? (
                        <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
                    ) : filePercentage === 100 ? (
                        <span className="text-green-700">
                            Image uploaded successfully
                        </span>
                    ) : (
                        ""
                    )}
                </p>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    className="rounded-lg border p-3"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                    className="rounded-lg border p-3"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="rounded-lg border p-3"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="text-white bg-slate-700 rounded-lg hover:opacity-95 p-3 disabled:opacity-80"
                >
                    {loading ? "LOADING..." : "UPDATE"}
                </button>
                <Link
                    className="text-white text-center bg-green-700 hover:opacity-90 border p-3 rounded-lg"
                    to="/create-listing"
                >
                    Create Listings
                </Link>
            </form>
            <div className="flex justify-between mt-5">
                <span
                    onClick={handleDelete}
                    className="text-red-700 cursor-pointer hover:font-semibold"
                >
                    Delete Account
                </span>
                <span
                    onClick={handleSignOut}
                    className="text-green-700 cursor-pointer hover:font-semibold"
                >
                    Sign out
                </span>
            </div>
            <p className="text-red-700 mt-2">{error ? error : ""}</p>
            <p className="text-green-700 mt-2">
                {updateSuccess ? "Data updated successfully" : ""}
            </p>

            <button
                onClick={handleShowListings}
                className="text-green-700 w-full hover:font-semibold"
            >
                Show listings
            </button>
            {showListingsError ? (
                <p className="text-red-700 text-sm mt-2">
                    Error fetching listings
                </p>
            ) : (
                ""
            )}

            <div className="flex flex-col gap-4">
                <h1 className="text-center mt-7 text-3xl font-semibold">
                    Your Listings
                </h1>
                {userListings &&
                    userListings.length > 0 &&
                    userListings.map((listing) => (
                        <div
                            className="border gap-4 border-slate-300 rounded-lg p-3 flex justify-between items-center"
                            key={listing._id}
                        >
                            <Link to={`/listing/${listing._id}`}>
                                <img
                                    className="h-16 w-16 object-contain"
                                    src={listing.imageURL[0]}
                                    alt="Listing image"
                                />
                            </Link>
                            <Link
                                to={`/listing/${listing._id}`}
                                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                            >
                                <p>{listing.name}</p>
                            </Link>

                            <div className="flex flex-col items-center">
                                <button
                                    onClick={() =>
                                        handleListingDelete(listing._id)
                                    }
                                    className="text-red-700 hover:font-semibold"
                                >
                                    Delete
                                </button>
                                <Link to={`/update-listing/${listing._id}`}>
                                    <button className="text-green-700 hover:font-semibold">
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
