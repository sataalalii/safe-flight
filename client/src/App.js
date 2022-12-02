import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./components/About";
import Home from "./components/Home";
import FlightSearch from "./components/FlightSearch";
import LogIn from "./components/LogIn";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="about" element={<About />} />
                    <Route path="flightsearch" element={<FlightSearch />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}