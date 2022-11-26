import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Log in or sign up</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>

                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;