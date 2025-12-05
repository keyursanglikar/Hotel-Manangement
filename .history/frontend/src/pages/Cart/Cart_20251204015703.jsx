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
import { assets } from '../../assets/assets'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()
  const [processedFoodList, setProcessedFoodList] = useState([])

  // Process food list to ensure consistent image formats
  useEffect(() => {
    const processFoodItems = () => {
      return food_list.map(item => {
        // Create a copy of the item
        const processedItem = { ...item };
        
        // Debug log
        console.log(`Processing item: ${item.name}`, {
          image: item.image,
          type: typeof item.image,
          isString: typeof item.image === 'string',
          isObject: typeof item.image === 'object',
          isUndefined: item.image === undefined
        });

        // Handle image based on type
        if (!item.image) {
          // No image - use placeholder
          processedItem.processedImage = '/placeholder.jpg';
        } else if (typeof item.image === 'string') {
          // String image - could be backend filename or asset key
          if (item.image.includes('uploads') || item.image.includes('.jpg') || item.image.includes('.png') || item.image.includes('.jpeg')) {
            // Backend image file
            processedItem.processedImage = `${url}/uploads/${item.image.replace('uploads/', '')}`;
          } else if (assets[item.image]) {
            // Asset key (like 'food_1')
            processedItem.processedImage = assets[item.image];
          } else if (item.image.startsWith('http')) {
            // Full URL
            processedItem.processedImage = item.image;
          } else {
            // Assume it's a backend filename without path
            processedItem.processedImage = `${url}/uploads/${item.image}`;
          }
        } else if (typeof item.image === 'object') {
          // Imported image object
          processedItem.processedImage = item.image;
        } else {
          // Fallback
          processedItem.processedImage = '/placeholder.jpg';
        }

        return processedItem;
      });
    };

    if (food_list && food_list.length > 0) {
      const processed = processFoodItems();
      setProcessedFoodList(processed);
      
      // Log first few items for debugging
      processed.slice(0, 3).forEach((item, index) => {
        console.log(`Processed ${index + 1}. ${item.name}:`, {
          originalImage: item.image,
          processedImage: item.processedImage,
          type: typeof item.processedImage
        });
      });
    }
  }, [food_list, url])

  // Function to safely get image URL
  const getImageUrl = (item) => {
    if (!item) return '/placeholder.jpg';
    
    // Use processed image if available
    if (item.processedImage) {
      return item.processedImage;
    }
    
    // Fallback handling
    const imageValue = item.image;
    
    if (!imageValue) return '/placeholder.jpg';
    
    if (typeof imageValue === 'string') {
      if (imageValue.includes('uploads') || imageValue.includes('.jpg') || imageValue.includes('.png') || imageValue.includes('.jpeg')) {
        return `${url}/uploads/${imageValue.replace('uploads/', '')}`;
      }
      if (assets[imageValue]) {
        return assets[imageValue];
      }
      if (imageValue.startsWith('http')) {
        return imageValue;
      }
      return `${url}/uploads/${imageValue}`;
    }
    
    if (typeof imageValue === 'object') {
      return imageValue;
    }
    
    return '/placeholder.jpg';
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

  // Get items currently in cart
  const getCartItems = () => {
    return processedFoodList.filter(item => cartItems[item._id] > 0);
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
            
            {getCartItems().map((item, index) => {
              const imageUrl = getImageUrl(item);
              const quantity = cartItems[item._id];
              const itemTotal = item.price * quantity;
              
              return (
                <div key={`${item._id}-${index}`}>
                  <div className='cart-items-title cart-items-item'>
                    <div className="cart-item-image">
                      <img 
                        src={imageUrl} 
                        alt={item.name}
                        onError={(e) => {
                          console.error(`Failed to load image for ${item.name}:`, imageUrl);
                          e.target.src = '/placeholder.jpg';
                        }}
                        loading="lazy"
                      />
                    </div>
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">₹{item.price}</p>
                    <p className="cart-item-quantity">
                      <span className="quantity-badge">{quantity}</span>
                    </p>
                    <p className="cart-item-total">₹{itemTotal}</p>
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