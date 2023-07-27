import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc, cur) => acc + cur.amount, 0);
      setItemAmount(amount);
      const price = cart.reduce((acc, cur) => acc + cur.price * cur.amount, 0);
      setTotal(price);
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const incrementAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };
  const decrementAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem.amount < 2) {
      removeFromCart(id);
      return;
    }
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        incrementAmount,
        decrementAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
