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
          <NavLink to='/Home'>
            <img src={require('../assets/logo.png')} alt='logo' />
          </NavLink>
          <Bars />
          <NavMenu>
            <NavLink to='/About' activeStyle>
              About
            </NavLink>
            <NavLink to='/Contact' activeStyle>
              Contact
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
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