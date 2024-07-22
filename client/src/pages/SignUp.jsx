import { Link } from "react-router-dom";

export default function SignUp() {
    const handleSubmit = (e) => {
        e.preventDefault();
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
                />
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="rounded-lg border p-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="rounded-lg border p-3"
                />
                <button className="p-3 bg-slate-700 rounded-lg text-white hover:opaciity-95 disabled:opacity-80">
                    SIGN UP
                </button>
            </form>
            <div className="flex mt-5 gap-2">
                <p>Already have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-700">Sign in</span>
                </Link>
            </div>
        </div>
    );
}
