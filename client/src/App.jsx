import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CreateListings from "./pages/CreateListings";
import UpdateListings from "./pages/UpdateListings";
import Listing from "./pages/Listing";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/listing/:listingId" element={<Listing />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/create-listing"
                        element={<CreateListings />}
                    />
                    <Route
                        path="/update-listing/:listingID"
                        element={<UpdateListings />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
