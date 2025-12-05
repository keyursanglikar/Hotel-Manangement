// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { food_list } from "../../assets/assets";
// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const url = "http://localhost:4000";
//   const [token, setToken] = useState("");

//   //remove food_list state 

//   const addToCart = async (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//     if (token) {
//       await axios.post(
//         url + "/api/cart/add",
//         { itemId },
//         { headers: { token } }
//       );
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (token) {
//       await axios.post(
//         url + "/api/cart/remove",
//         { itemId },
//         { headers: { token } }
//       );
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   };

//   const fetchFoodList = async () => {
//     const response = await axios.get(url + "/api/food/list");
//   };

//   const loadCartData = async (token) => {
//     const response = await axios.post(
//       url + "/api/cart/get",
//       {},
//       { headers: { token } }
//     );
//     setCartItems(response.data.cartData || {});
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       if (localStorage.getItem("token")) {
//         setToken(localStorage.getItem("token"));
//         await loadCartData(localStorage.getItem("token"));
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;



// // frontend/src/context/StoreContext.js
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { food_list } from "../../assets/assets"; // Import static food list

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [foodList, setFoodList] = useState([]); // For backend products
//   const [token, setToken] = useState("");
//   const url = "http://localhost:4000";
  
//   // Combined food list: backend products + static products
//   const [combinedFoodList, setCombinedFoodList] = useState([]);

//   const addToCart = async (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//     if (token) {
//       await axios.post(
//         url + "/api/cart/add",
//         { itemId },
//         { headers: { token } }
//       );
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     if (cartItems[itemId] > 0) {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     }
//     if (token) {
//       await axios.post(
//         url + "/api/cart/remove",
//         { itemId },
//         { headers: { token } }
//       );
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         // First check in backend products
//         let itemInfo = foodList.find((product) => product._id === item);
        
//         // If not found in backend, check in static products
//         if (!itemInfo) {
//           itemInfo = food_list.find((product) => product._id === item);
//         }
        
//         if (itemInfo) {
//           totalAmount += itemInfo.price * cartItems[item];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const fetchFoodList = async () => {
//     try {
//       const response = await axios.get(url + "/api/food/list");
//       console.log("Fetched food list from backend:", response.data.data);
//       setFoodList(response.data.data || []);
      
//       // Combine backend products with static products
//       const combinedList = [
//         ...(response.data.data || []), // Backend products first
//         ...food_list.filter(staticItem => 
//           // Only add static items that don't exist in backend (by name or id)
//           !response.data.data?.some(backendItem => 
//             backendItem.name === staticItem.name || 
//             backendItem._id === staticItem._id
//           )
//         )
//       ];
      
//       setCombinedFoodList(combinedList);
//       return combinedList;
//     } catch (error) {
//       console.error("Error fetching food list from backend:", error);
//       // If backend fails, use only static products
//       setCombinedFoodList(food_list);
//       return food_list;
//     }
//   };

//   const loadCartData = async (token) => {
//     try {
//       const response = await axios.post(
//         url + "/api/cart/get",
//         {},
//         { headers: { token } }
//       );
//       setCartItems(response.data.cartData || {});
//     } catch (error) {
//       console.error("Error loading cart data:", error);
//     }
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       if (localStorage.getItem("token")) {
//         const storedToken = localStorage.getItem("token");
//         setToken(storedToken);
//         await loadCartData(storedToken);
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list: combinedFoodList, // Provide combined list to components
//     backend_food_list: foodList, // Also provide backend-only list if needed
//     static_food_list: food_list, // Provide static list separately
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//     fetchFoodList,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;






// frontend/src/context/StoreContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list } from "../../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";
  
  const [combinedFoodList, setCombinedFoodList] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const clearCart = () => {
    setCartItems({});
    if (token) {
      axios.post(url + "/api/cart/clear", {}, { headers: { token } })
        .catch(error => console.error("Error clearing cart:", error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        
        if (!itemInfo) {
          itemInfo = food_list.find((product) => product._id === item);
        }
        
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      console.log("Fetched food list from backend:", response.data.data);
      setFoodList(response.data.data || []);
      
      const backendItems = response.data.data || [];
      const staticItems = food_list || [];
      
      const uniqueStaticItems = staticItems.filter(staticItem => 
        !backendItems.some(backendItem => 
          backendItem.name.toLowerCase() === staticItem.name.toLowerCase()
        )
      );
      
      const combinedList = [...backendItems, ...uniqueStaticItems];
      setCombinedFoodList(combinedList);
      
      const allCategories = [...new Set([
        ...backendItems.map(item => item.category).filter(Boolean),
        ...staticItems.map(item => item.category).filter(Boolean)
      ])].sort();
      
      setAvailableCategories(allCategories);
      console.log("Available categories:", allCategories);
      
      return combinedList;
    } catch (error) {
      console.error("Error fetching food list from backend:", error);
      const staticItems = food_list || [];
      setCombinedFoodList(staticItems);
      
      const categories = [...new Set(
        staticItems.map(item => item.category).filter(Boolean)
      )].sort();
      setAvailableCategories(categories);
      
      return staticItems;
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      );
      return response.data;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  const getUserOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return [];
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list: combinedFoodList,
    availableCategories,
    backend_food_list: foodList,
    static_food_list: food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    placeOrder,
    getUserOrders,
    url,
    token,
    setToken,
    fetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;