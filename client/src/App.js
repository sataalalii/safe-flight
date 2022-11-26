import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import Search from "./components/Search";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="search" element={<Search />} />
                    {/*<Route path="contact" element={<Contact />} />*/}
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}