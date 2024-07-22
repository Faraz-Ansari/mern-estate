import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className=" shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
                <Link to="/">
                    <h1 className="text-sm md:text-3xl font-bold flex flex-wrap">
                        <span className="text-slate-500">Cresta</span>
                        <span className="text-slate-700">View</span>
                    </h1>
                </Link>

                <form className="bg-slate-200 p-3 rounded-lg flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-24 sm:w-60"
                    />
                    <FaSearch className="text-slate-500" />
                </form>

                <ul className="flex gap-5 cursor-pointer">
                    <Link to="/">
                        <li className="hidden sm:inline sm:text-lg text-slate-700 hover:text-red-600">
                            Home
                        </li>
                    </Link>
                    <Link to="about">
                        <li className="hidden sm:inline sm:text-lg text-slate-700 hover:text-red-600">
                            About
                        </li>
                    </Link>
                    <Link to="sign-in">
                        <li className="sm:text-lg text-slate-700 hover:text-red-600">
                            Sign In
                        </li>
                    </Link>
                </ul>
            </div>
        </header>
    );
}
