"use client";
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [kitchenItems, setKitchenItems] = useState([]);

    const addToCart = (newItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const transferToKitchen = () => {
        const newItems = cartItems.map(item => ({ ...item, status: 'red' })); 
        setKitchenItems(newItems);
        setCartItems([]);
    };
    
    const updateItemStatus = (id, status) => {
        setKitchenItems(currentItems => currentItems.map(item => 
            item.id === id ? { ...item, status: status } : item
        ));
    };
    
    

    return (
        <CartContext.Provider value={{ cartItems, kitchenItems, addToCart, removeFromCart, transferToKitchen, updateItemStatus }}>
            {children}
        </CartContext.Provider>
    );
    
};

export const useCart = () => useContext(CartContext);
