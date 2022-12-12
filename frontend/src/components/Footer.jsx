import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-info">
        <p className="footer-info-heading">Augustinas Labutis IFF/9-1 - 2022</p>
        <br />
        <a
          target="_blank"
          href="https://www.linkedin.com/in/augustinas-labutis-0b0b64194/"
          className="footer-info-link"
          rel="noreferrer"
        >
          Linkedin <i class="fa-brands fa-linkedin"></i>
        </a>
      </section>
    </div>
  );
}

export default Footer;
