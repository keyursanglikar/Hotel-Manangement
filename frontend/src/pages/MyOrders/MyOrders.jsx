// import React, { useContext, useEffect, useState } from 'react'
// import './MyOrders.css'
// import { StoreContext } from './../../components/context/StoreContext';
// import axios from 'axios';
// import { assets } from './../../assets/assets';

// const MyOrders = () => {

// const {url, token} = useContext(StoreContext);
// const [data, setData] = useState([]);

// const fetchOrders = async () =>{
//     const response = await axios.post(url+'/api/order/userorders',{},{headers:{token}})
//     setData(response.data.data);
// }

// useEffect(()=>{
//     if(token){
//         fetchOrders();
//     }
// },[token])

//   return (
//     <div className='my-orders'>
//         <h2>My Orders</h2>
//         <div className="container">
//             {data.map((order, index)=>{
//                     return (
//                         <div key={index} className="my-orders-order">
//                             <img src={assets.parcel_icon} alt="" />
//                             <p>{order.items.map((item, index)=>{
//                                 if(index === order.items.length-1){
//                                     return item.name+" x "+item.quantity
//                                 }else{
//                                     return item.name+" x "+item.quantity + ","
//                                 }
//                             })}</p>
//                             <p>₹{order.amount}.00</p>
//                             <p>Items: {order.items.length}</p>
//                             <p><span>&#x25cf;</span><b>{order.status}</b></p>
//                             <button onClick={fetchOrders}>Track Order</button>
//                         </div>
//                     )
//             })}
//         </div>
//     </div>
//   )
// }

// export default MyOrders



// frontend/src/pages/MyOrders/MyOrders.jsx
import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios'

const MyOrders = () => {
  const { token, url } = useContext(StoreContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserOrders()
  }, [])

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(
        `${url}/api/order/userorders`,
        { headers: { token } }
      )
      
      if (response.data.success) {
        setOrders(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const updatePaymentStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        `${url}/api/order/counter-payment`,
        { orderId, paymentStatus: status },
        { headers: { token } }
      )
      
      if (response.data.success) {
        fetchUserOrders() // Refresh orders
        alert(`Payment marked as ${status}`)
      }
    } catch (error) {
      console.error('Error updating payment:', error)
      alert('Failed to update payment status')
    }
  }

  if (loading) {
    return <div className="loading">Loading your orders...</div>
  }

  return (
    <div className="my-orders">
      <h1>My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.orderNumber}</h3>
                  <p className="order-date">{formatDate(order.date)}</p>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${order.payment ? 'status-paid' : 'status-pending'}`}>
                    {order.payment ? 'Paid' : 'Pending'}
                  </span>
                  <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="order-details">
                <div className="order-info">
                  <p><strong>Amount:</strong> ₹{order.amount}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>
                  <p><strong>Items:</strong> {order.items.length}</p>
                </div>
                
                {order.paymentMethod === 'counter' && !order.payment && (
                  <div className="counter-payment-actions">
                    <p>Payment pending at counter</p>
                    <div className="payment-buttons">
                      <button 
                        onClick={() => updatePaymentStatus(order._id, 'paid')}
                        className="mark-paid-btn"
                      >
                        ✅ Mark as Paid
                      </button>
                      <button 
                        onClick={() => updatePaymentStatus(order._id, 'not_paid')}
                        className="mark-not-paid-btn"
                      >
                        ❌ Mark as Not Paid
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="order-actions">
                  <button className="view-details-btn">View Details</button>
                  {order.payment && (
                    <button className="download-receipt-btn">Download Receipt</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders