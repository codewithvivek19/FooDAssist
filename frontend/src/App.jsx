import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Meals from './pages/Meals';
import MealCategory from './pages/MealCategory';
import MealPlans from './pages/MealPlans';
import MealDetail from './pages/MealDetail';
import Subscription from './pages/Subscription';
import ExpertAdvice from './components/ExpertAdvice/ExpertAdvice';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Account from './components/Account/Account';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import OrderDetails from './components/OrderDetails/OrderDetails';
import BodyProfile from './components/BodyProfile/BodyProfile';
import MealPlanRecommendations from './pages/MealPlanRecommendations';
import AboutUs from './pages/AboutUs';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ExpertAdvicePage from "./pages/ExpertAdvicePage";
import ArticleDetail from "./pages/ArticleDetail";

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              
              {/* Meal Routes */}
              <Route path="/meals" element={
                <PrivateRoute>
                  <Meals />
                </PrivateRoute>
              } />
              <Route path="/meal/:id" element={<MealDetail />} />
              
              {/* Meal Category Routes */}
              <Route path="/meals/weight-loss" element={<MealCategory />} />
              <Route path="/meals/muscle-gain" element={<MealCategory />} />
              <Route path="/meals/keto" element={<MealCategory />} />
              <Route path="/meals/vegan" element={<MealCategory />} />
              <Route path="/meals/paleo" element={<MealCategory />} />
              
              {/* Meal Plans & Subscriptions */}
              <Route path="/meal-plans" element={<MealPlans />} />
              <Route path="/subscriptions" element={<Subscription />} />
              
              {/* Information Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/expert-advice" element={<ExpertAdvicePage />} />
              <Route path="/expert-advice/:id" element={<ArticleDetail />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Legal Pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Contact */}
              <Route path="/contact" element={<Contact />} />
              
              {/* Shopping & Checkout */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              
              {/* User Account */}
              <Route path="/account" element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              } />
              <Route path="/order-success" element={
                <PrivateRoute>
                  <OrderSuccess />
                </PrivateRoute>
              } />
              <Route path="/order/:orderId" element={
                <PrivateRoute>
                  <OrderDetails />
                </PrivateRoute>
              } />
              <Route path="/body-profile" element={
                <PrivateRoute>
                  <BodyProfile />
                </PrivateRoute>
              } />
              <Route path="/meal-plan-recommendations" element={
                <PrivateRoute>
                  <MealPlanRecommendations />
                </PrivateRoute>
              } />
              
              {/* 404 Not Found */}
              <Route path="*" element={
                <div className="not-found">
                  <h2>Page Not Found</h2>
                  <p>The page you are looking for doesn't exist or has been moved.</p>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
