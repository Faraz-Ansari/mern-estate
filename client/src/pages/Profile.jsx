import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});

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

    return (
        <div className="max-w-lg mx-auto p-3">
            <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
            <form className="flex flex-col gap-4">
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                />

                <img
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser.avatar}
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
                    className="rounded-lg border p-3"
                />
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="rounded-lg border p-3"
                />
                <input
                    type="text"
                    id="password"
                    placeholder="Password"
                    className="rounded-lg border p-3"
                />
                <button className="text-white bg-slate-700 rounded-lg hover:opacity-95 p-3 disabled:opacity-80">
                    UPDATE
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-green-700 cursor-pointer">Sign out</span>
            </div>
        </div>
    );
}
