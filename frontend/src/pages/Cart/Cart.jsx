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



// // frontend/src/pages/Cart/Cart.jsx
// import React, { useContext } from 'react'
// import './Cart.css'
// import { StoreContext } from '../../components/context/StoreContext'
// import { useNavigate } from 'react-router-dom'

// const Cart = () => {
//   const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
//   const navigate = useNavigate()

//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
        
//         {/* FIXED: Add unique key to each item */}
//         {food_list.map((item, index) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div key={`${item._id}-${index}`}> {/* Added unique key */}
//                 <div className='cart-items-title cart-items-item'>
//                   <img src={item.image} alt={item.name} />
//                   <p>{item.name}</p>
//                   <p>₹{item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>₹{item.price * cartItems[item._id]}</p>
//                   <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
//                 </div>
//                 <hr />
//               </div>
//             )
//           }
//           return null; // Important: Return null for items not in cart
//         })}
//       </div>
      
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//             </div>
//           </div>
//           <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>If you have a promo code, Enter it here</p>
//             <div className='cart-promocode-input'>
//               <input type="text" placeholder='promo code' />
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
import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets' // Import assets for static images

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()

  // Function to get correct image URL for any product
  const getImageUrl = (item) => {
    if (!item || !item.image) return '';
    
    const imageValue = item.image;
    
    // Debug log
    console.log(`Getting image for ${item.name}:`, {
      image: imageValue,
      type: typeof imageValue,
      isString: typeof imageValue === 'string',
      isObject: typeof imageValue === 'object'
    });
    
    // If it's already a valid image source (hardcoded imported image)
    if (typeof imageValue === 'object') {
      return imageValue; // Already an imported image object
    }
    
    // If it's a string (from database)
    if (typeof imageValue === 'string') {
      // Check if it's an asset key (like 'food_1')
      if (assets[imageValue]) {
        return assets[imageValue];
      }
      
      // Check if it's already a full URL
      if (imageValue.startsWith('http') || imageValue.startsWith('data:')) {
        return imageValue;
      }
      
      // Check if it's a relative path
      if (imageValue.startsWith('/')) {
        return imageValue;
      }
      
      // Assume it's a backend image filename
      // Remove any 'uploads/' prefix if it exists
      const cleanFilename = imageValue.replace('uploads/', '');
      return `${url}/uploads/${cleanFilename}`;
    }
    
    // Fallback - use a placeholder
    return '/placeholder.jpg';
  }

  // Calculate total items in cart
  const getTotalItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item];
      }
    }
    return total;
  }

  // Get items that are actually in the cart
  const getItemsInCart = () => {
    return food_list.filter(item => cartItems[item._id] > 0);
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
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            
            {getItemsInCart().map((item, index) => {
              const imageUrl = getImageUrl(item);
              
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
                      />
                    </div>
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              )
            })}
          </div>
          
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-detail">
                  <p>Subtotal</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-detail">
                  <p>Delivery Fee</p>
                  <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-detail">
                  <b>Total</b>
                  <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                </div> 
              </div>
              <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, enter it here</p>
                <div className='cart-promocode-input'>
                  <input type="text" placeholder='Promo Code'/>
                  <button>Submit</button>
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