import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <>
      <div class="about-us-container">
        <div className="about-us-heading-div">
          <h1 className="about-us-heading" id="about-us-heading-first">
            What is
          </h1>
          <h1 className="about-us-heading" id="about-us-heading-second">
            splitzy
          </h1>
          <h1>?</h1>
        </div>
        <div>
          <h3 id="splitzy-descript">
            splitzy - an original application based off of Splitwise - is a full
            stack application<br></br>
            that provides users the ability to search and add other users as
            friends and bill them<br></br>
            for their dues. Users also have the ability to make notes or add
            comments to existing bills.<br></br>
            To make use of these features, users are required to sign up for an
            account.
          </h3>
        </div>
        <br></br>
        <div>
          <div className="about-us-heading-div">
            <h1 className="about-us-heading" id="about-us-heading-first">
              Creators of
            </h1>
            <h1 className="about-us-heading" id="about-us-heading-second">
              splitzy
            </h1>
          </div>
          <div className="creators-div">
            <div>
              <h3 className="creator-names">Uki</h3>
              <a href="https://www.linkedin.com/in/ukipavlovic/">
                <img className="social-icons" src="https://cdn-icons-png.flaticon.com/512/174/174857.png"/>
              </a>
              <a href="https://github.com/ukiukica/">
                <img className="social-icons" src="https://tinyurl.com/3w4sv96a" />
              </a>
            </div>
            <div>
              <h3 className="creator-names">Caitlin</h3>
              <a href="https://www.linkedin.com/in/caitlin-buen-lucas/">
                <img className="social-icons" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" />
              </a>
              <a href="https://github.com/cpualei/">
                <img className="social-icons" src="https://tinyurl.com/3w4sv96a" />
              </a>
            </div>
            <div>
              <h3 className="creator-names">Olivia</h3>
              <a href="https://www.linkedin.com/in/olivia-bir-74b16b7b/">
                <img className="social-icons" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" />
              </a>
              <a href="https://github.com/oliviabir">
                <img className="social-icons" src="https://tinyurl.com/3w4sv96a" />
              </a>
            </div>
            <div>
              <h3 className="creator-names">Danny</h3>
              <a href="https://www.linkedin.com/in/dannytoan/">
                <img className="social-icons" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" />
              </a>
              <a href="https://github.com/dannytoan">
                <img className="social-icons" src="https://tinyurl.com/3w4sv96a" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
