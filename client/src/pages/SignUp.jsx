import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigateTo = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Check if the form is filled or not
            if (
                formData.username === undefined ||
                formData.email === undefined ||
                formData.password === undefined
            ) {
                setLoading(false);
                setError("Please fill in the form");
                return;
            }

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }

            setLoading(false);
            setError(null);
            navigateTo("/sign-in");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    className="rounded-lg border p-3"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="rounded-lg border p-3"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="rounded-lg border p-3"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "LOADING..." : "SIGN UP"}
                </button>
                <OAuth />
            </form>
            <div className="flex mt-5 gap-2">
                <p>Already have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-700">Sign in</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
}
