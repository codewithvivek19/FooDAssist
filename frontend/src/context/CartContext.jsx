import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    console.log('Adding item to cart:', item); // Debug log
    
    // Check if the item has a type property
    const itemType = item.type || 'meal';
    
    setCartItems(prevItems => {
      // For meal plans, we don't want to increase quantity as they are subscription-based
      if (itemType === 'meal-plan') {
        // Check if we already have a meal plan in the cart
        const existingMealPlan = prevItems.find(i => i.type === 'meal-plan');
        if (existingMealPlan) {
          // Replace existing meal plan
          return prevItems.map(i => 
            i.type === 'meal-plan' ? { ...item, quantity: 1 } : i
          );
        }
        // Add new meal plan
        return [...prevItems, { ...item, quantity: 1 }];
      } 
      
      // Handle regular meals
      const existingItem = prevItems.find(i => i._id === item._id);
      if (existingItem) {
        console.log('Updating existing item quantity'); // Debug log
        return prevItems.map(i =>
          i._id === item._id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      console.log('Adding new item to cart'); // Debug log
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  const hasMealPlan = () => {
    return cartItems.some(item => item.type === 'meal-plan');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      hasMealPlan
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 