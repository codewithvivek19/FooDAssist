import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BodyProfile.css';

const BodyProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    bodyType: '',
    activityLevel: 'moderate',
    gender: '',
    age: '',
    fitnessGoals: 'general-health'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5004/api/meal-plans/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      
      // Store the recommendation results in session storage
      sessionStorage.setItem('mealPlanRecommendations', JSON.stringify(data));
      
      // Navigate to recommendations page
      navigate('/meal-plan-recommendations');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred while getting recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-profile-container">
      <div className="profile-header">
        <h1>Get Your Personalized Meal Plan</h1>
        <p>Complete your body profile to receive meal plans customized to your needs</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="body-profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="20"
              max="300"
            />
          </div>

          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              min="100"
              max="250"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="16"
              max="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="bodyType">Body Type</label>
          <div className="body-type-selector">
            <div 
              className={`body-type-option ${formData.bodyType === 'ectomorph' ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, bodyType: 'ectomorph'})}
            >
              <div className="body-type-image ectomorph-image"></div>
              <div className="body-type-info">
                <h3>Ectomorph</h3>
                <p>Naturally thin with a fast metabolism, narrow frame</p>
              </div>
            </div>

            <div 
              className={`body-type-option ${formData.bodyType === 'mesomorph' ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, bodyType: 'mesomorph'})}
            >
              <div className="body-type-image mesomorph-image"></div>
              <div className="body-type-info">
                <h3>Mesomorph</h3>
                <p>Athletic build, responsive to exercise, gains muscle easily</p>
              </div>
            </div>

            <div 
              className={`body-type-option ${formData.bodyType === 'endomorph' ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, bodyType: 'endomorph'})}
            >
              <div className="body-type-image endomorph-image"></div>
              <div className="body-type-info">
                <h3>Endomorph</h3>
                <p>Higher body fat, gains muscle and fat easily, slower metabolism</p>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="activityLevel">Activity Level</label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            required
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (exercise 6-7 days/week)</option>
            <option value="very-active">Very Active (intense exercise daily)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fitnessGoals">Fitness Goal</label>
          <select
            id="fitnessGoals"
            name="fitnessGoals"
            value={formData.fitnessGoals}
            onChange={handleChange}
            required
          >
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
            <option value="general-health">General Health</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary btn-large"
            disabled={loading}
          >
            {loading ? 'Generating Recommendations...' : 'Get My Personalized Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BodyProfile; 