import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
    const [formData, setFormData] = useState({});

    const { loading, error } = useSelector((state) => state.user);

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(signInStart());

            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }

            dispatch(signInSuccess(data));
            navigateTo("/");
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="rounded-lg border p-3"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="rounded-lg border p-3"
                    onChange={handleChange}
                    required
                />
                <button
                    disabled={loading}
                    className="p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "LOADING..." : "SIGN IN"}
                </button>
                <OAuth />
            </form>
            <div className="flex mt-5 gap-2">
                <p>Dont have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-700">Sign up</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
}
