import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore3.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>APP IS NOT AVAILABLE ON APPSTORE AND PLAY STORE YET</h4>
        <p>It will Available on Andriod and IOS very soon</p>
        <img src={playStore} alt="playstore"/>
        <img src={appStore} alt="Appstore"/>

      </div>

      <div className="midFooter">
        <h1>P.T.D.A</h1>
        <p>We Provide You With The Best Services</p>

        <p>Copyrights 2021 &copy; Sprall Inc.</p>
      </div>

      <div className="rightFooter">
        <p>Follow Us</p>
        <a href='https://www.instagram.com/jay_cee_oh_/'>Instagram</a>
      </div>
    </footer>
  );
}

export default Footer