import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children })=> {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;

    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1)
      }

    const decreaseQty = () => {
      setQty((prevQty) => {
        if(prevQty - 1 < 1) return 1
        return prevQty - 1
      })
    }

    const onAdd = (product,quantity) => {

      const checkProductCartItem = cartItems.find((item) => item._id === product._id) //same product is present in cart then just update price and item in cart
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

      if(checkProductCartItem) {

        const updateCartItems = cartItems.map((cartProduct) => {
          if(cartProduct._id === product._id) return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        })
        setCartItems(updateCartItems)

      } else {    // if new item is added to the cart 
        product.quantity = quantity
        setCartItems([...cartItems, {...product}])
      }        
      toast.success(`${qty} ${product.name} added to the cart`)
    }
    const onRemove = (product) => {
      foundProduct = cartItems.find((item) => item._id === product._id);
      const tempCart = cartItems.filter((item) => item._id !== product._id);

      setTotalPrice(totalPrice - foundProduct.price * foundProduct.quantity);
      setTotalQuantities(totalQuantities - foundProduct.quantity);
      setCartItems(tempCart);
    }

    const toggleCartItemQuanitity = (id, value) => {

      foundProduct = cartItems.find((item) => item._id === id)
      index = cartItems.findIndex((product) => product._id === id);
  
      if(value === 'inc') {
        foundProduct.quantity += 1;
        cartItems[index] =  foundProduct;
        setTotalPrice(totalPrice +  foundProduct.price);
        setTotalQuantities(totalQuantities + 1);

      } else if(value === 'dec') {
        if (foundProduct.quantity > 1) {

          foundProduct.quantity -= 1;
          cartItems[index] = foundProduct;
          setTotalPrice(totalPrice - foundProduct.price);
          setTotalQuantities(totalQuantities - 1);
        }
      }
    }

    return (
        <Context.Provider 
            value = {{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                increaseQty,
                decreaseQty,
                onAdd,
                onRemove,
                toggleCartItemQuanitity
            }}
        >
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
