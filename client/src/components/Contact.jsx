import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
    const [landlord, setLandLord] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const response = await fetch(`/api/user/${listing.userRef}`);
                const data = await response.json();
                setLandLord(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLandlord();
    }, [listing.userRef]);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-2">
                    <p>
                        Contact{" "}
                        <span className="font-semibold">
                            {landlord.username}
                        </span>{" "}
                        for{" "}
                        <span className="font-semibold">
                            {listing.name.toLowerCase()}
                        </span>
                    </p>
                    <textarea
                        onChange={handleChange}
                        name="message"
                        id="message"
                        rows="2"
                        placeholder="Type your message here..."
                        className="w-full border border-slate-300 rounded-lg p-3 "
                    ></textarea>
                    <Link
                        className="bg-slate-700 text-center text-white rounded-lg p-3 hover:opacity-95"
                        to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                    >
                        Send message
                    </Link>
                </div>
            )}
        </>
    );
}
