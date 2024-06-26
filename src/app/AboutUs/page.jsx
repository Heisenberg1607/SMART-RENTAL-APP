import React from "react";
import "./aboutus.css";

const AboutUs = () => {
  return (
    <>
      <section id="home">
        <div className="home-left">
          <img src="/Images/Rental.jpg" />
          <br />
        </div>
        <div className="home-right">
          <h2 className="home-heading"> ABOUT US </h2>
          <p className="home-para">
            Our project was born out of a shared vision to revolutionise the
            rental landscape, offering a secure, transparent, and decentralised
            platform that empowers both renters and property owners. Our project
            aims to develop a decentralised rental platform using blockchain and
            smart contracts. Intially deployed for a single domain of real
            estate, we plan to expand our project over various domains. We plan
            to execute a similar application overlooking the domains of
            transportation and agricultural equipments rentals.
          </p>
          <a href="" class="btn">
            {" "}
          </a>
        </div>
      </section>
      <section id="workFlow">
        <h1 class="heading text-center text-2xl font-semibold text-stone-700 tracking-wider">
          {" "}
          OUR STORY{" "}
        </h1>
        <p class="para w-[1000px]">
          As fellow undergrad students at JSPM NTC Atharva C., Tanish, Ashwin
          and Atharva K. noticed the irregularities in the traditional rental
          systems.
          <br /> They found that the traditional rental systems suffer from
          inefficiencies, lack of transparency, and the need for trust in
          centralised intermediaries.
          <br />
          Renters often face challenges related to payment verification,
          contractual disputes, and data privacy.Property owners contend with
          issues such as late payments and fraud.
          <br /> To address these issues and empower a secure and transparent
          rental ecosystem, our project aims to develop a decentralised rental
          platform using blockchain and smart contracts.
        </p>
        <div class="num-container">
          <div class="num-item">
            <span>
              1000+ <br />
              Customers
              <br />
            </span>
          </div>
          <div class="num-item">
            <span>
              99.9% <br />
              Transaction Security
              <br />
            </span>
          </div>
          <div class="num-item">
            <span>
              500+ <br />
              Products Available
              <br />
            </span>
          </div>
        </div>
      </section>

      <section id="goal">
        <div class="goal-left">
          <h2>Our Goal</h2>
          <p>
            Our goal is to not only share the outcomes of our research but also
            to inspire a new era of trust and efficiency in rental services
            through the power of blockchain.
          </p>
          <ul>
            <li> Provide efficiency and Cost Reduction.</li>
            <li> Dispute resolution between the owner and user.</li>
            <li>
              Transparency and Trust in payment and financial transactions
            </li>
          </ul>
          <a href="" class="btn">
            {" "}
            <h4>CONTACT US</h4>
          </a>

          <p>
            <b>EMAIL ID:</b>smartrentalapp@gmail.com
          </p>
        </div>
        <div class="goal-right">
          <img src="/Images/goals.png" />
        </div>
      </section>

      <section id="our-team" class="py-8">
        <h2 class="text-2xl font-semibold mb-4 text-center tracking-wider">
          Our Members
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="team-item">
            <img
              src="/Images/AtharvaC.jpg"
              alt="Atharva Chakankar"
              class="rounded-full w-40 h-40 object-cover mx-auto"
            />
            <h5 class="text-xl font-semibold mt-4 mb-2 text-center">
              Atharva Chakankar
            </h5>
            <span class="block text-center">ROLE</span>
          </div>
          <div class="team-item">
            <img
              src="/Images/Tanish.jpg"
              alt="Tanish Kinkar"
              class="rounded-full w-40 h-40 object-cover mx-auto"
            />
            <h5 class="text-xl font-semibold mt-4 mb-2 text-center">
              Tanish Kinkar
            </h5>
            <span class="block text-center">ROLE</span>
          </div>
          <div class="team-item">
            <img
              src="/Images/AtharvaK.jpg"
              alt="Atharva Kurumbhatte"
              class="rounded-full w-40 h-40 object-cover mx-auto"
            />
            <h5 class="text-xl font-semibold mt-4 mb-2 text-center">
              Atharva Kurumbhatte
            </h5>
            <span class="block text-center">ROLE</span>
          </div>
          <div class="team-item">
            <img
              src="/Images/Ashwin.JPG"
              alt="Ashwin Kapile"
              class="rounded-full w-40 h-40 object-cover mx-auto"
            />
            <h5 class="text-xl font-semibold mt-4 mb-2 text-center">
              Ashwin Kapile
            </h5>
            <span class="block text-center">ROLE</span>
          </div>
        </div>
      </section>

      <footer>
        <p> &copy; 2023-24 - All rights reserved </p>
      </footer>
    </>
  );
};

export default AboutUs;
