import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About FitFuel</h1>
        <p>Empowering your health journey through nutrition tailored to your fitness goals</p>
      </div>

      <div className="about-section">
        <h2>Our Story</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="/images/about-team.jpg" alt="FitFuel Team" />
          </div>
          <div className="about-text">
            <p>
              Founded in 2022, FitFuel was born from a simple yet powerful idea: nutrition should be personalized, convenient, and aligned with your fitness goals. Our founders, a team of nutritionists and fitness enthusiasts, recognized that the one-size-fits-all approach to meal planning wasn't serving people effectively.
            </p>
            <p>
              What began as a small local meal prep service has grown into a comprehensive platform that combines nutrition science with culinary excellence to deliver meals that not only fuel your body but also tantalize your taste buds.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section alt-bg">
        <h2>Our Mission</h2>
        <div className="mission-statement">
          <p>
            At FitFuel, our mission is to empower individuals to achieve their health and fitness goals through nutrition that's tailored to their unique needs. We believe that eating right shouldn't be complicated or time-consuming.
          </p>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <h3>Quality</h3>
            <p>We source only the freshest, highest-quality ingredients for our meals, ensuring optimal nutrition and flavor.</p>
          </div>
          <div className="value-card">
            <h3>Personalization</h3>
            <p>Every body is different. We create meal plans designed specifically for your goals, preferences, and dietary needs.</p>
          </div>
          <div className="value-card">
            <h3>Convenience</h3>
            <p>We handle the planning, shopping, and cooking so you can focus on your fitness journey without the hassle.</p>
          </div>
          <div className="value-card">
            <h3>Sustainability</h3>
            <p>We're committed to minimizing our environmental impact through eco-friendly packaging and responsible sourcing.</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Our Approach</h2>
        <div className="approach-content">
          <div className="approach-step">
            <h3>1. Assessment</h3>
            <p>We start by understanding your fitness goals, dietary preferences, and nutritional needs through our comprehensive assessment tool.</p>
          </div>
          <div className="approach-step">
            <h3>2. Customization</h3>
            <p>Our team of nutritionists designs a meal plan specifically for you, balancing macronutrients and calories to support your goals.</p>
          </div>
          <div className="approach-step">
            <h3>3. Preparation</h3>
            <p>Our chefs prepare your meals using fresh, high-quality ingredients, ensuring both nutritional value and delicious taste.</p>
          </div>
          <div className="approach-step">
            <h3>4. Delivery</h3>
            <p>Your meals are delivered directly to your door, ready to heat and eat, saving you valuable time and energy.</p>
          </div>
        </div>
      </div>

      <div className="about-section alt-bg">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>Dr. Sarah Chen</h3>
            <p>Chief Nutritionist</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>Michael Rodriguez</h3>
            <p>Head Chef</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>Emma Johnson</h3>
            <p>Fitness Consultant</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>David Park</h3>
            <p>Operations Director</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to transform your nutrition?</h2>
        <p>Join thousands of FitFuel members who are achieving their fitness goals through personalized nutrition.</p>
        <a href="/meal-plans" className="cta-button">Explore Our Meal Plans</a>
      </div>
    </div>
  );
};

export default AboutUs; 