// import React, { useContext } from 'react'
// import './Cart.css'
// import { StoreContext } from '../../components/context/StoreContext'
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {

//   const {cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

//   const navigate = useNavigate();
//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Itmes</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item,index)=>{
//           if(cartItems[item._id]>0){
//             return <div>
//               <div className="cart-items-title cart-items-item">
//               <img src={item.image} alt="" />
//               <p>{item.name}</p>
//               <p>₹{item.price}</p>
//               <p>{cartItems[item._id]}</p>
//               <p>₹{item.price*cartItems[item._id]}</p>
//               <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
//             </div>
//             <hr />
//             </div>

            
//           }
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-detail">
//               <p>Subtotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-detail">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount()===0?0:2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-detail">
//               <b>Total</b>
//               <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
//             </div> 
//           </div>
//           <button onClick={()=> navigate('/order')}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>If you have a promo code, enter it here</p>
//             <div className='cart-promocode-input'>
//               <input type="text" placeholder='Promo Code'/>
//               <button>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cart


// frontend/src/pages/Cart/Cart.jsx
import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets' // Import assets for static images

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()
  const [imageErrors, setImageErrors] = useState({})

  // Function to get correct image URL for any product
  const getImageUrl = (item) => {
    if (!item || !item.image) return '';
    
    const imageValue = item.image;
    
    // If it's already a URL (from backend)
    if (typeof imageValue === 'string') {
      // Check if it's a backend uploaded image
      if (imageValue.includes('uploads') || imageValue.includes('http')) {
        return `${url}/uploads/${imageValue.replace('uploads/', '')}`;
      }
      
      // Check if it's an asset key (like 'food_1')
      if (assets[imageValue]) {
        return assets[imageValue];
      }
      
      // If it's just a filename
      return `${url}/uploads/${imageValue}`;
    }
    
    // If it's an imported image (static asset)
    return imageValue;
  }

  // Handle image loading errors
  const handleImageError = (itemId, imageSrc) => {
    console.log(`Failed to load image for item ${itemId}:`, imageSrc);
    setImageErrors(prev => ({
      ...prev,
      [itemId]: true
    }));
  }

  // Calculate total cart items
  const getTotalItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item];
      }
    }
    return total;
  }

  return (
    <div className='cart'>
      {getTotalItems() === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some delicious items to get started!</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p className="cart-count">{getTotalItems()} items</p>
          </div>
          
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Image</p>
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                const imageUrl = getImageUrl(item);
                const hasError = imageErrors[item._id];
                
                return (
                  <div key={`${item._id}-${index}`}>
                    <div className='cart-items-title cart-items-item'>
                      <div className="cart-item-image">
                        {hasError ? (
                          <div className="image-placeholder">
                            <span>📷</span>
                            <p>Image not available</p>
                          </div>
                        ) : (
                          <img 
                            src={imageUrl} 
                            alt={item.name}
                            onError={() => handleImageError(item._id, imageUrl)}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">₹{item.price}</p>
                      <p className="cart-item-quantity">
                        <span className="quantity-badge">{cartItems[item._id]}</span>
                      </p>
                      <p className="cart-item-total">₹{item.price * cartItems[item._id]}</p>
                      <p 
                        onClick={() => removeFromCart(item._id)} 
                        className='cross'
                        title="Remove from cart"
                      >
                        ❌
                      </p>
                    </div>
                    <hr />
                  </div>
                )
              }
              return null;
            })}
          </div>
          
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div className="cart-total-details">
                <div className="cart-total-row">
                  <p>Subtotal</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-row">
                  <p>Delivery Fee</p>
                  <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-row total-amount">
                  <b>Total</b>
                  <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                </div>
                <button 
                  onClick={() => navigate('/order')} 
                  className="checkout-btn"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
            
            <div className="cart-promocode">
              <div className="promo-container">
                <h3>Have a Promo Code?</h3>
                <p>Enter your promo code below to get discounts</p>
                <div className='cart-promocode-input'>
                  <input type="text" placeholder='Enter promo code' />
                  <button className="apply-btn">Apply</button>
                </div>
                <div className="promo-note">
                  <small>* Promo codes are subject to terms and conditions</small>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart