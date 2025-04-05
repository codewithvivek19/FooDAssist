import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  return (
    <div className="how-it-works">
      <div className="page-header">
        <h1>How FitFuel Works</h1>
        <p>Your journey to better nutrition in 4 simple steps</p>
      </div>

      <div className="process-container">
        <div className="process-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h2>Choose Your Plan</h2>
            <p>
              Select from our variety of meal plans tailored to different fitness goals, 
              dietary preferences, and lifestyles. Whether you're looking to lose weight, 
              build muscle, or maintain a balanced diet, we have a plan for you.
            </p>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Choose your plan" />
            </div>
          </div>
        </div>

        <div className="process-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h2>Customize Your Meals</h2>
            <p>
              Personalize your meal selections based on your taste preferences and dietary requirements.
              Our flexible system allows you to swap meals, adjust portions, and accommodate allergies 
              or restrictions. Every meal is crafted by nutrition experts and prepared by professional chefs.
            </p>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Customize your meals" />
            </div>
          </div>
        </div>

        <div className="process-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h2>We Prepare & Deliver</h2>
            <p>
              Once you've finalized your selections, our team prepares your meals using 
              fresh, high-quality ingredients. Meals are cooked, portioned, and packaged in our 
              state-of-the-art kitchen facility. We deliver your meals right to your doorstep in 
              eco-friendly, insulated packaging to ensure freshness.
            </p>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="We prepare and deliver" />
            </div>
          </div>
        </div>

        <div className="process-step">
          <div className="step-number">4</div>
          <div className="step-content">
            <h2>Heat, Eat & Achieve</h2>
            <p>
              Simply heat your meals according to the instructions provided, enjoy the 
              delicious, nutritionally-balanced food, and stay on track with your fitness goals.
              Most meals can be heated in under 3 minutes, making healthy eating convenient and stress-free.
            </p>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Heat, eat and achieve" />
            </div>
          </div>
        </div>
      </div>

      <div className="subscription-info">
        <h2>Subscription Benefits</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Flexible Schedules</h3>
            <p>Weekly, bi-weekly, or monthly deliveries to fit your lifestyle</p>
          </div>
          <div className="benefit-card">
            <h3>Easy Modifications</h3>
            <p>Change, pause, or cancel your subscription anytime</p>
          </div>
          <div className="benefit-card">
            <h3>Freshness Guarantee</h3>
            <p>All meals stay fresh for up to 7 days in your refrigerator</p>
          </div>
          <div className="benefit-card">
            <h3>Nutrition Tracking</h3>
            <p>Detailed nutrition information for every meal</p>
          </div>
        </div>
      </div>

      <div className="faqs-preview">
        <h2>Common Questions</h2>
        <div className="faq-item">
          <h3>How long do the meals stay fresh?</h3>
          <p>Our meals stay fresh for up to 7 days when stored properly in your refrigerator.</p>
        </div>
        <div className="faq-item">
          <h3>Can I skip deliveries?</h3>
          <p>Yes, you can skip, pause, or cancel deliveries at any time through your account dashboard.</p>
        </div>
        <div className="faq-item">
          <h3>What if I have food allergies?</h3>
          <p>You can customize your meal selections to accommodate allergies and our kitchen follows strict protocols to prevent cross-contamination.</p>
        </div>
        <a href="/faq" className="see-more-link">See more frequently asked questions</a>
      </div>
    </div>
  );
}

export default HowItWorks; 