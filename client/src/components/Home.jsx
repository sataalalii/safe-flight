import React from "react";
import videoBg from "../assets/home_background.mp4"

const Home = () => {
    return(
        <div className="home">
            <div className="overlay"></div>
            <video src ={videoBg} autoPlay loop muted />
            <div className="content">
                <h1>SAFE FLIGHT</h1>
                <p>Get to your destination without any worries.</p>
            </div>
        </div>
    )
};

export default Home;