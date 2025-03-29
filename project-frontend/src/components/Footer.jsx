import React from "react";
import "../css/Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>CARS</h3>
          <ul>
            <li>All Stock</li>
            <li>In Stock</li>
            <li>Shipping</li>
            <li>New Arrivals</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>TRADE IN</h3>
          <ul>
            <li>Financing</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>TOP BRANDS</h3>
          <ul>
            <li>Toyota</li>
            <li>Volkswagen</li>
            <li>Mercedes</li>
            <li>Honda</li>
            <li>More...</li>
          </ul>
        </div>
        <div className="footer-section">
          { /*<h3>ABOUT US</h3> */}
          <h3>CONTACT US</h3>
          <p>📅 Office Hours: 8 am - 5 pm Daily</p>
          <p>📞 0727 200 200, 0798 500 000</p>
          <p>📧 info@example.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 HotWheelsHQ. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
