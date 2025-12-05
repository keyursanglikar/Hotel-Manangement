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






// // frontend/src/pages/PlaceOrder/PlaceOrder.jsx
// import React, { useContext, useEffect, useState, useRef } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../components/context/StoreContext'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

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
//   const [generatingPDF, setGeneratingPDF] = useState(false)
//   const [paymentCompleted, setPaymentCompleted] = useState(false)
//   const receiptRef = useRef(null)

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

//   // Generate QR Code URL (using external API)
//   useEffect(() => {
//     if (paymentMethod === 'upi' && getTotalCartAmount() > 0) {
//       const totalAmount = getTotalCartAmount() + 2
//       const qrData = `upi://pay?pa=restaurant@upi&pn=Restaurant&am=${totalAmount}&cu=INR&tn=Food Order`
//       setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`)
//     }
//   }, [paymentMethod, getTotalCartAmount])

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method)
//     setCurrentStep(3)
//   }

//   const handlePaymentDetailsChange = (e) => {
//     const { name, value } = e.target
//     let formattedValue = value
    
//     // Format card number with spaces
//     if (name === 'cardNumber') {
//       formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
//     }
//     // Format expiry date
//     else if (name === 'cardExpiry') {
//       formattedValue = value
//         .replace(/\D/g, '')
//         .replace(/(\d{2})(\d{0,2})/, '$1/$2')
//         .substring(0, 5)
//     }
//     // Format CVV to only accept numbers
//     else if (name === 'cardCvv') {
//       formattedValue = value.replace(/\D/g, '').substring(0, 3)
//     }
    
//     setPaymentDetails(prev => ({ ...prev, [name]: formattedValue }))
//   }

//   const validatePaymentDetails = () => {
//     if (paymentMethod === 'upi') {
//       return true // For dummy payment, always valid
//     } else if (paymentMethod === 'card') {
//       const cardNum = paymentDetails.cardNumber.replace(/\s/g, '')
//       return cardNum.length === 16 ||
//              cardNum === '4242 4242 4242 4242' || // Test card
//              cardNum.length > 10 // For dummy payment
//     } else if (paymentMethod === 'cod' || paymentMethod === 'counter') {
//       return true
//     }
//     return false
//   }

//   // DUMMY PAYMENT FUNCTION - Always successful
//   const processDummyPayment = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Simulate payment processing
//         const paymentSuccess = true
//         const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
//         const paymentId = `PAY${Date.now()}${Math.floor(Math.random() * 1000)}`
        
//         resolve({
//           success: true,
//           paymentSuccess: paymentSuccess,
//           transactionId: transactionId,
//           paymentId: paymentId
//         })
//       }, 1500)
//     })
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

//         // Process dummy payment (ALWAYS SUCCESSFUL)
//         const paymentResult = await processDummyPayment()
        
//         // Determine payment status
//         const paymentSuccess = paymentResult.paymentSuccess && 
//                               (paymentMethod === 'upi' || paymentMethod === 'card')
//         const paymentStatus = paymentSuccess ? 'paid' : 
//                              paymentMethod === 'counter' ? 'pending' : 
//                              paymentMethod === 'cod' ? 'pending' : 'paid'
        
//         // Generate order IDs
//         const orderId = `ORD-${Date.now()}`
//         const orderNumber = `REST-${Date.now()}`
//         const receiptNumber = `RCP${Math.floor(Math.random() * 1000000)}`

//         // Prepare order data
//         const orderDataToSend = {
//           address: data,
//           items: orderItems,
//           amount: getTotalCartAmount() + 2,
//           subtotal: getTotalCartAmount(),
//           deliveryFee: 2,
//           paymentMethod: paymentMethod || 'cod',
//           paymentStatus: paymentStatus,
//           paymentSuccess: paymentSuccess,
//           transactionId: paymentResult.transactionId || '',
//           paymentId: paymentResult.paymentId || '',
//           orderId: orderId,
//           orderNumber: orderNumber,
//           receiptNumber: receiptNumber,
//           date: new Date().toISOString(),
//           // Add customer details for receipt
//           customer: {
//             name: `${data.firstName} ${data.lastName}`,
//             email: data.email,
//             phone: data.phone,
//             address: `${data.street}, ${data.city}, ${data.state} - ${data.zipcode}, ${data.country}`
//           }
//         }

//         console.log("Order data prepared:", orderDataToSend)

//         // Save order to localStorage for receipt generation
//         localStorage.setItem('lastOrder', JSON.stringify(orderDataToSend))
//         localStorage.setItem('lastOrderItems', JSON.stringify(orderItems))
//         localStorage.setItem('lastOrderTotal', (getTotalCartAmount() + 2).toString())

//         // Save order to backend (optional - for demo we'll just simulate)
//         try {
//           const response = await axios.post(
//             `${url}/api/order/place`,
//             orderDataToSend,
//             { 
//               headers: { 
//                 'Content-Type': 'application/json',
//                 token 
//               } 
//             }
//           )
//           console.log("Backend response:", response.data)
//         } catch (error) {
//           console.log("Backend save failed (continuing anyway for demo):", error.message)
//           // Continue even if backend fails - this is a dummy payment demo
//         }

//         // Set order data and show success
//         setOrderData(orderDataToSend)
//         setOrderSuccess(true)
        
//         // Clear cart after successful order
//         clearCart()
        
//         // Show payment status update for counter payments
//         if (paymentMethod === 'counter') {
//           setShowPaymentStatusUpdate(true)
//         }
        
//         // For UPI/Card payments, mark as completed
//         if (paymentMethod === 'upi' || paymentMethod === 'card') {
//           setPaymentCompleted(true)
//         }
        
//         // Auto-download PDF receipt after 2 seconds
//         setTimeout(() => {
//           if (!generatingPDF) {
//             handleDownloadPDF()
//           }
//         }, 2000)
        
//       } catch (error) {
//         console.error('Order error:', error)
//         alert(`Order placement failed: ${error.message}`)
//       } finally {
//         setIsProcessing(false)
//       }
//     }
//   }

//   const handleCounterPaymentUpdate = async (status) => {
//     try {
//       setIsProcessing(true)
      
//       // Update local state
//       setOrderData(prev => ({
//         ...prev,
//         paymentSuccess: status === 'paid',
//         paymentStatus: status,
//         paymentCompleted: status === 'paid'
//       }))
      
//       setPaymentCompleted(status === 'paid')
//       setShowPaymentStatusUpdate(false)
      
//       // Show success message
//       alert(`Payment marked as ${status === 'paid' ? 'PAID' : 'NOT PAID'}`)
      
//       // If paid, download receipt
//       if (status === 'paid') {
//         setTimeout(() => {
//           handleDownloadPDF()
//         }, 1000)
//       }
      
//     } catch (error) {
//       console.error('Payment update error:', error)
//       alert('Failed to update payment status')
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handlePrint = () => {
//     window.print()
//   }

//   const handleDownloadPDF = async () => {
//     if (!receiptRef.current) {
//       console.log('No receipt ref found, creating fallback...')
//       // Create a temporary receipt element
//       const tempElement = document.createElement('div')
//       tempElement.innerHTML = generateReceiptHTML()
//       document.body.appendChild(tempElement)
      
//       try {
//         const canvas = await html2canvas(tempElement, {
//           scale: 2,
//           useCORS: true,
//           logging: false,
//           backgroundColor: '#ffffff',
//         })
        
//         const imgData = canvas.toDataURL('image/png')
//         const pdf = new jsPDF('p', 'mm', 'a4')
//         const imgWidth = 210
//         const imgHeight = (canvas.height * imgWidth) / canvas.width
        
//         pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
//         pdf.save(`receipt-${orderData?.orderNumber || 'order'}.pdf`)
        
//       } catch (error) {
//         console.error('PDF generation error:', error)
//         alert('Failed to generate PDF. Try the Print option instead.')
//       } finally {
//         document.body.removeChild(tempElement)
//         setGeneratingPDF(false)
//       }
//       return
//     }
    
//     setGeneratingPDF(true)
    
//     try {
//       const canvas = await html2canvas(receiptRef.current, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff',
//       })

//       const imgData = canvas.toDataURL('image/png')
//       const pdf = new jsPDF('p', 'mm', 'a4')
//       const imgWidth = 210
//       const pageHeight = 295
//       const imgHeight = (canvas.height * imgWidth) / canvas.width
//       let heightLeft = imgHeight
//       let position = 0

//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
//       heightLeft -= pageHeight

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight
//         pdf.addPage()
//         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
//         heightLeft -= pageHeight
//       }

//       pdf.save(`receipt-${orderData?.orderNumber || 'order'}.pdf`)
      
//     } catch (error) {
//       console.error('Error generating PDF:', error)
//       alert('Failed to generate PDF. You can use the Print option instead.')
//     } finally {
//       setGeneratingPDF(false)
//     }
//   }

//   const generateReceiptHTML = () => {
//     if (!orderData) return '<div>No order data</div>'
    
//     const formatDate = (dateString) => {
//       try {
//         return new Date(dateString).toLocaleDateString('en-IN', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         })
//       } catch {
//         return new Date().toLocaleDateString('en-IN')
//       }
//     }

//     const subtotalAmount = orderData.subtotal || 0
//     const gst = subtotalAmount * 0.05
//     const total = subtotalAmount + gst + (orderData.deliveryFee || 2)

//     return `
//       <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: white;">
//         <!-- Header -->
//         <div style="text-align: center; border-bottom: 3px solid #dc2626; padding-bottom: 20px; margin-bottom: 30px;">
//           <h1 style="color: #dc2626; margin: 0; font-size: 32px;">🍽️ RESTAURANT RECEIPT</h1>
//           <p style="color: #666; margin: 5px 0;">123 Food Street, City, Country - 400001</p>
//           <p style="color: #666; margin: 5px 0;">Phone: +91 9876543210 | Email: orders@restaurant.com</p>
//           <p style="color: #666; margin: 5px 0;">GSTIN: 27ABCDE1234F1Z5</p>
//         </div>
        
//         <!-- Customer & Order Info -->
//         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
//           <div>
//             <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Customer Details</h2>
//             <p><strong>Name:</strong> ${orderData.customer?.name || `${data.firstName} ${data.lastName}`}</p>
//             <p><strong>Email:</strong> ${orderData.customer?.email || data.email}</p>
//             <p><strong>Phone:</strong> ${orderData.customer?.phone || data.phone}</p>
//             <p><strong>Address:</strong> ${orderData.customer?.address || `${data.street}, ${data.city}`}</p>
//           </div>
          
//           <div>
//             <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Details</h2>
//             <p><strong>Order No:</strong> ${orderData.orderNumber}</p>
//             <p><strong>Receipt No:</strong> ${orderData.receiptNumber}</p>
//             <p><strong>Date:</strong> ${formatDate(orderData.date)}</p>
//             <p><strong>Payment Method:</strong> ${orderData.paymentMethod?.toUpperCase()}</p>
//             <p><strong>Status:</strong> 
//               <span style="background: ${orderData.paymentSuccess ? '#10b981' : '#f59e0b'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
//                 ${orderData.paymentSuccess ? 'PAID' : orderData.paymentStatus?.toUpperCase() || 'PENDING'}
//               </span>
//             </p>
//           </div>
//         </div>
        
//         <!-- Order Items -->
//         <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Summary</h2>
//         <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
//           <thead>
//             <tr style="background: #f8fafc;">
//               <th style="text-align: left; padding: 12px; border: 1px solid #e5e7eb;">Item</th>
//               <th style="text-align: center; padding: 12px; border: 1px solid #e5e7eb;">Qty</th>
//               <th style="text-align: right; padding: 12px; border: 1px solid #e5e7eb;">Price</th>
//               <th style="text-align: right; padding: 12px; border: 1px solid #e5e7eb;">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${orderData.items?.map(item => `
//               <tr>
//                 <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.name}</td>
//                 <td style="text-align: center; padding: 12px; border: 1px solid #e5e7eb;">${item.quantity}</td>
//                 <td style="text-align: right; padding: 12px; border: 1px solid #e5e7eb;">₹${item.price}</td>
//                 <td style="text-align: right; padding: 12px; border: 1px solid #e5e7eb;">₹${item.price * item.quantity}</td>
//               </tr>
//             `).join('') || '<tr><td colspan="4" style="text-align: center; padding: 20px;">No items found</td></tr>'}
//           </tbody>
//         </table>
        
//         <!-- Totals -->
//         <div style="text-align: right; margin-top: 30px;">
//           <div style="display: inline-block; text-align: left;">
//             <p style="margin: 8px 0;"><strong>Subtotal:</strong> ₹${subtotalAmount}</p>
//             <p style="margin: 8px 0;"><strong>GST (5%):</strong> ₹${gst.toFixed(2)}</p>
//             <p style="margin: 8px 0;"><strong>Delivery Fee:</strong> ₹${orderData.deliveryFee || 2}</p>
//             <hr style="border: none; border-top: 2px solid #374151; margin: 15px 0;">
//             <h3 style="margin: 10px 0; color: #dc2626; font-size: 24px;">Total: ₹${total.toFixed(2)}</h3>
//           </div>
//         </div>
        
//         <!-- Footer -->
//         <div style="text-align: center; margin-top: 50px; padding-top: 20px; border-top: 3px solid #dc2626;">
//           <p style="color: #374151; font-size: 18px;"><strong>Thank you for your order!</strong></p>
//           <p style="color: #666;">For any queries, contact: support@restaurant.com | +91 9876543210</p>
//           <p style="color: #666; font-size: 14px;">This is a computer generated receipt</p>
//         </div>
//       </div>
//     `
//   }

//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!token) {
//       navigate('/cart')
//     } else if (getTotalCartAmount() === 0 && !orderSuccess) {
//       navigate('/cart')
//     }
//   }, [token, getTotalCartAmount, navigate, orderSuccess])

//   // Add print styles
//   useEffect(() => {
//     const style = document.createElement('style')
//     style.innerHTML = `
//       @media print {
//         body * {
//           visibility: hidden;
//         }
//         .receipt-container, .receipt-container * {
//           visibility: visible;
//         }
//         .receipt-container {
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 100%;
//           padding: 20px;
//           background: white;
//         }
//         .no-print {
//           display: none !important;
//         }
//         @page {
//           margin: 20mm;
//         }
//       }
//     `
//     document.head.appendChild(style)

//     return () => {
//       document.head.removeChild(style)
//     }
//   }, [])

//   // Auto-redirect after 30 seconds
//   useEffect(() => {
//     if (orderSuccess) {
//       const timer = setTimeout(() => {
//         navigate('/')
//       }, 30000)
//       return () => clearTimeout(timer)
//     }
//   }, [orderSuccess, navigate])

//   if (orderSuccess) {
//     return (
//       <div className="place-order-container" style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '20px' }}>
//         {/* Success Message Section */}
//         <div className="success-message-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
//           <div style={{ fontSize: '80px', color: '#10B981', marginBottom: '20px' }}>✅</div>
//           <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F2937', marginBottom: '10px' }}>
//             {paymentCompleted || orderData?.paymentSuccess ? 'Payment Successful!' : 'Order Placed Successfully!'}
//           </h1>
//           <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '30px' }}>
//             {paymentCompleted || orderData?.paymentSuccess 
//               ? 'Your payment has been processed successfully. Receipt is downloading...' 
//               : 'Your order has been confirmed. Please complete the payment.'}
//           </p>
          
//           <div style={{ 
//             backgroundColor: paymentCompleted || orderData?.paymentSuccess ? '#D1FAE5' : '#FEF3C7', 
//             padding: '20px', 
//             borderRadius: '12px', 
//             display: 'inline-block',
//             maxWidth: '600px',
//             margin: '0 auto'
//           }}>
//             <p style={{ 
//               color: paymentCompleted || orderData?.paymentSuccess ? '#065F46' : '#92400E', 
//               fontWeight: '600', 
//               fontSize: '20px',
//               marginBottom: '10px'
//             }}>
//               Order Number: {orderData?.orderNumber}
//             </p>
//             <p style={{ 
//               color: paymentCompleted || orderData?.paymentSuccess ? '#047857' : '#B45309',
//               fontSize: '16px' 
//             }}>
//               {orderData?.paymentMethod === 'counter' 
//                 ? 'Please complete payment at the counter to receive your order.' 
//                 : orderData?.paymentMethod === 'cod'
//                 ? 'Please keep cash ready for delivery.'
//                 : 'Your order will be prepared and delivered soon.'}
//             </p>
//           </div>
//         </div>

//         {/* Counter Payment Update Section */}
//         {showPaymentStatusUpdate && !paymentCompleted && (
//           <div style={{ 
//             backgroundColor: '#FEF3C7', 
//             padding: '25px', 
//             borderRadius: '12px', 
//             marginBottom: '30px',
//             maxWidth: '600px',
//             margin: '0 auto 30px',
//             border: '2px solid #F59E0B'
//           }}>
//             <h3 style={{ color: '#92400E', fontSize: '22px', marginBottom: '15px', textAlign: 'center' }}>
//               Update Counter Payment Status
//             </h3>
//             <p style={{ color: '#92400E', marginBottom: '20px', textAlign: 'center', fontSize: '16px' }}>
//               Have you completed the payment at the counter?
//             </p>
//             <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
//               <button 
//                 onClick={() => handleCounterPaymentUpdate('paid')}
//                 style={{
//                   backgroundColor: '#10B981',
//                   color: 'white',
//                   border: 'none',
//                   padding: '12px 30px',
//                   borderRadius: '8px',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   cursor: isProcessing ? 'not-allowed' : 'pointer',
//                   opacity: isProcessing ? 0.7 : 1,
//                   minWidth: '180px'
//                 }}
//                 disabled={isProcessing}
//               >
//                 ✅ Payment Done
//               </button>
//               <button 
//                 onClick={() => handleCounterPaymentUpdate('not_paid')}
//                 style={{
//                   backgroundColor: '#EF4444',
//                   color: 'white',
//                   border: 'none',
//                   padding: '12px 30px',
//                   borderRadius: '8px',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   cursor: isProcessing ? 'not-allowed' : 'pointer',
//                   opacity: isProcessing ? 0.7 : 1,
//                   minWidth: '180px'
//                 }}
//                 disabled={isProcessing}
//               >
//                 ❌ Payment Pending
//               </button>
//             </div>
//             <p style={{ 
//               color: '#92400E', 
//               marginTop: '15px', 
//               textAlign: 'center', 
//               fontSize: '14px',
//               fontStyle: 'italic'
//             }}>
//               Click "Payment Done" after completing payment at the counter to download receipt.
//             </p>
//           </div>
//         )}

//         {/* Receipt Preview */}
//         <div ref={receiptRef} className="receipt-container" style={{ 
//           backgroundColor: 'white', 
//           padding: '30px', 
//           maxWidth: '800px', 
//           margin: '0 auto 40px', 
//           borderRadius: '12px', 
//           boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
//           border: '1px solid #e5e7eb'
//         }}>
//           {/* Header */}
//           <div style={{ textAlign: 'center', borderBottom: '3px solid #dc2626', paddingBottom: '20px', marginBottom: '30px' }}>
//             <h1 style={{ color: '#dc2626', margin: 0, fontSize: '32px', fontWeight: 'bold' }}>🍽️ RESTAURANT RECEIPT</h1>
//             <p style={{ color: '#666', margin: '8px 0' }}>123 Food Street, City, Country - 400001</p>
//             <p style={{ color: '#666', margin: '8px 0' }}>Phone: +91 9876543210 | Email: orders@restaurant.com</p>
//             <p style={{ color: '#666', margin: '8px 0' }}>GSTIN: 27ABCDE1234F1Z5</p>
//           </div>
          
//           {/* Order & Customer Info */}
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
//             <div>
//               <h2 style={{ color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', fontSize: '20px' }}>
//                 Customer Details
//               </h2>
//               <div style={{ marginTop: '15px' }}>
//                 <p style={{ margin: '10px 0' }}><strong>Name:</strong> {orderData?.customer?.name || `${data.firstName} ${data.lastName}`}</p>
//                 <p style={{ margin: '10px 0' }}><strong>Email:</strong> {orderData?.customer?.email || data.email}</p>
//                 <p style={{ margin: '10px 0' }}><strong>Phone:</strong> {orderData?.customer?.phone || data.phone}</p>
//                 <p style={{ margin: '10px 0' }}><strong>Address:</strong> {orderData?.customer?.address || `${data.street}, ${data.city}, ${data.state}`}</p>
//               </div>
//             </div>
            
//             <div>
//               <h2 style={{ color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', fontSize: '20px' }}>
//                 Order Details
//               </h2>
//               <div style={{ marginTop: '15px' }}>
//                 <p style={{ margin: '10px 0' }}><strong>Order No:</strong> {orderData?.orderNumber}</p>
//                 <p style={{ margin: '10px 0' }}><strong>Receipt No:</strong> {orderData?.receiptNumber}</p>
//                 <p style={{ margin: '10px 0' }}><strong>Date:</strong> {new Date(orderData?.date).toLocaleDateString('en-IN', {
//                   year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
//                 })}</p>
//                 <p style={{ margin: '10px 0' }}><strong>Payment Method:</strong> {orderData?.paymentMethod?.toUpperCase()}</p>
//                 <p style={{ margin: '10px 0' }}><strong>Status:</strong> 
//                   <span style={{
//                     backgroundColor: orderData?.paymentSuccess ? '#10b981' : orderData?.paymentStatus === 'pending' ? '#f59e0b' : '#ef4444',
//                     color: 'white',
//                     padding: '4px 12px',
//                     borderRadius: '20px',
//                     fontSize: '14px',
//                     marginLeft: '10px',
//                     fontWeight: '600'
//                   }}>
//                     {orderData?.paymentSuccess ? 'PAID' : orderData?.paymentStatus?.toUpperCase() || 'PENDING'}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {/* Order Items */}
//           <h2 style={{ color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', fontSize: '20px' }}>
//             Order Summary
//           </h2>
//           <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
//             <thead>
//               <tr style={{ backgroundColor: '#f8fafc' }}>
//                 <th style={{ textAlign: 'left', padding: '15px', border: '1px solid #e5e7eb', fontWeight: '600' }}>Item</th>
//                 <th style={{ textAlign: 'center', padding: '15px', border: '1px solid #e5e7eb', fontWeight: '600' }}>Qty</th>
//                 <th style={{ textAlign: 'right', padding: '15px', border: '1px solid #e5e7eb', fontWeight: '600' }}>Price</th>
//                 <th style={{ textAlign: 'right', padding: '15px', border: '1px solid #e5e7eb', fontWeight: '600' }}>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderData?.items?.map((item, index) => (
//                 <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
//                   <td style={{ padding: '15px', border: '1px solid #e5e7eb' }}>{item.name}</td>
//                   <td style={{ textAlign: 'center', padding: '15px', border: '1px solid #e5e7eb' }}>{item.quantity}</td>
//                   <td style={{ textAlign: 'right', padding: '15px', border: '1px solid #e5e7eb' }}>₹{item.price}</td>
//                   <td style={{ textAlign: 'right', padding: '15px', border: '1px solid #e5e7eb' }}>₹{item.price * item.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           {/* Totals */}
//           <div style={{ textAlign: 'right', marginTop: '30px' }}>
//             <div style={{ display: 'inline-block', textAlign: 'left', minWidth: '300px' }}>
//               <p style={{ margin: '12px 0', fontSize: '16px' }}><strong>Subtotal:</strong> ₹{orderData?.subtotal || 0}</p>
//               <p style={{ margin: '12px 0', fontSize: '16px' }}><strong>GST (5%):</strong> ₹{((orderData?.subtotal || 0) * 0.05).toFixed(2)}</p>
//               <p style={{ margin: '12px 0', fontSize: '16px' }}><strong>Delivery Fee:</strong> ₹{orderData?.deliveryFee || 2}</p>
//               <hr style={{ border: 'none', borderTop: '2px solid #374151', margin: '20px 0' }} />
//               <h3 style={{ margin: '15px 0', color: '#dc2626', fontSize: '28px', fontWeight: 'bold' }}>
//                 Total: ₹{((orderData?.amount || 0) + ((orderData?.subtotal || 0) * 0.05)).toFixed(2)}
//               </h3>
//             </div>
//           </div>
          
//           {/* Footer */}
//           <div style={{ textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '3px solid #dc2626' }}>
//             <p style={{ color: '#374151', fontSize: '20px', fontWeight: '600' }}>Thank you for your order!</p>
//             <p style={{ color: '#666', margin: '10px 0' }}>For any queries, contact: support@restaurant.com | +91 9876543210</p>
//             <p style={{ color: '#666', fontSize: '14px', fontStyle: 'italic' }}>This is a computer generated receipt</p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div style={{ 
//           display: 'flex', 
//           gap: '20px', 
//           justifyContent: 'center', 
//           flexWrap: 'wrap',
//           marginTop: '40px'
//         }}>
//           <button
//             onClick={() => navigate('/')}
//             style={{
//               backgroundColor: '#DC2626',
//               color: 'white',
//               border: 'none',
//               padding: '14px 35px',
//               borderRadius: '50px',
//               fontWeight: '600',
//               fontSize: '16px',
//               cursor: 'pointer',
//               boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
//               transition: 'all 0.3s',
//               minWidth: '200px'
//             }}
//             onMouseOver={(e) => e.target.style.backgroundColor = '#B91C1C'}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#DC2626'}
//           >
//             Continue Shopping
//           </button>
          
//           <button
//             onClick={handlePrint}
//             style={{
//               backgroundColor: 'white',
//               color: '#DC2626',
//               border: '2px solid #DC2626',
//               padding: '14px 35px',
//               borderRadius: '50px',
//               fontWeight: '600',
//               fontSize: '16px',
//               cursor: 'pointer',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//               transition: 'all 0.3s',
//               minWidth: '200px'
//             }}
//             onMouseOver={(e) => {
//               e.target.style.backgroundColor = '#DC2626'
//               e.target.style.color = 'white'
//             }}
//             onMouseOut={(e) => {
//               e.target.style.backgroundColor = 'white'
//               e.target.style.color = '#DC2626'
//             }}
//           >
//             Print Receipt
//           </button>
          
//           <button
//             onClick={handleDownloadPDF}
//             disabled={generatingPDF}
//             style={{
//               backgroundColor: generatingPDF ? '#9CA3AF' : '#10B981',
//               color: 'white',
//               border: 'none',
//               padding: '14px 35px',
//               borderRadius: '50px',
//               fontWeight: '600',
//               fontSize: '16px',
//               cursor: generatingPDF ? 'not-allowed' : 'pointer',
//               boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//               transition: 'all 0.3s',
//               minWidth: '200px',
//               opacity: generatingPDF ? 0.7 : 1
//             }}
//             onMouseOver={(e) => {
//               if (!generatingPDF) e.target.style.backgroundColor = '#059669'
//             }}
//             onMouseOut={(e) => {
//               if (!generatingPDF) e.target.style.backgroundColor = '#10B981'
//             }}
//           >
//             {generatingPDF ? 'Generating PDF...' : 'Download PDF Again'}
//           </button>
//         </div>

//         {/* Instructions */}
//         <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#6B7280' }}>
//           <p style={{ marginBottom: '8px' }}>• Click "Print Receipt" and choose "Save as PDF" to save your receipt</p>
//           <p style={{ marginBottom: '8px' }}>• Click "Download PDF" for direct PDF download</p>
//           <p>• Keep this receipt for order tracking and reference</p>
//         </div>

//         {/* Auto-redirect notice */}
//         <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '13px', color: '#9CA3AF' }}>
//           <p>You will be redirected to the home page in 30 seconds...</p>
//           <p style={{ marginTop: '5px', fontSize: '12px' }}>(Click "Continue Shopping" to go now)</p>
//         </div>
//       </div>
//     )
//   }

//   // Normal order placement form (before success)
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

//       <form onSubmit={handlePlaceOrderSubmit} className='place-order'>
//         {currentStep === 1 && (
//           <div className="place-order-left">
//             <p className="title">Delivery Information</p>
//             <div className="multi-fields">
//               <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name *' />
//               <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
//             </div>
//             <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address *' />
//             <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street Address *' />
//             <div className="multi-fields">
//               <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City *' />
//               <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State *' />
//             </div>
//             <div className="multi-fields">
//               <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code *' />
//               <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country *' />
//             </div>
//             <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone Number *' />
//             <button type="submit" className="next-step-btn" disabled={isProcessing}>
//               {isProcessing ? 'Processing...' : 'Continue to Payment'}
//             </button>
//           </div>
//         )}

//         {currentStep === 2 && (
//           <div className="payment-methods">
//             <p className="title">Select Payment Method</p>
//             <div className="method-options">
//               <div 
//                 className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
//                 onClick={() => handlePaymentMethodChange('upi')}
//               >
//                 <div className="method-icon">💸</div>
//                 <div className="method-info">
//                   <h3>UPI Payment</h3>
//                   <p>Pay instantly using UPI (Dummy Payment)</p>
//                 </div>
//               </div>

//               <div 
//                 className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
//                 onClick={() => handlePaymentMethodChange('card')}
//               >
//                 <div className="method-icon">💳</div>
//                 <div className="method-info">
//                   <h3>Credit/Debit Card</h3>
//                   <p>Pay using card (Dummy Payment)</p>
//                 </div>
//               </div>

//               <div 
//                 className={`method-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
//                 onClick={() => handlePaymentMethodChange('cod')}
//               >
//                 <div className="method-icon">💰</div>
//                 <div className="method-info">
//                   <h3>Cash on Delivery</h3>
//                   <p>Pay when you receive the order</p>
//                 </div>
//               </div>

//               <div 
//                 className={`method-option ${paymentMethod === 'counter' ? 'selected' : ''}`}
//                 onClick={() => handlePaymentMethodChange('counter')}
//               >
//                 <div className="method-icon">🏪</div>
//                 <div className="method-info">
//                   <h3>Pay at Counter</h3>
//                   <p>Pay when picking up the order</p>
//                 </div>
//               </div>
//             </div>
//             <div style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' }}>
//               <p><strong>Note:</strong> UPI and Card payments are simulated and will always succeed for demo purposes.</p>
//             </div>
//             <button 
//               type="button" 
//               className="back-btn"
//               onClick={() => setCurrentStep(1)}
//               disabled={isProcessing}
//             >
//               Back to Delivery Info
//             </button>
//           </div>
//         )}

//         {currentStep === 3 && (
//           <div className="payment-details">
//             <p className="title">Payment Details - {paymentMethod.toUpperCase()}</p>
//             <div style={{ 
//               backgroundColor: '#F0F9FF', 
//               padding: '15px', 
//               borderRadius: '8px', 
//               marginBottom: '20px',
//               border: '1px solid #BAE6FD'
//             }}>
//               <p style={{ color: '#0369A1', margin: 0, fontSize: '14px' }}>
//                 <strong>Demo Mode:</strong> All payments are simulated and will succeed. No real payment is processed.
//               </p>
//             </div>
            
//             {paymentMethod === 'upi' && (
//               <div className="upi-payment">
//                 <div className="payment-section">
//                   <h4>UPI Payment (Dummy)</h4>
//                   <div className="qr-code-container">
//                     {qrCodeUrl && (
//                       <img 
//                         src={qrCodeUrl} 
//                         alt="UPI QR Code" 
//                         className="qr-code-image"
//                         onError={(e) => {
//                           e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=demo@upi&pn=Restaurant&am=100&cu=INR&tn=Dummy+Payment'
//                         }}
//                       />
//                     )}
//                     <p className="qr-instructions">Scan this QR code or use UPI ID: demo@upi</p>
//                     <p className="amount-display">Amount: ₹{getTotalCartAmount() + 2}</p>
//                     <div style={{ 
//                       backgroundColor: '#D1FAE5', 
//                       padding: '10px', 
//                       borderRadius: '6px', 
//                       marginTop: '15px',
//                       border: '1px solid #A7F3D0'
//                     }}>
//                       <p style={{ color: '#065F46', margin: 0, fontSize: '13px' }}>
//                         <strong>Demo:</strong> Click "Complete Payment" to simulate successful UPI payment
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="payment-section">
//                   <h4>Enter UPI ID (Optional for Demo)</h4>
//                   <input
//                     type="text"
//                     name="upiId"
//                     value={paymentDetails.upiId}
//                     onChange={handlePaymentDetailsChange}
//                     placeholder="demo@upi"
//                     disabled={isProcessing}
//                   />
//                   <small>Enter any UPI ID (e.g., demo@oksbi) - not validated in demo</small>
//                 </div>
//               </div>
//             )}

//             {paymentMethod === 'card' && (
//               <div className="card-payment">
//                 <div className="payment-section">
//                   <h4>Card Payment (Dummy)</h4>
//                   <input
//                     type="text"
//                     name="cardNumber"
//                     value={paymentDetails.cardNumber}
//                     onChange={handlePaymentDetailsChange}
//                     placeholder="4242 4242 4242 4242"
//                     disabled={isProcessing}
//                   />
//                   <input
//                     type="text"
//                     name="cardName"
//                     value={paymentDetails.cardName}
//                     onChange={handlePaymentDetailsChange}
//                     placeholder="John Doe"
//                     disabled={isProcessing}
//                   />
//                   <div className="card-details-row">
//                     <input
//                       type="text"
//                       name="cardExpiry"
//                       value={paymentDetails.cardExpiry}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="12/34"
//                       disabled={isProcessing}
//                     />
//                     <input
//                       type="text"
//                       name="cardCvv"
//                       value={paymentDetails.cardCvv}
//                       onChange={handlePaymentDetailsChange}
//                       placeholder="123"
//                       disabled={isProcessing}
//                     />
//                   </div>
//                   <div className="test-card-info" style={{ backgroundColor: '#FEF3C7', padding: '10px', borderRadius: '6px' }}>
//                     <strong>Demo Card Details:</strong> 4242 4242 4242 4242 | Exp: 12/34 | CVV: 123
//                   </div>
//                   <div style={{ 
//                     backgroundColor: '#D1FAE5', 
//                     padding: '10px', 
//                     borderRadius: '6px', 
//                     marginTop: '15px',
//                     border: '1px solid #A7F3D0'
//                   }}>
//                     <p style={{ color: '#065F46', margin: 0, fontSize: '13px' }}>
//                       <strong>Demo:</strong> Any card details will work. Click "Complete Payment" to simulate success.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {(paymentMethod === 'cod' || paymentMethod === 'counter') && (
//               <div className="offline-payment">
//                 <div className="payment-section">
//                   <h4>Payment on {paymentMethod === 'cod' ? 'Delivery' : 'Pickup'}</h4>
//                   <div className="payment-summary">
//                     <p><strong>Total Amount:</strong> ₹{getTotalCartAmount() + 2}</p>
//                     <p>You will pay when you {paymentMethod === 'cod' ? 'receive' : 'pick up'} the order.</p>
//                   </div>
//                   <div className="payment-note" style={{ backgroundColor: '#FEF3C7', padding: '10px', borderRadius: '6px' }}>
//                     <strong>Note:</strong> Please keep exact change ready. {paymentMethod === 'cod' ? 'Delivery executive may not have change.' : 'Counter staff may not have change.'}
//                   </div>
//                   {paymentMethod === 'counter' && (
//                     <div style={{ 
//                       backgroundColor: '#F0F9FF', 
//                       padding: '10px', 
//                       borderRadius: '6px', 
//                       marginTop: '15px',
//                       border: '1px solid #BAE6FD'
//                     }}>
//                       <p style={{ color: '#0369A1', margin: 0, fontSize: '13px' }}>
//                         <strong>After placing order:</strong> You'll be able to mark payment as done/not done on the success page.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             <div className="payment-actions">
//               <button 
//                 type="button" 
//                 className="back-btn"
//                 onClick={() => setCurrentStep(2)}
//                 disabled={isProcessing}
//               >
//                 Back to Payment Methods
//               </button>
//               <button type="submit" className="pay-now-btn" disabled={isProcessing}>
//                 {isProcessing ? 'Processing...' : 
//                  paymentMethod === 'cod' || paymentMethod === 'counter' ? 'Place Order' : 'Complete Payment (Demo)'}
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="place-order-right">
//           <div className="cart-total">
//             <h2>Order Summary</h2>
//             <div>
//               <div className="cart-total-detail">
//                 <p>Subtotal</p>
//                 <p>₹{getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cart-total-detail">
//                 <p>Delivery Fee</p>
//                 <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
//               </div>
//               <hr />
//               <div className="cart-total-detail">
//                 <b>Total</b>
//                 <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
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
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [showUpdateOptions, setShowUpdateOptions] = useState(false)
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

  // Generate QR Code URL
  useEffect(() => {
    if (paymentMethod === 'upi' && getTotalCartAmount() > 0) {
      const totalAmount = getTotalCartAmount() + 2
      const qrData = `upi://pay?pa=restaurant@upi&pn=Restaurant&am=${totalAmount}&cu=INR&tn=Food Order`
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`)
    }
  }, [paymentMethod, getTotalCartAmount])

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    setCurrentStep(3)
  }

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value
    
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }
    else if (name === 'cardExpiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substring(0, 5)
    }
    else if (name === 'cardCvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3)
    }
    
    setPaymentDetails(prev => ({ ...prev, [name]: formattedValue }))
  }

  const processDummyPayment = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
        const paymentId = `PAY${Date.now()}${Math.floor(Math.random() * 1000)}`
        
        resolve({
          success: true,
          paymentSuccess: true, // Always successful for demo
          transactionId: transactionId,
          paymentId: paymentId
        })
      }, 1500)
    })
  }

  const handlePlaceOrderSubmit = async (event) => {
    event.preventDefault()
    
    if (currentStep === 1) {
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

        // Process dummy payment
        const paymentResult = await processDummyPayment()
        
        // For demo, all payments start as pending except UPI/Card
        const initialPaymentStatus = 
          paymentMethod === 'upi' || paymentMethod === 'card' ? 'paid' : 'pending'
        
        // Generate order IDs
        const orderId = `ORD-${Date.now()}`
        const orderNumber = `REST-${Date.now()}`
        const receiptNumber = `RCP${Math.floor(Math.random() * 1000000)}`

        // Prepare order data
        const orderDataToSend = {
          address: data,
          items: orderItems,
          amount: getTotalCartAmount() + 2,
          subtotal: getTotalCartAmount(),
          deliveryFee: 2,
          paymentMethod: paymentMethod || 'cod',
          paymentStatus: initialPaymentStatus,
          paymentSuccess: initialPaymentStatus === 'paid',
          transactionId: paymentResult.transactionId || '',
          paymentId: paymentResult.paymentId || '',
          orderId: orderId,
          orderNumber: orderNumber,
          receiptNumber: receiptNumber,
          date: new Date().toISOString(),
          customer: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: `${data.street}, ${data.city}, ${data.state} - ${data.zipcode}, ${data.country}`
          }
        }

        // Save to localStorage
        localStorage.setItem('lastOrder', JSON.stringify(orderDataToSend))
        localStorage.setItem('lastOrderItems', JSON.stringify(orderItems))
        localStorage.setItem('lastOrderTotal', (getTotalCartAmount() + 2).toString())

        // Save to backend
        try {
          await axios.post(
            `${url}/api/order/place`,
            orderDataToSend,
            { 
              headers: { 
                'Content-Type': 'application/json',
                token 
              } 
            }
          )
        } catch (error) {
          console.log("Backend save failed:", error.message)
        }

        // Update state
        setOrderData(orderDataToSend)
        setOrderSuccess(true)
        setPaymentCompleted(initialPaymentStatus === 'paid')
        
        // Clear cart
        clearCart()
        
        // Show payment update options for COD and Counter
        if (paymentMethod === 'cod' || paymentMethod === 'counter') {
          setShowPaymentStatusUpdate(true)
        }
        
        // Auto-download PDF for paid orders
        if (initialPaymentStatus === 'paid') {
          setTimeout(() => {
            handleDownloadPDF()
          }, 2000)
        }
        
      } catch (error) {
        console.error('Order error:', error)
        alert(`Order placement failed: ${error.message}`)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const updatePaymentStatus = async (status) => {
    try {
      setIsProcessing(true)
      
      const newStatus = status
      const isPaid = newStatus === 'paid'
      
      // Update local state
      setOrderData(prev => ({
        ...prev,
        paymentSuccess: isPaid,
        paymentStatus: newStatus,
        paymentCompleted: isPaid
      }))
      
      setPaymentCompleted(isPaid)
      setShowPaymentStatusUpdate(false)
      
      // Update in backend
      try {
        await axios.post(
          `${url}/api/order/update-payment`,
          {
            orderId: orderData.orderId,
            paymentStatus: newStatus
          },
          { 
            headers: { 
              'Content-Type': 'application/json',
              token 
            } 
          }
        )
      } catch (error) {
        console.log("Backend update failed:", error.message)
      }
      
      // Show success message
      alert(`Payment status updated to: ${isPaid ? 'PAID' : 'NOT PAID'}`)
      
      // If paid, download receipt
      if (isPaid) {
        setTimeout(() => {
          handleDownloadPDF()
        }, 1000)
      }
      
    } catch (error) {
      console.error('Payment update error:', error)
      alert('Failed to update payment status')
    } finally {
      setIsProcessing(false)
    }
  }

  const togglePaymentUpdateOptions = () => {
    setShowUpdateOptions(!showUpdateOptions)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true)
    
    try {
      // Create receipt element
      const receiptElement = document.createElement('div')
      receiptElement.innerHTML = generateReceiptHTML()
      receiptElement.style.position = 'absolute'
      receiptElement.style.left = '-9999px'
      document.body.appendChild(receiptElement)
      
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`receipt-${orderData?.orderNumber || 'order'}.pdf`)
      
      document.body.removeChild(receiptElement)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Try the Print option instead.')
    } finally {
      setGeneratingPDF(false)
    }
  }

  const generateReceiptHTML = () => {
    if (!orderData) return '<div>No order data</div>'
    
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

    const subtotalAmount = orderData.subtotal || 0
    const gst = subtotalAmount * 0.05
    const total = subtotalAmount + gst + (orderData.deliveryFee || 2)

    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: white;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 3px solid #dc2626; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 32px;">🍽️ RESTAURANT RECEIPT</h1>
          <p style="color: #666; margin: 5px 0;">123 Food Street, City, Country - 400001</p>
          <p style="color: #666; margin: 5px 0;">Phone: +91 9876543210 | Email: orders@restaurant.com</p>
          <p style="color: #666; margin: 5px 0;">GSTIN: 27ABCDE1234F1Z5</p>
        </div>
        
        <!-- Customer & Order Info -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div>
            <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Customer Details</h2>
            <p><strong>Name:</strong> ${orderData.customer?.name}</p>
            <p><strong>Email:</strong> ${orderData.customer?.email}</p>
            <p><strong>Phone:</strong> ${orderData.customer?.phone}</p>
            <p><strong>Address:</strong> ${orderData.customer?.address}</p>
          </div>
          
          <div>
            <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Details</h2>
            <p><strong>Order No:</strong> ${orderData.orderNumber}</p>
            <p><strong>Receipt No:</strong> ${orderData.receiptNumber}</p>
            <p><strong>Date:</strong> ${formatDate(orderData.date)}</p>
            <p><strong>Payment Method:</strong> ${orderData.paymentMethod?.toUpperCase()}</p>
            <p><strong>Status:</strong> 
              <span style="background: ${orderData.paymentSuccess ? '#10b981' : '#f59e0b'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                ${orderData.paymentSuccess ? 'PAID' : orderData.paymentStatus?.toUpperCase()}
              </span>
            </p>
            ${orderData.transactionId ? `<p><strong>Transaction ID:</strong> ${orderData.transactionId}</p>` : ''}
          </div>
        </div>
        
        <!-- Order Items -->
        <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f8fafc;">
              <th style="text-align: left; padding: 12px; border: 1px solid #e5e7eb;">Item</th>
              <th style="text-align: center; padding: 12px; border: 1px solid #e5e7eb;">Qty</th>
              <th style="text-align: right; padding: 12px; border: 1px solid #e5e7eb;">Price</th>
              <th style="text-align: right; padding: 12px; border: 1px solid #e5e7eb;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderData.items?.map(item => `
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.name}</td>
                <td style="text-align: center; padding: 12px; border: 1px solid #e5e7eb;">${item.quantity}</td>
                <td style="text-align: right; padding: 12px; border: 1px solid #e5e7eb;">₹${item.price}</td>
                <td style="text-align: right; padding: 12px; border: 1px solid #e5e7eb;">₹${item.price * item.quantity}</td>
              </tr>
            `).join('') || '<tr><td colspan="4" style="text-align: center; padding: 20px;">No items found</td></tr>'}
          </tbody>
        </table>
        
        <!-- Totals -->
        <div style="text-align: right; margin-top: 30px;">
          <div style="display: inline-block; text-align: left;">
            <p style="margin: 8px 0;"><strong>Subtotal:</strong> ₹${subtotalAmount}</p>
            <p style="margin: 8px 0;"><strong>GST (5%):</strong> ₹${gst.toFixed(2)}</p>
            <p style="margin: 8px 0;"><strong>Delivery Fee:</strong> ₹${orderData.deliveryFee || 2}</p>
            <hr style="border: none; border-top: 2px solid #374151; margin: 15px 0;">
            <h3 style="margin: 10px 0; color: #dc2626; font-size: 24px;">Total: ₹${total.toFixed(2)}</h3>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 50px; padding-top: 20px; border-top: 3px solid #dc2626;">
          <p style="color: #374151; font-size: 18px;"><strong>Thank you for your order!</strong></p>
          <p style="color: #666;">For any queries, contact: support@restaurant.com | +91 9876543210</p>
          <p style="color: #666; font-size: 14px;">This is a computer generated receipt</p>
        </div>
      </div>
    `
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0 && !orderSuccess) {
      navigate('/cart')
    }
  }, [token, getTotalCartAmount, navigate, orderSuccess])

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
          padding: 20px;
          background: white;
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

  // Auto-redirect after 30 seconds
  useEffect(() => {
    if (orderSuccess) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 30000)
      return () => clearTimeout(timer)
    }
  }, [orderSuccess, navigate])

  if (orderSuccess) {
    return (
      <div className="place-order-container" style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '20px' }}>
        {/* Success Message */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '80px', color: paymentCompleted ? '#10B981' : '#F59E0B', marginBottom: '20px' }}>
            {paymentCompleted ? '✅' : '⏳'}
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F2937', marginBottom: '10px' }}>
            {paymentCompleted ? 'Payment Successful!' : 'Order Placed Successfully!'}
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '30px' }}>
            {paymentCompleted 
              ? 'Your payment has been processed successfully. Receipt is downloading...' 
              : 'Your order has been confirmed. Please complete the payment.'}
          </p>
          
          <div style={{ 
            backgroundColor: paymentCompleted ? '#D1FAE5' : '#FEF3C7', 
            padding: '20px', 
            borderRadius: '12px', 
            display: 'inline-block',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <p style={{ 
              color: paymentCompleted ? '#065F46' : '#92400E', 
              fontWeight: '600', 
              fontSize: '20px',
              marginBottom: '10px'
            }}>
              Order Number: {orderData?.orderNumber}
            </p>
            <p style={{ 
              color: paymentCompleted ? '#047857' : '#B45309',
              fontSize: '16px' 
            }}>
              {paymentCompleted 
                ? `Paid via ${orderData?.paymentMethod?.toUpperCase()}`
                : `Payment ${orderData?.paymentStatus?.toUpperCase()} via ${orderData?.paymentMethod?.toUpperCase()}`}
            </p>
          </div>
        </div>

        {/* Payment Status Update Section - For ALL payment methods */}
        <div style={{ 
          backgroundColor: '#F0F9FF', 
          padding: '25px', 
          borderRadius: '12px', 
          marginBottom: '30px',
          maxWidth: '800px',
          margin: '0 auto 30px',
          border: '2px solid #0EA5E9'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#0369A1', fontSize: '22px', margin: 0 }}>
              Payment Status Management
            </h3>
            <button 
              onClick={togglePaymentUpdateOptions}
              style={{
                backgroundColor: '#0EA5E9',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {showUpdateOptions ? 'Hide Options' : 'Update Payment Status'}
            </button>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: paymentCompleted ? '#10B981' : '#E5E7EB', 
                color: 'white',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Current Status: {paymentCompleted ? 'PAID' : 'PENDING'}
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: '#FEF3C7',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                <strong>Payment Method:</strong> {orderData?.paymentMethod?.toUpperCase()}
              </div>
            </div>
          </div>
          
          {/* Payment Update Options (Visible when toggled) */}
          {showUpdateOptions && (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              <h4 style={{ color: '#374151', fontSize: '18px', marginBottom: '15px', textAlign: 'center' }}>
                Update Payment Status
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                {/* Mark as Paid Button */}
                <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => updatePaymentStatus('paid')}
                    style={{
                      backgroundColor: paymentCompleted ? '#9CA3AF' : '#10B981',
                      color: 'white',
                      border: 'none',
                      padding: '15px 20px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '16px',
                      cursor: paymentCompleted ? 'not-allowed' : 'pointer',
                      width: '100%',
                      opacity: paymentCompleted ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                    disabled={paymentCompleted || isProcessing}
                  >
                    <span>✅</span>
                    Mark as PAID
                  </button>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>
                    {paymentCompleted ? 'Already paid' : 'Click if payment completed'}
                  </p>
                </div>
                
                {/* Mark as Pending Button */}
                <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => updatePaymentStatus('pending')}
                    style={{
                      backgroundColor: !paymentCompleted ? '#9CA3AF' : '#F59E0B',
                      color: 'white',
                      border: 'none',
                      padding: '15px 20px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '16px',
                      cursor: !paymentCompleted ? 'not-allowed' : 'pointer',
                      width: '100%',
                      opacity: !paymentCompleted ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                    disabled={!paymentCompleted || isProcessing}
                  >
                    <span>⏳</span>
                    Mark as PENDING
                  </button>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>
                    {!paymentCompleted ? 'Already pending' : 'Click if payment not done'}
                  </p>
                </div>
              </div>
              
              {/* Payment Method Specific Instructions */}
              <div style={{ 
                backgroundColor: '#F3F4F6', 
                padding: '15px', 
                borderRadius: '6px',
                marginTop: '15px'
              }}>
                <p style={{ color: '#374151', margin: '0 0 10px 0', fontWeight: '600' }}>Instructions:</p>
                <ul style={{ color: '#6B7280', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                  {orderData?.paymentMethod === 'counter' && (
                    <li>For counter payment: Mark as PAID after completing payment at counter</li>
                  )}
                  {orderData?.paymentMethod === 'cod' && (
                    <li>For COD: Mark as PAID after delivery person receives cash</li>
                  )}
                  {orderData?.paymentMethod === 'upi' && (
                    <li>For UPI: Usually auto-paid, but you can update status if needed</li>
                  )}
                  {orderData?.paymentMethod === 'card' && (
                    <li>For Card: Usually auto-paid, but you can update status if needed</li>
                  )}
                  <li>Updating to PAID will auto-download receipt</li>
                  <li>Status updates are saved to your order history</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Current Payment Status Info */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #E5E7EB'
          }}>
            <div>
              <p style={{ color: '#6B7280', margin: '5px 0', fontSize: '14px' }}>
                <strong>Order ID:</strong> {orderData?.orderId}
              </p>
              {orderData?.transactionId && (
                <p style={{ color: '#6B7280', margin: '5px 0', fontSize: '14px' }}>
                  <strong>Transaction ID:</strong> {orderData.transactionId}
                </p>
              )}
            </div>
            <div style={{ 
              backgroundColor: paymentCompleted ? '#D1FAE5' : '#FEF3C7',
              padding: '8px 15px',
              borderRadius: '20px',
              border: `1px solid ${paymentCompleted ? '#A7F3D0' : '#FDE68A'}`
            }}>
              <span style={{ 
                color: paymentCompleted ? '#065F46' : '#92400E',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {paymentCompleted ? '✅ Payment Completed' : '⏳ Payment Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Receipt Preview */}
        <div ref={receiptRef} className="receipt-container" style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          maxWidth: '800px', 
          margin: '0 auto 40px', 
          borderRadius: '12px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '3px solid #dc2626', paddingBottom: '20px', marginBottom: '30px' }}>
            <h1 style={{ color: '#dc2626', margin: 0, fontSize: '32px', fontWeight: 'bold' }}>🍽️ RESTAURANT RECEIPT</h1>
            <p style={{ color: '#666', margin: '8px 0' }}>123 Food Street, City, Country - 400001</p>
            <p style={{ color: '#666', margin: '8px 0' }}>Phone: +91 9876543210 | Email: orders@restaurant.com</p>
            <p style={{ color: '#666', margin: '8px 0' }}>GSTIN: 27ABCDE1234F1Z5</p>
          </div>
          
          {/* Order & Customer Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div>
              <h2 style={{ color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', fontSize: '20px' }}>
                Customer Details
              </h2>
              <div style={{ marginTop: '15px' }}>
                <p style={{ margin: '10px 0' }}><strong>Name:</strong> {orderData?.customer?.name}</p>
                <p style={{ margin: '10px 0' }}><strong>Email:</strong> {orderData?.customer?.email}</p>
                <p style={{ margin: '10px 0' }}><strong>Phone:</strong> {orderData?.customer?.phone}</p>
                <p style={{ margin: '10px 0' }}><strong>Address:</strong> {orderData?.customer?.address}</p>
              </div>
            </div>
            
            <div>
              <h2 style={{ color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', fontSize: '20px' }}>
                Order Details
              </h2>
              <div style={{ marginTop: '15px' }}>
                <p style={{ margin: '10px 0' }}><strong>Order No:</strong> {orderData?.orderNumber}</p>
                <p style={{ margin: '10px 0' }}><strong>Receipt No:</strong> {orderData?.receiptNumber}</p>
                <p style={{ margin: '10px 0' }}><strong>Date:</strong> {new Date(orderData?.date).toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}</p>
                <p style={{ margin: '10px 0' }}><strong>Payment Method:</strong> {orderData?.paymentMethod?.toUpperCase()}</p>
                <p style={{ margin: '10px 0' }}><strong>Status:</strong> 
                  <span style={{
                    backgroundColor: orderData?.paymentSuccess ? '#10b981' : '#f59e0b',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    marginLeft: '10px',
                    fontWeight: '600'
                  }}>
                    {orderData?.paymentSuccess ? 'PAID' : orderData?.paymentStatus?.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <h2 style={{ color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', fontSize: '20px' }}>
            Order Summary
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ textAlign: 'left', padding: '15px', border: '1px solid #e5e7eb', fontWeight: '600' }}>Item</th>
                <th style={{ textAlign: 'center', padding: '15px', border: '1px solid #e5e7eb', fontWeight: '600' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: '15px', border: '1px solid #e5e7eb', fontWeight: '600' }}>Price</th>
                <th style={{ textAlign: 'right', padding: '15px', border: '1px solid #e5e7eb', fontWeight: '600' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData?.items?.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '15px', border: '1px solid #e5e7eb' }}>{item.name}</td>
                  <td style={{ textAlign: 'center', padding: '15px', border: '1px solid #e5e7eb' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right', padding: '15px', border: '1px solid #e5e7eb' }}>₹{item.price}</td>
                  <td style={{ textAlign: 'right', padding: '15px', border: '1px solid #e5e7eb' }}>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Totals */}
          <div style={{ textAlign: 'right', marginTop: '30px' }}>
            <div style={{ display: 'inline-block', textAlign: 'left', minWidth: '300px' }}>
              <p style={{ margin: '12px 0', fontSize: '16px' }}><strong>Subtotal:</strong> ₹{orderData?.subtotal || 0}</p>
              <p style={{ margin: '12px 0', fontSize: '16px' }}><strong>GST (5%):</strong> ₹{((orderData?.subtotal || 0) * 0.05).toFixed(2)}</p>
              <p style={{ margin: '12px 0', fontSize: '16px' }}><strong>Delivery Fee:</strong> ₹{orderData?.deliveryFee || 2}</p>
              <hr style={{ border: 'none', borderTop: '2px solid #374151', margin: '20px 0' }} />
              <h3 style={{ margin: '15px 0', color: '#dc2626', fontSize: '28px', fontWeight: 'bold' }}>
                Total: ₹{((orderData?.amount || 0) + ((orderData?.subtotal || 0) * 0.05)).toFixed(2)}
              </h3>
            </div>
          </div>
          
          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '3px solid #dc2626' }}>
            <p style={{ color: '#374151', fontSize: '20px', fontWeight: '600' }}>Thank you for your order!</p>
            <p style={{ color: '#666', margin: '10px 0' }}>For any queries, contact: support@restaurant.com | +91 9876543210</p>
            <p style={{ color: '#666', fontSize: '14px', fontStyle: 'italic' }}>This is a computer generated receipt</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          marginTop: '40px'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#DC2626',
              color: 'white',
              border: 'none',
              padding: '14px 35px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
              transition: 'all 0.3s',
              minWidth: '200px'
            }}
          >
            Continue Shopping
          </button>
          
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: 'white',
              color: '#DC2626',
              border: '2px solid #DC2626',
              padding: '14px 35px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
              minWidth: '200px'
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
              padding: '14px 35px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: generatingPDF ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s',
              minWidth: '200px',
              opacity: generatingPDF ? 0.7 : 1
            }}
          >
            {generatingPDF ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {/* Instructions */}
        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#6B7280' }}>
          <p style={{ marginBottom: '8px' }}>• Click "Update Payment Status" to change payment status</p>
          <p style={{ marginBottom: '8px' }}>• Click "Print Receipt" to print or save as PDF</p>
          <p>• Status updates are saved to your order history</p>
        </div>

        {/* Auto-redirect notice */}
        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '13px', color: '#9CA3AF' }}>
          <p>You will be redirected to the home page in 30 seconds...</p>
        </div>
      </div>
    )
  }

  // Normal order placement form
  return (
    <div className="place-order-container">
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

      <form onSubmit={handlePlaceOrderSubmit} className='place-order'>
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
                  <p>Pay using card</p>
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
            <div style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' }}>
              <p><strong>Note:</strong> You can update payment status after order placement</p>
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
                  <h4>UPI Payment</h4>
                  <div className="qr-code-container">
                    {qrCodeUrl && (
                      <img 
                        src={qrCodeUrl} 
                        alt="UPI QR Code" 
                        className="qr-code-image"
                        onError={(e) => {
                          e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=demo@upi&pn=Restaurant&am=100&cu=INR'
                        }}
                      />
                    )}
                    <p className="qr-instructions">Scan this QR code or use UPI ID: demo@upi</p>
                    <p className="amount-display">Amount: ₹{getTotalCartAmount() + 2}</p>
                  </div>
                </div>
                <div className="payment-section">
                  <h4>Enter UPI ID (Optional)</h4>
                  <input
                    type="text"
                    name="upiId"
                    value={paymentDetails.upiId}
                    onChange={handlePaymentDetailsChange}
                    placeholder="demo@upi"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="card-payment">
                <div className="payment-section">
                  <h4>Card Payment</h4>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentDetailsChange}
                    placeholder="4242 4242 4242 4242"
                    disabled={isProcessing}
                  />
                  <input
                    type="text"
                    name="cardName"
                    value={paymentDetails.cardName}
                    onChange={handlePaymentDetailsChange}
                    placeholder="John Doe"
                    disabled={isProcessing}
                  />
                  <div className="card-details-row">
                    <input
                      type="text"
                      name="cardExpiry"
                      value={paymentDetails.cardExpiry}
                      onChange={handlePaymentDetailsChange}
                      placeholder="12/34"
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="cardCvv"
                      value={paymentDetails.cardCvv}
                      onChange={handlePaymentDetailsChange}
                      placeholder="123"
                      disabled={isProcessing}
                    />
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
                    <strong>Note:</strong> You can update payment status after order placement
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
                {isProcessing ? 'Processing...' : 
                 paymentMethod === 'cod' || paymentMethod === 'counter' ? 'Place Order' : 'Complete Payment'}
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
    </div>
  )
}

export default PlaceOrder