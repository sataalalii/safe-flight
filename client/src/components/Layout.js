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
    // console.log(document.getElementById("logInButton").getAttribute('id'))
    return (
      <>
        <Nav>
          <NavLink to='/'>
            <img src={require('../assets/logo.png')} alt='logo' />
          </NavLink>
          <Bars />
          <NavMenu>
          <NavLink to='/CountryRiskSearch' activeStyle>
              Country Risk Search
            </NavLink>
          <NavLink to='/SavedPlaces' activeStyle>
          Saved Places
            </NavLink>
            <NavLink to='/About' activeStyle>
              About
            </NavLink>
            <NavLink to='/Contact' activeStyle>
              Contact
            </NavLink>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to='/LogIn' id="logInButton"
              value = {(localStorage.getItem("idToken") !== null && localStorage.getItem("idToken") !== "null")? "Log Out" : "Log In" } >
              {/* {document.getElementById("logInButton").getAttribute("value")} */}
            </NavBtnLink>
          </NavBtn>
        </Nav>

        <Outlet />
      </>
    );
  };

export default Layout;