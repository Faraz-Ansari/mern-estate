import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");

    const navigateTo = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a URLSearchParams object from the current window's URL search parameters
        const urlParams = new URLSearchParams(window.location.search);
        
        // Set the "searchTerm" parameter to the value of the searchTerm variable
        urlParams.set("searchTerm", searchTerm);
        
        // Convert the URLSearchParams object to a query string
        const searchQuery = urlParams.toString();
        
        // Navigate to the search page with the updated query string
        navigateTo(`/search?${searchQuery}`);
    };

    useEffect(() => {
        // Create a URLSearchParams object from the current location's search parameters
        const urlParams = new URLSearchParams(location.search);
        
        // Retrieve the value of the "searchTerm" parameter from the URL
        const searchTerm = urlParams.get("searchTerm");
        
        // Update the state with the retrieved search term, or set it to an empty string if not found
        setSearchTerm(searchTerm || "");

    // Re-run the effect whenever the search parameters in the URL change
    }, [location.search]);


    return (
        <header className=" shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
                <Link to="/">
                    <h1 className="text-sm md:text-3xl font-bold flex flex-wrap">
                        <span className="text-slate-500">Cresta</span>
                        <span className="text-slate-700">View</span>
                    </h1>
                </Link>

                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-200 p-3 rounded-lg flex items-center"
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-24 sm:w-60"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className="text-slate-500" />
                    </button>
                </form>

                <ul className="flex gap-5 cursor-pointer">
                    <Link to="/">
                        <li className="hidden sm:inline sm:text-lg text-slate-700 hover:text-red-600">
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li className="hidden sm:inline sm:text-lg text-slate-700 hover:text-red-600">
                            About
                        </li>
                    </Link>
                    <Link to="/profile">
                        {currentUser ? (
                            <img
                                className="rounded-full h-7 w-7 object-cover"
                                src={currentUser.avatar}
                                alt="profile"
                            />
                        ) : (
                            <li className="sm:text-lg text-slate-700 hover:text-red-600">
                                Sign In
                            </li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}
