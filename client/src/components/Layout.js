import {Outlet} from "react-router-dom";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements';

  const Layout = () => {
    return (
      <>
        <Nav>
          <NavLink to='/'>
            <img src={require('../assets/logo.png')} alt='logo' />
          </NavLink>
          <Bars />
          <NavMenu>
          <NavLink to='/FlightSearch' activeStyle>
              Flight Search
            </NavLink>
            <NavLink to='/About' activeStyle>
              About
            </NavLink>
            <NavLink to='/Contact' activeStyle>
              Contact
            </NavLink>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to='/LogIn'>Log In</NavBtnLink>
          </NavBtn>
        </Nav>

        <Outlet />
      </>
    );
  };

export default Layout;