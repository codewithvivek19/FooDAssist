import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <h1>Privacy Policy</h1>
        <p>Last Updated: April 01, 2023</p>
      </div>

      <div className="privacy-content">
        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>
            FitFuel ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our meal delivery service.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our service, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy. If you do not agree with our policies, please do not access or use our service.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personally identifiable information, such as:</p>
          <ul>
            <li>Name, email address, phone number, and billing address</li>
            <li>Delivery address</li>
            <li>Payment information (credit card numbers, expiration dates)</li>
            <li>Dietary preferences and restrictions</li>
            <li>Health and fitness goals</li>
            <li>Age, height, weight, and activity level (if provided)</li>
            <li>Account login credentials</li>
          </ul>

          <h3>Non-Personal Information</h3>
          <p>We may also collect non-personal information, including:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Access times and dates</li>
            <li>Referring website addresses</li>
            <li>Browsing patterns and preferences</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How We Collect Information</h2>
          <p>Information is collected in various ways, including:</p>
          <ul>
            <li>When you register for an account</li>
            <li>When you place an order</li>
            <li>When you complete surveys or forms</li>
            <li>When you participate in promotions or contests</li>
            <li>When you contact our customer support</li>
            <li>Through cookies and tracking technologies</li>
            <li>From third-party service providers</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Provide, operate, and maintain our services</li>
            <li>Process and fulfill your orders</li>
            <li>Customize meal plans based on your preferences and goals</li>
            <li>Send order confirmations and updates</li>
            <li>Process payments and prevent fraud</li>
            <li>Communicate with you about products, services, and promotions</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Improve our website, products, and customer service</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>5. Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers (payment processors, delivery services, etc.)</li>
            <li>Business partners (with your consent)</li>
            <li>Affiliates and subsidiaries</li>
            <li>Legal authorities when required by law</li>
            <li>Successor entities in the event of a merger, acquisition, or business sale</li>
          </ul>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described above.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Data Security</h2>
          <p>
            We implement appropriate security measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="policy-section">
          <h2>8. Your Data Protection Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>The right to access the personal information we hold about you</li>
            <li>The right to request correction of inaccurate personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent at any time</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. Children's Privacy</h2>
          <p>
            Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section className="policy-section">
          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section className="policy-section">
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="contact-info">
            <li>Email: privacy@fitfuel.com</li>
            <li>Phone: 1-800-123-456</li>
            <li>
              Address: FitFuel Inc., 123 Nutrition Street, Fitness City, FC 12345, United States
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Privacy; 