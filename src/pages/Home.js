import React from "react";
import './Home.css';

function Home() {
    return (
        <>
         <img className="Background-image" src="/images/black-background.jpeg" alt="background-image" />
         <img className="Bank-logo-img" src="/images/bank-photo.jpg" alt="background-image" />
         <p id="bank-name">ExceLR<span id="bank-name-style">Bank</span></p>
         <p id="bank-details">"Your trusted partner in secure and seamless banking, empowering you with innovative financial solutions and exceptional service."</p>
        </>
    );
}

export default Home;
