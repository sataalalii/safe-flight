import { useEffect, useState } from "react";
import '../App.css'
import jwt_decode from "jwt-decode";

const Login = () => {
    const [ user, setUser ] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject =jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(event){
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "478098685389-liun3vb2lmc7o8rsdp8lor02i9fe04c8.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );

        google.accounts.id.prompt();
    }, []);
    // If we have no user: sign in button
    // If we have a user: show the logout button
    return (
        <div className="App">
            <div id="signInDiv"></div>
            { Object.keys(user).length != 0 &&
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
