import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ExpertAdvicePage.css';

// Import the same article data
import { articlesContent } from './ArticleDetail';

const ExpertAdvicePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Get unique categories from articles
  const categories = ['all', ...new Set(articlesContent.map(article => article.category.toLowerCase().replace(' ', '-')))];
  
  // Filter articles by category
  const filteredArticles = activeCategory === 'all' 
    ? articlesContent 
    : articlesContent.filter(article => article.category.toLowerCase().replace(' ', '-') === activeCategory);
  
  return (
    <div className="expert-advice-page">
      <div className="advice-header">
        <h1>Expert Nutrition & Fitness Advice</h1>
        <p>Get the latest evidence-based nutrition and fitness advice from our certified experts</p>
      </div>
      
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category === 'all' ? 'All Articles' : category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>
      
      <div className="articles-grid">
        {filteredArticles.map(article => (
          <div key={article.id} className="article-card">
            <div className="article-image">
              <img src={article.imageUrl} alt={article.title} />
              <div className="expert-badge">
                <img src={article.expert.avatar} alt={article.expert.name} />
              </div>
            </div>
            
            <div className="article-content">
              <div className="article-meta">
                <span className="article-category">{article.category}</span>
                <span className="article-date">{article.date}</span>
              </div>
              
              <h3 className="article-title">{article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              
              <div className="article-footer">
                <span className="expert-name">By {article.expert.name}</span>
                <span className="expert-title">{article.expert.title}</span>
              </div>
              
              <Link to={`/expert-advice/${article.id}`} className="read-more">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
        <div className="no-articles">
          <p>No articles found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ExpertAdvicePage; 