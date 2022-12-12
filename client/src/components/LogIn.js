import { useEffect, useState } from "react";
import '../App.css'
import jwt_decode from "jwt-decode";
import Layout from "./Layout";

const Login = () => {
    const [ user, setUser ] = useState({});

    function handleCallbackResponse(response) {
        // console.log("Encoded JWT ID token: " + response.credential);
        var userObject =jwt_decode(response.credential);

        localStorage.setItem("idToken", response.credential);
        localStorage.setItem("user", JSON.stringify({data: userObject}))
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(event){
        localStorage.setItem("idToken", "null")
        localStorage.setItem("user", "null")
        setUser(null);
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "478098685389-liun3vb2lmc7o8rsdp8lor02i9fe04c8.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        const userInStorage = localStorage.getItem("user")
        if (userInStorage !== null && userInStorage !== "null" ) {
            const parsed = JSON.parse(userInStorage)["data"]
            setUser(parsed)
            document.getElementById("signInDiv")
        } else {
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme: "outline", size: "large"}
            );
            google.accounts.id.prompt();
        }



    }, []);
    // If we have no user: sign in button
    // If we have a user: show the logout button
        return (
            <div className="App">
                {<div id="signInDiv"></div>}
                {localStorage.getItem("idToken") !== null && localStorage.getItem("idToken") !== "null" &&
                    <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
                }
                { user &&
                <div>
                    <img src = {user.picture}></img>
                    <h3>{user.Name}</h3>
                </div>
                }
            </div>
        );


};

export default Login;
