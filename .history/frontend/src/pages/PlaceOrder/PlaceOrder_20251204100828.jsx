// import React, { useContext, useEffect, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../components/context/StoreContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {
//   const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName:"",
//     lastName:"",
//     email:"",
//     street:"",
//     city:"",
//     state:"",
//     zipcode:"",
//     country:"",
//     phone:""
//   });

//   const onChangeHandler = (event) =>{
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data =>({...data,[name]:value}))
//   }

//   const placeOrder = async (event) =>{
//     event.preventDefault();
//     let orderItems = [];
//     food_list.map((item, index)=>{
//       if(cartItems[item._id]>0){
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//     })
//     let orderData = {
//       address:data,
//       items:orderItems,
//       amount:getTotalCartAmount()+2,
//     }

//     let response = await axios.post(url+'/api/order/place', orderData,{headers:{token}})
//     if(response.data.success){
//       const {session_url} = response.data;
//       window.location.replace(session_url);
//     }
//     else{
//       alert('Error')
//     }
//   }

//   const navigate = useNavigate();

//   useEffect(()=>{
//     if(!token){
//       navigate('/cart')
//     }else if(getTotalCartAmount()===0){
//       navigate('/cart')
//     }
//   },[token])

//   return (
//     <form onSubmit={placeOrder} className='place-order'>
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
//           <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
//         </div>
//         <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
//         <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
//         <div className="multi-fields">
//           <input required name='city' onChange={onChangeHandler} value={data.city}  type="text" placeholder='City'/>
//           <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
//         </div>
//         <div className="multi-fields">
//           <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
//           <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
//         </div>
//         <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
//       </div>
//       <div className="place-order-left">
//       <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//           <div className="cart-total-detail">
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
//           <button type='submit'>PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default PlaceOrder





// import React, { useContext, useEffect, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../components/context/StoreContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url, clearCart } = useContext(StoreContext);
//   const [currentStep, setCurrentStep] = useState(1); // 1: Delivery Info, 2: Payment Method, 3: Payment Details
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [paymentDetails, setPaymentDetails] = useState({
//     upiId: '',
//     cardNumber: '',
//     cardName: '',
//     cardExpiry: '',
//     cardCvv: ''
//   });
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [orderData, setOrderData] = useState(null);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data => ({ ...data, [name]: value }));
//   }

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//     setCurrentStep(3); // Move to payment details step
//   }

//   const handlePaymentDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails(prev => ({ ...prev, [name]: value }));
//   }

//   const validatePaymentDetails = () => {
//     if (paymentMethod === 'upi') {
//       return paymentDetails.upiId.includes('@') && paymentDetails.upiId.length > 5;
//     } else if (paymentMethod === 'card') {
//       return paymentDetails.cardNumber.length === 16 &&
//              paymentDetails.cardName.trim().length > 0 &&
//              paymentDetails.cardExpiry.length === 5 &&
//              paymentDetails.cardCvv.length === 3;
//     } else if (paymentMethod === 'cod') {
//       return true; // COD requires no validation
//     }
//     return false;
//   }

//   const processDummyPayment = async () => {
//     // Simulate payment processing
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const success = Math.random() > 0.1; // 90% success rate
//         resolve({
//           success,
//           transactionId: 'TXN' + Date.now(),
//           paymentId: 'PAY' + Math.random().toString(36).substr(2, 9).toUpperCase()
//         });
//       }, 1500);
//     });
//   }

//   const placeOrder = async (event) => {
//     event.preventDefault();
    
//     if (currentStep === 1) {
//       // Validate delivery info
//       if (!data.firstName || !data.email || !data.phone || !data.street) {
//         alert('Please fill all required delivery information');
//         return;
//       }
//       setCurrentStep(2);
//       return;
//     }

//     if (currentStep === 3) {
//       if (!validatePaymentDetails()) {
//         alert('Please provide valid payment details');
//         return;
//       }

//       // Show loading
//       const proceed = window.confirm(`Proceed with ${paymentMethod.toUpperCase()} payment?`);
//       if (!proceed) return;

//       // Process dummy payment
//       const paymentResult = await processDummyPayment();
      
//       if (!paymentResult.success) {
//         alert('Payment failed. Please try again.');
//         return;
//       }

//       // Prepare order items
//       let orderItems = [];
//       food_list.map((item) => {
//         if (cartItems[item._id] > 0) {
//           let itemInfo = { ...item };
//           itemInfo["quantity"] = cartItems[item._id];
//           orderItems.push(itemInfo);
//         }
//         return null;
//       });

//       // Prepare complete order data
//       const completeOrderData = {
//         address: data,
//         items: orderItems,
//         amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2),
//         paymentMethod: paymentMethod,
//         paymentDetails: paymentDetails,
//         paymentStatus: 'completed',
//         transactionId: paymentResult.transactionId,
//         paymentId: paymentResult.paymentId,
//         orderDate: new Date().toISOString()
//       };

//       try {
//         // Save order to database
//         let response = await axios.post(url + '/api/order/place', completeOrderData, { headers: { token } });
        
//         if (response.data.success) {
//           setOrderData({
//             ...completeOrderData,
//             orderId: response.data.orderId,
//             orderNumber: 'ORD' + Date.now()
//           });
//           setOrderSuccess(true);
          
//           // Clear cart after successful order
//           clearCart && clearCart();
//         } else {
//           alert('Order placement failed: ' + (response.data.message || 'Unknown error'));
//         }
//       } catch (error) {
//         console.error('Order error:', error);
//         alert('Failed to place order. Please try again.');
//       }
//     }
//   }

//   const generateReceipt = () => {
//     // Create receipt content
//     const receiptContent = `
//       ====================================
//                 RESTAURANT RECEIPT
//       ====================================
//       Order Number: ${orderData.orderNumber}
//       Date: ${new Date(orderData.orderDate).toLocaleString()}
      
//       Customer Information:
//       ---------------------
//       Name: ${orderData.address.firstName} ${orderData.address.lastName}
//       Email: ${orderData.address.email}
//       Phone: ${orderData.address.phone}
//       Address: ${orderData.address.street}, ${orderData.address.city}
//                ${orderData.address.state}, ${orderData.address.country} - ${orderData.address.zipcode}
      
//       Order Summary:
//       --------------
//       ${orderData.items.map(item => `
//         ${item.name} x ${item.quantity}
//           ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}
//       `).join('')}
      
//       Subtotal: ₹${orderData.amount - 2}
//       Delivery Fee: ₹2
//       ------------------------------------
//       Total Amount: ₹${orderData.amount}
      
//       Payment Information:
//       --------------------
//       Method: ${orderData.paymentMethod.toUpperCase()}
//       Transaction ID: ${orderData.transactionId}
//       Payment ID: ${orderData.paymentId}
//       Status: ${orderData.paymentStatus}
      
//       Thank you for your order!
//       ====================================
//     `;

//     // Create and download PDF
//     const element = document.createElement('a');
//     const file = new Blob([receiptContent], { type: 'text/plain' });
//     element.href = URL.createObjectURL(file);
//     element.download = `Receipt_${orderData.orderNumber}.txt`;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   }

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate('/cart');
//     } else if (getTotalCartAmount() === 0) {
//       navigate('/cart');
//     }
//   }, [token, getTotalCartAmount, navigate]);

//   return (
//     <div className="place-order-container">
//       <div className="order-steps">
//         <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
//           <span>1</span>
//           <p>Delivery Info</p>
//         </div>
//         <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
//           <span>2</span>
//           <p>Payment Method</p>
//         </div>
//         <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
//           <span>3</span>
//           <p>Payment Details</p>
//         </div>
//         <div className={`step ${orderSuccess ? 'active' : ''}`}>
//           <span>4</span>
//           <p>Confirmation</p>
//         </div>
//       </div>

//       {orderSuccess ? (
//         <div className="order-success">
//           <div className="success-icon">✓</div>
//           <h2>Order Placed Successfully!</h2>
//           <p>Your order has been confirmed and will be delivered soon.</p>
          
//           <div className="order-summary">
//             <h3>Order Summary</h3>
//             <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
//             <p><strong>Total Amount:</strong> ₹{orderData.amount}</p>
//             <p><strong>Payment Method:</strong> {orderData.paymentMethod.toUpperCase()}</p>
//             <p><strong>Transaction ID:</strong> {orderData.transactionId}</p>
//           </div>

//           <div className="success-actions">
//             <button onClick={() => navigate('/')} className="continue-shopping">
//               Continue Shopping
//             </button>
//             <button onClick={generateReceipt} className="download-receipt">
//               Download Receipt
//             </button>
//           </div>
//         </div>
//       ) : (
//         <form onSubmit={placeOrder} className='place-order'>
//           {currentStep === 1 && (
//             <div className="place-order-left">
//               <p className="title">Delivery Information</p>
//               <div className="multi-fields">
//                 <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name *' />
//                 <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name *' />
//               </div>
//               <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address *' />
//               <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street Address *' />
//               <div className="multi-fields">
//                 <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City *' />
//                 <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State *' />
//               </div>
//               <div className="multi-fields">
//                 <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code *' />
//                 <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country *' />
//               </div>
//               <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone Number *' />
//               <button type="submit" className="next-step-btn">
//                 Continue to Payment
//               </button>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="payment-methods">
//               <p className="title">Select Payment Method</p>
//               <div className="method-options">
//                 <div 
//                   className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('upi')}
//                 >
//                   <div className="method-icon">💸</div>
//                   <div className="method-info">
//                     <h3>UPI Payment</h3>
//                     <p>Pay using UPI ID or QR Code</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('card')}
//                 >
//                   <div className="method-icon">💳</div>
//                   <div className="method-info">
//                     <h3>Credit/Debit Card</h3>
//                     <p>Pay using card details</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('cod')}
//                 >
//                   <div className="method-icon">💰</div>
//                   <div className="method-info">
//                     <h3>Cash on Delivery</h3>
//                     <p>Pay when you receive the order</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'counter' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('counter')}
//                 >
//                   <div className="method-icon">🏪</div>
//                   <div className="method-info">
//                     <h3>Pay at Counter</h3>
//                     <p>Pay when picking up the order</p>
//                   </div>
//                 </div>
//               </div>
//               <button 
//                 type="button" 
//                 className="back-btn"
//                 onClick={() => setCurrentStep(1)}
//               >
//                 Back to Delivery Info
//               </button>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="payment-details">
//               <p className="title">Payment Details - {paymentMethod.toUpperCase()}</p>
              
//               {paymentMethod === 'upi' && (
//                 <div className="upi-payment">
//                   <div className="payment-section">
//                     <h4>Enter UPI ID</h4>
//                     <input
//                       type="text"
//                       name="upiId"
//                       value={paymentDetails.upiId}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="example@upi"
//                       required
//                     />
//                     <small>Enter your UPI ID (e.g., username@bank)</small>
//                   </div>
//                   <div className="payment-section">
//                     <h4>OR Scan QR Code</h4>
//                     <div className="qr-code-placeholder">
//                       {/* In real app, this would be a real QR code */}
//                       <div className="qr-code">
//                         <div className="qr-pattern"></div>
//                         <p>Scan to Pay</p>
//                       </div>
//                       <p className="qr-info">Scan this QR code with any UPI app to pay</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {paymentMethod === 'card' && (
//                 <div className="card-payment">
//                   <div className="payment-section">
//                     <h4>Card Details</h4>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       value={paymentDetails.cardNumber}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="1234 5678 9012 3456"
//                       maxLength="16"
//                       required
//                     />
//                     <input
//                       type="text"
//                       name="cardName"
//                       value={paymentDetails.cardName}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="Name on Card"
//                       required
//                     />
//                     <div className="card-details-row">
//                       <input
//                         type="text"
//                         name="cardExpiry"
//                         value={paymentDetails.cardExpiry}
//                         onChange={handlePaymentDetailsChange}
//                         placeholder="MM/YY"
//                         maxLength="5"
//                         required
//                       />
//                       <input
//                         type="text"
//                         name="cardCvv"
//                         value={paymentDetails.cardCvv}
//                         onChange={handlePaymentDetailsChange}
//                         placeholder="CVV"
//                         maxLength="3"
//                         required
//                       />
//                     </div>
//                     <small>Test Card: 4242 4242 4242 4242, Exp: 12/34, CVV: 123</small>
//                   </div>
//                 </div>
//               )}

//               {(paymentMethod === 'cod' || paymentMethod === 'counter') && (
//                 <div className="offline-payment">
//                   <div className="payment-section">
//                     <h4>Payment on {paymentMethod === 'cod' ? 'Delivery' : 'Pickup'}</h4>
//                     <p>You will pay ₹{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)} when you {paymentMethod === 'cod' ? 'receive' : 'pick up'} the order.</p>
//                     <div className="payment-note">
//                       <strong>Note:</strong> Please keep exact change ready.
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="payment-actions">
//                 <button 
//                   type="button" 
//                   className="back-btn"
//                   onClick={() => setCurrentStep(2)}
//                 >
//                   Back to Payment Methods
//                 </button>
//                 <button type="submit" className="pay-now-btn">
//                   {paymentMethod === 'cod' || paymentMethod === 'counter' ? 'Place Order' : 'Pay Now'}
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="place-order-right">
//             <div className="cart-total">
//               <h2>Order Summary</h2>
//               <div>
//                 <div className="cart-total-detail">
//                   <p>Subtotal</p>
//                   <p>₹{getTotalCartAmount()}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-detail">
//                   <p>Delivery Fee</p>
//                   <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-detail">
//                   <b>Total</b>
//                   <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       )}
//     </div>
//   )
// }

// export default PlaceOrder;





// // frontend/src/pages/PlaceOrder/PlaceOrder.jsx
// import React, { useContext, useEffect, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../components/context/StoreContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {
//   const { 
//     getTotalCartAmount, 
//     token, 
//     food_list, 
//     cartItems, 
//     url, 
//     clearCart
//   } = useContext(StoreContext);

//   const [currentStep, setCurrentStep] = useState(1);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [paymentDetails, setPaymentDetails] = useState({
//     upiId: '',
//     cardNumber: '',
//     cardName: '',
//     cardExpiry: '',
//     cardCvv: ''
//   });
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [orderData, setOrderData] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//     setCurrentStep(3);
//   };

//   const handlePaymentDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails(prev => ({ ...prev, [name]: value }));
//   };

//   const validatePaymentDetails = () => {
//     if (paymentMethod === 'upi') {
//       return paymentDetails.upiId.includes('@') && paymentDetails.upiId.length > 5;
//     } else if (paymentMethod === 'card') {
//       return paymentDetails.cardNumber.length === 16 &&
//              paymentDetails.cardName.trim().length > 0 &&
//              paymentDetails.cardExpiry.length === 5 &&
//              paymentDetails.cardCvv.length === 3;
//     } else if (paymentMethod === 'cod' || paymentMethod === 'counter') {
//       return true;
//     }
//     return false;
//   };

//   const processDummyPayment = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const success = Math.random() > 0.1;
//         resolve({
//           success,
//           transactionId: 'TXN' + Date.now(),
//           paymentId: 'PAY' + Math.random().toString(36).substr(2, 9).toUpperCase()
//         });
//       }, 1500);
//     });
//   };

//   // FIXED: Changed function name from placeOrder to handlePlaceOrderSubmit
//   const handlePlaceOrderSubmit = async (event) => {
//     event.preventDefault();
    
//     if (currentStep === 1) {
//       if (!data.firstName || !data.email || !data.phone || !data.street) {
//         alert('Please fill all required delivery information');
//         return;
//       }
//       setCurrentStep(2);
//       return;
//     }

//     if (currentStep === 3) {
//       if (paymentMethod && !validatePaymentDetails()) {
//         alert('Please provide valid payment details');
//         return;
//       }

//       setIsProcessing(true);
      
//       try {
//         // Prepare order items
//         let orderItems = [];
//         food_list.forEach((item) => {
//           if (cartItems[item._id] > 0) {
//             orderItems.push({
//               ...item,
//               quantity: cartItems[item._id]
//             });
//           }
//         });

//         // Prepare order data
//         const orderDataToSend = {
//           address: data,
//           items: orderItems,
//           amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2),
//           paymentMethod: paymentMethod || 'stripe',
//           paymentDetails: paymentDetails,
//           transactionId: '',
//           paymentId: ''
//         };

//         // Process payment for non-COD methods
//         if (paymentMethod && paymentMethod !== 'cod' && paymentMethod !== 'counter') {
//           const paymentResult = await processDummyPayment();
//           if (!paymentResult.success) {
//             alert('Payment failed. Please try again.');
//             setIsProcessing(false);
//             return;
//           }
//           orderDataToSend.transactionId = paymentResult.transactionId;
//           orderDataToSend.paymentId = paymentResult.paymentId;
//         }

//         // Save order to backend
//         const response = await axios.post(
//           `${url}/api/order/place`,
//           orderDataToSend,
//           { headers: { token } }
//         );

//         if (response.data.success) {
//           setOrderData({
//             ...orderDataToSend,
//             orderId: response.data.orderId,
//             orderNumber: response.data.orderNumber,
//             date: new Date().toISOString()
//           });
//           setOrderSuccess(true);
          
//           // Clear cart after successful order
//           clearCart();
//         } else {
//           alert('Order placement failed: ' + (response.data.message || 'Unknown error'));
//         }
//       } catch (error) {
//         console.error('Order error:', error);
//         alert('Failed to place order. Please try again.');
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//   };

//   const generateReceipt = () => {
//     if (!orderData) return;
    
//     const receiptContent = `
// ====================================
//           RESTAURANT RECEIPT
// ====================================
// Order Number: ${orderData.orderNumber}
// Date: ${new Date(orderData.date).toLocaleString()}

// Customer Information:
// ---------------------
// Name: ${orderData.address.firstName} ${orderData.address.lastName}
// Email: ${orderData.address.email}
// Phone: ${orderData.address.phone}
// Address: ${orderData.address.street}, ${orderData.address.city}
//          ${orderData.address.state}, ${orderData.address.country} - ${orderData.address.zipcode}

// Order Summary:
// --------------
// ${orderData.items.map(item => `
//   ${item.name} x ${item.quantity}
//     ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}
// `).join('')}

// Subtotal: ₹${orderData.amount - 2}
// Delivery Fee: ₹2
// ------------------------------------
// Total Amount: ₹${orderData.amount}

// Payment Information:
// --------------------
// Method: ${orderData.paymentMethod.toUpperCase()}
// ${orderData.transactionId ? `Transaction ID: ${orderData.transactionId}` : ''}
// ${orderData.paymentId ? `Payment ID: ${orderData.paymentId}` : ''}
// Status: ${orderSuccess ? 'Completed' : 'Pending'}

// Thank you for your order!
// ====================================
//     `;

//     const element = document.createElement('a');
//     const file = new Blob([receiptContent], { type: 'text/plain' });
//     element.href = URL.createObjectURL(file);
//     element.download = `Receipt_${orderData.orderNumber}.txt`;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate('/cart');
//     } else if (getTotalCartAmount() === 0) {
//       navigate('/cart');
//     }
//   }, [token, getTotalCartAmount, navigate]);

//   return (
//     <div className="place-order-container">
//       <div className="order-steps">
//         <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
//           <span>1</span>
//           <p>Delivery Info</p>
//         </div>
//         <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
//           <span>2</span>
//           <p>Payment Method</p>
//         </div>
//         <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
//           <span>3</span>
//           <p>Payment Details</p>
//         </div>
//         <div className={`step ${orderSuccess ? 'active' : ''}`}>
//           <span>4</span>
//           <p>Confirmation</p>
//         </div>
//       </div>

//       {orderSuccess ? (
//         <div className="order-success">
//           <div className="success-icon">✓</div>
//           <h2>Order Placed Successfully!</h2>
//           <p>Your order has been confirmed and will be delivered soon.</p>
          
//           <div className="order-summary">
//             <h3>Order Summary</h3>
//             <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
//             <p><strong>Total Amount:</strong> ₹{orderData.amount}</p>
//             <p><strong>Payment Method:</strong> {orderData.paymentMethod.toUpperCase()}</p>
//             <p><strong>Transaction ID:</strong> {orderData.transactionId}</p>
//           </div>

//           <div className="success-actions">
//             <button onClick={() => navigate('/')} className="continue-shopping">
//               Continue Shopping
//             </button>
//             <button onClick={generateReceipt} className="download-receipt">
//               Download Receipt
//             </button>
//           </div>
//         </div>
//       ) : (
//         // FIXED: Changed onSubmit from placeOrder to handlePlaceOrderSubmit
//         <form onSubmit={handlePlaceOrderSubmit} className='place-order'>
//           {currentStep === 1 && (
//             <div className="place-order-left">
//               <p className="title">Delivery Information</p>
//               <div className="multi-fields">
//                 <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name *' />
//                 <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name *' />
//               </div>
//               <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address *' />
//               <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street Address *' />
//               <div className="multi-fields">
//                 <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City *' />
//                 <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State *' />
//               </div>
//               <div className="multi-fields">
//                 <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code *' />
//                 <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country *' />
//               </div>
//               <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone Number *' />
//               <button type="submit" className="next-step-btn" disabled={isProcessing}>
//                 {isProcessing ? 'Processing...' : 'Continue to Payment'}
//               </button>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="payment-methods">
//               <p className="title">Select Payment Method</p>
//               <div className="method-options">
//                 <div 
//                   className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('upi')}
//                 >
//                   <div className="method-icon">💸</div>
//                   <div className="method-info">
//                     <h3>UPI Payment</h3>
//                     <p>Pay using UPI ID or QR Code</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('card')}
//                 >
//                   <div className="method-icon">💳</div>
//                   <div className="method-info">
//                     <h3>Credit/Debit Card</h3>
//                     <p>Pay using card details</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('cod')}
//                 >
//                   <div className="method-icon">💰</div>
//                   <div className="method-info">
//                     <h3>Cash on Delivery</h3>
//                     <p>Pay when you receive the order</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'counter' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('counter')}
//                 >
//                   <div className="method-icon">🏪</div>
//                   <div className="method-info">
//                     <h3>Pay at Counter</h3>
//                     <p>Pay when picking up the order</p>
//                   </div>
//                 </div>
//               </div>
//               <button 
//                 type="button" 
//                 className="back-btn"
//                 onClick={() => setCurrentStep(1)}
//                 disabled={isProcessing}
//               >
//                 Back to Delivery Info
//               </button>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="payment-details">
//               <p className="title">Payment Details - {paymentMethod.toUpperCase()}</p>
              
//               {paymentMethod === 'upi' && (
//                 <div className="upi-payment">
//                   <div className="payment-section">
//                     <h4>Enter UPI ID</h4>
//                     <input
//                       type="text"
//                       name="upiId"
//                       value={paymentDetails.upiId}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="example@upi"
//                       required
//                       disabled={isProcessing}
//                     />
//                     <small>Enter your UPI ID (e.g., username@bank)</small>
//                   </div>
//                   <div className="payment-section">
//                     <h4>OR Scan QR Code</h4>
//                     <div className="qr-code-placeholder">
//                       <div className="qr-code">
//                         <div className="qr-pattern"></div>
//                         <p>Scan to Pay</p>
//                       </div>
//                       <p className="qr-info">Scan this QR code with any UPI app to pay</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {paymentMethod === 'card' && (
//                 <div className="card-payment">
//                   <div className="payment-section">
//                     <h4>Card Details</h4>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       value={paymentDetails.cardNumber}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="1234 5678 9012 3456"
//                       maxLength="16"
//                       required
//                       disabled={isProcessing}
//                     />
//                     <input
//                       type="text"
//                       name="cardName"
//                       value={paymentDetails.cardName}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="Name on Card"
//                       required
//                       disabled={isProcessing}
//                     />
//                     <div className="card-details-row">
//                       <input
//                         type="text"
//                         name="cardExpiry"
//                         value={paymentDetails.cardExpiry}
//                         onChange={handlePaymentDetailsChange}
//                         placeholder="MM/YY"
//                         maxLength="5"
//                         required
//                         disabled={isProcessing}
//                       />
//                       <input
//                         type="text"
//                         name="cardCvv"
//                         value={paymentDetails.cardCvv}
//                         onChange={handlePaymentDetailsChange}
//                         placeholder="CVV"
//                         maxLength="3"
//                         required
//                         disabled={isProcessing}
//                       />
//                     </div>
//                     <small>Test Card: 4242 4242 4242 4242, Exp: 12/34, CVV: 123</small>
//                   </div>
//                 </div>
//               )}

//               {(paymentMethod === 'cod' || paymentMethod === 'counter') && (
//                 <div className="offline-payment">
//                   <div className="payment-section">
//                     <h4>Payment on {paymentMethod === 'cod' ? 'Delivery' : 'Pickup'}</h4>
//                     <p>You will pay ₹{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)} when you {paymentMethod === 'cod' ? 'receive' : 'pick up'} the order.</p>
//                     <div className="payment-note">
//                       <strong>Note:</strong> Please keep exact change ready.
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="payment-actions">
//                 <button 
//                   type="button" 
//                   className="back-btn"
//                   onClick={() => setCurrentStep(2)}
//                   disabled={isProcessing}
//                 >
//                   Back to Payment Methods
//                 </button>
//                 <button type="submit" className="pay-now-btn" disabled={isProcessing}>
//                   {isProcessing ? 'Processing...' : paymentMethod === 'cod' || paymentMethod === 'counter' ? 'Place Order' : 'Pay Now'}
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="place-order-right">
//             <div className="cart-total">
//               <h2>Order Summary</h2>
//               <div>
//                 <div className="cart-total-detail">
//                   <p>Subtotal</p>
//                   <p>₹{getTotalCartAmount()}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-detail">
//                   <p>Delivery Fee</p>
//                   <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-detail">
//                   <b>Total</b>
//                   <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default PlaceOrder;










// // frontend/src/pages/PlaceOrder/PlaceOrder.jsx
// import React, { useContext, useEffect, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../components/context/StoreContext'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const PlaceOrder = () => {
//   const { 
//     getTotalCartAmount, 
//     token, 
//     food_list, 
//     cartItems, 
//     url, 
//     clearCart
//   } = useContext(StoreContext)

//   const [currentStep, setCurrentStep] = useState(1)
//   const [paymentMethod, setPaymentMethod] = useState('')
//   const [paymentDetails, setPaymentDetails] = useState({
//     upiId: '',
//     cardNumber: '',
//     cardName: '',
//     cardExpiry: '',
//     cardCvv: ''
//   })
//   const [orderSuccess, setOrderSuccess] = useState(false)
//   const [orderData, setOrderData] = useState(null)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [qrCodeUrl, setQrCodeUrl] = useState('')

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   })

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target
//     setData(prev => ({ ...prev, [name]: value }))
//   }

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method)
    
//     // Generate QR code for UPI
//     if (method === 'upi') {
//       // Generate a random UPI QR code (in real app, use actual UPI ID)
//       const upiId = `restaurant${Math.floor(Math.random() * 1000)}@oksbi`
//       const amount = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)
//       // Using a placeholder QR service - in production use actual UPI QR generation
//       setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}&pn=Restaurant&am=${amount}&cu=INR`)
//     }
    
//     setCurrentStep(3)
//   }

//   const handlePaymentDetailsChange = (e) => {
//     const { name, value } = e.target
//     setPaymentDetails(prev => ({ ...prev, [name]: value }))
//   }

//   const validatePaymentDetails = () => {
//     if (paymentMethod === 'upi') {
//       return paymentDetails.upiId.includes('@') && paymentDetails.upiId.length > 5
//     } else if (paymentMethod === 'card') {
//       return paymentDetails.cardNumber.length === 16 &&
//              paymentDetails.cardName.trim().length > 0 &&
//              paymentDetails.cardExpiry.length === 5 &&
//              paymentDetails.cardCvv.length === 3
//     } else if (paymentMethod === 'cod' || paymentMethod === 'counter') {
//       return true
//     }
//     return false
//   }

//   const handlePlaceOrderSubmit = async (event) => {
//     event.preventDefault()
    
//     if (currentStep === 1) {
//       // Validate delivery info
//       const requiredFields = ['firstName', 'email', 'phone', 'street', 'city']
//       const missingFields = requiredFields.filter(field => !data[field])
      
//       if (missingFields.length > 0) {
//         alert(`Please fill all required fields: ${missingFields.join(', ')}`)
//         return
//       }
//       setCurrentStep(2)
//       return
//     }

//     if (currentStep === 3) {
//       if (paymentMethod && !validatePaymentDetails()) {
//         alert('Please provide valid payment details')
//         return
//       }

//       setIsProcessing(true)
      
//       try {
//         // Prepare order items
//         let orderItems = []
//         food_list.forEach((item) => {
//           if (cartItems[item._id] > 0) {
//             orderItems.push({
//               _id: item._id,
//               name: item.name,
//               price: item.price,
//               description: item.description,
//               image: item.image,
//               category: item.category,
//               quantity: cartItems[item._id]
//             })
//           }
//         })

//         // Generate transaction IDs
//         const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
//         const paymentId = `PAY${Date.now()}${Math.floor(Math.random() * 1000)}`

//         // Prepare order data
//         const orderDataToSend = {
//           address: data,
//           items: orderItems,
//           amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2),
//           paymentMethod: paymentMethod || 'cod',
//           paymentDetails: paymentMethod ? paymentDetails : {},
//           transactionId: paymentMethod === 'upi' || paymentMethod === 'card' ? transactionId : '',
//           paymentId: paymentMethod === 'upi' || paymentMethod === 'card' ? paymentId : ''
//         }

//         console.log("Sending order data:", orderDataToSend)

//         // Save order to backend
//         const response = await axios.post(
//           `${url}/api/order/place`,
//           orderDataToSend,
//           { 
//             headers: { 
//               'Content-Type': 'application/json',
//               token 
//             } 
//           }
//         )

//         console.log("Order response:", response.data)

//         if (response.data.success) {
//           setOrderData({
//             ...orderDataToSend,
//             orderId: response.data.orderId,
//             orderNumber: response.data.orderNumber,
//             paymentSuccess: response.data.paymentSuccess,
//             date: new Date().toISOString()
//           })
//           setOrderSuccess(true)
          
//           // Clear cart after successful order
//           clearCart()
//         } else {
//           alert('Order placement failed: ' + (response.data.message || 'Unknown error'))
//         }
//       } catch (error) {
//         console.error('Order error:', error)
//         console.error('Error response:', error.response?.data)
//         alert(`Failed to place order: ${error.response?.data?.message || error.message}`)
//       } finally {
//         setIsProcessing(false)
//       }
//     }
//   }

//   const generateReceipt = () => {
//     if (!orderData) return
    
//     const receiptContent = `
// ====================================
//           RESTAURANT RECEIPT
// ====================================
// Order Number: ${orderData.orderNumber}
// Date: ${new Date(orderData.date).toLocaleString()}

// Customer Information:
// ---------------------
// Name: ${orderData.address.firstName} ${orderData.address.lastName}
// Email: ${orderData.address.email}
// Phone: ${orderData.address.phone}
// Address: ${orderData.address.street}, ${orderData.address.city}
//          ${orderData.address.state}, ${orderData.address.country} - ${orderData.address.zipcode}

// Order Summary:
// --------------
// ${orderData.items.map(item => `
//   ${item.name} x ${item.quantity}
//     ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}
// `).join('')}

// Subtotal: ₹${orderData.amount - 2}
// Delivery Fee: ₹2
// ------------------------------------
// Total Amount: ₹${orderData.amount}

// Payment Information:
// --------------------
// Method: ${orderData.paymentMethod.toUpperCase()}
// Status: ${orderData.paymentSuccess ? 'Completed' : 'Pending'}
// ${orderData.transactionId ? `Transaction ID: ${orderData.transactionId}` : ''}
// ${orderData.paymentId ? `Payment ID: ${orderData.paymentId}` : ''}

// Thank you for your order!
// ====================================
//     `

//     const element = document.createElement('a')
//     const file = new Blob([receiptContent], { type: 'text/plain' })
//     element.href = URL.createObjectURL(file)
//     element.download = `Receipt_${orderData.orderNumber}.txt`
//     document.body.appendChild(element)
//     element.click()
//     document.body.removeChild(element)
//   }

//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!token) {
//       navigate('/cart')
//     } else if (getTotalCartAmount() === 0) {
//       navigate('/cart')
//     }
//   }, [token, getTotalCartAmount, navigate])

//   return (
//     <div className="place-order-container">
//       <div className="order-steps">
//         <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
//           <span>1</span>
//           <p>Delivery Info</p>
//         </div>
//         <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
//           <span>2</span>
//           <p>Payment Method</p>
//         </div>
//         <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
//           <span>3</span>
//           <p>Payment Details</p>
//         </div>
//         <div className={`step ${orderSuccess ? 'active' : ''}`}>
//           <span>4</span>
//           <p>Confirmation</p>
//         </div>
//       </div>

//       {orderSuccess ? (
//         <div className="order-success">
//           <div className="success-icon">✓</div>
//           <h2>Order Placed Successfully!</h2>
//           <p>{orderData.paymentSuccess 
//             ? `Your order has been confirmed and will be delivered soon.`
//             : `Your order is placed. ${orderData.paymentMethod === 'cod' ? 'Please keep cash ready for delivery.' : 'Payment is pending.'}`}</p>
          
//           <div className="order-summary">
//             <h3>Order Summary</h3>
//             <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
//             <p><strong>Total Amount:</strong> ₹{orderData.amount}</p>
//             <p><strong>Payment Method:</strong> {orderData.paymentMethod.toUpperCase()}</p>
//             <p><strong>Status:</strong> {orderData.paymentSuccess ? 'Payment Successful' : 'Pending'}</p>
//             {orderData.transactionId && <p><strong>Transaction ID:</strong> {orderData.transactionId}</p>}
//           </div>

//           <div className="success-actions">
//             <button onClick={() => navigate('/')} className="continue-shopping">
//               Continue Shopping
//             </button>
//             <button onClick={generateReceipt} className="download-receipt">
//               Download Receipt
//             </button>
//           </div>
//         </div>
//       ) : (
//         <form onSubmit={handlePlaceOrderSubmit} className='place-order'>
//           {currentStep === 1 && (
//             <div className="place-order-left">
//               <p className="title">Delivery Information</p>
//               <div className="multi-fields">
//                 <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name *' />
//                 <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
//               </div>
//               <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address *' />
//               <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street Address *' />
//               <div className="multi-fields">
//                 <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City *' />
//                 <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State *' />
//               </div>
//               <div className="multi-fields">
//                 <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code *' />
//                 <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country *' />
//               </div>
//               <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone Number *' />
//               <button type="submit" className="next-step-btn" disabled={isProcessing}>
//                 {isProcessing ? 'Processing...' : 'Continue to Payment'}
//               </button>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="payment-methods">
//               <p className="title">Select Payment Method</p>
//               <div className="method-options">
//                 <div 
//                   className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('upi')}
//                 >
//                   <div className="method-icon">💸</div>
//                   <div className="method-info">
//                     <h3>UPI Payment</h3>
//                     <p>Pay instantly using UPI</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('card')}
//                 >
//                   <div className="method-icon">💳</div>
//                   <div className="method-info">
//                     <h3>Credit/Debit Card</h3>
//                     <p>Pay using card details</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('cod')}
//                 >
//                   <div className="method-icon">💰</div>
//                   <div className="method-info">
//                     <h3>Cash on Delivery</h3>
//                     <p>Pay when you receive the order</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'counter' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('counter')}
//                 >
//                   <div className="method-icon">🏪</div>
//                   <div className="method-info">
//                     <h3>Pay at Counter</h3>
//                     <p>Pay when picking up the order</p>
//                   </div>
//                 </div>
//               </div>
//               <button 
//                 type="button" 
//                 className="back-btn"
//                 onClick={() => setCurrentStep(1)}
//                 disabled={isProcessing}
//               >
//                 Back to Delivery Info
//               </button>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="payment-details">
//               <p className="title">Payment Details - {paymentMethod.toUpperCase()}</p>
              
//               {paymentMethod === 'upi' && (
//                 <div className="upi-payment">
//                   <div className="payment-section">
//                     <h4>Scan QR Code to Pay</h4>
//                     <div className="qr-code-container">
//                       <img 
//                         src={qrCodeUrl} 
//                         alt="UPI QR Code" 
//                         className="qr-code-image"
//                         onError={(e) => {
//                           e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=dummy@upi&pn=Restaurant&am=100&cu=INR'
//                         }}
//                       />
//                       <p className="qr-instructions">Scan this QR code with any UPI app to pay</p>
//                       <p className="amount-display">Amount: ₹{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</p>
//                     </div>
//                   </div>
//                   <div className="payment-section">
//                     <h4>OR Enter UPI ID</h4>
//                     <input
//                       type="text"
//                       name="upiId"
//                       value={paymentDetails.upiId}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="example@upi"
//                       required
//                       disabled={isProcessing}
//                     />
//                     <small>Enter your UPI ID (e.g., username@oksbi)</small>
//                   </div>
//                 </div>
//               )}

//               {paymentMethod === 'card' && (
//                 <div className="card-payment">
//                   <div className="payment-section">
//                     <h4>Card Details</h4>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       value={paymentDetails.cardNumber}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="1234 5678 9012 3456"
//                       maxLength="16"
//                       required
//                       disabled={isProcessing}
//                     />
//                     <input
//                       type="text"
//                       name="cardName"
//                       value={paymentDetails.cardName}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="Name on Card"
//                       required
//                       disabled={isProcessing}
//                     />
//                     <div className="card-details-row">
//                       <input
//                         type="text"
//                         name="cardExpiry"
//                         value={paymentDetails.cardExpiry}
//                         onChange={handlePaymentDetailsChange}
//                         placeholder="MM/YY"
//                         maxLength="5"
//                         required
//                         disabled={isProcessing}
//                       />
//                       <input
//                         type="text"
//                         name="cardCvv"
//                         value={paymentDetails.cardCvv}
//                         onChange={handlePaymentDetailsChange}
//                         placeholder="CVV"
//                         maxLength="3"
//                         required
//                         disabled={isProcessing}
//                       />
//                     </div>
//                     <div className="test-card-info">
//                       <strong>Test Card:</strong> 4242 4242 4242 4242 | Exp: 12/34 | CVV: 123
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {(paymentMethod === 'cod' || paymentMethod === 'counter') && (
//                 <div className="offline-payment">
//                   <div className="payment-section">
//                     <h4>Payment on {paymentMethod === 'cod' ? 'Delivery' : 'Pickup'}</h4>
//                     <div className="payment-summary">
//                       <p><strong>Total Amount:</strong> ₹{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</p>
//                       <p>You will pay when you {paymentMethod === 'cod' ? 'receive' : 'pick up'} the order.</p>
//                     </div>
//                     <div className="payment-note">
//                       <strong>Note:</strong> Please keep exact change ready. Delivery executive may not have change.
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="payment-actions">
//                 <button 
//                   type="button" 
//                   className="back-btn"
//                   onClick={() => setCurrentStep(2)}
//                   disabled={isProcessing}
//                 >
//                   Back to Payment Methods
//                 </button>
//                 <button type="submit" className="pay-now-btn" disabled={isProcessing}>
//                   {isProcessing ? 'Processing...' : paymentMethod === 'cod' || paymentMethod === 'counter' ? 'Place Order' : 'Complete Payment'}
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="place-order-right">
//             <div className="cart-total">
//               <h2>Order Summary</h2>
//               <div>
//                 <div className="cart-total-detail">
//                   <p>Subtotal</p>
//                   <p>₹{getTotalCartAmount()}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-detail">
//                   <p>Delivery Fee</p>
//                   <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-detail">
//                   <b>Total</b>
//                   <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       )}
//     </div>
//   )
// }

// export default PlaceOrder






// // frontend/src/pages/PlaceOrder/PlaceOrder.jsx
// import React, { useContext, useEffect, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../components/context/StoreContext'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const PlaceOrder = () => {
//   const { 
//     getTotalCartAmount, 
//     token, 
//     food_list, 
//     cartItems, 
//     url, 
//     clearCart
//   } = useContext(StoreContext)

//   const [currentStep, setCurrentStep] = useState(1)
//   const [paymentMethod, setPaymentMethod] = useState('')
//   const [paymentDetails, setPaymentDetails] = useState({
//     upiId: '',
//     cardNumber: '',
//     cardName: '',
//     cardExpiry: '',
//     cardCvv: ''
//   })
//   const [orderSuccess, setOrderSuccess] = useState(false)
//   const [orderData, setOrderData] = useState(null)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [qrCodeUrl, setQrCodeUrl] = useState('')
//   const [showPaymentStatusUpdate, setShowPaymentStatusUpdate] = useState(false)

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   })

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target
//     setData(prev => ({ ...prev, [name]: value }))
//   }

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method)
    
//     // Generate QR code for UPI
//     if (method === 'upi') {
//       // Generate a random UPI QR code
//       const upiId = `restaurant${Math.floor(Math.random() * 1000)}@oksbi`
//       const amount = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)
//       setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}&pn=Restaurant&am=${amount}&cu=INR`)
//     }
    
//     setCurrentStep(3)
//   }

//   const handlePaymentDetailsChange = (e) => {
//     const { name, value } = e.target
//     setPaymentDetails(prev => ({ ...prev, [name]: value }))
//   }

//   const validatePaymentDetails = () => {
//     if (paymentMethod === 'upi') {
//       return paymentDetails.upiId.includes('@') && paymentDetails.upiId.length > 5
//     } else if (paymentMethod === 'card') {
//       return paymentDetails.cardNumber.length === 16 &&
//              paymentDetails.cardName.trim().length > 0 &&
//              paymentDetails.cardExpiry.length === 5 &&
//              paymentDetails.cardCvv.length === 3
//     } else if (paymentMethod === 'cod' || paymentMethod === 'counter') {
//       return true
//     }
//     return false
//   }

//   const handlePlaceOrderSubmit = async (event) => {
//     event.preventDefault()
    
//     if (currentStep === 1) {
//       // Validate delivery info
//       const requiredFields = ['firstName', 'email', 'phone', 'street', 'city']
//       const missingFields = requiredFields.filter(field => !data[field])
      
//       if (missingFields.length > 0) {
//         alert(`Please fill all required fields: ${missingFields.join(', ')}`)
//         return
//       }
//       setCurrentStep(2)
//       return
//     }

//     if (currentStep === 3) {
//       if (paymentMethod && !validatePaymentDetails()) {
//         alert('Please provide valid payment details')
//         return
//       }

//       setIsProcessing(true)
      
//       try {
//         // Prepare order items
//         let orderItems = []
//         food_list.forEach((item) => {
//           if (cartItems[item._id] > 0) {
//             orderItems.push({
//               _id: item._id,
//               name: item.name,
//               price: item.price,
//               description: item.description,
//               image: item.image,
//               category: item.category,
//               quantity: cartItems[item._id]
//             })
//           }
//         })

//         // Generate transaction IDs
//         const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
//         const paymentId = `PAY${Date.now()}${Math.floor(Math.random() * 1000)}`

//         // Prepare order data
//         const orderDataToSend = {
//           address: data,
//           items: orderItems,
//           amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2),
//           paymentMethod: paymentMethod || 'cod',
//           paymentDetails: paymentMethod ? paymentDetails : {},
//           transactionId: paymentMethod === 'upi' || paymentMethod === 'card' ? transactionId : '',
//           paymentId: paymentMethod === 'upi' || paymentMethod === 'card' ? paymentId : ''
//         }

//         console.log("Sending order data:", orderDataToSend)

//         // Save order to backend
//         const response = await axios.post(
//           `${url}/api/order/place`,
//           orderDataToSend,
//           { 
//             headers: { 
//               'Content-Type': 'application/json',
//               token 
//             } 
//           }
//         )

//         console.log("Order response:", response.data)

//         if (response.data.success) {
//           setOrderData({
//             ...orderDataToSend,
//             orderId: response.data.orderId,
//             orderNumber: response.data.orderNumber,
//             receiptNumber: response.data.receiptNumber,
//             paymentSuccess: response.data.paymentSuccess,
//             paymentMethod: response.data.paymentMethod,
//             date: new Date().toISOString()
//           })
//           setOrderSuccess(true)
          
//           // Clear cart after successful order
//           clearCart()
          
//           // Show payment status update for counter payments
//           if (paymentMethod === 'counter') {
//             setShowPaymentStatusUpdate(true)
//           }
//         } else {
//           alert('Order placement failed: ' + (response.data.message || 'Unknown error'))
//         }
//       } catch (error) {
//         console.error('Order error:', error)
//         console.error('Error response:', error.response?.data)
//         alert(`Failed to place order: ${error.response?.data?.message || error.message}`)
//       } finally {
//         setIsProcessing(false)
//       }
//     }
//   }

//   const handleCounterPaymentUpdate = async (status) => {
//     try {
//       setIsProcessing(true)
      
//       const response = await axios.post(
//         `${url}/api/order/counter-payment`,
//         {
//           orderId: orderData.orderId,
//           paymentStatus: status
//         },
//         { 
//           headers: { 
//             'Content-Type': 'application/json',
//             token 
//           } 
//         }
//       )

//       if (response.data.success) {
//         setOrderData(prev => ({
//           ...prev,
//           paymentSuccess: status === 'paid',
//           counterPaymentStatus: status
//         }))
//         setShowPaymentStatusUpdate(false)
//         alert(`Payment marked as ${status}`)
//       } else {
//         alert('Failed to update payment status: ' + (response.data.message || 'Unknown error'))
//       }
//     } catch (error) {
//       console.error('Payment update error:', error)
//       alert('Failed to update payment status')
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const generateReceipt = async () => {
//     if (!orderData) return
    
//     try {
//       // Mark receipt as generated in backend
//       await axios.post(
//         `${url}/api/order/mark-receipt`,
//         { orderId: orderData.orderId },
//         { headers: { token } }
//       )
//     } catch (error) {
//       console.error('Error marking receipt:', error)
//     }
    
//     // Create receipt HTML
//     const receiptHTML = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Receipt - ${orderData.orderNumber}</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
//           .receipt-container { max-width: 800px; margin: 0 auto; background: white; border: 2px solid #000; }
//           .header { text-align: center; padding: 20px; background: #f8f8f8; border-bottom: 2px solid #000; }
//           .header h1 { margin: 0; color: #d32f2f; }
//           .header p { margin: 5px 0; color: #666; }
//           .content { padding: 20px; }
//           .section { margin-bottom: 30px; }
//           .section h2 { color: #d32f2f; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
//           .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
//           .info-item { margin: 10px 0; }
//           .info-label { font-weight: bold; color: #555; }
//           .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//           .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
//           .items-table th { background: #f8f8f8; color: #333; }
//           .total-section { text-align: right; margin-top: 30px; }
//           .total-row { display: flex; justify-content: space-between; max-width: 300px; margin-left: auto; }
//           .grand-total { font-size: 20px; font-weight: bold; color: #d32f2f; margin-top: 10px; }
//           .footer { text-align: center; padding: 20px; background: #f8f8f8; border-top: 2px solid #000; margin-top: 30px; }
//           .footer p { margin: 5px 0; color: #666; }
//           .payment-status { 
//             display: inline-block; 
//             padding: 5px 15px; 
//             border-radius: 20px; 
//             font-weight: bold; 
//             margin: 10px 0; 
//           }
//           .status-paid { background: #d4edda; color: #155724; }
//           .status-pending { background: #fff3cd; color: #856404; }
//         </style>
//       </head>
//       <body>
//         <div class="receipt-container">
//           <div class="header">
//             <h1>🍽️ RESTAURANT RECEIPT</h1>
//             <p>123 Food Street, City, Country</p>
//             <p>Phone: +91 1234567890 | Email: restaurant@example.com</p>
//           </div>
          
//           <div class="content">
//             <div class="section">
//               <h2>Order Information</h2>
//               <div class="info-grid">
//                 <div class="info-item">
//                   <span class="info-label">Order Number:</span> ${orderData.orderNumber}
//                 </div>
//                 <div class="info-item">
//                   <span class="info-label">Receipt Number:</span> ${orderData.receiptNumber || 'RCP' + Date.now()}
//                 </div>
//                 <div class="info-item">
//                   <span class="info-label">Date:</span> ${new Date(orderData.date).toLocaleString()}
//                 </div>
//                 <div class="info-item">
//                   <span class="info-label">Payment Method:</span> ${orderData.paymentMethod.toUpperCase()}
//                 </div>
//               </div>
              
//               <div class="payment-status ${orderData.paymentSuccess ? 'status-paid' : 'status-pending'}">
//                 ${orderData.paymentSuccess ? '✅ PAID' : '⏳ PENDING'}
//               </div>
//             </div>
            
//             <div class="section">
//               <h2>Customer Information</h2>
//               <div class="info-grid">
//                 <div class="info-item">
//                   <span class="info-label">Name:</span> ${orderData.address.firstName} ${orderData.address.lastName}
//                 </div>
//                 <div class="info-item">
//                   <span class="info-label">Email:</span> ${orderData.address.email}
//                 </div>
//                 <div class="info-item">
//                   <span class="info-label">Phone:</span> ${orderData.address.phone}
//                 </div>
//                 <div class="info-item">
//                   <span class="info-label">Address:</span> ${orderData.address.street}, ${orderData.address.city}
//                 </div>
//               </div>
//             </div>
            
//             <div class="section">
//               <h2>Order Summary</h2>
//               <table class="items-table">
//                 <thead>
//                   <tr>
//                     <th>Item</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${orderData.items.map(item => `
//                     <tr>
//                       <td>${item.name}</td>
//                       <td>${item.quantity}</td>
//                       <td>₹${item.price}</td>
//                       <td>₹${item.price * item.quantity}</td>
//                     </tr>
//                   `).join('')}
//                 </tbody>
//               </table>
              
//               <div class="total-section">
//                 <div class="total-row">
//                   <span>Subtotal:</span>
//                   <span>₹${orderData.amount - 2}</span>
//                 </div>
//                 <div class="total-row">
//                   <span>Delivery Fee:</span>
//                   <span>₹2</span>
//                 </div>
//                 <div class="total-row grand-total">
//                   <span>Total Amount:</span>
//                   <span>₹${orderData.amount}</span>
//                 </div>
//               </div>
//             </div>
            
//             <div class="section">
//               <h2>Payment Details</h2>
//               <div class="info-grid">
//                 <div class="info-item">
//                   <span class="info-label">Transaction ID:</span> ${orderData.transactionId || 'N/A'}
//                 </div>
//                 <div class="info-item">
//                   <span class="info-label">Payment ID:</span> ${orderData.paymentId || 'N/A'}
//                 </div>
//                 <div class="info-item">
//                   <span class="info-label">Payment Status:</span> ${orderData.paymentSuccess ? 'Completed' : 'Pending'}
//                 </div>
//                 <div class="info-item">
//                   <span class="info-label">Payment Time:</span> ${new Date().toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div class="footer">
//             <p><strong>Thank you for your order!</strong></p>
//             <p>For any queries, contact: support@restaurant.com | +91 1234567890</p>
//             <p>GSTIN: 27ABCDE1234F1Z5</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `

//     // Create PDF
//     const element = document.createElement('a')
//     const file = new Blob([receiptHTML], { type: 'text/html' })
//     element.href = URL.createObjectURL(file)
//     element.download = `Receipt_${orderData.orderNumber}.html`
//     document.body.appendChild(element)
//     element.click()
//     document.body.removeChild(element)
//   }

//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!token) {
//       navigate('/cart')
//     } else if (getTotalCartAmount() === 0) {
//       navigate('/cart')
//     }
//   }, [token, getTotalCartAmount, navigate])

//   return (
//     <div className="place-order-container">
//       <div className="order-steps">
//         <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
//           <span>1</span>
//           <p>Delivery Info</p>
//         </div>
//         <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
//           <span>2</span>
//           <p>Payment Method</p>
//         </div>
//         <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
//           <span>3</span>
//           <p>Payment Details</p>
//         </div>
//         <div className={`step ${orderSuccess ? 'active' : ''}`}>
//           <span>4</span>
//           <p>Confirmation</p>
//         </div>
//       </div>

//       {orderSuccess ? (
//         <div className="order-success">
//           <div className="success-icon">✓</div>
//           <h2>Order Placed Successfully!</h2>
          
//           {orderData.paymentSuccess ? (
//             <p className="success-message">
//               ✅ Payment successful! Your order has been confirmed and will be delivered soon.
//             </p>
//           ) : (
//             <p className="pending-message">
//               ⏳ Order placed. {orderData.paymentMethod === 'counter' 
//                 ? 'Please complete payment at the counter.' 
//                 : orderData.paymentMethod === 'cod'
//                 ? 'Please keep cash ready for delivery.'
//                 : 'Payment is pending.'}
//             </p>
//           )}
          
//           <div className="order-summary">
//             <h3>Order Summary</h3>
//             <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
//             <p><strong>Total Amount:</strong> ₹{orderData.amount}</p>
//             <p><strong>Payment Method:</strong> {orderData.paymentMethod.toUpperCase()}</p>
//             <p>
//               <strong>Status:</strong> 
//               <span className={`status-badge ${orderData.paymentSuccess ? 'status-paid' : 'status-pending'}`}>
//                 {orderData.paymentSuccess ? 'Paid' : 'Pending'}
//               </span>
//             </p>
//             {orderData.transactionId && <p><strong>Transaction ID:</strong> {orderData.transactionId}</p>}
//           </div>

//           {showPaymentStatusUpdate && (
//             <div className="counter-payment-update">
//               <h4>Update Counter Payment Status</h4>
//               <p>Have you completed the payment at the counter?</p>
//               <div className="payment-update-buttons">
//                 <button 
//                   onClick={() => handleCounterPaymentUpdate('paid')}
//                   className="paid-btn"
//                   disabled={isProcessing}
//                 >
//                   ✅ Mark as Paid
//                 </button>
//                 <button 
//                   onClick={() => handleCounterPaymentUpdate('not_paid')}
//                   className="not-paid-btn"
//                   disabled={isProcessing}
//                 >
//                   ❌ Mark as Not Paid
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="success-actions">
//             <button onClick={() => navigate('/')} className="continue-shopping">
//               Continue Shopping
//             </button>
//             <button onClick={generateReceipt} className="download-receipt">
//               📄 Download Receipt
//             </button>
//             <button onClick={() => navigate('/my-orders')} className="view-orders">
//               📋 View My Orders
//             </button>
//           </div>
//         </div>
//       ) : (
//              <form onSubmit={handlePlaceOrderSubmit} className='place-order'>
//         {currentStep === 1 && (
//             <div className="place-order-left">
//               <p className="title">Delivery Information</p>
//               <div className="multi-fields">
//                 <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name *' />
//                 <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
//               </div>
//               <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address *' />
//               <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street Address *' />
//               <div className="multi-fields">
//                 <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City *' />
//                 <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State *' />
//               </div>
//               <div className="multi-fields">
//                 <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code *' />
//                 <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country *' />
//               </div>
//               <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone Number *' />
//               <button type="submit" className="next-step-btn" disabled={isProcessing}>
//                 {isProcessing ? 'Processing...' : 'Continue to Payment'}
//               </button>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="payment-methods">
//               <p className="title">Select Payment Method</p>
//               <div className="method-options">
//                 <div 
//                   className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('upi')}
//                 >
//                   <div className="method-icon">💸</div>
//                   <div className="method-info">
//                     <h3>UPI Payment</h3>
//                     <p>Pay instantly using UPI</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('card')}
//                 >
//                   <div className="method-icon">💳</div>
//                   <div className="method-info">
//                     <h3>Credit/Debit Card</h3>
//                     <p>Pay using card details</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('cod')}
//                 >
//                   <div className="method-icon">💰</div>
//                   <div className="method-info">
//                     <h3>Cash on Delivery</h3>
//                     <p>Pay when you receive the order</p>
//                   </div>
//                 </div>

//                 <div 
//                   className={`method-option ${paymentMethod === 'counter' ? 'selected' : ''}`}
//                   onClick={() => handlePaymentMethodChange('counter')}
//                 >
//                   <div className="method-icon">🏪</div>
//                   <div className="method-info">
//                     <h3>Pay at Counter</h3>
//                     <p>Pay when picking up the order</p>
//                   </div>
//                 </div>
//               </div>
//               <button 
//                 type="button" 
//                 className="back-btn"
//                 onClick={() => setCurrentStep(1)}
//                 disabled={isProcessing}
//               >
//                 Back to Delivery Info
//               </button>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="payment-details">
//               <p className="title">Payment Details - {paymentMethod.toUpperCase()}</p>
              
//               {paymentMethod === 'upi' && (
//                 <div className="upi-payment">
//                   <div className="payment-section">
//                     <h4>Scan QR Code to Pay</h4>
//                     <div className="qr-code-container">
//                       <img 
//                         src={qrCodeUrl} 
//                         alt="UPI QR Code" 
//                         className="qr-code-image"
//                         onError={(e) => {
//                           e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=dummy@upi&pn=Restaurant&am=100&cu=INR'
//                         }}
//                       />
//                       <p className="qr-instructions">Scan this QR code with any UPI app to pay</p>
//                       <p className="amount-display">Amount: ₹{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</p>
//                     </div>
//                   </div>
//                   <div className="payment-section">
//                     <h4>OR Enter UPI ID</h4>
//                     <input
//                       type="text"
//                       name="upiId"
//                       value={paymentDetails.upiId}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="example@upi"
//                       required
//                       disabled={isProcessing}
//                     />
//                     <small>Enter your UPI ID (e.g., username@oksbi)</small>
//                   </div>
//                 </div>
//               )}

//               {paymentMethod === 'card' && (
//                 <div className="card-payment">
//                   <div className="payment-section">
//                     <h4>Card Details</h4>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       value={paymentDetails.cardNumber}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="1234 5678 9012 3456"
//                       maxLength="16"
//                       required
//                       disabled={isProcessing}
//                     />
//                     <input
//                       type="text"
//                       name="cardName"
//                       value={paymentDetails.cardName}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="Name on Card"
//                       required
//                       disabled={isProcessing}
//                     />
//                     <div className="card-details-row">
//                       <input
//                         type="text"
//                         name="cardExpiry"
//                         value={paymentDetails.cardExpiry}
//                         onChange={handlePaymentDetailsChange}
//                         placeholder="MM/YY"
//                         maxLength="5"
//                         required
//                         disabled={isProcessing}
//                       />
//                       <input
//                         type="text"
//                         name="cardCvv"
//                         value={paymentDetails.cardCvv}
//                         onChange={handlePaymentDetailsChange}
//                         placeholder="CVV"
//                         maxLength="3"
//                         required
//                         disabled={isProcessing}
//                       />
//                     </div>
//                     <div className="test-card-info">
//                       <strong>Test Card:</strong> 4242 4242 4242 4242 | Exp: 12/34 | CVV: 123
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {(paymentMethod === 'cod' || paymentMethod === 'counter') && (
//                 <div className="offline-payment">
//                   <div className="payment-section">
//                     <h4>Payment on {paymentMethod === 'cod' ? 'Delivery' : 'Pickup'}</h4>
//                     <div className="payment-summary">
//                       <p><strong>Total Amount:</strong> ₹{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</p>
//                       <p>You will pay when you {paymentMethod === 'cod' ? 'receive' : 'pick up'} the order.</p>
//                     </div>
//                     <div className="payment-note">
//                       <strong>Note:</strong> Please keep exact change ready. Delivery executive may not have change.
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="payment-actions">
//                 <button 
//                   type="button" 
//                   className="back-btn"
//                   onClick={() => setCurrentStep(2)}
//                   disabled={isProcessing}
//                 >
//                   Back to Payment Methods
//                 </button>
//                 <button type="submit" className="pay-now-btn" disabled={isProcessing}>
//                   {isProcessing ? 'Processing...' : paymentMethod === 'cod' || paymentMethod === 'counter' ? 'Place Order' : 'Complete Payment'}
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="place-order-right">
//             <div className="cart-total">
//               <h2>Order Summary</h2>
//               <div>
//                 <div className="cart-total-detail">
//                   <p>Subtotal</p>
//                   <p>₹{getTotalCartAmount()}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-detail">
//                   <p>Delivery Fee</p>
//                   <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-detail">
//                   <b>Total</b>
//                   <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       )}
//     </div>
//   )
// }

// export default PlaceOrder









// frontend/src/pages/PlaceOrder/PlaceOrder.jsx
import React, { useContext, useEffect, useState, useRef } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const PlaceOrder = () => {
  const { 
    getTotalCartAmount, 
    token, 
    food_list, 
    cartItems, 
    url, 
    clearCart
  } = useContext(StoreContext)

  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  })
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderData, setOrderData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [showPaymentStatusUpdate, setShowPaymentStatusUpdate] = useState(false)
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const receiptRef = useRef(null)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  // Generate UPI QR Code
  useEffect(() => {
    if (paymentMethod === 'upi' && getTotalCartAmount() > 0) {
      const totalAmount = getTotalCartAmount() + 2
      const upiString = `upi://pay?pa=restaurant@upi&pn=Restaurant&am=${totalAmount}&cu=INR&tn=Food Order Payment`
      
      QRCode.toDataURL(upiString)
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error('QR Code generation failed:', err))
    }
  }, [paymentMethod, getTotalCartAmount])

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    setCurrentStep(3)
  }

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }
    // Format expiry date
    else if (name === 'cardExpiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substring(0, 5)
    }
    // Format CVV to only accept numbers
    else if (name === 'cardCvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3)
    }
    
    setPaymentDetails(prev => ({ ...prev, [name]: formattedValue }))
  }

  const validatePaymentDetails = () => {
    if (paymentMethod === 'upi') {
      return paymentDetails.upiId.includes('@') && paymentDetails.upiId.length > 5
    } else if (paymentMethod === 'card') {
      const cardNum = paymentDetails.cardNumber.replace(/\s/g, '')
      return cardNum.length === 16 &&
             paymentDetails.cardName.trim().length > 0 &&
             paymentDetails.cardExpiry.length === 5 &&
             paymentDetails.cardCvv.length === 3
    } else if (paymentMethod === 'cod' || paymentMethod === 'counter') {
      return true
    }
    return false
  }

  const handlePlaceOrderSubmit = async (event) => {
    event.preventDefault()
    
    if (currentStep === 1) {
      // Validate delivery info
      const requiredFields = ['firstName', 'email', 'phone', 'street', 'city']
      const missingFields = requiredFields.filter(field => !data[field])
      
      if (missingFields.length > 0) {
        alert(`Please fill all required fields: ${missingFields.join(', ')}`)
        return
      }
      setCurrentStep(2)
      return
    }

    if (currentStep === 3) {
      if (paymentMethod && !validatePaymentDetails()) {
        alert('Please provide valid payment details')
        return
      }

      setIsProcessing(true)
      
      try {
        // Prepare order items
        let orderItems = []
        food_list.forEach((item) => {
          if (cartItems[item._id] > 0) {
            orderItems.push({
              _id: item._id,
              name: item.name,
              price: item.price,
              description: item.description,
              image: item.image,
              category: item.category,
              quantity: cartItems[item._id]
            })
          }
        })

        // Determine payment status
        const paymentSuccess = paymentMethod === 'upi' || paymentMethod === 'card' ? true : false
        const paymentStatus = paymentSuccess ? 'paid' : 'pending'
        
        // Generate transaction IDs
        const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
        const paymentId = `PAY${Date.now()}${Math.floor(Math.random() * 1000)}`
        const orderId = `ORD-${Date.now()}`

        // Prepare order data
        const orderDataToSend = {
          address: data,
          items: orderItems,
          amount: getTotalCartAmount() + 2,
          subtotal: getTotalCartAmount(),
          deliveryFee: 2,
          paymentMethod: paymentMethod || 'cod',
          paymentStatus: paymentStatus,
          transactionId: (paymentMethod === 'upi' || paymentMethod === 'card') ? transactionId : '',
          paymentId: (paymentMethod === 'upi' || paymentMethod === 'card') ? paymentId : '',
          orderId: orderId,
          orderNumber: `REST-${Date.now()}`,
          receiptNumber: `RCP${Math.floor(Math.random() * 1000000)}`,
          date: new Date().toISOString()
        }

        console.log("Sending order data:", orderDataToSend)

        // Save order to localStorage for receipt generation
        localStorage.setItem('lastOrder', JSON.stringify(orderDataToSend))
        localStorage.setItem('lastOrderItems', JSON.stringify(orderItems))
        localStorage.setItem('lastOrderTotal', (getTotalCartAmount() + 2).toString())

        // Save order to backend
        const response = await axios.post(
          `${url}/api/order/place`,
          orderDataToSend,
          { 
            headers: { 
              'Content-Type': 'application/json',
              token 
            } 
          }
        )

        console.log("Order response:", response.data)

        if (response.data.success) {
          setOrderData({
            ...orderDataToSend,
            orderId: response.data.orderId || orderId,
            orderNumber: response.data.orderNumber || orderDataToSend.orderNumber,
            receiptNumber: response.data.receiptNumber || orderDataToSend.receiptNumber,
            paymentSuccess: paymentSuccess,
            paymentMethod: paymentMethod,
            date: new Date().toISOString()
          })
          setOrderSuccess(true)
          
          // Clear cart after successful order
          clearCart()
          
          // Show payment status update for counter payments
          if (paymentMethod === 'counter') {
            setShowPaymentStatusUpdate(true)
          }
        } else {
          alert('Order placement failed: ' + (response.data.message || 'Unknown error'))
        }
      } catch (error) {
        console.error('Order error:', error)
        console.error('Error response:', error.response?.data)
        alert(`Failed to place order: ${error.response?.data?.message || error.message}`)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleCounterPaymentUpdate = async (status) => {
    try {
      setIsProcessing(true)
      
      const response = await axios.post(
        `${url}/api/order/counter-payment`,
        {
          orderId: orderData.orderId,
          paymentStatus: status
        },
        { 
          headers: { 
            'Content-Type': 'application/json',
            token 
          } 
        }
      )

      if (response.data.success) {
        setOrderData(prev => ({
          ...prev,
          paymentSuccess: status === 'paid',
          counterPaymentStatus: status,
          paymentStatus: status
        }))
        setShowPaymentStatusUpdate(false)
        alert(`Payment marked as ${status}`)
      } else {
        alert('Failed to update payment status: ' + (response.data.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Payment update error:', error)
      alert('Failed to update payment status')
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) {
      alert('Receipt content not available. Please try the Print option.')
      return
    }
    
    setGeneratingPDF(true)
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`receipt-${orderData?.orderNumber || 'order'}.pdf`)
      
      // Mark receipt as generated in backend
      try {
        await axios.post(
          `${url}/api/order/mark-receipt`,
          { orderId: orderData.orderId },
          { headers: { token } }
        )
      } catch (error) {
        console.error('Error marking receipt:', error)
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. You can use the Print option instead.')
    } finally {
      setGeneratingPDF(false)
    }
  }

  const generateReceiptHTML = () => {
    if (!orderData) return ''
    
    const formatDate = (dateString) => {
      try {
        return new Date(dateString).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch {
        return new Date().toLocaleDateString('en-IN')
      }
    }

    const calculateTax = (subtotal) => subtotal * 0.05
    const subtotalAmount = orderData.subtotal || 0
    const tax = calculateTax(subtotalAmount)
    const total = subtotalAmount + tax + 2 // Add delivery fee

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${orderData.orderNumber}</title>
        <style>
          @media print {
            body * { visibility: hidden; }
            .receipt-print, .receipt-print * { visibility: visible; }
            .receipt-print {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 0;
              background: white;
              box-shadow: none;
            }
            .no-print { display: none !important; }
            @page { margin: 20mm; }
          }
          
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
          .receipt-print { max-width: 800px; margin: 0 auto; background: white; }
          .header { text-align: center; padding: 20px; border-bottom: 2px solid #d32f2f; }
          .header h1 { margin: 0; color: #d32f2f; font-size: 32px; }
          .header p { margin: 5px 0; color: #666; }
          .content { padding: 20px; }
          .section { margin-bottom: 30px; }
          .section h2 { color: #d32f2f; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
          .info-item { margin: 8px 0; }
          .info-label { font-weight: bold; color: #555; display: inline-block; min-width: 120px; }
          .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .items-table th { background: #f8f8f8; color: #333; font-weight: bold; }
          .total-section { text-align: right; margin-top: 30px; }
          .total-row { display: flex; justify-content: space-between; max-width: 300px; margin-left: auto; margin-bottom: 10px; }
          .grand-total { font-size: 24px; font-weight: bold; color: #d32f2f; margin-top: 20px; border-top: 2px solid #333; padding-top: 10px; }
          .footer { text-align: center; padding: 20px; border-top: 2px solid #d32f2f; margin-top: 40px; }
          .payment-status { 
            display: inline-block; 
            padding: 8px 20px; 
            border-radius: 4px; 
            font-weight: bold; 
            margin: 10px 0; 
            font-size: 16px;
          }
          .status-paid { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
          .status-pending { background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; }
        </style>
      </head>
      <body>
        <div class="receipt-print">
          <div class="header">
            <h1>🍽️ RESTAURANT BILL</h1>
            <p>123 Food Street, City, Country - 400001</p>
            <p>Phone: +91 9876543210 | Email: orders@restaurant.com</p>
            <p>GSTIN: 27ABCDE1234F1Z5</p>
          </div>
          
          <div class="content">
            <div class="info-grid">
              <div>
                <h2>Customer Details</h2>
                <div class="info-item">
                  <span class="info-label">Name:</span> ${orderData.address.firstName} ${orderData.address.lastName}
                </div>
                <div class="info-item">
                  <span class="info-label">Email:</span> ${orderData.address.email}
                </div>
                <div class="info-item">
                  <span class="info-label">Phone:</span> ${orderData.address.phone}
                </div>
                <div class="info-item">
                  <span class="info-label">Address:</span> 
                  <div>${orderData.address.street}</div>
                  <div>${orderData.address.city}, ${orderData.address.state} - ${orderData.address.zipcode}</div>
                  <div>${orderData.address.country}</div>
                </div>
              </div>
              
              <div>
                <h2>Order Details</h2>
                <div class="info-item">
                  <span class="info-label">Order No:</span> ${orderData.orderNumber}
                </div>
                <div class="info-item">
                  <span class="info-label">Receipt No:</span> ${orderData.receiptNumber}
                </div>
                <div class="info-item">
                  <span class="info-label">Date:</span> ${formatDate(orderData.date)}
                </div>
                <div class="info-item">
                  <span class="info-label">Payment:</span> ${orderData.paymentMethod.toUpperCase()}
                </div>
                <div class="payment-status ${orderData.paymentSuccess ? 'status-paid' : 'status-pending'}">
                  ${orderData.paymentSuccess ? '✅ PAID' : '⏳ PENDING'}
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2>Order Items</h2>
              <table class="items-table">
                <thead>
                  <tr>
                    <th style="width: 50%;">Item Description</th>
                    <th style="width: 15%;">Qty</th>
                    <th style="width: 20%;">Unit Price</th>
                    <th style="width: 15%;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderData.items.map(item => `
                    <tr>
                      <td>${item.name}<br/><small>${item.description || ''}</small></td>
                      <td>${item.quantity}</td>
                      <td>₹${item.price}</td>
                      <td>₹${(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            
            <div class="total-section">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>₹${subtotalAmount.toLocaleString()}</span>
              </div>
              <div class="total-row">
                <span>GST (5%):</span>
                <span>₹${tax.toLocaleString()}</span>
              </div>
              <div class="total-row">
                <span>Delivery Fee:</span>
                <span>₹${orderData.deliveryFee || 2}</span>
              </div>
              <div class="total-row grand-total">
                <span>TOTAL AMOUNT:</span>
                <span>₹${total.toLocaleString()}</span>
              </div>
            </div>
            
            <div class="section">
              <h2>Payment Information</h2>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Method:</span> ${orderData.paymentMethod.toUpperCase()}
                </div>
                <div class="info-item">
                  <span class="info-label">Transaction ID:</span> ${orderData.transactionId || 'N/A'}
                </div>
                <div class="info-item">
                  <span class="info-label">Payment ID:</span> ${orderData.paymentId || 'N/A'}
                </div>
                <div class="info-item">
                  <span class="info-label">Status:</span> 
                  <span class="${orderData.paymentSuccess ? 'status-paid' : 'status-pending'}" style="font-size: 14px; padding: 3px 10px;">
                    ${orderData.paymentSuccess ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>Thank you for dining with us!</strong></p>
              <p>For any queries, contact: support@restaurant.com | +91 9876543210</p>
              <p>This is a computer generated receipt and does not require a signature</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  const generateReceipt = async () => {
    if (!orderData) return
    
    // Mark receipt as generated in backend
    try {
      await axios.post(
        `${url}/api/order/mark-receipt`,
        { orderId: orderData.orderId },
        { headers: { token } }
      )
    } catch (error) {
      console.error('Error marking receipt:', error)
    }
    
    // Create HTML receipt for download
    const receiptHTML = generateReceiptHTML()
    const element = document.createElement('a')
    const file = new Blob([receiptHTML], { type: 'text/html' })
    element.href = URL.createObjectURL(file)
    element.download = `Restaurant_Receipt_${orderData.orderNumber}.html`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token, getTotalCartAmount, navigate])

  // Add print styles
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .receipt-print, .receipt-print * {
          visibility: visible;
        }
        .receipt-print {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 0;
          background: white;
          box-shadow: none;
        }
        .no-print {
          display: none !important;
        }
        @page {
          margin: 20mm;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="place-order-container">
      {orderSuccess ? (
        <div className="order-success" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          {/* Success Message */}
          <div className="text-center mb-8">
            <div style={{ fontSize: '60px', color: '#10B981', marginBottom: '20px' }}>✅</div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937', marginBottom: '10px' }}>
              Payment Successful!
            </h1>
            <p style={{ fontSize: '18px', color: '#6B7280' }}>Thank you for your order</p>
            
            <div style={{ marginTop: '24px', backgroundColor: '#D1FAE5', padding: '16px', borderRadius: '8px', display: 'inline-block' }}>
              <p style={{ color: '#065F46', fontWeight: '600', fontSize: '18px' }}>Order ID: {orderData.orderNumber}</p>
              <p style={{ color: '#047857', fontSize: '16px' }}>Your order has been placed successfully.</p>
            </div>
          </div>

          {/* Print-friendly receipt */}
          <div ref={receiptRef} style={{ 
            backgroundColor: 'white', 
            padding: '32px', 
            maxWidth: '800px', 
            margin: '0 auto', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            {/* Company Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '2px solid #DC2626', paddingBottom: '24px' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#DC2626', marginBottom: '8px' }}>🍽️ RESTAURANT BILL</h1>
              <p style={{ color: '#6B7280', margin: '4px 0' }}>
                123 Food Street, City, Country - 400001
              </p>
              <p style={{ color: '#6B7280', margin: '4px 0' }}>
                Phone: +91 9876543210 | Email: orders@restaurant.com
              </p>
              <p style={{ color: '#6B7280', margin: '4px 0' }}>
                GSTIN: 27ABCDE1234F1Z5
              </p>
            </div>

            {/* Order Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#DC2626', marginBottom: '16px', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
                  Customer Details
                </h2>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#4B5563', display: 'inline-block', minWidth: '100px' }}>Name:</span>
                  {orderData.address.firstName} {orderData.address.lastName}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#4B5563', display: 'inline-block', minWidth: '100px' }}>Email:</span>
                  {orderData.address.email}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#4B5563', display: 'inline-block', minWidth: '100px' }}>Phone:</span>
                  {orderData.address.phone}
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: '#4B5563', display: 'inline-block', minWidth: '100px' }}>Address:</span>
                  <div>{orderData.address.street}</div>
                  <div>{orderData.address.city}, {orderData.address.state} - {orderData.address.zipcode}</div>
                  <div>{orderData.address.country}</div>
                </div>
              </div>
              
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#DC2626', marginBottom: '16px', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
                  Order Details
                </h2>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#4B5563', display: 'inline-block', minWidth: '120px' }}>Order No:</span>
                  {orderData.orderNumber}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#4B5563', display: 'inline-block', minWidth: '120px' }}>Receipt No:</span>
                  {orderData.receiptNumber}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#4B5563', display: 'inline-block', minWidth: '120px' }}>Date:</span>
                  {new Date(orderData.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#4B5563', display: 'inline-block', minWidth: '120px' }}>Payment:</span>
                  {orderData.paymentMethod.toUpperCase()}
                </div>
                <div style={{ 
                  display: 'inline-block', 
                  padding: '8px 20px', 
                  borderRadius: '4px', 
                  fontWeight: 'bold',
                  marginTop: '8px',
                  backgroundColor: orderData.paymentSuccess ? '#D1FAE5' : '#FEF3C7',
                  color: orderData.paymentSuccess ? '#065F46' : '#92400E',
                  border: `1px solid ${orderData.paymentSuccess ? '#A7F3D0' : '#FDE68A'}`
                }}>
                  {orderData.paymentSuccess ? '✅ PAID' : '⏳ PENDING'}
                </div>
              </div>
            </div>

            {/* Order Items Table */}
            {orderData.items && orderData.items.length > 0 ? (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#DC2626', marginBottom: '16px', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
                  Order Items
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#374151', width: '50%' }}>Item Description</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontWeight: '600', color: '#374151', width: '15%' }}>Qty</th>
                      <th style={{ textAlign: 'right', padding: '12px', fontWeight: '600', color: '#374151', width: '20%' }}>Unit Price</th>
                      <th style={{ textAlign: 'right', padding: '12px', fontWeight: '600', color: '#374151', width: '15%' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item, index) => {
                      const itemTotal = item.price * (item.quantity || 1)
                      return (
                        <tr key={item._id || index} style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: index % 2 === 0 ? '#F9FAFB' : 'white' }}>
                          <td style={{ padding: '12px' }}>
                            <div style={{ fontWeight: '500' }}>{item.name}</div>
                            {item.description && (
                              <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>{item.description}</div>
                            )}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>{item.quantity || 1}</td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>₹{item.price}</td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>₹{itemTotal.toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ marginBottom: '32px', textAlign: 'center', padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#F9FAFB' }}>
                <p style={{ color: '#6B7280' }}>Order items details not available</p>
              </div>
            )}

            {/* Totals Section */}
            <div style={{ borderTop: '2px solid #E5E7EB', paddingTop: '24px', marginBottom: '32px' }}>
              <div style={{ maxWidth: '300px', marginLeft: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ color: '#6B7280' }}>Subtotal</span>
                  <span style={{ fontWeight: '500' }}>₹{(orderData.subtotal || 0).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ color: '#6B7280' }}>GST (5%)</span>
                  <span style={{ fontWeight: '500' }}>₹{((orderData.subtotal || 0) * 0.05).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ color: '#6B7280' }}>Delivery Fee</span>
                  <span style={{ fontWeight: '500' }}>₹{(orderData.deliveryFee || 2).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '2px solid #374151', marginTop: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937' }}>Total (INR)</span>
                  <span style={{ fontSize: '20px', fontWeight: '600', color: '#DC2626' }}>
                    ₹{((orderData.amount || 0) + ((orderData.subtotal || 0) * 0.05)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', padding: '24px', borderTop: '2px solid #DC2626', marginTop: '40px' }}>
              <p style={{ fontWeight: '600', color: '#1F2937', fontSize: '18px', marginBottom: '8px' }}>Thank you for dining with us!</p>
              <p style={{ color: '#6B7280', margin: '4px 0' }}>
                For any queries, contact: support@restaurant.com | +91 9876543210
              </p>
              <p style={{ color: '#6B7280', margin: '4px 0' }}>
                This is a computer generated receipt and does not require a signature
              </p>
            </div>
          </div>

          {/* Counter Payment Update (if applicable) */}
          {showPaymentStatusUpdate && (
            <div style={{ 
              backgroundColor: '#FEF3C7', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '30px',
              maxWidth: '600px',
              margin: '0 auto 30px'
            }}>
              <h4 style={{ color: '#92400E', fontSize: '18px', marginBottom: '10px' }}>Update Counter Payment Status</h4>
              <p style={{ color: '#92400E', marginBottom: '15px' }}>Have you completed the payment at the counter?</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                  onClick={() => handleCounterPaymentUpdate('paid')}
                  style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    opacity: isProcessing ? 0.6 : 1
                  }}
                  disabled={isProcessing}
                >
                  ✅ Mark as Paid
                </button>
                <button 
                  onClick={() => handleCounterPaymentUpdate('not_paid')}
                  style={{
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    opacity: isProcessing ? 0.6 : 1
                  }}
                  disabled={isProcessing}
                >
                  ❌ Mark as Not Paid
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ 
            marginTop: '40px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: '#DC2626',
                  color: 'white',
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#B91C1C'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#DC2626'}
              >
                Continue Shopping
              </button>
              <button
                onClick={handlePrint}
                style={{
                  backgroundColor: 'white',
                  color: '#DC2626',
                  border: '2px solid #DC2626',
                  padding: '12px 32px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#DC2626'
                  e.target.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'white'
                  e.target.style.color = '#DC2626'
                }}
              >
                Print Receipt
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={generatingPDF}
                style={{
                  backgroundColor: generatingPDF ? '#9CA3AF' : '#10B981',
                  color: 'white',
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: generatingPDF ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s',
                  opacity: generatingPDF ? 0.6 : 1
                }}
                onMouseOver={(e) => {
                  if (!generatingPDF) {
                    e.target.style.backgroundColor = '#059669'
                  }
                }}
                onMouseOut={(e) => {
                  if (!generatingPDF) {
                    e.target.style.backgroundColor = '#10B981'
                  }
                }}
              >
                {generatingPDF ? 'Generating PDF...' : 'Download PDF'}
              </button>
            </div>
            
            {/* Old HTML Download Button (for backup) */}
            <button
              onClick={generateReceipt}
              style={{
                backgroundColor: '#6366F1',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s',
                marginTop: '10px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4F46E5'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6366F1'}
            >
              📄 Download HTML Receipt
            </button>
          </div>

          {/* Instructions */}
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6B7280' }}>
            <p style={{ marginBottom: '4px' }}>Click "Print Receipt" and choose "Save as PDF" to download your receipt</p>
            <p>Or click "Download PDF" for direct PDF download</p>
          </div>

          {/* Auto-redirect notice */}
          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '12px', color: '#9CA3AF' }}>
            <p>You will be redirected to home page in 10 seconds...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrderSubmit} className='place-order'>
          <div className="order-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <span>1</span>
              <p>Delivery Info</p>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <span>2</span>
              <p>Payment Method</p>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span>3</span>
              <p>Payment Details</p>
            </div>
            <div className={`step ${orderSuccess ? 'active' : ''}`}>
              <span>4</span>
              <p>Confirmation</p>
            </div>
          </div>

          {currentStep === 1 && (
            <div className="place-order-left">
              <p className="title">Delivery Information</p>
              <div className="multi-fields">
                <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name *' />
                <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
              </div>
              <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address *' />
              <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street Address *' />
              <div className="multi-fields">
                <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City *' />
                <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State *' />
              </div>
              <div className="multi-fields">
                <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code *' />
                <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country *' />
              </div>
              <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone Number *' />
              <button type="submit" className="next-step-btn" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Continue to Payment'}
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="payment-methods">
              <p className="title">Select Payment Method</p>
              <div className="method-options">
                <div 
                  className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('upi')}
                >
                  <div className="method-icon">💸</div>
                  <div className="method-info">
                    <h3>UPI Payment</h3>
                    <p>Pay instantly using UPI</p>
                  </div>
                </div>

                <div 
                  className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('card')}
                >
                  <div className="method-icon">💳</div>
                  <div className="method-info">
                    <h3>Credit/Debit Card</h3>
                    <p>Pay using card details</p>
                  </div>
                </div>

                <div 
                  className={`method-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('cod')}
                >
                  <div className="method-icon">💰</div>
                  <div className="method-info">
                    <h3>Cash on Delivery</h3>
                    <p>Pay when you receive the order</p>
                  </div>
                </div>

                <div 
                  className={`method-option ${paymentMethod === 'counter' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('counter')}
                >
                  <div className="method-icon">🏪</div>
                  <div className="method-info">
                    <h3>Pay at Counter</h3>
                    <p>Pay when picking up the order</p>
                  </div>
                </div>
              </div>
              <button 
                type="button" 
                className="back-btn"
                onClick={() => setCurrentStep(1)}
                disabled={isProcessing}
              >
                Back to Delivery Info
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="payment-details">
              <p className="title">Payment Details - {paymentMethod.toUpperCase()}</p>
              
              {paymentMethod === 'upi' && (
                <div className="upi-payment">
                  <div className="payment-section">
                    <h4>Scan QR Code to Pay</h4>
                    <div className="qr-code-container">
                      {qrCodeUrl && (
                        <img 
                          src={qrCodeUrl} 
                          alt="UPI QR Code" 
                          className="qr-code-image"
                        />
                      )}
                      <p className="qr-instructions">Scan this QR code with any UPI app to pay</p>
                      <p className="amount-display">Amount: ₹{getTotalCartAmount() + 2}</p>
                    </div>
                  </div>
                  <div className="payment-section">
                    <h4>OR Enter UPI ID</h4>
                    <input
                      type="text"
                      name="upiId"
                      value={paymentDetails.upiId}
                      onChange={handlePaymentDetailsChange}
                      placeholder="example@upi"
                      required
                      disabled={isProcessing}
                    />
                    <small>Enter your UPI ID (e.g., username@oksbi)</small>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-payment">
                  <div className="payment-section">
                    <h4>Card Details</h4>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentDetailsChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="cardName"
                      value={paymentDetails.cardName}
                      onChange={handlePaymentDetailsChange}
                      placeholder="Name on Card"
                      required
                      disabled={isProcessing}
                    />
                    <div className="card-details-row">
                      <input
                        type="text"
                        name="cardExpiry"
                        value={paymentDetails.cardExpiry}
                        onChange={handlePaymentDetailsChange}
                        placeholder="MM/YY"
                        required
                        disabled={isProcessing}
                      />
                      <input
                        type="text"
                        name="cardCvv"
                        value={paymentDetails.cardCvv}
                        onChange={handlePaymentDetailsChange}
                        placeholder="CVV"
                        required
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="test-card-info">
                      <strong>Test Card:</strong> 4242 4242 4242 4242 | Exp: 12/34 | CVV: 123
                    </div>
                  </div>
                </div>
              )}

              {(paymentMethod === 'cod' || paymentMethod === 'counter') && (
                <div className="offline-payment">
                  <div className="payment-section">
                    <h4>Payment on {paymentMethod === 'cod' ? 'Delivery' : 'Pickup'}</h4>
                    <div className="payment-summary">
                      <p><strong>Total Amount:</strong> ₹{getTotalCartAmount() + 2}</p>
                      <p>You will pay when you {paymentMethod === 'cod' ? 'receive' : 'pick up'} the order.</p>
                    </div>
                    <div className="payment-note">
                      <strong>Note:</strong> Please keep exact change ready. {paymentMethod === 'cod' ? 'Delivery executive may not have change.' : 'Counter staff may not have change.'}
                    </div>
                  </div>
                </div>
              )}

              <div className="payment-actions">
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setCurrentStep(2)}
                  disabled={isProcessing}
                >
                  Back to Payment Methods
                </button>
                <button type="submit" className="pay-now-btn" disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : paymentMethod === 'cod' || paymentMethod === 'counter' ? 'Place Order' : 'Complete Payment'}
                </button>
              </div>
            </div>
          )}

          <div className="place-order-right">
            <div className="cart-total">
              <h2>Order Summary</h2>
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
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default PlaceOrder