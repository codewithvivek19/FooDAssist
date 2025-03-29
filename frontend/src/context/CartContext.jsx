import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (meal) => {
    console.log('Adding meal to cart:', meal); // Debug log
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === meal._id);
      if (existingItem) {
        console.log('Updating existing item quantity'); // Debug log
        return prevItems.map(item =>
          item._id === meal._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      console.log('Adding new item to cart'); // Debug log
      return [...prevItems, { ...meal, quantity: 1 }];
    });
  };

  const removeFromCart = (mealId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== mealId));
  };

  const updateQuantity = (mealId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === mealId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
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