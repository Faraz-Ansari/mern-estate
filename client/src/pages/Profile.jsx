import { useSelector } from "react-redux";

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="max-w-lg mx-auto p-3">
            <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
            <form className="flex flex-col gap-4">
                <img
                    src={currentUser.avatar}
                    alt="profile pic"
                    className="rounded-full h-24 w-24 cursor-pointer object-cover self-center mt-2"
                />
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
                    <span className="text-red-700 cursor-pointer">Delete Account</span>
                    <span className="text-green-700 cursor-pointer">Sign out</span>
                </div>
        </div>
    );
}
