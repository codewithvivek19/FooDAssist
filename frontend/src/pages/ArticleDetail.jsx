import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArticleDetail.css';

// Expanded article content with full articles
export const articlesContent = [
  {
    id: 1,
    title: "Optimizing Protein Intake for Muscle Growth",
    excerpt: "Learn the optimal timing and sources of protein to maximize muscle development and recovery.",
    imageUrl: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd",
    category: "Muscle Building",
    date: "May 15, 2023",
    expert: {
      name: "Dr. Michael Chen",
      title: "Sports Nutritionist",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Dr. Michael Chen holds a Ph.D. in Sports Nutrition from Stanford University and has worked with Olympic athletes for over 15 years."
    },
    content: `
      <h2>The Science of Protein Timing for Muscle Growth</h2>
      
      <p>Protein is the fundamental building block of muscle tissue, making it essential for anyone looking to build strength or increase muscle mass. However, the science of protein consumption goes beyond simply eating more protein-rich foods.</p>
      
      <p>Recent studies have revealed that the timing, distribution, and source of protein intake can significantly impact muscle protein synthesis (MPS) - the process responsible for muscle growth and recovery.</p>
      
      <h3>Optimal Protein Timing</h3>
      
      <p>The anabolic window - the period after exercise during which your body is primed to use protein for muscle building - is wider than previously thought. While consuming protein within 30-60 minutes post-workout is still beneficial, research now shows that maintaining elevated amino acid levels throughout the day is equally important.</p>
      
      <p>For optimal results, distribute your protein intake evenly across 4-5 meals throughout the day, with each meal containing 20-40g of high-quality protein, depending on your body weight and goals.</p>
      
      <h3>Best Protein Sources for Muscle Growth</h3>
      
      <p>Not all proteins are created equal. The most effective sources for muscle building include:</p>
      
      <ul>
        <li><strong>Whey Protein:</strong> Rapidly digested and rich in leucine, making it ideal for post-workout consumption.</li>
        <li><strong>Casein Protein:</strong> Slower digesting protein that provides a sustained release of amino acids, making it perfect before bed.</li>
        <li><strong>Lean Meats:</strong> Chicken, turkey, and lean beef provide complete protein profiles with essential nutrients.</li>
        <li><strong>Eggs:</strong> One of the highest quality protein sources available, with an optimal amino acid profile.</li>
        <li><strong>Fish:</strong> Provides protein along with beneficial omega-3 fatty acids that can support recovery.</li>
      </ul>
      
      <h3>Protein Intake Recommendations</h3>
      
      <p>For individuals engaged in regular resistance training, research suggests consuming 1.6-2.2g of protein per kilogram of body weight daily for optimal muscle protein synthesis. For a 75kg (165lb) individual, this equates to 120-165g of protein per day.</p>
      
      <h3>Beyond Protein: Supporting Nutrients</h3>
      
      <p>Maximize the effectiveness of your protein intake by ensuring adequate consumption of:</p>
      
      <ul>
        <li><strong>Carbohydrates:</strong> Consuming carbs with protein post-workout can enhance protein synthesis through insulin response.</li>
        <li><strong>Vitamin D:</strong> Plays a crucial role in muscle function and protein synthesis.</li>
        <li><strong>Zinc and Magnesium:</strong> Essential minerals that support testosterone production and muscle recovery.</li>
      </ul>
      
      <p>By optimizing both the timing and sources of your protein intake, you can significantly enhance muscle recovery and growth, leading to more effective training outcomes.</p>
    `
  },
  {
    id: 2,
    title: "The Science of Fat Loss: Beyond Calories",
    excerpt: "Why calorie counting alone isn't enough and how hormones play a crucial role in weight management.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    category: "Weight Loss",
    date: "June 3, 2023",
    expert: {
      name: "Sarah Johnson, PhD",
      title: "Metabolic Specialist",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Dr. Sarah Johnson specializes in hormonal regulation of metabolism and has published over 30 peer-reviewed articles on weight management."
    },
    content: `
      <h2>The Hormonal Approach to Fat Loss</h2>
      
      <p>For decades, weight loss has been reduced to a simple equation: calories in versus calories out. While this energy balance principle is fundamentally true, it fails to account for the complex hormonal systems that regulate fat storage, hunger, and metabolic rate.</p>
      
      <p>Understanding and optimizing these hormonal pathways can make the difference between temporary weight loss and sustainable fat loss.</p>
      
      <h3>Insulin: The Master Regulator</h3>
      
      <p>Insulin is perhaps the most crucial hormone to understand for effective fat loss. When insulin levels are elevated, your body is in fat-storage mode rather than fat-burning mode. Foods that trigger large insulin responses (primarily refined carbohydrates and sugars) can keep you physiologically trapped in a fat-storage state.</p>
      
      <p>Strategies to optimize insulin sensitivity include:</p>
      
      <ul>
        <li>Prioritizing low glycemic index carbohydrates</li>
        <li>Incorporating intermittent fasting protocols</li>
        <li>Adding vinegar to meals to reduce insulin response</li>
        <li>Including protein and healthy fats with carbohydrates</li>
        <li>Regular strength training to improve muscle insulin sensitivity</li>
      </ul>
      
      <h3>Leptin: The Satiety Hormone</h3>
      
      <p>Leptin is produced by fat cells and signals to your brain that you have sufficient energy stored. However, in many overweight individuals, leptin resistance occurs - the brain no longer responds appropriately to leptin's signals, leading to persistent hunger despite adequate energy stores.</p>
      
      <p>To improve leptin sensitivity:</p>
      
      <ul>
        <li>Avoid severe caloric restriction, which reduces leptin levels</li>
        <li>Prioritize adequate sleep (7-9 hours)</li>
        <li>Reduce inflammatory foods in your diet</li>
        <li>Include omega-3 fatty acids from fish or supplements</li>
      </ul>
      
      <h3>Cortisol: The Stress Hormone</h3>
      
      <p>Chronically elevated cortisol from psychological stress or overtraining can increase abdominal fat storage and muscle breakdown. Managing cortisol levels through stress reduction techniques can significantly impact your body composition.</p>
      
      <p>Effective cortisol management strategies include:</p>
      
      <ul>
        <li>Daily mindfulness or meditation practice</li>
        <li>Limiting training sessions to 45-60 minutes</li>
        <li>Adequate recovery between intense workouts</li>
        <li>Reducing caffeine intake if sensitive</li>
        <li>Regular recreation and leisure activities</li>
      </ul>
      
      <h3>The Circadian Component</h3>
      
      <p>Our hormonal environment fluctuates throughout the day according to our circadian rhythm. Recent research has shown that aligning our eating patterns with our circadian biology can enhance fat loss results.</p>
      
      <p>Consider these circadian strategies:</p>
      
      <ul>
        <li>Consume most calories earlier in the day</li>
        <li>Avoid eating within 2-3 hours of bedtime</li>
        <li>Get morning sunlight exposure to regulate melatonin</li>
        <li>Maintain consistent eating and sleeping schedules</li>
      </ul>
      
      <p>By understanding and optimizing these hormonal pathways, you can create a physiological environment that supports fat loss beyond simple calorie counting. While the energy balance equation remains important, addressing these hormonal factors can make your fat loss journey more effective and sustainable.</p>
    `
  },
  {
    id: 3,
    title: "Plant-Based Nutrition for Athletes",
    excerpt: "How to thrive as an athlete on a plant-based diet with proper nutrient timing and food choices.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    category: "Vegan Nutrition",
    date: "June 20, 2023",
    expert: {
      name: "James Wilson, RD",
      title: "Plant-Based Performance Coach",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      bio: "James Wilson is a registered dietitian specializing in plant-based nutrition for athletes and has helped numerous professional athletes transition to plant-based diets."
    },
    content: `
      <h2>Optimizing Athletic Performance on a Plant-Based Diet</h2>
      
      <p>The myth that plant-based diets cannot support high-level athletic performance has been thoroughly debunked in recent years. From Olympic athletes to NFL players, elite competitors are demonstrating that plant-based nutrition can fuel peak performance across all sports categories.</p>
      
      <p>However, a strategic approach is necessary to ensure optimal nutrient intake and timing for athletic success.</p>
      
      <h3>Protein: Quality and Quantity</h3>
      
      <p>Contrary to common misconceptions, obtaining sufficient protein on a plant-based diet is entirely feasible. Research indicates that plant proteins can effectively support muscle growth and recovery when consumed in appropriate amounts and combinations.</p>
      
      <p>Key plant protein sources for athletes include:</p>
      
      <ul>
        <li><strong>Legumes:</strong> Lentils, chickpeas, and all varieties of beans (providing 15-18g protein per cup)</li>
        <li><strong>Soy products:</strong> Tempeh, tofu, and edamame (offering a complete amino acid profile)</li>
        <li><strong>Seitan:</strong> A wheat protein with approximately 25g protein per 3.5oz serving</li>
        <li><strong>Plant protein powders:</strong> Pea, rice, and hemp protein blends for convenient post-workout nutrition</li>
        <li><strong>Quinoa:</strong> A complete protein grain with approximately 8g protein per cup</li>
      </ul>
      
      <p>Plant-based athletes should aim for 1.6-2.0g of protein per kg of body weight, spread throughout the day in 20-30g servings.</p>
      
      <h3>Strategic Micronutrient Focus</h3>
      
      <p>While plant-based diets can provide abundant micronutrients, athletes should pay particular attention to several key nutrients:</p>
      
      <ul>
        <li><strong>Iron:</strong> Crucial for oxygen transport and energy production. Consume vitamin C-rich foods with iron sources to enhance absorption.</li>
        <li><strong>Vitamin B12:</strong> Essential for energy metabolism and nervous system function. Supplementation is recommended for all plant-based athletes.</li>
        <li><strong>Omega-3 fatty acids:</strong> Important for recovery and inflammation management. Algae-based supplements provide direct DHA and EPA.</li>
        <li><strong>Zinc:</strong> Critical for protein synthesis and immune function. Emphasize pumpkin seeds, legumes, and whole grains.</li>
        <li><strong>Calcium:</strong> Beyond bone health, calcium is essential for muscle contraction. Focus on calcium-set tofu, fortified plant milks, and leafy greens.</li>
      </ul>
      
      <h3>Performance-Focused Meal Timing</h3>
      
      <p>Nutrient timing is particularly important for plant-based athletes, who may need to consume slightly larger volumes of food to meet energy needs.</p>
      
      <h4>Pre-Workout Nutrition (1-2 hours before):</h4>
      <ul>
        <li>Easily digestible carbohydrates with moderate protein</li>
        <li>Lower in fiber and fat to prevent digestive discomfort</li>
        <li>Example: Oatmeal with banana, plant protein, and nut butter</li>
      </ul>
      
      <h4>Post-Workout Recovery (within 30-60 minutes):</h4>
      <ul>
        <li>3:1 or 4:1 carbohydrate to protein ratio</li>
        <li>Emphasis on quickly digestible options</li>
        <li>Example: Smoothie with plant protein, frozen berries, banana, and tart cherry juice</li>
      </ul>
      
      <h3>Caloric Sufficiency and Athletic Performance</h3>
      
      <p>One of the most common pitfalls for plant-based athletes is unintentional under-eating, as plant foods tend to be less calorically dense but higher in fiber.</p>
      
      <p>Strategies to ensure adequate energy intake include:</p>
      
      <ul>
        <li>Incorporating calorie-dense foods like nuts, seeds, avocados, and coconut</li>
        <li>Using smoothies and calorie-dense liquids between meals</li>
        <li>Being mindful of fiber intake, which can promote early satiety</li>
        <li>Tracking periodically to ensure energy needs are being met</li>
      </ul>
      
      <p>With strategic planning and attention to these key areas, plant-based athletes can optimize their nutrition to support recovery, performance, and long-term health, often with advantages in terms of inflammation reduction and recovery time compared to omnivorous counterparts.</p>
    `
  }
];

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
  useEffect(() => {
    // In a real application, you would fetch the article from an API
    // For this demo, we'll use the local data
    const foundArticle = articlesContent.find(article => article.id === parseInt(id));
    setArticle(foundArticle || null);
    setLoading(false);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  if (loading) {
    return <div className="loading">Loading article...</div>;
  }
  
  if (!article) {
    return (
      <div className="article-not-found">
        <h2>Article Not Found</h2>
        <p>We couldn't find the article you're looking for.</p>
        <Link to="/expert-advice" className="back-link">Return to Expert Advice</Link>
      </div>
    );
  }
  
  return (
    <div className="article-detail-container">
      <div className="article-header">
        <div className="article-meta-info">
          <span className="article-category">{article.category}</span>
          <span className="article-date">{article.date}</span>
        </div>
        <h1 className="article-title">{article.title}</h1>
        
        <div className="article-author">
          <div className="author-avatar">
            <img src={article.expert.avatar} alt={article.expert.name} />
          </div>
          <div className="author-info">
            <h3 className="author-name">{article.expert.name}</h3>
            <p className="author-title">{article.expert.title}</p>
          </div>
        </div>
      </div>
      
      <div className="article-featured-image">
        <img src={article.imageUrl} alt={article.title} />
      </div>
      
      <div className="article-content">
        <div className="author-bio">
          <h3>About the Author</h3>
          <p>{article.expert.bio}</p>
        </div>
        
        <div 
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
      
      <div className="article-footer">
        <h3>Related Articles</h3>
        <div className="related-articles">
          {articlesContent
            .filter(relatedArticle => relatedArticle.id !== article.id)
            .slice(0, 2)
            .map(relatedArticle => (
              <div key={relatedArticle.id} className="related-article-card">
                <img 
                  src={relatedArticle.imageUrl} 
                  alt={relatedArticle.title} 
                  className="related-article-image"
                />
                <div className="related-article-info">
                  <span className="related-article-category">{relatedArticle.category}</span>
                  <h4 className="related-article-title">{relatedArticle.title}</h4>
                  <Link to={`/expert-advice/${relatedArticle.id}`} className="read-more">
                    Read Article
                  </Link>
                </div>
              </div>
            ))}
        </div>
        
        <div className="back-to-articles">
          <Link to="/expert-advice" className="btn-secondary">
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail; 