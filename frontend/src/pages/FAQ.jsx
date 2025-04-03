import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does FitFuel's meal delivery work?",
      answer: "FitFuel delivers freshly prepared meals directly to your door according to your chosen subscription plan. Our meals are cooked by professional chefs, vacuum-sealed for freshness, and delivered in insulated packaging to ensure quality. Simply store your meals in the refrigerator and heat them when you're ready to eat."
    },
    {
      question: "How do I know which meal plan is right for me?",
      answer: "We offer several specialized meal plans designed for different fitness goals, including weight loss, muscle gain, maintenance, keto, vegetarian, and vegan options. You can take our body profile assessment for personalized recommendations based on your goals, dietary preferences, and lifestyle. Our nutritionists have carefully designed each plan to optimize macronutrient ratios for specific fitness outcomes."
    },
    {
      question: "Are your meals fresh or frozen?",
      answer: "Our meals are prepared fresh and then immediately vacuum-sealed to preserve flavor and nutrients. They are delivered chilled (not frozen) and will stay fresh in your refrigerator for up to 7 days. This ensures you get the best taste and nutritional value with the convenience of ready-to-heat meals."
    },
    {
      question: "Can I customize my meals?",
      answer: "Yes! We offer customization options for all our meal plans. You can select meal preferences, exclude specific ingredients due to allergies or dislikes, and even swap meals within your plan. Our goal is to provide flexibility while still ensuring your meals align with your nutritional goals."
    },
    {
      question: "How many calories are in each meal?",
      answer: "Calorie content varies depending on the specific meal and plan. Our weight loss plans typically range from 350-450 calories per meal, while our muscle gain plans may contain 550-650 calories per meal. Each meal's exact calorie count and full nutritional information is clearly listed on the packaging and in your online account."
    },
    {
      question: "What if I have food allergies or dietary restrictions?",
      answer: "We take food allergies and dietary restrictions very seriously. During signup, you can indicate any allergies or restrictions, and our system will ensure you never receive meals containing those ingredients. We have dedicated preparation areas for common allergens to prevent cross-contamination."
    },
    {
      question: "Can I skip a week or pause my subscription?",
      answer: "Absolutely! We understand that life can be unpredictable. You can easily skip weeks, pause your subscription, or make changes to your delivery schedule through your account dashboard. Just make sure to do so before the weekly cutoff time (Wednesday at 11:59 PM for the following week's delivery)."
    },
    {
      question: "How are the meals packaged?",
      answer: "Our meals come in microwave-safe, BPA-free containers that are recyclable. We package them in insulated boxes with ice packs to ensure they stay at the proper temperature during transit. We're committed to reducing our environmental impact, so we continuously work to make our packaging more sustainable."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your subscription at any time with no cancellation fees. Simply log into your account, go to subscription settings, and select 'Cancel Subscription'. If you cancel after the weekly cutoff time, your cancellation will take effect after the next delivery."
    },
    {
      question: "Do you accommodate special diets like keto, paleo, or vegan?",
      answer: "Yes, we offer specialized meal plans for keto, paleo, vegan, vegetarian, and other dietary preferences. Each plan is nutritionally balanced to meet the specific macronutrient requirements of that diet while ensuring you still get delicious, varied meals."
    },
    {
      question: "How do I heat the meals?",
      answer: "Our meals can be heated in the microwave in 2-3 minutes or in a conventional oven for about 15 minutes. Detailed heating instructions are provided on each meal container for optimal results. Some meals, like our salads and cold protein snacks, are designed to be eaten cold."
    },
    {
      question: "What areas do you deliver to?",
      answer: "We currently deliver to most major cities in the United States. During checkout, you can enter your zip code to confirm that we deliver to your area. We're constantly expanding our delivery network to reach more customers."
    }
  ];

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our meal plans, delivery, and more</p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <h3>{faq.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-more-help">
        <h2>Still have questions?</h2>
        <p>Our customer support team is ready to help you with any other questions you might have.</p>
        <div className="help-options">
          <a href="/contact" className="help-button primary">Contact Us</a>
          <a href="mailto:support@fitfuel.com" className="help-button secondary">Email Support</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 