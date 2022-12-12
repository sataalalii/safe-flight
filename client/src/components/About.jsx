import React from "react";
import videoBg from "../assets/airport.mp4"

function Contact(){
    return(
        
            <div className="home">
                <div className="overlay"></div>
                <video src ={videoBg} autoPlay loop muted />
                <div className="content">
                    <h1>About us</h1>
                    <p>At Fly Safe we prioritize the security of our passengers.</p>
                </div>
            </div>
        )
    
}

export default Contact;