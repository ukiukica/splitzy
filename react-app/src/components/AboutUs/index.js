import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
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
      <div className="splitzy-descript-div">
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
            The Engineering Team
          </h1>
        </div>
        <div className="creators-div">
          <div>
            <div>
              <img
                className="creator-photos"
                id="uki-photo"
                src="https://cdn.discordapp.com/attachments/988927733696442408/1004474714204414034/ukiweb2.jpg"
              />
              <h3 className="creator-names">Uki</h3>
              <p className="creator-titles">Full-stack Software Engineer</p>
            </div>
            <a href="https://www.linkedin.com/in/ukipavlovic/">
              <img
                className="social-icons"
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              />
            </a>
            <a href="https://github.com/ukiukica/">
              <img
                className="social-icons"
                src="https://tinyurl.com/3w4sv96a"
              />
            </a>
          </div>
          <div>
            <div>
              <img
                className="creator-photos"
                src="https://cdn.discordapp.com/attachments/988927733696442408/1004474713889853530/IMG_9523.JPG"
              />
              <h3 className="creator-names">Caitlin</h3>
              <p className="creator-titles">Full-stack Software Engineer</p>
            </div>
            <a href="https://www.linkedin.com/in/caitlin-buen-lucas/">
              <img
                className="social-icons"
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              />
            </a>
            <a href="https://github.com/cpualei/">
              <img
                className="social-icons"
                src="https://tinyurl.com/3w4sv96a"
              />
            </a>
          </div>
          <div>
            <div>
              <img
                className="creator-photos"
                src="https://media.discordapp.net/attachments/988927733696442408/993310261270294578/Screenshot_20220703-171725_Facebook.jpg?width=1073&height=1055"
              />
              <h3 className="creator-names">Olivia</h3>
              <p className="creator-titles">Full-stack Software Engineer</p>
            </div>
            <a href="https://www.linkedin.com/in/olivia-bir-74b16b7b/">
              <img
                className="social-icons"
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              />
            </a>
            <a href="https://github.com/oliviabir">
              <img
                className="social-icons"
                src="https://tinyurl.com/3w4sv96a"
              />
            </a>
          </div>
          <div>
            <div>
              <img
                className="creator-photos"
                src="https://res.cloudinary.com/matchaprince/image/upload/v1663809009/1593757146453_mnj85e.jpg"
              />
              <h3 className="creator-names">Danny</h3>
              <p className="creator-titles">Full-stack Software Engineer</p>
            </div>
            <a href="https://www.linkedin.com/in/dannytoan/">
              <img
                className="social-icons"
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              />
            </a>
            <a href="https://github.com/dannytoan">
              <img
                className="social-icons"
                src="https://tinyurl.com/3w4sv96a"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
